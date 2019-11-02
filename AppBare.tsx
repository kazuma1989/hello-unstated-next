import React, { createContext, useContext } from "react";
import { useCounter } from "./useCounter";

interface ContainerProviderProps<State = void> {
  initialState?: State;
  children: React.ReactNode;
}

interface Container<Value, State = void> {
  Provider: React.ComponentType<ContainerProviderProps<State>>;
  useContainer: () => Value;
}

function createContainer<Value, State = void>(
  useHook: (initialState?: State) => Value
): Container<Value, State> {
  const Context = createContext<Value | null>(null);

  return {
    Provider({
      initialState,
      children
    }: {
      initialState?: State;
      children: React.ReactNode;
    }) {
      const value = useHook(initialState);

      return <Context.Provider value={value}>{children}</Context.Provider>;
    },

    useContainer() {
      const container = useContext(Context);
      if (!container) {
        throw new Error();
      }

      return container;
    }
  };
}

const Counter = createContainer(useCounter);

function CounterDisplay() {
  const { count, decrement, increment } = Counter.useContainer();

  return (
    <div>
      <button onClick={decrement}>-</button>
      <span>{count}</span>
      <button onClick={increment}>+</button>
    </div>
  );
}

export function AppBare() {
  return (
    <Counter.Provider>
      <CounterDisplay />

      <Counter.Provider initialState={1}>
        <div>
          <div>
            <CounterDisplay />
          </div>
        </div>
      </Counter.Provider>

      <Counter.Provider initialState={2}>
        <CounterDisplay />
      </Counter.Provider>
    </Counter.Provider>
  );
}

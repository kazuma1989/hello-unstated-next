import React, { createContext, useContext } from "react";
import { useState } from "react";

function useCounter(initialState = 0) {
  const [count, setCount] = useState(initialState);

  return {
    count,
    decrement() {
      setCount(v => v - 1);
    },
    increment() {
      setCount(v => v + 1);
    }
  };
}

const Counter = createContext<ReturnType<typeof useCounter> | null>(null);

function CounterDisplay() {
  const counter = useContext(Counter);
  if (!counter) {
    return null;
  }

  const { count, decrement, increment } = counter;

  return (
    <div>
      <button onClick={decrement}>-</button>
      <span>{count}</span>
      <button onClick={increment}>+</button>
    </div>
  );
}

function Provider({
  initialState = 0,
  children
}: {
  initialState?: number;
  children: React.ReactNode;
}) {
  const counter = useCounter(initialState);

  return <Counter.Provider value={counter}>{children}</Counter.Provider>;
}

export function AppBare() {
  return (
    <Provider>
      <CounterDisplay />

      <Provider initialState={1}>
        <div>
          <div>
            <CounterDisplay />
          </div>
        </div>
      </Provider>

      <Provider initialState={2}>
        <CounterDisplay />
      </Provider>
    </Provider>
  );
}

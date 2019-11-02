import React from "react";
import { createContainer } from "unstated-next";
import { useCounter } from "./useCounter";

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

export function App() {
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

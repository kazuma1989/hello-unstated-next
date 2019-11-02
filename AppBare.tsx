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

export function AppBare() {
  const counter1 = useCounter();
  const counter2 = useCounter(1);
  const counter3 = useCounter(2);

  return (
    <Counter.Provider value={counter1}>
      <CounterDisplay />

      <Counter.Provider value={counter2}>
        <div>
          <div>
            <CounterDisplay />
          </div>
        </div>
      </Counter.Provider>

      <Counter.Provider value={counter3}>
        <CounterDisplay />
      </Counter.Provider>
    </Counter.Provider>
  );
}

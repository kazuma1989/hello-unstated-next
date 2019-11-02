import { useState } from "react";

export function useCounter(initialState = 0) {
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

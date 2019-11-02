import ReactDOM from "react-dom";
import React, { useState } from "react";
import { createContainer } from "unstated-next";

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

function App() {
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

ReactDOM.render(<App />, document.getElementById("app"));

import { useReducer, useState } from "react";

function DateCounter() {
  const [count, setCount] = useState(0);

  const [state, dispatch] = useReducer(reducer, {count:0, step:1});

  const [step, setStep] = useState(1);

  function reducer(state, action){
    if (action.type === "inc"){
      return {
        count: state.count + state.step,
        step: state.step};
    }
    if (action.type === "dec"){
      console.log(state.count);
      return{
        count: state.count - state.step,
        step: state.step,
      };
    }
    throw Error("Unknown action.")
  }

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + state.count);

  const dec = function () {
    // setCount((count) => count - 1);
    setCount((count) => count - step);
  };

  const inc = function () {
    // setCount((count) => count + 1);
    setCount((count) => count + step);
  };

  const defineCount = function (e) {
    setCount(Number(e.target.value));
  };

  const defineStep = function (e) {
    setStep(Number(e.target.value));
  };

  const reset = function () {
    setCount(0);
    setStep(1);
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={() => dispatch({type:"dec"})}>-</button>
        <input value={state.count} onChange={defineCount} />
        <button onClick={() => dispatch({type:"inc"})}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;

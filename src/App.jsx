import { useState } from 'react'
import './App.css'

function App() {
  const [display, setDisplay] = useState("");

  const handleClick = (value) => {
    if (value === "C") {
      setDisplay("");
    } 
    else if (value === "DEL") {
      setDisplay(display.slice(0, -1));
    } 
    else if (value === "=") {
      try {
        if (!/^[0-9+\-*/.() ]+$/.test(display)) {
          throw new Error("Invalid");
        }

        const result = Function('"use strict"; return (' + display + ')')();

        setDisplay(
          Number.isFinite(result) ? String(result) : "Error"
        );
      } catch {
        setDisplay("Error");
      }
    } 
    else {
      if (display === "Error") {
        setDisplay(value);
      } else {
        setDisplay(display + value);
      }
    }
  };

  const buttons = [
    "C", "DEL", "%", "/",
    "7", "8", "9", "*",
    "4", "5", "6", "-",
    "1", "2", "3", "+",
    "0", ".", "(", ")",
    "="
  ];

  
return (
  <div className="page">

    <div className="bg-glow glow-one"></div>
    <div className="bg-glow glow-two"></div>

    <header className="header">
      <h1>SIMPLE CALCULATOR</h1>
      <p>Simple calculations. Smarter experience.</p>
    </header>

    <main className="container">
      <div className="calculator">
        <h2>Calculator</h2>

        <input
          type="text"
          value={display}
          placeholder="0"
          readOnly
          className="display"
        />

        <div className="buttons">
          {buttons.map((btn) => (
            <button
              key={btn}
              onClick={() => handleClick(btn)}
              className={
                btn === "="
                  ? "equal"
                  : ["+", "-", "*", "/", "%"].includes(btn)
                  ? "operator"
                  : ["C", "DEL"].includes(btn)
                  ? "clear"
                  : "number"
              }
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
    </main>

    

  </div>
);

}

export default App

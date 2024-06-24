import {create, all} from "mathjs";
import React, { useEffect } from "react";
import "./calculator.scss"
const m = create(all, {
    number: "BigNumber",
    precision: 1024,
    epsilon: 1e-60
});

export function CalculatorIcon() {
    return (
        <svg version="1.1" viewBox="0 0 100 100">
            <defs>
                <mask id="subtractMask">
                <rect x="0" y="0" width="100%" height="100%" fill="white"></rect>
                <rect x="22.5" y="10" width="55" height="15" fill="black"></rect><g><circle cx="30.5" cy="81" r="8" fill="black"></circle><circle cx="50" cy="81" r="8" fill="black"></circle><circle cx="69.5" cy="81" r="8" fill="black"></circle></g>
                <g><circle cx="30.5" cy="61.5" r="8" fill="black"></circle><circle cx="50" cy="61.5" r="8" fill="black"></circle><circle cx="69.5" cy="61.5" r="8" fill="black"></circle></g><g><circle cx="30.5" cy="42" r="8" fill="black"></circle><circle cx="50" cy="42" r="8" fill="black"></circle><circle cx="69.5" cy="42" r="8" fill="black"></circle></g></mask>
            </defs>
            
            <rect x="17.5" y="5" width="65" height="90" fill="currentColor" mask="url(#subtractMask)"></rect>
        </svg>
    )
}

export function Calculator() {
    const [input, setInput] = React.useState("");
    const [result, setResult] = React.useState("");
    useEffect(()=> {
        if(input) {
            try {
                setResult(m.evaluate(input).toString());
            } catch(e) {
                if(e instanceof Error) setResult(e.message);
                else throw e;
            }
        } else {
            setResult("Result will be here");
        }
    }, [input]);
    return (

        <main id="calculator">
            <textarea
                spellCheck="false"
                placeholder="Enter equation"
                value={input}
                onChange={e => setInput(e.target.value)}
            />
            <div className="result">
                {result}
            </div>
        </main>
    )
}
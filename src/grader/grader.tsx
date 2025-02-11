import { useState } from "react"
import "./grader.scss"

export function GraderIcon() {
    return (
        <svg version="1.1" x="0px" y="0px" viewBox="0 0 100 100">
            <text x="50%" y="50%" style={{ fontSize: 100, fill: 'currentcolor', textAnchor: 'middle', dominantBaseline: 'central' }}>%</text>
        </svg>
    )
}
export function Grader() {
    const [correct, setCorrect] = useState(0);
    const [wrong, setWrong] = useState(0);
    const [total, setTotal] = useState(0);
    return (
        <main id="grader">
            <div className="fields">
                <label>
                    Correct
                    <input value={correct} onChange={e=>setCorrect(e.target.valueAsNumber)}/>
                </label>
                <label>
                    Wrong
                    <input value={wrong} onChange={e=>setWrong(e.target.valueAsNumber)}/>
                </label>
                <label>
                    Total
                    <input value={total} onChange={e=>setTotal(e.target.valueAsNumber)}/>
                </label>
            </div>
            <div className="buttons">                
                <button
                    className="add correct"
                    onClick={() => {
                        setCorrect(c => c + 1);
                        setTotal(t => t + 1);
                    }}
                >Add correct</button>
                <button
                    className="add empty"
                    onClick={() => {
                        setTotal(t => t + 1);
                    }}
                >Add empty</button>
                <button
                    className="add wrong"
                    onClick={() => {
                        setWrong(w => w + 1);
                        setTotal(t => t + 1);
                    }}
                >Add wrong</button>
            </div>
            <div className="result">
                {((correct*3 - wrong)/(total*3)*100).toFixed(1)}%
            </div>
        </main>
    )
}

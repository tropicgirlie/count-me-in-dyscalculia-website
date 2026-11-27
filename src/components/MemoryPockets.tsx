import { useState } from "react";
import "./memory-pockets.css";

const poster = "/workingmemoryduringcalculation.png";
const places = ["Thousands", "Hundreds", "Tens", "Ones"];
const first = [3, 5, 7, 2];
const second = [0, 2, 3, 8];
const steps = [
  { label: "Start with the ones", equation: "3,572 + 238", note: "Each pocket holds one place value. Move through the columns from right to left.", next: "Add the ones" },
  { label: "Ones", equation: "2 + 8 = 10", note: "Leave 0 in the ones pocket. Ten ones make 1 ten, so carry 1 into the tens column.", next: "Add the tens" },
  { label: "Tens", equation: "7 + 3 + 1 = 11", note: "The extra 1 is the ten you carried. Leave 1 ten in its pocket. Carry 1 hundred to the next column.", next: "Add the hundreds" },
  { label: "Hundreds", equation: "5 + 2 + 1 = 8", note: "Add the carried hundred. Leave 8 in the hundreds pocket. There is nothing to carry this time.", next: "Add the thousands" },
  { label: "Thousands", equation: "3 + 0 = 3", note: "Leave 3 in the thousands pocket. Read the four filled pockets from left to right: 3,810.", next: "Start again" },
];
const sum = [3, 8, 1, 0];

export function MemoryPockets() {
  const [interactive, setInteractive] = useState(false);
  const [step, setStep] = useState(0);
  const current = steps[step];
  const activeColumn = step === 0 ? 3 : 4 - step;

  return (
    <section id="working-memory-pockets" className="memory-pockets" aria-labelledby="memory-pockets-title">
      <div className="container-custom">
        <header className="mp-header">
          <div>
            <h2 id="memory-pockets-title" className="font-display">Working memory pockets</h2>
            <p>Keep each digit and carry in sight while you add 3,572 and 238.</p>
          </div>
          <div className="mp-switch" role="group" aria-label="Working memory view">
            <button type="button" aria-pressed={!interactive} onClick={() => setInteractive(false)}>Illustration</button>
            <button type="button" aria-pressed={interactive} onClick={() => setInteractive(true)}>Try the pockets</button>
          </div>
        </header>
        {interactive ? (
          <div className="mp-workspace">
            <div className="mp-board">
              <table aria-label="Place-value pockets for 3,572 plus 238">
                <thead>
                  <tr><td aria-hidden="true" />{places.map((place, i) =>
                    <th scope="col" key={place} className={'mp-tab mp-place-' + i}>{place}</th>
                  )}</tr>
                </thead>
                <tbody>
                  <tr className="mp-carries">
                    <th scope="row"><span className="mp-hidden-label">Carried into the column</span></th>
                    {places.map((place, i) => <td key={place}>
                      {((i === 2 && step >= 1) || (i === 1 && step >= 2)) &&
                        <span className="mp-chip">Carry 1</span>}
                    </td>)}
                  </tr>
                  <tr><th scope="row"><span className="mp-hidden-label">First number</span></th>
                    {first.map((digit, i) => <td className={'mp-digit ' + (i === activeColumn ? 'mp-active' : '')} key={i}>{digit}</td>)}
                  </tr>
                  <tr><th scope="row"><span aria-hidden="true">+</span><span className="mp-hidden-label">Add</span></th>
                    {second.map((digit, i) => <td className={'mp-digit ' + (i === activeColumn ? 'mp-active' : '')} key={i}>{digit === 0 && step < 4 ? <span className="mp-hidden-label">0</span> : digit}</td>)}
                  </tr>
                  <tr className="mp-answer"><th scope="row"><span aria-hidden="true">=</span><span className="mp-hidden-label">Result so far</span></th>
                    {sum.map((digit, i) => <td key={i}>
                      <div className={'mp-sleeve' + (i === activeColumn ? ' mp-selected' : '')}>
                        {i >= 4 - step ? <span className="mp-slip">{digit}</span> : <span className="mp-hidden-label">Empty</span>}
                      </div>
                    </td>)}
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mp-guide">
              <div className="mp-reading" role="status" aria-live="polite" aria-atomic="true">
                <p className="mp-step">{step === 0 ? current.label : 'Step ' + step + ' of 4 · ' + current.label}</p>
                <p className="mp-equation">{current.equation}</p>
                <p>{current.note}</p>
              </div>
              <div className="mp-controls">
                <button type="button" disabled={step === 0} onClick={() => setStep(step - 1)}>Back</button>
                <button type="button" className="mp-next" onClick={() => setStep(step === 4 ? 0 : step + 1)}>{current.next}</button>
              </div>
            </div>
          </div>
        ) : (
          <figure className="mp-figure">
            <img src={poster} width={1671} height={941} loading="lazy" alt="Paper pockets hold the digits in 3,572 plus 238. The illustration shows how carrying between place values gives 3,810." />
            <figcaption><a href={poster} target="_blank" rel="noreferrer">Open the full-size illustration <span aria-hidden="true">↗</span><span className="mp-hidden-label"> in a new tab</span></a></figcaption>
          </figure>
        )}
      </div>
    </section>
  );
}

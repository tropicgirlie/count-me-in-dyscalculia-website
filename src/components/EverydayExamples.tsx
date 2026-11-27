import { useState } from "react";
import "./everyday-examples.css";

const examples = [
  { label: "Time", title: "When should I leave for the bus?", answer: "Leave home at 13:50.", detail: "The bus leaves at 14:10. Allow 15 minutes to walk and 5 minutes to wait." },
  { label: "Money", title: "How much does each person pay?", answer: "Each person pays €14.", detail: "Three people are sharing a €42 bill equally. Three payments of €14 cover the bill." },
  { label: "Cooking", title: "How much milk goes in half a batch?", answer: "Measure 75 mL.", detail: "The full recipe uses 150 mL. Halving the recipe means filling the same measure to half that level." },
] as const;

function BusTimeline() {
  return (
    <div className="ex-timeline">
      <ol>
        <li><strong>13:50</strong><span>Leave home<small>Walk for 15 minutes</small></span></li>
        <li><strong>14:05</strong><span>At the stop<small>Wait for 5 minutes</small></span></li>
        <li><strong>14:10</strong><span>Bus leaves</span></li>
      </ol>
    </div>
  );
}

function SplitBill() {
  return (
    <div className="ex-bill">
      <p>Bill total <strong>€42</strong></p>
      <ul>
        {["Person one", "Person two", "Person three"].map(person => (
          <li key={person}><span>{person}</span><strong>€14</strong></li>
        ))}
      </ul>
    </div>
  );
}

function MilkMeasures() {
  return (
    <div className="ex-measures">
      {["Full batch", "Half batch"].map((label, index) => (
        <div key={label}>
          <span className="ex-measure-name">{label}</span>
          <div className="ex-vessel" aria-hidden="true">
            <span className={index === 0 ? "ex-full" : "ex-half"} />
          </div>
          <strong>{index === 0 ? "150 mL" : "75 mL"}</strong>
        </div>
      ))}
    </div>
  );
}

const diagrams = [BusTimeline, SplitBill, MilkMeasures];

export function EverydayExamples() {
  const [selected, setSelected] = useState(0);
  const example = examples[selected];
  const Diagram = diagrams[selected];

  return (
    <section id="everyday-examples" aria-labelledby="examples-title" className="everyday-examples">
      <div className="container-custom">
        <h2 id="examples-title">Everyday examples</h2>
        <div className="ex-choices" role="group" aria-label="Choose an example">
          {examples.map(({ label }, index) => (
            <button type="button" key={label} aria-pressed={selected === index}
              aria-controls="example-detail" onClick={() => setSelected(index)}>
              {label}
            </button>
          ))}
        </div>
        <div id="example-detail" className="ex-detail" aria-live="polite" aria-atomic="true">
          <div className="ex-copy">
            <h3>{example.title}</h3>
            <p>{example.detail}</p>
            <strong>{example.answer}</strong>
          </div>
          <Diagram />
        </div>
      </div>
    </section>
  );
}

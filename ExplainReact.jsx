import React from "react";

function ExplainReact() {
  const points = [
    "React is a JavaScript library for building user interfaces.",
    "It uses a component-based architecture for reusable UI pieces.",
    "JSX lets you write HTML-like syntax directly in JavaScript.",
    "State and props manage data flow within and between components.",
    "The virtual DOM efficiently updates only what changes on screen.",
    "React powers single-page apps with fast, reactive rendering.",
  ];

  return (
    <section>
      <h1>What is React?</h1>
      <ul>
        {points.map((point, i) => (
          <li key={i}>{point}</li>
        ))}
      </ul>
    </section>
  );
}

export default ExplainReact;

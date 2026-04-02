import React from "react";

/**
 * A simple JSX page/component that explains AI.
 *
 * Usage examples:
 * - React:   <ExplainAI />
 * - Next.js: export default function Page() { return <ExplainAI />; }
 */
export default function ExplainAI() {
  return (
    <main style={{ fontFamily: "system-ui, sans-serif", lineHeight: 1.5 }}>
      <h1>AI (Artificial Intelligence) — Explained</h1>

      <p>
        <strong>Artificial Intelligence (AI)</strong> is a broad term for software
        that performs tasks we usually associate with human intelligence—like
        understanding language, recognizing images, planning, or making
        predictions.
      </p>

      <h2>Key ideas</h2>
      <ul>
        <li>
          <strong>AI</strong>: The umbrella category for “smart” behavior in
          software.
        </li>
        <li>
          <strong>Machine Learning (ML)</strong>: A common approach to AI where
          models learn patterns from data instead of being explicitly programmed
          with every rule.
        </li>
        <li>
          <strong>Deep Learning</strong>: A subset of ML using neural networks with
          many layers, often strong at vision, speech, and language.
        </li>
      </ul>

      <h2>How modern AI (especially language AI) works</h2>
      <p>
        Many modern systems use <strong>neural networks</strong> trained on large
        datasets. A popular type is the <strong>Transformer</strong> architecture,
        which powers many <strong>large language models (LLMs)</strong>. LLMs are trained
        to predict the next token (a piece of text). With enough data and
        training, this next-token prediction becomes useful for answering
        questions, summarizing, translating, and writing.
      </p>

      <h2>What AI is good at</h2>
      <ul>
        <li>Summarizing text and extracting key points</li>
        <li>Drafting content (emails, docs, code) quickly</li>
        <li>Classification (spam detection, sentiment analysis)</li>
        <li>Pattern recognition (images, speech, anomalies)</li>
        <li>Recommendation and forecasting (when data is reliable)</li>
      </ul>

      <h2>Common limitations</h2>
      <ul>
        <li>
          <strong>Hallucinations</strong>: AI can generate confident but incorrect
          information.
        </li>
        <li>
          <strong>Data dependence</strong>: Outputs reflect the quality and biases of
          training data.
        </li>
        <li>
          <strong>Context limits</strong>: Models only “see” a limited amount of text at
          once.
        </li>
        <li>
          <strong>No guaranteed reasoning</strong>: Some tasks need verification,
          testing, or external tools.
        </li>
      </ul>

      <h2>Responsible use</h2>
      <ul>
        <li>Verify important facts (especially medical, legal, financial)</li>
        <li>Be careful with private data (don’t paste secrets or credentials)</li>
        <li>Watch for bias and unfair outcomes</li>
        <li>Keep a human in the loop for high-stakes decisions</li>
      </ul>

      <h2>Tips for getting better results</h2>
      <ul>
        <li>Provide context: goal, audience, constraints, examples</li>
        <li>Ask for structured output: bullets, JSON, tables</li>
        <li>Request alternatives and tradeoffs</li>
        <li>Ask the model to cite assumptions and uncertainty</li>
      </ul>

      <hr />
      <p style={{ color: "#555" }}>
        In short: AI is software that learns patterns and assists with cognitive
        tasks—but it still needs guidance, verification, and responsible use.
      </p>
    </main>
  );
}


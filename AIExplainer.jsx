import React, { useState } from "react";

const sections = [
  {
    title: "What is Artificial Intelligence?",
    content:
      "Artificial Intelligence (AI) is the simulation of human intelligence processes by computer systems. It enables machines to perform tasks that typically require human intelligence — such as understanding language, recognizing patterns, solving problems, and making decisions.",
    emoji: "🤖",
  },
  {
    title: "How Does AI Work?",
    content:
      "AI systems learn from large amounts of data using algorithms. They identify patterns, make predictions, and improve over time through a process called Machine Learning (ML). Deep Learning, a subset of ML, uses neural networks inspired by the human brain to process complex data like images and speech.",
    emoji: "⚙️",
  },
  {
    title: "Types of AI",
    content: null,
    emoji: "📂",
    list: [
      { label: "Narrow AI", desc: "Designed for a specific task (e.g., Siri, chess engines, recommendation systems)." },
      { label: "General AI (AGI)", desc: "Hypothetical AI with human-level reasoning across any domain." },
      { label: "Super AI", desc: "Theoretical AI that surpasses human intelligence in all areas." },
    ],
  },
  {
    title: "Key AI Technologies",
    content: null,
    emoji: "🔬",
    list: [
      { label: "Machine Learning", desc: "Algorithms that learn from data without being explicitly programmed." },
      { label: "Natural Language Processing (NLP)", desc: "Enables machines to understand and generate human language." },
      { label: "Computer Vision", desc: "Allows machines to interpret and understand visual information." },
      { label: "Reinforcement Learning", desc: "AI learns by trial and error, receiving rewards for correct actions." },
    ],
  },
  {
    title: "Real-World Applications",
    content: null,
    emoji: "🌍",
    list: [
      { label: "Healthcare", desc: "Disease diagnosis, drug discovery, medical imaging analysis." },
      { label: "Finance", desc: "Fraud detection, algorithmic trading, credit scoring." },
      { label: "Transportation", desc: "Self-driving cars, route optimization, traffic management." },
      { label: "Entertainment", desc: "Content recommendations on Netflix, Spotify, YouTube." },
      { label: "Education", desc: "Personalized learning, intelligent tutoring systems." },
    ],
  },
  {
    title: "Benefits of AI",
    content: null,
    emoji: "✅",
    list: [
      { label: "Efficiency", desc: "Automates repetitive tasks, saving time and resources." },
      { label: "Accuracy", desc: "Reduces human error in data-intensive tasks." },
      { label: "Availability", desc: "Operates 24/7 without fatigue." },
      { label: "Insights", desc: "Uncovers patterns in massive datasets humans can't process." },
    ],
  },
  {
    title: "Challenges & Ethical Concerns",
    content: null,
    emoji: "⚠️",
    list: [
      { label: "Bias", desc: "AI can inherit biases present in training data." },
      { label: "Privacy", desc: "Large-scale data collection raises privacy concerns." },
      { label: "Job Displacement", desc: "Automation may replace certain human jobs." },
      { label: "Transparency", desc: "Many AI models are 'black boxes' — hard to interpret." },
      { label: "Security", desc: "AI systems can be exploited or manipulated." },
    ],
  },
  {
    title: "The Future of AI",
    content:
      "AI is evolving rapidly. Future advancements include more capable language models, AI-powered scientific research, human-AI collaboration tools, and potentially Artificial General Intelligence (AGI). Responsible development, regulation, and ethical frameworks will be crucial to ensure AI benefits all of humanity.",
    emoji: "🚀",
  },
];

function Section({ section }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        marginBottom: "16px",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        border: "1px solid #e2e8f0",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 20px",
          background: open ? "#4f46e5" : "#f8fafc",
          color: open ? "#fff" : "#1e293b",
          border: "none",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "600",
          transition: "background 0.2s",
        }}
      >
        <span>
          {section.emoji} {section.title}
        </span>
        <span style={{ fontSize: "20px" }}>{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div style={{ padding: "20px", background: "#fff", color: "#334155", lineHeight: "1.7" }}>
          {section.content && <p style={{ margin: 0 }}>{section.content}</p>}
          {section.list && (
            <ul style={{ margin: 0, paddingLeft: "20px" }}>
              {section.list.map((item, i) => (
                <li key={i} style={{ marginBottom: "8px" }}>
                  <strong style={{ color: "#4f46e5" }}>{item.label}:</strong> {item.desc}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default function AIExplainer() {
  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "40px auto",
        padding: "0 20px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "40px",
          padding: "40px 20px",
          background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
          borderRadius: "16px",
          color: "#fff",
        }}
      >
        <div style={{ fontSize: "64px", marginBottom: "12px" }}>🤖</div>
        <h1 style={{ margin: "0 0 12px", fontSize: "36px", fontWeight: "800" }}>
          Artificial Intelligence
        </h1>
        <p style={{ margin: 0, fontSize: "18px", opacity: 0.9 }}>
          A comprehensive guide to understanding AI — from basics to the future.
        </p>
      </div>

      {/* Quick Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "16px",
          marginBottom: "32px",
        }}
      >
        {[
          { value: "1950s", label: "AI Origins" },
          { value: "3 Types", label: "Narrow / General / Super" },
          { value: "∞", label: "Possibilities" },
        ].map((stat, i) => (
          <div
            key={i}
            style={{
              textAlign: "center",
              padding: "20px",
              background: "#f1f5f9",
              borderRadius: "12px",
            }}
          >
            <div style={{ fontSize: "28px", fontWeight: "800", color: "#4f46e5" }}>
              {stat.value}
            </div>
            <div style={{ fontSize: "13px", color: "#64748b", marginTop: "4px" }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Accordion Sections */}
      <div>
        {sections.map((section, i) => (
          <Section key={i} section={section} />
        ))}
      </div>

      {/* Footer */}
      <div
        style={{
          textAlign: "center",
          marginTop: "40px",
          padding: "24px",
          background: "#f8fafc",
          borderRadius: "12px",
          color: "#64748b",
          fontSize: "14px",
        }}
      >
        <p style={{ margin: 0 }}>
          💡 <strong>AI is a tool.</strong> Its impact depends on how responsibly we build and use it.
        </p>
      </div>
    </div>
  );
}

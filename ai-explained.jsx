import React from "react";

function AIExplained() {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "800px", margin: "0 auto", padding: "40px 20px", color: "#1a1a2e" }}>
      <header style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "10px" }}>Artificial Intelligence</h1>
        <p style={{ fontSize: "1.2rem", color: "#555" }}>
          A brief overview of what AI is, how it works, and where it's headed.
        </p>
      </header>

      <Section title="What is AI?">
        <p>
          Artificial Intelligence (AI) refers to the simulation of human intelligence by
          computer systems. These systems are designed to perform tasks that typically
          require human cognition — such as learning, reasoning, problem-solving,
          understanding language, and perceiving the world.
        </p>
      </Section>

      <Section title="Types of AI">
        <ul>
          <li>
            <strong>Narrow AI (Weak AI)</strong> — Designed for a specific task, like voice
            assistants, recommendation engines, or image recognition. This is the AI we
            use every day.
          </li>
          <li>
            <strong>General AI (Strong AI)</strong> — A theoretical form of AI that can
            understand, learn, and apply intelligence across any domain, much like a human.
          </li>
          <li>
            <strong>Super AI</strong> — A hypothetical level of AI that surpasses human
            intelligence in all areas, including creativity, decision-making, and social
            skills.
          </li>
        </ul>
      </Section>

      <Section title="How Does AI Work?">
        <p>AI systems learn from data using various techniques:</p>
        <ol>
          <li>
            <strong>Machine Learning (ML)</strong> — Algorithms improve through experience.
            Models are trained on large datasets to recognize patterns and make predictions.
          </li>
          <li>
            <strong>Deep Learning</strong> — A subset of ML using neural networks with many
            layers. It powers breakthroughs in image recognition, natural language
            processing, and generative AI.
          </li>
          <li>
            <strong>Natural Language Processing (NLP)</strong> — Enables machines to
            understand, interpret, and generate human language. Chatbots and translators
            rely on NLP.
          </li>
          <li>
            <strong>Computer Vision</strong> — Allows machines to interpret visual
            information from the world, such as identifying objects in photos or videos.
          </li>
        </ol>
      </Section>

      <Section title="Real-World Applications">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
          <AppCard name="Healthcare" description="AI assists in diagnosing diseases, discovering drugs, and personalizing treatment plans." />
          <AppCard name="Finance" description="Fraud detection, algorithmic trading, and credit scoring are powered by AI models." />
          <AppCard name="Transportation" description="Self-driving cars and route optimization use AI to navigate and make decisions." />
          <AppCard name="Education" description="Adaptive learning platforms tailor content to individual student needs." />
          <AppCard name="Creative Arts" description="Generative AI creates images, music, text, and video from simple prompts." />
          <AppCard name="Customer Service" description="AI chatbots handle inquiries, resolve issues, and provide 24/7 support." />
        </div>
      </Section>

      <Section title="Key Concepts">
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#e8e8f0" }}>
              <th style={tableHeaderStyle}>Concept</th>
              <th style={tableHeaderStyle}>Description</th>
            </tr>
          </thead>
          <tbody>
            <TableRow concept="Training Data" description="The dataset used to teach an AI model patterns and relationships." />
            <TableRow concept="Neural Network" description="A computing system inspired by the human brain's network of neurons." />
            <TableRow concept="Model" description="The mathematical representation learned from data, used to make predictions." />
            <TableRow concept="Inference" description="The process of using a trained model to make predictions on new data." />
            <TableRow concept="Prompt Engineering" description="Crafting effective inputs to guide AI models toward desired outputs." />
            <TableRow concept="Hallucination" description="When an AI generates plausible-sounding but incorrect or fabricated information." />
          </tbody>
        </table>
      </Section>

      <Section title="Ethical Considerations">
        <p>As AI becomes more powerful, important questions arise:</p>
        <ul>
          <li><strong>Bias</strong> — AI can inherit and amplify biases present in training data.</li>
          <li><strong>Privacy</strong> — Large-scale data collection raises concerns about personal privacy.</li>
          <li><strong>Job Displacement</strong> — Automation may transform or eliminate certain roles.</li>
          <li><strong>Transparency</strong> — Many AI models are "black boxes" that are difficult to interpret.</li>
          <li><strong>Accountability</strong> — Determining responsibility when AI systems make harmful decisions.</li>
        </ul>
      </Section>

      <Section title="The Future of AI">
        <p>
          AI is evolving rapidly. Advances in large language models, multimodal AI, and
          autonomous agents are reshaping industries. The future promises more capable,
          efficient, and accessible AI — but it also demands thoughtful governance,
          regulation, and a commitment to building AI that benefits everyone.
        </p>
      </Section>

      <footer style={{ textAlign: "center", marginTop: "50px", padding: "20px", color: "#888", fontSize: "0.9rem" }}>
        <p>Built with React — Explaining AI, one component at a time.</p>
      </footer>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section style={{ marginBottom: "36px" }}>
      <h2 style={{ fontSize: "1.6rem", borderBottom: "2px solid #4a4ae8", paddingBottom: "6px", marginBottom: "14px" }}>
        {title}
      </h2>
      <div style={{ lineHeight: "1.8", fontSize: "1.05rem", color: "#333" }}>
        {children}
      </div>
    </section>
  );
}

function AppCard({ name, description }) {
  return (
    <div style={{ backgroundColor: "#f4f4fb", borderRadius: "10px", padding: "16px", border: "1px solid #ddd" }}>
      <h3 style={{ margin: "0 0 8px 0", color: "#4a4ae8" }}>{name}</h3>
      <p style={{ margin: 0, fontSize: "0.95rem", color: "#555" }}>{description}</p>
    </div>
  );
}

const tableHeaderStyle = {
  textAlign: "left",
  padding: "10px 14px",
  fontWeight: "bold",
  borderBottom: "2px solid #ccc",
};

function TableRow({ concept, description }) {
  return (
    <tr>
      <td style={{ padding: "10px 14px", borderBottom: "1px solid #eee", fontWeight: "600" }}>{concept}</td>
      <td style={{ padding: "10px 14px", borderBottom: "1px solid #eee" }}>{description}</td>
    </tr>
  );
}

export default AIExplained;

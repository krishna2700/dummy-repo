import { useState } from 'react';

/**
 * ExplainAI Component
 * A comprehensive educational component that explains Artificial Intelligence (AI)
 * including concepts, applications, and practical examples.
 */

export default function ExplainAI() {
  const [activeSection, setActiveSection] = useState('introduction');

  const sections = {
    introduction: {
      title: 'What is Artificial Intelligence?',
      content: (
        <div>
          <p>
            Artificial Intelligence (AI) is the simulation of human intelligence processes by computer systems.
            These processes include learning, reasoning, problem-solving, perception, and language understanding.
          </p>
          <p>
            AI systems can analyze vast amounts of data, identify patterns, and make decisions with minimal human intervention.
            It powers many of the technologies we use daily, from voice assistants to recommendation systems.
          </p>
        </div>
      ),
    },
    types: {
      title: 'Types of AI',
      content: (
        <div>
          <h3>1. Narrow AI (Weak AI)</h3>
          <p>
            Designed and trained to perform a specific task. Most AI systems today are narrow AI.
            Examples: Image recognition, chess engines, recommendation algorithms.
          </p>

          <h3>2. General AI (Strong AI)</h3>
          <p>
            Hypothetical AI that could understand, learn, and apply knowledge across different domains
            like human intelligence. This remains a research goal.
          </p>

          <h3>3. Super AI (ASI)</h3>
          <p>
            Theoretical AI that would surpass human intelligence in every aspect.
            Still in the realm of science fiction and philosophical debate.
          </p>
        </div>
      ),
    },
    applications: {
      title: 'Real-World Applications',
      content: (
        <div>
          <ul>
            <li><strong>Healthcare:</strong> Disease diagnosis, drug discovery, personalized treatment</li>
            <li><strong>Finance:</strong> Fraud detection, algorithmic trading, credit assessment</li>
            <li><strong>Transportation:</strong> Self-driving cars, route optimization, autonomous drones</li>
            <li><strong>Retail:</strong> Product recommendations, inventory management, customer service chatbots</li>
            <li><strong>Education:</strong> Personalized learning paths, automated grading, virtual tutors</li>
            <li><strong>Entertainment:</strong> Content recommendations, game AI, creative content generation</li>
          </ul>
        </div>
      ),
    },
    techniques: {
      title: 'Key AI Techniques',
      content: (
        <div>
          <h3>Machine Learning (ML)</h3>
          <p>
            Algorithms that improve performance through experience. Includes supervised learning,
            unsupervised learning, and reinforcement learning.
          </p>

          <h3>Deep Learning (DL)</h3>
          <p>
            Neural networks with multiple layers that can learn complex patterns in large datasets.
            Used for image recognition, natural language processing, and more.
          </p>

          <h3>Natural Language Processing (NLP)</h3>
          <p>
            Enables computers to understand and generate human language. Powers chatbots, translation services,
            and sentiment analysis.
          </p>

          <h3>Computer Vision</h3>
          <p>
            Teaches computers to interpret visual information from images and videos.
            Used in facial recognition, object detection, and medical imaging.
          </p>
        </div>
      ),
    },
    challenges: {
      title: 'Challenges and Considerations',
      content: (
        <div>
          <h3>Technical Challenges</h3>
          <ul>
            <li>Data quality and availability</li>
            <li>Computational resource requirements</li>
            <li>Model explainability and transparency</li>
            <li>Integration with existing systems</li>
          </ul>

          <h3>Ethical Considerations</h3>
          <ul>
            <li><strong>Bias:</strong> AI systems can perpetuate or amplify existing biases in training data</li>
            <li><strong>Privacy:</strong> Concerns about data collection and usage</li>
            <li><strong>Accountability:</strong> Who is responsible for AI decisions?</li>
            <li><strong>Job Displacement:</strong> Impact on workforce and employment</li>
            <li><strong>Security:</strong> Vulnerability to adversarial attacks and misuse</li>
          </ul>
        </div>
      ),
    },
    future: {
      title: 'The Future of AI',
      content: (
        <div>
          <p>
            AI is rapidly evolving and will continue to shape our future in profound ways:
          </p>
          <ul>
            <li><strong>Multimodal AI:</strong> Systems that combine vision, language, and audio</li>
            <li><strong>Federated Learning:</strong> Training on decentralized data for better privacy</li>
            <li><strong>Edge AI:</strong> Running AI models directly on devices instead of cloud servers</li>
            <li><strong>Explainable AI (XAI):</strong> Making AI decisions more transparent and interpretable</li>
            <li><strong>Human-AI Collaboration:</strong> Augmenting human capabilities rather than replacing them</li>
          </ul>
        </div>
      ),
    },
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>🤖 Understanding Artificial Intelligence</h1>
        <p style={styles.subtitle}>
          A comprehensive guide to AI concepts, applications, and future possibilities
        </p>
      </header>

      <nav style={styles.nav}>
        {Object.keys(sections).map((key) => (
          <button
            key={key}
            onClick={() => setActiveSection(key)}
            style={{
              ...styles.navButton,
              ...(activeSection === key ? styles.navButtonActive : {}),
            }}
          >
            {sections[key].title}
          </button>
        ))}
      </nav>

      <main style={styles.main}>
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>{sections[activeSection].title}</h2>
          <div style={styles.sectionContent}>
            {sections[activeSection].content}
          </div>
        </section>
      </main>

      <footer style={styles.footer}>
        <p>
          💡 <strong>Remember:</strong> AI is a tool created by humans. Its impact depends on how we choose to develop and deploy it.
        </p>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px',
    backgroundColor: '#2c3e50',
    color: '#ecf0f1',
    padding: '30px',
    borderRadius: '8px',
  },
  title: {
    fontSize: '2.5em',
    margin: '0 0 10px 0',
  },
  subtitle: {
    fontSize: '1.1em',
    margin: 0,
    opacity: 0.9,
  },
  nav: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginBottom: '30px',
    justifyContent: 'center',
  },
  navButton: {
    padding: '12px 20px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.95em',
    transition: 'all 0.3s ease',
  },
  navButtonActive: {
    backgroundColor: '#e74c3c',
    fontWeight: 'bold',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  main: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  section: {
    minHeight: '400px',
  },
  sectionTitle: {
    color: '#2c3e50',
    fontSize: '1.8em',
    borderBottom: '3px solid #3498db',
    paddingBottom: '10px',
    marginBottom: '20px',
  },
  sectionContent: {
    lineHeight: '1.8',
    color: '#34495e',
    fontSize: '1em',
  },
  footer: {
    marginTop: '30px',
    textAlign: 'center',
    backgroundColor: '#ecf0f1',
    padding: '20px',
    borderRadius: '8px',
    color: '#2c3e50',
  },
};

import React from 'react';

const ExplainAI = () => {
  return (
    <div className="ai-explanation">
      <header>
        <h1>Understanding Artificial Intelligence (AI)</h1>
      </header>

      <section className="intro">
        <h2>What is AI?</h2>
        <p>
          Artificial Intelligence (AI) refers to the simulation of human intelligence
          in machines that are programmed to think, learn, and problem-solve like humans.
          AI systems can perform tasks that typically require human intelligence, such as
          visual perception, speech recognition, decision-making, and language translation.
        </p>
      </section>

      <section className="types">
        <h2>Types of AI</h2>
        <div className="ai-types">
          <div className="type-card">
            <h3>Narrow AI (Weak AI)</h3>
            <p>
              Designed to perform specific tasks. Examples include virtual assistants
              like Siri, recommendation algorithms, and image recognition systems.
            </p>
          </div>
          <div className="type-card">
            <h3>General AI (Strong AI)</h3>
            <p>
              Hypothetical AI that can understand, learn, and apply knowledge across
              different domains, similar to human intelligence. This doesn't exist yet.
            </p>
          </div>
          <div className="type-card">
            <h3>Superintelligent AI</h3>
            <p>
              A theoretical form of AI that surpasses human intelligence in all aspects.
              This remains a concept for the future.
            </p>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <h2>How AI Works</h2>
        <ul>
          <li>
            <strong>Machine Learning:</strong> Algorithms learn from data patterns
            without explicit programming for each scenario.
          </li>
          <li>
            <strong>Deep Learning:</strong> Uses neural networks with multiple layers
            to process complex data like images, text, and sound.
          </li>
          <li>
            <strong>Natural Language Processing (NLP):</strong> Enables machines to
            understand and generate human language.
          </li>
          <li>
            <strong>Computer Vision:</strong> Allows machines to interpret and analyze
            visual information from the world.
          </li>
        </ul>
      </section>

      <section className="applications">
        <h2>Real-World Applications</h2>
        <div className="application-grid">
          <div className="app-item">
            <h4>Healthcare</h4>
            <p>Disease diagnosis, drug discovery, personalized treatment plans</p>
          </div>
          <div className="app-item">
            <h4>Transportation</h4>
            <p>Self-driving cars, traffic optimization, route planning</p>
          </div>
          <div className="app-item">
            <h4>Finance</h4>
            <p>Fraud detection, algorithmic trading, credit scoring</p>
          </div>
          <div className="app-item">
            <h4>Entertainment</h4>
            <p>Content recommendations, game AI, music generation</p>
          </div>
          <div className="app-item">
            <h4>Education</h4>
            <p>Personalized learning, automated grading, intelligent tutoring</p>
          </div>
          <div className="app-item">
            <h4>Customer Service</h4>
            <p>Chatbots, virtual assistants, sentiment analysis</p>
          </div>
        </div>
      </section>

      <section className="benefits-challenges">
        <div className="benefits">
          <h2>Benefits of AI</h2>
          <ul>
            <li>Automation of repetitive tasks</li>
            <li>Improved accuracy and efficiency</li>
            <li>24/7 availability without fatigue</li>
            <li>Data-driven insights and predictions</li>
            <li>Enhanced decision-making capabilities</li>
          </ul>
        </div>

        <div className="challenges">
          <h2>Challenges & Considerations</h2>
          <ul>
            <li>Ethical concerns and bias in algorithms</li>
            <li>Job displacement and workforce changes</li>
            <li>Privacy and data security issues</li>
            <li>Lack of transparency in decision-making</li>
            <li>Need for regulation and governance</li>
          </ul>
        </div>
      </section>

      <section className="future">
        <h2>The Future of AI</h2>
        <p>
          AI continues to evolve rapidly, with advancements in areas like quantum computing,
          edge AI, and explainable AI. As the technology matures, we can expect more
          sophisticated applications that will transform industries and daily life. The key
          will be developing AI responsibly, ensuring it benefits humanity while addressing
          ethical and societal concerns.
        </p>
      </section>

      <footer>
        <p className="disclaimer">
          This is an educational overview of Artificial Intelligence. AI is a vast and
          rapidly evolving field with many nuances and ongoing developments.
        </p>
      </footer>
    </div>
  );
};

export default ExplainAI;

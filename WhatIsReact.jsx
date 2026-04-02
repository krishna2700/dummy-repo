// WhatIsReact.jsx - A simple explanation of React

function WhatIsReact() {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "600px", margin: "40px auto", padding: "20px", border: "1px solid #61dafb", borderRadius: "8px" }}>
      <h1 style={{ color: "#61dafb" }}>⚛️ What is React?</h1>
      <p>React is a <strong>JavaScript library</strong> built by Meta for creating fast, interactive user interfaces.</p>
      <p>It breaks your UI into small, reusable pieces called <strong>components</strong> — each managing its own logic and appearance.</p>
      <p>React uses a <strong>Virtual DOM</strong> to efficiently update only the parts of the page that actually changed, making apps blazing fast.</p>
      <p>Data flows through components via <strong>props</strong> (parent → child) and local state is managed with <strong>hooks</strong> like <code>useState</code> and <code>useEffect</code>.</p>
      <p>You write components using <strong>JSX</strong> — a syntax that looks like HTML but lives inside JavaScript, making UI code intuitive and readable.</p>
      <p>React is <strong>declarative</strong>: you describe <em>what</em> the UI should look like, and React figures out <em>how</em> to render it efficiently.</p>
      <p style={{ color: "#888" }}>🚀 React powers millions of apps — from Facebook and Instagram to countless startups worldwide.</p>
    </div>
  );
}

export default WhatIsReact;

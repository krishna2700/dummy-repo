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
      <p>React's massive ecosystem (React Router, Redux, Next.js) makes it the go-to choice for building everything from simple SPAs to large-scale web applications.</p>
    </div>
  );
}

export default WhatIsReact;

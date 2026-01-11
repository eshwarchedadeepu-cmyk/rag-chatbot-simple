"use client";

import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  const sendMessage = () => {
    if (!input) return;

    setMessages([...messages, "You: " + input]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [...prev, "Bot: Hello! I am working 😊"]);
    }, 500);
  };

  return (
    <main style={{ padding: 20 }}>
      <h2>Simple Chatbot</h2>

      <div style={{ marginBottom: 20 }}>
        {messages.map((msg, i) => (
          <div key={i}>{msg}</div>
        ))}
      </div>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
        style={{ padding: 8, width: "70%" }}
      />
      <button onClick={sendMessage} style={{ padding: 8, marginLeft: 10 }}>
        Send
      </button>
    </main>
  );
}

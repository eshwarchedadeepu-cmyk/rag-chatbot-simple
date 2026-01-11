"use client";

import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [messages, setMessages] = useState<any[]>([]);

  async function sendMessage() {
    if (!input && !image) return;

    const formData = new FormData();
    formData.append("message", input);
    if (image) formData.append("image", image);

    setMessages((prev) => [
      ...prev,
      { role: "user", content: input || "[Image uploaded]" },
    ]);

    setInput("");
    setImage(null);

    const res = await fetch("/api/chat", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setMessages((prev) => [...prev, data]);
  }

  return (
    <main style={{ padding: 20 }}>
      <h2>Multimodal RAG Chatbot</h2>

      <div style={{ border: "1px solid #ccc", padding: 10, minHeight: 300 }}>
        {messages.map((m, i) => (
          <p key={i}>
            <b>{m.role}:</b> {m.content}
          </p>
        ))}
      </div>

      <input
        type="text"
        placeholder="Ask something..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ width: "70%", marginTop: 10 }}
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
        style={{ marginLeft: 10 }}
      />

      <button onClick={sendMessage} style={{ marginLeft: 10 }}>
        Send
      </button>
    </main>
  );
}

import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  const body = await req.json();
  const messages = body.messages || [];
  const userMessage = messages[messages.length - 1]?.content || "";

  // Load knowledge base (RAG)
  const filePath = path.join(process.cwd(), "app/data/knowledge.txt");
  const knowledge = fs.readFileSync(filePath, "utf-8");

  // Simple RAG: inject knowledge into response
  const responseText = `
Answer based on retrieved knowledge:

${knowledge}

User Question:
${userMessage}
`;

  return NextResponse.json({
    role: "assistant",
    content: responseText,
  });
}

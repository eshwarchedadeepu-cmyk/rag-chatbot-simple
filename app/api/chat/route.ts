import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  const formData = await req.formData();

  const message = formData.get("message") as string;
  const image = formData.get("image") as File | null;

  // Load knowledge base (RAG)
  const filePath = path.join(process.cwd(), "app/data/knowledge.txt");
  const knowledge = fs.readFileSync(filePath, "utf-8");

  let responseText = `Based on knowledge:\n${knowledge}\n\n`;

  if (image) {
    responseText += `I received an image (${image.name}) along with your question.\n`;
  }

  responseText += `User Question:\n${message}`;

  return NextResponse.json({
    role: "assistant",
    content: responseText,
  });
}

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const messagesFilePath = path.join(process.cwd(), 'data', 'messages.json');

// Ensure the data directory exists
const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

// Ensure the messages.json file exists and is valid JSON
if (!fs.existsSync(messagesFilePath)) {
  fs.writeFileSync(messagesFilePath, JSON.stringify([]));
}

export async function GET() {
  try {
    const messages = JSON.parse(fs.readFileSync(messagesFilePath, 'utf-8'));
    return NextResponse.json(messages);
  } catch (error) {
    console.error('Error reading messages file:', error);
    return NextResponse.json({ error: 'Failed to read messages' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { title, content, authorEmail, authorImage } = await req.json();
    if (!title || !content || !authorEmail) {
      return NextResponse.json({ error: 'Title, content, and authorEmail are required' }, { status: 400 });
    }

    const messages = JSON.parse(fs.readFileSync(messagesFilePath, 'utf-8'));
    const newId = messages.length > 0 ? Math.max(...messages.map((m: any) => m.id)) + 1 : 1;
    const newMessage = { id: newId, title, content, createdAt: new Date().toISOString(), authorEmail, authorImage: authorImage || null };
    messages.push(newMessage);
    fs.writeFileSync(messagesFilePath, JSON.stringify(messages, null, 2));

    return NextResponse.json(newMessage, { status: 201 });
  } catch (error) {
    console.error('Error writing message file:', error);
    return NextResponse.json({ error: 'Failed to publish message' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Message ID is required' }, { status: 400 });
    }

    let messages = JSON.parse(fs.readFileSync(messagesFilePath, 'utf-8'));
    const initialLength = messages.length;
    messages = messages.filter((m: any) => m.id !== parseInt(id));

    if (messages.length === initialLength) {
      return NextResponse.json({ error: 'Message not found' }, { status: 404 });
    }

    fs.writeFileSync(messagesFilePath, JSON.stringify(messages, null, 2));

    return NextResponse.json({ message: 'Message deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting message file:', error);
    return NextResponse.json({ error: 'Failed to delete message' }, { status: 500 });
  }
}


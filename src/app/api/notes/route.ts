import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Note from '@/models/Note';
import { getUserIdFromToken } from '@/lib/auth';

export async function GET(req: NextRequest) {
  await dbConnect();
  
  try {
    const userId = getUserIdFromToken(req);
    if (!userId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const notes = await Note.find({ userId }).sort({ createdAt: 'desc' });
    return NextResponse.json(notes, { status: 200 });

  } catch (error) {
    console.error('Failed to get notes:', error);
    return NextResponse.json({ message: 'An internal server error occurred' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const userId = getUserIdFromToken(req);
    if (!userId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { title, content } = await req.json();

    if (!content) {
      return NextResponse.json({ message: 'Content is required' }, { status: 400 });
    }

    const newNote = await Note.create({
      title: title || 'Untitled',
      content,
      userId,
    });

    return NextResponse.json(newNote, { status: 201 });

  } catch (error) {
    console.error('Failed to create note:', error);
    return NextResponse.json({ message: 'An internal server error occurred' }, { status: 500 });
  }
}

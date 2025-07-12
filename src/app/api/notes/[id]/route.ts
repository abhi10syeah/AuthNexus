import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Note from '@/models/Note';
import { getUserIdFromToken } from '@/lib/auth';
import mongoose from 'mongoose';

type Params = {
    params: {
        id: string;
    }
}

export async function PUT(req: NextRequest, { params }: Params) {
    await dbConnect();

    try {
        const userId = getUserIdFromToken(req);
        if (!userId) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const { id } = params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ message: 'Invalid note ID' }, { status: 400 });
        }

        const { title, content } = await req.json();
        if (!content) {
            return NextResponse.json({ message: 'Content is required' }, { status: 400 });
        }

        const note = await Note.findById(id);

        if (!note) {
            return NextResponse.json({ message: 'Note not found' }, { status: 404 });
        }

        if (note.userId.toString() !== userId) {
            return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
        }

        note.title = title || 'Untitled';
        note.content = content;

        const updatedNote = await note.save();

        return NextResponse.json(updatedNote, { status: 200 });

    } catch (error) {
        console.error('Failed to update note:', error);
        return NextResponse.json({ message: 'An internal server error occurred' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  await dbConnect();
  
  try {
    const userId = getUserIdFromToken(req);
    if (!userId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({ message: 'Invalid note ID' }, { status: 400 });
    }

    const note = await Note.findById(id);

    if (!note) {
      return NextResponse.json({ message: 'Note not found' }, { status: 404 });
    }

    if (note.userId.toString() !== userId) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    await Note.findByIdAndDelete(id);

    return NextResponse.json({ message: 'Note deleted successfully' }, { status: 200 });

  } catch (error) {
    console.error('Failed to delete note:', error);
    return NextResponse.json({ message: 'An internal server error occurred' }, { status: 500 });
  }
}

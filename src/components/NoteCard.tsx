"use client";

import { Note, useNotes } from "@/context/NotesContext";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default function NoteCard({ note }: { note: Note }) {
  const { deleteNote } = useNotes();

  return (
    <Card className="flex flex-col break-inside-avoid animate-in fade-in-0 zoom-in-95">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{note.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground whitespace-pre-wrap">{note.content}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center text-xs text-muted-foreground">
        <span>
            {formatDistanceToNow(new Date(note.createdAt), { addSuffix: true })}
        </span>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-destructive"
          onClick={() => deleteNote(note.id)}
        >
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Delete note</span>
        </Button>
      </CardFooter>
    </Card>
  );
}

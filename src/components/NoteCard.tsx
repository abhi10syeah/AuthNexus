"use client";

import { useState } from "react";
import { Note } from "@/context/NotesContext";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "./ui/card";
import { formatDistanceToNow } from "date-fns";
import EditNoteDialog from "./EditNoteDialog";

export default function NoteCard({ note }: { note: Note }) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  return (
    <>
      <Card 
        className="flex flex-col break-inside-avoid animate-in fade-in-0 zoom-in-95 cursor-pointer hover:shadow-lg transition-shadow"
        onClick={() => setIsEditDialogOpen(true)}
      >
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
        </CardFooter>
      </Card>
      <EditNoteDialog 
        note={note}
        isOpen={isEditDialogOpen}
        setIsOpen={setIsEditDialogOpen}
      />
    </>
  );
}

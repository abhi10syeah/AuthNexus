"use client";

import { useNotes } from "@/context/NotesContext";
import NoteForm from "./NoteForm";
import NoteCard from "./NoteCard";
import { Skeleton } from "./ui/skeleton";
import { Lightbulb } from "lucide-react";

export default function NotesDashboard() {
  const { notes, isLoading } = useNotes();

  return (
    <div className="w-full">
      <NoteForm />
      
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      ) : notes.length > 0 ? (
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {notes.slice().reverse().map(note => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      ) : (
        <div className="text-center text-muted-foreground py-16 animate-in fade-in-0">
          <Lightbulb className="mx-auto h-12 w-12" />
          <p className="mt-4 text-lg">Your notes will appear here.</p>
        </div>
      )}
    </div>
  );
}

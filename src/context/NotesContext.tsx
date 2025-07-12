"use client";

import { createContext, useState, useEffect, useContext, type ReactNode, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface Note {
  id: string;
  _id?: string; // MongoDB ID
  title: string;
  content: string;
  createdAt: string;
}

interface NotesContextType {
  notes: Note[];
  addNote: (title: string, content: string) => Promise<void>;
  updateNote: (id: string, title: string, content: string) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
  isLoading: boolean;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const NotesProvider = ({ children }: { children: ReactNode }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, token } = useAuth();
  const { toast } = useToast();

  const fetchNotes = useCallback(async () => {
    if (!isAuthenticated || !token) {
        setNotes([]);
        setIsLoading(false);
        return;
    };
    
    setIsLoading(true);
    try {
      const res = await fetch('/api/notes', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!res.ok) throw new Error('Failed to fetch notes');
      
      const data: Note[] = await res.json();
      // Map MongoDB's _id to id for consistency
      const formattedNotes = data.map(note => ({ ...note, id: note._id! }));
      setNotes(formattedNotes);

    } catch (error) {
      console.error("Failed to fetch notes from API", error);
      toast({ variant: 'destructive', title: 'Error', description: 'Could not fetch your notes.' });
      setNotes([]);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, token, toast]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const addNote = async (title: string, content: string) => {
    if (!token) return;
    try {
      const res = await fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title, content })
      });
      if (!res.ok) throw new Error('Failed to add note');
      
      await fetchNotes();

    } catch (error) {
      console.error("Failed to add note", error);
      toast({ variant: 'destructive', title: 'Error', description: 'Could not save your note.' });
    }
  };

  const updateNote = async (id: string, title: string, content: string) => {
    if (!token) return;

    const originalNotes = [...notes];
    const updatedNote = { ...notes.find(n => n.id === id)!, title, content };
    setNotes(notes.map(n => n.id === id ? updatedNote : n));

    try {
      const res = await fetch(`/api/notes/${id}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ title, content })
      });
      if (!res.ok) throw new Error('Failed to update note');
      
      // Refetch for consistency, although optimistic update is in place
      await fetchNotes();

    } catch (error) {
      console.error("Failed to update note", error);
      toast({ variant: 'destructive', title: 'Error', description: 'Could not update your note.' });
      setNotes(originalNotes); // Rollback
    }
  };

  const deleteNote = async (id: string) => {
    if (!token) return;
    const originalNotes = [...notes];
    
    setNotes(notes.filter(note => note.id !== id));

    try {
      const res = await fetch(`/api/notes/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to delete note');
      
    } catch (error) {
      console.error("Failed to delete note", error);
      toast({ variant: 'destructive', title: 'Error', description: 'Could not delete your note.' });
      setNotes(originalNotes);
    }
  };
  
  const value = { notes, addNote, updateNote, deleteNote, isLoading };

  return (
    <NotesContext.Provider value={value}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (context === undefined) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
};

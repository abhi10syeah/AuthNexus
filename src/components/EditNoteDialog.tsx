
"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Note, useNotes } from "@/context/NotesContext";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Trash2 } from "lucide-react";

const formSchema = z.object({
  title: z.string(),
  content: z.string().min(1, { message: "Note content cannot be empty." }),
});

interface EditNoteDialogProps {
  note: Note;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function EditNoteDialog({ note, isOpen, setIsOpen }: EditNoteDialogProps) {
  const { updateNote, deleteNote } = useNotes();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: note.title,
      content: note.content,
    },
  });

  useEffect(() => {
    if (isOpen) {
      form.reset({
        title: note.title,
        content: note.content,
      });
    }
  }, [isOpen, note, form]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    updateNote(note.id, values.title || "Untitled", values.content);
    setIsOpen(false);
  };

  const handleDelete = () => {
    deleteNote(note.id);
    setIsOpen(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Edit Note</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input 
                      placeholder="Title" 
                      className="border-none focus-visible:ring-0 text-lg font-medium px-1" 
                      {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Take a note..."
                      className="border-none focus-visible:ring-0 min-h-[150px] px-1"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="flex justify-between items-center sm:justify-between w-full">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-destructive"
                onClick={handleDelete}
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete note</span>
              </Button>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

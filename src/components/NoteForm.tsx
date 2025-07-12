"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNotes } from "@/context/NotesContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";

const formSchema = z.object({
  title: z.string(),
  content: z.string().min(1, { message: "Note content cannot be empty." }),
});

export default function NoteForm() {
  const { addNote } = useNotes();
  const [isExpanded, setIsExpanded] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: "", content: "" },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    addNote(values.title || "Untitled", values.content);
    form.reset();
    setIsExpanded(false);
  };

  return (
    <div className="w-full max-w-lg mx-auto mb-8">
      <Card className="shadow-lg">
        <CardContent className="p-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              {isExpanded && (
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input 
                          placeholder="Title" 
                          className="border-none focus-visible:ring-0 text-base font-medium" 
                          {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Take a note..."
                        className="border-none focus-visible:ring-0 min-h-[60px]"
                        onFocus={() => setIsExpanded(true)}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {isExpanded && (
                <div className="flex justify-end">
                  <Button type="submit" size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Note
                  </Button>
                </div>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

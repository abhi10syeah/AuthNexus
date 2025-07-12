"use client";

import { useAuth } from "@/context/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";
import NotesDashboard from "@/components/NotesDashboard";
import LandingPage from "@/components/LandingPage";

export default function Home() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="space-y-8">
        <Skeleton className="h-40 w-full md:w-1/2 mx-auto" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  return isAuthenticated ? <NotesDashboard /> : <LandingPage />;
}

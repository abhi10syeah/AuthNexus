"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Mail, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  const { user, isLoading, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/login');
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading || !isAuthenticated || !user) {
    return (
      <div className="flex justify-center items-center py-12">
        <Card className="w-full max-w-md">
          <CardHeader className="items-center text-center">
            <Skeleton className="h-24 w-24 rounded-full" />
            <Skeleton className="h-6 w-32 mt-4" />
            <Skeleton className="h-4 w-48 mt-2" />
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </CardContent>
          <CardFooter>
             <Skeleton className="h-10 w-full" />
          </CardFooter>
        </Card>
      </div>
    );
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  return (
    <div className="flex justify-center items-center py-12 animate-in fade-in-0 zoom-in-95">
      <Card className="w-full max-w-md">
        <CardHeader className="items-center text-center">
           <Avatar className="h-24 w-24 mb-4">
              <AvatarFallback className="text-4xl bg-primary text-primary-foreground">
                {getInitials(user.name)}
              </AvatarFallback>
           </Avatar>
          <CardTitle className="text-2xl font-headline">{user.name}</CardTitle>
          <CardDescription>{user.email}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
            <div className="flex items-center rounded-md border p-3">
                <User className="mr-3 h-5 w-5 text-muted-foreground" />
                <p>{user.name}</p>
            </div>
            <div className="flex items-center rounded-md border p-3">
                <Mail className="mr-3 h-5 w-5 text-muted-foreground" />
                <p>{user.email}</p>
            </div>
        </CardContent>
        <CardFooter>
            <Button onClick={logout} variant="destructive" className="w-full">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

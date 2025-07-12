"use client";

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut, User, LogIn, UserPlus, Fingerprint } from 'lucide-react';
import { Skeleton } from './ui/skeleton';

const Header = () => {
  const { isAuthenticated, isLoading, logout } = useAuth();

  return (
    <header className="border-b sticky top-0 bg-background/95 backdrop-blur-sm z-10">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary transition-transform hover:scale-105">
          <Fingerprint className="h-7 w-7" />
          <h1 className="font-headline">AuthNexus</h1>
        </Link>
        <div className="flex items-center gap-2 sm:gap-4">
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Skeleton className="h-9 w-24 rounded-md" />
              <Skeleton className="h-9 w-24 rounded-md" />
            </div>
          ) : isAuthenticated ? (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link href="/profile">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              </Button>
              <Button onClick={logout} variant="secondary" size="sm">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link href="/login">
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/register">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Register
                </Link>
              </Button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;

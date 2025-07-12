"use client";

import { createContext, useState, useEffect, useContext, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  register: (name: string, email: string, pass: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('authUser');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem('authUser');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, pass: string) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));

    try {
      // This is a mock implementation.
      // In a real app, you would verify password hash.
      const storedData = localStorage.getItem('users');
      const users = storedData ? JSON.parse(storedData) : {};
      const storedUser = Object.values(users).find((u: any) => u.email === email) as User | undefined;

      if (storedUser) {
        localStorage.setItem('authUser', JSON.stringify(storedUser));
        setUser(storedUser);
        router.push('/profile');
        toast({ title: "Login Successful", description: `Welcome back, ${storedUser.name}!` });
      } else {
        toast({ variant: "destructive", title: "Login Failed", description: "Invalid email or password." });
      }
    } catch (error) {
      toast({ variant: "destructive", title: "An error occurred", description: "Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, pass: string) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));

    try {
      // This is a mock implementation.
      const storedData = localStorage.getItem('users');
      const users = storedData ? JSON.parse(storedData) : {};
      
      if (Object.values(users).some((u: any) => u.email === email)) {
        toast({ variant: "destructive", title: "Registration Failed", description: "Email already in use." });
        setIsLoading(false);
        return;
      }

      const newUser: User = { id: Date.now().toString(), name, email };
      users[newUser.id] = newUser;

      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('authUser', JSON.stringify(newUser));
      setUser(newUser);
      router.push('/profile');
      toast({ title: "Registration Successful", description: `Welcome, ${name}!` });
    } catch (error) {
        toast({ variant: "destructive", title: "Registration Failed", description: "An error occurred." });
    } finally {
        setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('authUser');
    setUser(null);
    router.push('/login');
    toast({ title: "Logged Out", description: "You have been successfully logged out." });
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

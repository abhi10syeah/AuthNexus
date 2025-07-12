import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 animate-in fade-in-0 zoom-in-95">
      <div className="bg-primary/10 p-4 rounded-full mb-6 border border-primary/20">
        <ShieldCheck className="h-12 w-12 text-primary" />
      </div>
      <h1 className="text-4xl md:text-6xl font-bold font-headline mb-4">
        Welcome to <span className="text-primary">AuthNexus</span>
      </h1>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
        Your secure, modern, and seamless authentication partner. Join us to experience a new level of security and user experience.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild size="lg">
          <Link href="/register">
            Get Started <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/login">Sign In</Link>
        </Button>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, CheckCircle2 } from "lucide-react";

interface ContactModalProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function ContactModal({ children, open, onOpenChange }: ContactModalProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;
  
  const setIsOpen = (val: boolean) => {
    if (onOpenChange) onOpenChange(val);
    if (!isControlled) setInternalOpen(val);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messageValue, setMessageValue] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const message = formData.get("message")?.toString().trim();

    if (!name || !email || !message) {
      setError("Please fill in all fields.");
      setIsSubmitting(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please provide a valid email address.");
      setIsSubmitting(false);
      return;
    }

    const data = { name, email, message };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message");
      }

      setIsSuccess(true);
      setMessageValue(""); // Clear message
      
      // Close after a delay
      setTimeout(() => {
        setIsOpen(false);
        setIsSuccess(false);
      }, 3000);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenChange = (val: boolean) => {
    setIsOpen(val);
    if (!val) {
      setError(null);
      setIsSuccess(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white/90 dark:bg-black/80 backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-2xl">
        <DialogHeader>
          <DialogTitle>Send a Message</DialogTitle>
          <DialogDescription>
            Have a project in mind or just want to say hi? Fill out the form below.
          </DialogDescription>
        </DialogHeader>

        {isSuccess ? (
          <div className="py-10 flex flex-col items-center justify-center text-center space-y-4 animate-in fade-in zoom-in duration-300">
            <CheckCircle2 className="h-16 w-16 text-green-500" />
            <div className="space-y-1">
              <h3 className="font-semibold text-lg">Message Sent!</h3>
              <p className="text-sm text-muted-foreground">
                Thank you for reaching out. I'll get back to you soon.
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 pt-4" noValidate>
            {error && (
              <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-xs font-medium animate-in fade-in slide-in-from-top-1">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Name</label>
              <Input id="name" name="name" placeholder="Your name" required className="bg-background/50" />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <Input id="email" name="email" type="email" placeholder="your@email.com" required className="bg-background/50" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label htmlFor="message" className="text-sm font-medium">Message</label>
                <span className="text-[10px] text-muted-foreground">
                  {messageValue.length}/300
                </span>
              </div>
              <Textarea
                id="message"
                name="message"
                placeholder="What's on your mind?"
                className="min-h-[120px] bg-background/50 resize-none"
                required
                maxLength={300}
                value={messageValue}
                onChange={(e) => setMessageValue(e.target.value)}
              />
            </div>
            <DialogFooter>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

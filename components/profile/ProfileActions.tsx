"use client";

import { Button } from "@/components/ui/button";
import { Mail, Github, Linkedin, Download, Check, Copy, MessageSquare } from "lucide-react";
import { contact } from "@/data/contact";
import { useState } from "react";
import ContactModal from "../common/ContactModal";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function ProfileActions() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <TooltipProvider>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:flex-wrap">
        {/* Icon actions */}
        <div className="flex gap-3 justify-center sm:justify-start">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon" variant="outline" onClick={copyEmail} aria-label="Copy email" className="cursor-pointer">
                {copied ? <Check className="h-4 w-4 text-green-500" /> : <Mail className="h-4 w-4" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>Copy Email</TooltipContent>
          </Tooltip>

          <Tooltip open={isModalOpen ? false : undefined}>
            <TooltipTrigger asChild>
              <div>
                <ContactModal open={isModalOpen} onOpenChange={setIsModalOpen}>
                  <Button size="icon" variant="outline" aria-label="Send message" className="cursor-pointer">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </ContactModal>
              </div>
            </TooltipTrigger>
            <TooltipContent>Send Message</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon" variant="outline" asChild className="cursor-pointer">
                <a
                  href={contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                >
                  <Github className="h-4 w-4" />
                </a>
              </Button>
            </TooltipTrigger>
            <TooltipContent>GitHub</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon" variant="outline" asChild className="cursor-pointer">
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              </Button>
            </TooltipTrigger>
            <TooltipContent>LinkedIn</TooltipContent>
          </Tooltip>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground text-center sm:text-left">
            {copied ? "Email copied!" : "Let’s work together"}
          </span>
        </div>

        {/* CTA */}
        <Button
          asChild
          className="w-full sm:w-auto sm:ml-auto group relative overflow-hidden cursor-pointer"
        >
          <a href={contact.resumeUrl} download>
            <Download className="h-4 w-4 mr-2 group-hover:translate-y-1 transition-transform" />
            Get My Resume
            <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
          </a>
        </Button>
      </div>
    </TooltipProvider>
  );
}
import { Button } from "@/components/ui/button";
import { Mail, Github, Linkedin, Download } from "lucide-react";
import { contact } from "@/data/contact";

export default function ProfileActions() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:flex-wrap">
      {/* Icon actions */}
      <div className="flex gap-3 justify-center sm:justify-start">
        <Button size="icon" variant="outline" asChild>
          <a href={`mailto:${contact.email}`} aria-label="Email me">
            <Mail className="h-4 w-4" />
          </a>
        </Button>

        <Button size="icon" variant="outline" asChild>
          <a
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
          >
            <Github className="h-4 w-4" />
          </a>
        </Button>

        <Button size="icon" variant="outline" asChild>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
          >
            <Linkedin className="h-4 w-4" />
          </a>
        </Button>
      </div>

      <span className="text-sm text-muted-foreground text-center sm:text-left">
        Let’s work together
      </span>

      {/* CTA */}
      <Button
        asChild
        className="w-full sm:w-auto sm:ml-auto"
      >
        <a href={contact.resumeUrl} download>
          <Download className="h-4 w-4 mr-2" />
          Get My Resume
        </a>
      </Button>
    </div>
  );
}
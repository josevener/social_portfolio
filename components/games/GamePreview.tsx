"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type Props = {
  title: string
  description: string
  url: string
  thumbnail: string
}

export function GamePreview({ title, description, url, thumbnail }: Props) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [iframeKey, setIframeKey] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const refreshGame = () => {
    setIsLoading(true)
    setIframeKey((prev) => prev + 1)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {!isPlaying ? (
          <>
            <div className="relative w-full aspect-[16/10] rounded-md overflow-hidden border">
              <img
                src={thumbnail}
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-sm text-muted-foreground">
              {description}
            </p>

            <Button onClick={() => setIsPlaying(true)}>
              Play Game
            </Button>
          </>
        ) : (
          <>
            <div className="relative w-full h-[80vh] md:h-[90vh] rounded-md overflow-hidden border">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/80 text-sm">
                  Loading...
                </div>
              )}

              <iframe
                key={iframeKey}
                src={url}
                className="absolute inset-0 w-full h-full"
                allowFullScreen
                onLoad={() => setIsLoading(false)}
              />
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={refreshGame}>
                Refresh Game
              </Button>

              <Button
                variant="ghost"
                onClick={() => setIsPlaying(false)}
              >
                Close
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
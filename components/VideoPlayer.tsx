"use client";
import { Ghost, XIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

export default function VideoPlayer() {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div>
      <Button
        size="lg"
        variant={"ghost"}
        onClick={() => setShowVideo(true)}
        className="border-1"
      >
        Watch Demo
      </Button>

      {showVideo && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/60 flex items-center justify-center z-50">
          <div className="relative w-full max-w-4xl">
            <Button
              variant={"ghost"}
              onClick={() => setShowVideo(false)}
              className="absolute top-2 right-2 bg-gray-500 text-white hover:text-white px-3 py-1 rounded hover:bg-red-600/80 dark:hover:bg-red-600/80 z-10"
            >
              <XIcon />
            </Button>
            <iframe
              className="w-full h-[calc(100vw*(9/16))] max-h-[70vh] rounded shadow-lg"
              src="https://www.youtube.com/embed/I3pyUYANmdQ"
              title="Prototype demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}

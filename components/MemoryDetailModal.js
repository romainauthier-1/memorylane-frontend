import { useState, useEffect } from "react";
import Image from "next/image";

export default function MemoryDetailModal({ memory, onClose }) {
  const backendURL = process.env.NEXT_PUBLIC_URL_BACKEND;

  const memoriesToDisplay = memory.medias.map((media, i) => {
    const finalSrc =
      media.url && media.url.startsWith("http")
        ? media.url
        : `${backendURL}${media.url}`;
    const videoUrl = media.url.replace(/\.[^/.]+$/, ".mp4");
    return (
      <div
        key={i}
        className="snap-center shrink-0 w-full flex flex-col items-center justify-center p-4 no-scrollbar"
      >
        <div className="relative flex flex-col items-center justify-center h-full w-full">
          {media.type === "image" && (
            <Image
              src={finalSrc}
              width={800}
              height={600}
              className="rounded-xl shadow-2xl object-contain max-h-[60vh] border-8 border-white"
              alt={`${memory.title} - i`}
            />
          )}
          {media.type === "video" && (
            <video
              controls
              src={videoUrl}
              preload="auto"
              className="rounded-xl shadow-2xl object-contain max-h-[60vh] border-8 border-white"
              alt={`${memory.title} - i`}
              width={800}
              height={600}
            />
          )}
          {media.type === "audio" && (
            <audio
              controls
              src={finalSrc}
              className="rounded-xl shadow-2xl object-contain max-h-[60vh] border-8 border-white"
              alt={`${memory.title} - i`}
              width={800}
              height={600}
            />
          )}
          {media.caption && (
            <div className="w-full flex justify-center mt-4 mb-2">
              <p className="text-white text-center italic bg-black/30 backdrop-blur-md p-4 rounded-2xl w-full max-w-2xl text-sm md:text-base border border-white/10 shadow-lg overflow-y-auto max-h-[20vh]">
                {media.caption}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  });

  const formatDate = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);

    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-10">
      <div
        className="relative w-full max-w-6xl h-[90vh] rounded-3xl overflow-hidden flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.5)]"
        style={{
          background: `linear-gradient(180deg, ${memory.colors[0]}cc 0%, #111 100%)`,
          border: `1px solid ${memory.colors[1]}55`,
        }}
      >
        <div className="flex justify-between items-center p-6 z-10">
          <div className="flex flex-col">
            <h3
              style={{ color: memory.colors[1] }}
              className="text-3xl font-bold tracking-tighter drop-shadow-sm"
            >
              {memory.title}
            </h3>
            <span className="text-white/70 text-sm font-mono mt-1">
              {memory.type === "period"
                ? `Du ${formatDate(memory.startDate)} au ${formatDate(memory.endDate)}`
                : formatDate(memory.startDate)}
            </span>
            <span className="text-white/70 text-sm font-mono mt-1">
              {memory.description}
            </span>
          </div>
          <button
            onClick={onClose}
            className="bg-white/10 hover:bg-white/20 text-white rounded-full w-12 h-12 flex items-center justify-center transition-all border border-white/20"
          >
            ✕
          </button>
        </div>
        <div className="flex-1 flex flex-row overflow-x-auto snap-x snap-mandatory no-scrollbar">
          {memoriesToDisplay}
        </div>
      </div>
    </div>
  );
}

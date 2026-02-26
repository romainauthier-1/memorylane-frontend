import { useState, useEffect } from "react";
import Image from "next/image";

export default function MemoryDetailModal({ memory, onClose }) {
  const backendURL = process.env.NEXT_PUBLIC_URL_BACKEND;

  const memoriesToDisplay = memory.medias.map((media, i) => {
    const finalSrc =
      media.url && media.url.startsWith("http")
        ? media.url
        : `${backendURL}${media.url}`;
    return (
      <div key={i}>
        <Image
          src={finalSrc}
          width={600}
          height={600}
          className="rounded-3xl flex-shrink-0 object-contain max-h-[70vh] max-w-[70vw]"
          alt={memory.title + i}
        />
        <p className="text-justify">{media.caption}</p>
      </div>
    );
  });

  return (
    <div className="z-10 fixed inset-0 bg-black/70 flex flex-col items-center justify-center min-h-screen max-w-full">
      <div
        style={{ backgroundColor: memory.colors[0] }}
        className=" h-4/5 w-4/5 rounded-xl flex flex-col "
      >
        <button className="text-right m-3 p-3" onClick={onClose}>
          X
        </button>
        <h3
          style={{ color: memory.colors[1] }}
          className="text-center m-3 p-3 text-4xl tracking-wider"
        >
          {memory.title}
        </h3>
        <div className="flex flex-row flex-nowrap w-full h-full justify-evenly items-center overflow-x-scroll">
          {memoriesToDisplay}
        </div>
      </div>
    </div>
  );
}

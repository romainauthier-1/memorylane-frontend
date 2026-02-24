import { useState, useEffect } from "react";
import Image from "next/image";

function MemoryCard({ title, src, caption, onDetailClick }) {
  const backendURL = process.env.NEXT_PUBLIC_URL_BACKEND;
  const finalSrc = src && src.startsWith("http") ? src : `${backendURL}${src}`;
  return (
    <div
      onClick={onDetailClick}
      className="border-indigo-600 border-2 bg-white rounded-xl shadow-xl m-6 p-6 flex flex-col"
    >
      <Image
        className="object-cover rounded-md"
        width="150"
        height="150"
        alt={title}
        src={finalSrc}
      />
      <h2 className="font-bold text-center p-2">{title}</h2>
      <p className="text-center p-2">{caption}</p>
    </div>
  );
}

export default MemoryCard;

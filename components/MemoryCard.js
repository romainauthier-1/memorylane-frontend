import { useState, useEffect } from "react";
import Image from "next/image";

function MemoryCard({ title, src, caption }) {
  return (
    <div className="border-indigo-600 border-2 bg-white rounded-xl shadow-xl m-6 p-6 flex flex-col">
      <Image
        className="object-cover rounded-md"
        width="150"
        height="150"
        alt={title}
        src={`${process.env.NEXT_PUBLIC_URL_BACKEND}${src}`}
      />
      <h2 className="font-bold text-center p-2">{title}</h2>
      <p className="text-center p-2">{caption}</p>
    </div>
  );
}

export default MemoryCard;

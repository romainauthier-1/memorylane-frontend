import { useState, useEffect } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { deleteMemory } from "../reducers/memories";
import { toast } from "react-toastify";
import { Trash2, Pencil } from "lucide-react";

function MemoryCard({
  title,
  src,
  caption,
  onDetailClick,
  memory,
  positionX,
  positionY,
  onUpdateClick,
}) {
  const backendURL = process.env.NEXT_PUBLIC_URL_BACKEND;
  const finalSrc = src && src.startsWith("http") ? src : `${backendURL}${src}`;
  const dispatch = useDispatch();

  const handleDeleteMemory = async (memoryId) => {
    if (window.confirm("Supprimer ce précieux souvenir ?")) {
      try {
        const response = await fetch(`${backendURL}/memories/${memoryId}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });

        const data = await response.json();

        if (data.result) {
          dispatch(deleteMemory(memoryId));
          toast.success(data.message);
        } else {
          console.error(data.error);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div
      className="bg-violet-100 rounded-xl shadow-xl m-6 p-6 absolute flex flex-col"
      style={{
        top: `${positionY}%`,
        left: `${positionX}%`,
        transform: `rotate(${Math.floor(Math.random() * 14) - 7}deg)`,
        borderColor: memory.colors[0],
        // backgroundColor: memory.colors[1],
        borderWidth: "2px",
      }}
    >
      <div className="flex flex-row justify-between">
        <Pencil
          className="cursor-pointer hover:scale-110 transition-transform"
          color="purple"
          onClick={onUpdateClick}
        />
        <h2
          className="font-bold text-center p-2"
          style={{ color: memory.colors[1] }}
        >
          {title}
        </h2>
        <Trash2
          onClick={() => handleDeleteMemory(memory._id)}
          color="red"
          className="cursor-pointer hover:scale-110 transition-transform"
        />
      </div>
      <Image
        onClick={onDetailClick}
        className="object-cover rounded-md"
        width="300"
        height="300"
        alt={title}
        src={finalSrc}
      />
      <p className="text-center p-2">{memory.description}</p>
    </div>
  );
}

export default MemoryCard;

import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import { getAllMemories } from "../services/api";
import MemoryCard from "./MemoryCard";
import AddMemoryForm from "./AddMemoryForm";

function Home() {
  const [memories, setMemories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getMemories = async () => {
    const memoriesResult = await getAllMemories();
    setMemories(memoriesResult);
  };

  useEffect(() => {
    getMemories();
  }, []);

  const loadedMemories = memories.map((memory, i) => {
    return (
      <MemoryCard
        key={i}
        src={memory.thumbnail}
        alt={memory.title}
        title={memory.title}
        caption={memory.medias[0].caption}
      />
    );
  });

  const handleAddMemoryClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  const onSuccess = () => {
    setIsModalOpen(false);
    getMemories();
  };

  return (
    <div>
      <main className="flex flex-col content-center min-h-screen justify-center items-center">
        <h1 className=" font-sans text-4xl text-purple-600 tracking-widest scale-150 animate-pulse uppercase m-6">
          Memory Lane
        </h1>
        <button
          onClick={handleAddMemoryClick}
          className="bg-purple-700 text-white rounded-md px-4 p-3 text-center hover:scale-105 transition-transform"
        >
          Ajouter un souvenir
        </button>
        {isModalOpen && <AddMemoryForm onSuccess={onSuccess} />}
        <p className="m-7">Bientôt nos souvenirs</p>
        <div className="flex flex-row justify-evenly flex-wrap">
          {loadedMemories}
        </div>
      </main>
    </div>
  );
}

export default Home;

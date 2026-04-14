import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMemories, addMemory, deleteMemory } from "../reducers/memories";
import { getAllMemories } from "../services/api";
import MemoryCard from "./MemoryCard";
import AddMemoryForm from "./AddMemoryForm";
import { toast } from "react-toastify";
import MemoryDetailModal from "./MemoryDetailModal";
import Login from "./Login";
import {
  toggleIsModalOpen,
  toggleIsEditing,
  setSelectedMemory,
  toggleIsLogged,
  toggleIsMobile,
  toggleIsLoading,
} from "../reducers/states";

function Home() {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [selectedMemory, setSelectedMemory] = useState(null);
  // const [isLogged, setIsLogged] = useState(false);
  // const [isEditing, setIsEditing] = useState(false);

  const isEditing = useSelector((state) => state.states.isEditing);
  const isLogged = useSelector((state) => state.states.isLogged);
  const selectedMemory = useSelector((state) => state.states.selectedMemory);
  const isModalOpen = useSelector((state) => state.states.isModalOpen);
  const memories = useSelector((state) => state.memories.value);
  const isMobile = useSelector((state) => state.states.isMobile);
  const isLoading = useSelector((state) => state.states.isLoading);

  const dispatch = useDispatch();

  const getMemories = async () => {
    dispatch(toggleIsLoading(true));
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const memoriesResult = await getAllMemories(token);
        dispatch(setMemories(memoriesResult));
        dispatch(toggleIsLoading(false));
      }
    } catch (err) {
      console.error(err);
    } finally {
      dispatch(toggleIsLoading(false));
    }
  };

  useEffect(() => {
    if (isLogged) {
      getMemories();
    }
  }, [isLogged]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(toggleIsLogged(true));
    }
    dispatch(toggleIsMobile(window.innerWidth < 768));
    dispatch(toggleIsModalOpen(false));
  }, []);

  const sortedMemories =
    memories && Array.isArray(memories)
      ? [...memories]?.sort(
          (a, b) =>
            new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
        )
      : [];

  const loadedMemories = sortedMemories?.map((memory, i) => {
    const verticalStep = 100 / sortedMemories.length;

    const positionY = i * verticalStep + Math.random() * 10;
    const positionX = isMobile
      ? Math.floor(Math.random() * 40) + 5
      : Math.floor(Math.random() * 50) + 20;
    return (
      <MemoryCard
        key={i}
        memory={memory}
        src={memory.thumbnail}
        alt={memory.title}
        title={memory.title}
        caption={memory.medias[0].caption}
        positionY={positionY}
        positionX={positionX}
        onDetailClick={() => dispatch(setSelectedMemory(memory))}
        onUpdateClick={() => openChangeForm(memory)}
      />
    );
  });

  const handleAddMemoryClick = () => {
    isModalOpen === false && dispatch(toggleIsModalOpen(true));

    if (isModalOpen === true) {
      dispatch(setSelectedMemory(null));
      dispatch(toggleIsModalOpen(false));
      dispatch(toggleIsEditing(false));
    }
  };

  const onSuccess = () => {
    dispatch(toggleIsModalOpen(false));
    getMemories();
    toast.success(isEditing && "Souvenir modifié !");
    // dispatch(setSelectedMemory(null));
  };

  const loggedIn = () => {
    // console.log("Fonction loggedIn appelée dans Home");
    dispatch(toggleIsLogged(true));
  };

  const handleLogOut = () => {
    dispatch(toggleIsLogged(false));
    localStorage.removeItem("token");
  };

  const openChangeForm = (memory) => {
    dispatch(toggleIsEditing(true));
    dispatch(setSelectedMemory(memory));
    dispatch(toggleIsModalOpen(true));
  };

  return (
    <div>
      {isLoading && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/60 backdrop-blur-md rounded-3xl">
          <div className="w-16 h-16 border-4 border-t-cyan-500 border-white/20 rounded-full animate-spin mb-4"></div>
          <p className="text-white font-bold text-lg animate-pulse">
            Chargement en cours...
          </p>
          <p className="text-white/50 text-sm mt-2">
            Patience, ça peut être un peu long 🧘‍♂️
          </p>
        </div>
      )}
      <main
        className="flex flex-col content-center h-full w-full justify-center items-center overflow-hidden"
        style={{
          backgroundColor: isModalOpen
            ? "rgba(0, 0, 0, 0.5)"
            : "rgba(241, 245, 249, 0.5)",
        }}
      >
        <div className="flex flex-col justify-center items-center">
          <h1 className=" font-sans  text-3xl md:text-5xl text-purple-600 tracking-widest scale-120 md:scale-150 animate-pulse transform uppercase m-6">
            Memory Lane
          </h1>
          {memories?.length > 0 ? (
            <p className="m-7 ">Retrouves tes souvenirs !</p>
          ) : (
            <p className="m-7 ">Bientôt tes souvenirs</p>
          )}
        </div>
        {!isLogged ? (
          <Login loggedIn={loggedIn} />
        ) : (
          <>
            <button
              onClick={handleAddMemoryClick}
              className="bg-purple-700 text-white rounded-md px-4 p-3 text-center hover:scale-105 transition-transform m-10"
            >
              Ajouter un souvenir
            </button>
            {isModalOpen && <AddMemoryForm onSuccess={onSuccess} />}
            {selectedMemory && !isEditing && (
              <MemoryDetailModal
                memory={selectedMemory}
                onSuccess={onSuccess}
                onClose={() => dispatch(setSelectedMemory(null))}
              />
            )}
            <div className="relative w-full min-h-[150vh] mt-10">
              {loadedMemories}
            </div>
            <button
              onClick={() => handleLogOut()}
              className="bg-red-700 text-white mt-80 mb-20 rounded-md px-4 p-3 text-center hover:scale-105 transition-transform"
            >
              Déconnexion
            </button>
          </>
        )}
      </main>
    </div>
  );
}

export default Home;

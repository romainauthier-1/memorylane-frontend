import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import { getAllMemories } from "../services/api";
import MemoryCard from "./MemoryCard";
import AddMemoryForm from "./AddMemoryForm";
import { toast } from "react-toastify";
import MemoryDetailModal from "./MemoryDetailModal";
import Login from "./Login";

function Home() {
  const [memories, setMemories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [isLogged, setIsLogged] = useState(false);

  const getMemories = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const memoriesResult = await getAllMemories(token);
      setMemories(memoriesResult);
    }
  };

  useEffect(() => {
    if (isLogged) {
      getMemories();
    }
  }, [isLogged]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLogged(true);
    }
  }, []);

  const loadedMemories = memories?.map((memory, i) => {
    return (
      <MemoryCard
        key={i}
        src={memory.thumbnail}
        alt={memory.title}
        title={memory.title}
        caption={memory.medias[0].caption}
        onDetailClick={() => setSelectedMemory(memory)}
      />
    );
  });

  const handleAddMemoryClick = () => {
    setIsModalOpen(!isModalOpen);
  };
  // const success = () => {
  //   toast.success("Ce clic est un succès !");
  // };

  // const warning = () => {
  //   toast.warn("Ce clic est un warning !");
  // };

  // const fail = () => {
  //   toast.error("Ce clic est une erreur !");
  // };

  // const info = () => {
  //   toast.info("Ce clic est une info !");
  // };

  const onSuccess = () => {
    setIsModalOpen(false);
    getMemories();
    toast.success("Souvenir enregistré !");
  };

  const loggedIn = () => {
    // console.log("Fonction loggedIn appelée dans Home");
    setIsLogged(true);
  };

  const handleLogOut = () => {
    setIsLogged(false);
    localStorage.removeItem("token");
  };

  return (
    <div>
      <main className="flex flex-col content-center min-h-screen justify-center items-center">
        <h1 className=" font-sans text-4xl text-purple-600 tracking-widest scale-150 animate-pulse uppercase m-6">
          Memory Lane
        </h1>
        {/* <button
          onClick={info}
          className="bg-blue-500 text-white rounded-md px-4 p-3 text-center hover:scale-105 transition-transform"
        >
          INFO
        </button>
        <button
          onClick={fail}
          className="bg-red-600 text-white rounded-md px-4 p-3 text-center hover:scale-105 transition-transform"
        >
          FAIL
        </button>
        <button
          onClick={warning}
          className="bg-orange-400 text-white rounded-md px-4 p-3 text-center hover:scale-105 transition-transform"
        >
          WARNING
        </button>
        <button
          onClick={success}
          className="bg-green-600 text-white rounded-md px-4 p-3 text-center hover:scale-105 transition-transform"
        >
          SUCCESS
        </button> */}
        <p className="m-7">Bientôt nos souvenirs</p>
        {!isLogged ? (
          <Login loggedIn={loggedIn} />
        ) : (
          <>
            <button
              onClick={handleAddMemoryClick}
              className="bg-purple-700 text-white rounded-md px-4 p-3 text-center hover:scale-105 transition-transform"
            >
              Ajouter un souvenir
            </button>
            {isModalOpen && <AddMemoryForm onSuccess={onSuccess} />}
            {selectedMemory && (
              <MemoryDetailModal
                memory={selectedMemory}
                onClose={() => setSelectedMemory(null)}
              />
            )}
            <div className="flex flex-row justify-evenly flex-wrap">
              {loadedMemories}
            </div>
            <button
              onClick={() => handleLogOut()}
              className="bg-red-700 text-white rounded-md px-4 p-3 text-center hover:scale-105 transition-transform"
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

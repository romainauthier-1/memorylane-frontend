import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import { createMemory, uploadFile } from "../services/api";
import { toast } from "react-toastify";
import {
  toggleIsModalOpen,
  toggleIsEditing,
  setSelectedMemory,
  toggleIsLogged,
  toggleIsLoading,
} from "../reducers/states";
import { setMemories } from "../reducers/memories";
import { X } from "lucide-react";

function AddMemoryForm({ onSuccess }) {
  const isEditing = useSelector((state) => state.states.isEditing);
  const isLogged = useSelector((state) => state.states.isLogged);
  const selectedMemory = useSelector((state) => state.states.selectedMemory);
  const isModalOpen = useSelector((state) => state.states.isModalOpen);
  const memories = useSelector((state) => state.memories.value);
  const isLoading = useSelector((state) => state.states.isLoading);

  const dispatch = useDispatch();

  const [title, setTitle] = useState(
    selectedMemory ? selectedMemory.title : "",
  );
  const [description, setDescription] = useState(
    selectedMemory ? selectedMemory.description : "",
  );
  const [upload, setUpload] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [memoryType, setMemoryType] = useState(
    selectedMemory ? selectedMemory.type : "",
  );
  const [couleurPrincipale, setCouleurPrincipale] = useState(
    selectedMemory ? selectedMemory.colors[0] : "#803FCE",
  );
  const [couleurSecondaire, setCouleurSecondaire] = useState(
    selectedMemory ? selectedMemory.colors[1] : "#C48BF2",
  );
  const [startDate, setStartDate] = useState(
    selectedMemory
      ? selectedMemory.startDate
      : new Date().toISOString().split("T")[0],
  );
  const [endDate, setEndDate] = useState(
    selectedMemory
      ? selectedMemory.endDate
      : new Date().toISOString().split("T")[0],
  );

  const handleSubmit = async (event) => {
    event.preventDefault();

    dispatch(toggleIsLoading(true));

    await new Promise((resolve) => setTimeout(resolve, 10));

    const token = localStorage.getItem("token");
    // console.log("TOKEN RÉCUPÉRÉ: ", token);
    // console.log("1. État de upload :", upload);

    if (!upload || !token) {
      // console.error("Erreur : Aucun fichier sélectionné !");
      toast.error("Oups, petit problème...");
      return;
    }

    const mediasForDB = [];

    for (const file of upload) {
      let fileToUpload = file;
      if (file.name.toLowerCase().endsWith(".heic")) {
        const heic2any = (await import("heic2any")).default;
        const blob = await heic2any({
          blob: file,
          toType: "image/jpeg",
          quality: 0.6,
        });

        fileToUpload = new File(
          [Array.isArray(blob) ? blob[0] : blob],
          file.name.replace(/\.heic/i, ".jpg"),
          { type: "image/jpeg" },
        );
      }

      const fileData = new FormData();
      console.log("FileToUpload:", fileToUpload);
      fileData.append("file", fileToUpload);
      // console.log("2. Appel de uploadFile...");

      const infosImage = await uploadFile(fileData);
      // console.log("3. Retour de urlImage :", infosImage);
      if (infosImage && infosImage.result) {
        mediasForDB.push({
          url: infosImage.url,
          type: infosImage.type,
          caption: description,
        });
      } else {
        // console.log("InfosImage qui a échoué: ", infosImage);
        toast.error("L'upload a échoué, sorry");
        console.error("L'upload a échoué sur le serveur");
        return;
      }
    }

    const memoryData = {
      title: title,
      startDate: startDate,
      endDate: memoryType === "period" ? endDate : null,
      type: memoryType,
      thumbnail: mediasForDB[0].url,
      position: {
        x: Math.floor(Math.random() * 80),
        y: Math.floor(Math.random() * 80),
      },
      medias: mediasForDB,
      colors: [couleurPrincipale, couleurSecondaire],
      description: description,
    };
    // console.log("LE COLIS FINAL :", memoryData);
    const response = await createMemory(memoryData, token);
    // console.log("RÉPONSE FINALE: ", response);
    dispatch(toggleIsLoading(false));
    response.result && onSuccess();
  };

  useEffect(() => {
    const tempUrl = upload.map((file) => URL.createObjectURL(file));

    setPreviews(tempUrl);

    return () => {
      tempUrl.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [upload]);

  const previewImages = previews.map((url, i) => {
    return (
      <Image
        key={url}
        src={url}
        height={200}
        width={200}
        alt={`preview ${i}`}
        className="object-cover rounded-md "
      />
    );
  });

  const handleUpdate = async (e, memoryId) => {
    dispatch(toggleIsLoading(true));
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_BACKEND}/memories/${memoryId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title,
            description,
            type: memoryType,
            startDate,
            endDate,
            colors: [couleurPrincipale, couleurSecondaire],
          }),
        },
      );
      const data = await response.json();

      if (data.result) {
        onSuccess();
        dispatch(toggleIsEditing(false));
        setTitle(null);
        setDescription(null);
        setMemoryType(null);
        setStartDate(null);
        setEndDate(null);
        setCouleurPrincipale("#803FCE");
        setCouleurSecondaire("#C48BF2");
        dispatch(toggleIsLoading(false));
      } else {
        toast.error(data.error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm overflow-scroll">
      <form
        className="flex flex-col justify-center items-center p-2 z-10 bg-slate-100 rounded-lg w-[95%] md:w-[70%] lg:max-w-md"
        method="post"
        onSubmit={handleSubmit}
      >
        <X
          className="cursor-pointer hover:scale-110 transition-transform"
          color="black"
          onClick={() => {
            dispatch(toggleIsModalOpen(false));
            dispatch(toggleIsEditing(false));
          }}
        />
        <input
          className="m-2 text-center   bg-transparent rounded text-gray-800 p-2"
          id="title"
          type="text"
          required
          placeholder="Titre du souvenir"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <textarea
          className="m-2 text-center  bg-transparent rounded  text-gray-800 p-2"
          id="description"
          placeholder="Raconte le souvenir"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        {!isEditing && (
          <>
            <label className="m-2 text-center" for="upload">
              Ajouter un ou plusieurs fichier(s)
            </label>
            <input
              className="m-1"
              multiple
              id="upload"
              type="file"
              accept="image/png, image/jpg, image/jpeg, audio/PCM, audio/WAV, audio/mp3, audio/AIFF, video/mov, video/mp4, video/AVI, video/FLV, video/MKV"
              onChange={(e) => setUpload(Array.from(e.target.files))}
            ></input>
            <div className="overflow-scroll">
              {previewImages ? previewImages : "Aucun fichier sélectionné"}
            </div>
          </>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2 justify-center items-center">
            <label
              className={`cursor-pointer text-center p-2 rounded-lg transition-all  hover:bg-white hover:text-cyan-700 hover:font-bold ${
                memoryType === "moment"
                  ? "bg-white shadow-sm text-cyan-700 font-bold"
                  : "text-slate-500"
              }`}
              for="momentMemory"
            >
              <input
                className="hidden"
                type="radio"
                name="memoryType"
                id="momentMemory"
                value="moment"
                checked={memoryType === "moment"}
                onChange={(e) => setMemoryType(e.target.value)}
              ></input>
              Moment
            </label>
          </div>
          <div className="flex flex-col gap-2 justify-center items-center">
            <label
              className={`cursor-pointer text-center p-2 rounded-lg transition-all hover:bg-white hover:text-cyan-700 hover:font-bold ${
                memoryType === "period"
                  ? "bg-white shadow-sm text-cyan-700 font-bold"
                  : "text-slate-500"
              }`}
              for="periodMemory"
            >
              <input
                className="hidden"
                type="radio"
                name="memoryType"
                id="periodMemory"
                value="period"
                checked={memoryType === "period"}
                onChange={(e) => setMemoryType(e.target.value)}
              ></input>
              Période
            </label>
          </div>
        </div>
        {memoryType === "moment" && (
          <div className="flex justify-center w-full">
            <input
              id="startDate"
              type="date"
              className="m-2 p-1 bg-white rounded-lg border-none text-center"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
        )}
        {memoryType === "period" && (
          <div className="flex justify-center w-full" id="dateContainer">
            <input
              id="startDate"
              type="date"
              className="m-2 p-1 bg-white rounded-lg border-none text-center"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <input
              id="EndDate"
              type="date"
              className="m-2 p-1 bg-white rounded-lg border-none text-center"
              min={startDate}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />{" "}
          </div>
        )}
        <div className="flex gap-10">
          <div className="flex flex-col items-center gap-2">
            <label
              htmlFor="couleurPrincipale"
              className="m-1 rounded-full h-10 w-10 border-2 border-white shadow-lg cursor-pointer transition-transform hover:scale-110"
              style={{ backgroundColor: couleurPrincipale }}
            />
            <input
              className="w-1 h-1 opacity-0"
              type="color"
              id="couleurPrincipale"
              value={couleurPrincipale}
              onChange={(e) => setCouleurPrincipale(e.target.value)}
            ></input>
            <span className="text-xs text-slate-500 text-center w-20">
              Couleur principale
            </span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <label
              htmlFor="couleurSecondaire"
              className="m-1 rounded-full h-10 w-10 border-2 border-white shadow-lg cursor-pointer transition-transform hover:scale-110"
              style={{ backgroundColor: couleurSecondaire }}
            />
            <input
              className="w-1 h-1 opacity-0"
              type="color"
              id="couleurSecondaire"
              value={couleurSecondaire}
              onChange={(e) => setCouleurSecondaire(e.target.value)}
            ></input>
            <span className="text-xs text-slate-500 text-center w-20">
              Couleur secondaire
            </span>
          </div>
        </div>
        {!isEditing ? (
          <button
            disabled={isLoading}
            className={`${isLoading && "opacity-50 cursor-not-allowed"} rounded-md m-4 p-3 hover:scale-105 transition-transform hover:text-white`}
            style={{
              background: `linear-gradient(135deg, ${couleurPrincipale} 0%, ${couleurSecondaire} 100%)`,
            }}
            type="submit"
            value="Ajouter le souvenir"
          >
            <span>Ajouter le souvenir</span>
          </button>
        ) : (
          <button
            disabled={isLoading}
            type="button"
            className={`${isLoading && "opacity-50 cursor-not-allowed"} rounded-md m-4 p-3 hover:scale-105 transition-transform hover:text-white`}
            style={{
              background: `linear-gradient(135deg, ${couleurPrincipale} 0%, ${couleurSecondaire} 100%)`,
            }}
            onClick={(e) => handleUpdate(e, selectedMemory._id)}
            value="Modifier le souvenir"
          >
            <span>Modifier le souvenir</span>
          </button>
        )}
      </form>
    </div>
  );
}

export default AddMemoryForm;

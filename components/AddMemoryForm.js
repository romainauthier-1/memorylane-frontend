import { useState, useEffect } from "react";
import Image from "next/image";
import { createMemory, uploadFile } from "../services/api";
import { toast } from "react-toastify";

function AddMemoryForm({ onSuccess }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [upload, setUpload] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [memoryType, setMemoryType] = useState("");
  const [couleurPrincipale, setCouleurPrincipale] = useState("#803FCE");
  const [couleurSecondaire, setCouleurSecondaire] = useState("#C48BF2");
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0],
  );

  const handleSubmit = async (event) => {
    event.preventDefault();

    // console.log("1. État de upload :", upload);

    if (!upload) {
      // console.error("Erreur : Aucun fichier sélectionné !");
      toast.error("Oups, petit problème...");
      return;
    }

    const mediasForDB = [];

    for (const file of upload) {
      const fileData = new FormData();
      fileData.append("file", file);
      // console.log("2. Appel de uploadFile...");

      const urlImage = await uploadFile(fileData);
      // console.log("3. Retour de urlImage :", urlImage);

      mediasForDB.push({
        url: urlImage,
        type: file?.type.split("/")[0],
        caption: "",
      });
    }

    const memoryData = {
      title: title,
      startDate: startDate,
      endDate: memoryType === "periodMemory" ? endDate : null,
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
    console.log("LE COLIS FINAL :", memoryData);
    const response = await createMemory(memoryData);
    response && onSuccess();
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
  return (
    <form
      className="flex flex-col justify-center items-center p-2"
      method="post"
      onSubmit={handleSubmit}
    >
      <input
        className="m-2 text-center border rounded border-slate-300 text-gray-800 p-2"
        id="title"
        type="text"
        required
        placeholder="Titre du souvenir"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      ></input>
      <textarea
        className="m-2 text-center border-2 rounded border-slate-300 text-gray-800 p-2"
        id="description"
        placeholder="Raconte le souvenir"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <label className="m-2 text-center" for="upload">
        Ajouter un fichier
      </label>
      <input
        className="m-1"
        multiple
        id="upload"
        type="file"
        accept="image/png, image/jpg, image/jpeg, audio/PCM, audio/WAV, audio/mp3, audio/AIFF, video/mov, video/mp4, video/AVI, video/FLV, video/MKV"
        onChange={(e) => setUpload(Array.from(e.target.files))}
      ></input>
      {previewImages ? previewImages : "Aucun fichier sélectionné"}
      <input
        className="m-1"
        type="radio"
        name="memoryType"
        id="momentMemory"
        value="moment"
        checked={memoryType === "moment"}
        onChange={(e) => setMemoryType(e.target.value)}
      ></input>
      <label className="m-1" for="momentMemory">
        Moment
      </label>
      <input
        className="m-1"
        type="radio"
        name="memoryType"
        id="periodMemory"
        value="period"
        checked={memoryType === "period"}
        onChange={(e) => setMemoryType(e.target.value)}
      ></input>
      <label className="m-1" for="periodMemory">
        Période
      </label>
      {memoryType === "moment" && (
        <input
          id="startDate"
          type="date"
          className="m-2"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      )}
      {memoryType === "period" && (
        <div id="dateContainer">
          {" "}
          <input
            id="startDate"
            type="date"
            className="m-2"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            id="EndDate"
            type="date"
            className="m-2"
            min={startDate}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />{" "}
        </div>
      )}
      <input
        className="m-1"
        type="color"
        id="couleurPrincipale"
        value={couleurPrincipale}
        onChange={(e) => setCouleurPrincipale(e.target.value)}
      ></input>
      <label className="m-1" for="couleurPrincipale">
        Sélectionner la couleur principale du souvenir
      </label>
      <input
        className="m-1"
        type="color"
        id="couleurSecondaire"
        value={couleurSecondaire}
        onChange={(e) => setCouleurSecondaire(e.target.value)}
      ></input>
      <label className="m-1" for="couleurSecondaire">
        Sélectionner la couleur secondaire du souvenir
      </label>
      <button
        className="border border-cyan-700 rounded-md m-4 p-3"
        type="submit"
        value="Ajouter le souvenir"
      >
        Ajouter le souvenir
      </button>
    </form>
  );
}

export default AddMemoryForm;

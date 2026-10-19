import { useState, useEffect } from "react";
import Image from "next/image";
import {
  toggleIsEditing,
  toggleIsLoading,
  toggleIsEditingCaption,
  toggleIsEditingTitle,
  toggleIsEditingDescription,
} from "../reducers/states";
import { useSelector, useDispatch } from "react-redux";
import { Pencil, X, Plus, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { authHeaders, uploadFile } from "../services/api";

export default function MemoryDetailModal({
  memory: initialMemory,
  onClose,
  onSuccess,
}) {
  const memories = useSelector((state) => state.memories.value);

  const memory =
    memories.find((m) => m._id === initialMemory._id) || initialMemory;

  const backendURL = process.env.NEXT_PUBLIC_URL_BACKEND;
  const isEditingCaption = useSelector(
    (state) => state.states.isEditingCaption,
  );
  const isEditingTitle = useSelector((state) => state.states.isEditingTitle);
  const isEditingDescription = useSelector(
    (state) => state.states.isEditingDescription,
  );
  const isLoading = useSelector((state) => state.states.isLoading);
  const dispatch = useDispatch();

  const handleCaptionUpdate = async (e, memoryId, i, newCaption) => {
    e.preventDefault();
    dispatch(toggleIsLoading(true));

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_BACKEND}/memories/caption/${memoryId}`,
        {
          method: "PUT",
          headers: authHeaders(),
          body: JSON.stringify({
            mediaNewCaption: newCaption,
            mediaIndex: i,
          }),
        },
      );
      const data = await response.json();
      if (data.result) {
        onSuccess();
        dispatch(toggleIsEditingCaption(false));
        setCaption("");
        dispatch(toggleIsLoading(false));
        toast.success(data.message);
      } else {
        toast.error(data.error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleTitleUpdate = async (e, memoryId, newTitle) => {
    e.preventDefault();
    dispatch(toggleIsLoading(true));

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_BACKEND}/memories/title/${memoryId}`,
        {
          method: "PUT",
          headers: authHeaders(),
          body: JSON.stringify({
            newTitle,
          }),
        },
      );
      const data = await response.json();
      if (data.result) {
        onSuccess();
        dispatch(toggleIsEditingTitle(false));
        setTitle("");
        dispatch(toggleIsLoading(false));
        toast.success(data.message);
      } else {
        toast.error(data.error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDescriptionUpdate = async (e, memoryId, newDescription) => {
    e.preventDefault();
    dispatch(toggleIsLoading(true));

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_BACKEND}/memories/description/${memoryId}`,
        {
          method: "PUT",
          headers: authHeaders(),
          body: JSON.stringify({
            newDescription,
          }),
        },
      );
      const data = await response.json();
      if (data.result) {
        onSuccess();
        dispatch(toggleIsEditingDescription(false));
        setDescription("");
        dispatch(toggleIsLoading(false));
        toast.success(data.message);
      } else {
        toast.error(data.error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const [caption, setCaption] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const memoriesToDisplay = memory.medias.map((media, i) => {
    const finalSrc =
      media.url && media.url.startsWith("http")
        ? media.url
        : `${backendURL}${media.url}`;
    const videoUrl = media.url?.replace(/\.[^/.]+$/, ".mp4");
    return (
      <div
        key={i}
        className="snap-center shrink-0 w-full flex flex-col items-center justify-center p-4 no-scrollbar"
      >
        <div className="group relative flex flex-col items-center justify-center h-full w-full">
          <button
            onClick={(e) => handleDeleteMedia(e, memory._id, media._id)}
            className="absolute top-4 right-4 z-30 p-2 bg-black/40 hover:bg-red-600/80 backdrop-blur-md rounded-full text-white transition-all duration-300 opacity-80 md:opacity-0 md:group-hover:opacity-100 shadow-lg border border-white/20"
            title="Supprimer ce média"
          >
            <Trash2 size={18} />
          </button>
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
              {isEditingCaption ? (
                <>
                  <form
                    method="put"
                    onSubmit={(e) =>
                      handleCaptionUpdate(e, memory._id, i, caption)
                    }
                  >
                    <input
                      className="text-white text-center italic bg-slate-100/30 backdrop-blur-md p-4 rounded-2xl w-full max-w-2xl text-sm md:text-base border border-white/10 shadow-lg overflow-y-auto max-h-[20vh]"
                      id="caption"
                      type="text"
                      placeholder={media.caption}
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                    ></input>
                    <div className="flex flex-row justify-evenly w-full ">
                      <button
                        className="cursor-pointer text-center text-slate-200 p-2 rounded-lg transition-all hover:bg-white hover:text-red-600 hover:font-bold "
                        onClick={() => dispatch(toggleIsEditingCaption(false))}
                      >
                        Annuler
                      </button>
                      <button
                        type="submit"
                        className="cursor-pointer text-center text-slate-200 p-2 rounded-lg transition-all hover:bg-white hover:text-cyan-700 hover:font-bold "
                      >
                        Modifier
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <p
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(toggleIsEditingCaption(true));
                    setCaption(media.caption);
                  }}
                  className="text-white cursor-pointer hover:bg-white hover:text-cyan-700 hover:font-bold text-center italic bg-black/30 backdrop-blur-md p-4 rounded-2xl w-full max-w-2xl text-sm md:text-base border border-white/10 shadow-lg overflow-y-auto max-h-[20vh]"
                >
                  {media.caption}
                </p>
              )}
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
  const [isAddMediaEditing, setIsAddMediaEditing] = useState(false);
  const [addMediaCaption, setAddMediaCaption] = useState(null);
  const [upload, setUpload] = useState([]);
  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    const tempInfos = upload.map((file) => ({
      url: URL.createObjectURL(file),
      type: file.type,
    }));

    setPreviews(tempInfos);

    return () => {
      tempInfos.forEach((info) => URL.revokeObjectURL(info.url));
    };
  }, [upload]);

  const previewImages = previews.map((preview, i) => {
    if (preview.type.startsWith("/video")) {
      return (
        <video
          key={preview.url}
          src={preview.url}
          height={100}
          width={100}
          alt={`preview ${i}`}
          className="object-cover rounded-md "
        />
      );
    }
    return (
      <Image
        key={preview.url}
        src={preview.url}
        height={100}
        width={100}
        alt={`preview ${i}`}
        className="object-cover rounded-md "
      />
    );
  });

  const handleAddMedia = async (e, upload, memoryId) => {
    e.preventDefault();
    dispatch(toggleIsLoading(true));

    try {
      const token = localStorage.getItem("token");
      const mediasForDB = [];

      if (!upload || !token) {
        // console.error("Erreur : Aucun fichier sélectionné !");
        toast.error("Oups, petit problème...");
        return;
      }

      for (const file of upload) {
        const infosMedia = await uploadFile(file);

        if (infosMedia.url) {
          mediasForDB.push({
            url: infosMedia.url,
            type: infosMedia.type,
            caption: addMediaCaption,
          });
        } else {
          throw new Error("Un upload a échoué : ", file.name);
        }
      }
      // console.log("LE COLIS FINAL :", mediasForDB);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_BACKEND}/memories/${memoryId}/add-media`,
        {
          method: "POST",
          headers: authHeaders(),
          body: JSON.stringify(mediasForDB),
        },
      );

      const data = await response.json();
      // console.log("RÉPONSE FINALE: ", response);
      if (data.result) {
        dispatch(toggleIsLoading(false));
        setUpload([]);
        setAddMediaCaption("");
        setIsAddMediaEditing(false);

        onSuccess();
        toast.success(data.message);
        setTimeout(() => {
          const container = document.getElementById("media-carrousel");
          if (container) {
            container.scrollTo({
              left: container.scrollWidth,
              behavior: "smooth",
            });
          }
        }, 500);
      }
    } catch (error) {
      toast.error("Erreur d'upload...");
    } finally {
      dispatch(toggleIsLoading(false));
    }
    // console.log("TOKEN RÉCUPÉRÉ: ", token);
    // console.log("1. État de upload :", upload);
  };

  const handleDeleteMedia = async (e, memoryId, mediaId) => {
    e.preventDefault();

    if (!window.confirm("Es-tu sûr de vouloir supprimer ce média ?")) {
      return;
    }

    dispatch(toggleIsLoading(true));

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_BACKEND}/memories/${memoryId}/media/${mediaId}`,
        { method: "DELETE", headers: authHeaders() },
      );
      const data = await response.json();

      if (data.result) {
        dispatch(toggleIsLoading(false));
        onSuccess();
        toast.success(data.message);
      }
    } catch (err) {
      console.error(err);
    }
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
            {isEditingTitle ? (
              <>
                <form
                  method="put"
                  onSubmit={(e) => handleTitleUpdate(e, memory._id, title)}
                >
                  <input
                    className=" bg-slate-100/30 text-3xl font-bold tracking-tighter drop-shadow-sm backdrop-blur-md rounded-lg m-2 p-2 w-full"
                    style={{ color: memory.colors[1] }}
                    id="title"
                    type="text"
                    placeholder={memory.title}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  ></input>
                  <div className="flex flex-row justify-evenly w-full ">
                    <button
                      className="cursor-pointer text-center text-slate-200 p-2 rounded-lg transition-all hover:bg-white hover:text-red-600 hover:font-bold "
                      onClick={() => dispatch(toggleIsEditingTitle(false))}
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="cursor-pointer text-center text-slate-200 p-2 rounded-lg transition-all hover:bg-white hover:text-cyan-700 hover:font-bold "
                    >
                      Modifier
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <h3
                onClick={(e) => {
                  e.stopPropagation();
                  if (isEditingTitle) {
                    dispatch(toggleIsEditingTitle(false));
                  } else {
                    dispatch(toggleIsEditingTitle(true));
                  }
                  setTitle(memory.title);
                }}
                style={{ color: memory.colors[1] }}
                className="rounded-lg cursor-pointer hover:bg-white/50 hover:text-cyan-700 hover:font-bold text-3xl font-bold tracking-tighter drop-shadow-sm"
              >
                {memory.title}
              </h3>
            )}
            <span className="text-white/70 text-sm font-mono mt-1">
              {memory.type === "period"
                ? `Du ${formatDate(memory.startDate)} au ${formatDate(memory.endDate)}`
                : formatDate(memory.startDate)}
            </span>
            {isEditingDescription ? (
              <>
                <form
                  method="put"
                  onSubmit={(e) =>
                    handleDescriptionUpdate(e, memory._id, description)
                  }
                >
                  <input
                    className=" bg-slate-100/30 text-white/70 text-sm font-mono mt-1tracking-tighter drop-shadow-sm backdrop-blur-md rounded-lg m-2 p-2 w-full"
                    style={{ color: memory.colors[1] }}
                    id="title"
                    type="text"
                    placeholder={memory.description}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></input>
                  <div className="flex flex-row justify-evenly w-full ">
                    <button
                      className="cursor-pointer text-center text-slate-200 p-2 rounded-lg transition-all hover:bg-white hover:text-red-600 hover:font-bold "
                      onClick={() =>
                        dispatch(toggleIsEditingDescription(false))
                      }
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="cursor-pointer text-center text-slate-200 p-2 rounded-lg transition-all hover:bg-white hover:text-cyan-700 hover:font-bold "
                    >
                      Modifier
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  if (isEditingDescription) {
                    dispatch(toggleIsEditingDescription(false));
                  } else {
                    dispatch(toggleIsEditingDescription(true));
                  }
                  setDescription(memory.description);
                }}
                className="text-white/70 text-sm font-mono mt-1 rounded-lg cursor-pointer hover:bg-white/50 hover:text-cyan-700 hover:font-bold"
              >
                {memory.description}
              </span>
            )}
          </div>
          <Plus
            size={10}
            onClick={() => setIsAddMediaEditing(true)}
            className="bg-white/10 cursor-pointer hover:bg-white/20 text-white rounded-full w-10 h-10 flex items-center justify-center transition-all border border-white/20"
          />

          {isAddMediaEditing ? (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
              <form
                className="flex flex-col my-auto max-h-full justify-center items-center p-2 z-10 bg-slate-100 rounded-lg w-[95%] md:w-[70%] lg:max-w-md"
                method="post"
                onSubmit={(e) => handleAddMedia(e, upload, memory._id)}
              >
                <X
                  className="cursor-pointer hover:scale-110 transition-transform"
                  color="black"
                  onClick={() => {
                    setIsAddMediaEditing(false);
                  }}
                />

                <textarea
                  className="m-2 text-center  bg-transparent rounded  text-gray-800 p-2"
                  id="addMediaCaption"
                  placeholder="Ajoute une légende"
                  value={addMediaCaption}
                  onChange={(e) => {
                    setAddMediaCaption(e.target.value);
                  }}
                ></textarea>
                <>
                  <label className="m-2 text-center" for="upload">
                    Ajouter un ou plusieurs fichier(s)
                  </label>
                  <input
                    className="m-1"
                    multiple
                    id="upload"
                    type="file"
                    accept="image/*, audio/*, video/*"
                    onChange={(e) => setUpload(Array.from(e.target.files))}
                  ></input>
                  <div className="overflow-scroll max-h-48 flex flex-wrap gap-2">
                    {previewImages
                      ? previewImages
                      : "Aucun fichier sélectionné"}
                  </div>
                </>

                <button
                  disabled={isLoading}
                  className={`${isLoading && "opacity-50 cursor-not-allowed"} rounded-md m-4 p-3 hover:scale-105 transition-transform hover:text-white`}
                  style={{
                    background: `linear-gradient(135deg, ${memory.colors[0]} 0%, ${memory.colors[1]} 100%)`,
                  }}
                  type="submit"
                  value="Ajouter au souvenir"
                >
                  <span>Ajouter au souvenir</span>
                </button>
              </form>
            </div>
          ) : null}

          <button
            onClick={() => {
              dispatch(toggleIsEditingTitle(false));
              dispatch(toggleIsEditingCaption(false));
              dispatch(toggleIsEditingDescription(false));
              setTitle("");
              setCaption("");
              setDescription("");
              onClose();
            }}
            className="bg-white/10 hover:bg-white/20 text-white rounded-full w-12 h-12 flex items-center justify-center transition-all border border-white/20"
          >
            ✕
          </button>
        </div>
        <div
          className="flex-1 flex flex-row overflow-x-auto snap-x snap-mandatory no-scrollbar"
          id="media-carrousel"
        >
          {memoriesToDisplay}
        </div>
      </div>
    </div>
  );
}

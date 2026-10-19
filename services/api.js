// En-têtes JSON + token de l'utilisateur connecté
const authHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

const getAllMemories = async (token) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BACKEND}/memories/all`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const data = await response.json();
  return data.memories;
};

const createMemory = async (memoryData, token) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_BACKEND}/memories`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(memoryData),
      },
    );
    const data = await response.json();

    return data;
  } catch (err) {
    console.error(err.message);
    return { result: false, error: err.message };
  }
};

const uploadFile = async (file) => {
  try {
    // 1. Obtenir la signature du backend
    const signResponse = await fetch(
      `${process.env.NEXT_PUBLIC_URL_BACKEND}/uploads/cloudinary-signature`,
      { headers: authHeaders() },
    );
    const signData = await signResponse.json();

    if (!signData.result) {
      throw new Error("Impossible d'obtenir la signature Cloudinary");
    }

    // 2. Construire le FormData pour Cloudinary (Direct)
    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", signData.apiKey);
    formData.append("timestamp", signData.timestamp);
    formData.append("signature", signData.signature);

    // 3. Fetch direct vers Cloudinary
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${signData.cloudName}/auto/upload`,
      {
        method: "POST",
        body: formData,
      },
    );

    const data = await response.json();

    return {
      result: true,
      url: data.secure_url,
      type: data.resource_type,
    };
  } catch (error) {
    console.error("Erreur Upload direct:", error);
    return { result: false };
  }
};

export { authHeaders, getAllMemories, createMemory, uploadFile };

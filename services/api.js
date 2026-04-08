import axios from "axios";

const getAllMemories = async (token) => {
  // console.log("url backend: ", process.env.NEXT_PUBLIC_URL_BACKEND);
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_URL_BACKEND}/memories/all`,
    { headers: { Authorization: `Bearer ${token}` } },
  );
  return response.data.memories;
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

const uploadFile = async (formData) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_BACKEND}/uploads`,
      {
        method: "POST",
        body: formData,
      },
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return { result: false };
  }
};

export { getAllMemories, createMemory, uploadFile };

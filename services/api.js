import axios from "axios";

const getAllMemories = async () => {
  console.log("url backend: ", process.env.NEXT_PUBLIC_URL_BACKEND);
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_URL_BACKEND}/memories/all`,
  );
  return response.data.memories;
};

const createMemory = async (memoryData) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_URL_BACKEND}/memories`,
    memoryData,
  );
  console.log(response);
  return response.data;
};

const uploadFile = async (formData) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_URL_BACKEND}/uploads`,
    formData,
  );
  console.log("URL de l'image: ", response.data.url);
  return response.data.url;
};

export { getAllMemories, createMemory, uploadFile };

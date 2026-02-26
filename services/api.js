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
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_URL_BACKEND}/memories`,
    memoryData,
    { headers: { Authorization: `Bearer ${token}` } },
  );
  // console.log(response);
  return response.data;
};

const uploadFile = async (formData) => {
  try {
    const data = await axios.post(
      `${process.env.NEXT_PUBLIC_URL_BACKEND}/uploads`,
      formData,
    );
    // ANCIENNE VERSION
    // console.log("URL de l'image: ", response.data.url);
    // const relativePath = response.data.url.replace(
    //   process.env.NEXT_PUBLIC_URL_BACKEND,
    //   "",
    // );
    // return relativePath;
    const response = await data.json();
    return response.url;
  } catch (error) {
    console.error(error);
    return;
  }
};

export { getAllMemories, createMemory, uploadFile };

import { useState, useEffect } from "react";
const backend = process.env.NEXT_PUBLIC_BACKEND_URL;
import { toast } from "react-toastify";

export default function Login({ loggedIn }) {
  const [usernameSignIn, setUsernameSignIn] = useState("");
  const [passwordSignIn, setPasswordSignIn] = useState("");
  const [usernameSignUp, setUsernameSignUp] = useState("");
  const [passwordSignUp, setPasswordSignUp] = useState("");

  const handleSignUp = async (username, password) => {
    try {
      const response = await fetch(`${backend}/user/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      const data = await response.json();
      if (data.result) {
        localStorage.setItem("token", data.token);
        loggedIn();
        toast.success(`Bienvenue ${username} !`);
      } else {
        toast.warn(data.message);
      }
    } catch (error) {
      toast.error(`Oups, ${error}`);
    }
  };

  const handleSignIn = async (username, password) => {
    try {
      const response = await fetch(`${backend}/user/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      const data = await response.json();
      if (data.result) {
        // console.log(data);
        localStorage.setItem("token", data.token);
        loggedIn();
        toast.success(`Bienvenue ${username} !`);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(`Oups, ${error}`);
    }
  };

  return (
    <div className="flex flex-col min-h-[100vh] min-w-[100vw]">
      <div className="flex flex-row justify-evenly p-6 m-4 h-full">
        <div className="flex h-full m-6 p-6 border-purple-800 border-2 rounded-xl flex-col">
          <input
            className="p-3 border-b"
            placeholder="Nom d'utilisateur.ice"
            onChange={(e) => setUsernameSignIn(e.target.value)}
            value={usernameSignIn}
          ></input>
          <input
            className="p-3 border-b"
            placeholder="Mot de passe"
            type="password"
            onChange={(e) => setPasswordSignIn(e.target.value)}
            value={passwordSignIn}
          ></input>
          <button
            onClick={() => handleSignIn(usernameSignIn, passwordSignIn)}
            className="p-3 border mt-6 bg-purple-200 bg-opacity-25 rounded-full"
          >
            CONNEXION
          </button>
        </div>
        <div className="flex h-full m-6 p-6 border-purple-800 border-2 rounded-xl flex-col">
          <input
            className="p-3 border-b"
            placeholder="Nom d'utilisateur.ice"
            onChange={(e) => setUsernameSignUp(e.target.value)}
            value={usernameSignUp}
          ></input>
          <input
            className="p-3 border-b"
            placeholder="Mot de passe"
            type="password"
            onChange={(e) => setPasswordSignUp(e.target.value)}
            value={passwordSignUp}
          ></input>
          <button
            onClick={() => handleSignUp(usernameSignUp, passwordSignUp)}
            className="p-3 border mt-6 bg-purple-200 bg-opacity-25 rounded-full"
          >
            INSCRIPTION
          </button>
        </div>
      </div>
    </div>
  );
}

import { useRef, useState } from "react";
import { toast } from "react-toastify";

const webhookUrl = import.meta.env.VITE_DISCORD_HOOK;
function App() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
    } else {
      setFile(null);
    }
  };
  const onMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const reset = () => {
    setMessage("");
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file!);
    formData.append("username", getRandomFunnyName());
    formData.append("content", message);
    try {
      await fetch(webhookUrl, {
        method: "POST",
        body: formData,
      });
      alert("Message envoyé");
      reset();
    } catch (error) {
      alert("Erreur lors de l'envoi du message");
      console.log(error);
    }
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={onSubmit} className="flex items-center gap-5 flex-col">
        <h1 className="text-3xl">Message anonyme</h1>
        <textarea
          value={message}
          onChange={onMessageChange}
          placeholder="Votre message"
          className="p-2 outline-none rounded-md text-black"
        />

        <label
          className="block mb-2 text-sm font-medium text-white"
          htmlFor="file_input"
        >
          Upload a fichier
        </label>
        <input
          ref={fileInputRef}
          className="block w-full text-sm border  rounded-lg cursor-pointe text-gray-400 focus:outline-none bg-gray-700 border-gray-600 placeholder-gray-400"
          id="file_input"
          type="file"
          onChange={onFileChange}
        />
        {file && <p>Fichier sélectionné: {file.name}</p>}
        <button className="py-2 px-4 bg-emerald-500 rounded-md">Envoyé</button>
      </form>
    </div>
  );
}

const funnyNames = [
  "Balthazar",
  "Gargamel",
  "Jabba",
  "Ziggy",
  "Fluffy",
  "Lilou",
  "Napoleon",
  "Waldo",
  "Zelda",
  "Taco",
  "Squidward",
  "Scooby",
  "Ziggy",
  "Waldo",
  "Gizmo",
  "Pikachu",
  "Elmo",
  "Yoda",
  "Gandalf",
  "Bilbo",
  "Frodo",
  "Dobby",
  "Gollum",
  "Sméagol",
];

function getRandomFunnyName() {
  const index = Math.floor(Math.random() * funnyNames.length);
  return funnyNames[index];
}

export default App;

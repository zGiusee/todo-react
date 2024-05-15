import { useState } from "react";

export default function todoCreator({ onCreate }) {
  const [text, setText] = useState("");

  return (
    <div className="absolute bottom-0 w-full px-12 py-6">
      <div className="relative">
        <span className="absolute text-gray-400 top-4 left-4 text-3xl">+</span>
        <input
          type="text"
          placeholder="Aggiungi un attività"
          className=" py-6 px-12 w-full bg-gray-200  placeholder-gray-400 rounded-md"
          onChange={(event) => {
            setText(event.target.value);
          }}
          onKeyUp={(event) => {
            if (event.key === "Enter") {
              onCreate(text);
            }
          }}
          value={text}
        />
      </div>
    </div>
  );
}

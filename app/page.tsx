"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Page = () => {
  const [userName, setUserName] = useState("");

  const { push } = useRouter();

  const handleRouting = () => {
    push(`tasks/?userName=${userName}`);
  };
  return (
    <div className="w-screen h-screen bg-slate-700 flex justify-center items-center">
      <div className="w-3/4 h-3/4 rounded-xl shadow-2xl bg-slate-200 flex">
        <div className="w-1/2 h-full">
          <img
            src="Task-cuate.png"
            alt=""
            className="w-full h-full object-fill"
          />
        </div>
        <div className="p-12 flex flex-col flex-1 gap-y-12">
          <h1 className="text-4xl font-semibold text-center text-slate-600r">
            Welcome to your favourite task manager app{" "}
          </h1>
          <input
            className="mt-4 w-72 mx-auto px-4 py-3 rounded-lg border border-cyan-400 focus:outline-none focus:border-cyan-500 focus:shadow-lg"
            type="text"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            placeholder="please enter your name"
          />

          <button
            onClick={handleRouting}
            disabled={userName.length > 2 ? false : true}
            className=" hover:shadow-lg disabled:brightness-75 flex items-center justify-between gap-2 px-8 w-72 mx-auto py-4 text-white text-lg font-bold bg-gradient-to-r from-cyan-500 to-cyan-700 rounded-full shadow-lg transition-transform duration-200  "
          >
            Let’s Start
            <span className="text-2xl">➔</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;

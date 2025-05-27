"use client";

import { atom, useAtom, useSetAtom } from "jotai";
import { useState } from "react";
import { api } from "../../../../convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { currentListAtom } from "./Lists";

export const isCreateListPopupOpenedAtom = atom(false);

export default function CreateListPopup() {
  const [isCreateListPopupOpened, setIsCreateListPopupOpened] = useAtom(
    isCreateListPopupOpenedAtom
  );
  const setCurrentList = useSetAtom(currentListAtom);
  const [name, setName] = useState("");
  const createList = useMutation(api.users.createList);

  const create = async () => {
    if (!name) return;
    const id = await createList({ userId: "testing_user", name });
    if (id) setCurrentList(id);
    setIsCreateListPopupOpened(false);
    setName("");
  };

  if (isCreateListPopupOpened)
    return (
      <>
        <div
          className="fixed pointer-events-auto top-0 left-0 w-screen h-screen bg-black/10 z-40"
          onClick={() => setIsCreateListPopupOpened(false)}
        />
        <div className="fixed top-1/2 left-1/2 -translate-1/2 z-50">
          <div className="bg-zinc-800 p-4 w-100 rounded-xl flex flex-col gap-10 justify-center items-center">
            <h2 className="text-2xl font-semibold select-none">
              إنشاء قائمة جديدة
            </h2>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") create();
              }}
              autoFocus
              className="
              bg-transparent border-2 border-zinc-600 outline-none
              p-2 text-sm w-full rounded-lg transition-all"
              placeholder="اسم القائمة"
            />
            <div className="flex gap-4">
              <button
                className="
                rounded-lg bg-zinc-700 px-4 p-2 cursor-pointer
                hover:bg-zinc-600 transition-all"
                onClick={() => setIsCreateListPopupOpened(false)}
              >
                إلغاء
              </button>
              <button
                disabled={!name}
                className="
                disabled:opacity-75 disabled:pointer-events-none
                rounded-lg bg-blue-400 px-4 p-2 cursor-pointer
                hover:bg-blue-500 transition-all"
                onClick={create}
              >
                إنشاء
              </button>
            </div>
          </div>
        </div>
      </>
    );
}

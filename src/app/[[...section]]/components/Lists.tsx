"use client";

import { atom, useAtom, useSetAtom } from "jotai";
import { useEffect } from "react";
import { isCreateListPopupOpenedAtom } from "./CreateListPopup";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export const currentListAtom = atom(window.location.pathname.split("/")[1]);

export default function Lists() {
  const userLists = useQuery(api.users.getLists, {
    userId: "testing_user",
  });

  const explore = {
    name: "استكشف",
    listId: "explore",
  };
  const lists = userLists ? [explore, ...userLists] : [explore];

  const [currentList, setCurrentList] = useAtom(currentListAtom);
  const setIsCreateListPopupOpened = useSetAtom(isCreateListPopupOpenedAtom);

  useEffect(() => {
    const newPath = `/${currentList}`;
    if (window.location.pathname !== newPath) {
      window.history.pushState(null, "", newPath);
    }
  }, [currentList]);

  return (
    <div className="flex flex-wrap items-center justify-start gap-y-2 gap-x-4 w-full">
      {lists.map((list, i) => (
        <button
          key={`list-${i}`}
          className={`
            rounded-full bg-zinc-800 px-5 p-2.5 cursor-pointer
            hover:bg-zinc-700 transition-all
            ${currentList === list.listId ? "!bg-zinc-700" : ""}
            `}
          onClick={() => setCurrentList(list.listId)}
        >
          {list.name}
        </button>
      ))}
      <button
        className="
        inline-flex items-center gap-1
        rounded-full bg-zinc-800 px-4 p-2 cursor-pointer
        hover:bg-zinc-700 transition-all"
        onClick={() => setIsCreateListPopupOpened(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          color="currentColor"
          className="w-5 h-5"
          fill="none"
        >
          <path
            d="M12 4V20M20 12H4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        إنشاء قائمة
      </button>
    </div>
  );
}

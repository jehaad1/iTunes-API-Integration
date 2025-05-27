"use client";

import { useAtom } from "jotai";
import { currentListAtom } from "./Lists";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import Explore from "./Explore";
import Track from "./Track";
import TrackPopup from "./TrackPopup";
import { createPortal } from "react-dom";

export default function List() {
  const [currentList, setCurrentList] = useAtom(currentListAtom);
  const userLists = useQuery(api.users.getLists, {
    userId: "testing_user",
  });
  const userTracks = useQuery(api.users.getTracks, {
    userId: "testing_user",
  });
  const deleteList = useMutation(api.users.deleteList);

  return (
    <div className="flex flex-col items-center">
      {currentList === "explore" && <Explore />}
      {userLists?.find((list) => list.listId === currentList) && (
        <>
          {userTracks
            ?.filter((t) => t.lists.includes(currentList))
            .map((d) => (
              <Track
                key={d.trackId}
                trackId={d.trackId}
                artworkUrl100={d.artworkUrl100}
                trackName={d.trackName}
                shortDescription={d.shortDescription}
              />
            ))}
          <button
            className="
            inline-flex items-center gap-1 mt-6
            rounded-full bg-red-400 px-4 p-2 cursor-pointer
            hover:bg-red-500 transition-all"
            onClick={async () => {
              const listId = userLists?.find(
                (list) => list.listId === currentList
              )?.listId;

              if (listId) await deleteList({ userId: "testing_user", listId });
              setCurrentList("explore");
            }}
          >
            حذف القائمة
          </button>
        </>
      )}
      {createPortal(
        <TrackPopup userTracks={userTracks} userLists={userLists} />,
        document.body
      )}
    </div>
  );
}

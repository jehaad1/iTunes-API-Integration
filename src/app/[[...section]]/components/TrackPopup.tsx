"use client";

import { atom, useAtom } from "jotai";
import { useEffect, useState } from "react";
import { api } from "../../../../convex/_generated/api";
import { useMutation } from "convex/react";
import { ListType, StoredTrackType, TrackType } from "../types";

export const openedTrackAtom = atom<TrackType | null>(null);

export default function TrackPopup({
  userTracks,
  userLists,
}: {
  userTracks?: StoredTrackType[] | null;
  userLists?: ListType[] | null;
}) {
  const [openedTrack, setOpenedTrack] = useAtom(openedTrackAtom);
  const track = userTracks?.find(
    (track) => track.trackId === openedTrack?.trackId
  );
  const [trackLists, setTrackLists] = useState<string[]>([]);
  const updateTrack = useMutation(api.users.updateTrack);

  const update = async () => {
    console.log(trackLists, openedTrack?.trackName);
    await updateTrack({
      userId: "testing_user",
      lists: trackLists,
      trackId: openedTrack?.trackId!,
      trackName: openedTrack?.trackName!,
      artworkUrl100: openedTrack?.artworkUrl100!,
      shortDescription: openedTrack?.shortDescription!,
    });
    setTrackLists([]);
    setOpenedTrack(null);
  };

  useEffect(() => {
    if (track && openedTrack) setTrackLists(track.lists ?? []);
  }, [track?.lists, openedTrack]);

  if (openedTrack)
    return (
      <>
        <div
          className="fixed pointer-events-auto w-full h-full bg-black/10 z-40"
          onClick={() => setOpenedTrack(null)}
        />
        <div className="fixed top-1/2 left-1/2 -translate-1/2 z-50">
          <div className="bg-zinc-800 p-4 w-100 rounded-xl flex flex-col gap-10 justify-center items-center">
            <h2 className="text-2xl font-semibold select-none">
              {openedTrack.trackName}
            </h2>
            <div className="w-2/3 flex flex-col items-start gap-1">
              {userLists?.map((list) => (
                <label
                  key={list.listId}
                  className="inline-flex items-center cursor-pointer justify-center gap-3 select-none"
                >
                  <input
                    type="checkbox"
                    className="accent-blue-400"
                    checked={trackLists.includes(list.listId)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setTrackLists((prev) => [
                          ...prev.filter((l) => l !== list.listId),
                          list.listId,
                        ]);
                      } else {
                        setTrackLists((prev) =>
                          prev.filter((l) => l !== list.listId)
                        );
                      }
                    }}
                  />
                  {list.name}
                </label>
              ))}
            </div>
            <div className="flex gap-4">
              <button
                className="
                rounded-lg bg-zinc-700 px-4 p-2 cursor-pointer
                hover:bg-zinc-600 transition-all"
                onClick={() => setOpenedTrack(null)}
              >
                إلغاء
              </button>
              <button
                className="
                disabled:opacity-75 disabled:pointer-events-none
                rounded-lg bg-blue-400 px-4 p-2 cursor-pointer
                hover:bg-blue-500 transition-all"
                onClick={update}
              >
                حفظ التعديلات
              </button>
            </div>
          </div>
        </div>
      </>
    );
}

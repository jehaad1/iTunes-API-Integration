import { useSetAtom } from "jotai";
import { TrackType } from "../types";
import { openedTrackAtom } from "./TrackPopup";

export default function Track({
  trackId,
  artworkUrl100,
  trackName,
  shortDescription,
}: TrackType) {
  const setOpenedTrack = useSetAtom(openedTrackAtom);

  return (
    <button
      key={trackId}
      className="w-[140px] flex flex-col gap-4 select-none cursor-pointer group"
      onClick={() =>
        setOpenedTrack({ trackId, artworkUrl100, trackName, shortDescription })
      }
    >
      <img
        src={artworkUrl100}
        className="w-full aspect-square group-hover:scale-105 transition-all"
      />
      <h1 className="font-medium w-full text-start truncate">{trackName}</h1>
      <p className="text-xs opacity-80 w-full text-start">{shortDescription}</p>
    </button>
  );
}

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "../hooks/useDebounce";
import Track from "./Track";
import { TrackType } from "../types";

const fetchItunesResults = async (searchTerm: string) => {
  if (!searchTerm || searchTerm.trim().length === 0) return [];

  const response = await fetch(
    `/api/itunes?term=${encodeURIComponent(searchTerm)}&limit=10`
  );

  if (!response.ok) throw new Error("Failed to fetch iTunes");

  const data = await response.json();
  return data.results || [];
};

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { data: searchResults = [], isLoading } = useQuery({
    queryKey: ["itunes-search", debouncedSearchTerm],
    queryFn: () => fetchItunesResults(debouncedSearchTerm),
    enabled: debouncedSearchTerm.length > 2,
    staleTime: 5 * 60 * 1000,
  });

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="
        bg-transparent border-2 border-zinc-800 outline-none
        focus:border-zinc-700 hover:border-zinc-700
        p-4 w-120 rounded-full transition-all"
        placeholder="ابحث عن اي شي"
      />
      {isLoading ? (
        <div className="flex items-center justify-center gap-4">
          <svg
            className="size-5 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <h1 className="text-xl font-medium ml-2">جاري البحث</h1>
        </div>
      ) : (
        <>
          {searchResults.length ? (
            <div className="flex w-200 flex-col gap-4 mt-10">
              <h1 className="font-bold text-4xl select-none">
                نتائج: {debouncedSearchTerm}
              </h1>
              <div className="grid grid-flow-col gap-4 w-full overflow-x-auto pb-4">
                {searchResults.map((d: TrackType) => (
                  <Track
                    key={d.trackId}
                    trackId={d.trackId}
                    artworkUrl100={d.artworkUrl100}
                    trackName={d.trackName}
                    shortDescription={d.shortDescription}
                  />
                ))}
              </div>
            </div>
          ) : (
            debouncedSearchTerm &&
            searchTerm && (
              <h1 className="text-xl font-medium ml-2">لا يوجد نتائج</h1>
            )
          )}
        </>
      )}
    </div>
  );
}

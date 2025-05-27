import { useQuery } from "@tanstack/react-query";
import Track from "./Track";
import { TrackType } from "../types";
import Search from "./Search";

export default function Explore() {
  const { data } = useQuery({
    queryKey: ["explore-thmanyah"],
    queryFn: async () => {
      const thmanyah = await fetch(
        "https://itunes.apple.com/search?term=thmanyah"
      );

      const music = await fetch("https://itunes.apple.com/search?term=music");

      const podcast = await fetch(
        "https://itunes.apple.com/search?term=podcast"
      );

      const data = {
        thmanyah: await thmanyah.json(),
        music: await music.json(),
        podcast: await podcast.json(),
      };

      return data;
    },
  });

  return (
    <>
      <Search />
      {Object.entries(data ?? {}).map(([name, list]) => (
        <div key={name} className="flex w-200 flex-col gap-4 mt-10">
          <h1 className="font-bold text-4xl select-none">
            {
              {
                thmanyah: "ثمانية",
                music: "موسيقى",
                podcast: "بودكاست",
              }[name]
            }
          </h1>
          <div className="grid grid-flow-col gap-4 w-full overflow-x-auto pb-4">
            {list?.results?.map((d: TrackType) => (
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
      ))}
    </>
  );
}

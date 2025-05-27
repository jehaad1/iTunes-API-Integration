import CreateListPopup from "./components/CreateListPopup";
import Lists from "./components/Lists";
import List from "./components/List";
import { ReactQueryClientProvider } from "./providers/ReactQueryClientProvider";

export default function Home() {
  return (
    <>
      <CreateListPopup />
      <div className="flex flex-col gap-10 items-center w-screen h-screen pt-60 bg-zinc-950">
        <h1 className="text-3xl font-semibold">iTunes API Integration</h1>
        <h2 className="text-lg opacity-80 -mt-7">By Jehaad AL-Johani</h2>
        <ReactQueryClientProvider>
          <div className="flex flex-col items-center gap-6 w-120 pb-40">
            <Lists />
            <List />
          </div>
        </ReactQueryClientProvider>
      </div>
    </>
  );
}

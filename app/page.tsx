import Sidebar from "./components/Sidebar/Sidebar";

export default function Home() {
  return (
    <div className="w-full h-screen flex items-center justify-center p-4">
      <div className="relative w-full h-full flex items-center justify-center border border-gray-400 rounded-md overflow-hidden">
        <Sidebar />
        <p>Hello there</p>
      </div>
    </div>
  );
}

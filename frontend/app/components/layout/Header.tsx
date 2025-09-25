// components/Header.tsx
export default function Header() {
  return (
    <header className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
      <h2 className="text-2xl font-bold text-gray-700 pl-[72px]">Dashboard</h2>
      <div className="flex items-center space-x-4">
        <span className="text-gray-500">Admin</span>
        <button className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition-all">
          Logout
        </button>
      </div>
    </header>
  );
}

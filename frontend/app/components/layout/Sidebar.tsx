// components/Sidebar.tsx
export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-gradient-to-b bg-[#FF6767] text-white p-6 flex flex-col rounded-r-2xl">
      <nav className="flex-1">
        <ul>
          {["Dashboard", "Tasks", "Users"].map((item) => (
            <li
              key={item}
              className="mb-4 p-3 rounded-lg hover:bg-white hover:text-red-500 cursor-pointer transition-colors"
            >
              {item}
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto text-sm opacity-80">v1.0.0</div>
    </aside>
  );
}

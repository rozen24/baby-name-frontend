const MainContent = () => {
  return (
    <main className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* Main Area */}
      <section className="md:col-span-3 bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Popular Baby Names</h2>
        <ul className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {["Aiden", "Sophia", "Liam", "Mia", "Noah", "Olivia"].map((name) => (
            <li
              key={name}
              className="p-3 border rounded-lg hover:bg-pink-50 cursor-pointer"
            >
              {name}
            </li>
          ))}
        </ul>
      </section>

      {/* Sidebar */}
      <aside className="bg-pink-50 shadow rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-3">Categories</h3>
        <ul className="space-y-2">
          <li><a href="#" className="hover:text-pink-600">Unique Names</a></li>
          <li><a href="#" className="hover:text-pink-600">Modern Names</a></li>
          <li><a href="#" className="hover:text-pink-600">Classic Names</a></li>
          <li><a href="#" className="hover:text-pink-600">Nature Inspired</a></li>
        </ul>
      </aside>
    </main>
  );
};

export default MainContent;

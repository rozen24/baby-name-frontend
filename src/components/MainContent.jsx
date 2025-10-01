// const MainContent = () => {
//   return (
//     <main className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-4 gap-6">
//       {/* Main Area */}
//       <section className="md:col-span-3 bg-white shadow rounded-lg p-6">
//         <h2 className="text-xl font-bold mb-4">Popular Baby Names</h2>
//         <ul className="grid grid-cols-2 md:grid-cols-3 gap-3">
//           {["Aiden", "Sophia", "Liam", "Mia", "Noah", "Olivia"].map((name) => (
//             <li
//               key={name}
//               className="p-3 border rounded-lg hover:bg-pink-50 cursor-pointer"
//             >
//               {name}
//             </li>
//           ))}
//         </ul>
//       </section>

//       {/* Sidebar */}
//       <aside className="bg-pink-50 shadow rounded-lg p-6">
//         <h3 className="text-lg font-semibold mb-3">Categories</h3>
//         <ul className="space-y-2">
//           <li><a href="#" className="hover:text-pink-600">Unique Names</a></li>
//           <li><a href="#" className="hover:text-pink-600">Modern Names</a></li>
//           <li><a href="#" className="hover:text-pink-600">Classic Names</a></li>
//           <li><a href="#" className="hover:text-pink-600">Nature Inspired</a></li>
//         </ul>
//       </aside>
//     </main>
//   );
// };

// export default MainContent;


import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export default function HomePage() {
  return (
    <section className="container mx-auto text-center py-16">
      <h1 className="text-4xl md:text-5xl font-display font-bold text-brand">
        Discover Beautiful Baby Names
      </h1>
      <p className="mt-4 text-lg text-gray-600">
        Search, filter, and explore names with meanings and origins.
      </p>
      <div className="mt-6 flex justify-center gap-4">
        <Button asChild size="lg">
          <Link to="/names">Browse Names</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link to="/about">About Us</Link>
        </Button>
      </div>
    </section>
  )
}


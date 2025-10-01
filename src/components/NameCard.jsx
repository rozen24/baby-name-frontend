import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Eye } from "lucide-react"
import NameDetailModal from "./NameDetailModal"

// Helper function to create URL-friendly slug
const createSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .trim()
}

export default function NameCard({ 
  _id, 
  name, 
  gender, 
  meaning, 
  description, 
  category, 
  alphabet,
  viewMode = "grid" 
}) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  const handleCardClick = () => {
    setIsModalOpen(true)
    // Update URL without navigation
    const slug = createSlug(name)
    window.history.pushState(null, '', `/names/${slug}`)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    // Restore previous URL
    window.history.back()
  }

  const toggleFavorite = (e) => {
    e.stopPropagation()
    setIsFavorite(!isFavorite)
    // Here you could implement saving favorites to localStorage or backend
  }

  if (viewMode === "list") {
    return (
      <>
        <Card 
          className="hover:shadow-md transition-all duration-200 cursor-pointer border-l-4 border-l-transparent hover:border-l-pink-500"
          onClick={handleCardClick}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
                  <Badge 
                    variant="secondary" 
                    className={gender === "boy" ? "bg-blue-100 text-blue-700" : "bg-pink-100 text-pink-700"}
                  >
                    {gender === "boy" ? "👦 Boy" : "👧 Girl"}
                  </Badge>
                  {category && (
                    <Badge variant="outline" className="text-xs">
                      {category.name}
                    </Badge>
                  )}
                </div>
                <p className="text-gray-600 text-sm line-clamp-2">{meaning}</p>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <button
                  onClick={toggleFavorite}
                  className={`p-2 rounded-full transition-colors ${
                    isFavorite ? "text-pink-500 bg-pink-50" : "text-gray-400 hover:text-pink-500"
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
                </button>
                <Eye className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <NameDetailModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          nameData={{
            _id,
            name,
            gender,
            meaning,
            description,
            category,
            alphabet
          }}
        />
      </>
    )
  }

  return (
    <>
      <Card 
        className="group hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1 bg-gradient-to-br from-white to-gray-50"
        onClick={handleCardClick}
      >
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-pink-600 transition-colors">
              {name}
            </CardTitle>
            <button
              onClick={toggleFavorite}
              className={`p-1 rounded-full transition-colors ${
                isFavorite ? "text-pink-500" : "text-gray-400 hover:text-pink-500"
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <Badge 
              variant="secondary" 
              className={`${
                gender === "boy" 
                  ? "bg-blue-100 text-blue-700 border-blue-200" 
                  : "bg-pink-100 text-pink-700 border-pink-200"
              }`}
            >
              {gender === "boy" ? "👦 ছেলে" : "👧 মেয়ে"}
            </Badge>
            {category && (
              <Badge variant="outline" className="text-xs">
                {category.name}
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-gray-600 text-sm line-clamp-3 mb-3">{meaning}</p>
          {alphabet && (
            <div className="text-xs text-gray-500">
              Starts with: <span className="font-medium">{alphabet.name}</span>
            </div>
          )}
          <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="flex items-center text-pink-600 text-sm">
              <Eye className="w-4 h-4 mr-1" />
              View Details
            </div>
          </div>
        </CardContent>
      </Card>

      <NameDetailModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        nameData={{
          _id,
          name,
          gender,
          meaning,
          description,
          category,
          alphabet
        }}
      />
    </>
  )
}
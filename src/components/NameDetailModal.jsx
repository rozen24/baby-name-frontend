import { useState, useEffect } from "react"
import { X, Heart, Share2, Copy, MapPin, Calendar, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "react-toastify"

const NameDetailModal = ({ isOpen, onClose, nameData }) => {
  const [relatedNames, setRelatedNames] = useState([])
  const [isLoadingRelated, setIsLoadingRelated] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  const { _id, name, gender, meaning, description, category, alphabet } = nameData || {}

  // Fetch related names when modal opens
  useEffect(() => {
    if (isOpen && _id) {
      fetchRelatedNames()
    }
  }, [isOpen, _id])

  const fetchRelatedNames = async () => {
    setIsLoadingRelated(true)
    try {
      // Fetch names with same category or alphabet, excluding current name
      const params = new URLSearchParams({
        limit: 6,
        ...(category?._id && { category: category._id }),
        ...(alphabet?._id && { alphabet: alphabet._id })
      })

      const response = await fetch(`${import.meta.env.VITE_API_URL}/names?${params}`)
      const data = await response.json()
      
      // Filter out the current name and randomize
      const filtered = data.names?.filter(n => n._id !== _id) || []
      const shuffled = filtered.sort(() => 0.5 - Math.random()).slice(0, 4)
      setRelatedNames(shuffled)
    } catch (error) {
      console.error("Failed to fetch related names:", error)
    } finally {
      setIsLoadingRelated(false)
    }
  }

  const handleShare = async () => {
    const url = window.location.href
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Baby Name: ${name}`,
          text: `Check out this beautiful baby name: ${name} - ${meaning}`,
          url: url,
        })
      } catch (error) {
        console.log("Share cancelled")
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(url)
      toast.success("Link copied to clipboard!")
    }
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
    // Here you could implement saving to localStorage or backend
    toast.success(isFavorite ? "Removed from favorites" : "Added to favorites")
  }

  if (!isOpen || !nameData) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white rounded-t-2xl border-b p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">
                {name?.charAt(0)}
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{name}</h1>
              <Badge 
                variant="secondary" 
                className={`${
                  gender === "boy" 
                    ? "bg-blue-100 text-blue-700" 
                    : "bg-pink-100 text-pink-700"
                }`}
              >
                {gender === "boy" ? "👦 Boy (ছেলে)" : "👧 Girl (মেয়ে)"}
              </Badge>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleFavorite}
              className={isFavorite ? "text-pink-600 bg-pink-50" : ""}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
            >
              <Share2 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="rounded-full"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Meaning */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
              <Tag className="w-5 h-5 mr-2 text-purple-600" />
              Meaning
            </h3>
            <p className="text-gray-700 text-base leading-relaxed">{meaning}</p>
          </div>

          {/* Description */}
          {description && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-700 leading-relaxed">{description}</p>
            </div>
          )}

          {/* Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {category && (
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <MapPin className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">Category</p>
                  <p className="font-semibold">{category.name}</p>
                </div>
              </div>
            )}
            
            {alphabet && (
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Calendar className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Starting Letter</p>
                  <p className="font-semibold">{alphabet.name}</p>
                </div>
              </div>
            )}
          </div>

          {/* Related Names */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Names</h3>
            {isLoadingRelated ? (
              <div className="grid grid-cols-2 gap-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-20 bg-gray-200 rounded-lg animate-pulse" />
                ))}
              </div>
            ) : relatedNames.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {relatedNames.map((relatedName) => (
                  <Card
                    key={relatedName._id}
                    className="cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-105"
                    onClick={() => {
                      // You could implement navigation to the related name
                      console.log("Navigate to:", relatedName.name)
                    }}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-sm">{relatedName.name}</h4>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            relatedName.gender === "boy" 
                              ? "border-blue-200 text-blue-600" 
                              : "border-pink-200 text-pink-600"
                          }`}
                        >
                          {relatedName.gender === "boy" ? "👦" : "👧"}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600 line-clamp-2">
                        {relatedName.meaning}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">
                No related names found
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NameDetailModal
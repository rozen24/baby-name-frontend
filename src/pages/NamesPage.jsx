import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { useNames } from "../hooks/useNames"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Search, Filter, Grid, List, SlidersHorizontal } from "lucide-react"
import Loader from "../components/Loader"
import NameCard from "../components/NameCard"

export default function NamesPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",
    gender: searchParams.get("gender") || "",
    category: searchParams.get("category") || "",
    alphabet: searchParams.get("alphabet") || "",
  })
  const [viewMode, setViewMode] = useState("grid") // grid or list
  const [showFilters, setShowFilters] = useState(false)
  const [categories, setCategories] = useState([])
  const [alphabets, setAlphabets] = useState([])
  
  const { data, isLoading } = useNames({ 
    page: 1, 
    limit: 50,
    ...filters 
  })

  // Fetch categories and alphabets for filters
  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const [categoriesRes, alphabetsRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/categories`),
          fetch(`${import.meta.env.VITE_API_URL}/alphabets`)
        ])
        
        // Handle categories
        if (categoriesRes.ok) {
          const categoriesData = await categoriesRes.json()
          setCategories(Array.isArray(categoriesData) ? categoriesData : [])
        } else {
          console.warn("Failed to fetch categories:", categoriesRes.status)
          setCategories([])
        }
        
        // Handle alphabets
        if (alphabetsRes.ok) {
          const alphabetsData = await alphabetsRes.json()
          setAlphabets(Array.isArray(alphabetsData) ? alphabetsData : [])
        } else {
          console.warn("Failed to fetch alphabets:", alphabetsRes.status)
          setAlphabets([])
        }
      } catch (error) {
        console.error("Failed to fetch filter options:", error)
        setCategories([])
        setAlphabets([])
      }
    }
    fetchFilterOptions()
  }, [])

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    
    // Update URL params
    const params = new URLSearchParams()
    Object.entries(newFilters).forEach(([k, v]) => {
      if (v) params.set(k, v)
    })
    setSearchParams(params)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    // Search is already handled by handleFilterChange
  }

  const clearFilters = () => {
    setFilters({
      search: "",
      gender: "",
      category: "",
      alphabet: "",
    })
    setSearchParams({})
  }

  if (isLoading) return <Loader text="Loading baby names..." />

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Discover Baby Names
          </h1>
          <p className="text-gray-600">
            Find the perfect name for your little one with meanings, origins, and more.
          </p>
        </div>

        {/* Search and Controls */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search for baby names..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange("search", e.target.value)}
                  className="pl-12 h-12 text-lg border-2 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
            </form>

            {/* View Controls */}
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden"
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filters
              </Button>
              
              <div className="flex items-center border rounded-lg">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Filters Row */}
          <div className={`mt-6 grid grid-cols-1 md:grid-cols-4 gap-4 ${showFilters || 'hidden lg:grid'}`}>
            <Select value={filters.gender || "all"} onValueChange={(value) => handleFilterChange("gender", value === "all" ? "" : value)}>
              <SelectTrigger>
                <SelectValue placeholder="Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Genders</SelectItem>
                <SelectItem value="boy">👦 Boy (ছেলে)</SelectItem>
                <SelectItem value="girl">👧 Girl (মেয়ে)</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.category || "all"} onValueChange={(value) => handleFilterChange("category", value === "all" ? "" : value)}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories && Array.isArray(categories) && categories.map((cat) => (
                  <SelectItem key={cat._id} value={cat._id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filters.alphabet || "all"} onValueChange={(value) => handleFilterChange("alphabet", value === "all" ? "" : value)}>
              <SelectTrigger>
                <SelectValue placeholder="Starting Letter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Letters</SelectItem>
                {alphabets && Array.isArray(alphabets) && alphabets.map((alpha) => (
                  <SelectItem key={alpha._id} value={alpha._id}>
                    {alpha.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button 
              variant="outline" 
              onClick={clearFilters}
              className="w-full"
            >
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            {data?.total || 0} names found
            {filters.search && ` for "${filters.search}"`}
          </p>
        </div>

        {/* Names Grid/List */}
        <div className={
          viewMode === "grid" 
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            : "space-y-4"
        }>
          {data?.names?.length > 0 ? (
            data.names.map((name) => (
              <NameCard 
                key={name._id} 
                {...name} 
                viewMode={viewMode}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                No names found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search terms or filters.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

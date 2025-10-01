import { useState } from "react"
import { Link } from "react-router-dom"
import { Search, Heart, Star, TrendingUp, Users, Globe } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/names?search=${encodeURIComponent(searchQuery.trim())}`
    }
  }

  const featuredNames = [
    { name: "আমিনা", gender: "girl", meaning: "Trustworthy, faithful" },
    { name: "রাহুল", gender: "boy", meaning: "Conqueror of all miseries" },
    { name: "ফাতিমা", gender: "girl", meaning: "Captivating, charming" },
    { name: "আরিফ", gender: "boy", meaning: "Wise, learned" }
  ]

  const stats = [
    { icon: Globe, count: "10,000+", label: "Baby Names" },
    { icon: Users, count: "50,000+", label: "Happy Parents" },
    { icon: Star, count: "4.9/5", label: "User Rating" },
    { icon: TrendingUp, count: "Daily", label: "New Additions" }
  ]

  const features = [
    {
      icon: Search,
      title: "Advanced Search",
      description: "Find names by meaning, origin, starting letter, and more filters"
    },
    {
      icon: Heart,
      title: "Save Favorites",
      description: "Create your personal list of favorite names to compare later"
    },
    {
      icon: Globe,
      title: "Cultural Diversity",
      description: "Discover names from Bengali, Arabic, English and other cultures"
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Find the Perfect
              <span className="block bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Baby Name
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Discover beautiful names with meanings, origins, and cultural significance. 
              Start your journey to finding the perfect name for your little one.
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-12">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                <Input
                  type="text"
                  placeholder="Search for baby names..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 text-lg border-2 border-gray-200 focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 rounded-2xl shadow-lg"
                />
                <Button 
                  type="submit"
                  className="absolute right-2 top-2 h-10 px-6 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                >
                  Search
                </Button>
              </div>
            </form>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700">
                <Link to="/names">
                  Browse All Names
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-2">
                <Link to="/names?gender=boy">
                  Boy Names
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-2">
                <Link to="/names?gender=girl">
                  Girl Names
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="w-12 h-12 mx-auto mb-4 text-pink-500" />
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.count}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Names */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Names</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover some of our most popular and beautiful baby names
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {featuredNames.map((name, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl text-gray-900">{name.name}</CardTitle>
                    <Badge 
                      variant="secondary" 
                      className={`${
                        name.gender === "boy" 
                          ? "bg-blue-100 text-blue-700" 
                          : "bg-pink-100 text-pink-700"
                      }`}
                    >
                      {name.gender === "boy" ? "👦" : "👧"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">{name.meaning}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button asChild variant="outline" size="lg">
              <Link to="/names">
                View All Names
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose BabyNames?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide comprehensive tools and information to help you make the perfect choice
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-pink-500 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Find Your Baby's Name?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of parents who have found the perfect name using our platform
            </p>
            <Button 
              asChild 
              size="lg" 
              className="bg-white text-pink-600 hover:bg-gray-50"
            >
              <Link to="/names">
                Start Exploring Names
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}


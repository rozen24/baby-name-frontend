import { Link } from "react-router-dom"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { User, Search, Heart, Menu, X } from "lucide-react"
import AuthModal from "./AuthModal"

export default function Navbar() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const token = localStorage.getItem("token")
  const username = localStorage.getItem("username")

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    localStorage.removeItem("role")
    window.location.reload()
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Navigate to names page with search query
      window.location.href = `/names?search=${encodeURIComponent(searchQuery.trim())}`
    }
  }

  return (
    <>
      <nav className="border-b bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">👶</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                BabyNames
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/" className="text-gray-700 hover:text-pink-600 transition-colors">
                Home
              </Link>
              <Link to="/names" className="text-gray-700 hover:text-pink-600 transition-colors">
                Browse Names
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-pink-600 transition-colors">
                About
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-pink-600 transition-colors">
                Contact
              </Link>
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="hidden md:flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search baby names..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
            </form>

            {/* User Actions */}
            <div className="flex items-center space-x-3">
              {token ? (
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-700">Hi, {username}!</span>
                  <Button variant="outline" size="sm" onClick={handleLogout}>
                    Logout
                  </Button>
                </div>
              ) : (
                <Button 
                  onClick={() => setIsAuthModalOpen(true)}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                >
                  <User className="w-4 h-4 mr-2" />
                  Login
                </Button>
              )}
              
              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden pb-4 space-y-3">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="flex items-center space-x-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Search baby names..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>
              </form>
              
              {/* Mobile Navigation Links */}
              <div className="flex flex-col space-y-2">
                <Link to="/" className="text-gray-700 hover:text-pink-600 py-2">
                  Home
                </Link>
                <Link to="/names" className="text-gray-700 hover:text-pink-600 py-2">
                  Browse Names
                </Link>
                <Link to="/about" className="text-gray-700 hover:text-pink-600 py-2">
                  About
                </Link>
                <Link to="/contact" className="text-gray-700 hover:text-pink-600 py-2">
                  Contact
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </>
  )
}

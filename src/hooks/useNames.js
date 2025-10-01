import { useQuery } from "@tanstack/react-query"
import { api } from "../api/client"

export function useNames({ page = 1, limit = 50, gender, search, category, alphabet }) {
  return useQuery({
    queryKey: ["names", { page, limit, gender, search, category, alphabet }],
    queryFn: async () => {
      const params = { page, limit }
      if (gender) params.gender = gender
      if (search) params.search = search
      if (category) params.category = category
      if (alphabet) params.alphabet = alphabet
      
      const res = await api.get("/names", { params })
      return res.data
    },
  })
}

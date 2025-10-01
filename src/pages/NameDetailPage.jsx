import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { api } from "../api/client"
import Loader from "../components/Loader"

export default function NameDetailPage() {
  const { id } = useParams()
  const { data, isLoading } = useQuery({
    queryKey: ["name", id],
    queryFn: async () => (await api.get(`/names/${id}`)).data,
  })

  if (isLoading) return <Loader text="Loading name details..." />

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold">{data.name}</h1>
      <p className="mt-2 text-gray-600">Meaning: {data.meaning}</p>
      <p className="mt-1 text-gray-600">
        Gender: {data.gender === "boy" ? "👦 ছেলে" : "👧 মেয়ে"}
      </p>
    </div>
  )
}

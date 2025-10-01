import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

export default function FilterSidebar({ gender, setGender }) {
  return (
    <aside className="border rounded-lg p-4 bg-white dark:bg-gray-900">
      <h3 className="font-semibold mb-3">Filter</h3>

      <Select value={gender} onValueChange={setGender}>
        <SelectTrigger className="w-full mb-3">
          <SelectValue placeholder="Select Gender" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="boy">👦 ছেলে</SelectItem>
          <SelectItem value="girl">👧 মেয়ে</SelectItem>
        </SelectContent>
      </Select>

      <Button className="w-full">Apply</Button>
    </aside>
  )
}

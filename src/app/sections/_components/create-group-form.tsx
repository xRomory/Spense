import { Label } from "@/components/ui/label"

export const CreateGroupForm = () => {
  return (
    <form className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="groupname" className="text-md font-semibold">Group Name</Label>
      </div>
    </form>
  )
}

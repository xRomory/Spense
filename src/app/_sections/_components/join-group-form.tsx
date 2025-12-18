import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRight } from "lucide-react"

export const JoinGroupForm = () => {
  return (
    <form className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="joinCode" className="text-md font-semibold">
          Join Code
        </Label>
        <Input
          id="joinCode"
          placeholder="Enter 6-digit code"
          maxLength={6}
          className="font-mono text-center text-lg font-bold"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="joinUserName" className="text-md font-semibold">
          Your Name
        </Label>
        <Input
          id="joinUserName"
          placeholder="Enter your name"
        />
      </div>
      <Button type="submit" className="w-full bg-primary/80 hover:bg-primary/70">
        Join Group
        <ArrowRight className="h-4 w-4 ml-2" />
      </Button>
    </form>
  )
}

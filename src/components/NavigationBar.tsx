import SpenseLogo from "./logo";
import { Button } from "./ui/button";

export default function NavigationBar() {
  return (
    <header className="bg-background/80 backdrop-blur-sm border-b border-primary shadow-xl/20 shadow-primary sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <SpenseLogo />

          <div className="flex items-center">
            <Button
              className="h-8"
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

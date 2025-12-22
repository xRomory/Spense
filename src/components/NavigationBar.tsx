import SpenseLogo from "./logo";
import { Button } from "./ui/button";

export default function NavigationBar() {
  return (
    <header className="bg-background/80 backdrop-blur-xs border-b border-primary shadow-xl/20 shadow-primary sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <SpenseLogo />

          <div className="flex items-center">
            <Button
              className="h-8 bg-linear-to-r from-secondary to-primary hover:bg-linear-to-r hover:from-secondary/90 hover:to-primary/90"
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

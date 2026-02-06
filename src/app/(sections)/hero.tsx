import SpenseLogo from "@/components/logo";

export default function HeroSection() {
  return (
    <div className="text-center space-y-6 mb-16">
      <SpenseLogo />
      <h1 className="text-4xl md:text-5xl font-koulen">
        Split Expenses,
        <span className="text-emerald-400 font-medium font-koulen">
          {" "}
          Track Balances
        </span>
      </h1>

      <p className="text-lg md:text-xl text-secondary-foreground max-w-2xl mx-auto">
        The easiest way to share bills and keep track of who owes what. Perfect
        for roommates, friends, and group trips.
      </p>
    </div>
  );
}

import { Card, CardContent } from "@/components/ui/card";
import { FEATURE_CARDS } from "@/constants";

export default function FeaturesSection() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
      {FEATURE_CARDS.map((feature, index) => (
        <Card key={index} className="text-center shadow-primary/20 hover:shadow-lg transition-shadow">
          <CardContent>
            <div className="w-12 h-12 bg-background rounded-full flex items-center justify-center mx-auto mb-4">
              <feature.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
            <p className="text-secondary-foreground text-sm">{feature.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

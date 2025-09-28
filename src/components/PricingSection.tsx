import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Star, Zap, Crown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const pricingTiers = [
  {
    id: "basic",
    name: "Explorer",
    description: "Perfect for budget-conscious travelers",
    price: "₹15,000",
    period: "starting from",
    icon: Star,
    popular: false,
    features: [
      "3-5 day trips",
      "Budget accommodations",
      "Basic itinerary planning",
      "Local transportation",
      "24/7 support",
      "Travel insurance included"
    ],
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    id: "premium",
    name: "Adventurer",
    description: "Most popular choice for memorable experiences",
    price: "₹45,000",
    period: "starting from",
    icon: Zap,
    popular: true,
    features: [
      "5-8 day trips",
      "Comfortable accommodations",
      "Detailed itinerary with activities",
      "Private transportation",
      "Professional guide",
      "Photo memories package",
      "Flexible booking",
      "Priority support"
    ],
    gradient: "from-primary to-primary-hover"
  },
  {
    id: "luxury",
    name: "Luxury Traveler",
    description: "Premium experiences for discerning travelers",
    price: "₹80,000",
    period: "starting from",
    icon: Crown,
    popular: false,
    features: [
      "7-14 day trips",
      "Luxury accommodations",
      "Fully customized experiences",
      "Private chauffeur",
      "Personal concierge",
      "Exclusive access to attractions",
      "Gourmet dining experiences",
      "VIP treatment throughout"
    ],
    gradient: "from-purple-500 to-pink-500"
  }
];

const PricingSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-secondary/20 to-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Choose Your Adventure Level
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From budget-friendly explorations to luxury experiences, we have the perfect trip for every traveler
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {pricingTiers.map((tier, index) => {
            const Icon = tier.icon;
            return (
              <Card 
                key={tier.id}
                className={`relative overflow-hidden shadow-[var(--card-shadow)] hover:shadow-[var(--card-shadow-hover)] transition-all duration-500 animate-scale-in ${
                  tier.popular ? 'scale-105 border-primary/50' : ''
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {tier.popular && (
                  <div className="absolute top-0 left-0 right-0">
                    <div className={`bg-gradient-to-r ${tier.gradient} text-white text-center py-2 text-sm font-semibold`}>
                      Most Popular
                    </div>
                  </div>
                )}
                
                <CardHeader className={`text-center ${tier.popular ? 'pt-8' : ''}`}>
                  <div className={`mx-auto h-16 w-16 rounded-2xl bg-gradient-to-br ${tier.gradient} flex items-center justify-center mb-4`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  
                  <CardTitle className="text-2xl font-bold">{tier.name}</CardTitle>
                  <p className="text-muted-foreground">{tier.description}</p>
                  
                  <div className="pt-4">
                    <div className="text-3xl font-bold text-primary">{tier.price}</div>
                    <div className="text-sm text-muted-foreground">{tier.period}</div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button
                    variant={tier.popular ? "cta" : "outline"}
                    className="w-full"
                    onClick={() => navigate("/plan")}
                  >
                    Plan Your {tier.name} Trip
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            All packages include 24/7 support and can be customized to your preferences
          </p>
          <Button variant="outline" onClick={() => navigate("/plan")}>
            Compare All Options
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
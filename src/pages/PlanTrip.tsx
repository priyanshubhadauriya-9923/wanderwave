import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { ArrowLeft, MapPin, DollarSign, Calendar, Target } from "lucide-react";

interface Filters {
  destinationType: string;
  budget: string;
  occasion: string;
  preferences: string[];
}

const PlanTrip = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<Filters>({
    destinationType: "",
    budget: "",
    occasion: "",
    preferences: []
  });

  const destinationTypes = [
    { value: "domestic", label: "Domestic (India)", icon: "🇮🇳" },
    { value: "international", label: "International", icon: "🌍" }
  ];

  const budgetRanges = [
    { value: "low", label: "Low Budget", description: "₹15,000 - ₹40,000"},
    { value: "moderate", label: "Moderate Budget", description: "₹40,000 - ₹80,000"},
    { value: "premium", label: "Premium", description: "₹80,000+"}
  ];

  const occasions = [
    { value: "casual", label: "Casual", icon: "🌟" },
    { value: "adventure", label: "Adventure", icon: "🏔️" },
    { value: "honeymoon", label: "Honeymoon", icon: "💕" },
    { value: "family", label: "Family Trip", icon: "👨‍👩‍👧‍👦" },
    { value: "all", label: "All", icon: "🎯" }
  ];

  const preferences = [
    { value: "adventure", label: "Adventure Activities", icon: "🧗‍♂️" },
    { value: "cultural", label: "Cultural Experience", icon: "🏛️" },
    { value: "relaxation", label: "Relaxation", icon: "🧘‍♀️" },
    { value: "photography", label: "Photography", icon: "📸" },
    { value: "food", label: "Food Tours", icon: "🍜" }
  ];

  const handlePreferenceToggle = (pref: string) => {
    setFilters(prev => ({
      ...prev,
      preferences: prev.preferences.includes(pref)
        ? prev.preferences.filter(p => p !== pref)
        : [...prev.preferences, pref]
    }));
  };

  const handleSubmit = () => {
    // Store filters and navigate to results
    localStorage.setItem('tripFilters', JSON.stringify(filters));
    navigate('/results');
  };

  const isFormValid = filters.destinationType && filters.budget && filters.occasion;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Tell us about your dream trip
          </h2>
          <p className="text-lg text-muted-foreground">
            Answer a few questions and we'll find the perfect matches for you
          </p>
        </div>

        {/* Destination Type */}
        <Card className="mb-8 shadow-[var(--card-shadow)] animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="mr-3 text-primary" size={24} />
              Destination Type
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {destinationTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => setFilters(prev => ({ ...prev, destinationType: type.value }))}
                  className={`p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                    filters.destinationType === type.value
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50 hover:bg-accent/50"
                  }`}
                >
                  <div className="text-2xl mb-2">{type.icon}</div>
                  <div className="font-semibold">{type.label}</div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Budget Range */}
        <Card className="mb-8 shadow-[var(--card-shadow)] animate-fade-in [animation-delay:200ms]">
          <CardHeader>
            <CardTitle className="flex items-center">
              <DollarSign className="mr-3 text-primary" size={24} />
              Budget Range
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {budgetRanges.map((budget) => (
                <button
                  key={budget.value}
                  onClick={() => setFilters(prev => ({ ...prev, budget: budget.value }))}
                  className={`p-4 rounded-lg border-2 transition-all duration-300 text-center ${
                    filters.budget === budget.value
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50 hover:bg-accent/50"
                  }`}
                >
                  
                  <div className="font-semibold mb-1">{budget.label}</div>
                  <div className="text-sm text-muted-foreground">{budget.description}</div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Occasion */}
        <Card className="mb-8 shadow-[var(--card-shadow)] animate-fade-in [animation-delay:400ms]">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-3 text-primary" size={24} />
              Occasion
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {occasions.map((occasion) => (
                <button
                  key={occasion.value}
                  onClick={() => setFilters(prev => ({ ...prev, occasion: occasion.value }))}
                  className={`p-4 rounded-lg border-2 transition-all duration-300 text-center ${
                    filters.occasion === occasion.value
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50 hover:bg-accent/50"
                  }`}
                >
                  <div className="text-2xl mb-2">{occasion.icon}</div>
                  <div className="font-semibold text-sm">{occasion.label}</div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Travel Preferences */}
        <Card className="mb-8 shadow-[var(--card-shadow)] animate-fade-in [animation-delay:600ms]">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="mr-3 text-primary" size={24} />
              Travel Preferences
              <Badge variant="secondary" className="ml-2">Multi-select</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {preferences.map((pref) => (
                <button
                  key={pref.value}
                  onClick={() => handlePreferenceToggle(pref.value)}
                  className={`p-4 rounded-lg border-2 transition-all duration-300 text-center ${
                    filters.preferences.includes(pref.value)
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50 hover:bg-accent/50"
                  }`}
                >
                  <div className="text-2xl mb-2">{pref.icon}</div>
                  <div className="font-semibold text-sm">{pref.label}</div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="text-center animate-fade-in [animation-delay:800ms]">
          <Button
            variant="cta"
            size="lg"
            onClick={handleSubmit}
            disabled={!isFormValid}
            className="px-12 py-4 text-lg"
          >
            Get My Trip
          </Button>
          {!isFormValid && (
            <p className="text-sm text-muted-foreground mt-2">
              Please select destination type, budget, and occasion to continue
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlanTrip;
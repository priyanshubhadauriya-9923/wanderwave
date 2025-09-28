import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { ArrowLeft, MapPin, Clock, Star, Camera, Mountain, Heart, Utensils, Camera as CameraIcon } from "lucide-react";

// Mock trip data
const mockTrips = [
  // DOMESTIC - LOW BUDGET
  {
    id: 1,
    name: "Goa Beach Paradise",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&h=600&fit=crop",
    description: "Experience the perfect blend of beaches, culture, and nightlife in India's favorite coastal destination.",
    duration: "5 Days, 4 Nights",
    budget: "low",
    highlights: ["Beach Activities", "Cultural Tours", "Local Cuisine"],
    rating: 4.8,
    price: "₹25,000",
    preferences: ["relaxation", "cultural", "food"],
    destinationType: "domestic",
    occasions: ["casual", "honeymoon", "all"]
  },
  {
    id: 2,
    name: "Rishikesh Adventure Camp",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=600&fit=crop",
    description: "Thrilling river rafting, bungee jumping, and spiritual experiences in the adventure capital of India.",
    duration: "3 Days, 2 Nights",
    budget: "low",
    highlights: ["River Rafting", "Bungee Jumping", "Yoga Sessions"],
    rating: 4.6,
    price: "₹18,000",
    preferences: ["adventure", "relaxation"],
    destinationType: "domestic",
    occasions: ["adventure", "casual", "all"]
  },
  {
    id: 3,
    name: "Agra Heritage Walk",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&h=600&fit=crop",
    description: "Explore the magnificent Taj Mahal and rich Mughal heritage with guided cultural tours.",
    duration: "2 Days, 1 Night",
    budget: "low",
    highlights: ["Taj Mahal", "Agra Fort", "Local Markets"],
    rating: 4.5,
    price: "₹12,000",
    preferences: ["cultural", "photography"],
    destinationType: "domestic",
    occasions: ["family", "casual", "all"]
  },
  {
    id: 4,
    name: "Pushkar Desert Experience",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&h=600&fit=crop",
    description: "Camel safari, desert camping, and vibrant local culture in the holy city of Pushkar.",
    duration: "3 Days, 2 Nights",
    budget: "low",
    highlights: ["Camel Safari", "Desert Camping", "Holy Lake"],
    rating: 4.4,
    price: "₹16,000",
    preferences: ["adventure", "cultural"],
    destinationType: "domestic",
    occasions: ["adventure", "casual", "all"]
  },
  {
    id: 5,
    name: "Hampi Archaeological Wonder",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&h=600&fit=crop",
    description: "Ancient ruins, boulder landscapes, and UNESCO World Heritage sites in Karnataka.",
    duration: "4 Days, 3 Nights",
    budget: "low",
    highlights: ["Ancient Temples", "Boulder Climbing", "Historical Tours"],
    rating: 4.7,
    price: "₹22,000",
    preferences: ["cultural", "photography", "adventure"],
    destinationType: "domestic",
    occasions: ["casual", "all"]
  },

  // DOMESTIC - MODERATE BUDGET
  {
    id: 6,
    name: "Kerala Backwaters Cruise",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&h=600&fit=crop",
    description: "Serene houseboat journey through Kerala's famous backwaters with traditional cuisine and Ayurvedic treatments.",
    duration: "4 Days, 3 Nights",
    budget: "moderate",
    highlights: ["Houseboat Stay", "Ayurvedic Spa", "Traditional Cuisine"],
    rating: 4.7,
    price: "₹35,000",
    preferences: ["relaxation", "cultural", "food"],
    destinationType: "domestic",
    occasions: ["casual", "honeymoon", "family", "all"]
  },
  {
    id: 7,
    name: "Himalayan Adventure Trek",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    description: "Challenge yourself with breathtaking mountain views and thrilling trekking adventures in the Himalayas.",
    duration: "7 Days, 6 Nights",
    budget: "moderate",
    highlights: ["Mountain Trekking", "Adventure Sports", "Scenic Views"],
    rating: 4.9,
    price: "₹45,000",
    preferences: ["adventure", "photography"],
    destinationType: "domestic",
    occasions: ["adventure", "all"]
  },
  {
    id: 8,
    name: "Ladakh Motorcycle Expedition",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    description: "Epic motorcycle journey through the world's highest motorable passes and stunning landscapes.",
    duration: "10 Days, 9 Nights",
    budget: "moderate",
    highlights: ["Motorcycle Tour", "High Altitude Passes", "Monasteries"],
    rating: 4.8,
    price: "₹55,000",
    preferences: ["adventure", "photography"],
    destinationType: "domestic",
    occasions: ["adventure", "all"]
  },
  {
    id: 9,
    name: "Andaman Island Paradise",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
    description: "Crystal clear waters, water sports, and pristine beaches in India's tropical paradise.",
    duration: "6 Days, 5 Nights",
    budget: "moderate",
    highlights: ["Scuba Diving", "Water Sports", "Beach Resorts"],
    rating: 4.6,
    price: "₹48,000",
    preferences: ["adventure", "relaxation"],
    destinationType: "domestic",
    occasions: ["honeymoon", "casual", "all"]
  },
  {
    id: 10,
    name: "Coorg Coffee Plantation Stay",
    image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5a?w=800&h=600&fit=crop",
    description: "Misty hills, coffee plantations, and homestay experience in Scotland of India.",
    duration: "5 Days, 4 Nights",
    budget: "moderate",
    highlights: ["Coffee Plantation", "Homestay", "Nature Walks"],
    rating: 4.5,
    price: "₹32,000",
    preferences: ["relaxation", "cultural", "food"],
    destinationType: "domestic",
    occasions: ["family", "casual", "honeymoon", "all"]
  },

  // DOMESTIC - PREMIUM BUDGET
  {
    id: 11,
    name: "Rajasthan Royal Heritage",
    image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73dad?w=800&h=600&fit=crop",
    description: "Step into royalty with magnificent palaces, desert safaris, and rich cultural experiences.",
    duration: "8 Days, 7 Nights",
    budget: "premium",
    highlights: ["Palace Hotels", "Desert Safari", "Cultural Shows"],
    rating: 4.8,
    price: "₹95,000",
    preferences: ["cultural", "photography", "adventure"],
    destinationType: "domestic",
    occasions: ["family", "casual", "honeymoon", "all"]
  },
  {
    id: 12,
    name: "Luxury Kashmir Houseboat",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    description: "Luxury houseboat stay on Dal Lake with helicopter rides and premium experiences.",
    duration: "6 Days, 5 Nights",
    budget: "premium",
    highlights: ["Luxury Houseboat", "Helicopter Ride", "Shikara Cruise"],
    rating: 4.9,
    price: "₹85,000",
    preferences: ["relaxation", "photography", "cultural"],
    destinationType: "domestic",
    occasions: ["honeymoon", "casual", "all"]
  },
  {
    id: 13,
    name: "Goa Luxury Beach Resort",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&h=600&fit=crop",
    description: "5-star beach resort experience with private beach access and world-class amenities.",
    duration: "7 Days, 6 Nights",
    budget: "premium",
    highlights: ["5-Star Resort", "Private Beach", "Spa Treatments"],
    rating: 4.7,
    price: "₹75,000",
    preferences: ["relaxation", "food"],
    destinationType: "domestic",
    occasions: ["honeymoon", "casual", "all"]
  },
  {
    id: 14,
    name: "Golden Triangle Luxury",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&h=600&fit=crop",
    description: "Luxury tour of Delhi, Agra, and Jaipur with heritage hotels and private guides.",
    duration: "7 Days, 6 Nights",
    budget: "premium",
    highlights: ["Heritage Hotels", "Private Guide", "Luxury Transport"],
    rating: 4.8,
    price: "₹90,000",
    preferences: ["cultural", "photography"],
    destinationType: "domestic",
    occasions: ["family", "casual", "all"]
  },
  {
    id: 15,
    name: "Ranthambore Wildlife Safari",
    image: "https://images.unsplash.com/photo-1549366021-9f761d040a94?w=800&h=600&fit=crop",
    description: "Luxury wildlife experience with premium lodges and exclusive tiger safari experiences.",
    duration: "5 Days, 4 Nights",
    budget: "premium",
    highlights: ["Tiger Safari", "Luxury Lodge", "Wildlife Photography"],
    rating: 4.6,
    price: "₹65,000",
    preferences: ["adventure", "photography"],
    destinationType: "domestic",
    occasions: ["family", "adventure", "all"]
  },

  // INTERNATIONAL - LOW BUDGET
  {
    id: 16,
    name: "Nepal Trekking Adventure",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop",
    description: "Budget-friendly trekking experience in the Himalayas with stunning mountain views.",
    duration: "8 Days, 7 Nights",
    budget: "low",
    highlights: ["Himalayan Trek", "Local Homestays", "Mountain Views"],
    rating: 4.5,
    price: "₹35,000",
    preferences: ["adventure", "photography", "cultural"],
    destinationType: "international",
    occasions: ["adventure", "casual", "all"]
  },
  {
    id: 17,
    name: "Bhutan Cultural Discovery",
    image: "https://images.unsplash.com/photo-1571104508999-893933ded431?w=800&h=600&fit=crop",
    description: "Explore the Last Shangri-La with monasteries, festivals, and pristine culture.",
    duration: "6 Days, 5 Nights",
    budget: "low",
    highlights: ["Monasteries", "Cultural Tours", "Traditional Festivals"],
    rating: 4.7,
    price: "₹45,000",
    preferences: ["cultural", "relaxation", "photography"],
    destinationType: "international",
    occasions: ["casual", "family", "all"]
  },
  {
    id: 18,
    name: "Sri Lanka Beach & Culture",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
    description: "Beaches, ancient temples, and tea plantations in the pearl of the Indian Ocean.",
    duration: "7 Days, 6 Nights",
    budget: "low",
    highlights: ["Beach Time", "Ancient Temples", "Tea Plantations"],
    rating: 4.4,
    price: "₹42,000",
    preferences: ["relaxation", "cultural", "photography"],
    destinationType: "international",
    occasions: ["honeymoon", "casual", "family", "all"]
  },

  // INTERNATIONAL - MODERATE BUDGET
  {
    id: 19,
    name: "Thailand Island Hopping",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    description: "Explore multiple stunning Thai islands with crystal clear waters and vibrant marine life.",
    duration: "7 Days, 6 Nights",
    budget: "moderate",
    highlights: ["Island Hopping", "Snorkeling", "Beach Activities"],
    rating: 4.6,
    price: "₹55,000",
    preferences: ["adventure", "relaxation"],
    destinationType: "international",
    occasions: ["adventure", "casual", "honeymoon", "all"]
  },
  {
    id: 20,
    name: "Vietnam Cultural Journey",
    image: "https://images.unsplash.com/photo-1559592413-7cec4d0d1eec?w=800&h=600&fit=crop",
    description: "From bustling Ho Chi Minh to serene Halong Bay, experience Vietnam's rich culture and cuisine.",
    duration: "8 Days, 7 Nights",
    budget: "moderate",
    highlights: ["Halong Bay Cruise", "Street Food Tours", "Cu Chi Tunnels"],
    rating: 4.7,
    price: "₹52,000",
    preferences: ["cultural", "food", "photography"],
    destinationType: "international",
    occasions: ["casual", "family", "all"]
  },
  {
    id: 21,
    name: "Malaysia Twin Towers & Beaches",
    image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&h=600&fit=crop",
    description: "Modern Kuala Lumpur cityscape combined with beautiful island beaches and cultural diversity.",
    duration: "6 Days, 5 Nights",
    budget: "moderate",
    highlights: ["Petronas Towers", "Island Beaches", "Cultural Districts"],
    rating: 4.5,
    price: "₹48,000",
    preferences: ["cultural", "relaxation", "photography"],
    destinationType: "international",
    occasions: ["family", "casual", "honeymoon", "all"]
  },
  {
    id: 22,
    name: "Cambodia Angkor Wat Explorer",
    image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73dad?w=800&h=600&fit=crop",
    description: "Ancient temples, rich history, and cultural immersion in the heart of Southeast Asia.",
    duration: "5 Days, 4 Nights",
    budget: "moderate",
    highlights: ["Angkor Wat", "Temple Complexes", "Floating Villages"],
    rating: 4.6,
    price: "₹44,000",
    preferences: ["cultural", "photography", "adventure"],
    destinationType: "international",
    occasions: ["casual", "family", "all"]
  },
  {
    id: 23,
    name: "Dubai Desert & City",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop",
    description: "Futuristic cityscape, luxury shopping, and thrilling desert safari adventures.",
    duration: "5 Days, 4 Nights",
    budget: "moderate",
    highlights: ["Burj Khalifa", "Desert Safari", "Dubai Mall"],
    rating: 4.7,
    price: "₹58,000",
    preferences: ["adventure", "photography", "cultural"],
    destinationType: "international",
    occasions: ["family", "casual", "honeymoon", "all"]
  },

  // INTERNATIONAL - PREMIUM BUDGET
  {
    id: 24,
    name: "Bali Tropical Getaway",
    image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800&h=600&fit=crop",
    description: "Discover the magic of Bali with stunning temples, rice terraces, and pristine beaches.",
    duration: "6 Days, 5 Nights",
    budget: "premium",
    highlights: ["Temple Tours", "Rice Terraces", "Beach Resorts"],
    rating: 4.9,
    price: "₹85,000",
    preferences: ["cultural", "relaxation", "photography"],
    destinationType: "international",
    occasions: ["honeymoon", "casual", "all"]
  },
  {
    id: 25,
    name: "Maldives Overwater Villas",
    image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&h=600&fit=crop",
    description: "Ultimate luxury in overwater villas with world-class diving and pristine coral reefs.",
    duration: "7 Days, 6 Nights",
    budget: "premium",
    highlights: ["Overwater Villas", "Scuba Diving", "Spa Treatments"],
    rating: 4.9,
    price: "₹150,000",
    preferences: ["relaxation", "adventure"],
    destinationType: "international",
    occasions: ["honeymoon", "casual", "all"]
  },
  {
    id: 26,
    name: "Switzerland Alpine Luxury",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    description: "Luxury mountain resorts, scenic train journeys, and pristine Alpine landscapes.",
    duration: "8 Days, 7 Nights",
    budget: "premium",
    highlights: ["Luxury Resorts", "Scenic Trains", "Alpine Views"],
    rating: 4.8,
    price: "₹180,000",
    preferences: ["relaxation", "photography", "adventure"],
    destinationType: "international",
    occasions: ["honeymoon", "family", "casual", "all"]
  },
  {
    id: 27,
    name: "Japan Cultural Immersion",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop",
    description: "Traditional ryokans, cherry blossoms, and authentic cultural experiences in Japan.",
    duration: "10 Days, 9 Nights",
    budget: "premium",
    highlights: ["Traditional Ryokans", "Temple Visits", "Bullet Train"],
    rating: 4.9,
    price: "₹160,000",
    preferences: ["cultural", "photography", "food"],
    destinationType: "international",
    occasions: ["casual", "family", "all"]
  },
  {
    id: 28,
    name: "European Grand Tour",
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&h=600&fit=crop",
    description: "Luxury multi-city European experience covering Paris, Rome, and Barcelona.",
    duration: "12 Days, 11 Nights",
    budget: "premium",
    highlights: ["Luxury Hotels", "Private Tours", "First-class Transport"],
    rating: 4.8,
    price: "₹200,000",
    preferences: ["cultural", "photography", "food"],
    destinationType: "international",
    occasions: ["honeymoon", "casual", "family", "all"]
  },

  // ADDITIONAL ADVENTURE TRIPS
  {
    id: 29,
    name: "Manali Adventure Sports",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    description: "Paragliding, river rafting, and mountain biking in the adventure hub of Himachal.",
    duration: "4 Days, 3 Nights",
    budget: "low",
    highlights: ["Paragliding", "River Rafting", "Mountain Biking"],
    rating: 4.6,
    price: "₹20,000",
    preferences: ["adventure"],
    destinationType: "domestic",
    occasions: ["adventure", "casual", "all"]
  },
  {
    id: 30,
    name: "Spiti Valley Expedition",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    description: "Remote Himalayan valley with ancient monasteries and stunning landscapes.",
    duration: "9 Days, 8 Nights",
    budget: "moderate",
    highlights: ["Ancient Monasteries", "High Altitude Desert", "Stargazing"],
    rating: 4.7,
    price: "₹50,000",
    preferences: ["adventure", "photography", "cultural"],
    destinationType: "domestic",
    occasions: ["adventure", "all"]
  }
];

const TripResults = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<any>(null);
  const [filteredTrips, setFilteredTrips] = useState(mockTrips);

  useEffect(() => {
    const savedFilters = localStorage.getItem('tripFilters');
    if (savedFilters) {
      const parsedFilters = JSON.parse(savedFilters);
      setFilters(parsedFilters);
      
      // Filter trips based on user preferences
      const filtered = mockTrips.filter(trip => {
        const matchesDestination = trip.destinationType === parsedFilters.destinationType;
        const matchesBudget = trip.budget === parsedFilters.budget;
        const matchesOccasion = trip.occasions.includes(parsedFilters.occasion);
        
        return matchesDestination && matchesBudget && matchesOccasion;
      });
      
      setFilteredTrips(filtered);
    } else {
      // Redirect to plan page if no filters found
      navigate('/plan');
    }
  }, [navigate]);

  const getPreferenceIcon = (pref: string) => {
    switch (pref) {
      case 'adventure': return <Mountain className="w-4 h-4" />;
      case 'cultural': return <Star className="w-4 h-4" />;
      case 'relaxation': return <Heart className="w-4 h-4" />;
      case 'photography': return <CameraIcon className="w-4 h-4" />;
      case 'food': return <Utensils className="w-4 h-4" />;
      default: return <Star className="w-4 h-4" />;
    }
  };

  const handleTripSelect = (tripId: number) => {
    navigate(`/trip/${tripId}`);
  };

  if (!filters) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Results Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Perfect Trips for You
          </h2>
          <p className="text-lg text-muted-foreground mb-4">
            We found {filteredTrips.length} amazing trips matching your preferences<br/>
            <strong>Note: </strong>Budget of each trip is shown per head
          </p>
          
          
          {/* Filter Summary */}
          <div className="flex flex-wrap justify-center gap-2">
            <Badge variant="outline" className="text-sm">
              {filters.destinationType === 'domestic' ? 'Domestic (India)' : 'International'}
            </Badge>
            <Badge variant="outline" className="text-sm">
              {filters.budget} Budget
            </Badge>
            <Badge variant="outline" className="text-sm">
              {filters.occasion}
            </Badge>
            {filters.preferences.map((pref: string) => (
              <Badge key={pref} variant="secondary" className="text-sm">
                {pref}
              </Badge>
            ))}
          </div>
        </div>

        {/* Trip Results Grid */}
        {filteredTrips.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTrips.map((trip, index) => (
              <Card 
                key={trip.id} 
                className="overflow-hidden shadow-[var(--card-shadow)] hover:shadow-[var(--card-shadow-hover)] transition-all duration-300 cursor-pointer animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => handleTripSelect(trip.id)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={trip.image}
                    alt={trip.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 mr-1" />
                    <span className="text-sm font-semibold">{trip.rating}</span>
                  </div>
                </div>
                
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl font-bold">{trip.name}</CardTitle>
                    <Badge variant="outline" className="text-primary font-semibold">
                      {trip.price}
                    </Badge>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Clock className="w-4 h-4 mr-1" />
                    <span className="text-sm">{trip.duration}</span>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {trip.description}
                  </p>
                  
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Trip Highlights</h4>
                      <div className="flex flex-wrap gap-1">
                        {trip.highlights.map((highlight, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Matches Your Interests</h4>
                      <div className="flex gap-2">
                        {trip.preferences.filter(pref => filters.preferences.includes(pref)).map((pref, idx) => (
                          <div key={idx} className="flex items-center text-primary">
                            {getPreferenceIcon(pref)}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    variant="cta" 
                    className="w-full mt-4"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTripSelect(trip.id);
                    }}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <MapPin className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No trips found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your filters to see more options
            </p>
            <Button variant="outline" onClick={() => navigate('/plan')}>
              Update Preferences
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TripResults;
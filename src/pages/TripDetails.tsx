import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Navigation from "@/components/Navigation";
import { ArrowLeft, Clock, Star, Check, X, Calendar, Users, MapPin, Camera } from "lucide-react";
import BookingForm from "@/components/BookingForm";

// Extended mock data with detailed trip information
const tripDetails = {
  1: {
    id: 1,
    name: "Goa Beach Paradise",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&h=800&fit=crop",
    description: "Experience the perfect blend of beaches, culture, and nightlife in India's favorite coastal destination. From pristine beaches to Portuguese architecture, vibrant markets to serene backwaters.",
    duration: "5 Days, 4 Nights",
    price: "₹25,000",
    rating: 4.8,
    gallery: [
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Beach Exploration",
        activities: ["Airport pickup", "Hotel check-in", "Baga Beach visit", "Sunset at Anjuna Beach"]
      },
      {
        day: 2,
        title: "Cultural Immersion",
        activities: ["Old Goa churches tour", "Spice plantation visit", "Traditional Goan lunch", "Fontainhas heritage walk"]
      },
      {
        day: 3,
        title: "Adventure & Relaxation",
        activities: ["Water sports at Calangute", "Beach shack lunch", "Ayurvedic spa session", "Night market shopping"]
      },
      {
        day: 4,
        title: "Backwater Cruise",
        activities: ["Mandovi River cruise", "Dolphin spotting", "Local seafood dinner", "Beach bonfire"]
      },
      {
        day: 5,
        title: "Departure",
        activities: ["Hotel checkout", "Last-minute shopping", "Airport transfer"]
      }
    ],
    inclusions: [
      "4 nights accommodation in beach resort",
      "Daily breakfast and 2 lunches",
      "All transfers and sightseeing",
      "Professional guide",
      "Water sports activities",
      "Mandovi River cruise",
      "All entrance fees"
    ],
    exclusions: [
      "International/Domestic flights",
      "Personal expenses",
      "Alcoholic beverages",
      "Travel insurance",
      "Tips and gratuities"
    ],
    highlights: ["Beach Activities", "Cultural Tours", "Local Cuisine", "Water Sports", "Heritage Sites"]
  },
  2: {
    id: 2,
    name: "Rishikesh Adventure Camp",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200&h=800&fit=crop",
    description: "Thrilling river rafting, bungee jumping, and spiritual experiences in the adventure capital of India.",
    duration: "3 Days, 2 Nights",
    price: "₹18,000",
    rating: 4.6,
    gallery: [
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Adventure Briefing",
        activities: ["Airport pickup", "Camp check-in", "Adventure gear fitting", "Evening yoga session"]
      },
      {
        day: 2,
        title: "Adventure Day",
        activities: ["River rafting expedition", "Bungee jumping", "Rock climbing", "Bonfire with local music"]
      },
      {
        day: 3,
        title: "Spiritual & Departure",
        activities: ["Morning meditation", "Ganga Aarti", "Last minute shopping", "Departure"]
      }
    ],
    inclusions: [
      "2 nights adventure camp accommodation",
      "All meals included",
      "All adventure activities",
      "Safety equipment",
      "Professional instructors",
      "All transfers"
    ],
    exclusions: [
      "Travel insurance",
      "Personal expenses",
      "Additional activities",
      "Tips and gratuities"
    ],
    highlights: ["River Rafting", "Bungee Jumping", "Yoga Sessions", "Adventure Sports"]
  },
  3: {
    id: 3,
    name: "Agra Heritage Walk",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1200&h=800&fit=crop",
    description: "Explore the magnificent Taj Mahal and rich Mughal heritage with guided cultural tours.",
    duration: "2 Days, 1 Night",
    price: "₹12,000",
    rating: 4.5,
    gallery: [
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1539650116574-75c0c6d73dad?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&h=600&fit=crop"
    ],
    itinerary: [
      {
        day: 1,
        title: "Taj Mahal & Fort",
        activities: ["Early morning Taj Mahal visit", "Agra Fort exploration", "Local handicraft shopping", "Sunset view from Mehtab Bagh"]
      },
      {
        day: 2,
        title: "Heritage & Departure",
        activities: ["Itimad-ud-Daulah visit", "Local market tour", "Traditional lunch", "Departure"]
      }
    ],
    inclusions: [
      "1 night heritage hotel stay",
      "Daily breakfast and lunch",
      "All monument entry fees",
      "Professional guide",
      "Transportation"
    ],
    exclusions: [
      "Personal expenses",
      "Dinner",
      "Shopping expenses",
      "Tips"
    ],
    highlights: ["Taj Mahal", "Agra Fort", "Local Markets", "Heritage Architecture"]
  },
  4: {
    id: 4,
    name: "Pushkar Desert Experience",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=1200&h=800&fit=crop",
    description: "Camel safari, desert camping, and vibrant local culture in the holy city of Pushkar.",
    duration: "3 Days, 2 Nights",
    price: "₹16,000",
    rating: 4.4,
    gallery: [
      "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1539650116574-75c0c6d73dad?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
    ],
    itinerary: [
      {
        day: 1,
        title: "Pushkar Arrival",
        activities: ["Arrival and hotel check-in", "Pushkar Lake visit", "Brahma Temple darshan", "Evening market walk"]
      },
      {
        day: 2,
        title: "Desert Safari",
        activities: ["Camel safari to desert", "Desert camping setup", "Cultural folk dance", "Stargazing and bonfire"]
      },
      {
        day: 3,
        title: "Sunrise & Departure",
        activities: ["Desert sunrise", "Camel ride back", "Traditional breakfast", "Departure"]
      }
    ],
    inclusions: [
      "2 nights accommodation (1 hotel + 1 desert camp)",
      "All meals during desert camp",
      "Camel safari",
      "Cultural programs",
      "All transfers"
    ],
    exclusions: [
      "Personal expenses",
      "Hotel meals (except desert camp)",
      "Shopping",
      "Tips"
    ],
    highlights: ["Camel Safari", "Desert Camping", "Holy Lake", "Cultural Shows"]
  },
  5: {
    id: 5,
    name: "Hampi Archaeological Wonder",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1200&h=800&fit=crop",
    description: "Ancient ruins, boulder landscapes, and UNESCO World Heritage sites in Karnataka.",
    duration: "4 Days, 3 Nights",
    price: "₹22,000",
    rating: 4.7,
    gallery: [
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1539650116574-75c0c6d73dad?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&h=600&fit=crop"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Virupaksha",
        activities: ["Arrival and check-in", "Virupaksha Temple visit", "Hampi Bazaar exploration", "Sunset from Hemakuta Hill"]
      },
      {
        day: 2,
        title: "Royal Enclosure",
        activities: ["Lotus Mahal visit", "Elephant Stables", "Hazara Rama Temple", "Queen's Bath exploration"]
      },
      {
        day: 3,
        title: "Boulder Adventures",
        activities: ["Boulder climbing/trekking", "Anegundi village visit", "Tungabhadra River coracle ride", "Monkey Temple"]
      },
      {
        day: 4,
        title: "Final Exploration",
        activities: ["Vittala Temple complex", "Stone Chariot photography", "Last minute exploration", "Departure"]
      }
    ],
    inclusions: [
      "3 nights heritage accommodation",
      "Daily breakfast",
      "All monument entry fees",
      "Local transportation",
      "Professional guide"
    ],
    exclusions: [
      "Lunch and dinner",
      "Personal expenses",
      "Adventure activity charges",
      "Tips"
    ],
    highlights: ["Ancient Temples", "Boulder Climbing", "Historical Tours", "UNESCO Heritage Site"]
  },
  6: {
    id: 6,
    name: "Kerala Backwaters Cruise",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1200&h=800&fit=crop",
    description: "Serene houseboat journey through Kerala's famous backwaters with traditional cuisine and Ayurvedic treatments.",
    duration: "4 Days, 3 Nights",
    price: "₹35,000",
    rating: 4.7,
    gallery: [
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1544966503-7cc5ac882d5a?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop"
    ],
    itinerary: [
      {
        day: 1,
        title: "Cochin to Alleppey",
        activities: ["Airport pickup from Cochin", "Drive to Alleppey", "Houseboat check-in", "Backwater cruise begins"]
      },
      {
        day: 2,
        title: "Full Day Cruise",
        activities: ["Village visits", "Traditional fishing", "Ayurvedic massage", "Sunset cruise"]
      },
      {
        day: 3,
        title: "Kumarakom Experience",
        activities: ["Kumarakom Bird Sanctuary", "Traditional cooking demo", "Canoe rides", "Cultural programs"]
      },
      {
        day: 4,
        title: "Departure",
        activities: ["Final cruise", "Houseboat check-out", "Transfer to Cochin", "Departure"]
      }
    ],
    inclusions: [
      "3 nights houseboat accommodation",
      "All meals on houseboat",
      "Ayurvedic treatments",
      "All transfers",
      "Cultural programs"
    ],
    exclusions: [
      "Flight tickets",
      "Personal expenses",
      "Shopping",
      "Tips"
    ],
    highlights: ["Houseboat Stay", "Ayurvedic Spa", "Traditional Cuisine", "Backwater Cruise"]
  },
  7: {
    id: 7,
    name: "Himalayan Adventure Trek",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop",
    description: "Challenge yourself with breathtaking mountain views and thrilling trekking adventures in the Himalayas.",
    duration: "7 Days, 6 Nights",
    price: "₹45,000",
    rating: 4.9,
    gallery: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=600&fit=crop"
    ],
    itinerary: [
      {
        day: 1,
        title: "Base Camp Arrival",
        activities: ["Arrive at base camp", "Gear check and briefing", "Acclimatization walk", "Evening preparation"]
      },
      {
        day: 2,
        title: "Trek Day 1",
        activities: ["Early morning start", "Trek to Camp 1", "Mountain views", "Rest and preparation"]
      },
      {
        day: 3,
        title: "Trek Day 2",
        activities: ["Trek to higher altitude", "Photography stops", "Mountain wildlife spotting", "Camp setup"]
      },
      {
        day: 4,
        title: "Summit Attempt",
        activities: ["Early summit push", "Peak photography", "Descent to base camp", "Celebration"]
      },
      {
        day: 5,
        title: "Rest & Explore",
        activities: ["Rest day", "Local village visit", "Cultural interaction", "Equipment maintenance"]
      },
      {
        day: 6,
        title: "Adventure Activities",
        activities: ["Rock climbing", "Rappelling", "River crossing", "Farewell dinner"]
      },
      {
        day: 7,
        title: "Departure",
        activities: ["Pack up", "Final group photo", "Return journey", "Departure"]
      }
    ],
    inclusions: [
      "6 nights mountain accommodation",
      "All meals during trek",
      "Professional trek guide",
      "All trekking equipment",
      "Safety gear",
      "Transportation"
    ],
    exclusions: [
      "Personal trekking gear",
      "Travel insurance",
      "Personal expenses",
      "Tips"
    ],
    highlights: ["Mountain Trekking", "Adventure Sports", "Scenic Views", "Professional Guides"]
  },
  8: {
    id: 8,
    name: "Ladakh Motorcycle Expedition",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop",
    description: "Epic motorcycle journey through the world's highest motorable passes and stunning landscapes.",
    duration: "10 Days, 9 Nights",
    price: "₹55,000",
    rating: 4.8,
    gallery: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571104508999-893933ded431?w=800&h=600&fit=crop"
    ],
    itinerary: [
      {
        day: 1,
        title: "Leh Arrival",
        activities: ["Fly to Leh", "Acclimatization rest", "Local market visit", "Orientation meeting"]
      },
      {
        day: 2,
        title: "Leh Exploration",
        activities: ["Leh Palace visit", "Shanti Stupa", "Bike test ride", "Gear preparation"]
      },
      {
        day: 3,
        title: "Nubra Valley",
        activities: ["Ride via Khardung La", "Camel safari at Hunder", "Camp in Nubra", "Local interactions"]
      }
    ],
    inclusions: [
      "9 nights accommodation",
      "Royal Enfield motorcycle",
      "Fuel and maintenance",
      "Professional road captain",
      "All permits and fees",
      "Support vehicle"
    ],
    exclusions: [
      "Flight tickets",
      "Personal expenses",
      "Riding gear",
      "Travel insurance"
    ],
    highlights: ["Motorcycle Tour", "High Altitude Passes", "Monasteries", "Desert Landscapes"]
  },
  9: {
    id: 9,
    name: "Andaman Island Paradise",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=800&fit=crop",
    description: "Crystal clear waters, water sports, and pristine beaches in India's tropical paradise.",
    duration: "6 Days, 5 Nights",
    price: "₹48,000",
    rating: 4.6,
    gallery: [
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&h=600&fit=crop"
    ],
    itinerary: [
      {
        day: 1,
        title: "Port Blair Arrival",
        activities: ["Airport pickup", "Hotel check-in", "Cellular Jail visit", "Light & Sound show"]
      },
      {
        day: 2,
        title: "Havelock Island",
        activities: ["Ferry to Havelock", "Radhanagar Beach", "Beach resort check-in", "Sunset viewing"]
      },
      {
        day: 3,
        title: "Water Sports Day",
        activities: ["Scuba diving", "Snorkeling", "Sea walking", "Beach relaxation"]
      },
      {
        day: 4,
        title: "Neil Island",
        activities: ["Ferry to Neil Island", "Bharatpur Beach", "Laxmanpur Beach", "Natural bridge"]
      },
      {
        day: 5,
        title: "More Adventures",
        activities: ["Parasailing", "Jet skiing", "Glass bottom boat", "Shopping"]
      },
      {
        day: 6,
        title: "Departure",
        activities: ["Return to Port Blair", "Last minute shopping", "Airport transfer", "Departure"]
      }
    ],
    inclusions: [
      "5 nights beach resort stay",
      "All inter-island transfers",
      "Water sports activities",
      "All entry fees",
      "Daily breakfast"
    ],
    exclusions: [
      "Flight tickets",
      "Lunch and dinner",
      "Personal expenses",
      "Additional activities"
    ],
    highlights: ["Scuba Diving", "Water Sports", "Beach Resorts", "Island Hopping"]
  },
  10: {
    id: 10,
    name: "Coorg Coffee Plantation Stay",
    image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5a?w=1200&h=800&fit=crop",
    description: "Misty hills, coffee plantations, and homestay experience in Scotland of India.",
    duration: "5 Days, 4 Nights",
    price: "₹32,000",
    rating: 4.5,
    gallery: [
      "https://images.unsplash.com/photo-1544966503-7cc5ac882d5a?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
    ],
    itinerary: [
      {
        day: 1,
        title: "Coorg Arrival",
        activities: ["Arrival at homestay", "Coffee plantation walk", "Traditional Coorgi lunch", "Evening leisure"]
      },
      {
        day: 2,
        title: "Abbey Falls & Culture",
        activities: ["Abbey Falls visit", "Omkareshwara Temple", "Madikeri Fort", "Local market shopping"]
      },
      {
        day: 3,
        title: "Adventure & Nature",
        activities: ["Dubare Elephant Camp", "River rafting", "Nisargadhama Island", "Tibetan monastery"]
      },
      {
        day: 4,
        title: "Coffee Experience",
        activities: ["Coffee processing tour", "Trekking in hills", "Bird watching", "Cooking class"]
      },
      {
        day: 5,
        title: "Departure",
        activities: ["Final breakfast", "Coffee shopping", "Farewell", "Departure"]
      }
    ],
    inclusions: [
      "4 nights plantation homestay",
      "All meals included",
      "Plantation tours",
      "Cultural activities",
      "Local transportation"
    ],
    exclusions: [
      "Personal expenses",
      "Shopping",
      "Tips",
      "Travel insurance"
    ],
    highlights: ["Coffee Plantation", "Homestay", "Nature Walks", "Local Culture"]
  },
  11: {
    id: 11,
    name: "Rajasthan Royal Heritage",
    image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73dad?w=1200&h=800&fit=crop",
    description: "Step into royalty with magnificent palaces, desert safaris, and rich cultural experiences.",
    duration: "8 Days, 7 Nights",
    price: "₹95,000",
    rating: 4.8,
    gallery: [
      "https://images.unsplash.com/photo-1539650116574-75c0c6d73dad?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&h=600&fit=crop"
    ],
    itinerary: [
      {
        day: 1,
        title: "Jaipur Arrival",
        activities: ["Airport pickup", "Palace hotel check-in", "City Palace visit", "Evening cultural show"]
      },
      {
        day: 2,
        title: "Pink City Exploration",
        activities: ["Amber Fort", "Hawa Mahal", "Jantar Mantar", "Traditional shopping"]
      },
      {
        day: 3,
        title: "Udaipur - City of Lakes",
        activities: ["Drive to Udaipur", "Lake Palace visit", "Sunset boat ride", "Lakeside dinner"]
      },
      {
        day: 4,
        title: "Udaipur Palaces",
        activities: ["City Palace complex", "Jagdish Temple", "Saheliyon ki Bari", "Cultural evening"]
      },
      {
        day: 5,
        title: "Jodhpur - Blue City",
        activities: ["Drive to Jodhpur", "Mehrangarh Fort", "Blue city walk", "Royal dinner"]
      },
      {
        day: 6,
        title: "Desert Experience",
        activities: ["Drive to Jaisalmer", "Golden Fort", "Desert safari", "Camp under stars"]
      },
      {
        day: 7,
        title: "Golden City",
        activities: ["Jaisalmer Fort", "Patwon ki Haveli", "Sunset at dunes", "Cultural programs"]
      },
      {
        day: 8,
        title: "Departure",
        activities: ["Shopping for handicrafts", "Airport transfer", "Departure"]
      }
    ],
    inclusions: [
      "7 nights luxury palace hotels",
      "All meals included",
      "Private AC transport",
      "Professional guide",
      "All entry fees",
      "Cultural shows",
      "Desert safari"
    ],
    exclusions: [
      "Flight tickets",
      "Personal expenses",
      "Shopping",
      "Tips"
    ],
    highlights: ["Palace Hotels", "Desert Safari", "Cultural Shows", "Royal Heritage"]
  },
  12: {
    id: 12,
    name: "Luxury Kashmir Houseboat",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop",
    description: "Luxury houseboat stay on Dal Lake with helicopter rides and premium experiences.",
    duration: "6 Days, 5 Nights",
    price: "₹85,000",
    rating: 4.9,
    gallery: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571104508999-893933ded431?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop"
    ],
    itinerary: [
      {
        day: 1,
        title: "Srinagar Arrival",
        activities: ["Airport pickup", "Luxury houseboat check-in", "Dal Lake shikara ride", "Mughal gardens"]
      },
      {
        day: 2,
        title: "Gulmarg Excursion",
        activities: ["Drive to Gulmarg", "Gondola cable car", "Alpine skiing", "Return to houseboat"]
      },
      {
        day: 3,
        title: "Pahalgam Adventure",
        activities: ["Helicopter ride to Pahalgam", "Betaab Valley", "Aru Valley", "Return by road"]
      },
      {
        day: 4,
        title: "Local Experiences",
        activities: ["Carpet weaving visit", "Saffron fields", "Traditional cooking", "Evening cultural show"]
      },
      {
        day: 5,
        title: "Leisure & Shopping",
        activities: ["Floating market", "Handicraft shopping", "Spa treatments", "Farewell dinner"]
      },
      {
        day: 6,
        title: "Departure",
        activities: ["Final shikara ride", "Last minute shopping", "Airport transfer", "Departure"]
      }
    ],
    inclusions: [
      "5 nights luxury houseboat",
      "All meals included",
      "Helicopter ride",
      "All transfers",
      "Professional guide",
      "Cultural programs"
    ],
    exclusions: [
      "Flight tickets",
      "Personal expenses",
      "Shopping",
      "Tips"
    ],
    highlights: ["Luxury Houseboat", "Helicopter Ride", "Shikara Cruise", "Alpine Views"]
  },
  13: {
    id: 13,
    name: "Goa Luxury Beach Resort",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&h=800&fit=crop",
    description: "5-star beach resort experience with private beach access and world-class amenities.",
    duration: "7 Days, 6 Nights",
    price: "₹75,000",
    rating: 4.7,
    gallery: [
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&h=600&fit=crop"
    ],
    itinerary: [
      {
        day: 1,
        title: "Luxury Arrival",
        activities: ["Airport pickup in luxury car", "5-star resort check-in", "Welcome drink", "Beach sunset"]
      },
      {
        day: 2,
        title: "Beach & Spa",
        activities: ["Private beach time", "Full body spa", "Water sports", "Beachside dinner"]
      },
      {
        day: 3,
        title: "Cultural Exploration",
        activities: ["Old Goa heritage tour", "Spice plantation lunch", "Portuguese quarter", "Wine tasting"]
      },
      {
        day: 4,
        title: "Adventure Day",
        activities: ["Yacht charter", "Deep sea fishing", "Dolphin watching", "Sunset cruise"]
      },
      {
        day: 5,
        title: "Relaxation",
        activities: ["Resort pool time", "Ayurvedic treatments", "Golf course", "Fine dining"]
      },
      {
        day: 6,
        title: "Final Exploration",
        activities: ["Dudhsagar Falls", "Spice shopping", "Resort amenities", "Farewell party"]
      },
      {
        day: 7,
        title: "Departure",
        activities: ["Late checkout", "Final relaxation", "Airport transfer", "Departure"]
      }
    ],
    inclusions: [
      "6 nights 5-star beach resort",
      "All meals included",
      "Luxury transportation",
      "Spa treatments",
      "Private yacht charter",
      "All activities"
    ],
    exclusions: [
      "Flight tickets",
      "Personal expenses",
      "Alcoholic beverages",
      "Shopping"
    ],
    highlights: ["5-Star Resort", "Private Beach", "Spa Treatments", "Luxury Dining"]
  },
  14: {
    id: 14,
    name: "Golden Triangle Luxury",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1200&h=800&fit=crop",
    description: "Luxury tour of Delhi, Agra, and Jaipur with heritage hotels and private guides.",
    duration: "7 Days, 6 Nights",
    price: "₹90,000",
    rating: 4.8,
    gallery: [
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1539650116574-75c0c6d73dad?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&h=600&fit=crop"
    ],
    itinerary: [
      {
        day: 1,
        title: "Delhi Heritage",
        activities: ["Luxury hotel check-in", "Red Fort", "Jama Masjid", "Chandni Chowk rickshaw"]
      },
      {
        day: 2,
        title: "Modern Delhi",
        activities: ["India Gate", "Lotus Temple", "Qutub Minar", "Fine dining experience"]
      },
      {
        day: 3,
        title: "Agra Majesty",
        activities: ["Private car to Agra", "Taj Mahal sunrise", "Agra Fort", "Heritage hotel"]
      },
      {
        day: 4,
        title: "Agra to Jaipur",
        activities: ["Fatehpur Sikri", "Drive to Jaipur", "Palace hotel check-in", "Welcome dinner"]
      },
      {
        day: 5,
        title: "Pink City Royalty",
        activities: ["Amber Fort elephant ride", "City Palace", "Hawa Mahal", "Royal dinner"]
      },
      {
        day: 6,
        title: "Jaipur Culture",
        activities: ["Block printing workshop", "Gem cutting", "Jantar Mantar", "Cultural show"]
      },
      {
        day: 7,
        title: "Departure",
        activities: ["Shopping at Johari Bazaar", "Airport transfer", "Departure"]
      }
    ],
    inclusions: [
      "6 nights heritage luxury hotels",
      "All meals included",
      "Private luxury transport",
      "Professional guide",
      "All entry fees",
      "Cultural experiences"
    ],
    exclusions: [
      "Flight tickets",
      "Personal expenses",
      "Shopping",
      "Tips"
    ],
    highlights: ["Heritage Hotels", "Private Guide", "Luxury Transport", "Cultural Immersion"]
  },
  15: {
    id: 15,
    name: "Ranthambore Wildlife Safari",
    image: "https://images.unsplash.com/photo-1549366021-9f761d040a94?w=1200&h=800&fit=crop",
    description: "Luxury wildlife experience with premium lodges and exclusive tiger safari experiences.",
    duration: "5 Days, 4 Nights",
    price: "₹65,000",
    rating: 4.6,
    gallery: [
      "https://images.unsplash.com/photo-1549366021-9f761d040a94?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1564133269493-8d1bd2e1be4e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1539650116574-75c0c6d73dad?w=800&h=600&fit=crop"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival",
        activities: ["Jaipur pickup", "Drive to Ranthambore", "Luxury lodge check-in", "Evening nature walk"]
      },
      {
        day: 2,
        title: "Tiger Safari",
        activities: ["Early morning safari", "Tiger tracking", "Photography session", "Evening safari"]
      },
      {
        day: 3,
        title: "Full Day Safari",
        activities: ["Dawn safari", "Breakfast in jungle", "Fort visit", "Sunset safari"]
      },
      {
        day: 4,
        title: "Cultural & Wildlife",
        activities: ["Village visit", "Local craft workshop", "Final safari", "Farewell dinner"]
      },
      {
        day: 5,
        title: "Departure",
        activities: ["Bird watching walk", "Check-out", "Drive to Jaipur", "Departure"]
      }
    ],
    inclusions: [
      "4 nights luxury jungle lodge",
      "All meals included",
      "6 safari drives",
      "Professional naturalist",
      "All transfers",
      "Cultural programs"
    ],
    exclusions: [
      "Personal expenses",
      "Shopping",
      "Tips",
      "Travel insurance"
    ],
    highlights: ["Tiger Safari", "Luxury Lodge", "Wildlife Photography", "Cultural Tours"]
  },
  16: {
    id: 16,
    name: "Nepal Trekking Adventure",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&h=800&fit=crop",
    description: "Budget-friendly trekking experience in the Himalayas with stunning mountain views.",
    duration: "8 Days, 7 Nights",
    price: "₹35,000",
    rating: 4.5,
    gallery: [
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571104508999-893933ded431?w=800&h=600&fit=crop"
    ],
    itinerary: [
      {
        day: 1,
        title: "Kathmandu Arrival",
        activities: ["Airport pickup", "Hotel check-in", "Durbar Square visit", "Trek preparation"]
      },
      {
        day: 2,
        title: "Trek Begins",
        activities: ["Drive to Pokhara", "Trek briefing", "Start trekking", "Mountain lodge"]
      },
      {
        day: 3,
        title: "Mountain Views",
        activities: ["Early morning trek", "Himalayan panorama", "Local village visit", "Tea house stay"]
      },
      {
        day: 4,
        title: "Higher Altitude",
        activities: ["Challenging trek", "Prayer flags", "Monastery visit", "Mountain camping"]
      },
      {
        day: 5,
        title: "Sunrise Trek",
        activities: ["Sunrise viewpoint", "Photography", "Descent begins", "Village interaction"]
      },
      {
        day: 6,
        title: "Cultural Day",
        activities: ["Local homestay", "Cultural programs", "Traditional food", "Rest day"]
      },
      {
        day: 7,
        title: "Return Journey",
        activities: ["Final trek", "Return to Pokhara", "Celebration dinner", "Rest"]
      },
      {
        day: 8,
        title: "Departure",
        activities: ["Drive to Kathmandu", "Last minute shopping", "Airport transfer", "Departure"]
      }
    ],
    inclusions: [
      "7 nights accommodation (hotels + lodges)",
      "All meals during trek",
      "Professional trek guide",
      "Trekking permits",
      "Transportation",
      "Cultural programs"
    ],
    exclusions: [
      "International flights",
      "Personal trekking gear",
      "Travel insurance",
      "Personal expenses"
    ],
    highlights: ["Himalayan Trek", "Local Homestays", "Mountain Views", "Cultural Exchange"]
  },
  // Adding remaining trips 17-30 with similar structure
  17: {
    id: 17,
    name: "Bhutan Cultural Discovery",
    image: "https://images.unsplash.com/photo-1571104508999-893933ded431?w=1200&h=800&fit=crop",
    description: "Explore the Last Shangri-La with monasteries, festivals, and pristine culture.",
    duration: "6 Days, 5 Nights",
    price: "₹45,000",
    rating: 4.7,
    gallery: [
      "https://images.unsplash.com/photo-1571104508999-893933ded431?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
    ],
    itinerary: [
      { day: 1, title: "Thimphu Arrival", activities: ["Airport pickup", "Hotel check-in", "Thimphu exploration", "Traditional dinner"] },
      { day: 2, title: "Monastery Tours", activities: ["Tiger's Nest monastery", "Paro valley", "Cultural sites", "Local crafts"] },
      { day: 3, title: "Cultural Immersion", activities: ["Traditional festival", "Local village visit", "Handicraft workshop", "Cultural show"] },
      { day: 4, title: "Nature & Spirituality", activities: ["Mountain hiking", "Meditation session", "Scenic drives", "Prayer flags"] },
      { day: 5, title: "Market & Shopping", activities: ["Weekend market", "Souvenir shopping", "Traditional lunch", "City tour"] },
      { day: 6, title: "Departure", activities: ["Final temple visit", "Airport transfer", "Departure"] }
    ],
    inclusions: ["5 nights accommodation", "All meals", "Professional guide", "All transfers", "Entry fees", "Cultural programs"],
    exclusions: ["International flights", "Personal expenses", "Tips", "Shopping"],
    highlights: ["Monasteries", "Cultural Tours", "Traditional Festivals", "Pristine Nature"]
  },
  18: {
    id: 18,
    name: "Sri Lanka Beach & Culture",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=800&fit=crop",
    description: "Beaches, ancient temples, and tea plantations in the pearl of the Indian Ocean.",
    duration: "7 Days, 6 Nights",
    price: "₹42,000",
    rating: 4.4,
    gallery: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop"
    ],
    itinerary: [
      { day: 1, title: "Colombo Arrival", activities: ["Airport pickup", "City tour", "Hotel check-in", "Welcome dinner"] },
      { day: 2, title: "Cultural Triangle", activities: ["Sigiriya Rock", "Ancient ruins", "Museum visit", "Traditional lunch"] },
      { day: 3, title: "Kandy Experience", activities: ["Temple of Tooth", "Cultural dance", "Royal gardens", "Tea factory"] },
      { day: 4, title: "Tea Country", activities: ["Nuwara Eliya", "Tea plantations", "Train journey", "Colonial heritage"] },
      { day: 5, title: "Beach Time", activities: ["Bentota beach", "Water sports", "Turtle hatchery", "Sunset cruise"] },
      { day: 6, title: "Wildlife Safari", activities: ["National park", "Elephant safari", "Bird watching", "Nature walk"] },
      { day: 7, title: "Departure", activities: ["Beach relaxation", "Shopping", "Airport transfer", "Departure"] }
    ],
    inclusions: ["6 nights accommodation", "Daily breakfast", "Cultural tours", "Train journey", "Safari", "All transfers"],
    exclusions: ["International flights", "Lunch and dinner", "Personal expenses", "Tips"],
    highlights: ["Beach Time", "Ancient Temples", "Tea Plantations", "Wildlife Safari"]
  },
  19: {
    id: 19,
    name: "Thailand Island Hopping",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop",
    description: "Explore multiple stunning Thai islands with crystal clear waters and vibrant marine life.",
    duration: "7 Days, 6 Nights",
    price: "₹55,000",
    rating: 4.6,
    gallery: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&h=600&fit=crop"
    ],
    itinerary: [
      { day: 1, title: "Bangkok Arrival", activities: ["Airport pickup", "Hotel check-in", "Temple tour", "Street food"] },
      { day: 2, title: "Koh Phi Phi", activities: ["Ferry to islands", "Maya Bay", "Snorkeling", "Beach resort"] },
      { day: 3, title: "Island Adventures", activities: ["Boat tours", "Scuba diving", "Beach relaxation", "Sunset viewing"] },
      { day: 4, title: "Phuket Experience", activities: ["Patong Beach", "Water sports", "Thai massage", "Night markets"] },
      { day: 5, title: "Cultural Tours", activities: ["Big Buddha", "Wat Chalong", "Old town", "Thai cooking class"] },
      { day: 6, title: "Final Islands", activities: ["James Bond Island", "Sea canoeing", "Floating village", "Farewell dinner"] },
      { day: 7, title: "Departure", activities: ["Beach time", "Shopping", "Airport transfer", "Departure"] }
    ],
    inclusions: ["6 nights accommodation", "Inter-island transfers", "Boat tours", "Snorkeling gear", "Cultural tours", "Daily breakfast"],
    exclusions: ["International flights", "Some meals", "Personal expenses", "Additional activities"],
    highlights: ["Island Hopping", "Snorkeling", "Beach Activities", "Thai Culture"]
  },
  20: {
    id: 20,
    name: "Vietnam Cultural Journey",
    image: "https://images.unsplash.com/photo-1559592413-7cec4d0d1eec?w=1200&h=800&fit=crop",
    description: "From bustling Ho Chi Minh to serene Halong Bay, experience Vietnam's rich culture and cuisine.",
    duration: "8 Days, 7 Nights",
    price: "₹52,000",
    rating: 4.7,
    gallery: [
      "https://images.unsplash.com/photo-1559592413-7cec4d0d1eec?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop"
    ],
    itinerary: [
      { day: 1, title: "Ho Chi Minh City", activities: ["Airport pickup", "City tour", "War museum", "Ben Thanh market"] },
      { day: 2, title: "Cu Chi Tunnels", activities: ["Underground tunnels", "Historical tour", "Local lunch", "City return"] },
      { day: 3, title: "Hanoi Journey", activities: ["Flight to Hanoi", "Old Quarter", "Hoan Kiem Lake", "Street food tour"] },
      { day: 4, title: "Halong Bay Cruise", activities: ["Bay cruise", "Limestone karsts", "Cave exploration", "Onboard stay"] },
      { day: 5, title: "Bay Activities", activities: ["Kayaking", "Floating village", "Cooking class", "Sunset viewing"] },
      { day: 6, title: "Hanoi Culture", activities: ["Temple of Literature", "Water puppet show", "French Quarter", "Local markets"] },
      { day: 7, title: "Rural Experience", activities: ["Countryside tour", "Rice paddies", "Village lunch", "Traditional crafts"] },
      { day: 8, title: "Departure", activities: ["Final shopping", "Coffee tasting", "Airport transfer", "Departure"] }
    ],
    inclusions: ["7 nights accommodation", "Domestic flights", "Halong Bay cruise", "All tours", "Professional guide", "Most meals"],
    exclusions: ["International flights", "Some meals", "Personal expenses", "Tips"],
    highlights: ["Halong Bay Cruise", "Street Food Tours", "Cu Chi Tunnels", "Cultural Heritage"]
  },
  21: {
    id: 21,
    name: "Malaysia Twin Towers & Beaches",
    image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=1200&h=800&fit=crop",
    description: "Modern Kuala Lumpur cityscape combined with beautiful island beaches and cultural diversity.",
    duration: "6 Days, 5 Nights",
    price: "₹48,000",
    rating: 4.5,
    gallery: [
      "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&h=600&fit=crop"
    ],
    itinerary: [
      { day: 1, title: "KL Arrival", activities: ["Airport pickup", "Petronas Towers", "KLCC Park", "City center tour"] },
      { day: 2, title: "Cultural Malaysia", activities: ["Batu Caves", "Chinatown", "Little India", "Central Market"] },
      { day: 3, title: "Langkawi Island", activities: ["Flight to Langkawi", "Cable car ride", "Duty-free shopping", "Beach resort"] },
      { day: 4, title: "Island Adventures", activities: ["Island hopping", "Eagle watching", "Mangrove tour", "Beach activities"] },
      { day: 5, title: "Beach Relaxation", activities: ["Water sports", "Spa treatments", "Sunset cruise", "Beach dining"] },
      { day: 6, title: "Departure", activities: ["Return to KL", "Last minute shopping", "Airport transfer", "Departure"] }
    ],
    inclusions: ["5 nights accommodation", "Domestic flights", "City tours", "Island activities", "Cable car tickets", "Daily breakfast"],
    exclusions: ["International flights", "Lunch and dinner", "Personal expenses", "Shopping"],
    highlights: ["Petronas Towers", "Island Beaches", "Cultural Districts", "Modern City"]
  },
  22: {
    id: 22,
    name: "Cambodia Angkor Wat Explorer",
    image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73dad?w=1200&h=800&fit=crop",
    description: "Ancient temples, rich history, and cultural immersion in the heart of Southeast Asia.",
    duration: "5 Days, 4 Nights",
    price: "₹44,000",
    rating: 4.6,
    gallery: [
      "https://images.unsplash.com/photo-1539650116574-75c0c6d73dad?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&h=600&fit=crop"
    ],
    itinerary: [
      { day: 1, title: "Siem Reap Arrival", activities: ["Airport pickup", "Hotel check-in", "Pub Street exploration", "Traditional dinner"] },
      { day: 2, title: "Angkor Wat Sunrise", activities: ["Early sunrise tour", "Angkor Wat exploration", "Angkor Thom", "Bayon Temple"] },
      { day: 3, title: "Temple Complex", activities: ["Ta Prohm temple", "Banteay Srei", "Photography tour", "Local village visit"] },
      { day: 4, title: "Floating Village", activities: ["Tonle Sap Lake", "Floating village tour", "Traditional crafts", "Cultural show"] },
      { day: 5, title: "Departure", activities: ["Final temple visit", "Souvenir shopping", "Airport transfer", "Departure"] }
    ],
    inclusions: ["4 nights accommodation", "All temple passes", "Professional guide", "Cultural tours", "Boat trip", "Daily breakfast"],
    exclusions: ["International flights", "Lunch and dinner", "Personal expenses", "Tips"],
    highlights: ["Angkor Wat", "Temple Complexes", "Floating Villages", "Ancient History"]
  },
  23: {
    id: 23,
    name: "Dubai Desert & City",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&h=800&fit=crop",
    description: "Futuristic cityscape, luxury shopping, and thrilling desert safari adventures.",
    duration: "5 Days, 4 Nights",
    price: "₹58,000",
    rating: 4.7,
    gallery: [
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
    ],
    itinerary: [
      { day: 1, title: "Dubai Arrival", activities: ["Airport pickup", "Burj Khalifa visit", "Dubai Mall", "Fountain show"] },
      { day: 2, title: "Desert Safari", activities: ["Dune bashing", "Camel riding", "Desert camp", "BBQ dinner"] },
      { day: 3, title: "Modern Dubai", activities: ["Dubai Marina", "Atlantis Palm", "Gold Souk", "Spice Souk"] },
      { day: 4, title: "Cultural Dubai", activities: ["Dubai Museum", "Abra boat ride", "Jumeirah Mosque", "Beach time"] },
      { day: 5, title: "Departure", activities: ["Shopping at Mall of Emirates", "Last minute sightseeing", "Airport transfer", "Departure"] }
    ],
    inclusions: ["4 nights luxury hotel", "Desert safari with dinner", "City tours", "Burj Khalifa tickets", "Airport transfers", "Daily breakfast"],
    exclusions: ["International flights", "Lunch and dinner (except desert safari)", "Personal expenses", "Shopping"],
    highlights: ["Burj Khalifa", "Desert Safari", "Dubai Mall", "Luxury Shopping"]
  },
  24: {
    id: 24,
    name: "Bali Tropical Getaway",
    image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=1200&h=800&fit=crop",
    description: "Discover the magic of Bali with stunning temples, rice terraces, and pristine beaches.",
    duration: "6 Days, 5 Nights",
    price: "₹85,000",
    rating: 4.9,
    gallery: [
      "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&h=600&fit=crop"
    ],
    itinerary: [
      { day: 1, title: "Bali Arrival", activities: ["Airport pickup", "Seminyak beach", "Sunset dinner", "Beach club"] },
      { day: 2, title: "Temple Tour", activities: ["Tanah Lot temple", "Ulun Danu temple", "Traditional lunch", "Rice terraces"] },
      { day: 3, title: "Ubud Culture", activities: ["Monkey forest", "Art markets", "Cooking class", "Traditional spa"] },
      { day: 4, title: "Adventure Day", activities: ["White water rafting", "Volcano hiking", "Hot springs", "Traditional village"] },
      { day: 5, title: "Beach Relaxation", activities: ["Nusa Dua beach", "Water sports", "Luxury spa", "Seafood dinner"] },
      { day: 6, title: "Departure", activities: ["Souvenir shopping", "Final temple visit", "Airport transfer", "Departure"] }
    ],
    inclusions: ["5 nights luxury resort", "All transfers", "Temple tours", "Cultural activities", "Adventure sports", "Spa treatments"],
    exclusions: ["International flights", "Some meals", "Personal expenses", "Shopping"],
    highlights: ["Temple Tours", "Rice Terraces", "Beach Resorts", "Luxury Spas"]
  },
  25: {
    id: 25,
    name: "Maldives Overwater Villas",
    image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1200&h=800&fit=crop",
    description: "Ultimate luxury in overwater villas with world-class diving and pristine coral reefs.",
    duration: "7 Days, 6 Nights",
    price: "₹150,000",
    rating: 4.9,
    gallery: [
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&h=600&fit=crop"
    ],
    itinerary: [
      { day: 1, title: "Arrival in Paradise", activities: ["Seaplane transfer", "Villa check-in", "Sunset cruise", "Welcome dinner"] },
      { day: 2, title: "Ocean Adventures", activities: ["Scuba diving", "Dolphin watching", "Snorkeling", "Underwater restaurant"] },
      { day: 3, title: "Spa & Relaxation", activities: ["Overwater spa", "Private beach", "Yoga session", "Romantic dinner"] },
      { day: 4, title: "Water Sports", activities: ["Jet skiing", "Parasailing", "Deep sea fishing", "Sandbank picnic"] },
      { day: 5, title: "Cultural Experience", activities: ["Local island visit", "Cultural tour", "Traditional crafts", "Local cuisine"] },
      { day: 6, title: "Final Paradise", activities: ["Sunrise yoga", "Final spa", "Photography", "Farewell cocktails"] },
      { day: 7, title: "Departure", activities: ["Villa check-out", "Seaplane to airport", "Departure"] }
    ],
    inclusions: ["6 nights overwater villa", "All meals included", "Seaplane transfers", "Water sports", "Spa treatments", "Excursions"],
    exclusions: ["International flights", "Personal expenses", "Premium alcohol", "Additional spa treatments"],
    highlights: ["Overwater Villas", "Scuba Diving", "Spa Treatments", "Luxury Resort"]
  },
  26: {
    id: 26,
    name: "Switzerland Alpine Luxury",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop",
    description: "Luxury mountain resorts, scenic train journeys, and pristine Alpine landscapes.",
    duration: "8 Days, 7 Nights",
    price: "₹180,000",
    rating: 4.8,
    gallery: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571104508999-893933ded431?w=800&h=600&fit=crop"
    ],
    itinerary: [
      { day: 1, title: "Zurich Arrival", activities: ["Airport pickup", "Luxury hotel check-in", "Lake Zurich cruise", "Fine dining"] },
      { day: 2, title: "Lucerne Experience", activities: ["Scenic train to Lucerne", "Mount Pilatus cable car", "Chapel Bridge", "Traditional dinner"] },
      { day: 3, title: "Interlaken Adventure", activities: ["Jungfraujoch excursion", "Top of Europe", "Glacier experience", "Alpine lunch"] },
      { day: 4, title: "Matterhorn Magic", activities: ["Train to Zermatt", "Matterhorn views", "Gornergrat railway", "Mountain hotel"] },
      { day: 5, title: "Glacier Express", activities: ["Scenic train journey", "St. Moritz arrival", "Luxury resort", "Alpine spa"] },
      { day: 6, title: "Mountain Activities", activities: ["Cable car rides", "Alpine hiking", "Crystal shopping", "Gourmet dining"] },
      { day: 7, title: "Geneva Culture", activities: ["Train to Geneva", "Lake Geneva", "Jet d'Eau", "Swiss chocolate tour"] },
      { day: 8, title: "Departure", activities: ["Final shopping", "Watch museum", "Airport transfer", "Departure"] }
    ],
    inclusions: ["7 nights luxury hotels", "All train journeys", "Cable car tickets", "Professional guide", "Most meals", "Swiss Pass"],
    exclusions: ["International flights", "Some meals", "Personal expenses", "Shopping"],
    highlights: ["Luxury Resorts", "Scenic Trains", "Alpine Views", "Winter Sports"]
  },
  27: {
    id: 27,
    name: "Japan Cultural Immersion",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200&h=800&fit=crop",
    description: "Traditional ryokans, cherry blossoms, and authentic cultural experiences in Japan.",
    duration: "10 Days, 9 Nights",
    price: "₹160,000",
    rating: 4.9,
    gallery: [
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571104508999-893933ded431?w=800&h=600&fit=crop"
    ],
    itinerary: [
      { day: 1, title: "Tokyo Arrival", activities: ["Airport pickup", "Shibuya crossing", "Robot restaurant", "Traditional dinner"] },
      { day: 2, title: "Tokyo Culture", activities: ["Senso-ji temple", "Imperial Palace", "Tsukiji market", "Kabuki show"] },
      { day: 3, title: "Modern Tokyo", activities: ["Harajuku district", "Tokyo Skytree", "Anime culture", "Technology tour"] },
      { day: 4, title: "Mount Fuji", activities: ["Day trip to Fuji", "Lake Kawaguchi", "Hakone hot springs", "Ryokan stay"] },
      { day: 5, title: "Kyoto Journey", activities: ["Bullet train to Kyoto", "Fushimi Inari shrine", "Geisha district", "Tea ceremony"] },
      { day: 6, title: "Kyoto Temples", activities: ["Golden Pavilion", "Bamboo grove", "Zen garden", "Traditional crafts"] },
      { day: 7, title: "Nara Day Trip", activities: ["Todai-ji temple", "Deer park", "Traditional lunch", "Return to Kyoto"] },
      { day: 8, title: "Osaka Experience", activities: ["Train to Osaka", "Osaka Castle", "Dotonbori district", "Street food tour"] },
      { day: 9, title: "Final Culture", activities: ["Pottery workshop", "Sake tasting", "Final shopping", "Farewell dinner"] },
      { day: 10, title: "Departure", activities: ["Final temple visit", "Souvenir shopping", "Airport transfer", "Departure"] }
    ],
    inclusions: ["9 nights accommodation (hotels + ryokan)", "All train passes", "Cultural experiences", "Temple visits", "Traditional meals", "Professional guide"],
    exclusions: ["International flights", "Some meals", "Personal expenses", "Shopping"],
    highlights: ["Traditional Ryokans", "Temple Visits", "Bullet Train", "Cherry Blossoms"]
  },
  28: {
    id: 28,
    name: "European Grand Tour",
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1200&h=800&fit=crop",
    description: "Luxury multi-city European experience covering Paris, Rome, and Barcelona.",
    duration: "12 Days, 11 Nights",
    price: "₹200,000",
    rating: 4.8,
    gallery: [
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1539650116574-75c0c6d73dad?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&h=600&fit=crop"
    ],
    itinerary: [
      { day: 1, title: "Paris Arrival", activities: ["Airport pickup", "Eiffel Tower", "Seine cruise", "Luxury hotel"] },
      { day: 2, title: "Paris Culture", activities: ["Louvre Museum", "Notre Dame", "Champs Elysees", "Fine dining"] },
      { day: 3, title: "Versailles Day", activities: ["Palace of Versailles", "Gardens tour", "Marie Antoinette estate", "Royal lunch"] },
      { day: 4, title: "Paris to Rome", activities: ["High-speed train", "Rome arrival", "Colosseum visit", "Italian dinner"] },
      { day: 5, title: "Ancient Rome", activities: ["Roman Forum", "Palatine Hill", "Pantheon", "Vatican preparation"] },
      { day: 6, title: "Vatican City", activities: ["Sistine Chapel", "St. Peter's Basilica", "Vatican Museums", "Papal audience"] },
      { day: 7, title: "Rome Culture", activities: ["Trevi Fountain", "Spanish Steps", "Roman markets", "Cooking class"] },
      { day: 8, title: "Rome to Barcelona", activities: ["Flight to Barcelona", "Park Guell", "Sagrada Familia", "Tapas tour"] },
      { day: 9, title: "Barcelona Architecture", activities: ["Casa Batllo", "Gothic Quarter", "Las Ramblas", "Flamenco show"] },
      { day: 10, title: "Beach & Culture", activities: ["Barceloneta beach", "Picasso Museum", "Modernist tour", "Gaudi trail"] },
      { day: 11, title: "Final Barcelona", activities: ["Montjuic Hill", "Olympic venues", "Final shopping", "Farewell dinner"] },
      { day: 12, title: "Departure", activities: ["Final sightseeing", "Souvenir shopping", "Airport transfer", "Departure"] }
    ],
    inclusions: ["11 nights luxury hotels", "High-speed trains", "Flights", "Private guides", "Skip-the-line tickets", "Cultural experiences"],
    exclusions: ["International flights", "Some meals", "Personal expenses", "Shopping"],
    highlights: ["Luxury Hotels", "Private Tours", "First-class Transport", "European Culture"]
  },
  29: {
    id: 29,
    name: "Manali Adventure Sports",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop",
    description: "Paragliding, river rafting, and mountain biking in the adventure hub of Himachal.",
    duration: "4 Days, 3 Nights",
    price: "₹20,000",
    rating: 4.6,
    gallery: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop"
    ],
    itinerary: [
      { day: 1, title: "Manali Arrival", activities: ["Arrival and check-in", "Local sightseeing", "Adventure briefing", "Equipment fitting"] },
      { day: 2, title: "Sky Adventures", activities: ["Paragliding session", "Valley views", "Lunch break", "Mountain biking"] },
      { day: 3, title: "Water Sports", activities: ["River rafting", "Rapids navigation", "Riverside lunch", "Rock climbing"] },
      { day: 4, title: "Final Adventure", activities: ["Trekking expedition", "Nature photography", "Adventure recap", "Departure"] }
    ],
    inclusions: ["3 nights mountain lodge", "All adventure activities", "Safety equipment", "Professional instructors", "All meals"],
    exclusions: ["Transportation to Manali", "Personal expenses", "Insurance", "Tips"],
    highlights: ["Paragliding", "River Rafting", "Mountain Biking", "Adventure Sports"]
  },
  30: {
    id: 30,
    name: "Spiti Valley Expedition",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop",
    description: "Remote Himalayan valley with ancient monasteries and stunning landscapes.",
    duration: "9 Days, 8 Nights",
    price: "₹50,000",
    rating: 4.7,
    gallery: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571104508999-893933ded431?w=800&h=600&fit=crop"
    ],
    itinerary: [
      { day: 1, title: "Journey Begins", activities: ["Drive from Delhi", "Shimla overnight", "Mountain preparation", "Equipment check"] },
      { day: 2, title: "High Altitude", activities: ["Drive to Kalpa", "Kinnaur valley", "Apple orchards", "Acclimatization"] },
      { day: 3, title: "Spiti Entry", activities: ["Drive to Tabo", "Ancient monastery", "Valley views", "Local homestay"] },
      { day: 4, title: "Key Monastery", activities: ["Key Gompa visit", "Spiti River", "Cultural interaction", "Photography"] },
      { day: 5, title: "Highest Village", activities: ["Komic village", "Highest post office", "Chicham bridge", "Local culture"] },
      { day: 6, title: "Desert Mountains", activities: ["Chandratal Lake", "High altitude camping", "Stargazing", "Wilderness experience"] },
      { day: 7, title: "Ancient Culture", activities: ["Dhankar monastery", "Pin Valley", "Wildlife spotting", "Traditional meals"] },
      { day: 8, title: "Return Journey", activities: ["Drive towards Shimla", "Valley descent", "Rest stop", "Journey reflection"] },
      { day: 9, title: "Departure", activities: ["Return to Delhi", "Final breakfast", "Trip conclusion", "Departure"] }
    ],
    inclusions: ["8 nights accommodation (hotels + camps)", "All transportation", "Professional guide", "Monastery fees", "Most meals", "Camping equipment"],
    exclusions: ["Personal expenses", "Some meals", "Tips", "Travel insurance"],
    highlights: ["Ancient Monasteries", "High Altitude Desert", "Stargazing", "Remote Adventure"]
  }
};

const TripDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState<any>(null);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const tripId = parseInt(id || '1');
    const tripData = tripDetails[tripId as keyof typeof tripDetails];
    if (tripData) {
      setTrip(tripData);
    } else {
      // Fallback to first trip if ID not found
      setTrip(tripDetails[1]);
    }
  }, [id]);

  if (!trip) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center hover:bg-accent"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Results
        </Button>
        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative h-80 lg:h-96 overflow-hidden rounded-xl">
              <img
                src={trip.gallery[activeImage]}
                alt={trip.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center">
                <Star className="w-4 h-4 text-yellow-500 mr-1" />
                <span className="font-semibold">{trip.rating}</span>
              </div>
            </div>
            
            {trip.gallery.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {trip.gallery.map((image: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      activeImage === index ? 'border-primary' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${trip.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Trip Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold mb-4">{trip.name}</h1>
              <p className="text-lg text-muted-foreground mb-4">{trip.description}</p>
              
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center text-muted-foreground">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>{trip.duration}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Users className="w-5 h-5 mr-2" />
                  <span>All group sizes</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>Multiple locations</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {trip.highlights.map((highlight: string, index: number) => (
                  <Badge key={index} variant="secondary">
                    {highlight}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="bg-primary/10 rounded-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-3xl font-bold text-primary">{trip.price}</span>
                <span className="text-muted-foreground">per person</span>
              </div>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="cta" size="lg" className="w-full text-lg py-4">
                    I'm Interested – Book This Trip
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Express Your Interest</DialogTitle>
                  </DialogHeader>
                  <BookingForm tripName={trip.name} />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        {/* Detailed Information */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Itinerary */}
          <Card className="shadow-[var(--card-shadow)]">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-3 text-primary" size={24} />
                Day-by-Day Itinerary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {trip.itinerary.map((day: any, index: number) => (
                  <div key={day.day} className="relative">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold mr-4">
                        {day.day}
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-semibold text-lg mb-2">{day.title}</h3>
                        <ul className="space-y-1">
                          {day.activities.map((activity: string, actIndex: number) => (
                            <li key={actIndex} className="flex items-center text-muted-foreground">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                              {activity}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    {index < trip.itinerary.length - 1 && (
                      <div className="absolute left-4 top-8 w-px h-8 bg-border" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Inclusions & Exclusions */}
          <div className="space-y-6">
            <Card className="shadow-[var(--card-shadow)]">
              <CardHeader>
                <CardTitle className="flex items-center text-green-600">
                  <Check className="mr-3" size={24} />
                  What's Included
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {trip.inclusions.map((item: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-[var(--card-shadow)]">
              <CardHeader>
                <CardTitle className="flex items-center text-red-600">
                  <X className="mr-3" size={24} />
                  What's Not Included
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {trip.exclusions.map((item: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <X className="w-4 h-4 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center bg-gradient-to-r from-primary/10 to-secondary/20 rounded-xl p-8">
          <h3 className="text-2xl font-bold mb-4">Ready for This Adventure?</h3>
          <p className="text-muted-foreground mb-6">
            Express your interest and we'll get back to you with more details
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="cta" size="lg" className="px-12 py-4 text-lg">
                <Camera className="mr-3" size={20} />
                Book This Experience
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Express Your Interest</DialogTitle>
              </DialogHeader>
              <BookingForm tripName={trip.name} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default TripDetails;
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Testimonials from "@/components/Testimonials";
import PricingSection from "@/components/PricingSection";
import FAQ from "@/components/FAQ";
import { 
  Compass, 
  MapPin, 
  Heart, 
  Camera, 
  Star, 
  Shield, 
  Clock, 
  Users,
  Sparkles,
  Globe,
  Mountain,
  Plane,
  ArrowRight,
  Facebook,
  Instagram,
  X,
  Twitter
} from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: MapPin,
      title: "Handpicked Destinations",
      description: "Carefully curated locations that offer authentic and unforgettable experiences",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Heart,
      title: "Personalized Matching",
      description: "Smart algorithms that understand your preferences and budget to find perfect trips",
      gradient: "from-pink-500 to-rose-500"
    },
    {
      icon: Shield,
      title: "Trusted & Secure",
      description: "Fully insured trips with 24/7 support and transparent pricing",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Camera,
      title: "Memory-Making Experiences",
      description: "Unique activities and moments designed to create lasting memories",
      gradient: "from-purple-500 to-violet-500"
    },
    {
      icon: Clock,
      title: "Quick & Easy Planning",
      description: "From discovery to booking in just a few clicks - no lengthy forms",
      gradient: "from-orange-500 to-amber-500"
    },
    {
      icon: Users,
      title: "Expert Guidance",
      description: "Professional travel experts to assist you throughout your journey",
      gradient: "from-indigo-500 to-blue-500"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Happy Travelers" },
    { number: "150+", label: "Destinations" },
    { number: "4.5/5", label: "Average Rating" },
    { number: "24/7", label: "Support Available" }
  ];

  const destinations = [
    {
      name: "Incredible India",
      image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&h=300&fit=crop",
      trips: "50+ trips",
      price: "From ₹15,000"
    },
    {
      name: "Southeast Asia",
      image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400&h=300&fit=crop",
      trips: "25+ trips",
      price: "From ₹45,000"
    },
    {
      name: "European Escapes",
      image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&h=300&fit=crop",
      trips: "30+ trips",
      price: "From ₹85,000"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation/>

      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/80 to-black/80" />
        </div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm animate-float" />
          <div className="absolute top-40 right-20 w-16 h-16 rounded-full bg-primary/30 backdrop-blur-sm animate-float [animation-delay:2s]" />
          <div className="absolute bottom-40 left-20 w-12 h-12 rounded-full bg-emerald-400/20 backdrop-blur-sm animate-float [animation-delay:4s]" />
        </div>
        
        <div className="relative z-10 text-center px-2 max-w-5xl mx-auto">
          
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in">
            Discover the perfect trip -{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-green-400 bg-clip-text text-transparent">
              tailored just for you
            </span>
          </h1>
          
          <p className="text-lg md:text-md text-white mb-8 mt-8 max-w-3xl mx-auto leading-relaxed animate-slide-up">
            Experience curated travel packages that match your style, budget, and dreams. 
            From budget adventures to luxury escapes - find your perfect journey in just a few clicks.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-scale-in">
            <Button
              variant="hero"
              size="lg"
              onClick={() => navigate("/plan")}
              className="px-12 py-6 text-xl group"
            >
              <Compass className=" group-hover:rotate-45 transition-transform duration-300" size={24} />
              Plan Your Dream Trip
              
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-6 text-lg bg-emerald-500/10 backdrop-blur-sm border-emerald-400/30 text-white hover:bg-emerald-500/20 "
            >
              Learn More
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto animate-fade-in [animation-delay:1s]">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.number}</div>
                <div className="text-sm text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        
      </section>

      {/* Enhanced Features Section */}
      <section id="features" className="py-20 px-4 bg-gradient-to-b from-background to-secondary/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              Travel Planning Made{" "}
              <span className="bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent">
                Simple
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We've reimagined how travel planning should work - fast, personalized, and stress-free
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={index}
                  className="group p-6 shadow-[var(--card-shadow)] hover:shadow-[var(--card-shadow-hover)] transition-all duration-500 animate-scale-in border-0 bg-card/80 backdrop-blur-sm hover:-translate-y-2"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <CardContent className="p-0">
                    <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popular Destinations Section */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Where Will Your Adventure Take You?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our most loved destinations with carefully crafted itineraries
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {destinations.map((destination, index) => (
              <Card 
                key={index}
                className="group overflow-hidden shadow-[var(--card-shadow)] hover:shadow-[var(--card-shadow-hover)] transition-all duration-500 animate-fade-in cursor-pointer"
                style={{ animationDelay: `${index * 200}ms` }}
                onClick={() => navigate("/plan")}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold mb-1">{destination.name}</h3>
                    <p className="text-sm opacity-90">{destination.trips}</p>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-white/20 backdrop-blur-sm text-white border-white/30">
                      {destination.price}
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate("/plan")}
              className="px-8 py-4 group"
            >
              <Mountain className="mr-3 group-hover:rotate-12 transition-transform duration-300" size={20} />
              Explore All Destinations
              <Plane className="ml-3 group-hover:translate-x-1 transition-transform duration-300" size={20} />
            </Button>
          </div>
        </div>
      </section>

      <Testimonials />
      
      <FAQ />

      {/* Enhanced CTA Section */}
      

      {/* Footer */}
      <footer className="bg-card/50 backdrop-blur-sm border-t border-border/50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center">
                  <Compass className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent">
                  WanderWave
                </span>
              </div>
              <p className="text-muted-foreground text-sm">
                Discover the perfect trip tailored just for you. Fast, personalized, and unforgettable travel experiences.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><button onClick={() => navigate("/")} className="hover:text-primary transition-colors">Home</button></li>
                <li><button onClick={() => navigate("/plan")} className="hover:text-primary transition-colors">Plan Trip</button></li>
                <li><button onClick={() => navigate("/results")} className="hover:text-primary transition-colors">Browse Trips</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#faq" className="hover:text-primary transition-colors">FAQ</a></li>
                <li><a href="mailto:support@wanderwave.com" className="hover:text-primary transition-colors">Contact Us</a></li>
                <li><a href="tel:+911234567890" className="hover:text-primary transition-colors">+91 123 456 7890</a></li>
              </ul>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground mb-3">
                Join our community of travelers
              </p>
              <div className="flex space-x-3">
                <Facebook h-4 w-4 className="hover:bg-blue-600 hover:rounded-lg"/>
                <Instagram h-4 w-4 className="hover:bg-pink-600 hover:rounded-lg"/>
                <Twitter h-4 w-4 className="hover:bg-blue-500 hover:rounded-lg"/>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border/50 mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 WanderWave. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
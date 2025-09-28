import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Menu, X, Compass, MapPin, Star, HelpCircle, Plane } from "lucide-react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: "Home", href: "/", icon: Compass },
    { label: "Plan Trip", href: "/plan", icon: MapPin },
    { label: "Featured", href: "#features", icon: Star },
    { label: "FAQ", href: "#faq", icon: HelpCircle }
  ];

  const handleNavigation = (href: string) => {
    if (href.startsWith("#")) {
      // Scroll to section if on home page, otherwise navigate to home first
      if (location.pathname === "/") {
        const element = document.getElementById(href.substring(1));
        element?.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate("/");
        setTimeout(() => {
          const element = document.getElementById(href.substring(1));
          element?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } else {
      navigate(href);
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="flex items-center space-x-3">
            <div className="p-2 bg-emerald-600 rounded-lg">
              <Plane className="h-6 w-6 text-black" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">WANDERWAVE</h1>
              <p className="text-xs text-muted-foreground">Travel Smart, Travel More</p>
            </div>
          </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.href === "/plan" && location.pathname === "/plan";
              
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavigation(item.href)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                    isActive 
                      ? "text-primary bg-primary/10" 
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <ThemeToggle />
            <Button 
              variant="cta" 
              size="sm"
              onClick={() => navigate("/plan")}
              className="px-6 py-5 bg-emerald-700"
            >
              Start Planning
            </Button>
          </div>

          {/* Mobile Menu Button & Theme Toggle */}
          <div className="flex md:hidden items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="h-9 w-9"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-xl">
            <nav className="py-4 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = item.href === "/plan" && location.pathname === "/plan";
                
                return (
                  <button
                    key={item.label}
                    onClick={() => handleNavigation(item.href)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                      isActive 
                        ? "text-primary bg-primary/10" 
                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
              <div className="pt-4 border-t border-border/40">
                <Button 
                  variant="cta" 
                  className="w-full"
                  onClick={() => {
                    navigate("/plan");
                    setIsMenuOpen(false);
                  }}
                >
                  Start Planning Your Trip
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navigation;
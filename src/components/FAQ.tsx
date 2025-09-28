import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    id: 1,
    question: "How does WanderWave's trip planning work?",
    answer: "Simply tell us your preferences through our quick form - destination type, budget, occasion, and interests. Our algorithm matches you with curated trips that fit your criteria perfectly. You can then view detailed itineraries and express interest without any login required."
  },
  {
    id: 2,
    question: "Do I need to pay upfront to express interest?",
    answer: "Not at all! Expressing interest is completely free. We'll contact you with more details about your chosen trip, and you can decide to proceed with the booking after discussing everything with our travel experts."
  },
  {
    id: 3,
    question: "Can I customize the suggested itineraries?",
    answer: "Absolutely! While our trips are carefully curated, we understand every traveler is unique. Our team will work with you to customize the itinerary based on your specific preferences, dietary requirements, or special occasions."
  },
  {
    id: 4,
    question: "What's included in the trip packages?",
    answer: "Our packages typically include accommodations, transportation, guided tours, entrance fees, and specified meals. The exact inclusions vary by trip and are clearly listed on each trip details page. Travel insurance and 24/7 support are included in all packages."
  },
  {
    id: 5,
    question: "How far in advance should I book my trip?",
    answer: "We recommend booking at least 2-4 weeks in advance for domestic trips and 4-8 weeks for international trips. However, we can accommodate last-minute bookings based on availability."
  },
  {
    id: 6,
    question: "What if I need to cancel or reschedule my trip?",
    answer: "We offer flexible cancellation and rescheduling policies. The specific terms depend on the trip type and timing of cancellation. Our team will clearly explain the policy when you proceed with booking."
  },
  {
    id: 7,
    question: "Do you offer group discounts?",
    answer: "Yes! We offer attractive discounts for groups of 4 or more travelers. The exact discount depends on the group size and chosen package. Contact us after expressing interest to learn about group pricing."
  },
  {
    id: 8,
    question: "Is travel insurance included?",
    answer: "Yes, basic travel insurance is included with all our packages. This covers medical emergencies, trip cancellations due to unforeseen circumstances, and lost luggage. Additional comprehensive coverage is available upon request."
  }
];

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <section id="faq" className="py-20 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center">
              <HelpCircle className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about planning your perfect trip with WanderWave
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openItems.includes(faq.id);
            return (
              <Card 
                key={faq.id} 
                className="shadow-[var(--card-shadow)] hover:shadow-[var(--card-shadow-hover)] transition-all duration-300 animate-fade-in border-0 bg-card/80 backdrop-blur-sm"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Collapsible>
                  <CollapsibleTrigger 
                    onClick={() => toggleItem(faq.id)}
                    className="w-full"
                  >
                    <CardHeader className="cursor-pointer hover:bg-accent/50 transition-colors duration-300 rounded-t-lg">
                      <CardTitle className="flex items-center justify-between text-left">
                        <span className="text-lg font-semibold">{faq.question}</span>
                        <ChevronDown 
                          className={`h-5 w-5 text-muted-foreground transition-transform duration-300 ${
                            isOpen ? 'rotate-180' : ''
                          }`} 
                        />
                      </CardTitle>
                    </CardHeader>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent>
                    <CardContent className="pt-0 pb-6">
                      <div className="text-muted-foreground leading-relaxed border-t border-border/50 pt-4">
                        {faq.answer}
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12 p-8 rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/20 border border-border/50">
          <h3 className="text-xl font-semibold mb-3">Still have questions?</h3>
          <p className="text-muted-foreground mb-4">
            Our travel experts are here to help you plan the perfect trip
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a 
              href="mailto:support@wanderwave.com" 
              className="text-primary hover:text-primary-hover transition-colors duration-300 font-medium"
            >
              support@wanderwave.com
            </a>
            <span className="hidden sm:inline text-muted-foreground">•</span>
            <a 
              href="tel:+911234567890" 
              className="text-primary hover:text-primary-hover transition-colors duration-300 font-medium"
            >
              +91 123 456 7890
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
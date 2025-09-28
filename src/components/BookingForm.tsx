import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Send } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";

interface BookingFormProps {
  tripName: string;
}

const BookingForm = ({ tripName }: BookingFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    preferredDate: undefined as Date | undefined,
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone) return;

    setIsSubmitting(true);

    try {
      await emailjs.send(
        "service_s4rhbb2", // 🔑 replace with your EmailJS Service ID
        "template_67caj2u", // 🔑 replace with your EmailJS Template ID
        {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          preferredDate: formData.preferredDate
            ? format(formData.preferredDate, "PPP")
            : "Not selected",
          message: formData.message,
          tripName: tripName,
        },
        "pUoEkPBQ04bSugsBI" // 🔑 replace with your EmailJS Public Key
      );

      toast({
        title: "Interest Submitted Successfully!",
        description: "We'll contact you within 24 hours for more details.",
      });

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        preferredDate: undefined,
        message: ""
      });
    } catch (error) {
      toast({
        title: "Error submitting form",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
      console.error("EmailJS error:", error);
    }

    setIsSubmitting(false);
  };

  const isFormValid = formData.fullName && formData.email && formData.phone;

  return (
    <form onSubmit={handleSubmit} className="space-y-2 p-1">
      <div className="text-center mb-4">
        <h3 className="font-semibold text-lg text-foreground mb-2">
          Interested in "{tripName}"?
        </h3>
        <p className="text-sm text-muted-foreground">
          Fill out this form and we'll get back to you with more details
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="fullName">Full Name *</Label>
          <Input
            id="fullName"
            type="text"
            value={formData.fullName}
            onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
            placeholder="Enter your full name"
            required
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            placeholder="your.email@example.com"
            required
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            placeholder="+91 98765 43210"
            required
            className="mt-1"
          />
        </div>

        <div>
          <Label>Preferred Travel Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal mt-1",
                  !formData.preferredDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.preferredDate ? (
                  format(formData.preferredDate, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={formData.preferredDate}
                onSelect={(date) => setFormData(prev => ({ ...prev, preferredDate: date }))}
                disabled={(date) => date < new Date()}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <Label htmlFor="message">Additional Questions or Requests</Label>
          <Textarea
            id="message"
            value={formData.message}
            onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
            placeholder="Any special requirements, questions, or requests..."
            rows={3}
            className="mt-1 resize-none"
          />
        </div>
      </div>

      <Button
        type="submit"
        variant="cta"
        className="w-full"
        disabled={!isFormValid || isSubmitting}
      >
        {isSubmitting ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
            Submitting...
          </>
        ) : (
          <>
            <Send className="mr-2" size={16} />
            Send My Interest
          </>
        )}
      </Button>

      {!isFormValid && (
        <p className="text-xs text-muted-foreground text-center">
          Please fill in all required fields (*)
        </p>
      )}
    </form>
  );
};

export default BookingForm;

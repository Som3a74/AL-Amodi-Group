import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PhoneIcon, MailIcon, MapPinIcon, ClockIcon } from "lucide-react";

// Simple Input component
const Input = ({ className = "", ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
);

// Simple Textarea component
const Textarea = ({ className = "", ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea
    className={`flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
);

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Add form submission logic here
    setTimeout(() => {
      setIsSubmitting(false);
    }, 1000);
  };

  const contactInfo = [
    {
      icon: <MapPinIcon className="h-6 w-6" />,
      title: "Address",
      content: (
        <div className="space-y-1">
          <p className="font-semibold">AL Amodi GROUP</p>
          <p>Al Dar Apartments Building</p>
          <p>Mezzanine floor, Building no 91</p>
          <p>Zone 14, Street 920</p>
          <p>Doha - Qatar</p>
        </div>
      ),
    },
    {
      icon: <PhoneIcon className="h-6 w-6" />,
      title: "Phone Numbers",
      content: (
        <div className="space-y-2">
          <p>+974 – 44684693</p>
          <p>+974 – 44161487</p>
        </div>
      ),
    },
    {
      icon: <MailIcon className="h-6 w-6" />,
      title: "Email",
      content: "info@alamodigroup.com.qa",
    },
    {
      icon: <ClockIcon className="h-6 w-6" />,
      title: "Working Hours",
      content: (
        <div className="space-y-1">
          <p>8:00 AM to 12:00 PM</p>
          <p>4:00 PM to 08:00 PM</p>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Contact AL Amodi Group
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get in touch with Qatar's leading building materials supplier. We're here to help with all your construction needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="bg-card p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Full Name
                      </label>
                      <Input
                        id="name"
                        type="text"
                        required
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email Address
                      </label>
                      <Input
                        id="email"
                        type="email"
                        required
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      type="text"
                      required
                      placeholder="What is this regarding?"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      required
                      placeholder="Tell us about your building materials needs..."
                      rows={6}
                    />
                  </div>
                  <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
                <p className="text-muted-foreground mb-8">
                  Visit our head office in Doha or contact us directly. Our team is ready to assist you with premium building materials and expert advice.
                </p>
              </div>

              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  className="flex items-start space-x-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                    {info.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">{info.title}</h3>
                    <div className="text-muted-foreground">
                      {typeof info.content === 'string' ? (
                        <p>{info.content}</p>
                      ) : (
                        info.content
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Map */}
              <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d462563.0055176543!2d51.23076092382946!3d25.29493654068684!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e45c534ffdce87f%3A0x44d2061f2339e7!2sDoha%2C%20Qatar!5e0!3m2!1sen!2s!4v1702398740123!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
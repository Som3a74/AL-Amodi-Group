import { motion } from "framer-motion";
import { PhoneIcon, MailIcon, MapPinIcon, ClockIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function ContactInfo() {
  const contactDetails = [
    {
      icon: <MapPinIcon className="h-5 w-5" />,
      title: "Visit Our Office",
      content: "Al Dar Apartments Building, Mezzanine floor, Building no 91, Zone 14, Street 920, Doha - Qatar"
    },
    {
      icon: <PhoneIcon className="h-5 w-5" />,
      title: "Call Us",
      content: "+974 – 44684693 / +974 – 44161487"
    },
    {
      icon: <MailIcon className="h-5 w-5" />,
      title: "Email Us",
      content: "info@alamodigroup.com.qa"
    },
    {
      icon: <ClockIcon className="h-5 w-5" />,
      title: "Working Hours",
      content: "8:00 AM to 12:00 PM & 4:00 PM to 08:00 PM"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get in Touch
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Ready to start your next project? Contact AL Amodi Group today and discover why we're Qatar's trusted building materials supplier since 1957.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactDetails.map((detail, index) => (
            <motion.div
              key={index}
              className="bg-background p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                  {detail.icon}
                </div>
                <h3 className="font-semibold">{detail.title}</h3>
              </div>
              <p className="text-muted-foreground text-sm">{detail.content}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Link to="/contact">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Contact Us Today
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
} 
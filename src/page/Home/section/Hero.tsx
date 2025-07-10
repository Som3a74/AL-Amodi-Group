import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDownIcon } from "lucide-react";
import { motion } from "framer-motion";
import hero1 from "@/assets/hero/hero1.jpg";
import hero2 from "@/assets/hero/hero2.jpg";
import hero3 from "@/assets/hero/hero3.jpg";
import hero4 from "@/assets/hero/hero4.jpg";

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const heroImages = [hero1, hero2, hero3, hero4];

  const scrollToNextSection = () => {
    const nextSection = document.getElementById("intro-section");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % heroImages.length
      );
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Layered background images - no white flash */}
      {heroImages.map((image, index) => (
        <motion.div
          key={index}
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${image}')`,
            backgroundPosition: "center",
          }}
          animate={{ 
            opacity: index === currentImageIndex ? 1 : 0 
          }}
          transition={{ 
            duration: 1.5, 
            ease: "easeInOut" 
          }}
        >
          {/* Simple overlay */}
          <div className="absolute inset-0 bg-black/50" />
        </motion.div>
      ))}

      {/* Content */}
      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            AL Amodi Group
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8">
            Pioneer in Building Materials Supply Since 1957 - Your Trusted Partner in Doha, Qatar
          </p>
          <Button 
            size="lg" 
            className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300"
          >
            Explore Our Products
          </Button>
        </motion.div>
      </div>

      {/* Simple image indicators */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentImageIndex 
                ? "bg-white w-6" 
                : "bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* Simple scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        onClick={scrollToNextSection}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ArrowDownIcon className="h-8 w-8 text-white" />
        </motion.div>
      </motion.div>
    </section>
  );
}
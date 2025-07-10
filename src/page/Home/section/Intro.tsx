import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

// Counter component
const Counter = ({ value, suffix, label, index }: { value: number; suffix: string; label: string; index: number }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(countRef, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / 2000, 1);
      
      setCount(Math.floor(progress * value));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isInView, value]);

  return (
    <motion.div 
      ref={countRef}
      className="p-4 rounded-lg bg-card"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <p className="text-3xl font-bold text-primary mb-1">
        {label === "Since" ? value : count.toLocaleString()}{suffix}
      </p>
      <p className="text-sm text-muted-foreground">
        {label}
      </p>
    </motion.div>
  );
};

export default function Intro() {
  const stats = [
    { value: 65, label: "Exclusive Brands", suffix: "+" },
    { value: 25000, label: "Products", suffix: "+" },
    { value: 4, label: "Showrooms", suffix: "+" },
    { value: 1957, label: "Since", suffix: "" }
  ];



  return (
    <section id="intro-section" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-24 h-24 bg-primary/20 rounded-full blur-xl" />
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Welcome to AL Amodi Group
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-xl">
                Based in Doha, Qatar, AL Amodi Group is the pioneer of direct supply and distribution of branded international building materials from all over the world. Family-owned since 1957, the parent company AL Amodi Store is an innovative company rooted in a time-honored tradition.
              </p>
              
              {/* Stats with Counter Animation */}
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <Counter
                    key={index}
                    value={stat.value}
                    suffix={stat.suffix}
                    label={stat.label}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Right image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-xl"
          >
            <img
              src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="AL Amodi Group - Building Materials Supply"
              className="w-full h-auto object-cover rounded-xl"
            />
            <div className="absolute inset-0 bg-primary/10 rounded-xl" />
            
            {/* Overlay text */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-black/70 backdrop-blur-sm rounded-lg p-4">
                <h4 className="text-white font-semibold mb-2">Quality Building Materials</h4>
                <p className="text-white/80 text-sm">Trusted by professionals across Qatar for over 6 decades</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
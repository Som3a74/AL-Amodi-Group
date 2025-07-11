import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const stats = [
    { value: 65, key: "brands", suffix: "+" },
    { value: 25000, key: "products", suffix: "+" },
    { value: 4, key: "showrooms", suffix: "+" },
    { value: 1957, key: "since", suffix: "" }
  ];



  return (
    <section id="intro-section" className="py-20 bg-background overflow-hidden">
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
                {t('intro.welcome')}
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-xl">
                {t('intro.description')}
              </p>
              
              {/* Stats with Counter Animation */}
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <Counter
                    key={index}
                    value={stat.value}
                    suffix={stat.suffix}
                    label={t(`intro.stats.${stat.key}`)}
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
                <h4 className="text-white font-semibold mb-2">{t('intro.overlay.title')}</h4>
                <p className="text-white/80 text-sm">{t('intro.overlay.subtitle')}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
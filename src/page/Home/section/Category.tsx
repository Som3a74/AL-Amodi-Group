import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import prestige from "@/assets/category/imgi_3_Prestige.jpg";
import contemporary from "@/assets/category/imgi_4_Contemporary.jpg";
import accessories from "@/assets/category/imgi_5_Accessories.jpg";
import hydrotherapy from "@/assets/category/imgi_6_Hydrotherapy.jpg";
import kitchen from "@/assets/category/imgi_7_Kitchen.jpg";
import sanitaryFittings from "@/assets/category/imgi_41_santiaryfittings_1.jpg";

const Category = () => {
  const categories = [
    {
      id: 1,
      title: "Prestige Collection",
      description: "Luxury sanitary ware for premium projects",
      image: prestige,
      link: "/products/prestige"
    },
    {
      id: 2,
      title: "Contemporary Design",
      description: "Modern solutions for today's lifestyle",
      image: contemporary,
      link: "/products/contemporary"
    },
    {
      id: 3,
      title: "Bathroom Accessories",
      description: "Complete your bathroom with premium accessories",
      image: accessories,
      link: "/products/accessories"
    },
    {
      id: 4,
      title: "Hydrotherapy",
      description: "Wellness and relaxation solutions",
      image: hydrotherapy,
      link: "/products/hydrotherapy"
    },
    {
      id: 5,
      title: "Kitchen Solutions",
      description: "Transform your kitchen with our range",
      image: kitchen,
      link: "/products/kitchen"
    },
    {
      id: 6,
      title: "Sanitary Fittings",
      description: "Professional grade fittings and fixtures",
      image: sanitaryFittings,
      link: "/products/sanitary-fittings"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30
    },
    visible: { 
      opacity: 1, 
      y: 0
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-background via-muted/10 to-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Explore Our
            <span className="text-primary ml-3">Categories</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Discover our comprehensive range of building materials, from luxury sanitary ware 
            to modern kitchen solutions. Each category features premium brands trusted worldwide.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {categories.map((category) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              transition={{ duration: 0.6 }}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.3 }
              }}
              className="group"
            >
              <Link to={category.link}>
                <div className="relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
                  {/* Image Container */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Simple Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                      {category.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {category.description}
                    </p>

                    {/* Simple CTA */}
                    <div className="flex items-center justify-between">
                      <span className="text-primary font-medium">Explore Collection</span>
                      <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Link to="/products">
            <motion.button
              className="bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary/90 transition-colors duration-300 shadow-md hover:shadow-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View All Products
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Category;
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import productData from "@/data/products.json";

// Function to get the first image for a category
const getCategoryImage = (categoryName: string) => {
  const product = productData.products.find(p => p.category === categoryName);
  return product ? product.image : ""; // Returns the public path to the image
};

const Category = () => {
  const { t } = useTranslation();

  // Dynamically create categories from the JSON data
  const uniqueCategories = [...new Set(productData.products.map(p => p.category))];

  const categories = uniqueCategories.map((cat, index) => ({
    id: index + 1,
    key: cat.toLowerCase().replace(/\s+/g, '-'), // "WASHBASIN FURNITURE" -> "washbasin-furniture"
    name: cat,
    image: getCategoryImage(cat),
    link: `/category/${cat.toLowerCase().replace(/\s+/g, '-')}`
  }));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30 
    },
    visible: { 
      opacity: 1, 
      y: 0 
    },
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
            {t('category.title')}
            <span className="text-primary ml-3">{t('category.subtitle')}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            {t('category.description')}
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
                      alt={category.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Simple Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                      {t(`category.items.${category.key}.title`)}
                    </h3>
                    
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {/* Using category name as a fallback for description */}
                      {t(`category.items.${category.key}.description`, `Explore our collection of ${category.name}.`)}
                    </p>

                    {/* Simple CTA */}
                    <div className="flex items-center justify-between">
                      <span className="text-primary font-medium">{t('category.explore')}</span>
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
              {t('category.viewAll')}
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Category;
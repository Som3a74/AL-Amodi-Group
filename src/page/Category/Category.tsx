import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Frown } from "lucide-react";
import productData from "@/data/products.json";
import ProductCard from "@/components/common/cards/ProductCard";
import type { Product } from "@/types/types";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const CategoryPage = () => {
    const { categoryName } = useParams<{ categoryName: string }>();
    const { t } = useTranslation();

    // Reconstruct the original category name from the URL slug
    // "washbasin-furniture" -> "WASHBASIN FURNITURE"
    const normalizedCategoryName = categoryName?.replace(/-/g, ' ').toUpperCase();

    // Find the original category name with correct casing for display
    const allCategories = [...new Set(productData.products.map(p => p.category))];
    const originalCategoryName = allCategories.find(c => c.toUpperCase() === normalizedCategoryName);


    const categoryProducts = productData.products.filter(
        (p: Product) => p.category.toUpperCase() === normalizedCategoryName
    );

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const displayName = originalCategoryName || categoryName;

    if (categoryProducts.length === 0) {
        return (
            <>
                <Helmet>
                    <title>{`Category: ${displayName}`} | ALAMOUDI GROUP</title>
                    <meta name="description" content={`No products found for category ${displayName}.`} />
                </Helmet>
                <div className="flex flex-col items-center justify-center min-h-[60vh] text-center bg-background">
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Frown className="h-24 w-24 mx-auto text-primary/50 mb-6" />
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            {t("categoryPage.noProductsFound", { category: displayName })}
                        </h2>
                        <p className="text-muted-foreground max-w-md mx-auto mb-8">
                            {t("categoryPage.noProductsDescription", "It seems we don't have any products in this category at the moment. Please check back later or explore our other categories.")}
                        </p>
                        <Link to="/products">
                            <motion.button
                                className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold text-base hover:bg-primary/90 transition-colors duration-300 shadow-md hover:shadow-lg"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {t('category.viewAll', 'Explore All Products')}
                            </motion.button>
                        </Link>
                    </motion.div>
                </div>
            </>
        );
    }

    return (
        <section className="py-16 md:py-24 bg-gradient-to-br from-background via-muted/10 to-background">
            <Helmet>
                <title>{`Category: ${displayName}`} | ALAMOUDI GROUP</title>
                <meta name="description" content={`Explore products in the ${displayName} category at ALAMOUDI GROUP.`} />
            </Helmet>
            <div className="container mx-auto px-4">
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                >
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
                        {t(`category.items.${categoryName || ''}.title`, displayName || 'Category')}
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                        {t(`category.items.${categoryName || ''}.description`, `Explore our exclusive collection of ${displayName || 'this category'}. Find the perfect items to elevate your space.`)}
                    </p>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {categoryProducts.map((product, index) => (
                        <ProductCard key={product.id} product={product} index={index} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default CategoryPage;
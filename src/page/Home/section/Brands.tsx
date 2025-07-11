import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

// CSS for animation
const animationStyles = `
  @keyframes scroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(-${27 * 160}px); }
  }
  .group:hover .animate-scroll {
    animation-play-state: paused !important;
  }
`;

// Import all brand images
import brand1 from "@/assets/brands/imgi_2_Image_20180929779A.jpg";
import brand2 from "@/assets/brands/imgi_3_Image_201809290E79.jpg";
import brand3 from "@/assets/brands/imgi_4_Image_20180925EE8D.jpg";
import brand4 from "@/assets/brands/imgi_5_Image_201809254F7B.jpg";
import brand5 from "@/assets/brands/imgi_6_Image_201809295CA8.jpg";
import brand6 from "@/assets/brands/imgi_7_Image_201809299143.jpg";
import brand7 from "@/assets/brands/imgi_8_Image_20180925A907.jpg";
import brand8 from "@/assets/brands/imgi_9_Image_201809252DD9.jpg";
import brand9 from "@/assets/brands/imgi_10_Image_20180925BD0A.jpg";
import brand10 from "@/assets/brands/imgi_11_Image_20180929790C.jpg";
import brand11 from "@/assets/brands/imgi_12_Image_201809294543.jpg";
import brand12 from "@/assets/brands/imgi_13_Image_2018092928CD.jpg";
import brand13 from "@/assets/brands/imgi_14_Image_201809291B14.jpg";
import brand14 from "@/assets/brands/imgi_15_Image_2018092931C4.jpg";
import brand15 from "@/assets/brands/imgi_16_Image_20180929F964.jpg";
import brand16 from "@/assets/brands/imgi_17_Image_2018092689BC.jpg";
import brand17 from "@/assets/brands/imgi_18_Image_2018092927F1.jpg";
import brand18 from "@/assets/brands/imgi_19_Image_20180925D56E.jpg";
import brand19 from "@/assets/brands/imgi_20_Image_201809259D84.jpg";
import brand20 from "@/assets/brands/imgi_21_Image_20180925384D.jpg";
import brand21 from "@/assets/brands/imgi_22_Image_2018092965A3.jpg";
import brand22 from "@/assets/brands/imgi_23_Image_20180925236E.jpg";
import brand23 from "@/assets/brands/imgi_24_Image_20180929B262.jpg";
import brand24 from "@/assets/brands/imgi_25_Image_2018092914DA.jpg";
import brand25 from "@/assets/brands/imgi_26_Image_201809251BB7.jpg";
import brand26 from "@/assets/brands/imgi_27_Image_20180925AB6A.jpg";
import brand27 from "@/assets/brands/imgi_28_Image_201809256808.jpg";

const Brands = () => {
    const { t } = useTranslation();
    const brands = [
        brand1, brand2, brand3, brand4, brand5, brand6, brand7, brand8, brand9,
        brand10, brand11, brand12, brand13, brand14, brand15, brand16, brand17,
        brand18, brand19, brand20, brand21, brand22, brand23, brand24, brand25,
        brand26, brand27
    ];

    // Duplicate brands for seamless loop
    const duplicatedBrands = [...brands, ...brands];

    return (
        <section className="py-12 bg-muted/30">
            <style>{animationStyles}</style>
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h3 className="text-2xl md:text-3xl font-bold mb-3">
                        {t('brands.title')}
                        <span className="text-primary ml-2">{t('brands.subtitle')}</span>
                    </h3>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        {t('brands.description')}
                    </p>
                </motion.div>

                {/* Brands Slider */}
                <div className="relative overflow-hidden group">
                    <div
                        className="flex gap-8 items-center animate-scroll"
                        style={{
                            width: `${160 * brands.length}px`,
                            animation: 'scroll 30s linear infinite'
                        }}
                    >
                        {duplicatedBrands.map((brand, index) => (
                            <motion.div
                                key={index}
                                className="flex-shrink-0 w-32 h-20 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 p-4 flex items-center justify-center group"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                            >
                                <img
                                    src={brand}
                                    alt={`Brand ${(index % brands.length) + 1}`}
                                    className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                                />
                            </motion.div>
                        ))}
                    </div>

                    {/* Gradient Fade Edges */}
                    <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-muted/30 to-transparent pointer-events-none z-10"></div>
                    <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-muted/30 to-transparent pointer-events-none z-10"></div>
                </div>

                {/* Stats */}
                <motion.div
                    className="text-center mt-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                >
                    <p className="text-sm text-muted-foreground">
                        <span className="font-semibold text-primary">65+</span> {t('brands.stats')}
                        <span className="font-semibold text-primary ml-2">25,000+</span> {t('brands.products')}
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default Brands;
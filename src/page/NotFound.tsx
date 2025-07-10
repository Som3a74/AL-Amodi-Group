import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto">
        {/* Animated Logo */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <img
            src={logo}
            alt="Al Amodi Group"
            className="mx-auto h-20 md:h-24 mb-4"
          />
        </motion.div>

        {/* 404 Number */}
        <motion.div
          className="relative mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-8xl md:text-9xl font-bold text-primary/20 select-none">
            404
          </h1>
          {/* Construction Elements */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            initial={{ rotate: -10, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="bg-yellow-400 text-black px-6 py-2 rounded-lg font-bold text-lg transform rotate-3">
              تحت الإنشاء
            </div>
          </motion.div>
        </motion.div>

        {/* Main Message */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            الصفحة غير موجودة
          </h2>
          <p className="text-muted-foreground text-lg mb-2">
            عذراً، الصفحة التي تبحث عنها غير متاحة حالياً
          </p>
          <p className="text-sm text-muted-foreground">
            نحن نعمل على بناء شيء رائع لك - تماماً كما نبني أحلامكم منذ 1957
          </p>
        </motion.div>

        {/* Construction Tools Animation */}
        <motion.div
          className="flex justify-center gap-8 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.div
            className="text-4xl"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            🔨
          </motion.div>
          <motion.div
            className="text-4xl"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            🏗️
          </motion.div>
          <motion.div
            className="text-4xl"
            animate={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            🔧
          </motion.div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Link to="/">
            <motion.button
              className="bg-primary text-primary-foreground px-8 py-3 rounded-xl font-semibold text-lg hover:bg-primary/90 transition-colors duration-300 shadow-md hover:shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              العودة للرئيسية
            </motion.button>
          </Link>
          
          <Link to="/contact">
            <motion.button
              className="bg-transparent border-2 border-primary text-primary px-8 py-3 rounded-xl font-semibold text-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              تواصل معنا
            </motion.button>
          </Link>
        </motion.div>

        {/* Footer Message */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-primary">Al Amodi Group</span>
            {" "}• رائدون في مواد البناء منذ 1957
          </p>
        </motion.div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary/20 rounded-full"
              initial={{
                x: Math.random() * 1200,
                y: 800,
              }}
              animate={{
                y: -50,
                x: Math.random() * 1200,
              }}
              transition={{
                duration: Math.random() * 3 + 5,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "linear"
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotFound;
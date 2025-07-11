
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation, Trans } from 'react-i18next';
import productData from "@/data/products.json";
import { 
  PhoneIcon, 
  MailIcon, 
  MapPinIcon, 
  ClockIcon,
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from "lucide-react";

const Footer = () => {
  const { t } = useTranslation();

  const quickLinks = [
    { name: t('footer.quickLinks.home'), href: "/" },
    { name: t('footer.quickLinks.products'), href: "/products" },
    { name: t('footer.quickLinks.contact'), href: "/contact" },
    { name: t('footer.quickLinks.about'), href: "/about" }
  ];

  const uniqueCategories = [...new Set(productData.products.map(p => p.category))];
  const categories = uniqueCategories.map(cat => ({
    name: t(`footer.categories.${cat.toLowerCase().replace(/\s+/g, '-')}`, cat),
    href: `/category/${cat.toLowerCase().replace(/\s+/g, '-')}`
  }));

  const socialLinks = [
    { icon: <Facebook className="h-5 w-5" />, href: "#", label: "Facebook" },
    { icon: <Twitter className="h-5 w-5" />, href: "#", label: "Twitter" },
    { icon: <Instagram className="h-5 w-5" />, href: "#", label: "Instagram" },
    { icon: <Linkedin className="h-5 w-5" />, href: "#", label: "LinkedIn" }
  ];

  const contactInfo = [
    {
      icon: <MapPinIcon className="h-5 w-5" />,
      text: t('footer.contact.address')
    },
    {
      icon: <PhoneIcon className="h-5 w-5" />,
      text: t('footer.contact.phone')
    },
    {
      icon: <MailIcon className="h-5 w-5" />,
      text: t('footer.contact.email')
    },
    {
      icon: <ClockIcon className="h-5 w-5" />,
      text: t('footer.contact.hours')
    }
  ];

  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <h3 className="text-xl font-bold mb-4">{t('footer.company.name')}</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              {t('footer.company.description')}
            </p>
            
            {/* Social Media */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold mb-4">{t('footer.quickLinks.title')}</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.href}
                    className="text-gray-300 hover:text-primary transition-colors duration-300 hover:underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold mb-4">{t('footer.categories.title')}</h3>
            <ul className="space-y-3">
              {categories.map((category, index) => (
                <li key={index}>
                  <Link 
                    to={category.href}
                    className="text-gray-300 hover:text-primary transition-colors duration-300 hover:underline"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold mb-4">{t('footer.contact.title')}</h3>
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex gap-3">
                  <div className="text-primary mt-1 flex-shrink-0">
                    {info.icon}
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {info.text}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            
            {/* Copyright */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-gray-400 text-sm"
            >
              <p>
                {t('footer.bottom.copyright', { year: new Date().getFullYear() })}
              </p>
            </motion.div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="flex gap-6 text-gray-400 text-sm"
            >
              <Link to="/privacy" className="hover:text-primary transition-colors duration-300">
                {t('footer.bottom.privacy')}
              </Link>
              <Link to="/terms" className="hover:text-primary transition-colors duration-300">
                {t('footer.bottom.terms')}
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Brand Recognition */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-8 pt-8 border-t border-slate-800"
        >
          <p className="text-gray-400 text-sm">
            <Trans i18nKey="footer.bottom.agent">
              Exclusive agents for <span className="text-primary font-semibold">Griferias Maier</span> in Qatar
            </Trans>
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer
import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { PhoneIcon, MailIcon, MapPinIcon, ClockIcon } from "lucide-react";
import { Helmet } from "react-helmet-async";

// Simple Input component
const Input = ({ className = "", ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
);

// Simple Textarea component
const Textarea = ({ className = "", ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea
    className={`flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
);

export default function ContactPage() {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Add form submission logic here
    setTimeout(() => {
      setIsSubmitting(false);
    }, 1000);
  };

  const contactInfo = [
    {
      icon: <MapPinIcon className="h-6 w-6" />,
      title: t('contactPage.info.addressTitle'),
      content: (
        <div className="space-y-1">
          <p className="font-semibold">{t('contactPage.info.addressLine1')}</p>
          <p>{t('contactPage.info.addressLine2')}</p>
          <p>{t('contactPage.info.addressLine3')}</p>
          <p>{t('contactPage.info.addressLine4')}</p>
          <p>{t('contactPage.info.addressLine5')}</p>
        </div>
      ),
    },
    {
      icon: <PhoneIcon className="h-6 w-6" />,
      title: t('contactPage.info.phoneTitle'),
      content: (
        <div className="space-y-2">
          <p>+974 – 44684693</p>
          <p>+974 – 44161487</p>
        </div>
      ),
    },
    {
      icon: <MailIcon className="h-6 w-6" />,
      title: t('contactPage.info.emailTitle'),
      content: "info@alamodigroup.com.qa",
    },
    {
      icon: <ClockIcon className="h-6 w-6" />,
      title: t('contactPage.info.hoursTitle'),
      content: (
        <div className="space-y-1">
          <p>{t('contactPage.info.hoursLine1')}</p>
          <p>{t('contactPage.info.hoursLine2')}</p>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen pt-16">
      <Helmet>
        <title>Contact Us | ALAMOUDI GROUP</title>
        <meta name="description" content="Get in touch with ALAMOUDI GROUP. Find our address, phone number, and email, or send us a message through our contact form." />
      </Helmet>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t('contactPage.hero.title')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('contactPage.hero.description')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="bg-card p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold mb-6">{t('contactPage.form.title')}</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        {t('contactPage.form.name')}
                      </label>
                      <Input
                        id="name"
                        type="text"
                        required
                        placeholder={t('contactPage.form.namePlaceholder')}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        {t('contactPage.form.email')}
                      </label>
                      <Input
                        id="email"
                        type="email"
                        required
                        placeholder={t('contactPage.form.emailPlaceholder')}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                      {t('contactPage.form.subject')}
                    </label>
                    <Input
                      id="subject"
                      type="text"
                      required
                      placeholder={t('contactPage.form.subjectPlaceholder')}
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      {t('contactPage.form.message')}
                    </label>
                    <Textarea
                      id="message"
                      required
                      placeholder={t('contactPage.form.messagePlaceholder')}
                      rows={6}
                    />
                  </div>
                  <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? t('contactPage.form.sendingButton') : t('contactPage.form.sendButton')}
                  </Button>
                </form>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-bold mb-6">{t('contactPage.info.title')}</h2>
                <p className="text-muted-foreground mb-8">
                  {t('contactPage.info.description')}
                </p>
              </div>

              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  className="flex items-start space-x-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                    {info.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">{info.title}</h3>
                    <div className="text-muted-foreground">
                      {typeof info.content === 'string' ? (
                        <p>{info.content}</p>
                      ) : (
                        info.content
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Map */}
              <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d462563.0055176543!2d51.23076092382946!3d25.29493654068684!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e45c534ffdce87f%3A0x44d2061f2339e7!2sDoha%2C%20Qatar!5e0!3m2!1sen!2s!4v1702398740123!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
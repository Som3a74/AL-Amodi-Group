import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const isArabic = i18n.language.startsWith('ar');

  return (
    <div className="flex items-center gap-1">
      <Button
        variant="link"
        size="sm"
        onClick={() => changeLanguage('en')}
        className={cn(
          "transition-colors",
            !isArabic ? "text-primary font-semibold" : "text-black"
        )}
      >
        English
      </Button>
      <span className="text-muted-foreground/50">|</span>
      <Button
        variant="link"
        size="sm"
        onClick={() => changeLanguage('ar')}
        className={cn(
          "transition-colors",
          isArabic ? "text-primary font-semibold" : "text-black"
        )}
      >
        العربية
      </Button>
    </div>
  );
};

export default LanguageSwitcher; 
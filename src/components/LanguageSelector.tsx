import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { Button } from "./ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Globe, ChevronDown } from "lucide-react";
import type { LanguageCode } from '../i18n/types';

const LanguageSelector: React.FC = () => {
  const { changeLanguage, getAvailableLanguages, getCurrentLanguageInfo } = useLanguage();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const currentLang = getCurrentLanguageInfo();
  const availableLanguages = getAvailableLanguages();

  const handleLanguageChange = (languageCode: LanguageCode): void => {
    changeLanguage(languageCode);
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="language-selector-button ml-3"
        >
          <Globe className="h-4 w-4 mr-2 hidden sm:block" />
          <span className="mr-1">{currentLang?.flag}</span>
          <span className="hidden sm:inline">{currentLang?.name.split(' ')[0]}</span>
          <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 sm:ml-2" />
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        align="end" 
        className="w-48 bg-gray-800/95 backdrop-blur border-purple-500/30 text-white"
      >
        {availableLanguages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className="hover:bg-purple-500/20 cursor-pointer flex items-center space-x-3 px-4 py-2"
          >
            <span className="text-lg">{lang.flag}</span>
            <span className="flex-1 text-white">{lang.name}</span>
            {lang.code === currentLang?.code && (
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;


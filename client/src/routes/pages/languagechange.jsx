import { Check, ChevronLeft, Languages } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const LANGUAGES = [
  { code: "en", labelKey: "english" },
  { code: "hi", labelKey: "hindi" },
  { code: "es", labelKey: "spanish" },
  { code: "fr", labelKey: "french" },
];

export default function Language() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const currentLang = i18n.language;

  const changeLanguage = (code) => {
    i18n.changeLanguage(code);
  };

  return (
    <div className="w-full text-white">
      {/* Header */}
      <header className="sticky top-0 z-10 backdrop-blur-xl bg-black/60 border-b border-neutral-800 px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate(-1)}>
          <ChevronLeft />
        </button>
        <span className="text-lg font-bold">{t("language")}</span>
      </header>

      {/* Content */}
      <div className="px-4 py-3">
        <p className="text-sm text-neutral-400 mb-4">
          {t("choose_language")}
        </p>

        <div className="flex flex-col gap-2">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className="flex items-center justify-between px-4 py-4 rounded-xl hover:bg-neutral-900 transition"
            >
              <div className="flex items-center gap-3">
                <Languages size={18} />
                <span className="text-sm font-medium">
                  {t(lang.labelKey)}
                </span>
              </div>

              {currentLang.startsWith(lang.code) && (
                <Check className="text-blue-500" size={18} />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

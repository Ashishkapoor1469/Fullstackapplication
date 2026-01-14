import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "hi", label: "Hindi" },
  { code: "fr", label: "French" },
  { code: "es", label: "Spanish" }
];

export default function LanguageSwitch() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative inline-block">
      <button
        onClick={() => setOpen(!open)}
        className="px-4 py-2 rounded-xl border bg-white text-sm font-medium"
      >
        {LANGUAGES.find(l => l.code === i18n.language)?.label}
      </button>

      {open && (
        <div className="absolute -right-9 mt-2 w-40 rounded-xl border bg-white shadow-lg">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                i18n.changeLanguage(lang.code);
                setOpen(false);
              }}
              className="
                w-full px-4 py-2
                hover:bg-gray-100
                first:rounded-t-xl
                last:rounded-b-xl
                text-black
              "
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

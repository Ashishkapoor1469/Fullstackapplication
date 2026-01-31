import { Settings } from "lucide-react";
import { NavLink } from "react-router-dom";
import TweetComposer from "../../components/ui/tweetcomposer";
import Postfeed from "../../components/Home/post"
import { useTranslation } from "react-i18next";
export default function Feed() {
   const { t } = useTranslation();

  return (
    <div>
      {/* HEADER */}
      <header className="sticky top-0 z-10 bg-black/80 backdrop-blur border-b border-gray-800 p-4 text-xl font-bold">
        <div className="flex justify-between px-2">
          {t("sidebar.home")}
          <div className="md:hidden block">
            <NavLink to="/more">
              <Settings />
            </NavLink>
          </div>
        </div>
      </header>

      {/* COMPOSER */}
      <TweetComposer />
      <Postfeed/>       
  
    </div>
  );
}

import React from 'react';
import { useTranslation } from "react-i18next";
import { LangS } from '../../components/ui';
const Home = () => {
const {t} = useTranslation()
  return (
    <div>
      <LangS/>
      {t("sidebar.home")}
    </div>
  );
}

export default Home;

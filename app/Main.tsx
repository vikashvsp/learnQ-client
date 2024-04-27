import React, { useEffect } from "react";
import SplashScreen from "./SplashScreen";
import LandingPage from "./LandingPage";

const Main = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== "undefined") {
        const splashScreen = document.getElementById("splash-screen");
        splashScreen?.parentNode?.removeChild(splashScreen);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <div id="app">
      <div id="splash-screen">
        <SplashScreen />
      </div>
      <div id="main-content">
        <LandingPage />
      </div>
    </div>
  );
};

export default Main;

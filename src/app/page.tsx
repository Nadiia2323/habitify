import React from "react";
import Header from "../../components/Header";
import Start from "../../components/Start";
import Features from "../../components/Features";
import Footer from "../../components/Footer";
import Info from "../../components/Info";
// import Signup from "../../components/Signup";

export default function Home() {
  return (
    <>
      {/* <Signup /> */}
      <Header />
      <Start />
      <Features />
      <Info />
      <Footer />
    </>
  );
}

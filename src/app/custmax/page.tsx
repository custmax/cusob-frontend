'use client'

import Header from "./component/Header";
import Footer from "@/app/custmax/component/Footer";
import HomePageMain from "./component/HomePageMain";

function HomePage() {

    return (
      <div>
          <Header />
          <HomePageMain />
          <div style={{height: "50vh"}}/>
          <Footer />
      </div>
    );
}

export default HomePage;
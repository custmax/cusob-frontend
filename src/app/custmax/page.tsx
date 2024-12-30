'use client'

import Header from "./component/Header";
import Footer from "@/app/custmax/component/Footer";
import HomePage from "./component/HomePageMain";

function Home() {

    return (
      <div>
          <Header />
          <HomePage />
          <Footer />
      </div>
    );
}

export default Home;
'use client'

import Header from "./component/Header";
import Footer from "@/app/custmax/component/Footer";
import HomePage from "./component/HomePage";

function Home() {

    return (
      <div>
          <Header />
          <HomePage />
          <Footer theme={"dark"}/>
      </div>
    );
}

export default Home;
import styles from './page.module.scss';
import Header from '@/component/Header';
import Footer from '@/component/Footer';
import PriceList from './component/PriceList';
import Contact from './component/Contact';
import Head from "next/head";
import type {Metadata} from "next";

const {
  pricingContainer
} = styles;

export const metadata: Metadata = {
  title: "Pricing | Cusob",
  description: "CusOb",
};

const Pricing = () => {

  return <div className={pricingContainer}>
    <Head>
      <title>Price</title>
    </Head>
    <Header showBar showSign />
    <PriceList />
    <Contact />
    <Footer />
  </div>
};

export default Pricing;
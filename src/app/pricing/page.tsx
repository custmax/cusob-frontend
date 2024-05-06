import styles from './page.module.scss';
import Header from '@/component/Header';
import Footer from '@/component/Footer';
import PriceList from './component/PriceList';
import Contact from './component/Contact';
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
    <Header showBar showSign />
    <PriceList />
    <Contact />
    <Footer />
  </div>
};

export default Pricing;
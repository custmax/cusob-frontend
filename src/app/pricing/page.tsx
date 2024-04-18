import styles from './page.module.scss';
import Header from '@/component/Header';
import Footer from '@/component/Footer';
import PriceList from './component/PriceList';
import Contact from './component/Contact';

const {
  pricingContainer
} = styles;

const Pricing = () => {

  return <div className={pricingContainer}>
    <Header showBar showSign />
    <PriceList />
    <Contact />
    <Footer />
  </div>
};

export default Pricing;
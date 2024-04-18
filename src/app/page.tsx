import styles from './page.module.scss';
import Header from '@/component/Header';
import Footer from '@/component/Footer';
import Index from "@/component/Index";

const {
  homeContainer
} = styles;

const Home = () => {
  return <div className={homeContainer}>
    <Header showBar showSign />
    <Index />
    <Footer />
  </div>
};

export default Home;

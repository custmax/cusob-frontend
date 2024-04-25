import styles from './page.module.scss';
import Banner from './component/Banner'
import DemoForm from './component/DemoForm'
import Header from '@/component/Header';
import Footer from '@/component/Footer';
import type {Metadata} from "next";

const {
  bookContainer
} = styles;

export const metadata: Metadata = {
  title: "BookDemo | Cusob",
  description: "CusOb",
};

const BookDemo = () => {
  return <div className={bookContainer}>
    <Header showBar showSign />
    <Banner />
    <DemoForm />
    <Footer />
  </div>
};

export default BookDemo;
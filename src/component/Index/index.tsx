import styles from './index.module.scss';
import classNames from 'classnames';
import Banner from './component/Banner'
import Feature1 from './component/Feature1'
import Feature2 from './component/Feature2'
import Feature3 from './component/Feature3'
import Feature4 from './component/Feature4'
import Head from "next/head";

const {
  indexContainer
} = styles;

const Index = () => {
  return <div className={classNames(indexContainer)}>
    <Head>
      <title>Email Marketing Platform |Cusob</title>
    </Head>
    <Banner />
    <Feature1 />
    <Feature2 />
    <Feature3 />
    <Feature4 />
  </div>
};

export default Index;
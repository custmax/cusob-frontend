'use client'
import styles from './index.module.scss';
import classNames from 'classnames';
import Image from 'next/image';
import Sign from './component/Sign';
import TabBar from './component/TabBar';
import Link from 'next/link';
import { FC } from 'react';
import Profile from "@/component/EnteredHeader/component/Profile";

type Props = {
  showBar?: boolean,
  showSign?: boolean,
}

const {
  headerContainer,
  logoBox,
  logo,
} = styles;

const Header: FC<Props> = (props) => {
  const { showBar = false, showSign = false } = props;

  return <div className={classNames(headerContainer)}>
    <Link href='/'>
      <div className={classNames(logoBox)}>
        <Image
          fill
          className={classNames(logo)}
          alt='logo'
          src='/img/logo.png'
          sizes='100%'
          priority
        />
      </div>
    </Link>
    {showBar && <TabBar />}
    {/*{showSign && <Sign />}*/}
    <Profile></Profile>
  </div>
};

export default Header;
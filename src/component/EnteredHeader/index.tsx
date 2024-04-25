'use client'

import styles from './index.module.scss';
import classNames from 'classnames';
import Link from 'next/link';
import ImgWrapper from '../ImgWrapper';
import { FC } from 'react';
import Profile from "@/component/EnteredHeader/component/Profile";

type Props = {
  avatar?: string,
}

const {
  headerContainer,
  logoBox,
} = styles;

const Header: FC<Props> = (props) => {

  return <div className={classNames(headerContainer)}>
    <Link href='/dashboard/'>
      <ImgWrapper className={logoBox} alt='logo' src='/img/logo.png'/>
    </Link>
    <Profile></Profile>
  </div>
};

export default Header;
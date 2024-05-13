import styles from './index.module.scss';
import ImgWrapper from '../ImgWrapper';
import Link from 'next/link';

const {
  sideBarContainer,
  scrollWrapper,
  barItem,
  barIcon,
  senderIcon,
  barText,
} = styles;

const SideBar = () => {
  return <div className={sideBarContainer}>
    <div className={scrollWrapper}>
      <Link href='/contactList' className={barItem}>
        <ImgWrapper className={barIcon} src='/img/bar_icon1.png' alt='bar icon' />
        <div className={barText}>Contacts</div>
      </Link>
      <Link href='/emailTemplates' className={barItem}>
        <ImgWrapper className={barIcon} src='/img/bar_icon2.png' alt='bar icon' />
        <div className={barText}>Templates</div>
      </Link>
      {/*<Link href='/media' className={barItem}>*/}
      {/*  <ImgWrapper className={barIcon} src='/img/bar_icon3.png' alt='bar icon' />*/}
      {/*  <div className={barText}>Media</div>*/}
      {/*</Link>*/}
      <Link href='/campaign' className={barItem}>
        <ImgWrapper className={barIcon} src='/img/bar_icon4.png' alt='bar icon' />
        <div className={barText}>Campaign</div>
      </Link>
      <Link href='/reports' className={barItem}>
        <ImgWrapper className={barIcon} src='/img/bar_icon5.png' alt='bar icon' />
        <div className={barText}>Reports</div>
      </Link>
      <Link href='/account' className={barItem}>
          <ImgWrapper className={barIcon} src='/img/bar_icon6.png' alt='bar icon' />
          <div className={barText}>Account</div>
      </Link>
      <Link href='/emailList' className={barItem}>
        <ImgWrapper className={senderIcon} src='/img/sender.png' alt='bar icon' />
        <div className={barText}>Sender</div>
      </Link>
    </div>
  </div>
};

export default SideBar;
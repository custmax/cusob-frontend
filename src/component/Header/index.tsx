'use client'
import styles from './index.module.scss';
import classNames from 'classnames';
import Image from 'next/image';
import Sign from './component/Sign';
import TabBar from './component/TabBar';
import Link from 'next/link';
import {FC, useEffect, useState} from 'react';
import {clearToken, getLocalUser, getToken} from "@/util/storage";
import ImgWrapper from "@/component/ImgWrapper";
import {Tooltip} from "antd";
import ChangePwModal from "@/component/ChangePwModal";


type Props = {
  showBar?: boolean,
  showSign?: boolean,
  avatar?: string,
}

const {
  headerContainer,
  logoBox,
  logo,
  avatar,
  notification,
  right,
  tooltip,
  nickname,
  arrowDown,
  more,

} = styles;


const Header: FC<Props> = (props) => {
  const { showBar = false, showSign = false } = props;
  const [firstName, setFirstName] = useState<string>()
  const [localAvatar, setLocalAvatar] = useState<string>('')
  const [showChangePw, setShowChangePw] = useState<boolean>(false);
  const [token, setToken] = useState("")

  const initLocal = () => {
    const localUser = getLocalUser() || {}
    if (localUser.firstName) {
      setFirstName(localUser.firstName)
    }
    if (localUser.avatar) {
      setLocalAvatar(localUser.avatar)
    }
  }

  const onChangePwOk = () => {
    setShowChangePw(false)
  }

  const handleSignOut = () => {
    clearToken();
    window.location.reload();

  };
  const onChangePwCancel = () => {
    setShowChangePw(false)
  }

  const initToken = () => {
    setToken(getToken())
  }


  useEffect(() => {
    initToken()
    initLocal();
  }, []);
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
    {!token ? <Sign /> :
        <div>
        <div className={right} id="enterHeader">
          <Link href='/stationMessage'>
            <ImgWrapper className={notification} alt='notification icon' src='/img/notification_icon.png'/>
          </Link>
          <ImgWrapper
              className={avatar}
              alt='avatar'
              src={props.avatar || localAvatar || '/img/default-avatar.png'}
          />
          <Tooltip
              placement="bottomRight"
              className={tooltip}
              title={<div className='more'>
                <Link href='/dashboard' className="more-item">Home</Link>
                <Link href='/contactInfo' className="more-item">User personal information</Link>
                <Link href='/userList' className="more-item">User Management</Link>
                <div className='more-item' onClick={() => setShowChangePw(true)} >Change Password</div>
                <Link href='/billingHistory' className="more-item">Billing History</Link>
                <Link href='/' className='more-item mb0' onClick={handleSignOut}>Sign Out</Link>
              </div>}
              getPopupContainer={() => document.querySelector('#enterHeader') || document.body}
          >
            <span className={nickname}>{firstName}</span>
            <ImgWrapper className={arrowDown} alt='arrow down' src='/img/arrow_down_999.png'/>
          </Tooltip>
        </div>
      <ChangePwModal
      visible={showChangePw}
    onOk={onChangePwOk}
    onCancel={onChangePwCancel}
  />
        </div>
    }
  </div>
};

export default Header;
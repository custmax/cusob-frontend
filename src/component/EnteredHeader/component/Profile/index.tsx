import styles from './index.module.scss';
import classNames from 'classnames';
import ImgWrapper from "@/component/ImgWrapper";
import {Popover, Tooltip} from "antd";
import Link from "next/link";
import {clearToken, getLocalUser} from "@/util/storage";
import {FC, useEffect, useState} from "react";
import ChangePwModal from "@/component/ChangePwModal";


type Props = {
    avatar?: string,
}

const {
    ProfileContainer,
    right,
    avatar,
    nickname,
    pop,
    popLink,
} = styles

const Profile : FC<Props> = (props) =>{

    const [showChangePw, setShowChangePw] = useState<boolean>(false);
    const [firstName, setFirstName] = useState<string>()
    const [localAvatar, setLocalAvatar] = useState<string>('')

    useEffect(() => {
        initLocal()
    }, [])

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

    const onChangePwCancel = () => {
        setShowChangePw(false)
    }

    const popContent = (
        <div>
            {/*<Link href='/contactInfo' className={popLink}>User personal information</Link>*/}
            {/*<Link href='/userList' className={popLink}>User Management</Link>*/}
            <div className={popLink} onClick={() => setShowChangePw(true)}>Change Password</div>
            {/*<Link href='/billingHistory' className={popLink}>Billing History</Link>*/}
            {/*<Link href='/' className={popLink} onClick={clearToken}>Sign Out</Link>*/}
        </div>
    )

    return <div className={classNames(ProfileContainer)}>
        <div className={classNames(right)}>
            <ImgWrapper
                className={avatar}
                alt='avatar'
                src={props.avatar || localAvatar || '/img/default-avatar.png'}
            />
            {/*<Popover content={popContent} >*/}
            {/*    <span className={classNames(nickname)}>{firstName}</span>*/}
            {/*</Popover>*/}
        </div>
        <ChangePwModal
            visible={showChangePw}
            onOk={onChangePwOk}
            onCancel={onChangePwCancel}
        />
    </div>
}

export default Profile;
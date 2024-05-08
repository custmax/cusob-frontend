'use client';

import EnteredHeader from "@/component/EnteredHeader";
import SideBar from "@/component/SideBar";
import styles from './page.module.scss';
import {sendTemplate} from "@/server/sendcloud/sendTemplate";
import {Button} from "antd";
import {SUCCESS_CODE} from "@/constant/common";
import {getDomainList, addDomain, updateDomain, checkDomain, deleteDomain} from "@/server/sendcloud/domain";
import {getApiUserList} from "@/server/sendcloud/apiUser";

const {
    sendCloudContainer,
    main,
    btnSend,
} = styles

const SendCloud = () => {

    const onSend = async () => {
        const data = {
            from: 'ming@mail.daybreakhust.top',
            to: '2218098884@qq.com',
            body: {
                subject: 'Thanks',
                template_invoke_name: 'First_Welcome_Email_20240426_KlRwkZGJ'
            }
        }
        const res = await sendTemplate(data)
        console.log(res)
    }

    const getDomain = async () => {
        const res = await getDomainList()
        console.log(res)
    }

    const saveDomain = async () => {
        const res = await addDomain('dlgems.com')
        console.log(res)
    }

    const editDomain = async () => {
        const res = await updateDomain('dlgems.com', 'email-marketing-hub.com')
        console.log(res)
    }

    const verifyDomain = async () => {
        const res = await checkDomain('mail.email-marketing-hub.com')
    }

    const removeDomain = async () => {
        const res = await deleteDomain('daybreakhust.top')
    }

    const findApiUserList = async () => {
        const res = await getApiUserList('')
    }

    return <div className={sendCloudContainer}>
        <EnteredHeader />
        <SideBar />
        <div className={main}>
            <Button className={btnSend} onClick={findApiUserList}>Send</Button>

        </div>
    </div>
}

export default SendCloud;
'use client';

import EnteredHeader from "@/component/EnteredHeader";
import SideBar from "@/component/SideBar";
import styles from './page.module.scss';
import {sendTemplate} from "@/server/sendcloud/sendTemplate";
import {Button} from "antd";
import {SUCCESS_CODE} from "@/constant/common";
import {getDomainList, addDomain} from "@/server/sendcloud/domain";

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

    return <div className={sendCloudContainer}>
        <EnteredHeader />
        <SideBar />
        <div className={main}>
            <Button className={btnSend} onClick={saveDomain}>Send</Button>

        </div>
    </div>
}

export default SendCloud;
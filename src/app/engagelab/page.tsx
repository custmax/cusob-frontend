'use client';

import EnteredHeader from "@/component/EnteredHeader";
import SideBar from "@/component/SideBar";
import styles from './page.module.scss';
import {sendTemplate} from "@/server/engagelab/sendTemplate";
import {Button} from "antd";

const {
    engageLabContainer,
    main,
    btnSend,
} = styles

const EngageLab = () => {

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

    return <div className={engageLabContainer}>
        <EnteredHeader />
        <SideBar />
        <div className={main}>
            <Button className={btnSend} onClick={onSend}>Send</Button>

        </div>
    </div>
}

export default EngageLab;
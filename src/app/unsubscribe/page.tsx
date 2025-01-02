'use client';
import styles from "./page.module.scss"
import {Button, message} from "antd";
import {subscribeCampaign, unsubscribeCampaign} from "@/server/unsubscribe";
import {useSearchParams} from "next/navigation";
import {useEffect} from "react";
import Image from "next/image";
import {SUCCESS_CODE} from "@/constant/common";
import React, { useState } from 'react';

const {
    unsubscribeContainer,
    main,
    cusob,
    logo,
    content,
    txtUnsubscribe,
    btns,
    btnOk,
    btnCancel,
} = styles

const Unsubscribe = () => {
    const searchParams = useSearchParams()
    const emailUnsubscribe = searchParams.get('email')
// 初始化按钮状态，默认为 'unsubscribe'
    const [isSubscribed, setIsSubscribed] = useState(true);

    const unsubscribe = async () => {
        if (emailUnsubscribe) {
            const res = await unsubscribeCampaign(emailUnsubscribe)
            if (res.code === SUCCESS_CODE) {
                message.success("The unsubscription is successful")
            }
        }
        setIsSubscribed(false);
    }
    const subscribe = async () => {
        if (emailUnsubscribe) {
            const res = await subscribeCampaign(emailUnsubscribe)
            if (res.code === SUCCESS_CODE) {
                message.success("The subscription is successful")
            }
        }
        setIsSubscribed(true);
    }

    return <div className={unsubscribeContainer}>
        <div className={main}>
            <div className={cusob}>
                <Image
                    fill
                    className={logo}
                    alt='logo'
                    src='/img/logo.png'
                    sizes='100%'
                    priority
                />
            </div>
            <div className={content}>
                <div className={txtUnsubscribe}>{isSubscribed ? 'Are you sure to unsubscribe?' : 'subscribe again'}</div>
                <div className={btns}>
                    <Button
                        type="primary"
                        className="btnOk"
                        onClick={isSubscribed ? unsubscribe : subscribe}
                    >
                        {isSubscribed ? 'unsubscribe' : 'subscribe again'}
                    </Button>
                </div>
            </div>

        </div>
    </div>
}

export default Unsubscribe;
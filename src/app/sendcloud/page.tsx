'use client';

import EnteredHeader from "@/component/EnteredHeader";
import SideBar from "@/component/SideBar";
import styles from './page.module.scss';
import {sendTemplate} from "@/server/sendcloud/sendTemplate";
import {Button} from "antd";
import {SUCCESS_CODE} from "@/constant/common";
import {getDomainList, addDomain, updateDomain, checkDomain, deleteDomain} from "@/server/sendcloud/domain";
import {getApiUserList, addApiUser} from "@/server/sendcloud/apiUser";
import {getTemplateList, getTemplateDetail, addTemplate, removeTemplate, updateTemplate} from "@/server/sendcloud/template";

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

    const saveApiUser = async () => {
        const res = await addApiUser('cusob_batch02', 'mail.dlgems.com')
    }

    const findTemplateList = async () => {
        const res = await getTemplateList()
    }

    const getTemplate = async () => {
        const res = await getTemplateDetail('template01')
    }

    const saveTemplate = async () => {
        const html = "<table class=\"inner_table\" align=\"center\" width=\"600\">\n" +
            "    <tbody>\n" +
            "        <tr class=\"firstRow\">\n" +
            "            <td align=\"center\" style=\"font-family: Geist, sans-serif; font-size: 38px; -webkit-font-smoothing: subpixel-antialiased; text-size-adjust: 100%; line-height: 46px; text-align: center; font-weight: 600; letter-spacing: -0.04em;\">\n" +
            "                <p style=\"line-height: 64.6px; text-size-adjust: 100%;\">\n" +
            "                    <strong>Vercel Product Update</strong>\n" +
            "                </p>\n" +
            "            </td>\n" +
            "        </tr>\n" +
            "        <tr>\n" +
            "            <td style=\"font-size: 1px; -webkit-font-smoothing: subpixel-antialiased; text-size-adjust: 100%; line-height: 1px;\"></td>\n" +
            "        </tr>\n" +
            "        <tr>\n" +
            "            <td align=\"center\" style=\"font-family: Geist, sans-serif; font-size: 16px; -webkit-font-smoothing: subpixel-antialiased; text-size-adjust: 100%; color: rgb(68, 68, 68); line-height: 24px; text-align: center;\">\n" +
            "                <p>\n" +
            "                    Improved infrastructure pricing | HIPAA compliance | ModelFusion acquisition | Vercel Ship 2024\n" +
            "                </p>\n" +
            "            </td>\n" +
            "        </tr>\n" +
            "    </tbody>\n" +
            "</table>\n" +
            "<p>\n" +
            "    <br/>\n" +
            "</p>"
        const res = await addTemplate('template02', 'template02', html, "Product Update")
    }

    const deleteTemplate = async () => {
        const res = await removeTemplate('template02')
    }

    const editTemplate = async () => {
        const html = "<table class=\"inner_table\" align=\"center\" width=\"600\">\n" +
            "    <tbody>\n" +
            "        <tr class=\"firstRow\">\n" +
            "            <td align=\"center\" style=\"font-family: Geist, sans-serif; font-size: 38px; -webkit-font-smoothing: subpixel-antialiased; text-size-adjust: 100%; line-height: 46px; text-align: center; font-weight: 600; letter-spacing: -0.04em;\">\n" +
            "                <p style=\"line-height: 64.6px; text-size-adjust: 100%;\">\n" +
            "                    <strong>Vercel Product Update</strong>\n" +
            "                </p>\n" +
            "            </td>\n" +
            "        </tr>\n" +
            "        <tr>\n" +
            "            <td style=\"font-size: 1px; -webkit-font-smoothing: subpixel-antialiased; text-size-adjust: 100%; line-height: 1px;\"></td>\n" +
            "        </tr>\n" +
            "        <tr>\n" +
            "            <td align=\"center\" style=\"font-family: Geist, sans-serif; font-size: 16px; -webkit-font-smoothing: subpixel-antialiased; text-size-adjust: 100%; color: rgb(68, 68, 68); line-height: 24px; text-align: center;\">\n" +
            "                <p>\n" +
            "                    Improved infrastructure pricing | HIPAA compliance | ModelFusion acquisition | Vercel Ship 2024\n" +
            "                </p>\n" +
            "            </td>\n" +
            "        </tr>\n" +
            "    </tbody>\n" +
            "</table>\n" +
            "<p>\n" +
            "    <br/>\n" +
            "</p>"
        const res = await updateTemplate('template01', 'template01', html)
    }


    return <div className={sendCloudContainer}>
        <EnteredHeader />
        <SideBar />
        <div className={main}>
            <Button className={btnSend} onClick={editTemplate}>Send</Button>

        </div>
    </div>
}

export default SendCloud;
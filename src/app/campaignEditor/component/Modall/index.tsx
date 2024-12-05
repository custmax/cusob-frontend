'use client'
import {Form, Input, Modal, Select, message, Button} from 'antd';
import {FC, useCallback, useEffect, useRef, useState} from 'react';
import EmailEditor, {EditorRef, EmailEditorProps} from 'react-email-editor';
import styles from './index.module.scss';
import {getTemplate, getTemplateList} from "@/server/template";
import {SUCCESS_CODE} from "@/constant/common";
import {textAlign} from "@mui/system";
import AccountInfo = Info.AccountInfo;
import {getAccountInfo} from "@/server/accountInfo";

type Props = {
    visible: boolean,
    value: string,
    onChange: (val: string) => void,
    onOk: () => void,
    onCancel: () => void,
    onDesignChange: (design: object) => void;
    designContent?: string | null; // 父组件传入的 JSON 数据

}
const {
    contentModal,
    bottomAccountInfo
} = styles;
const Modall: FC<Props> = (props) => {
    const {visible, onOk, onCancel, value, onChange, onDesignChange, designContent} = props;
    const emailEditorRef = useRef<EditorRef>(null);
    const [templateList, setTemplateList] = useState<{ value: number, label: string }[]>([])
    const [accountInfo, setAccountInfo] = useState<AccountInfo>();
    useEffect(() => {
        if (visible) {
            initTemplateList()
            initAccountInfo()
        }
    }, [visible])
    const initTemplateList = async () => {
        const query = {}
        const res = await getTemplateList(query)
        if (res.code === SUCCESS_CODE && res.data) {
            const data = res.data
            const newTemplateList: { value: number, label: string }[] = []
            for (const key in data) {
                const items = data[key]
                items.forEach((i: { id: number, name: string }) => {
                    newTemplateList.push({
                        value: i.id,
                        label: `${key}/${i.name}`,
                    })
                })
            }
            setTemplateList(newTemplateList)
        }
    }

    const initAccountInfo = async () => {
        const res = await getAccountInfo();
        if (res.code === SUCCESS_CODE) {
            setAccountInfo(res.data)
            console.log(accountInfo)
        } else {
            message.error(res.error)
        }
    }

    const onTamplateChange = async (value: number) => {
        if (typeof value === 'number' && !isNaN(value)) {
            message.loading({content: 'loading', duration: 10, key: 'templateLoading'})
            const res = await getTemplate(value)
            message.destroy('templateLoading')
            if (res.code === SUCCESS_CODE && res.data) {
                const {designContent} = res.data || {}
                if (designContent) {
                    try {
                        const design = JSON.parse(designContent);
                        // 使用 emailEditorRef 加载设计数据
                        emailEditorRef.current?.editor?.loadDesign(design);
                    } catch (error) {
                        message.error('加载设计数据失败，请检查 JSON 格式是否正确');
                        console.error('Failed to load design content:', error);
                    }
                }
            }
        }
    }
    const exportHtml = () => {
        const unlayer = emailEditorRef.current?.editor;

        unlayer?.exportHtml((data) => {
            const {design, html} = data;
            var json = data.design;
            onDesignChange(json); // 保存 JSON 数据
            //console.log('exportHtml', json);
            // console.log('exportHtml', html);
            onChange(html); // 更新 richContent
            onOk();
        });
    };

    // 编辑器加载完成时调用
    const onReady: EmailEditorProps['onReady'] = (unlayer) => {
        if (designContent) {
            try {
                try {
                    const design = JSON.parse(designContent);
                    var json = eval('(' + design + ')');
                    console.log('design', json);
                    console.log(typeof json);
                    unlayer.loadDesign(json); // 加载设计数据
                    // 进行后续操作
                } catch (error) {
                    console.error('JSON 解析失败:', error);
                } // 确保 JSON 格式正确

            } catch (error) {
                message.error('加载设计数据失败，请检查 JSON 格式是否正确');
                console.error('Failed to load design content:', error);
            }
        }
    };

    return <Modal
        title="Content"
        open={visible}
        onOk={exportHtml}
        onCancel={onCancel}
        wrapClassName={contentModal}
        width={'80vw'}
    >
        <div>
            {/*<div>*/}
            {/*  <button onClick={exportHtml}>Export HTML</button>*/}
            {/*</div>*/}
            <Form.Item
                label="Template"
                name='template'
            >
                <Select
                    onChange={onTamplateChange}
                    options={templateList}
                />
            </Form.Item>
            <EmailEditor ref={emailEditorRef} onReady={onReady}/>
            <div style={{textAlign: "left", color: "#666666", marginTop: "10px"}}>
                In compliance with the CAN-SPAM Act and related laws, your company and address information will appear at the bottom of the email, and can be updated in your profile.
            </div>
        </div>
    </Modal>
};

export default Modall;

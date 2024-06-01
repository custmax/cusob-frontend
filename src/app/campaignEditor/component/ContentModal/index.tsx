'use client'
import { Form, Input, Modal, Select, message } from 'antd';
import styles from './index.module.scss';
import { FC, forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic'
import { getContact, getList } from '@/server/contact';
import { SUCCESS_CODE } from '@/constant/common';
import { getTemplate, getTemplateList } from '@/server/template';
import Quill from 'quill';

const RichEditor =  dynamic(() => import('@/component/RichEditor/index'), { ssr: false });

type RichEditorProps = {
  onChange: (val: string) => void,
  value: string,
}

const NewRichEditor = forwardRef((props: RichEditorProps, ref) =>
    <RichEditor parentRef={ref} {...props} />)
NewRichEditor.displayName = 'NewRichEditor'


type Props = {
  visible: boolean,
  value: string,
  onChange: (val: string) => void,
  onOk: () => void,
  onCancel: () => void,
}

const {
  contentModal,
  main,
  basicFormWrapper,
  basicForm,
  richTextTitle,
  richText,
  richTextWrapper,
  presetWrapper,
  presetTitle,
  presetItem,
  aiWrapper,
  aiContent,
  buildBtn,
} = styles;

const pageSize = 20;

const ContentModal: FC<Props> = (props) => {
  const { visible, onOk, onCancel, value, onChange } = props;
  const richEditorRef = useRef<{ getEditor: any }>()
  const quillRef = useRef<{ getSelection: any, insertText: any }>()
  const [currentPage, setCurrentPage] = useState(1);
  const [contactList, setContactList] = useState([])
  const [templateList, setTemplateList] = useState<{ value: number, label: string }[]>([])
  const [total, setTotal] = useState(0)
  const [innerContent, setInnerContent] = useState('')
  const [originContact, setOriginContact] = useState<Contact.NewContact | null>(null)

  const initContactList = useCallback(async () => {
    message.loading({ content: 'loading', duration: 10, key: 'loading' })
    const res = await getList(currentPage, pageSize)
    message.destroy('loading')
    if (res.code === SUCCESS_CODE && res.data) {
      setContactList(res.data?.records.map((item: { id: number, firstName: string, lastName: string }) => ({ value: item.id, label: `${item.firstName} ${item.lastName}` })) || [])
      setTotal(res.data?.total || 0)
    }
  }, [currentPage, pageSize])

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

  const initInnerContent = (value: string) => {
    setInnerContent(value)
  }

  useEffect(() => {
    if (visible) {
      initContactList()
      initTemplateList()
    }
  }, [visible])

  useEffect(() => {
    if (value) {
      initInnerContent(value)
    }
  }, [value])

  const _onChange = (value: string) => {
    setInnerContent(value)
    onChange(value)
  }



  const onTamplateChange = async (value: number) => {
    if (typeof value === 'number' && !isNaN(value)) {
      message.loading({ content: 'loading', duration: 10, key: 'templateLoading' })
      const res = await getTemplate(value)
      message.destroy('templateLoading')
      if (res.code === SUCCESS_CODE && res.data) {
        const { content } = res.data || {}
        if (content) {
          const newInnerContent = content + innerContent
          setInnerContent(newInnerContent)
        }
      }
    }
  }

  const onContactChange = async (value: number) => {
    if (typeof value === 'number' && !isNaN(value)) {
      message.loading({ content: 'loading', duration: 10, key: 'contactLoading' })
      const res = await getContact(value)
      message.destroy('contactLoading')
      if (res.code === SUCCESS_CODE) {
        setOriginContact(res.data)
      }
    }
  }

  const insertTextAtCursor = (text:string) => {
    if (richEditorRef.current) {
      const editor = richEditorRef.current.getEditor();
      const position = editor.getSelection()?.index || editor.getLength(); // 获取当前光标位置，如果没有选择范围，则将文本插入到最后
      editor.insertText(position, text);
    }
  };

  const insertFirstName = () => {
    const { firstName = '#{FIRSTNAME}' } = originContact || {};
    insertTextAtCursor(firstName);
  };

  const insertLastName = () => {
    const { lastName = '#{LASTNAME}' } = originContact || {};
    insertTextAtCursor(lastName);
  };

  const insertCompany = () => {
    const { company = '#{COMPANY}' } = originContact || {};
    insertTextAtCursor(company);
  };

  const insertEmail = () => {
    const { email = '#{EMAIL}' } = originContact || {};
    insertTextAtCursor(email);
  };

  const insertTitle = () => {
    const { title = '#{TITLE}' } = originContact || {};
    insertTextAtCursor(title);
  };

  const insertBirthDate = () => {
    const { birthDate = '#{BIRTHDATE}' } = originContact || {};
    insertTextAtCursor(birthDate);
  };

  const insertPhone = () => {
    const { phone = '#{PHONE}' } = originContact || {};
    insertTextAtCursor(phone);
  };

  const insertDept = () => {
    const { dept = '#{DEPT}' } = originContact || {};
    insertTextAtCursor(dept);
  };


  const onAIChange = () => {};
  return <Modal
    title="Content"
    open={visible}
    onOk={onOk}
    onCancel={onCancel}
    wrapClassName={contentModal}
    width={'80vw'}
  >
    <div className={main}>
      <div className={basicFormWrapper}>
        <Form
          name="content"
          className={basicForm}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          labelAlign='left'
          colon={false}
        >
          <Form.Item
            label="Template"
            name='template'
          >
            <Select
              onChange={onTamplateChange}
              options={templateList}
            />
          </Form.Item>
        </Form>
      </div>
      <div className={richTextTitle}>Content</div>
      <div className={richText}>
        <div className={richTextWrapper}>
          <NewRichEditor ref={richEditorRef} value={innerContent} onChange={_onChange} />
        </div>
        <div className={presetWrapper}>
          <div className={presetTitle}>Contact Fields</div>
          <div className={presetItem} onClick={insertFirstName}>*FIRSTNAME</div>
          <div className={presetItem} onClick={insertLastName}>*LASTNAME</div>
          <div className={presetItem} onClick={insertCompany}>*COMPANY</div>
          <div className={presetItem} onClick={insertEmail}>*EMAIL</div>
          <div className={presetItem} onClick={insertTitle}>*TITLE</div>
          <div className={presetItem} onClick={insertBirthDate}>*DEPT</div>
          <div className={presetItem} onClick={insertBirthDate}>*PHONE</div>
          <div className={presetItem} onClick={insertBirthDate}>*BIRTHDAY</div>
        </div>
      </div>
      {/*<div className={aiWrapper}>*/}
      {/*  <Select*/}
      {/*    defaultValue="a1"*/}
      {/*    onChange={onAIChange}*/}
      {/*    options={[*/}
      {/*      { value: 'a1', label: 'AI A1' },*/}
      {/*    ]}*/}
      {/*  />*/}
      {/*  <Input.TextArea className={aiContent} />*/}
      {/*  <div className={buildBtn}>Build</div>*/}
      {/*</div>*/}
    </div>
  </Modal>
};

export default ContentModal;
'use client';
import { Form, Input, Modal, Select, message, Button } from 'antd';
import styles from './index.module.scss';
import React, { FC, forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { generateByGroup, getContact, getList } from '@/server/contact';
import { SUCCESS_CODE } from '@/constant/common';
import {id} from "postcss-selector-parser";
import {getContactByGroup} from "@/server/campaign";

const RichEditor = dynamic(() => import('@/component/RichEditor/index'), { ssr: false });

type RichEditorProps = {
  onChange: (val: string) => void,
  value: string,
};

const NewRichEditor = forwardRef((props: RichEditorProps, ref) =>
    <RichEditor parentRef={ref} {...props} />);
NewRichEditor.displayName = 'NewRichEditor';

type Props = {
  visible: boolean,
  value: string,
  onChange: (val: string) => void,
  onOk: () => void,
  onCancel: () => void,
};

const ContentModal: FC<Props> = (props) => {
  const { visible, onOk, onCancel, value, onChange } = props;
  const [contactList, setContactList] = useState<{ id: number, firstName: string, lastName: string }[]>([]);
  const [selectedContact, setSelectedContact] = useState<number | null>(null);
  const [aiContent, setAiContent] = useState<string>('');
  const richEditorRef = useRef<{ getEditor: any }>();
  const [group, setGroup] = useState<number>();


  const handleContactClick = async (id: number) => {
    setSelectedContact(id);

    // Simulate fetching AI-generated content
    const content = `Generated content for contact ID ${id}`;
    setAiContent(content);
  };

  const handleGenerateAI = async () => {
    if (selectedContact === null) {
      message.error('Please select a contact to generate AI content.');
      return;
    }
    // Call your AI generation logic here
    message.success(`AI content generated for contact ID ${selectedContact}`);
  };

  return (
      <Modal
          title="Content"
          open={visible}
          onOk={onOk}
          onCancel={onCancel}
          wrapClassName={styles.contentModal}
          width={'80vw'}
      >
        <div className={styles.main}>
          <div className={styles.contactList}>
            {contactList.map(contact => (
                <div
                    key={contact.id}
                    className={`${styles.contactCard} ${selectedContact === contact.id ? styles.selected : ''}`}
                    onClick={() => handleContactClick(contact.id)}
                >
                  {contact.firstName} {contact.lastName}
                </div>
            ))}
          </div>

          {selectedContact !== null && (
              <div className={styles.aiWrapper}>
                <h3>AI Generated Content:</h3>
                <div className={styles.aiContent}>
                  {aiContent}
                </div>
                <Button type="primary" onClick={handleGenerateAI}>AI生成</Button>
              </div>
          )}
        </div>
      </Modal>
  );
};

export default ContentModal;

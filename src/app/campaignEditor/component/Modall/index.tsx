'use client'
import { Form, Input, Modal, Select, message, Button } from 'antd';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import EmailEditor, {EditorRef, EmailEditorProps} from 'react-email-editor';
import styles from './index.module.scss';
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

} = styles;
const Modall: FC<Props> = (props) => {
  const { visible, onOk, onCancel, value, onChange ,onDesignChange ,designContent} = props;
  const emailEditorRef = useRef<EditorRef>(null);

  const exportHtml = () => {
    const unlayer = emailEditorRef.current?.editor;

    unlayer?.exportHtml((data) => {
      const { design, html } = data;
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
          // console.log('design', json);
          // console.log(typeof json);
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

      <EmailEditor ref={emailEditorRef} onReady={onReady} />
    </div>
  </Modal>
};

export default Modall;

import { FC, ForwardedRef, LegacyRef, createRef, forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export type ImperativeHandle = {
  getEditor: any
}

type Props = {
  parentRef?: any,
  onChange: (val: string) => void,
  value: string,
}

const RichEditor = (props: Props) => {
  const { parentRef, onChange, value } = props;
  const quillRef: LegacyRef<ReactQuill> = useRef(null)

  useEffect(() => {
    if (parentRef) {
      parentRef.current = quillRef.current
    }
    
  }, [])

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ align: [] }],
      ['link', 'image'],
      ['clean']
    ],

  }

  const _onChange = (val: string) => {
    onChange(val)
  }

  return <div>
    <ReactQuill
      ref={quillRef}
      modules={modules}
      theme="snow"
      value={value}
      onChange={_onChange}
      formats={[
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image', 'video'
      ]}
    />
  </div>
};

export default RichEditor;

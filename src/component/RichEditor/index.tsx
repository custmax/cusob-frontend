import React, {
    FC,
    ForwardedRef,
    LegacyRef,
    createRef,
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    useState
} from 'react';
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

    const {parentRef, onChange, value} = props;
    const quillRef: LegacyRef<ReactQuill> = useRef(null)


    useEffect(() => {
        if (parentRef) {
            parentRef.current = quillRef.current
        }
    }, [])


    const modules = {
        toolbar: {
            container: [
                ['bold', 'italic', 'underline', 'strike'], // 加粗，斜体，下划线，删除线
                ['blockquote', 'code-block'], // 字体样式
                ['link', 'image'], // 上传图片、上传视频
                [{list: 'ordered'}, {list: 'bullet'}], // 有序列表，无序列表
                [{script: 'sub'}, {script: 'super'}], // 下角标，上角标
                // [{ indent: '-1' }, { indent: '+1' }], // 缩进
                [{align: []}], // 居中
                [{color: []}, {background: []}], // 文字颜色、背景颜色选择
                [{direction: 'rtl'}], // 文字输入方向
                [{header: [1, 2, 3, 4, 5, 6, false]}], // 标题
                ['clean'], // 清除样式
            ],
        }
    };

    //   const modules = {
    //       toolbar: [
    //     [{ header: [1, 2, 3, 4, 5, 6, false] }],
    //     ['bold', 'italic', 'underline', 'strike'],
    //     [{ list: 'ordered' }, { list: 'bullet' }],
    //     [{ align: [] }],
    //     ['link','image'],
    //     ['clean'],
    //   ],
    // }


    const _onChange = (val: string) => {
        onChange(val);
    }


    return <div>
        <ReactQuill
            ref={quillRef}
            placeholder="please input context"
            modules={modules}
            theme="snow"
            value={value}
            onChange={_onChange}
            formats={[
                'header', 'font', 'size',
                'bold', 'italic', 'underline', 'strike', 'blockquote',
                'list', 'bullet', 'indent',
                'link',
                'image', 'video',
                "clean"
            ]}
        />

    </div>
};

export default RichEditor;

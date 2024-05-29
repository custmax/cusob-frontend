import { FC, useState } from 'react';
import styles from './index.module.scss';
import { Input, Modal, message } from 'antd';
import { forgetPassword, sendCodeForPassword } from '@/server/user';
import { SUCCESS_CODE } from '@/constant/common';

type Props = {
  visible: boolean,
  onOk: () => void,
  onCancel: () => void,
}

const {
  forgotPwModal,
  forgotPwContent,
  inputItem,
  label,
  addressBox,
  addressValue,
  addressBtn,
  value,
} = styles;

const ForgotPwModal: FC<Props> = (props) => {
  const { visible, onOk, onCancel } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [reTypePassword, setReTypePassword] = useState('');
  const [verifyCode, setVerifyCode] = useState('');
  
  
  const onSend = async () => {
    message.success('send successfully!');
    const res = await sendCodeForPassword({ email })
    if (res.code !== SUCCESS_CODE) {
      message.error(res.message);
    }
  };

  const _onOk = async () => {
    if (password !== reTypePassword) {
      return message.error({ content: 'Make sure the two passwords are the same' })
    }
    const data = {
      email,
      password,
      verifyCode,
    }
    const res = await forgetPassword(data);
    if (res.code === SUCCESS_CODE) {
      message.success(res.message)
    } else {
      message.error(res.message)
    }
    onOk()
  }

  return <Modal
    title="Forgot Password"
    open={visible}
    onOk={_onOk}
    onCancel={onCancel}
    wrapClassName={forgotPwModal}
  >
    <div className={forgotPwContent}>
      <div className={inputItem}>
        <div className={label}>Email Address</div>
        <div className={addressBox}>
          <Input value={email} onChange={e => setEmail(e.target.value)} className={addressValue} />
          <div className={addressBtn} onClick={onSend}>Send</div>
        </div>
      </div>
    </div>
  </Modal>
};

export default ForgotPwModal;

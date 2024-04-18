import styles from './index.module.scss';
import classNames from 'classnames';
import Link from 'next/link'

const {
  signContainer,
  division
} = styles;

const Sign = () => {
  return <div className={classNames(signContainer)}>
    <span>
      <Link href='/login'>Sign in</Link>
    </span>
    {/* <span className={classNames(division)} />
    <span>
      <Link href='/signup'>Sign up</Link>
    </span> */}
  </div>
};

export default Sign;
import { Space } from 'antd';

import './footer.styles.scss';

function Footer() {
  return (
    <footer className='footer'>
      <div className='footer-left'>© 2021 美国188. All rights reserved.</div>
      <div className='footer-right'>
        <Space>
          <a
            className='footer-a'
            href='https://forms.gle/Kz6Ag52opERxskNe8'
            target='_blank'
            rel='nofollow noopener'
          >
            意见反馈
          </a>
          <span></span>
          <a
            className='footer-a'
            href='https://www.termsandconditionsgenerator.com/live.php?token=oVbbzVmGzNiXSbzuUfJUK99PWL7ZIX38'
            target='_blank'
            rel='nofollow noopener'
          >
            条款政策
          </a>
        </Space>
      </div>
    </footer>
  );
}

export default Footer;

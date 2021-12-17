import './footer.styles.scss';

function Footer() {
  return (
    <footer className='footer'>
      <div className='footer-left'>美国188 © 2021. All rights reserved</div>
      <div className='footer-right'>
        <a
          className='feedback'
          href='https://forms.gle/Kz6Ag52opERxskNe8'
          target='_blank'
          rel='noreferrer'
        >
          意见反馈
        </a>
      </div>
    </footer>
  );
}

export default Footer;

import { Carousel } from 'antd';
import { ReactComponent as BrowsingSvg } from '../../assets/undraw_browsing_online_re_umsa.svg';
import { ReactComponent as JobSvg } from '../../assets/undraw_job_offers_kw5d.svg';
import { ReactComponent as NotificationSvg } from '../../assets/undraw_new_notifications_re_xpcv.svg';
import { ReactComponent as PublishSvg } from '../../assets/undraw_publish_post_re_wmql.svg';
import { ReactComponent as InboxSvg } from '../../assets/undraw_inbox_cleanup_re_jcbh.svg';
import { ReactComponent as MessageSvg } from '../../assets/undraw_messaging_app_re_aytg.svg';

import { connect } from 'react-redux';

import './slideshow.styles.scss';

function SlideShow({ isMobile }) {
  return (
    <Carousel autoplay>
      <div>
        <span
          className='slide-content'
          style={!isMobile ? { height: '180px' } : { height: '130px' }}
        >
          <BrowsingSvg className='svg' />
          <JobSvg className='svg' />
        </span>
      </div>
      <div>
        <span
          className='slide-content'
          style={!isMobile ? { height: '180px' } : { height: '130px' }}
        >
          <NotificationSvg className='svg' />
          <PublishSvg className='svg' />
        </span>
      </div>
      <div>
        <span
          className='slide-content'
          style={!isMobile ? { height: '180px' } : { height: '130px' }}
        >
          <InboxSvg className='svg' />
          <MessageSvg className='svg' />
        </span>
      </div>
    </Carousel>
  );
}

const mapSateToProps = (state) => ({
  isMobile: state.isMobile.boolean,
});

export default connect(mapSateToProps)(SlideShow);

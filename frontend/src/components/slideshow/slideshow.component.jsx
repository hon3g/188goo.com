import { Carousel } from 'antd';
import { ReactComponent as BrowsingSvg } from '../../assets/undraw_browsing_online_re_umsa.svg';
import { ReactComponent as JobSvg } from '../../assets/undraw_job_offers_kw5d.svg';

import { connect } from 'react-redux';

import './slideshow.styles.scss';

function SlideShow({ isMobile }) {
  return (
    <Carousel autoplay>
      <div>
        <span className='slide-content' style={!isMobile?{ height: '180px' }:{ height: '130px' }}>
          <BrowsingSvg className='svg' />
          <JobSvg className='svg' />
        </span>
      </div>
      {/* <div>
        <span className='slide-content'>Hello World</span>
      </div> */}
    </Carousel>
  );
}

const mapSateToProps = (state) => ({
  isMobile: state.isMobile.boolean,
});

export default connect(mapSateToProps)(SlideShow);

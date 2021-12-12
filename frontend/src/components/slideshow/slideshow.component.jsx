import { Carousel } from 'antd';
import { ReactComponent as BrowsingSvg } from '../../assets/undraw_browsing_online_re_umsa.svg';
import { ReactComponent as JobSvg } from '../../assets/undraw_job_offers_kw5d.svg';

import './slideshow.styles.scss';

function SlideShow() {
  return (
    <Carousel autoplay>
      <div>
        <span className='slide-content'>
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

export default SlideShow;

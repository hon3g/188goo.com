import { Carousel } from 'antd';
import { ReactComponent as BrowsingSvg } from '../../assets/undraw_browsing_online_re_umsa.svg';
import { ReactComponent as JobSvg } from '../../assets/undraw_job_offers_kw5d.svg';
import { ReactComponent as PostSvg } from '../../assets/undraw_my_personal_files_8krs.svg';
import { ReactComponent as HouseSvg } from '../../assets/undraw_choosing_house_v37h.svg';


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
      <div>
        <span className='slide-content'>
          <PostSvg className='svg' />
          <HouseSvg className='svg' />
        </span>
      </div>
    </Carousel>
  );
}

export default SlideShow;

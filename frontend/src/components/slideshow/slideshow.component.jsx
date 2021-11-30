import { Carousel } from 'antd';

import 'antd/dist/antd.css';
import './slideshow.styles.scss'

function SlideShow() {
  return (
    <Carousel autoplay>
      <div>
        <span className='slide-content'><img className='image' src="https://cdn.pixabay.com/photo/2014/02/17/10/20/statue-of-liberty-267948_1280.jpg" alt="" /></span>
      </div>
    </Carousel>
  );
}

export default SlideShow;

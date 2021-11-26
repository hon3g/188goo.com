import { Carousel } from 'antd';

import 'antd/dist/antd.css';
import './slideshow.styles.scss'

function SlideShow() {
  return (
    <Carousel autoplay>
      <div>
        <h3 className='slide-content'>0</h3>
      </div>
      <div>
        <h3 className='slide-content'>1</h3>
      </div>
      <div>
        <h3 className='slide-content'>2</h3>
      </div>
    </Carousel>
  );
}

export default SlideShow;

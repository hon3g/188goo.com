import { Carousel } from 'antd';

import 'antd/dist/antd.css';
import './slideshow.styles.scss'

function SlideShow() {
  return (
    <Carousel autoplay style={{ maxWidth: '40%' }}>
      <div>
        <h3 className='content'>0</h3>
      </div>
      <div>
        <h3 className='content'>1</h3>
      </div>
      <div>
        <h3 className='content'>2</h3>
      </div>
      <div>
        <h3 className='content'>3</h3>
      </div>
    </Carousel>
  );
}

export default SlideShow;

import { Carousel } from 'antd';

import 'antd/dist/antd.css';
import './slideshow.styles.scss'

function SlideShow() {
  return (
    <Carousel autoplay>
      <div>
        <span className='slide-content'><img className='image' src="https://cdn.pixabay.com/photo/2014/02/17/10/20/statue-of-liberty-267948_1280.jpg" alt="" /></span>
      </div>
      <div>
        <span className='slide-content'><img className='image' src="https://images.unsplash.com/photo-1565062079254-55d1cf8cb64d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2708&q=80" alt="" /></span>
      </div>
      <div>
        <span className='slide-content'><img className='image' src="https://cdn.pixabay.com/photo/2017/08/20/13/07/usa-2661636_1280.jpg" alt="" /></span>
      </div>
    </Carousel>
  );
}

export default SlideShow;

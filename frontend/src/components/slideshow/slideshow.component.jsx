import { Carousel } from 'antd';

import 'antd/dist/antd.css';
import './slideshow.styles.scss'

function SlideShow() {
  return (
    <Carousel autoplay>
      <div>
        <h3 className='slide-content'><img src="https://images.pexels.com/photos/597909/pexels-photo-597909.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" alt="" /></h3>
      </div>
      <div>
        <h3 className='slide-content'><img src="https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="" /></h3>
      </div>
      <div>
        <h3 className='slide-content'><img src="https://images.pexels.com/photos/421927/pexels-photo-421927.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" alt="" /></h3>
      </div>
    </Carousel>
  );
}

export default SlideShow;

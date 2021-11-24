import { Carousel } from 'antd';

function SlideShow() {
  const contentStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    height: '360px',
    color: '#fff',
    textAlign: 'center',
    background: '#364d79',
    marginBottom: '0em',
  };

  return (
    <Carousel autoplay style={{ maxWidth: '40%' }}>
      <div>
        <h3 style={contentStyle}>0</h3>
      </div>
      <div>
        <h3 style={contentStyle}>1</h3>
      </div>
      <div>
        <h3 style={contentStyle}>2</h3>
      </div>
      <div>
        <h3 style={contentStyle}>3</h3>
      </div>
    </Carousel>
  );
}

export default SlideShow;

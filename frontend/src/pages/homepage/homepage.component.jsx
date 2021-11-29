import TopBar from '../../components/topbar/topbar.component';
import SlideShow from '../../components/slideshow/slideshow.component';
import Content from '../../components/content/content.component';

import './homepage.styles.scss';

function HomePage() {
  return (
    <div style={{ backgroundColor: '#f5f5f5' }}>
      <TopBar />
      <SlideShow />
      <Content />
    </div>
  );
}

export default HomePage;

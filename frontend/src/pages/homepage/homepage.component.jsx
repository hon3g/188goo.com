import TopBar from '../../components/topbar/topbar.component';
import Navbar from '../../components/navbar/navbar.component';
import Content from '../../components/content/content.component';
import { useParams } from "react-router-dom";

import './homepage.styles.scss';

const SECTIONS = [
  { title: '招聘求职', url: '#' },
  { title: '房屋租售', url: '#' },
  { title: '本地服务', url: '#' },
  { title: '二手市场', url: '#' },
  { title: '生意转让', url: '#' },
];

function HomePage() {
  const { args } = useParams();
  console.log(args);
  return (
    <div style={{ backgroundColor: '#efeff1' }}>
      <TopBar currentLocation='纽约' />
      <Navbar sections={SECTIONS} />
      <Content />
    </div>
  );
}

export default HomePage;

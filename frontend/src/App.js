import Header from './components/header/header.component';
import Navbar from './components/navbar/navbar.component';
import Content from './components/content/content.component'

import './App.css';

const SECTIONS = [
  { title: '同城聊天', url: '#' },
  { title: '招聘求职', url: '#' },
  { title: '房屋租售', url: '#' },
  { title: '本地服务', url: '#' },
  { title: '二手市场', url: '#' },
  { title: '生意转让', url: '#' },
];

function App() {
  return (
    <div style={{backgroundColor: '#efeff1'}}>
      <Header currentLocation='纽约' />
      <Navbar sections={SECTIONS} />
      <Content />
    </div>
  );
}

export default App;

import { useEffect } from 'react';
import Header from './components/header/header.component';
import Sections from './components/sections/sections.component';
import Navbar from './components/navbar/navbar.component';

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
  useEffect(() => {    
    const baseApi = 'http://127.0.0.1:8000/api/';
    const fetchFunc = async () => {
      const response = await fetch(baseApi);
      const resJson = await response.json();
      console.log(resJson);
    };
    fetchFunc();
  }, []);

  return (
    <div>
      <Header title='华人同城网' currentLocation='纽约' />
      {/* <Sections sections={SECTIONS} /> */}
      <Navbar sections={SECTIONS} />
    </div>
  );
}

export default App;

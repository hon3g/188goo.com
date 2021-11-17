import { useEffect } from 'react';
import './App.css';

import Header from './components/header/header';


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

  return <Header currentCity='纽约' />;
}

export default App;

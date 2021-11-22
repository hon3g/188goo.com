import { useState } from 'react';
import { Menu } from 'antd';

import 'antd/dist/antd.css';

const { SubMenu } = Menu;

function Navbar({ sections }) {
  const [current, setCurrent] = useState('mail0');

  const handleClick = (e) => {
    console.log('click ', e);
    setCurrent(e);
  };

  return (
    <Menu
      className='menu'
      onClick={handleClick}
      selectedKeys={[current]}
      mode='horizontal'
      style={{ display: 'flex', justifyContent: 'center' }}
    >
      {sections.map((section) => (
        <SubMenu
          key={section.title}
          title={section.title}
          style={{ margin: 'auto 1rem' }}
        >
          <Menu.Item key={`${section.title}:0`}>全部</Menu.Item>
          <Menu.Item key={`${section.title}:1`}>Option 1</Menu.Item>
          <Menu.Item key={`${section.title}:2`}>Option 2</Menu.Item>
          <Menu.Item key={`${section.title}:3`}>Option 3</Menu.Item>
        </SubMenu>
      ))}
    </Menu>
  );
}

export default Navbar;

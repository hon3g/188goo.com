import { useState } from 'react';
import { Menu } from 'antd';
import { useLocation } from 'react-router';

import 'antd/dist/antd.css';
import './navbar.styles.scss';

const SECTIONS = [
  {
    type: '招聘求职',
    categories: ['全部招聘', '餐饮招聘', '美甲招聘', '文职招聘', '其他招聘'],
  },
  {
    type: '房屋租售',
    categories: ['全部房屋', '房屋出租', '房屋求租', '店铺出租', '房产出租'],
  },
  {
    type: '生意转让',
    categories: ['全部买卖', '餐馆转让', '甲店转让', '按摩转让', '其他转让'],
  },
  {
    type: '二手买卖',
    categories: ['全部转让', '二手物品', '二手汽车', '餐馆用具'],
  },
];

const { SubMenu } = Menu;

function Navbar() {
  const [current, setCurrent] = useState(null);
  const { search } = useLocation();

  const handleClick = (e) => {
    console.log(search);
    console.log('click ', e.key);
    setCurrent(e.key);
  };

  return (
    <Menu
      className='menu'
      onClick={handleClick}
      selectedKeys={[current]}
      mode='horizontal'
      style={{
        display: 'flex',
        justifyContent: 'center',
        borderBottom: 'none',
      }}
    >
      {SECTIONS.map((section) => (
        <SubMenu key={section.type} title={section.type}>
          {section.categories.map((category) => (
            <Menu.Item key={category}>{category}</Menu.Item>
          ))}
        </SubMenu>
      ))}
    </Menu>
  );
}

export default Navbar;

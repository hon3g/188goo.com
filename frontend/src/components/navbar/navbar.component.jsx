import { useState } from 'react';
import { Menu } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

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
    type: '二手买卖',
    categories: ['全部二手', '二手物品', '二手汽车', '餐馆用具'],
  },
  {
    type: '生意转让',
    categories: ['全部转让', '餐馆转让', '甲店转让', '按摩转让', '其他转让'],
  },
];

const { SubMenu } = Menu;

function Navbar() {
  const [current, setCurrent] = useState(null);
  const { state, city, category } = useParams();
  const currentState = state || '全美';
  const currentCity = city || '全部';
  const navigate = useNavigate();

  const handleClick = (e) => {
    setCurrent(e.key);

    let type;
    switch (e.key) {
      case '全部招聘':
        type = '招聘求职';
        break;
      case '全部房屋':
        type = '房屋租售';
        break;
      case '全部转让':
        type = '生意转让';
        break;
      case '全部二手':
        type = '二手买卖';
        break;
      default:
        type = null;
        break;
    }

    let url = null;
    if (type) {
      url = `/${currentState}/${currentCity}/${type}`;
      type = null;
    } else {
      url = `/${currentState}/${currentCity}/${e.key}`;
    }
    navigate(url);
  };

  return (
    <Menu
      className='menu'
      onClick={handleClick}
      selectedKeys={category ? current : null}
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

import { useState } from 'react';
import { Menu } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';

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
    categories: ['全部转让', '餐馆转让', '甲店转让', '按摩转让', '其他转让'],
  },
  {
    type: '二手买卖',
    categories: ['全部二手', '二手物品', '二手汽车', '餐馆用具'],
  },
];

const { SubMenu } = Menu;

function Navbar() {
  const [current, setCurrent] = useState(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleClick = (e) => {
    setCurrent(e.key);
    const state = searchParams.get('state') || '';

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

    if (type) {
      navigate(`/?${state ? `state=${state}&` : ''}type=${type}`);
      type = null;
    } else {
      navigate(`/?${state ? `state=${state}&` : ''}category=${e.key}`);
    }
  };

  return (
    <Menu
      className='menu'
      onClick={handleClick}
      selectedKeys={
        searchParams.get('type') || searchParams.get('category')
          ? [current]
          : null
      }
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

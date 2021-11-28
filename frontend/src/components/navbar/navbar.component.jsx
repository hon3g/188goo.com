import { useState } from 'react';
import { Menu } from 'antd';

import 'antd/dist/antd.css';

const SECTIONS = [
  { category: '招聘求职', subCategories: ['全部招聘', '餐饮招聘', '美甲招聘', '文职招聘', '其他招聘'] },
  { category: '房屋租售', subCategories: ['全部房屋', '房屋出租', '房屋求租', '店铺出租', '房产出租'] },
  { category: '二手买卖', subCategories: ['全部买卖', '餐馆转让', '甲店转让', '按摩转让', '其他转让'] },
  { category: '生意转让', subCategories: ['全部转让', '二手物品', '二手汽车', '餐馆用具'] },
];

const { SubMenu } = Menu;

function Navbar() {
  const [current, setCurrent] = useState(null);

  const handleClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    <Menu
      className='menu'
      onClick={handleClick}
      selectedKeys={[current]}
      mode='horizontal'
      style={{ display: 'flex', justifyContent: 'center', borderBottom: 'none' }}
    >
      {SECTIONS.map((section) => (
        <SubMenu
          key={section.category}
          title={section.category}
          // style={{ margin: 'auto 1.8vw' }}
        >
          {section.subCategories.map((subCategory) => (
            <Menu.Item key={subCategory} className='sub-category'>{subCategory}</Menu.Item>
          ))}
        </SubMenu>
      ))}
    </Menu>
  );
}

export default Navbar;

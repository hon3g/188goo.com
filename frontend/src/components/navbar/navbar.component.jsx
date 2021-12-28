import { useState, useEffect } from 'react';
import { Menu } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { ReactComponent as ResumeSvg } from '../../assets/resume.svg';
import { ReactComponent as HouseSvg } from '../../assets/house.svg';
import { ReactComponent as OpenboxSvg } from '../../assets/openbox.svg';
import { ReactComponent as MoneySvg } from '../../assets/money.svg';

import { connect } from 'react-redux';

import './navbar.styles.scss';

const SECTIONS = [
  {
    type: '招聘求职',
    categories: [
      '全部招聘',
      '餐饮招聘',
      '美甲招聘',
      '按摩招聘',
      '文职招聘',
      '其他招聘',
    ],
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

function Navbar({ isMobile }) {
  const [current, setCurrent] = useState(null);
  const { state, city, category } = useParams();
  const currentState = state || '全美';
  const currentCity = city || '全部';
  const navigate = useNavigate();

  useEffect(() => {
    let type;
    switch (category) {
      case '招聘求职':
        type = '全部招聘';
        break;
      case '房屋租售':
        type = '全部房屋';
        break;
      case '生意转让':
        type = '全部转让';
        break;
      case '二手买卖':
        type = '全部二手';
        break;
      default:
        type = null;
        break;
    }
    setCurrent(type || category);
  }, [category]);

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

  if (!isMobile) {
    return (
      <Menu
        onClick={handleClick}
        selectedKeys={current}
        mode='horizontal'
        disabledOverflow={true}
        style={{
          borderBottom: 'none',
        }}
      >
        {SECTIONS.map((section) => (
          <SubMenu
            icon={
              section.type === '招聘求职' ? (
                <ResumeSvg className='icon' />
              ) : section.type === '房屋租售' ? (
                <HouseSvg className='icon' />
              ) : section.type === '二手买卖' ? (
                <OpenboxSvg className='icon' />
              ) : section.type === '生意转让' ? (
                <MoneySvg className='icon' />
              ) : null
            }
            key={section.type}
            title={section.type}
          >
            {section.categories.map((category) => (
              <Menu.Item key={category}>
                {category.startsWith('全部') ? category.concat('*') : category}
              </Menu.Item>
            ))}
          </SubMenu>
        ))}
      </Menu>
    );
  } else {
    return (
      <Menu
        onClick={handleClick}
        selectedKeys={current}
        mode='inline'
        triggerSubMenuAction='click'
        style={{
          borderBottom: 'none',
        }}
      >
        {SECTIONS.map((section) => (
          <SubMenu
            icon={
              section.type === '招聘求职' ? (
                <ResumeSvg className='m-icon' />
              ) : section.type === '房屋租售' ? (
                <HouseSvg className='m-icon' />
              ) : section.type === '二手买卖' ? (
                <OpenboxSvg className='m-icon' />
              ) : section.type === '生意转让' ? (
                <MoneySvg className='m-icon' />
              ) : null
            }
            key={section.type}
            title={section.type}
          >
            {section.categories.map((category) => (
              <Menu.Item key={category}>
                {category.startsWith('全部') ? category.concat('*') : category}
              </Menu.Item>
            ))}
          </SubMenu>
        ))}
      </Menu>
    );
  }
}

const mapSateToProps = (state) => ({
  isMobile: state.isMobile.boolean,
});

export default connect(mapSateToProps)(Navbar);

import Toolbar from '@mui/material/Toolbar';
import Link from '@mui/material/Link';
import { ReactComponent as LocationIcon } from '../../assets/location_on_white_24dp.svg';

import './header.styles.scss';

const SECTIONS = [
  { title: null, url: null },
  { title: '同城聊天', url: '#' },
  { title: '招聘求职', url: '#' },
  { title: '房屋租售', url: '#' },
  { title: '本地服务', url: '#' },
  { title: '二手市场', url: '#' },
  { title: '生意转让', url: '#' },
  { title: null, url: null },
];

const Header = ({ currentLocation }) => (
  <nav>

    <nav className='navbar'>
      <div className='title-location'>
        <div className='title'>美国同城</div>
        <div className='location'>
          <LocationIcon />[{currentLocation}]
        </div>
      </div>
      <div className='sign-in'>发布信息</div>
    </nav>

    <Toolbar
      component='nav'
      variant='dense'
      sx={{
        justifyContent: 'space-between',
        overflowX: 'auto',
        backgroundColor: 'white',
        borderBottom: 1,
        borderColor: 'divider',
      }}
    >

      {SECTIONS.map((section) => (
        <Link
          color='inherit'
          noWrap
          key={section.title}
          variant='body2'
          href={section.url}
          sx={{ p: 1, flexShrink: 0, textDecoration: 'none' }}
        >
          {section.title}
        </Link>
      ))}
      
    </Toolbar>

  </nav>
);

export default Header;

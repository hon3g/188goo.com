import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Box from '@mui/system/Box';

const SECTIONS = [
  { title: null, url: null },
  { title: '同城聊天', url: '#' },
  { title: '招聘求职', url: '#' },
  { title: '房屋租售', url: '#' },
  { title: '二手市场', url: '#' },
  { title: '生意转让', url: '#' },
  { title: '本地服务', url: '#' },
  { title: null, url: null },
];

function Header(props) {
  const { currentCity } = props;

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography>{currentCity}</Typography>
          <Button size='small' sx={{ padding: 0 }}>
            [切换城市]
          </Button>
        </Box>
        <Typography
          component='h2'
          variant='h5'
          color='inherit'
          align='center'
          noWrap
          sx={{ flex: 1 }}
        >
          <Link href='' underline='hover' color='inherit'>
            美国同城
          </Link>
        </Typography>
        <Button variant='outlined' size='small'>
          登陆 / 注册
        </Button>
      </Toolbar>

      <Toolbar
        component='nav'
        variant='dense'
        sx={{ justifyContent: 'space-between', overflowX: 'scroll' }}
      >
        {SECTIONS.map((section) => (
          <Link
            color='inherit'
            noWrap
            key={section.title}
            variant='body2'
            href={section.url}
            sx={{ p: 1, flexShrink: 0 }}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </React.Fragment>
  );
}

export default Header;

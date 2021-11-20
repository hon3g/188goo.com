import Toolbar from '@mui/material/Toolbar';
import Link from '@mui/material/Link';

const Sections = ({ sections }) => (
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
    <br />
    {sections.map((section) => (
      <Link
        color='inherit'
        noWrap
        key={section.title}
        variant='body2'
        href={section.url}
        sx={{
          p: 1,
          flexShrink: 0,
          textDecoration: 'none',
          '&:hover': { textDecoration: 'underline' },
        }}
      >
        {section.title}
      </Link>
    ))}
    <br />
  </Toolbar>
);

export default Sections;

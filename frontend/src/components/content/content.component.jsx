import SlideShow from '../slideshow/slideshow.component';
import CookieCrumb from '../cookiecrumb/cookiecrumb.component';
import PostList from '../post-list/post-list.component';
import RadioGroup from '../radio-group/radio-group.component';


function Content() {
  return (
    <div style={{ maxWidth: '90%', margin: '0 auto' }}>
      <br />
      <SlideShow />
      <br />
      <div
        style={{ backgroundColor: 'white', maxWidth: '75%', padding: '1.5rem' }}
      >
        <CookieCrumb />
        <RadioGroup />
        <PostList />
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

export default Content;

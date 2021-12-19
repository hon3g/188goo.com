import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, useLocation } from 'react-router-dom';

function Head() {
  const { state, city, category } = useParams();
  const { pathname } = useLocation();

  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [keywords, setKeywords] = useState();

  useEffect(() => {
    if (pathname === '/chat') {
      
    }
  }, [state, city, category, pathname]);

  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
    </Helmet>
  );
}

export default Head;

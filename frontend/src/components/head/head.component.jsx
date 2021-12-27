import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, useLocation } from 'react-router-dom';

function Head() {
  const { state, city, category } = useParams();
  const { pathname } = useLocation();

  const [title, setTitle] = useState('美国188，找工，租房，二手，转让，免费发布，在线聊天，168地区');
  const [description, setDescription] = useState('美国188，为美华人提供一个简单易用的信息网站，招聘求职，房屋租售，二手买卖，生意转让，在线聊天');
  const [keywords, setKeywords] = useState('美国188,找工作,租房,二手,转让,招聘求职,房屋租售,二手买卖,生意转让,发布信息,在线聊天,华人168');

  useEffect(() => {
    if (pathname === '/') {
      return;
    } else {
      setTitle(`美国188，${state||''}${city||''}，${category||'找工 租房 二手 转让'}，免费发布，在线聊天，${state||''}168`);
      setDescription(`美国188 为${state||''}华人提供一个简单易用的信息网站，${category||'找工 租房 二手 转让'}，在线聊天，${city||''}`);
      setKeywords(`美国188,${state||''}${city||''}找工作,${state||''}${city||''}租房,${state||''}${city||''}二手,${state||''}${city||''}转让,在线聊天,${state||''}${city||''}168,华人168`);
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

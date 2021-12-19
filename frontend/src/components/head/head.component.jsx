import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, useLocation } from 'react-router-dom';

function Head() {
  const { state, city, category } = useParams();
  const { pathname } = useLocation();

  const [title, setTitle] = useState('美国188 找工 租房 二手 转让 免费发布 168地区 在线聊天');
  const [description, setDescription] = useState('美国188 为美华人提供一个简单易用的信息网站, 专注华人 招聘求职, 房屋租售, 二手买卖, 生意转让, 在线聊天');
  const [keywords, setKeywords] = useState('美国188, 找工作, 租房, 二手, 转让, 地区168, 招聘求职, 房屋租售, 二手买卖, 生意转让, 发布信息, 在线聊天');

  useEffect(() => {
    if (pathname === '/') {
      return;
    } else if (pathname === '/chat') {
      setTitle(`美国188 在线聊天`);
      setDescription(`美国188 在线聊天 为在美华人提供一个简单易用的 信息网站`);
      setKeywords(`美国188, 聊天168, 招聘求职, 房屋租售, 二手买卖, 生意转让, 发布信息`);
    } else {
      setTitle(`美国188 ${state||''} ${city||''} ${category||'找工 租房 二手 转让'} 免费发布 ${state||'地区'}168 在线聊天`);
      setDescription(`美国188 为${state||'美国'}华人提供一个简单易用的 ${city||''} ${category||'找工 租房 二手 转让'} 信息网站 在线聊天`);
      setKeywords(`美国188, ${state||''}, ${city||''}, 找工作, 租房, 二手, 转让, ${state||''}168, 招聘求职, 房屋租售, 二手买卖, 生意转让, 发布信息, 在线聊天`);
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

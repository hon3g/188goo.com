import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, useLocation } from 'react-router-dom';

import { STATES } from '../post-list/constants';

function Head() {
  const { state, city, category } = useParams();
  const { pathname } = useLocation();

  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [keywords, setKeywords] = useState();

  useEffect(() => {
    let location = null;
    if (city !== undefined && city !== '全部') {
      location = city;
    } else {
      location = state;
    }

    let kind = null;
    if (category !== undefined) {
      kind = category;
    } else {
      kind = '找工，租房，二手，转让'
    }

    if (!STATES.has(state)) {
      setTitle(`美国188：找工，租房，二手，转让，在线聊天`);
      setDescription(`美国188(us-188.com)，为在美国的华人提供一个方便易用的分类信息和聊天网站，免费发布信息，招聘求职，房屋租售，二手买卖，生意转让，在线聊天`);
      setKeywords(`美国188,找工作,租房,二手,转让,招聘求职,房屋租售,二手买卖,生意转让,在线聊天,发布信息,168`);
    } else {
      setTitle(`美国188：${location}，${kind}，在线聊天`);
      setDescription(`美国188(us-188.com)，为在${location}的华人提供一个方便易用的分类信息和聊天网站，免费发布信息，${location}招聘求职，${location}房屋租售，${location}二手买卖，${location}生意转让，在线聊天`);
      setKeywords(`美国188,${location}找工作,${location}租房,${location}二手,${location}转让,${location}招聘求职,${location}房屋租售,${location}二手买卖,${location}生意转让,${location}在线聊天,${location}发布信息,${location}168`);
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

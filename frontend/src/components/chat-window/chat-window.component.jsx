import { useState } from 'react';
import { Input } from 'antd';
import { ReactComponent as EmojiSvg } from '../../assets/insert_emoticon_black_24dp.svg';

import Picker from 'emoji-picker-react';

import './chat-window.styles.scss';

function ChatWindow() {
  const [input, setInput] = useState('');
  const [showPicker, setShowPicker] = useState();

  const onEmojiClick = (_, emojiObject) => {
    setInput((pre) => pre + emojiObject.emoji);
  };

  return (
    <div className='chat-window'>
      <div className='chat-content' onClick={() => setShowPicker(false)}></div>
      <div className='chat-bottom'>
        <Input.Group compact>
          <Input
            placeholder='说点什么...'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onPressEnter={() => console.log('Entered!!!')}
            style={{ lineHeight: '1.2em' }}
            suffix={
              <EmojiSvg
                className='e'
                onClick={() => setShowPicker((pre) => !pre)}
              />
            }
          />
        </Input.Group>
      </div>
      {showPicker ? (
        <Picker
          onEmojiClick={onEmojiClick}
          disableSearchBar={true}
          native={true}
          pickerStyle={{ width: '100%' }}
        />
      ) : null}
    </div>
  );
}

function ChatMsg(msg, photoUrl) {
  return (
    <div>
      <img src={photoUrl} alt='' />
      <p>{msg}</p>
    </div>
  );
}

export default ChatWindow;

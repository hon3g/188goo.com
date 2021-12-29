import { useState, useEffect, useRef } from 'react';
import { Input, Avatar } from 'antd';
import { ReactComponent as EmojiSvg } from '../../assets/sentiment_satisfied_black_24dp.svg';

import Picker from 'emoji-picker-react';

import { db } from '../../firebase/firebase';
import {
  collection,
  addDoc,
  Timestamp,
  onSnapshot,
  query,
  orderBy,
  limit,
} from 'firebase/firestore';

import { connect } from 'react-redux';
import { setSignInDrawerVisible } from '../../redux/signin-drawer/signin-drawer.actions';

import './chat-window.styles.scss';

function ChatWindow({ currentUser, setSignInDrawerVisible, isMobile }) {
  const [input, setInput] = useState('');
  const [showPicker, setShowPicker] = useState();
  const [messages, setMessages] = useState([]);
  const inputRef = useRef();
  const chatBottom = useRef();

  useEffect(() => {
    let q = query(
      collection(db, 'chatMessages'),
      orderBy('createdAt', 'desc'),
      limit(20)
    );
    const unsubscribeFromCollection = onSnapshot(q, (querySnapshot) => {
      const _messages = [];
      querySnapshot.forEach((doc) => {
        _messages.push(doc.data());
      });
      setMessages(_messages);
    });
    return () => {
      unsubscribeFromCollection();
    };
  }, []);

  const onEmojiClick = (_, emojiObject) => {
    setInput((pre) => pre + emojiObject.emoji);
    inputRef.current.focus();
  };

  const sendMessage = async () => {
    if (!currentUser) {
      setSignInDrawerVisible(true);
      return;
    }
    if (!input.replace(/\s+/g, '')) {
      return;
    }
    setInput('');
    try {
      await addDoc(collection(db, 'chatMessages'), {
        createdAt: Timestamp.fromDate(new Date()),
        displayName: currentUser.displayName,
        photoURL: currentUser.photoURL,
        text: input,
        uid: currentUser.uid,
      });
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <div className='chat-window'>
      <div className='chat-content' onClick={() => setShowPicker(false)}>
        {messages &&
          messages.map((msg) => (
            <ChatMsg key={msg.createdAt} msg={msg} isMobile={isMobile} />
          ))}
        <div ref={chatBottom} />
      </div>
      <div className='chat-bottom'>
        <Input
          ref={inputRef}
          placeholder='说点什么...'
          maxLength={50}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onPressEnter={sendMessage}
          size={isMobile?'large':null}
          suffix={
            <EmojiSvg
              className='e'
              onClick={() => setShowPicker((pre) => !pre)}
            />
          }
        />
      </div>
      {showPicker ? (
        <Picker
          onEmojiClick={onEmojiClick}
          disableSearchBar={true}
          native={true}
          groupVisibility={{ recently_used: false, flags: false }}
          pickerStyle={{ width: '100%', overflow: 'visible' }}
        />
      ) : null}
    </div>
  );
}

function ChatMsg(props) {
  const { photoURL, displayName, text } = props.msg;
  const isMobile = props.isMobile;
  return (
    <div className='chat-msg' style={isMobile ? { fontSize: '16px' } : null}>
      <Avatar
        className='chat-photo'
        src={photoURL || null}
        alt='profile photo'
      />
      <span className='chat-name'>{displayName}</span>
      <span>{text}</span>
    </div>
  );
}

const mapSateToProps = (state) => ({
  currentUser: state.user.currentUser,
  isMobile: state.isMobile.boolean,
});

const mapDispatchToProps = (dispatch) => ({
  setSignInDrawerVisible: (visible) =>
    dispatch(setSignInDrawerVisible(visible)),
});

export default connect(mapSateToProps, mapDispatchToProps)(ChatWindow);

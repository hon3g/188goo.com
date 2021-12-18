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

function ChatWindow({ currentUser, setSignInDrawerVisible }) {
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

  // useEffect(() => {
  //   inputRef.current.focus();
  //   chatBottom.current.scrollIntoView({
  //     behavior: 'smooth',
  //     inline: 'start',
  //     block: 'nearest',
  //   });
  // }, [messages]);

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
    <div className='m-chat-window'>
      <div className='m-chat-content' onClick={() => setShowPicker(false)}>
        {messages &&
          messages.map((msg) => <ChatMsg key={msg.createdAt} msg={msg} />)}
        <div ref={chatBottom} />
      </div>
      <div className='m-chat-bottom'>
        <Input.Group compact>
          <Input
            ref={inputRef}
            placeholder='说点什么...'
            maxLength={50}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onPressEnter={sendMessage}
            style={{ lineHeight: '1.2em' }}
            suffix={
              <EmojiSvg
                className='m-e'
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
          pickerStyle={{ width: '100%', overflow: 'visible' }}
        />
      ) : null}
    </div>
  );
}

function ChatMsg(props) {
  const { photoURL, displayName, text } = props.msg;
  return (
    <div className='m-chat-msg'>
      <Avatar
        className='m-chat-photo'
        src={photoURL || null}
        alt='profile photo'
      />
      <span className='m-chat-name'>{displayName}</span>
      <span>{text}</span>
    </div>
  );
}

const mapSateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setSignInDrawerVisible: (visible) =>
    dispatch(setSignInDrawerVisible(visible)),
});

export default connect(mapSateToProps, mapDispatchToProps)(ChatWindow);

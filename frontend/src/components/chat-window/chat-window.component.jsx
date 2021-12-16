import { useState, useEffect, useRef } from 'react';
import { Input, Avatar } from 'antd';
import { ReactComponent as EmojiSvg } from '../../assets/insert_emoticon_black_24dp.svg';

import Picker from 'emoji-picker-react';

import { db } from '../../firebase/firebase';
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  limit,
} from 'firebase/firestore';

import { connect } from 'react-redux';
import { setSignInDrawerVisible } from '../../redux/signin-drawer/signin-drawer.actions';

import UserIcon from '../../assets/user.png';

import './chat-window.styles.scss';

function ChatWindow({ currentUser, setSignInDrawerVisible }) {
  const [input, setInput] = useState('');
  const [showPicker, setShowPicker] = useState(true);
  const [messages, setMessages] = useState([]);
  const inputRef = useRef();
  const chatBottom = useRef();

  useEffect(() => {
    let q = query(
      collection(db, 'chatMessages'),
      orderBy('createdAt', 'desc'),
      limit(20)
    );
    const unsub = onSnapshot(q, (querySnapshot) => {
      const _messages = [];
      querySnapshot.forEach((doc) => {
        _messages.push(doc.data());
      });
      setMessages(_messages);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    chatBottom.current.scrollIntoView({
      behavior: 'smooth',
      inline: 'start',
      block: 'nearest',
    });
  }, [messages]);

  const onEmojiClick = (_, emojiObject) => {
    setInput((pre) => pre + emojiObject.emoji);
    inputRef.current.focus();
  };

  const sendMessage = async () => {
    if (!currentUser) {
      setSignInDrawerVisible(true);
      return;
    }
    setInput('');
    try {
      await addDoc(collection(db, 'chatMessages'), {
        createdAt: serverTimestamp(),
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
    <>
      <div className='chat-window'>
        <div className='chat-content'>
          {messages &&
            messages
              .slice(0)
              .reverse()
              .map((msg) => <ChatMsg key={msg.createdAt} msg={msg} />)}
          <div ref={chatBottom} />
        </div>
        <div className='chat-bottom'>
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
                  className='e'
                  onClick={() => setShowPicker((pre) => !pre)}
                />
              }
            />
          </Input.Group>
        </div>
      </div>
      {showPicker ? (
        <Picker
          onEmojiClick={onEmojiClick}
          disableSearchBar={true}
          native={true}
          pickerStyle={{ width: '100%' }}
        />
      ) : null}
    </>
  );
}

function ChatMsg(props) {
  const { photoURL, displayName, text } = props.msg;
  return (
    <div className='chat-msg'>
      <Avatar className='chat-photo' src={photoURL || UserIcon} alt='profile photo'/>
      <span className='chat-name'>{displayName}</span>
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

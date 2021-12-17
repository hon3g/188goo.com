import HomePage from './pages/homepage/homepage.component';
import MobilePage from './pages/mobilepage/mobilepage.component';
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { auth } from './firebase/firebase';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';

import './App.css';

function App({ setCurrentUser }) {
  useEffect(() => {
    console.log(window.screen.width);
    const unsubscribeFromAuth = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return () => unsubscribeFromAuth();
  }, [setCurrentUser]);

  if (window.screen.width >= 852) {
    return (
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/:state' element={<HomePage />} />
        <Route path='/:state/:city' element={<HomePage />} />
        <Route path='/:state/:city/:category' element={<HomePage />} />
      </Routes>
    );
  } else {
    return (
      <Routes>
        <Route path='/' element={<MobilePage />} />
        <Route path='/:state' element={<MobilePage />} />
        <Route path='/:state/:city' element={<MobilePage />} />
        <Route path='/:state/:city/:category' element={<MobilePage />} />
      </Routes>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(null, mapDispatchToProps)(App);

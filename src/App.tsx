import React from 'react'
import AppBarContainer from './components/AppBar';
import HomeContainer from './components/HomeContainer';

function App() {

  return (
    <>
      <AppBarContainer/>
      <HomeContainer />
    </>
  );
}

export default React.memo(App);

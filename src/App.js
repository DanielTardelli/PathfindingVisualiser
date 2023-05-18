import logo from './logo.svg';
import './App.css';
import Layout from './Components/Layout';
import Grid from './Components/Grid';
import React, { useRef } from 'react';

// app notes
// -1 = wall aka cant go there
// 0 = neutral
// 1 = starting point
// 2 = ending  point

function App() {
  const [penType, setPenType] = React.useState(0)
  
  return (
    <Layout pt={penType} setPT={setPenType}>
      <Grid pt={penType} size={50}/>
    </Layout>
  );
}

export default App;

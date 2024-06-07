import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './screens/home';
import Section1 from './screens/section1';
import Section2 from './screens/section2';
import Section3 from './screens/section3';

const App = () => {
  return (
    <Router>
      <div id="main">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/section1" element={<Section1 />} />
            <Route path="/section2" element={<Section2 />} />
            <Route path="/section3" element={<Section3 />} />
          </Routes>
      </div>
    </Router>
  );
};

export default App;

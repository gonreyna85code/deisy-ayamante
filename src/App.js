import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import './i18n';
import Home from './screens/home';
import BooksSection from './screens/BooksSection';
import Meditations from './screens/Meditations';
import Sessions from './screens/Sessions';

const App = () => {
  return (
    <Router>
      <div id="main">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/booksSection" element={<BooksSection />} />
            <Route path="/meditations" element={<Meditations />} />
            <Route path="/sessions" element={<Sessions />} />
          </Routes>
      </div>
    </Router>
  );
};

export default App;

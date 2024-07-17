import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { scroller } from 'react-scroll';
import './i18n';
import './assets/main.css';
import Home from './screens/home';
import BooksSection from './screens/BooksSection';
import Meditations from './screens/Meditations';
import Sessions from './screens/Sessions';
import Admin from './screens/Admin';
import Blog from './screens/Blog';
import Landing from './screens/Landing';

const App = () => {
  const { t } = useTranslation();
  const [isReactNavVisible, setIsReactNavVisible] = useState(false);

  const handleScroll = (target) => {
    scroller.scrollTo(target, {
      duration: 1500,
      delay: 1,
      smooth: 'easeInOutQuart'
    });
  };

  const handleReactNavLinkClick = () => {
    setIsReactNavVisible(true);
  };

  const handleMainSiteLinkClick = () => {
    setIsReactNavVisible(false);
  };

  const toggleMenu = () => {
    setIsReactNavVisible(!isReactNavVisible);
    document.body.classList.toggle('header-visible', !isReactNavVisible);
  };

  return (
    <Router>
      <div id="body" classname="is-preload" >
        <button id="headerToggle" className="hamburger-button" onClick={toggleMenu}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <div id="header">
          <div className="top">
            <div id="logo">
              <span className="image avatar48"><img src="images/avatar.png" alt="" /></span>
              <h1 id="title">The Therapist <br /> Paradox</h1>
              <p>{t('landing.subtitle')}</p>
            </div>
            <nav id="nav">
              <ul id="main-nav" style={{ display: isReactNavVisible ? 'none' : 'block' }}>
                <li>
                  <Link to="/home" onClick={handleReactNavLinkClick} id="react-app-link">
                    <span className="icon solid fa-leaf">{t('landing.enter')}</span>
                  </Link>
                </li>
                <li>
                  <Link onClick={() => handleScroll('about')}>
                    <span className="icon solid fa-user">{t('landing.aboutMe')}</span>
                  </Link>
                </li>
                <li>
                  <Link onClick={() => handleScroll('portfolio')}>
                    <span className="icon solid fa-th">{t('landing.portfolio')}</span>
                  </Link>
                </li>
                <li>
                  <Link onClick={() => handleScroll('contact')}>
                    <span className="icon solid fa-envelope">{t('landing.contact')}</span>
                  </Link>
                </li>
              </ul>
              <ul id="react-nav" style={{ display: isReactNavVisible ? 'block' : 'none' }}>
                <li>
                  <Link to="/" onClick={handleMainSiteLinkClick} id="main-site-link">
                    <span className="icon solid fa-arrow-left">{t('landing.back')}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/booksSection" id="section1-link">
                    <span className="icon solid fa-book">{t('landing.books')}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/meditations" id="section2-link">
                    <span className="icon solid fa-spa">{t('landing.meditations')}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/blog" id="section1-link">
                    <span className="icon solid fa-newspaper">{t('landing.blog')}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/sessions" id="section3-link">
                    <span className="icon solid fa-user-friends">{t('landing.sessions')}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/admin" id="section3-link">
                    <span className="icon solid fa-cogs">{t('landing.administration')}</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="bottom">
            <ul className="icons">
              <li><a href="www.instagram.com" className="icon brands fa-instagram"><span className="label">Instagram</span></a></li>
              <li><a href="www.facebook.com" className="icon brands fa-facebook-f"><span className="label">Facebook</span></a></li>
              <li><a href="www.github.com" className="icon solid fa-envelope"><span className="label">Email</span></a></li>
            </ul>
          </div>
        </div>
        <div id="main">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/home" element={<Home />} />
            <Route path="/booksSection" element={<BooksSection />} />
            <Route path="/meditations" element={<Meditations />} />
            <Route path="/sessions" element={<Sessions />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/blog" element={<Blog />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { scroller } from 'react-scroll';
import './i18n';
import './assets/styles.css';
import Home from './screens/home';
import Register from './screens/Admin/Register';
import BooksSection from './screens/BooksSection';
import Login from './screens/Login';
import Meditations from './screens/Meditations';
import Services from './screens/Services';
import Admin from './screens/Admin';
import Blog from './screens/Blog';
import Landing from './screens/Landing';
import avatarImage from './assets/images/avatar.png';

const App = () => {
  return (
    <Router>
      <MainApp />
    </Router>
  );
};

const MainApp = () => {
  const { t } = useTranslation();
  const [isReactNavVisible, setIsReactNavVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const paths = ['/home', '/booksSection', '/meditations', '/services', '/admin', '/blog'];
    if (paths.includes(location.pathname)) {
      setIsReactNavVisible(true);
    }
  }, [location.pathname]);

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
    document.body.classList.toggle('header-visible');
  };

  return (
    <div id="body" className="is-preload" >
      <button id="headerToggle" className="hamburger-button" onClick={toggleMenu}>
        <FontAwesomeIcon icon={faBars} />
      </button>
      <div id="header">
        <div className="top">
          <div id="logo">
            <span className="image avatar48"><img src={avatarImage} alt="" /></span>
            <h1 id="title">Therapist <br /> Paradox</h1>
            <p>{t('landing.subtitle')}</p>
          </div>
          <nav id="nav">
            <ul id="main-nav" style={{ display: isReactNavVisible ? 'none' : 'block' }}>
              <li>
                <Link to="/home" onClick={() => { toggleMenu(); handleReactNavLinkClick() }} id="react-app-link">
                  <span className="icon solid fa-leaf">{t('landing.enter')}</span>
                </Link>
              </li>
              <li>
                <Link onClick={() => { handleScroll('about'); toggleMenu(); }}>
                  <span className="icon solid fa-user">{t('landing.aboutMe')}</span>
                </Link>
              </li>
              <li>
                <Link onClick={() => { handleScroll('portfolio'); toggleMenu(); }}>
                  <span className="icon solid fa-th">{t('landing.portfolio')}</span>
                </Link>
              </li>
              <li>
                <Link onClick={() => { handleScroll('contact'); toggleMenu(); }}>
                  <span className="icon solid fa-envelope">{t('landing.contact')}</span>
                </Link>
              </li>
            </ul>
            <ul id="react-nav" style={{ display: isReactNavVisible ? 'block' : 'none' }}>
              <li>
                <Link to="/" onClick={() => { toggleMenu(); handleMainSiteLinkClick() }} id="main-site-link">
                  <span className="icon solid fa-arrow-left">{t('landing.back')}</span>
                </Link>
              </li>
              <li>
                <Link onClick={toggleMenu} to="/booksSection" id="section1-link">
                  <span className="icon solid fa-book">{t('landing.books')}</span>
                </Link>
              </li>
              <li>
                <Link onClick={toggleMenu} to="/meditations" id="section2-link">
                  <span className="icon solid fa-spa">{t('landing.meditations')}</span>
                </Link>
              </li>
              <li>
                <Link onClick={toggleMenu} to="/blog" id="section1-link">
                  <span className="icon solid fa-newspaper">{t('landing.blog')}</span>
                </Link>
              </li>
              <li>
                <Link onClick={toggleMenu} to="/services" id="section3-link">
                  <span className="icon solid fa-user-friends">{t('landing.services')}</span>
                </Link>
              </li>
              <li>
                <Link onClick={toggleMenu} to="/admin" id="section3-link">
                  <span className="icon solid fa-cogs">{t('landing.administration')}</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <Login/>
        <div className="bottom">
          <ul className="icons">
            <li><a href="https://www.instagram.com" className="icon brands fa-instagram"><span className="label">Instagram</span></a></li>
            <li><a href="https://www.facebook.com" className="icon brands fa-facebook-f"><span className="label">Facebook</span></a></li>
            <li><a href="https://www.github.com" className="icon solid fa-envelope"><span className="label">Email</span></a></li>
          </ul>
        </div>
      </div>
      <div id="main">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/booksSection" element={<BooksSection />} />
          <Route path="/meditations" element={<Meditations />} />
          <Route path="/services" element={<Services />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;

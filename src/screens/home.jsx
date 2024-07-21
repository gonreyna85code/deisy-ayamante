import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Home = () => {
    const { t } = useTranslation();

    return (
        <section id="section1" className="two">
            <div className="container">
                <header>
                    <h2>{t('home.start')}</h2>
                </header>
                <p>
                    {t('home.section_intro')}
                </p>
                <div className="mobile-buttons">
                    <Link to="/booksSection" className="button mobile-button">{t('home.books')}</Link>
                    <Link to="/meditations" className="button mobile-button">{t('home.meditations')}</Link>
                    <Link to="/services" className="button mobile-button">{t('home.services')}</Link>
                    <Link to="/admin" className="button mobile-button">{t('home.admin')}</Link>
                </div>
            </div>
        </section>
    );
}

export default Home;

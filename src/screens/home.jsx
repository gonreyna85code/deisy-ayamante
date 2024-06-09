import React from 'react';
import { useTranslation } from 'react-i18next';

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
            </div>
        </section>
    );
}

export default Home;

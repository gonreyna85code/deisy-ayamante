import React from 'react';
import { useTranslation } from 'react-i18next';

const Sessions = () => {
    const { t } = useTranslation();
    return (
        <section id="section1" className="two">
            <div className="container">
                <header>
                <h2>{t('sessions.title')}</h2>
                <p>{t('sessions.subtitle')}</p>
                </header>
            </div>
        </section>
    );
}

export default Sessions;
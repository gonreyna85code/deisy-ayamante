import React from 'react';
import { useTranslation } from 'react-i18next';

const Meditations = () => {
    const { t } = useTranslation();
    return (
        <section id="section1" className="two">
            <div className="container">
                <header>
                    <h2>{t('meditations.title')}</h2>
                    <p>{t('meditations.subtitle')}</p>
                </header>
                <iframe title='Conscientes' style={{ "borderRadius": "12px" }} src="https://open.spotify.com/embed/playlist/2iRWhqVHYvcbDMmHzofe4u?utm_source=generator" width="100%" height="600px" frameBorder="0" allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
            </div>
        </section>
    );

}

export default Meditations;
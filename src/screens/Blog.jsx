import React from 'react';
import { useTranslation } from 'react-i18next';

const Blog = () => {
    const { t } = useTranslation();
    return (
        <section id="section1" className="two">
            <div className="container">
                <header>
                <h2>{t('blog.title')}</h2>
                <p>{t('blog.subtitle')}</p>
                </header>
            </div>
        </section>
    );
}

export default Blog;
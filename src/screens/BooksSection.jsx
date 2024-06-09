import React from 'react';
import { useTranslation } from 'react-i18next';

const BooksSection = () => {
    const { t } = useTranslation();

    return (
        <section id="books" className="books-section">
            <div className="container">
                <header>
                <h2><p>{t('books.title')}</p></h2>
                </header>                
                <div className="books-grid">
                    {t('books.booksList', { returnObjects: true }).map((book, index) => (
                        <div className="book" key={index}>
                            <h3>{book.title}</h3>
                            <p>{book.description}</p>
                            <p><img src={book.image} alt={book.title} /></p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BooksSection;

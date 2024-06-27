import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { useTranslation } from 'react-i18next';
import pdf from '../files/E-book 7 claves.pdf';
import bookImage from '../files/E-book 7 claves.png';
import { pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { saveAs } from 'file-saver';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const BooksSection = () => {
    const { t } = useTranslation();
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    function handleDownload() {
        saveAs(pdf, 'E-book 7 claves.pdf');
    }

    function handleRead() {
        // Lógica para navegar o leer el PDF
        alert('Leer PDF');
    }

    return (
        <section id="books" className="books-section">
            <div className="container">
                <header>
                    <h2>{t('books.title')}</h2>
                </header>
                <div className="books-grid">
                    <div className="pdf-container">
                        {/* <Document
                            file={pdf}
                            onLoadSuccess={onDocumentLoadSuccess}
                            className="pdf-document"
                        >
                            <Page pageNumber={pageNumber} className="pdf-page" />
                        </Document> */}
                        <img src={bookImage} alt="Book Cover" className="book-image" />
                        <div className="pdf-buttons">
                            <button onClick={handleDownload}>{t('books.download')}</button>
                            <button onClick={handleRead}>{t('books.read')}</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BooksSection;

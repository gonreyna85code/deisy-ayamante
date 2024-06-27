import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { useTranslation } from 'react-i18next';
import pdf from '../files/E-book 7 claves.pdf';
import bookImage from '../files/E-book 7 claves.png';
import { pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { saveAs } from 'file-saver';
import { Modal } from 'antd';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const BooksSection = () => {
    const { t } = useTranslation();
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [isModalVisible, setIsModalVisible] = useState(false);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    function handleDownload() {
        saveAs(pdf, 'E-book 7 claves.pdf');
    }

    function handleRead() {
        setIsModalVisible(true);
    }

    function handleClose() {
        setIsModalVisible(false);
    }

    function handleNextPage() {
        if (pageNumber < numPages) {
            setPageNumber(pageNumber + 1);
        }
    }

    function handlePreviousPage() {
        if (pageNumber > 1) {
            setPageNumber(pageNumber - 1);
        }
    }

    return (
        <section id="books" className="books-section">
            <div className="container">
                <header>
                    <h2>{t('books.title')}</h2>
                </header>
                <div className="books-grid">
                    <div className="pdf-container">
                        <img src={bookImage} alt="Book Cover" className="book-image" />
                        <div className="pdf-buttons">
                            <button onClick={handleDownload}>{t('books.download')}</button>
                            <button onClick={handleRead}>{t('books.read')}</button>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                title={t('books.read')}
                visible={isModalVisible}
                onCancel={handleClose}
                footer={[
                    <button className="modal-button" key="prev" onClick={handlePreviousPage} disabled={pageNumber <= 1}>
                        {t('books.previous')}
                    </button>,
                    <button className="modal-button" key="next" onClick={handleNextPage} disabled={pageNumber >= numPages}>
                        {t('books.next')}
                    </button>,
                    <button className="modal-button" key="close" onClick={handleClose}>
                        {t('books.close')}
                    </button>
                ]}
                width={800}
            >
                <Document
                    file={pdf}
                    onLoadSuccess={onDocumentLoadSuccess}
                    className="pdf-document"
                >
                    <Page pageNumber={pageNumber} className="pdf-page" />
                </Document>
            </Modal>
        </section>
    );
};

export default BooksSection;

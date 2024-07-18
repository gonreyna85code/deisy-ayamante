import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Modal } from 'antd';


const Landing = () => {
    const { t } = useTranslation();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalImage, setModalImage] = useState('');
    const [modalDescriptionKey, setModalDescriptionKey] = useState('');

    const showModal = (imageSrc, descriptionKey) => {
        setModalImage(imageSrc);
        setModalDescriptionKey(descriptionKey);
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            {/* Intro */}
            <section id="section1" className="one cover dark">
                <div className="container">
                    <header>
                        <h2 className="alt"><strong>{t('intro.title')}</strong></h2>
                        <p><strong>{t('intro.subtitle')}</strong></p>
                    </header>
                    <footer>
                        <Link to="/home" className="button landing" id="start-now-link">{t('intro.startNow')}</Link>
                    </footer>
                </div>
            </section>

            {/* About Me */}
            <section id="about" className="three">
                <div className="container">
                    <header>
                        <h2>{t('about.name')}</h2>
                    </header>
                    <Link className="image featured a"><img src="images/pic08.jpg" alt="" /></Link>
                    <p>{t('about.description')}</p>
                </div>
            </section>

            {/* Portfolio */}
            <section id="portfolio" className="two">
                <div className="container">
                    <header>
                        <h2>{t('portfolio.title')}</h2>
                    </header>
                    <p>{t('portfolio.description')}</p>
                    <div className="row">
                        <div className="col-4 col-12-mobile">
                            <article className="item">
                                <Link className="image fit a" onClick={() => showModal('images/pic02.jpg', 'portfolio.mindfulnessText')}>
                                    <img src="images/pic02.jpg" alt="Mindfulness" />
                                </Link>
                                <header>
                                    <h3>{t('portfolio.mindfulness')}</h3>
                                </header>
                            </article>
                        </div>
                        <div className="col-4 col-12-mobile">
                            <article className="item">
                                <Link className="image fit a" onClick={() => showModal('images/pic05.jpg', 'portfolio.sleepNeuropsychologyText')}>
                                    <img src="images/pic05.jpg" alt="Neuropsicología del sueño" />
                                </Link>
                                <header>
                                    <h3>{t('portfolio.sleepNeuropsychology')}</h3>
                                </header>
                            </article>
                            <article className="item">
                                <Link className="image fit a" onClick={() => showModal('images/pic07.jpg', 'portfolio.reikiText')}>
                                    <img src="images/pic07.jpg" alt="Reiki" />
                                </Link>
                                <header>
                                    <h3>{t('portfolio.reiki')}</h3>
                                </header>
                            </article>
                        </div>
                        <div className="col-4 col-12-mobile">
                            <article className="item">
                                <Link className="image fit a" onClick={() => showModal('images/pic06.jpg', 'portfolio.crisisInterventionText')}>
                                    <img src="images/pic06.jpg" alt="Crisis and intervention" />
                                </Link>
                                <header>
                                    <h3>{t('portfolio.crisisIntervention')}</h3>
                                </header>
                            </article>
                            <article className="item">
                                <Link className="image fit a" onClick={() => showModal('images/pic03.jpg', 'portfolio.occupationalTherapyText')}>
                                    <img src="images/pic03.jpg" alt="Terapia Ocupacional" />
                                </Link>
                                <header>
                                    <h3>{t('portfolio.occupationalTherapy')}</h3>
                                </header>
                            </article>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact */}
            <section id="contact" className="four">
                <div className="container">
                    <header>
                        <h2>{t('contact.title')}</h2>
                    </header>
                    <p>{t('contact.description')}</p>
                    <form method="post" action="https://deisyayamante.vercel.app/api/send-email" id="contact-form">
                        <div className="row">
                            <div className="col-6 col-12-mobile">
                                <input type="text" name="name" placeholder={t('contact.name')} />
                            </div>
                            <div className="col-6 col-12-mobile">
                                <input type="email" name="email" placeholder={t('contact.email')} />
                            </div>
                            <div className="col-12">
                                <textarea name="message" placeholder={t('contact.message')}></textarea>
                            </div>
                            <div className="col-12">
                                <input type="submit" value={t('contact.sendMessage')} />
                            </div>
                        </div>
                    </form>
                </div>
            </section>

            <div id="footer">
                <ul className="copyright">
                    <li>&copy; G. REYNA. All rights reserved.</li>
                    <li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
                </ul>
            </div>

            {/* Modal for Portfolio Images */}
            <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
                <img src={modalImage} alt={t(modalDescriptionKey)} style={{ width: '100%' }} />
                <p>{t(modalDescriptionKey)}</p>
            </Modal>
        </>
    );
};

export default Landing;

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';


const Landing = () => {
    const { t } = useTranslation();

    return (
        <>
            
                {/* Intro */}
                <section id="top" className="one dark cover">
                    <div className="container">
                        <header>
                            <h2 className="alt"><strong>{t('intro.title')}</strong></h2>
                            <p><strong>{t('intro.subtitle')}</strong></p>
                        </header>
                        <footer>
                            <Link to="/home" className="button scrolly" id="start-now-link">{t('intro.startNow')}</Link>
                        </footer>
                    </div>
                </section>

                {/* About Me */}
                <section id="about" className="three">
                    <div className="container">
                        <header>
                            <h2>{t('about.name')}</h2>
                        </header>
                        <a className="image featured"><img src="images/pic08.jpg" alt="" /></a>
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
                                    <a className="image fit"><img src="images/pic02.jpg" alt="Mindfulness" /></a>
                                    <header>
                                        <h3>{t('portfolio.mindfulness')}</h3>
                                    </header>
                                </article>
                            </div>
                            <div className="col-4 col-12-mobile">
                                <article className="item">
                                    <a className="image fit"><img src="images/pic05.jpg" alt="Neuropsicología del sueño" /></a>
                                    <header>
                                        <h3>{t('portfolio.sleepNeuropsychology')}</h3>
                                    </header>
                                </article>
                                <article className="item">
                                    <a className="image fit"><img src="images/pic07.jpg" alt="Reiki" /></a>
                                    <header>
                                        <h3>{t('portfolio.reiki')}</h3>
                                    </header>
                                </article>
                            </div>
                            <div className="col-4 col-12-mobile">
                                <article className="item">
                                    <a className="image fit"><img src="images/pic06.jpg" alt="Crisis and intervention" /></a>
                                    <header>
                                        <h3>{t('portfolio.crisisIntervention')}</h3>
                                    </header>
                                </article>
                                <article className="item">
                                    <a className="image fit"><img src="images/pic03.jpg" alt="Terapia Ocupacional" /></a>
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

            <div id="modal" className="modal">
                <span className="close">&times;</span>
                <img className="modal-content" id="modal-img" alt="" />
                <div id="caption" className="caption"></div>
            </div>
        </>
    );
};

export default Landing;

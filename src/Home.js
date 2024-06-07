import React, { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    const userLang = navigator.language || navigator.userLanguage;
    const langElems = document.querySelectorAll('[data-lang]');
    
    langElems.forEach(elem => {
      elem.style.display = elem.getAttribute('data-lang') === userLang.split('-')[0] ? null : 'none';
    });
  }, []);

  return (
    <>
      <div id="header">
        <div className="top">
          <div id="logo">
            <span className="image avatar48"><img src="images/avatar.jpg" alt="" /></span>
            <h1 id="title">Deisy Ayamante</h1>
            <p data-lang="es" className="visible">Terapeuta Ocupacional</p>
            <p data-lang="en">Occupational Therapist</p>
          </div>

          <nav id="nav">
            <ul>
              <li><a href="#top" id="top-link"><span className="icon solid fa-home" data-lang="es" className="visible">Intro</span><span className="icon solid fa-home" data-lang="en">Intro</span></a></li>
              <li><a href="#portfolio" id="portfolio-link"><span className="icon solid fa-th" data-lang="es" className="visible">Portafolio</span><span className="icon solid fa-th" data-lang="en">Portfolio</span></a></li>
              <li><a href="#about" id="about-link"><span className="icon solid fa-user" data-lang="es" className="visible">Sobre Mí</span><span className="icon solid fa-user" data-lang="en">About Me</span></a></li>
              <li><a href="#contact" id="contact-link"><span className="icon solid fa-envelope" data-lang="es" className="visible">Contacto</span><span className="icon solid fa-envelope" data-lang="en">Contact</span></a></li>
            </ul>
          </nav>
        </div>

        <div className="bottom">
          <ul className="icons">
            <li><a href="#" className="icon brands fa-twitter"><span className="label">Twitter</span></a></li>
            <li><a href="#" className="icon brands fa-facebook-f"><span className="label">Facebook</span></a></li>
            <li><a href="#" className="icon brands fa-github"><span className="label">Github</span></a></li>
            <li><a href="#" className="icon brands fa-dribbble"><span className="label">Dribbble</span></a></li>
            <li><a href="#" className="icon solid fa-envelope"><span className="label">Email</span></a></li>
          </ul>
        </div>
      </div>

      <div id="main">
        <section id="top" className="one dark cover">
          <div className="container">
            <header>
              <h2 className="alt" data-lang="es"><strong>Sólo respira</strong>.</h2>
              <h2 className="alt" data-lang="en"><strong>Just take a breath</strong>.</h2>
              <p data-lang="es">Ligula scelerisque justo sem accumsan diam quis<br />vitae natoque dictum sollicitudin elementum.</p>
              <p data-lang="en">Ligula scelerisque justo sem accumsan diam quis<br />vitae natoque dictum sollicitudin elementum.</p>
            </header>
            <footer>
              <a href="#portfolio" className="button scrolly" data-lang="es">Magna Aliquam</a>
              <a href="#portfolio" className="button scrolly" data-lang="en">Magna Aliquam</a>
            </footer>
          </div>
        </section>

        <section id="portfolio" className="two">
          <div className="container">
            <header>
              <h2 data-lang="es">Portafolio</h2>
              <h2 data-lang="en">Portfolio</h2>
            </header>
            <p data-lang="es">Vitae natoque dictum etiam semper magnis enim feugiat convallis convallis egestas rhoncus ridiculus in quis risus amet curabitur tempor orci penatibus. Tellus erat mauris ipsum fermentum etiam vivamus eget. Nunc nibh morbi quis fusce hendrerit lacus ridiculus.</p>
            <p data-lang="en">Vitae natoque dictum etiam semper magnis enim feugiat convallis convallis egestas rhoncus ridiculus in quis risus amet curabitur tempor orci penatibus. Tellus erat mauris ipsum fermentum etiam vivamus eget. Nunc nibh morbi quis fusce hendrerit lacus ridiculus.</p>
            <div className="row">
              <div className="col-4 col-12-mobile">
                <article className="item">
                  <a href="#" className="image fit"><img src="images/pic02.jpg" alt="" /></a>
                  <header>
                    <h3 data-lang="es">Ipsum Feugiat</h3>
                    <h3 data-lang="en">Ipsum Feugiat</h3>
                  </header>
                </article>
                <article className="item">
                  <a href="#" className="image fit"><img src="images/pic03.jpg" alt="" /></a>
                  <header>
                    <h3 data-lang="es">Rhoncus Semper</h3>
                    <h3 data-lang="en">Rhoncus Semper</h3>
                  </header>
                </article>
              </div>
              <div className="col-4 col-12-mobile">
                <article className="item">
                  <a href="#" className="image fit"><img src="images/pic04.jpg" alt="" /></a>
                  <header>
                    <h3 data-lang="es">Magna Nullam</h3>
                    <h3 data-lang="en">Magna Nullam</h3>
                  </header>
                </article>
                <article className="item">
                  <a href="#" className="image fit"><img src="images/pic05.jpg" alt="" /></a>
                  <header>
                    <h3 data-lang="es">Natoque Vitae</h3>
                    <h3 data-lang="en">Natoque Vitae</h3>
                  </header>
                </article>
              </div>
              <div className="col-4 col-12-mobile">
                <article className="item">
                  <a href="#" className="image fit"><img src="images/pic06.jpg" alt="" /></a>
                  <header>
                    <h3 data-lang="es">Dolor Penatibus</h3>
                    <h3 data-lang="en">Dolor Penatibus</h3>
                  </header>
                </article>
                <article className="item">
                  <a href="#" className="image fit"><img src="images/pic07.jpg" alt="" /></a>
                  <header>
                    <h3 data-lang="es">Orci Convallis</h3>
                    <h3 data-lang="en">Orci Convallis</h3>
                  </header>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="three">
          <div className="container">
            <header>
              <h2 data-lang="es">Sobre Mí</h2>
              <h2 data-lang="en">About Me</h2>
            </header>
            <a href="#" className="image featured"><img src="images/pic08.jpg" alt="" /></a>
            <p data-lang="es">Tincidunt eu elit diam magnis pretium accumsan etiam id urna. Ridiculus ultricies curae quis et rhoncus velit. Lobortis elementum aliquet nec vitae laoreet eget cubilia quam non etiam odio tincidunt montes. Elementum sem parturient nulla quam placerat viverra mauris non cum elit tempus ullamcorper dolor. Libero rutrum ut lacinia donec curae mus vel quisque sociis nec ornare iaculis.</p>
            <p data-lang="en">Tincidunt eu elit diam magnis pretium accumsan etiam id urna. Ridiculus ultricies curae quis et rhoncus velit. Lobortis elementum aliquet nec vitae laoreet eget cubilia quam non etiam odio tincidunt montes. Elementum sem parturient nulla quam placerat viverra mauris non cum elit tempus ullamcorper dolor. Libero rutrum ut lacinia donec curae mus vel quisque sociis nec ornare iaculis.</p>
          </div>
        </section>

        <section id="contact" className="four">
          <div className="container">
            <header>
              <h2 data-lang="es">Contacto</h2>
              <h2 data-lang="en">Contact</h2>
            </header>
            <p data-lang="es">Elementum sem parturient nulla quam placerat viverra mauris non cum elit tempus ullamcorper dolor. Libero rutrum ut lacinia donec curae mus. Eleifend id porttitor ac ultricies lobortis sem nunc orci ridiculus faucibus a consectetur. Porttitor curae mauris urna mi dolor.</p>
            <p data-lang="en">Elementum sem parturient nulla quam placerat viverra mauris non cum elit tempus ullamcorper dolor. Libero rutrum ut lacinia donec curae mus. Eleifend id porttitor ac ultricies lobortis sem nunc orci ridiculus faucibus a consectetur. Porttitor curae mauris urna mi dolor.</p>
            <form method="post" action="#">
              <div className="row">
                <div className="col-6 col-12-mobile"><input type="text" name="name" placeholder="Name" /></div>
                <div className="col-6 col-12-mobile"><input type="text" name="email" placeholder="Email" /></div>
                <div className="col-12">
                  <textarea name="message" placeholder="Message"></textarea>
                </div>
                <div className="col-12">
                  <input type="submit" value="Send Message" data-lang="es" />
                  <input type="submit" value="Send Message" data-lang="en" />
                </div>
              </div>
            </form>
          </div>
        </section>
      </div>

      <div id="footer">
        <ul className="copyright">
          <li>&copy; Untitled. All rights reserved.</li>
          <li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
        </ul>
      </div>
    </>
  );
};

export default Home;

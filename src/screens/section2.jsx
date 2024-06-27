import React from 'react';

class Section1 extends React.Component {
    render() {
        return (
            <section id="section1" className="two">
                <div className="container">
                    <header>
                        <h2>Meditaciones</h2>
                    </header>
                    <iframe title='Podcast' src="https://open.spotify.com/embed/playlist/1XlD8w43FqbJ2EwTxePwvF?utm_source=generator" width="100%" height="600px" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
                </div>
            </section>
        );
    }
}

export default Section1;
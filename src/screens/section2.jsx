import React from 'react';

class Section1 extends React.Component {
    render() {
        return (
            <section id="section1" className="two">
                <div className="container">
                    <header>
                        <h2>Meditaciones</h2>
                    </header>
                    <iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/2iRWhqVHYvcbDMmHzofe4u?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
                </div>
            </section>
        );
    }
}

export default Section1;
import React from "react";
import SongCard from "../components/SongCard/SongCard";
import Footer from "../components/Footer/Footer";
import "./Home.css";

function Home({
  quote,
  songs,
  loadingQuote,
  loadingSongs,
  getNewQuote,
  saveQuote,
  saveSong,
}) {
  return (
    <>
      <section className="home">
        <h1 className="home__title">Daily Fit Boost</h1>
        <p className="home__subtitle">
          Your daily motivation and workout music
        </p>
        <div className="home__quote-container">
          {loadingQuote ? (
            <p className="home__loading">Loading your quote...</p>
          ) : (
            <>
              <blockquote className="home__quote">
                “{quote?.quote}”
                <footer className="home__author">— {quote?.author}</footer>
              </blockquote>
              <div className="home__quote-buttons">
                <button className="home__next-btn" onClick={getNewQuote}>
                  Next Quote
                </button>
                <button className="home__save-btn" onClick={saveQuote}>
                  Save Quote
                </button>
              </div>
            </>
          )}
        </div>

        <div className="home__songs-container">
          <h2 className="home__songs-title">Workout Songs</h2>
          {loadingSongs ? (
            <p>Loading songs...</p>
          ) : (
            songs.map((song, index) => (
              <SongCard
                key={index}
                title={song.title}
                artist={song.artist}
                onSave={saveSong}
              />
            ))
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Home;

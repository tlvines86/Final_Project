import React, { useEffect, useState } from "react";
import { fetchZenQuote, fetchWorkoutSongs } from "../utils/api";
import SongCard from "../components/SongCard/SongCard";
import "./Home.css";
import Toast from "../components/Toast/Toast";

function Home() {
  const [quote, setQuote] = useState(null);
  const [songs, setSongs] = useState([]);
  const [loadingQuote, setLoadingQuote] = useState(true);
  const [loadingSongs, setLoadingSongs] = useState(true);
  const [toastMessage, setToastMessage] = useState("");

  const getNewQuote = () => {
    setLoadingQuote(true);
    fetchZenQuote().then((data) => {
      setQuote(data);
      setLoadingQuote(false);
    });
  };

  const getSongs = () => {
    setLoadingSongs(true);
    fetchWorkoutSongs().then((data) => {
      setSongs(data);
      setLoadingSongs(false);
    });
  };

  const saveQuote = () => {
    if (!quote) return;
    const storedQuotes =
      JSON.parse(localStorage.getItem("favoriteQuotes")) || [];
    if (!storedQuotes.some((q) => q.quote === quote.quote)) {
      localStorage.setItem(
        "favoriteQuotes",
        JSON.stringify([...storedQuotes, quote])
      );
      setToastMessage("✅ Quote saved!");
    }
  };

  const saveSong = (song) => {
    const storedSongs = JSON.parse(localStorage.getItem("favoriteSongs")) || [];
    if (!storedSongs.some((s) => s.title === song.title)) {
      localStorage.setItem(
        "favoriteSongs",
        JSON.stringify([...storedSongs, song])
      );
      setToastMessage("✅ Song saved!");
    }
  };

  useEffect(() => {
    getNewQuote();
    getSongs();
  }, []);

  return (
    <section className="home">
      <h1 className="home__title">Daily Fit Boost</h1>
      <p className="home__subtitle">Your daily motivation and workout music</p>
      <div className="home__quote-container">
        {loadingQuote ? (
          <p className="home__loading">Loading your quote...</p>
        ) : (
          <>
            <blockquote className="home__quote">
              “{quote.quote}”
              <footer className="home__author">— {quote.author}</footer>
            </blockquote>
            <button className="home__next-btn" onClick={getNewQuote}>
              Next Quote
            </button>
            <button className="home__next-btn" onClick={saveQuote}>
              Save Quote
            </button>
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
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage("")} />
      )}
    </section>
  );
}

export default Home;

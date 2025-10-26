import React, { useEffect, useState } from "react";
import "./Profile.css";

function Profile() {
  const [quotes, setQuotes] = useState([]);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const storedQuotes =
      JSON.parse(localStorage.getItem("favoriteQuotes")) || [];
    const storedSongs = JSON.parse(localStorage.getItem("favoriteSongs")) || [];
    setQuotes(storedQuotes);
    setSongs(storedSongs);
  }, []);

  return (
    <section className="profile">
      <h1 className="profile__title">Your Saved Motivation</h1>
      <div className="profile__section">
        <h2 className="profile__section-title">Quotes</h2>
        {quotes.length === 0 ? (
          <p>No saved quotes yet.</p>
        ) : (
          quotes.map((q, index) => (
            <blockquote key={index} className="profile__quote">
              “{q.quote}”
              <span className="profile__quote-author">— {q.author}</span>
            </blockquote>
          ))
        )}
      </div>
      <div className="profile__section">
        <h2 className="profile__section-title">Workout Songs</h2>
        {songs.length === 0 ? (
          <p>No saved songs yet.</p>
        ) : (
          songs.map((s, index) => (
            <div key={index} className="profile__song">
              {s.title} — {s.artist}
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default Profile;

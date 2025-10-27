import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Toast from "./components/Toast/Toast";
import { fetchZenQuote, fetchWorkoutSongs } from "./utils/api";
import "./App.css";

function App() {
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
    <div className="app">
      <Router>
        <Header />
        <Main>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  quote={quote}
                  songs={songs}
                  loadingQuote={loadingQuote}
                  loadingSongs={loadingSongs}
                  getNewQuote={getNewQuote}
                  saveQuote={saveQuote}
                  saveSong={saveSong}
                />
              }
            />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Main>

        {toastMessage && (
          <Toast message={toastMessage} onClose={() => setToastMessage("")} />
        )}
      </Router>
    </div>
  );
}

export default App;

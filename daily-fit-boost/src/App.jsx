import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Toast from "./components/Toast/Toast";
import { fetchZenQuote, fetchWorkoutSongs } from "./utils/api";
import { FALLBACK_QUOTES } from "./utils/config";
import AuthModal from "./components/AuthModal/AuthModal";
import "./App.css";

function App() {
  const [quote, setQuote] = useState(null);
  const [songs, setSongs] = useState([]);
  const [loadingQuote, setLoadingQuote] = useState(true);
  const [loadingSongs, setLoadingSongs] = useState(true);
  const [toastMessage, setToastMessage] = useState("");

  const [user, setUser] = useState(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const getNewQuote = () => {
    setLoadingQuote(true);
    fetchZenQuote()
      .then((data) => setQuote(data))
      .catch((error) => {
        console.error("Error fetching quote:", error);
        const fallback =
          FALLBACK_QUOTES[Math.floor(Math.random() * FALLBACK_QUOTES.length)];
        setQuote(fallback);
        setToastMessage("⚠️ Could not fetch quote. Using fallback.");
      })
      .finally(() => setLoadingQuote(false));
  };

  const getSongs = () => {
    setLoadingSongs(true);
    fetchWorkoutSongs()
      .then((data) => setSongs(data))
      .catch((error) => {
        console.error("Error fetching songs:", error);
        setToastMessage("⚠️ Could not fetch songs. Try again later.");
      })
      .finally(() => setLoadingSongs(false));
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
        <Header
          user={user}
          onLoginClick={() => setAuthModalOpen(true)}
          onLogoutClick={() => setUser(null)}
        />

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
            <Route path="/profile" element={user ? <Profile /> : <Home />} />
          </Routes>
        </Main>

        {toastMessage && (
          <Toast message={toastMessage} onClose={() => setToastMessage("")} />
        )}

        <AuthModal
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
          onAuthSuccess={(u) => setUser(u)}
        />
      </Router>
    </div>
  );
}

export default App;

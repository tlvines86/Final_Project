import { FALLBACK_QUOTES, STATIC_SONGS } from "./config";

export function fetchZenQuote() {
  const url = `https://api.allorigins.win/raw?url=${encodeURIComponent(
    `https://zenquotes.io/api/random?cb=${Date.now()}`
  )}`;

  return fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    })
    .then((data) => ({
      quote:
        data[0]?.q ||
        FALLBACK_QUOTES[Math.floor(Math.random() * FALLBACK_QUOTES.length)]
          .quote,
      author:
        data[0]?.a ||
        FALLBACK_QUOTES[Math.floor(Math.random() * FALLBACK_QUOTES.length)]
          .author,
    }))
    .catch(() => {
      return FALLBACK_QUOTES[
        Math.floor(Math.random() * FALLBACK_QUOTES.length)
      ];
    });
}

export function fetchWorkoutSongs() {
  return Promise.resolve(STATIC_SONGS);
}

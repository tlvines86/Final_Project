import React from "react";
import "./SongCard.css";

function SongCard({ title, artist, onSave }) {
  return (
    <article className="song-card">
      <p className="song-card__title">{title}</p>
      <p className="song-card__artist">{artist}</p>
      {onSave && (
        <button
          className="song-card__save-btn"
          onClick={() => onSave({ title, artist })}
        >
          Save
        </button>
      )}
    </article>
  );
}

export default SongCard;

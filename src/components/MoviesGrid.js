import React, { useState } from "react";
import '../styles.css';
import MovieCard from "./MovieCard";
export default function MoviesGrid({ movies, watchlist, toggleWatchlist }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [genre, setGenre] = useState("All Genres");
    const [rating, setRating] = useState("All");

    const HandleSeacrhChange = (e) => {
        setSearchTerm(e.target.value);
    }
    const matchGenre = (movie, genre) => {
        return genre === "All Genres" || movie.genre.toLowerCase() === genre.toLowerCase();
    }
    const matchRating = (movie, rating) => {
        switch (rating) {
            case "All":
                return true; // No filter applied
            case "Good":
                return movie.rating >= 8;
            case "Ok":
                return movie.rating >= 5 && movie.rating < 8;
            case "Bad":
                return movie.rating < 5;
            default:
                return false; // For "All" rating
        }
    }
    const matchSearch = (movie, searchTerm) => {
        return movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    }

    const filteredMovies = movies.filter(movie =>
        matchGenre(movie, genre) &&
        matchRating(movie, rating) &&
        matchSearch(movie, searchTerm)
    );
    return (
        <div>

            <input className="search-input" type="text" placeholder="Search movies..." value={searchTerm} onChange={HandleSeacrhChange} />

            <div className="filter-bar">
                <div className="filter-slot">
                    <label>Genre</label>
                    <select className="filter-dropdown" value={genre} onChange={(e) => setGenre(e.target.value)}>
                        <option value="All Genres">All Genres</option>
                        <option value="Action">Action</option>
                        <option value="Fantasy">Fantasy</option>
                        <option value="Drama">Drama</option>
                        <option value="Horror">Horror</option>
                    </select>
                </div>
                <div className="filter-slot">
                    <label>Rating</label>
                    <select className="filter-dropdown" value={rating} onChange={(e) => setRating(e.target.value)}>
                        <option value="All">All</option>
                        <option value="Good">Good</option>
                        <option value="Ok">Ok</option>
                        <option value="Bad">Bad</option>
                    </select>
                </div>
            </div>
            <div className="movies-grid">
                {filteredMovies.map(movie => (
                    <MovieCard key={movie.id} movie={movie} isWatchlisted={watchlist.includes(movie.id)} toggleWatchlist={toggleWatchlist} />
                ))}
            </div>
        </div>
    )
}
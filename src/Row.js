import React, { useEffect, useState } from 'react';
import axios from './axios';
import './Row.css';
import YouTube from "react-youtube";
import movieTrailer from 'movie-trailer';
const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

    useEffect(() => {
        async function fetchData() {
            try {
                const request = await axios.get(fetchUrl);
                setMovies(request.data.results);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, [fetchUrl]);

    const opts = {
        height: "390px",
        width: "100%",
        playerVars: {
            autoplay: 1,
        },
    };

    const handleClick = async (movie) => {
        try {
            if (trailerUrl) {
                setTrailerUrl('');
            } else {
                const url = await movieTrailer(movie?.name || "");
                if (url) {
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get("v"));
                } else {
                    console.log("Trailer not found");
                }
            }
        } catch (error) {
            console.error('Error fetching trailer:', error);
        }
    }

    return (
        <div className='row'>
            <h2>{title}</h2>
            <div className='row_posters'>
                {movies.map((movie) => (
                    <img
                        key={movie.id}
                        onClick={() => handleClick(movie)}
                        className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                        src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                        alt={movie.name}
                    />
                ))}
            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
    );
}

export default Row;

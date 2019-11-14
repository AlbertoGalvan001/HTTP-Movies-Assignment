import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialState = {
    title: '',
    director: '',
    metascore: '',
    stars: '',
}

const UpdateMovie = props => {
    const [movie, setMovie] = useState({ ...initialState });

    useEffect(() => {
        const movieToUpdate = props.movies.filter(movie => {
            return movie.id === props.match.params.id
        })
        movieToUpdate && setMovie(movieToUpdate)
    }, [props.match.params.id])

    const handleChange = e => {
        if (e.target.name === 'stars') {
            const stars = e.target.value.split('');
            setMovie({ ...movie, [e.target.name]: e.target.value })
        }
    }

    const saveMovie = e => {
        e.preventDefault();
        console.log(movie);
        axios
            .put(`http:localhost:5000/api/movies/${movie.id}`, movie)
            .then(response => {
                console.log(response);
                props.setMovies(props.movies.map(item => {
                    if (item.id === movie.id) {
                        return response.data;
                    } else {
                        return item;
                    }
                }))
                props.history.push('/');
            })
            .catch(error => {
                console.log(error.message);
            })
        setMovie({ ...initialState });
    }


}


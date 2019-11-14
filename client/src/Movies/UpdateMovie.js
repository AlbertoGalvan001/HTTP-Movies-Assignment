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

    return (
        <div className='update-form'>
            <h3>Update Movie</h3>
            <form onSubmit={saveMovie}>
                <label htmlFor='title'>Title</label>
                <input type='text' name='title' placeholder='enter title' value={movie.title} onChange={handleChange} />
                <label htmlFor='metascore'>Metascore</label>
                <input type='number' name='metascore' placeholder={100} value={movie.metascore} onChange={handleChange} />
                <label htmlFor='director'>Director</label>
                <input type='text' name='director' placeholder='enter director' value={movie.director} onChange={handleChange} />
                <label htmlFor='stars'>Actor</label>
                <input type='text' name='stars' placeholder='enter actor' value={movie.stars} onChange={handleChange} />
                <button className='update-btn'>Submit</button>
            </form>
        </div>
    );
};

export default UpdateMovie;


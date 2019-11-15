import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import axios from 'axios';



export default function UpdateMovie(props) {
    const [movieEdit, setMovieEdit] = useState({
        title: '',
        director: '',
        metascore: '',
        stars: []
    });

    const [newStar, setNewStar] = useState('');
    console.log('update movie edit', movieEdit);
    let id = props.match.params.id;
    useEffect(() => {
        fetchMovie(id);
    }, []);

    const fetchMovie = id => {
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then(res => {
                console.log('update movie res', res)
                setMovieEdit(res.data);
            })
            .catch(err => console.log(err.response));
    };

    const changeHandler = e => {
        e.preventDefault();

        setMovieEdit({
            ...movieEdit,
            [e.target.name]: e.target.value
        });
    };

    const handleStar = e => {
        e.preventDefault();
        setNewStar(e.target.value);
    };

    const setStar = str => {
        setMovieEdit({
            ...movieEdit,
            stars: [...movieEdit.stars, str]
        });
        setNewStar('');
    };

    const handleSubmit = e => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${id}`, movieEdit)
            .then(res => {
                console.log('put update response', res);
                props.history.push(`/movies`);
            })
            .catch(err => console.log(err.response));
    };



    return (
        <div className='update-form'>
            <h3>Update Movie</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor='title'>Title</label>
                <input type='text' name='title' placeholder='enter title' value={movieEdit.title} onChange={changeHandler} />
                <label htmlFor='metascore'>Metascore</label>
                <input type='number' name='metascore' placeholder={100} value={movieEdit.metascore} onChange={changeHandler} />
                <label htmlFor='director'>Director</label>
                <input type='text' name='director' placeholder='enter director' value={movieEdit.director} onChange={changeHandler} />
                <label htmlFor='stars'>Actor</label>
                <input type='text' name='stars' placeholder='enter actor' value={newStar} onChange={handleStar} />
                <button className='update-btn'>Submit</button>
                <MovieCard movie={movieEdit} />
            </form>
        </div>
    );
}




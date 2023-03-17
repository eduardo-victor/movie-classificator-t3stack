import { useState } from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { toast } from 'react-hot-toast';
import { api } from '~/utils/api';
import React from 'react';

interface Movie {
    name: string,
    duration: string,
    description: string,
    rating: number
}

function ModalAdd() {
    const [name, setName] = useState('')
    const [duration, setDuration] = useState('')
    const [description, setDescription] = useState('')
    const [rating, setRating] = useState(1)
    const {mutate} = api.movie.createMovie.useMutation()
    
    return (
        <form onSubmit={(e) => {
            e.preventDefault()

            
            try {
                mutate({name: name, duration: duration, description: description, note: rating})
                toast.success("Filme adicionado com sucesso...")
            } catch (error) {
                
            }

        }}>
            <input type="text" value={name} onChange={(evt) => { setName(evt.target.value) }} />
            <input type="text" value={duration} onChange={(evt) => { setDuration(evt.target.value) }} />
            <input type="text" value={description} onChange={(evt) => { setDescription(evt.target.value) }} />
            <input type="number" value={rating} onChange={(evt) => { setRating(evt.target.valueAsNumber) }} />
            <button type='submit'>Add</button>
        </form>
    )
}; export default ModalAdd;
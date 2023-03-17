import { useState } from 'react';
import { Rate } from 'antd';
import { toast } from 'react-hot-toast';
import { api } from '~/utils/api';
import React from 'react';
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link } from 'react-router-dom';


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
    const [rating, setRating] = useState(3)

    const { mutate } = api.movie.createMovie.useMutation()

    return (
        <form onSubmit={(e) => {
            e.preventDefault()
            try {
                mutate({ name: name, duration: duration, description: description, note: rating })
                toast.success("Filme adicionado com sucesso...");
            } catch (error) {
                toast.error("Ah não, algo deu errado D:")
            }
        }} className="w-80 h-[29rem] bg-[#6d0a6d] flex flex-col p-2 items-center rounded-md">
            <label className="font-mono text-lg pt-3">Adicione novos filmes!</label>
            <div className="w-full h-full flex flex-col items-start p-4 gap-1">
                <label className="font-mono text-md">Nome do filme:</label>
                <input required type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full h-7 rounded-sm text-black p-2 border-0 focus:outline-none" />
                <label className="font-mono text-md">Tempo de duração:</label>
                <input required type="text" value={duration} onChange={(e) => setDuration(e.target.value)} className="w-full h-7 rounded-sm text-black p-2 border-0 focus:outline-none" />
                <label className="font-mono text-md">Descrição:</label>
                <textarea
                    className="peer block min-h-[auto] bg-white text-black w-full rounded border-0 bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                    id="exampleFormControlTextarea1"
                    rows={4}
                    placeholder="Your message"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                ></textarea>
                <div className='w-full flex flex-col items-center justify-center'>
                    <label className="font-mono text-md">Nota:</label>
                    <Rate defaultValue={3} onChange={(e) => {setRating(e)}} />
                </div>
            </div>
            <button type='submit' className='w-28 h-10 bg-blue-600 rounded-sm'>Add</button>

        </form>
    )
}; export default ModalAdd;

import * as React from 'react'
import { useState } from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { toast } from 'react-hot-toast';
import { api } from '~/utils/api';
import { useRef } from 'react';
import { any } from 'zod';

export default function ModalAdd() {
    const [rating, setRating] = useState<number | null>(1);
    const [name, setName] = useState('')
    const [duration, setDuration] = useState('')
    const [description, setDescription] = useState('')

    return (
        <div>
            <form onSubmit={(e) => {
                e.preventDefault()

                const object = {
                    name: name,
                    duration: duration,
                    description: description,
                    note: rating || null
                }

                try {
                    const { mutate } = api.movie.createMovie.useMutation();
                    mutate(object);
                    toast.success('Novo filme adicionado à sua biblioteca!');
                } catch (error) {
                    toast.error('Opa, ocorreu um erro D:');
                }

            }}
                className="w-80 h-[27rem] bg-[#1B1A17]  flex flex-col items-center rounded-md"
            >
                <label className="font-mono text-lg pt-3">Adicione novos filmes!</label>
                <div className="w-full h-full flex flex-col items-start p-4 gap-1">
                    <label className="font-mono text-md">Nome do filme:</label>
                    <input required type="text" value={name} onChange={(e) => { setName(e.target.value) }} className="w-full h-7 rounded-sm text-black p-2 border-0 focus:outline-none" />
                    <label className="font-mono text-md">Duração:</label>
                    <input required type="text" value={duration} onChange={(e) => { setDuration(e.target.value) }} className="w-full h-7 rounded-sm text-black p-2 border-0 focus:outline-none" />
                    <label className="font-mono text-md">Descrição:</label>
                    <textarea
                        className="peer block min-h-[auto] bg-white text-black w-full rounded border-0 bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                        id="exampleFormControlTextarea1"
                        rows={4}
                        placeholder="Your message"
                        value={description}
                        onChange={(e) => { setDescription(e.target.value) }}
                        required>

                    </textarea>
                    <div className='w-full flex items-center justify-center p-3'>
                        <label className="font-mono text-md mr-1">Nota:</label>
                        <Stack spacing={1}>
                            <Rating
                                name="simple-controlled"
                                defaultValue={0}
                                value={rating}
                                onChange={(event, newValue) => {
                                    setRating(newValue)
                                }}
                            />
                        </Stack>
                    </div>
                    <button type="submit" className='w-full h-8 bg-blue-600 rounded-sm  hover:bg-blue-800'>Adicionar</button>
                </div>
            </form>
        </div>
    )
};

import * as React from 'react'
import { useState } from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { toast } from 'react-hot-toast';
import { api } from '~/utils/api';
import { useRef } from 'react';
import { any } from 'zod';

export default function ModalAdd () {
    const [rating, setRating] = useState<number | null>(1);
    const [name, setName] = useState('')
    const [duration, setDuration] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState<string | undefined>(undefined);
    const inputRef = useRef<HTMLInputElement>(null);
  
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
          const file = files[0];
          if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImage(imageUrl);
          }
        }
  
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
  
      const object = {
        name: name,
        duration: duration,
        image: image,
        description: description,
        note: rating || null
      }
  
      try {
        const { mutate } = api.movie.createMovie.useMutation();
        await mutate(object);
        toast.success('Novo filme adicionado à sua biblioteca!');
      } catch (error) {
        toast.error('Opa, ocorreu um erro D:');
      }
    }
  }
        return (
            <div>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    
                }}
                    className="w-80 h-[30rem] bg-[#1B1A17]  flex flex-col items-center rounded-md"
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
                        <input
                            className="m-0 p-2 w-full mt-2 cursor-pointer rounded border border-solid border-neutral-300 dark:border-neutral-600 bg-clip-padding py-[0.32rem] px-3 text-xs font-normal text-neutral-700 dark:text-neutral-200 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 dark:file:bg-neutral-700 file:px-3 file:py-[0.32rem] file:text-neutral-700 dark:file:text-neutral-100 file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] file:[border-inline-end-width:1px] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-[0_0_0_1px] focus:shadow-primary focus:outline-none"
                            id="formFileSm"
                            type="file"
                            value={image}
                            onChange={handleFileChange}
                            required 
                            accept="image/*" 
                            ref={inputRef}/>
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
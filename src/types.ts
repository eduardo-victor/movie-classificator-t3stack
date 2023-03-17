import {z} from 'zod'
import type { inferRouterOutputs } from '@trpc/server'
import type { AppRouter } from './server/api/root'

type RouterOutputs = inferRouterOutputs<AppRouter>;
type allMoviesOutput = RouterOutputs["movie"]["allMovies"]

export type Movie = allMoviesOutput[number]

export const moviesInput = z.object({
    name: z.string(),
    description: z.string(),
    duration: z.string(),
    note: z.number()
})
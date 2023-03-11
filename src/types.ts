import {z} from 'zod'
import type { inferRouterOutputs } from '@trpc/server'
import type { AppRouter } from './server/api/root'

type RouterOutputs = inferRouterOutputs<AppRouter>;
type allMoviesOutput = RouterOutputs["movie"]["allMovies"]

export type Movie = allMoviesOutput[number]

export const moviesInput = z.string({
    required_error: 'This value need be a string',
})
.min(1)
.max(1000)
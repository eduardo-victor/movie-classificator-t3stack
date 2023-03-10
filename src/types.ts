import {z} from 'zod'

export const moviesInput = z.string({
    required_error: 'This value need be a string',
})
.min(1)
.max(1000)
import { z } from "zod";
import { moviesInput } from "~/types";

import { createTRPCRouter, publicProcedure, protectedProcedure, } from "~/server/api/trpc";

export const movieRouter = createTRPCRouter({
  allMovies: protectedProcedure.query(async ({ ctx }) => {
    const movies = await ctx.prisma.movies.findMany({
      where: {
        userId: ctx.session.user.id,
      }
    });
    console.log('movies from prisma:', movies.map(({ id, name, duration, image, description, note }) => ({ id, name, duration, image, description, note })));
    return [
      {
        id: 'fake',
        name: 'fake',
        duration: 'fake',
        image: 'fake',
        description: 'fake',
        note: 5
      },
      {
        id: 'fake2',
        name: 'fake',
        duration: 'fake',
        image: 'fake',
        description: 'fake',
        note: 7
      },
      {
        id: 'fake3',
        name: 'fake',
        duration: 'fake',
        image: 'fake',
        description: 'fake',
        note: 10
      },
      {
        id: 'fake4',
        name: 'fake',
        duration: 'fake',
        image: 'fake',
        description: 'fake',
        note: 10
      },
      {
        id: 'fake7',
        name: 'fake',
        duration: 'fake',
        image: 'fake',
        description: 'fake',
        note: 10
      },
    ]
  }),
  createMovie: protectedProcedure.input(moviesInput).mutation(async ({ ctx, input }) => {
    return ctx.prisma.movies.create({
      data: {
        name: input,
        duration: input,
        image: input,
        description: input,
        user: {
          connect: {
            id: ctx.session.user.id,
          }
        }
      },
    })
  }),
  deleteMovie: protectedProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    return ctx.prisma.movies.delete({
      where: {
        id: input,
      },
    })
  }),
  editMovie: protectedProcedure
    .input(z.object({
      id: z.string(),
      name: z.string(),
      duration: z.string(),
      image: z.string(),
      description: z.string(),
      note: z.number()

    })).mutation(async ({ ctx, input }) => {
    return ctx.prisma.movies.update({
      where: {
        id: input.id,
      },
      data: {
        name: input.name,
        duration: input.duration,
        image: input.image,
        description: input.description,
        note: input.note
      }
    })
  }),
});

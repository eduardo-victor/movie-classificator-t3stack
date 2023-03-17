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
    return movies.map(({ id, name, duration, description, note }) => ({ id, name, duration, description, note }));

  }),
  createMovie: protectedProcedure.input(moviesInput).mutation(async ({ ctx, input }) => {
    return ctx.prisma.movies.create({
      data: {
        name: input.name,
        duration: input.duration,
        description: input.description,
        note: input.note,
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
          description: input.description,
          note: input.note
        }
      })
    }),
});

import { api } from "~/utils/api"
import type { Movie } from "~/types"
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
} from "@material-tailwind/react";
import Trpc from "~/pages/api/trpc/[trpc]";

type MovieProps = {
    movie: Movie
}

export default function Movie({ movie }: MovieProps) {

    const trpc = api.useContext()
    const {mutate: deleteMutation} = api.movie.deleteMovie.useMutation({
        onSettled: async () => {
            await trpc.movie.allMovies.invalidate()
        }
    })

    const { id, name, duration, description, note } = movie

    return (
        <Card className="w-64 bg-[#1B1A17] border-4 border-[#1B1A17] hover:bg-black hover:border-black hover:cursor-pointer">
            <CardBody className="text-center">
                <Typography variant="h5" className="mb-2">
                    {name}
                </Typography>
                <Typography>
                    {description}
                </Typography>
            </CardBody>
            <CardFooter divider className="flex flex-col items-center justify-between p-4">
                <div className="w-full h-full flex justify-between">
                    <Typography variant="small">{duration}h</Typography>
                    <Typography variant="small" color="gray" className="flex gap-1">
                        {note}
                    </Typography>
                </div>
                <div className="flex gap-8 pt-4">
                    <button onClick={() => {deleteMutation(id)}} className="w-20 h-8 text-md font-semibold bg-red-500 rounded-sm hover:bg-red-600">Deletar</button>
                </div>
            </CardFooter>
        </Card>
    )
}
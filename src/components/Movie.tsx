import { api } from "~/utils/api"
import type { Movie } from "~/types"
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
} from "@material-tailwind/react";

type MovieProps = {
    movie: Movie
}

export default function Movie({ movie }: MovieProps) {
    const { id, name, duration, image, description, note } = movie

    return (
        <Card className="w-64 bg-gray-900 border-4 border-gray-900 hover:bg-black hover:border-black hover:cursor-pointer">
            <CardHeader color="blue" className="relative h-56">
                <img
                    src="https://image.cachorrogato.com.br/textimages/cachorrinho-ideal-chihuahua"
                    alt="img-blur-shadow"
                    className="h-full w-full rounded-lg"
                />
            </CardHeader>
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
                    <button className="w-20 h-8 text-md font-semibold bg-red-500 rounded-sm hover:bg-red-600">Delete</button>
                    <button className="w-20 h-8 text-md font-semibold bg-blue-500 rounded-sm hover:bg-blue-600">Edit</button>
                </div>
            </CardFooter>
        </Card>
    )
}
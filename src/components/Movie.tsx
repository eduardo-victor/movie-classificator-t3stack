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
        <Card className="w-72">
            <CardHeader color="blue" className="relative h-56">
                <img
                    src="https://image.cachorrogato.com.br/textimages/cachorrinho-ideal-chihuahua"
                    alt="img-blur-shadow"
                    className="h-full w-full rounded-md"
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
            <CardFooter divider className="flex flex-col items-center justify-between py-3 pl-4 pr-4">
                <div className="w-full h-full flex justify-between">
                    <Typography variant="small">{duration}h</Typography>
                    <Typography variant="small" color="gray" className="flex gap-1">
                        {note}
                    </Typography>
                </div>
                <div className="flex gap-8">
                    <button className="w-20 h-8 text-md font-semibold bg-red-500 rounded-sm hover:bg-red-600">Delete</button>
                    <button className="w-20 h-8 text-md font-semibold bg-blue-500 rounded-sm hover:bg-blue-600">Edit</button>
                </div>
            </CardFooter>
        </Card>
    )
}
import { api } from "~/utils/api"
import Movie from "./Movie"
export default function Movies() {
    const { data: movies, isLoading, isError } = api.movie.allMovies.useQuery()

    if (isLoading) return <div>Loading movies, just wait a minute...</div>
    if (isError) return <div>Something is bad D:</div>

    return (
        <>
            {movies.length ? movies.map(movie => {
                return <Movie key={movie.id} movie={movie}/>
            }) : 'Create your first classification...'}
        </>
    )
}
function filterMovies(movies, request, checkboxStatus) {
    let filterMovies = movies;

    if (checkboxStatus) {
        filterMovies = filterMovies.filter((movie) => movie.duration <= 40);
    }

    let result = filterMovies.filter((movie) => {
        return movie.nameRU.toLowerCase().includes(request.toLowerCase());
    })
    return result;
}

export default filterMovies;
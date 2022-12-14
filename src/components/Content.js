import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

const Content = () => {
    const [movies, setMovies] = useState([])
    const [inputVal, setInputVal] = useState('naruto')
    const [isSearch, setIsSearch] = useState(true)
    const [movieData, setMovieData] = useState([])
    const [isActive, setIsActive] = useState(false)

    if (isSearch) {
        fetch(`http://www.omdbapi.com/?apikey=1866b12e&s=${inputVal}&type=movie`)
            .then(result => result.json())
            .then(result => {
                if ((result.Response === "True")) {
                    setMovies(result.Search)
                    setIsSearch(false)
                }
            })
    }

    function handleMouseClick(data) {
        fetch(`http://www.omdbapi.com/?apikey=1866b12e&i=${data}`)
            .then(response => response.json())
            .then(response => {
                setMovieData(response)
            })
    }

    return (
        <div>
            <nav className="navbar">
                <div className="search-container">
                    <input id="input-keyword" type="text" placeholder="Search.." name="search" autoComplete="off" 
                    onKeyUp={(e)=>{
                        const searchButton = document.getElementById('search-button');
                        if(e.key === 'Enter'){
                            searchButton.click();
                        }
                    }}
                    ></input>
                    <button id="search-button" onClick={() => {
                        let input = document.getElementById('input-keyword').value
                        setInputVal(input)
                        setIsSearch(true)
                    }}
                        type="submit"><FontAwesomeIcon icon={faMagnifyingGlass}/></button>
                </div>
            </nav>
            <h1>Find Your Movie</h1>
            <div className="wrapper">
                {movies.map((result, index) => {
                    return (
                        <div id={index} className={
                            isActive ? "card-hover" : "card"} key={index}
                            onClick={() => {
                                handleMouseClick(result.imdbID)
                                setIsActive(true)
                            }}
                            onMouseLeave={()=>{
                                setMovieData([])
                                setIsActive(false)}
                            }
                        >
                            <img className="card-poster" src={result.Poster}></img>
                            <div className="descriptions">
                            {movieData.length === 0 ? 
                                <p className="data-loading">Loading...</p> :
                                <div>
                                    <h2>{movieData.Title}</h2>
                                    <p className="movie-plot">{movieData.Plot}</p>
                                    <p><b>Release date : </b>{movieData.Released}</p>
                                    <p><b>Actor: </b>{movieData.Actors}</p>
                                </div> }
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Content
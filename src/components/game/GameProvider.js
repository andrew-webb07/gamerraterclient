import React, { useState } from "react"

export const GameContext = React.createContext()

export const GameProvider = (props) => {
    const [ games, setGames ] = useState([])
    const [ reviews, setReviews ] = useState([])
    const [ ratings, setRatings] = useState([])
    const [ pictures, setPictures] = useState([])
    const [ searchedGames, setSearchedGames ] = useState([])

    const getReviews = () => {
        return fetch("http://localhost:8000/reviews", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("gr_token")}`
            }
        })
        .then(res => res.json())
        .then(setReviews)
    }

    const getPictures = () => {
        return fetch("http://localhost:8000/pictures", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("gr_token")}`
            }
        })
        .then(res => res.json())
        .then(setPictures)
    }

    const getRatings = () => {
        return fetch("http://localhost:8000/ratings", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("gr_token")}`
            }
        })
        .then(res => res.json())
        .then(setRatings)
    }

    const getGames = () => {
        return fetch("http://localhost:8000/games", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("gr_token")}`
            }
        })
            .then(response => response.json())
            .then(setGames)
    }

    const getGame = (gameId) => {
        return fetch(`http://localhost:8000/games/${gameId}`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("gr_token")}`
            }
        })
        .then(res => res.json())
    }

    const createGame = (game) => {
        return fetch("http://localhost:8000/games", { 
            method: "POST",
            headers: {"Authorization": `Token ${localStorage.getItem("gr_token")}`,
                      "Content-Type": "application/json"               
            },
            body: JSON.stringify(game)
        }).then(getGames)
    }

    const createReview = (review) => {
        return fetch("http://localhost:8000/reviews", { 
            method: "POST",
            headers: {"Authorization": `Token ${localStorage.getItem("gr_token")}`,
                      "Content-Type": "application/json"               
            },
            body: JSON.stringify(review)
        }).then(getReviews)
    }

    const createRating = (rating) => {
        return fetch("http://localhost:8000/ratings", { 
            method: "POST",
            headers: {"Authorization": `Token ${localStorage.getItem("gr_token")}`,
                      "Content-Type": "application/json"               
            },
            body: JSON.stringify(rating)
        }).then(getRatings)
    }

    const createPicture = (picture) => {
        return fetch("http://localhost:8000/pictures", { 
            method: "POST",
            headers: {"Authorization": `Token ${localStorage.getItem("gr_token")}`,
                      "Content-Type": "application/json"               
            },
            body: JSON.stringify(picture)
        }).then(getPictures)
    }

    const editGame = (game) => {
        return fetch(`http://localhost:8000/games/${game.id}`, { 
            method: "PUT",
            headers: {
                "Authorization": `Token ${localStorage.getItem("gr_token")}`,
                "Content-Type": "application/json"               
            },
            body: JSON.stringify(game)
        }).then(getGames)
    }

    const deleteGame = (gameId) => {
        return fetch(`http://localhost:8000/games/${gameId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${localStorage.getItem("gr_token")}`
            }
        })
        .then(getGames)
    }

    const searchGames = (searchTerms) => {
        return fetch(`http://localhost:8000/games?q=${searchTerms}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("gr_token")}`
            }
        })
        .then(res => res.json())
        .then(setGames)
    }

    const sortGames = (sortTerms) => {
        return fetch(`http://localhost:8000/games?orderby=${sortTerms}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("gr_token")}`
            }
        })
        .then(res => res.json())
        .then(setGames)
    }

    return (
        <GameContext.Provider value={{ games, getGames, createGame, editGame, getGame, getReviews, reviews, createReview, ratings, createRating, deleteGame, pictures, getPictures, createPicture, searchGames, searchedGames, sortGames }} >
            { props.children }
        </GameContext.Provider>
    )
}

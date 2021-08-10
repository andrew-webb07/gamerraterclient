import React, { useState } from "react"

export const GameContext = React.createContext()

export const GameProvider = (props) => {
    const [ games, setGames ] = useState([])
    // const [ types, setTypes ] = useState([])


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

    return (
        <GameContext.Provider value={{ games, getGames, createGame, editGame, getGame }} >
            { props.children }
        </GameContext.Provider>
    )
}

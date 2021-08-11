import React, { useContext, useEffect } from "react"
import { GameContext } from "./GameProvider.js"
import { useHistory, Link } from "react-router-dom"
import "./Game.css"

export const GameList = (props) => {
    const { games, getGames, deleteGame } = useContext(GameContext)
    const history = useHistory()

    useEffect(() => {
        getGames()
    }, [])

    return (
        <article className="games">
            <h1>Gamer Rater Games</h1>
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                history.push({ pathname: "/games/new" })}}
                >Register New Game</button>
            {
                games.map(game => {
                    return <>
                    <section key={`game--${game.id}`} className="game">
                        <Link to={`/games/${game.id}`}>
                          <div>{ game.title }</div>
                          <div>Average Rating: {game.average_rating}</div>
                        </Link>
                        <button className="btn btn-3 btn-sep icon-create"
                            onClick={() => {
                            deleteGame(game.id)
                            .then(history.push({ pathname: "/games" }))}}
                        >Delete</button>
                        <button className="btn btn-2 btn-sep icon-create"
                            onClick={() => {
                            history.push({ pathname: `/games/${game.id}/edit` })}}
                        >Edit</button>
                    </section>
                    </>
                })
            }
            
        </article>
    )
}

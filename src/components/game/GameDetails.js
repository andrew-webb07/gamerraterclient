import React, { useContext, useEffect, useState } from "react"
import { GameContext } from "./GameProvider"
import "./Game.css"
import { useParams, useHistory } from "react-router-dom"

export const GameDetails = () => {
    const { games, getGame, getGames } = useContext(GameContext)
    const [ game, setGame ] = useState({})

    const { gameId } = useParams();

    const history = useHistory()

    useEffect(() => {
        getGames()
    }, [])

    useEffect(() => {
        if(gameId) {
            getGame(gameId).then(game => {
                setGame(game)
            })
        }
    }, [gameId])

    return (
    <section className="game">
        <h3 className="game__title">{ game.title }</h3>
        <div>Designer: {game.designer}</div>
        <div>Year Released: {game.year_released}</div>
        <div>Number of Players: {game.number_of_players}</div>
        <div>Time to Beat: {game.estimated_time_to_play}</div>
        <div>Age Rec: {game.age_recommendation}</div>
    </section>
    )
}
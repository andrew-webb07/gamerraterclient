import React, { useContext, useEffect, useState } from "react"
import { GameContext } from "./GameProvider"
import "./Game.css"
import { useParams, useHistory } from "react-router-dom"

export const GameDetails = () => {
    const { getGame, getGames, getReviews, reviews, createRating } = useContext(GameContext)
    const [ game, setGame ] = useState({})
    const [ currentRating, setCurrentRating ] = useState({})

    const { gameId } = useParams();

    const history = useHistory()

    useEffect(() => {
        getGames()
        getReviews()
    }, [])

    useEffect(() => {
        if(gameId) {
            getGame(gameId).then(game => {
                setGame(game)
            })
        }
    }, [gameId])

    const handleControlledInputChange = (event) => {
        const newRating = { ...currentRating }
        newRating[event.target.name] = event.target.value
        newRating.gameId = parseInt(gameId)
        setCurrentRating(newRating)
    }
    
    const filteredReviews = reviews.filter(review => review.game.id === game.id)

    return (
    <>
        <section className="game">
            <h3 className="game__title">{ game.title }</h3>
            <div>Designer: {game.designer}</div>
            <div>Year Released: {game.year_released}</div>
            <div>Number of Players: {game.number_of_players}</div>
            <div>Time to Beat: {game.estimated_time_to_play}</div>
            <div>Age Rec: {game.age_recommendation}</div>
            <div>Average Rating: {game.average_rating}</div>
            {
                filteredReviews.map(review => (
                    <>
                    <div className="review">{review.review} by {review.player.user.first_name}</div>
                    </>
                )

                )
            }
            <div>
                <input type="range" id="rating" name="rating"
            min="0" max="10" value={currentRating.rating} defaultValue="0" onChange={handleControlledInputChange}/>
                <label for="rating">Rating</label>
            </div>
            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const rating = {
                    rating: currentRating.rating,
                    gameId: parseInt(currentRating.gameId)
                    }
                    // Send POST request to your API
                    createRating(rating)
                        .then(() => history.push("/games"))
                }}>Submit Rating</button>

            <button
            onClick={() => history.push(`/games/${gameId}/review`)}>Review Game</button>
            <button
            onClick={() => history.push(`/games/${gameId}/picture`)}>Upload Action Picture</button>
        </section>
    </>
    )
}
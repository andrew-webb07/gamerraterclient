import React, { useContext, useState, useEffect } from "react"
import { GameContext } from "./GameProvider.js"
import { useHistory, useParams } from 'react-router-dom'

export const ReviewForm = () => {
    const history = useHistory()
    const { reviews, getReviews, getGame, getGames, createReview } = useContext(GameContext)
    const {gameId} = useParams()
    const [ currentReview, setCurrentReview ] = useState({})

    useEffect(() => {
        getReviews()
        getGames()
    }, [])

    const handleControlledInputChange = (event) => {
        const newReviewState = { ...currentReview }
        newReviewState[event.target.name] = event.target.value
        newReviewState.gameId = parseInt(gameId)
        setCurrentReview(newReviewState)
    }
    
    return (
        <form className="reviewForm">
            <h2>Write a Review</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="review">Review: </label>
                    <textarea type="textarea" name="review" required autoFocus className="form-control"
                        value={currentReview.review}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const review = {
                    review: currentReview.review,
                    gameId: parseInt(currentReview.gameId)
                    }
                    // Send POST request to your API
                    createReview(review)
                        .then(() => history.push(`/games/${gameId}`))
                }}
                className="btn btn-primary">Save</button>
        </form>
    )
}
import React, { useContext, useState, useEffect } from "react"
import { GameContext } from "./GameProvider.js"
import { useHistory, useParams } from 'react-router-dom'
import { CategoryContext } from "../categories/CategoryProvider.js"


export const GameForm = () => {
    const history = useHistory()
    const { createGame, editGame, getGame } = useContext(GameContext)
    const { getCategories, categories } = useContext(CategoryContext)
    const [gameCategories, setGameCategories] = useState([])

    const {gameId} = useParams()

    const [currentGame, setCurrentGame] = useState({})

    useEffect(() => {
        getCategories()
    }, [])

    useEffect(() => {
        if(gameId) {
            getGame(gameId).then(game => {
                console.log(game)
                setCurrentGame({
                    title: game.title,
                    description: game.description,
                    designer: game.designer,
                    yearReleased: game.year_released,
                    numberOfPlayers: game.number_of_players,
                    estimatedTimeToPlay: game.estimated_time_to_play,
                    ageRecommendation: game.age_recommendation
                })
            })
        }
    }, [gameId])

    const handleControlledInputChange = (event) => {
        const newGameState = { ...currentGame }
        newGameState[event.target.name] = event.target.value
        setCurrentGame(newGameState)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__name">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={currentGame.description}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="designer">Designer: </label>
                    <input type="text" name="designer" required autoFocus className="form-control"
                        value={currentGame.designer}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="yearReleased">Year Released: </label>
                    <input type="text" name="yearReleased" required autoFocus className="form-control"
                        value={currentGame.yearReleased}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="numberOfPlayers">Number of Players: </label>
                    <input type="text" name="numberOfPlayers" required autoFocus className="form-control"
                        value={currentGame.numberOfPlayers}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="estimatedTimeToPlay">Estimated time to beat game: </label>
                    <input type="text" name="estimatedTimeToPlay" required autoFocus className="form-control"
                        value={currentGame.estimatedTimeToPlay}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="ageRecommendation">Age Recommendation</label>
                    <input type="text" name="ageRecommendation" required autoFocus className="form-control"
                        value={currentGame.ageRecommendation}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div>
                    {categories.map(category => (
                        <>
                        <input type="checkbox" key={category.id} value={category.id} onClick={event => {
                        const copyGameCategories = [...gameCategories]
                        const idPosition = copyGameCategories.indexOf(category.id)
                        if (idPosition >= 0) {
                            copyGameCategories.splice(idPosition, 1)
                        }
                        else {
                            copyGameCategories.push(category.id)
                        }
                        setGameCategories(copyGameCategories)
                        }}/>{category.label}</>))}
                </div>
            </fieldset>
            {
                (gameId)
                ? <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()
                    editGame({
                        id: gameId,
                        title: currentGame.title,
                        gameTypeId: parseInt(currentGame.gameTypeId),
                        description: currentGame.description,
                        numberOfPlayers: parseInt(currentGame.numberOfPlayers),
                        maker: currentGame.maker
                    })
                    .then(() => history.push("/games"))
                }}
                className="btn btn-primary">Edit</button>
                : <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                    title: currentGame.title,
                    description: currentGame.description,
                    designer: currentGame.designer,
                    yearReleased: parseInt(currentGame.yearReleased),
                    numberOfPlayers: parseInt(currentGame.numberOfPlayers),
                    estimatedTimeToPlay: parseInt(currentGame.estimatedTimeToPlay),
                    ageRecommendation: parseInt(currentGame.ageRecommendation),
                    categories: gameCategories
                    }
                    // Send POST request to your API
                    createGame(game)
                        .then(() => history.push("/games"))
                }}
                className="btn btn-primary">Save</button>
            }
            
        </form>
    )
}

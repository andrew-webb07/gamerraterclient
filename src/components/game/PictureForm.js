import React, { useContext, useState, useEffect } from "react"
import { GameContext } from "./GameProvider.js"
import { useHistory, useParams } from 'react-router-dom'



export const PictureForm = () => {
    const history = useHistory()
    const { pictures, getPictures, getGame, getGames, createPicture } = useContext(GameContext)
    const {gameId} = useParams()
    const [ currentPicture, setCurrentPicture ] = useState({})
    const gameIdInt = parseInt(gameId)

    useEffect(() => {
        getPictures()
        getGames()
    }, [])

    const getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(file);
    }
    
    const createGameImageString = (event) => {
        getBase64(event.target.files[0], (base64ImageString) => {
            console.log("Base64 of file is", base64ImageString);
    
            // Update a component state variable to the value of base64ImageString
            setCurrentPicture(base64ImageString)
        });
    }
    
    
    return (
        <form className="PictureForm">
            <h2>Write a Picture</h2>
            <input type="file" id="game_image" onChange={createGameImageString} />
            <input type="hidden" name="game_id" value={gameIdInt} />
            <button onClick={(evt) => {
                evt.preventDefault()

                const picture = {
                image: currentPicture,
                gameId: gameIdInt
                }
                // Upload the stringified image that is stored in state
                createPicture(picture)
                .then(() => history.push("/games"))
            }}>Upload</button>

            </form>
    )
}
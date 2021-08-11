import React from "react"
import { Route } from "react-router-dom"
import { GameProvider } from "./game/GameProvider.js"
import { GameList } from "./game/GameList.js"
import { GameDetails} from "./game/GameDetails.js"
import { GameForm} from "./game/GameForm.js"
import { CategoryProvider } from "./categories/CategoryProvider.js"
import { ReviewForm } from "./game/ReviewForm.js"

export const ApplicationViews = () => {
    return <>
    <GameProvider>
        <CategoryProvider>
            <Route exact path="/">
                <h1>Gamer Rater</h1>
            </Route>
            <Route exact path="/games">
                <GameList />
            </Route>
            <Route exact path="/games/:gameId(\d+)">
                <GameDetails />
            </Route>
            <Route exact path="/games/new">
                <GameForm />
            </Route>
            <Route exact path="/games/:gameId(\d+)/edit">
                <GameForm />
            </Route>
            <Route exact path="/games/:gameId(\d+)/review">
                <ReviewForm />
            </Route>

        </CategoryProvider>
    </GameProvider>
    </>
}
/* NOTE: Game related inputs take place within game related classes */

function mouseClicked() {
    const mousePosition: Point = { x: mouseX, y: mouseY }

    if (menu && menu.isSetup) {
        game.removeHoleContaining(mousePosition, true)
    }
}

function keyPressed() {
    // Prevent error when reloading with keyboard shotcut
    if (!music || !menu || !game) {
        return
    }

    // Pause Music
    if (keyCode == ENTER) {
        console.log('enter', music.isMuted)
        if (music.isMuted) {
            music.unmuteMusic()
        } else {
            music.muteMusic()
        }
    }

    if (menu.isSetup) {
        // GAME SETUP
        if (menu.setupStep == 'start') {
            if (keyCode == SPACE) {
                enterCharacterSelection()
            }
        } else if (menu.setupStep == 'snake-selection') {
            if (keyCode == SPACE && menu.selectedSnakes.length > 0) {
                reloadGame()
            }
        }
    } else if (game.hasEnded) {
        // GAME OVER
        if (keyCode == BACKSPACE) {
            saveHighScoreToLocalStorage()
            enterCharacterSelection()
        }
        if (keyCode == SPACE) {
            saveHighScoreToLocalStorage()
            reloadGame()
        }
        if (keyCode == KEY_0) {
            game.holes.forEach((hole) => hole.state = 'ghosted')
        }
    } else if (game.isPaused) {
        // PAUSED GAME
        if (keyCode == BACKSPACE) {
            enterCharacterSelection()
        }
        if (keyCode == SPACE) {
            game.resume()
        }
    } else {
        // GAME IS RUNNING
        if (keyCode == SPACE) {
            game.pause()
        }

    }

    return false
}

function reloadGame() {
    const newSnakes = snakes.create(menu.selectedSnakes)
    game = new Game(newSnakes)
    menu.setupStep = 'done'
}

function enterCharacterSelection() {
    menu.setupStep = 'snake-selection'
    game = new Game([])
}

function saveHighScoreToLocalStorage() {
    const highScore = Number(localStorage.highScore)
    localStorage.highScore = max(game.score, highScore)
}
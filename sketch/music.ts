interface MusicFiles {
    menu: p5.SoundFile
    game: p5.SoundFile
}

class Music {
    private isMusicAllowed: boolean
    private musicFiles: MusicFiles
    private readonly menuVolume = 0.1
    private readonly gameVolume = 0.6

    constructor(musicFiles: MusicFiles) {
        this.isMusicAllowed = false
        this.musicFiles = musicFiles
        musicFiles.menu.setLoop(true)
        musicFiles.game.setLoop(true)

        if (localStorage.isMusicMuted === undefined) {
            localStorage.setItem('isMusicMuted', JSON.stringify(true))
        }

        if (!!JSON.parse(localStorage.isMusicMuted)) {
            this.muteMusic()
        } else {
            this.unmuteMusic()
        }
    }

    public userStartAudio() {
        this.isMusicAllowed = true

        if (menu.isSetup) {
            this.playMenuMusic()
        } else {
            this.playGameMusic()
        }
    }

    public toggleMute() {
        if (this.isMusicAllowed) {
            if (this.isMuted) {
                this.unmuteMusic()
            } else {
                this.muteMusic()
            }
        }
    }

    public get isMuted() {
        return !this.isMusicAllowed || !!JSON.parse(localStorage.isMusicMuted)
    }

    public playMenuMusic() {
        const { menu, game } = this.musicFiles
        if (game.isPlaying()) {
            game.stop()
        }
        menu.play()
    }

    public playGameMusic() {
        const { menu, game } = this.musicFiles
        if (menu.isPlaying()) {
            menu.stop()
        }
        game.play()
    }

    private muteMusic() {
        musicFiles.menu.setVolume(0)
        musicFiles.game.setVolume(0)
        localStorage.setItem('isMusicMuted', JSON.stringify(true))
    }

    private unmuteMusic() {
        musicFiles.menu.setVolume(this.menuVolume)
        musicFiles.game.setVolume(this.gameVolume)
        localStorage.setItem('isMusicMuted', JSON.stringify(false))
    }
}
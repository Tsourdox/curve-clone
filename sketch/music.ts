interface MusicFiles {
    menu: p5.SoundFile
    game: p5.SoundFile
}

class Music {
    private readonly fadeTime = 0.5
    private activeMusicFile: p5.SoundFile
    private musicFiles: MusicFiles

    constructor(musicFiles: MusicFiles) {
        this.musicFiles = musicFiles
        this.activeMusicFile = musicFiles.menu
        musicFiles.menu.setLoop(true)
        musicFiles.game.setLoop(true)

    }

    private getVolume(forFile: p5.SoundFile) {
        const { menu, game } = this.musicFiles
        switch (forFile) {
            case menu: return 0.1
            case game: return 1
            default: return 1
        }
    }

    private playMusicFile(musicFile: p5.SoundFile, volume: number): void {
        const isSameActiveFile = musicFile == this.activeMusicFile
        if (this.isPlaying() && !isSameActiveFile) {
            this.stopMusic()
            this.activeMusicFile = musicFile
            this.playMusic(volume)
        } else {
            this.activeMusicFile = musicFile
            this.playMusic(volume)
        }
    }

    private stopMusic() {
        this.activeMusicFile.setVolume(0, this.fadeTime)
        this.activeMusicFile.stop(this.fadeTime)
    }

    public isPlaying() {
        return this.activeMusicFile.isPlaying()
    }

    public playMusic(volume?: number) {
        if (!this.activeMusicFile.isPlaying()) {
            volume = volume || this.getVolume(this.activeMusicFile)
            this.activeMusicFile.setVolume(0)
            this.activeMusicFile.play()
            this.activeMusicFile.setVolume(volume, this.fadeTime)
        }
    }

    public pauseMusic() {
        this.activeMusicFile.setVolume(0, this.fadeTime)
        this.activeMusicFile.pause(this.fadeTime)
    }

    public playMenuMusic() {
        const { menu } = this.musicFiles
        const volume = this.getVolume(menu)
        this.playMusicFile(menu, volume)
    }

    public playGameMusic() {
        const { game } = this.musicFiles
        const volume = this.getVolume(game)
        this.playMusicFile(game, volume)
    }
}
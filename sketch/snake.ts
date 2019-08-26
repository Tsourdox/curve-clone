class Snake extends GameObject {
    public readonly id: number
    public readonly name: string
    private readonly color: p5.Color
    private readonly controls: Controls
    private direction!: number
    public isAlive!: boolean
    public thickness!: number
    public body!: Point[]

    constructor(name: string, _color: string, controls: Controls) {
        super()
        this.id = random(0, 999999)
        this.name = name
        this.color = color(_color)
        this.controls = controls
        this.birth()
    }

    private birth() {
        const paddingX = width * 0.1
        const paddingY = height * 0.1
        this.body = [{
            x: paddingX + random() * (width - paddingX * 2),
            y: paddingY + random() * (height - paddingY * 2)
        }]
        this.direction = random(0, 360)
        this.thickness = 5
        this.isAlive = true
    }

    public get head() {
        return this.body[this.body.length - 1]
    }

    private get tail() {
        return this.body[0]
    }

    public update() {
        if (this.isAlive) {
            this.updateDirection()
            this.growBody()
        } else {
            this.shrinkBody()
        }
    }

    public draw() {
        if (game.isPaused || !this.isAlive) {
            this.drawHead()
        }
        this.drawBody()
    }

    private drawHead() {
        const { x, y } = this.head
        noStroke()
        fill(this.color)
        circle(x, y, this.thickness)
        noFill()
        stroke(this.color)
        strokeWeight(this.thickness * 0.5)
        circle(x, y, this.thickness * 4)
    }

    private drawBody() {
        stroke(this.color)
        strokeWeight(this.thickness)
        curveTightness(0.5)
        noFill()

        beginShape()
        curveVertex(this.tail.x, this.tail.y)
        for (let i = 0; i < this.body.length; i++) {
            const { x, y } = this.body[i]
            curveVertex(x, y)
        }
        curveVertex(this.head.x, this.head.y)
        endShape()
    }

    private updateDirection() {
        if (keyIsDown(this.controls.left)) {
            this.direction -= 0.05
        } else if (keyIsDown(this.controls.right)) {
            this.direction += 0.05
        }
    }

    private growBody() {
        const { x, y } = this.body[this.body.length - 1]
        this.body.push({
            x: x + cos(this.direction) * 1,
            y: y + sin(this.direction) * 1
        })
    }

    private shrinkBody() {
        for (let i = 0; i < 3; i++){
            if (this.body.length > 1) {
                this.body.shift()
            }
        }
    }
}
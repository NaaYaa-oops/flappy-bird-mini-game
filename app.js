class Canvas {
    constructor() {
        this.canvas = document.querySelector('canvas')
        this.ctx = this.canvas.getContext('2d')
    }
}


class World extends Canvas {
    constructor() {
        super()
        this.width = this.canvas.width
        this.height = this.canvas.height
        this.speed = 1.5
    }

    draw() {
        this.ctx.fillStyle = 'coral'
        this.ctx.fillRect(0, 0, this.width, this.height)
    }
}


class Bird extends Canvas {
    constructor() {
        super()
        this.x = 20
        this.y = 100
        this.gravitation = 1
        this.width = 30
        this.height = 30
        this.img = new Image()
        this.img.src = 'bird.png'
    }

    reset() {
        this.birdIsOut = this.y > this.canvas.height || this.y < 0
        if (this.birdIsOut) {
            this.y = 0
            this.gravitation = 1
        }
    }

    draw() {
        this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
        this.reset()
        this.y += this.gravitation
        this.gravitation += .3
    }

    fly() {
        this.gravitation = -7
    }

}


class Tube extends World {
    constructor(x) {
        super()
        this.width = 50
        this.height = Math.random() * 300
        this.x = x
        this.y = 0
        this.space = 200
    }

    draw() {
        this.ctx.fillStyle = 'green'
        this.ctx.fillRect(this.x, this.y, this.width, this.height)
        this.ctx.fillStyle = 'green'
        this.ctx.fillRect(this.x, this.height + this.space, this.width, this.canvas.height)
        this.x -= this.speed
        if (this.x + this.width < 0) {
            this.x = this.canvas.width + this.canvas.width / 2
            this.height = Math.random() * 450
        }
    }

    get collision() {
        return this.height = Math.random() * 450
    }
}


const distanceBetweenTubes = 200
const bird = new Bird()
const tubes = [new Tube(distanceBetweenTubes), new Tube(distanceBetweenTubes * 2.5), new Tube(distanceBetweenTubes * 4)]
const world = new World()

function render() {
    new World().draw()
    tubes.forEach(tube => {
        tube.speed += 0.001
        tube.draw()
        const isTubeOut = (tube.x - tube.width) < bird.x - bird.width && (tube.x - tube.width) > -(bird.width * 2)
        if (isTubeOut) {
            const isBirdHit = tube.height > bird.y || (tube.height + tube.space) < bird.y
            if (isBirdHit) {
                reset()
            }
        }
    })
    bird.draw()
}

(function menuRender() {
    new World().draw()
    tubes.forEach(tube => {
        tube.draw()
    })
    bird.draw()

    document.onkeydown = (e) => {
        if (e.code === 'Space') {
            bird.fly()
        }
    }
    document.querySelector('#btn-start').onclick = () => {
        document.querySelector('.modal').style.display = 'none'
        setInterval(render, 1000 / 70)
    }
}())

function reset() {
    bird.y = world.height / 2 - bird.height * 2
    bird.gravitation = 1
    tubes.forEach((tube, index) => {
        tube.x = ((index + 1) * 300) + distanceBetweenTubes
        tube.height = tube.collision
        tube.speed = world.speed
    })
}

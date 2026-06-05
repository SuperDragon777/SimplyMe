const roles = [
	'Hello, World!',
	'DevOps',
	'Developer',
	'CLI tools enthusiast',
	'Cool guy',
	'{ "editor": "vscode" }',
	'Gamer',
	'ed2b6ad94e3fc63b55f28f8be40bb4b2',
	'821a51fb9fb921ca4be7efefe63fc413'
]

let roleIdx = 0
let charIdx = 0
let isDeleting = false
const typedEl = document.getElementById('typed-role')

function type() {
	if (!typedEl) return
	const current = roles[roleIdx]

	if (isDeleting) {
		typedEl.textContent = current.slice(0, --charIdx)
	} else {
		typedEl.textContent = current.slice(0, ++charIdx)
	}

	let delay = isDeleting ? 40 : 80

	if (!isDeleting && charIdx === current.length) {
		delay = 2000
		isDeleting = true
	} else if (isDeleting && charIdx === 0) {
		isDeleting = false
		roleIdx = (roleIdx + 1) % roles.length
		delay = 300
	}

	setTimeout(type, delay)
}

document.addEventListener('DOMContentLoaded', () => {
	setTimeout(type, 600)
	initParticles()
})

function initParticles() {
	const canvas = document.getElementById('particles-canvas')
	if (!canvas) return
	const ctx = canvas.getContext('2d')

	let W, H, particles

	function resize() {
		W = canvas.width = window.innerWidth
		H = canvas.height = window.innerHeight
	}

	function createParticles() {
		const count = Math.floor((W * H) / 18000)
		particles = Array.from({ length: count }, () => ({
			x: Math.random() * W,
			y: Math.random() * H,
			r: Math.random() * 1.2 + 0.3,
			dx: (Math.random() - 0.5) * 0.25,
			dy: (Math.random() - 0.5) * 0.25,
			alpha: Math.random() * 0.35 + 0.05
		}))
	}

	function draw() {
		ctx.clearRect(0, 0, W, H)

		for (const p of particles) {
			ctx.beginPath()
			ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
			ctx.fillStyle = `rgba(0, 231, 255, ${p.alpha})`
			ctx.fill()

			p.x += p.dx
			p.y += p.dy

			if (p.x < 0) p.x = W
			if (p.x > W) p.x = 0
			if (p.y < 0) p.y = H
			if (p.y > H) p.y = 0
		}

		for (let i = 0; i < particles.length; i++) {
			for (let j = i + 1; j < particles.length; j++) {
				const a = particles[i]
				const b = particles[j]
				const dist = Math.hypot(a.x - b.x, a.y - b.y)
				if (dist < 100) {
					ctx.beginPath()
					ctx.moveTo(a.x, a.y)
					ctx.lineTo(b.x, b.y)
					ctx.strokeStyle = `rgba(0, 231, 255, ${0.06 * (1 - dist / 100)})`
					ctx.lineWidth = 0.5
					ctx.stroke()
				}
			}
		}

		requestAnimationFrame(draw)
	}

	resize()
	createParticles()
	draw()

	window.addEventListener('resize', () => {
		resize()
		createParticles()
	})
}

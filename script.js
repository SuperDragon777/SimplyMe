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
	const mouse = { x: -9999, y: -9999 }

	const GLOW_RADIUS = 120
	const WEB_RADIUS = 150
	const CONNECT_DIST = 100
	const ATTRACT_RADIUS = 160
	const ATTRACT_FORCE = 0.012
	const FRICTION = 0.94

	function resize() {
		W = canvas.width = window.innerWidth
		H = canvas.height = window.innerHeight
	}

	function createParticles() {
		const count = Math.floor((W * H) / 18000)
		particles = Array.from({ length: count }, () => ({
			x: Math.random() * W,
			y: Math.random() * H,
			vx: (Math.random() - 0.5) * 0.25,
			vy: (Math.random() - 0.5) * 0.25,
			r: Math.random() * 1.2 + 0.3,
			baseAlpha: Math.random() * 0.35 + 0.05
		}))
	}

	function draw() {
		ctx.clearRect(0, 0, W, H)

		for (const p of particles) {
			const dx = mouse.x - p.x
			const dy = mouse.y - p.y
			const dist = Math.hypot(dx, dy)

			if (dist < ATTRACT_RADIUS && dist > 0) {
				const force = (1 - dist / ATTRACT_RADIUS) * ATTRACT_FORCE
				p.vx += (dx / dist) * force * dist * 0.04
				p.vy += (dy / dist) * force * dist * 0.04
			}

			p.vx *= FRICTION
			p.vy *= FRICTION
			p.x += p.vx
			p.y += p.vy

			if (p.x < 0) p.x = W
			if (p.x > W) p.x = 0
			if (p.y < 0) p.y = H
			if (p.y > H) p.y = 0

			const d = Math.hypot(mouse.x - p.x, mouse.y - p.y)
			const boost = d < GLOW_RADIUS ? (1 - d / GLOW_RADIUS) * 0.55 : 0
			const alpha = Math.min(p.baseAlpha + boost, 0.88)
			const r = p.r + boost * 1.8

			ctx.beginPath()
			ctx.arc(p.x, p.y, r, 0, Math.PI * 2)
			ctx.fillStyle = `rgba(0, 231, 255, ${alpha})`
			ctx.fill()
		}

		for (let i = 0; i < particles.length; i++) {
			for (let j = i + 1; j < particles.length; j++) {
				const a = particles[i]
				const b = particles[j]
				const dist = Math.hypot(a.x - b.x, a.y - b.y)
				if (dist < CONNECT_DIST) {
					ctx.beginPath()
					ctx.moveTo(a.x, a.y)
					ctx.lineTo(b.x, b.y)
					ctx.strokeStyle = `rgba(0, 231, 255, ${0.06 * (1 - dist / CONNECT_DIST)})`
					ctx.lineWidth = 0.5
					ctx.stroke()
				}
			}

			const p = particles[i]
			const cd = Math.hypot(mouse.x - p.x, mouse.y - p.y)
			if (cd < WEB_RADIUS) {
				ctx.beginPath()
				ctx.moveTo(p.x, p.y)
				ctx.lineTo(mouse.x, mouse.y)
				ctx.strokeStyle = `rgba(0, 231, 255, ${0.13 * (1 - cd / WEB_RADIUS)})`
				ctx.lineWidth = 0.5
				ctx.stroke()
			}
		}

		requestAnimationFrame(draw)
	}

	window.addEventListener('mousemove', e => {
		mouse.x = e.clientX
		mouse.y = e.clientY
	})

	window.addEventListener('mouseleave', () => {
		mouse.x = -9999
		mouse.y = -9999
	})

	resize()
	createParticles()
	draw()

	window.addEventListener('resize', () => {
		resize()
		createParticles()
	})
}

function openProjects() {
	const modal = document.getElementById('projects-modal')
	if (!modal) return
	modal.classList.add('open')
	document.body.style.overflow = 'hidden'
}

function closeProjects(e) {
	if (e && e.target !== document.getElementById('projects-modal')) return
	const modal = document.getElementById('projects-modal')
	if (!modal) return
	modal.classList.remove('open')
	document.body.style.overflow = ''
}

document.addEventListener('keydown', e => {
	if (e.key === 'Escape') closeProjects()
})

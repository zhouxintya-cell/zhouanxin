import { useEffect, useRef, useState } from 'react'

const createPearl = (width, height, diver) => {
  const radius = Math.random() * 8 + 12
  let x = radius + Math.random() * Math.max(width - radius * 2, radius)
  let y = radius + Math.random() * Math.max(height - radius * 2, radius)
  let guard = 0

  while (Math.hypot(x - diver.x, y - diver.y) < radius + diver.size + 40 && guard < 20) {
    x = radius + Math.random() * Math.max(width - radius * 2, radius)
    y = radius + Math.random() * Math.max(height - radius * 2, radius)
    guard += 1
  }

  return {
    x,
    y,
    radius,
    hue: 180 + Math.random() * 80,
    shimmer: Math.random() * 360,
  }
}

const spawnPearls = (count, width, height, diver) => {
  const pearls = []
  while (pearls.length < count) {
    pearls.push(createPearl(width, height, diver))
  }
  return pearls
}

const MiniGame = ({ onUnlock, unlocked, darkMode }) => {
  const canvasRef = useRef(null)
  const animationRef = useRef(0)
  const contextRef = useRef(null)
  const areaRef = useRef({ width: 420, height: 260 })
  const diverRef = useRef({ x: 210, y: 150, size: 22 })
  const pearlsRef = useRef([])
  const keysRef = useRef({})
  const unlockedRef = useRef(unlocked)
  const collectedRef = useRef(0)
  const touchRef = useRef(null)

  const [collected, setCollected] = useState(0)
  const [message, setMessage] = useState('Use arrow keys or tap the compass to swim.')

  useEffect(() => {
    unlockedRef.current = unlocked
  }, [unlocked])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    contextRef.current = context

    const configureCanvas = () => {
      const ratio = window.devicePixelRatio || 1
      const parentWidth = canvas.parentElement?.clientWidth ?? 420
      const width = Math.min(420, Math.max(300, parentWidth))
      const height = Math.min(320, Math.max(230, width * 0.58))

      areaRef.current = { width, height }
      canvas.width = width * ratio
      canvas.height = height * ratio
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(1, 0, 0, 1, 0, 0)
      context.scale(ratio, ratio)

      const diver = diverRef.current
      diver.size = Math.max(18, width * 0.05)
      if (!pearlsRef.current.length) {
        diver.x = width * 0.45
        diver.y = height * 0.62
      } else {
        diver.x = Math.min(Math.max(diver.size, diver.x), width - diver.size)
        diver.y = Math.min(Math.max(diver.size, diver.y), height - diver.size)
      }

      if (!pearlsRef.current.length) {
        pearlsRef.current = spawnPearls(3, width, height, diver)
      }
    }

    configureCanvas()
    window.addEventListener('resize', configureCanvas)
    return () => window.removeEventListener('resize', configureCanvas)
  }, [])

  useEffect(() => {
    const onKeyDown = (event) => {
      const key = event.key.toLowerCase()
      if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'w', 'a', 's', 'd'].includes(key)) {
        event.preventDefault()
        keysRef.current[key] = true
      }
    }

    const onKeyUp = (event) => {
      const key = event.key.toLowerCase()
      if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'w', 'a', 's', 'd'].includes(key)) {
        keysRef.current[key] = false
      }
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
    }
  }, [])

  useEffect(() => {
    const drawScene = (ctx) => {
      const { width, height } = areaRef.current
      ctx.clearRect(0, 0, width, height)

      const background = ctx.createLinearGradient(0, 0, 0, height)
      if (darkMode) {
        background.addColorStop(0, 'rgba(6, 24, 54, 0.95)')
        background.addColorStop(1, 'rgba(2, 12, 27, 0.98)')
      } else {
        background.addColorStop(0, 'rgba(11, 61, 145, 0.65)')
        background.addColorStop(1, 'rgba(3, 27, 63, 0.92)')
      }
      ctx.fillStyle = background
      ctx.fillRect(0, 0, width, height)

      ctx.save()
      ctx.globalAlpha = 0.22
      const beam = ctx.createLinearGradient(0, 0, width, height)
      beam.addColorStop(0, 'rgba(255, 255, 255, 0)')
      beam.addColorStop(0.5, darkMode ? 'rgba(62, 230, 255, 0.35)' : 'rgba(194, 243, 255, 0.45)')
      beam.addColorStop(1, 'rgba(255, 255, 255, 0)')
      ctx.fillStyle = beam
      ctx.beginPath()
      ctx.moveTo(width * 0.05, 0)
      ctx.lineTo(width * 0.35, 0)
      ctx.lineTo(width * 0.2, height)
      ctx.lineTo(0, height)
      ctx.closePath()
      ctx.fill()
      ctx.restore()

      pearlsRef.current.forEach((pearl, index) => {
        const glowRadius = pearl.radius + 6 + Math.sin((Date.now() / 240 + index) % (Math.PI * 2)) * 2
        ctx.save()
        ctx.globalAlpha = 0.45
        ctx.fillStyle = `hsla(${pearl.hue}, 100%, ${darkMode ? 65 : 75}%, 0.4)`
        ctx.beginPath()
        ctx.arc(pearl.x, pearl.y, glowRadius, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()

        const pearlShade = ctx.createRadialGradient(
          pearl.x - pearl.radius * 0.3,
          pearl.y - pearl.radius * 0.4,
          pearl.radius * 0.2,
          pearl.x,
          pearl.y,
          pearl.radius
        )
        pearlShade.addColorStop(0, `hsla(${pearl.hue}, 90%, 85%, 0.95)`)
        pearlShade.addColorStop(0.7, `hsla(${pearl.hue}, 80%, ${darkMode ? 55 : 60}%, 0.55)`)
        pearlShade.addColorStop(1, 'rgba(255, 255, 255, 0.05)')
        ctx.fillStyle = pearlShade
        ctx.beginPath()
        ctx.arc(pearl.x, pearl.y, pearl.radius, 0, Math.PI * 2)
        ctx.fill()

        ctx.lineWidth = 1.6
        ctx.strokeStyle = 'rgba(194, 243, 255, 0.65)'
        ctx.stroke()
      })

      const diver = diverRef.current
      ctx.save()
      ctx.translate(diver.x, diver.y)

      ctx.save()
      ctx.globalAlpha = 0.35
      ctx.fillStyle = 'rgba(194, 243, 255, 0.35)'
      ;[0, 1, 2].forEach((offset) => {
        ctx.beginPath()
        const wobble = Math.sin(Date.now() / 320 + offset) * 4
        ctx.arc(-diver.size * (0.9 + offset * 0.35), wobble, diver.size * (0.18 + offset * 0.05), 0, Math.PI * 2)
        ctx.fill()
      })
      ctx.restore()

      ctx.shadowColor = 'rgba(62, 230, 255, 0.5)'
      ctx.shadowBlur = 18
      ctx.fillStyle = 'rgba(62, 230, 255, 0.85)'
      ctx.beginPath()
      ctx.ellipse(0, -diver.size * 0.3, diver.size * 0.72, diver.size * 0.62, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.shadowBlur = 0

      ctx.fillStyle = darkMode ? 'rgba(2, 12, 27, 0.9)' : 'rgba(3, 27, 63, 0.82)'
      ctx.beginPath()
      ctx.moveTo(-diver.size * 0.5, -diver.size * 0.1)
      ctx.quadraticCurveTo(0, -diver.size * 0.9, diver.size * 0.5, -diver.size * 0.1)
      ctx.lineTo(diver.size * 0.55, diver.size * 0.7)
      ctx.quadraticCurveTo(0, diver.size * 1.05, -diver.size * 0.55, diver.size * 0.7)
      ctx.closePath()
      ctx.fill()

      ctx.fillStyle = 'rgba(255, 123, 137, 0.75)'
      ctx.beginPath()
      ctx.moveTo(-diver.size * 0.45, diver.size * 0.5)
      ctx.quadraticCurveTo(-diver.size * 0.9, diver.size * 0.85, -diver.size * 0.3, diver.size * 0.95)
      ctx.quadraticCurveTo(-diver.size * 0.1, diver.size * 0.7, -diver.size * 0.45, diver.size * 0.5)
      ctx.fill()
      ctx.beginPath()
      ctx.moveTo(diver.size * 0.45, diver.size * 0.5)
      ctx.quadraticCurveTo(diver.size * 0.9, diver.size * 0.85, diver.size * 0.3, diver.size * 0.95)
      ctx.quadraticCurveTo(diver.size * 0.1, diver.size * 0.7, diver.size * 0.45, diver.size * 0.5)
      ctx.fill()

      ctx.fillStyle = 'rgba(194, 243, 255, 0.85)'
      ctx.beginPath()
      ctx.ellipse(0, -diver.size * 0.05, diver.size * 0.48, diver.size * 0.35, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.lineWidth = 2
      ctx.strokeStyle = 'rgba(62, 230, 255, 0.6)'
      ctx.stroke()

      ctx.fillStyle = 'rgba(3, 27, 63, 0.9)'
      ctx.beginPath()
      ctx.arc(diver.size * 0.3, -diver.size * 0.1, diver.size * 0.1, 0, Math.PI * 2)
      ctx.fill()

      ctx.restore()

      ctx.save()
      ctx.globalAlpha = 0.15
      ctx.fillStyle = 'rgba(194, 243, 255, 0.5)'
      ctx.beginPath()
      ctx.ellipse(diver.x + diver.size * 0.85, diver.y - diver.size * 0.65, diver.size * 0.3, diver.size * 0.35, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()

      ctx.save()
      ctx.globalAlpha = 0.1
      const seabed = ctx.createLinearGradient(0, height * 0.7, 0, height)
      seabed.addColorStop(0, 'rgba(255, 255, 255, 0)')
      seabed.addColorStop(1, 'rgba(3, 27, 63, 0.7)')
      ctx.fillStyle = seabed
      ctx.fillRect(-10, height * 0.7, width + 20, height * 0.35)
      ctx.restore()
    }

    const updateScene = () => {
      const diver = diverRef.current
      const { width, height } = areaRef.current
      const input = keysRef.current
      let dx = 0
      let dy = 0
      const activeTouch = touchRef.current

      if (input.arrowup || input.w || activeTouch === 'up') dy -= 1
      if (input.arrowdown || input.s || activeTouch === 'down') dy += 1
      if (input.arrowleft || input.a || activeTouch === 'left') dx -= 1
      if (input.arrowright || input.d || activeTouch === 'right') dx += 1

      if (dx && dy) {
        dx *= Math.SQRT1_2
        dy *= Math.SQRT1_2
      }

      const speed = 2.1
      diver.x += dx * speed
      diver.y += dy * speed

      const limit = diver.size * 0.7
      diver.x = Math.min(Math.max(limit, diver.x), width - limit)
      diver.y = Math.min(Math.max(limit, diver.y), height - limit)

      let harvested = false

      pearlsRef.current = pearlsRef.current.filter((pearl) => {
        const distance = Math.hypot(pearl.x - diver.x, pearl.y - diver.y)
        if (distance < pearl.radius + diver.size * 0.55) {
          harvested = true
          return false
        }
        return true
      })

      if (harvested) {
        collectedRef.current += 1
        setCollected(collectedRef.current)

        if (collectedRef.current === 1) {
          setMessage('The reef whispers: two more to go.')
        } else if (collectedRef.current === 2) {
          setMessage('Almost there—one final glow awaits.')
        } else if (collectedRef.current >= 3) {
          setMessage('The abyss reveals a hidden current.')
        }

        if (collectedRef.current >= 3 && !unlockedRef.current) {
          unlockedRef.current = true
          onUnlock?.()
        }
      }

      const { width: w, height: h } = areaRef.current
      while (pearlsRef.current.length < 3) {
        pearlsRef.current.push(createPearl(w, h, diver))
      }
    }

    const animate = () => {
      const ctx = contextRef.current
      if (!ctx) return

      updateScene()
      drawScene(ctx)

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationRef.current)
  }, [darkMode, onUnlock])

  const handleTouchStart = (direction) => (event) => {
    event.preventDefault()
    touchRef.current = direction
  }

  const handleTouchEnd = (event) => {
    event.preventDefault()
    touchRef.current = null
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="game-canvas">
        <canvas ref={canvasRef} className="w-full" aria-label="Tiny diver game" />
      </div>
      <div className="flex flex-col items-center gap-2 text-center text-sm text-sunlit-water/90 dark:text-sunlit-water/80">
        <span className="font-mono tracking-[0.35em] uppercase text-xs text-sunlit-water/70">
          Pearls gathered: {collected}
        </span>
        <p className="max-w-sm text-sunlit-water/90">{message}</p>
      </div>
      <div className="touch-pad grid w-full max-w-xs grid-cols-3 gap-2 text-xs font-mono uppercase tracking-[0.3em] text-sunlit-water/80 sm:hidden">
        <button
          type="button"
          aria-label="Swim up"
          onTouchStart={handleTouchStart('up')}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
        >
          ▲
        </button>
        <div />
        <button
          type="button"
          aria-label="Swim right"
          onTouchStart={handleTouchStart('right')}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
        >
          ▶
        </button>
        <button
          type="button"
          aria-label="Swim left"
          onTouchStart={handleTouchStart('left')}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
        >
          ◀
        </button>
        <button
          type="button"
          aria-label="Dive"
          onTouchStart={handleTouchStart('down')}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
        >
          ▼
        </button>
        <div />
      </div>
    </div>
  )
}

export default MiniGame

import { useCallback, useEffect, useRef } from "react"

const TRAIL_LIFETIME = 2400
const MAX_PARTICLES = 180
const DPR_LIMIT = 2

type Particle = {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  hue: number
  size: number
  alpha: number
  created: number
}

type CursorState = {
  x: number
  y: number
  visible: boolean
  hovering: boolean
  pressed: boolean
  label?: string
}

type CustomCursorProps = {
  isDesktopCursor: boolean
  cursor: CursorState
  zIndex?: number
}

export default function CustomCursor({
  isDesktopCursor,
  cursor,
  zIndex = 9998,
}: CustomCursorProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const particlesRef = useRef<Particle[]>([])
  const frameRef = useRef<number | null>(null)
  const lastMouseRef = useRef({ x: 0, y: 0 })
  const prevPressedRef = useRef(false)
  const cursorRef = useRef(cursor)

  useEffect(() => {
    cursorRef.current = cursor
  }, [cursor])

  const trimParticles = useCallback(() => {
    const list = particlesRef.current
    if (list.length > MAX_PARTICLES) {
      list.splice(0, list.length - MAX_PARTICLES)
    }
  }, [])

  const addParticle = useCallback(
    (
      x: number,
      y: number,
      options?: {
        count?: number
        sizeMin?: number
        sizeMax?: number
        speedMin?: number
        speedMax?: number
        lift?: number
      }
    ) => {
      const {
        count = 1,
        sizeMin = 3,
        sizeMax = 7,
        speedMin = 0.35,
        speedMax = 1.2,
        lift = 1,
      } = options || {}

      const now = Date.now()

      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = speedMin + Math.random() * (speedMax - speedMin)
        const hue = (now / 10 + i * 16 + Math.random() * 24) % 360

        particlesRef.current.push({
          id: now + Math.random() + i,
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - lift,
          hue,
          size: sizeMin + Math.random() * (sizeMax - sizeMin),
          alpha: 1,
          created: now,
        })
      }

      trimParticles()
    },
    [trimParticles]
  )

  const createClickBurst = useCallback(
    (x: number, y: number) => {
      addParticle(x, y, {
        count: 32,
        sizeMin: 4,
        sizeMax: 10,
        speedMin: 1,
        speedMax: 3.4,
        lift: 0.45,
      })

      addParticle(x, y, {
        count: 20,
        sizeMin: 2,
        sizeMax: 6,
        speedMin: 0.8,
        speedMax: 2.2,
        lift: 0.2,
      })
    },
    [addParticle]
  )

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      frameRef.current = requestAnimationFrame(draw)
      return
    }

    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) {
      frameRef.current = requestAnimationFrame(draw)
      return
    }

    const { x, y, visible, hovering } = cursorRef.current
    const now = Date.now()

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    particlesRef.current = particlesRef.current.filter((p) => {
      const age = now - p.created
      const lifeProgress = Math.min(age / TRAIL_LIFETIME, 1)

      p.x += p.vx
      p.y += p.vy
      p.vy += 0.025
      p.alpha = Math.max(0, 1 - lifeProgress * 1.15)

      const currentSize = Math.max(0.8, p.size * (1 - lifeProgress * 0.6))

      if (p.alpha <= 0.04) return false

      ctx.save()
      ctx.globalAlpha = p.alpha
      ctx.shadowBlur = 18
      ctx.shadowColor = `hsla(${p.hue}, 100%, 75%, 0.9)`
      ctx.fillStyle = `hsla(${p.hue}, 100%, 72%, 0.95)`

      ctx.beginPath()
      ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2)
      ctx.fill()

      ctx.shadowBlur = 0
      ctx.fillStyle = `hsla(${p.hue}, 100%, 88%, 0.95)`
      ctx.beginPath()
      ctx.arc(p.x, p.y, currentSize * 0.42, 0, Math.PI * 2)
      ctx.fill()

      ctx.restore()
      return true
    })

    if (visible) {
      const active = hovering
      const radius = active ? 20 : 14
      const segments = active ? 36 : 28
      const rotationSpeed = active ? 240 : 480

      ctx.save()
      ctx.translate(x, y)

      for (let i = 0; i < segments; i++) {
        const angle = (i / segments) * Math.PI * 2 + now / rotationSpeed
        const hue = (i * 13 + now / 14) % 360
        const wave = Math.sin(angle * 3 + now / 180) * (active ? 2.8 : 2.1)

        ctx.beginPath()
        ctx.strokeStyle = `hsla(${hue}, 100%, 72%, 0.88)`
        ctx.lineWidth = active ? 4.8 : 3.8
        ctx.lineCap = "round"
        ctx.shadowBlur = active ? 16 : 12
        ctx.shadowColor = `hsla(${hue}, 100%, 78%, 0.95)`
        ctx.arc(0, 0, radius + wave, angle, angle + 0.44)
        ctx.stroke()
      }

      const halo = ctx.createRadialGradient(0, 0, 0, 0, 0, active ? 26 : 20)
      halo.addColorStop(0, "rgba(255,255,255,0.18)")
      halo.addColorStop(0.4, "rgba(255,255,255,0.10)")
      halo.addColorStop(1, "rgba(255,255,255,0)")

      ctx.beginPath()
      ctx.fillStyle = halo
      ctx.arc(0, 0, active ? 26 : 20, 0, Math.PI * 2)
      ctx.fill()

      const centerGlow = ctx.createRadialGradient(0, 0, 0, 0, 0, active ? 10 : 7)
      centerGlow.addColorStop(0, "rgba(255,255,255,0.95)")
      centerGlow.addColorStop(0.5, "rgba(255,255,255,0.28)")
      centerGlow.addColorStop(1, "rgba(255,255,255,0)")

      ctx.beginPath()
      ctx.fillStyle = centerGlow
      ctx.arc(0, 0, active ? 10 : 7, 0, Math.PI * 2)
      ctx.fill()

      ctx.restore()
    }

    frameRef.current = requestAnimationFrame(draw)
  }, [])

  useEffect(() => {
    if (!isDesktopCursor) return

    const { x, y, visible, hovering, pressed } = cursorRef.current
    if (!visible) return

    const dx = x - lastMouseRef.current.x
    const dy = y - lastMouseRef.current.y
    const distance = Math.sqrt(dx * dx + dy * dy)

    if (distance > 3) {
      const steps = Math.floor(distance / 8)

      for (let i = 0; i < Math.min(steps, 5); i++) {
        const ratio = steps > 0 ? i / steps : 0
        const px = lastMouseRef.current.x + dx * ratio
        const py = lastMouseRef.current.y + dy * ratio

        addParticle(px, py, {
          count: hovering ? 2 : 1,
          sizeMin: hovering ? 4 : 3,
          sizeMax: hovering ? 8 : 6,
          speedMin: 0.3,
          speedMax: 1.2,
          lift: 1,
        })
      }
    }

    if (pressed && !prevPressedRef.current) {
      createClickBurst(x, y)
    }

    prevPressedRef.current = pressed
    lastMouseRef.current = { x, y }
  }, [cursor, isDesktopCursor, addParticle, createClickBurst])

  useEffect(() => {
    if (!isDesktopCursor) return

    const canvas = canvasRef.current
    if (!canvas) return

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, DPR_LIMIT)
      const width = window.innerWidth
      const height = window.innerHeight

      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      }
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas, { passive: true })

    frameRef.current = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
    }
  }, [isDesktopCursor, draw])

  if (!isDesktopCursor) return null

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex,
        display: cursor.visible ? "block" : "none",
      }}
    />
  )
}
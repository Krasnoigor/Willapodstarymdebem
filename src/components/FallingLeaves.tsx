import { useEffect, useId, useRef, useState } from 'react'

type Leaf = {
  id: number
  left: number
  top: number
  size: number
  fallDuration: number
  swayDuration: number
  rotate: number
  opacity: number
  variant: 'green' | 'copper'
}

/** Minimum gap between two consecutive leaves appearing. */
const MIN_GAP_S = 2
const MAX_GAP_S = 5

/** Horizontal zones across the crown — consecutive leaves must alternate. */
const ZONES: [number, number][] = [
  [10, 35], // left
  [40, 60], // center
  [65, 85], // right
]

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min)
}

/** Picks a zone different from the previously used one, to keep leaves apart. */
function pickZoneIndex(excludeIndex: number | null) {
  const choices = ZONES.map((_, i) => i).filter((i) => i !== excludeIndex)
  return choices[Math.floor(Math.random() * choices.length)]
}

function createLeaf(id: number, zoneIndex: number): Leaf {
  const [zoneMin, zoneMax] = ZONES[zoneIndex]
  return {
    id,
    left: randomBetween(zoneMin, zoneMax),
    top: randomBetween(0, 35),
    size: randomBetween(10, 18),
    fallDuration: randomBetween(6, 10),
    swayDuration: randomBetween(3, 5),
    rotate: randomBetween(-30, 30),
    opacity: randomBetween(0.7, 1),
    variant: Math.random() > 0.5 ? 'green' : 'copper',
  }
}

interface FallingLeavesProps {
  /** Must include a position utility (e.g. `absolute inset-x-0 top-0`) —
   * the component itself is unpositioned so callers control placement. */
  className?: string
  /** Max leaves visible on screen at the same time. */
  maxConcurrent?: number
}

/**
 * Single gold leaves that appear one at a time (never more than
 * `maxConcurrent` at once, at least `MIN_GAP_S` apart) from the top of this
 * container, then drift down in a slow, gently swaying, half-transparent fall.
 * Purely decorative.
 */
export function FallingLeaves({ className = '', maxConcurrent = 3 }: FallingLeavesProps) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '')
  const [leaves, setLeaves] = useState<Leaf[]>([])
  const nextId = useRef(0)
  const leafCountRef = useRef(0)
  const lastZoneRef = useRef<number | null>(null)

  useEffect(() => {
    leafCountRef.current = leaves.length
  }, [leaves])

  useEffect(() => {
    let cancelled = false
    let timeoutId: ReturnType<typeof setTimeout>

    function scheduleNext() {
      const gap = randomBetween(MIN_GAP_S, MAX_GAP_S) * 1000
      timeoutId = setTimeout(() => {
        if (cancelled) return
        if (leafCountRef.current < maxConcurrent) {
          const zoneIndex = pickZoneIndex(lastZoneRef.current)
          lastZoneRef.current = zoneIndex
          setLeaves((prev) => [...prev, createLeaf(nextId.current++, zoneIndex)])
        }
        scheduleNext()
      }, gap)
    }

    scheduleNext()
    return () => {
      cancelled = true
      clearTimeout(timeoutId)
    }
  }, [maxConcurrent])

  function handleLeafDone(id: number) {
    setLeaves((prev) => prev.filter((leaf) => leaf.id !== id))
  }

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none overflow-hidden motion-reduce:hidden ${className}`}
    >
      <style>{`
        @keyframes ${uid}-fall {
          0% { opacity: 0; transform: translateY(0%); }
          12% { opacity: 1; }
          85% { opacity: 1; }
          100% { opacity: 0; transform: translateY(260%); }
        }
      `}</style>

      {/* Shared gradients, referenced by every leaf below */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id={`${uid}-green`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#2D5A4C" />
          </linearGradient>
          <linearGradient id={`${uid}-copper`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#B87333" />
          </linearGradient>
        </defs>
      </svg>

      {leaves.map((leaf) => (
        <span
          key={leaf.id}
          className="absolute"
          style={{
            left: `${leaf.left}%`,
            top: `${leaf.top}%`,
            animationName: `${uid}-fall`,
            animationDuration: `${leaf.fallDuration}s`,
            animationTimingFunction: 'ease-in',
            animationFillMode: 'forwards',
          }}
          onAnimationEnd={() => handleLeafDone(leaf.id)}
        >
          <span
            className="animate-leaf-sway block"
            style={{ animationDuration: `${leaf.swayDuration}s` }}
          >
            <svg
              viewBox="0 0 24 24"
              fill={`url(#${uid}-${leaf.variant})`}
              style={{
                width: leaf.size,
                height: leaf.size,
                opacity: leaf.opacity,
                transform: `rotate(${leaf.rotate}deg)`,
              }}
            >
              <path d="M12 2C7.5 5.5 3.5 9.8 3.5 15c0 3.6 2.9 6.5 6.5 6.5.7 0 1.4-.1 2-.3-1.9-1.5-3.2-3.7-3.6-6.2 1 2.1 2.6 3.9 4.7 4.9 2.9-1.9 4.9-5.3 4.9-9.1 0-3.9-2.4-7-6-8.8Z" />
            </svg>
          </span>
        </span>
      ))}
    </div>
  )
}

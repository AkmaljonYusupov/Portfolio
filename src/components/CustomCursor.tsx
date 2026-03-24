import { AnimatePresence, motion } from "framer-motion"
import type { CursorState } from "../types"

type CustomCursorProps = {
  isDesktopCursor: boolean
  cursor: CursorState
}

export default function CustomCursor({
  isDesktopCursor,
  cursor,
}: CustomCursorProps) {
  return (
    <AnimatePresence>
      {isDesktopCursor && cursor.visible && (
        <>
          <motion.div
            aria-hidden="true"
            style={{
              position: "fixed",
              left: 0,
              top: 0,
              zIndex: 120,
              pointerEvents: "none",
            }}
            animate={{
              x: cursor.x - 7,
              y: cursor.y - 7,
              scale: cursor.pressed ? 0.72 : cursor.hovering ? 1.2 : 1,
              opacity: 1,
            }}
            transition={{ type: "spring", stiffness: 480, damping: 30, mass: 0.45 }}
          >
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: "999px",
                background: "#0f172a",
                boxShadow: "0 0 26px rgba(56,189,248,0.35)",
              }}
            />
          </motion.div>

          <motion.div
            aria-hidden="true"
            style={{
              position: "fixed",
              left: 0,
              top: 0,
              zIndex: 119,
              pointerEvents: "none",
            }}
            animate={{
              x: cursor.trailX - (cursor.hovering ? 26 : 20),
              y: cursor.trailY - (cursor.hovering ? 26 : 20),
              width: cursor.hovering ? 52 : 40,
              height: cursor.hovering ? 52 : 40,
              rotate: cursor.pressed ? 135 : cursor.hovering ? 90 : 45,
              scale: cursor.pressed ? 0.9 : 1,
              opacity: cursor.hovering ? 0.95 : 0.78,
            }}
            transition={{ type: "spring", stiffness: 220, damping: 24, mass: 0.9 }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 18,
                border: "1px solid rgba(15,23,42,0.65)",
                background: "rgba(255,255,255,0.10)",
                backdropFilter: "blur(6px)",
              }}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
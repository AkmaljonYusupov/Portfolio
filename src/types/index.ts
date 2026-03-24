export type SectionKey = "home" | "about" | "portfolio" | "services" | "contact"

export type ServiceIconType = "code" | "palette" | "mobile" | "device"

export type CursorState = {
  x: number
  y: number
  visible: boolean
  pressed: boolean
  hovering: boolean
  trailX: number
  trailY: number
}
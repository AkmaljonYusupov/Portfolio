import { Code2, MonitorSmartphone, Palette, Smartphone } from "lucide-react"
import type { ServiceIconType } from "../types"

export default function ServiceIcon({ type }: { type: ServiceIconType }) {
  const className = "h-5 w-5"

  switch (type) {
    case "code":
      return <Code2 className={className} />
    case "palette":
      return <Palette className={className} />
    case "mobile":
      return <Smartphone className={className} />
    default:
      return <MonitorSmartphone className={className} />
  }
}
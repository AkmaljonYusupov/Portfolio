import { motion } from "framer-motion"
import {
  Briefcase,
  Download,
  Home,
  Layers3,
  Mail,
  User,
  X,
} from "lucide-react"
import type { SectionKey } from "../types"
import styles from "./Sidebar.module.scss"

const sectionIcons: Record<SectionKey, React.ElementType> = {
  home: Home,
  about: User,
  portfolio: Briefcase,
  services: Layers3,
  contact: Mail,
}

type SidebarProps = {
  isDesktop: boolean
  sidebarOpen: boolean
  setSidebarOpen: (value: boolean) => void
  activeSection: SectionKey
  setActiveSection: (value: SectionKey) => void
  t: any
}

export default function Sidebar({
  isDesktop,
  sidebarOpen,
  setSidebarOpen,
  activeSection,
  setActiveSection,
  t,
}: SidebarProps) {
  const menuItems: { key: SectionKey; label: string }[] = [
    { key: "home", label: t.nav.home },
    { key: "about", label: t.nav.about },
    { key: "portfolio", label: t.nav.portfolio },
    { key: "services", label: t.nav.services },
    { key: "contact", label: t.nav.contact },
  ]

  return (
    <motion.aside
      initial={false}
      animate={{
        x: isDesktop ? 0 : sidebarOpen ? 0 : -300,
      }}
      transition={{ duration: 0.25 }}
      className={styles.sidebar}
    >
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <div className={styles.avatar}>AY</div>

            <div className={styles.meta}>
              <h2 className={styles.owner}>{t.owner}</h2>
              <p className={styles.role}>{t.shortRole}</p>
            </div>
          </div>

          {!isDesktop && (
            <button
              onClick={() => setSidebarOpen(false)}
              className={styles.closeBtn}
            >
              <X size={20} />
            </button>
          )}
        </div>

        <nav className={styles.nav}>
          {menuItems.map(item => {
            const Icon = sectionIcons[item.key]
            const isActive = activeSection === item.key

            return (
              <button
                key={item.key}
                onClick={() => {
                  setActiveSection(item.key)
                  if (!isDesktop) setSidebarOpen(false)
                }}
                className={`${styles.navItem} ${
                  isActive ? styles.navActive : ""
                }`}
              >
                <span className={styles.iconBox}>
                  <Icon size={20} />
                </span>
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>

        <div className={styles.bottomCard}>
          <p className={styles.bottomLabel}>Frontend Stack</p>
          <h3 className={styles.bottomTitle}>React • TypeScript • SCSS</h3>

          <button className={styles.resumeBtn}>
            <Download size={16} />
            Resume
          </button>
        </div>
      </div>
    </motion.aside>
  )
}
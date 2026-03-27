import { motion } from "framer-motion"
import {
  ArrowUpRight,
  Briefcase,
  Github,
  Home,
  Instagram,
  Layers3,
  Mail,
  User,
  X
} from "lucide-react"
import { FaTelegramPlane } from "react-icons/fa"
import AkmaljonImage from "../assets/Akmaljon.jpg"
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

const socialLinks = [
  {
    name: "Instagram",
    href: "https://instagram.com/Coder.ac",
    icon: Instagram,
    className: "instagram",
  },
  {
    name: "Telegram",
    href: "https://t.me/AkmaljonYusupov",
    icon: FaTelegramPlane,
    className: "telegram",
  },
  {
    name: "GitHub",
    href: "https://github.com/AkmaljonYusupov",
    icon: Github,
    className: "github",
  },
]

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

  const handleItemClick = (key: SectionKey) => {
    setActiveSection(key)
    if (!isDesktop) setSidebarOpen(false)
  }

  return (
    <motion.aside
      initial={false}
      animate={{
        x: isDesktop ? 0 : sidebarOpen ? 0 : -360,
        opacity: 1,
      }}
      transition={{
        type: "spring",
        stiffness: 420,
        damping: 36,
        mass: 0.72,
      }}
      className={`${styles.sidebar} ${!isDesktop ? styles.mobileSidebar : ""}`}
      style={{
        transform: "translate3d(0,0,0)",
        backfaceVisibility: "hidden",
      }}
    >
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <div className={styles.avatarWrap}>
              <div className={styles.avatarRing} />
              <div className={styles.avatarShell}>
                <div className={styles.avatar}>
                  <img
                    src={AkmaljonImage}
                    alt={t.owner}
                    className={styles.avatarImage}
                  />
                </div>
              </div>
              <span className={styles.onlineDot} />
            </div>

            <div className={styles.meta}>
              <div className={styles.ownerRow}>
                <h2 className={styles.owner}>{t.owner}</h2>
              </div>
              <p className={styles.role}>{t.shortRole}</p>
            </div>
          </div>

          {!isDesktop && (
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className={styles.closeBtn}
              aria-label="Close sidebar"
            >
              <X size={20} />
            </button>
          )}
        </div>

        <div className={styles.divider} />

        <nav className={styles.nav}>
          <div className={styles.navHeader}>
            <span className={styles.navEyebrow}>
              {t?.nav?.menu ?? "Navigation"}
            </span>
          </div>

          <div className={styles.navList}>
            {menuItems.map((item, index) => {
              const Icon = sectionIcons[item.key]
              const isActive = activeSection === item.key

              return (
                <motion.button
                  key={item.key}
                  type="button"
                  onClick={() => handleItemClick(item.key)}
                  className={`${styles.navItem} ${
                    isActive ? styles.navActive : ""
                  }`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: index * 0.035,
                    duration: 0.18,
                    ease: "easeOut",
                  }}
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.985 }}
                >
                  <span className={styles.navItemLayer} />
                  <span className={styles.navIndicator} />

                  <span className={styles.iconBox}>
                    <Icon size={17} />
                  </span>

                  <span className={styles.navText}>{item.label}</span>

                  <span className={styles.navArrow}>
                    <ArrowUpRight size={14} />
                  </span>
                </motion.button>
              )
            })}
          </div>
        </nav>

        <div className={styles.socialCard}>
          <h3 className={styles.socialTitle}>Social Links</h3>

          <div className={styles.socialList}>
            {socialLinks.map((item) => {
              const Icon = item.icon

              return (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`${styles.socialIconBtn} ${
                    styles[item.className as keyof typeof styles]
                  }`}
                  aria-label={item.name}
                >
                  <span className={styles.socialGlow} />
                  <Icon size={18} />
                  <span className={styles.tooltip}>{item.name}</span>
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </motion.aside>
  )
}
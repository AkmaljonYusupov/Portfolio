import { motion } from "framer-motion"
import {
  ArrowUpRight,
  Briefcase,
  Github,
  Home,
  Instagram,
  Layers3,
  Mail,
  Send,
  User,
  X,
} from "lucide-react"
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
    href: "https://instagram.com/your_username",
    icon: Instagram,
    className: "instagram",
  },
  {
    name: "Telegram",
    href: "https://t.me/your_username",
    icon: Send,
    className: "telegram",
  },
  {
    name: "GitHub",
    href: "https://github.com/your_username",
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

  return (
    <motion.aside
      initial={false}
      animate={{
        x: isDesktop ? 0 : sidebarOpen ? 0 : -340,
        opacity: isDesktop ? 1 : sidebarOpen ? 1 : 0.98,
      }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className={styles.sidebar}
    >
      <div className={styles.bgGlowOne} />
      <div className={styles.bgGlowTwo} />
      <div className={styles.bgGrid} />
      <div className={styles.topLine} />

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

          {menuItems.map((item, index) => {
            const Icon = sectionIcons[item.key]
            const isActive = activeSection === item.key

            return (
              <motion.button
                key={item.key}
                type="button"
                onClick={() => {
                  setActiveSection(item.key)
                  if (!isDesktop) setSidebarOpen(false)
                }}
                className={`${styles.navItem} ${
                  isActive ? styles.navActive : ""
                }`}
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.985 }}
              >
                <span className={styles.navItemBg} />
                <span className={styles.iconBox}>
                  <Icon size={18} />
                </span>

                <span className={styles.navText}>{item.label}</span>

                <span className={styles.navArrow}>
                  <ArrowUpRight size={14} />
                </span>

                {isActive && <span className={styles.activeLine} />}
              </motion.button>
            )
          })}
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
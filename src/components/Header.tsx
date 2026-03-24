import { motion } from "framer-motion"
import { Menu } from "lucide-react"
import type { LanguageKey } from "../i18n"
import styles from "./Header.module.scss"

type HeaderProps = {
  isDesktop: boolean
  setSidebarOpen: (value: boolean) => void
  language: LanguageKey
  setLanguage: (value: LanguageKey) => void
  t: any
}

export default function Header({
  isDesktop,
  setSidebarOpen,
  language,
  setLanguage,
  t,
}: HeaderProps) {
  const languages: { key: LanguageKey; label: string }[] = [
    { key: "uz", label: "O‘zbek" },
    { key: "ru", label: "Русский" },
    { key: "en", label: "English" },
    { key: "tr", label: "Türkçe" },
  ]

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={styles.header}
    >
      <div className={styles.left}>
        {!isDesktop && (
          <button
            onClick={() => setSidebarOpen(true)}
            className={styles.menuBtn}
          >
            <Menu size={20} />
          </button>
        )}

        <div className={styles.profile}>
          <div className={styles.avatar}>AY</div>

          <div className={styles.meta}>
            <div className={styles.name}>{t.owner}</div>
            <div className={styles.role}>{t.role}</div>
          </div>
        </div>
      </div>

      <div className={styles.langs}>
        {languages.map(lang => {
          const isActive = language === lang.key

          return (
            <button
              key={lang.key}
              onClick={() => setLanguage(lang.key)}
              className={`${styles.langBtn} ${
                isActive ? styles.langActive : ""
              }`}
            >
              {lang.key === "tr" ? "TR" : lang.key.toUpperCase()}
            </button>
          )
        })}
      </div>
    </motion.header>
  )
}
import { motion } from "framer-motion"
import { Download, Menu } from "lucide-react"
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
    <div className={styles.headerWrap}>
      <motion.header
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={styles.header}
      >
        <div className={styles.headerGlow} />
        <div className={styles.headerLine} />

        <div className={styles.left}>
          {!isDesktop && (
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className={styles.menuBtn}
              aria-label="Open menu"
            >
              <Menu size={19} />
            </button>
          )}

          <a
            href="/cv.pdf"
            download
            className={styles.downloadBtn}
            aria-label="Download CV"
          >
            <span className={styles.downloadBtnBg} />
            <Download size={15} />
            <span className={styles.downloadText}>
              {t?.downloadCv ?? "Download CV"}
            </span>
          </a>
        </div>

        <div className={styles.right}>
          <div className={styles.langs}>
            {languages.map(lang => {
              const isActive = language === lang.key

              return (
                <button
                  key={lang.key}
                  type="button"
                  onClick={() => setLanguage(lang.key)}
                  className={`${styles.langBtn} ${
                    isActive ? styles.langActive : ""
                  }`}
                  aria-pressed={isActive}
                  title={lang.label}
                >
                  <span className={styles.langInner}>
                    {lang.key === "tr" ? "TR" : lang.key.toUpperCase()}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </motion.header>
    </div>
  )
}
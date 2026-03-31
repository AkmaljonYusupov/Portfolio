import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useMemo, useState } from "react"
import styles from "./App.module.scss"
import CustomCursor from "./components/CustomCursor"
import Header from "./components/Header"
import Sidebar from "./components/Sidebar"
import AboutSection from "./components/sections/AboutSection"
import ContactSection from "./components/sections/ContactSection"
import HomeSection from "./components/sections/HomeSection"
import PortfolioSection from "./components/sections/PortfolioSection"
import ServicesSection from "./components/sections/ServicesSection"
import type { LanguageKey, Translation } from "./i18n"
import { translations } from "./i18n"
import type { CursorState, SectionKey } from "./types"

const ACTIVE_SECTION_STORAGE_KEY = "portfolio_active_section"
const ACTIVE_LANGUAGE_STORAGE_KEY = "portfolio_active_language"

const VALID_SECTIONS: SectionKey[] = [
  "home",
  "about",
  "portfolio",
  "services",
  "contact",
]

const VALID_LANGUAGES: LanguageKey[] = ["uz", "ru", "en", "tr"]

function getInitialSection(): SectionKey {
  if (typeof window === "undefined") return "home"

  try {
    const savedSection = localStorage.getItem(ACTIVE_SECTION_STORAGE_KEY)

    if (savedSection && VALID_SECTIONS.includes(savedSection as SectionKey)) {
      return savedSection as SectionKey
    }
  } catch {
    // ignore
  }

  return "home"
}

function getInitialLanguage(): LanguageKey {
  if (typeof window === "undefined") return "uz"

  try {
    const savedLanguage = localStorage.getItem(ACTIVE_LANGUAGE_STORAGE_KEY)

    if (
      savedLanguage &&
      VALID_LANGUAGES.includes(savedLanguage as LanguageKey)
    ) {
      return savedLanguage as LanguageKey
    }
  } catch {
    // ignore
  }

  return "uz"
}

function App() {
  const [language, setLanguage] = useState<LanguageKey>(() => getInitialLanguage())
  const [activeSection, setActiveSection] = useState<SectionKey>(() =>
    getInitialSection()
  )
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const [isDesktopCursor, setIsDesktopCursor] = useState(false)
  const [cursor, setCursor] = useState<CursorState>({
    x: 0,
    y: 0,
    visible: false,
    pressed: false,
    hovering: false,
    trailX: 0,
    trailY: 0,
  })

  const t: Translation = useMemo(() => translations[language], [language])

  useEffect(() => {
    if (typeof window === "undefined") return

    try {
      localStorage.setItem(ACTIVE_LANGUAGE_STORAGE_KEY, language)
    } catch {
      // ignore
    }
  }, [language])

  useEffect(() => {
    if (typeof window === "undefined") return

    try {
      localStorage.setItem(ACTIVE_SECTION_STORAGE_KEY, activeSection)
    } catch {
      // ignore
    }
  }, [activeSection])

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = language
    }
  }, [language])

  useEffect(() => {
    if (typeof window === "undefined") return

    const desktopMedia = window.matchMedia("(min-width: 1024px)")
    const pointerMedia = window.matchMedia("(pointer: fine)")

    const updateDesktop = () => {
      const desktop = desktopMedia.matches
      setIsDesktop(desktop)
      setSidebarOpen(desktop)
    }

    const updatePointer = () => {
      setIsDesktopCursor(pointerMedia.matches)
    }

    updateDesktop()
    updatePointer()

    desktopMedia.addEventListener("change", updateDesktop)
    pointerMedia.addEventListener("change", updatePointer)

    return () => {
      desktopMedia.removeEventListener("change", updateDesktop)
      pointerMedia.removeEventListener("change", updatePointer)
    }
  }, [])

  useEffect(() => {
    if (typeof window === "undefined" || !isDesktopCursor) return

    let rafId = 0
    let mouseX = 0
    let mouseY = 0
    let trailX = 0
    let trailY = 0

    const animate = () => {
      trailX += (mouseX - trailX) * 0.16
      trailY += (mouseY - trailY) * 0.16

      setCursor((prev) => ({
        ...prev,
        x: mouseX,
        y: mouseY,
        trailX,
        trailY,
      }))

      rafId = window.requestAnimationFrame(animate)
    }

    const handleMove = (e: MouseEvent) => {
      const target = e.target
      const interactive =
        target instanceof HTMLElement &&
        !!target.closest("a, button, input, textarea, select, [role='button']")

      mouseX = e.clientX
      mouseY = e.clientY

      setCursor((prev) => ({
        ...prev,
        x: e.clientX,
        y: e.clientY,
        visible: true,
        hovering: interactive,
      }))
    }

    const handleDown = () => {
      setCursor((prev) => ({ ...prev, pressed: true }))
    }

    const handleUp = () => {
      setCursor((prev) => ({ ...prev, pressed: false }))
    }

    const handleLeave = () => {
      setCursor((prev) => ({
        ...prev,
        visible: false,
        pressed: false,
        hovering: false,
      }))
    }

    const handleEnter = () => {
      setCursor((prev) => ({ ...prev, visible: true }))
    }

    rafId = window.requestAnimationFrame(animate)

    window.addEventListener("mousemove", handleMove)
    window.addEventListener("mousedown", handleDown)
    window.addEventListener("mouseup", handleUp)
    document.addEventListener("mouseleave", handleLeave)
    document.addEventListener("mouseenter", handleEnter)

    return () => {
      window.cancelAnimationFrame(rafId)
      window.removeEventListener("mousemove", handleMove)
      window.removeEventListener("mousedown", handleDown)
      window.removeEventListener("mouseup", handleUp)
      document.removeEventListener("mouseleave", handleLeave)
      document.removeEventListener("mouseenter", handleEnter)
    }
  }, [isDesktopCursor])

  const renderSection = () => {
    switch (activeSection) {
      case "home":
        return <HomeSection t={t} setActiveSection={setActiveSection} />
      case "about":
        return <AboutSection t={t} />
      case "portfolio":
        return <PortfolioSection t={t} />
      case "services":
        return <ServicesSection t={t} />
      case "contact":
        return <ContactSection t={t} />
      default:
        return <HomeSection t={t} setActiveSection={setActiveSection} />
    }
  }

  return (
    <div
      className={`${styles.app} ${isDesktopCursor ? styles.cursorHidden : ""}`}
    >
      <CustomCursor isDesktopCursor={isDesktopCursor} cursor={cursor} />

      <div className={styles.layout}>
        <AnimatePresence>
          {!isDesktop && sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className={styles.overlay}
            />
          )}
        </AnimatePresence>

        <Sidebar
          isDesktop={isDesktop}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          t={t}
        />

        <main className={styles.main}>
          <Header
            isDesktop={isDesktop}
            setSidebarOpen={setSidebarOpen}
            language={language}
            setLanguage={setLanguage}
            t={t}
          />

          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className={styles.sectionWrap}
          >
            {renderSection()}
          </motion.div>
        </main>
      </div>
    </div>
  )
}

export default App
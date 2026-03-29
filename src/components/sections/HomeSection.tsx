import { motion } from "framer-motion"
import { ArrowUpRight, Code2, LayoutTemplate, Send } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { portfolioData } from "../../data/portfolio"
import styles from "./HomeSection.module.scss"

type HomeSectionProps = {
  t: any
  setActiveSection: (value: any) => void
}

/**
 * Statistikadagi sonlarni animatsion oshirib ko‘rsatadi.
 * Masalan: 0 -> 25+
 */
function CountUp({
  value,
  duration = 1400,
}: {
  value: string | number
  duration?: number
}) {
  const [display, setDisplay] = useState("0")

  useEffect(() => {
    const raw = String(value ?? "")
    const match = raw.match(/\d+/)
    const numberValue = match ? Number(match[0]) : 0
    const suffix = raw.replace(String(numberValue), "")

    if (!match) {
      setDisplay(raw)
      return
    }

    let start: number | null = null
    let frame = 0

    const step = (timestamp: number) => {
      if (!start) start = timestamp

      const progress = Math.min((timestamp - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.floor(numberValue * eased)

      setDisplay(`${current}${suffix}`)

      if (progress < 1) {
        frame = requestAnimationFrame(step)
      } else {
        setDisplay(raw)
      }
    }

    frame = requestAnimationFrame(step)

    return () => cancelAnimationFrame(frame)
  }, [value, duration])

  return <>{display}</>
}

/**
 * Faqat oxirgi probil yo‘qolib qolmasligi uchun uni NBSP ga aylantiradi.
 */
function preserveTrailingSpace(value: string) {
  if (!value) return value
  return value.endsWith(" ") ? `${value.slice(0, -1)}\u00A0` : value
}

/**
 * Universal typewriter effekti
 */
function TypewriterLoop({
  text,
  typingSpeed = 85,
  deletingSpeed = 42,
  pauseBeforeDelete = 1700,
  pauseBeforeRestart = 450,
}: {
  text: string
  typingSpeed?: number
  deletingSpeed?: number
  pauseBeforeDelete?: number
  pauseBeforeRestart?: number
}) {
  const finalText = String(text ?? "")
  const [displayedText, setDisplayedText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    setDisplayedText("")
    setIsDeleting(false)
  }, [finalText])

  useEffect(() => {
    if (!finalText) {
      setDisplayedText("")
      return
    }

    let timeoutId: ReturnType<typeof setTimeout>

    if (!isDeleting && displayedText.length < finalText.length) {
      timeoutId = setTimeout(() => {
        setDisplayedText(finalText.slice(0, displayedText.length + 1))
      }, typingSpeed)
    } else if (!isDeleting && displayedText.length === finalText.length) {
      timeoutId = setTimeout(() => {
        setIsDeleting(true)
      }, pauseBeforeDelete)
    } else if (isDeleting && displayedText.length > 0) {
      timeoutId = setTimeout(() => {
        setDisplayedText(finalText.slice(0, displayedText.length - 1))
      }, deletingSpeed)
    } else if (isDeleting && displayedText.length === 0) {
      timeoutId = setTimeout(() => {
        setIsDeleting(false)
      }, pauseBeforeRestart)
    }

    return () => clearTimeout(timeoutId)
  }, [
    displayedText,
    isDeleting,
    finalText,
    typingSpeed,
    deletingSpeed,
    pauseBeforeDelete,
    pauseBeforeRestart,
  ])

  return (
    <span className={styles.typewriterRoot} aria-label={finalText}>
      <span className={styles.typewriterSizer}>{finalText}</span>

      <span className={styles.typewriterText} aria-hidden="true">
        {preserveTrailingSpace(displayedText)}
      </span>
    </span>
  )
}

export default function HomeSection({
  t,
  setActiveSection,
}: HomeSectionProps) {
  const stats = [
    { value: portfolioData.stats.experience, label: t?.hero?.stats1 },
    { value: portfolioData.stats.projects, label: t?.hero?.stats2 },
    { value: portfolioData.stats.tech, label: t?.hero?.stats3 },
  ]

  const heroTitle = useMemo(
    () => String(t?.hero?.title ?? ""),
    [t?.hero?.title]
  )

  return (
    <section className={styles.heroSection}>
      <div className={styles.bgGlowOne} />
      <div className={styles.bgGlowTwo} />
      <div className={styles.topLine} />

      <div className={styles.sectionWatermark}>
        <span>{t?.nav?.home ?? "HOME"}</span>
      </div>

      <motion.div
        className={styles.heroMain}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.05 }}
      >
        <div className={styles.heroContent}>
          <p className={styles.overline}>{t?.owner ?? "Akmaljon Yusufov"}</p>

          <h1 className={styles.title}>
            <TypewriterLoop
              text={heroTitle}
              typingSpeed={85}
              deletingSpeed={42}
              pauseBeforeDelete={1700}
              pauseBeforeRestart={500}
            />
          </h1>

          <p className={styles.desc}>
            {t?.hero?.desc ??
              "Zamonaviy va premium ko‘rinishdagi web interfeyslar yarataman."}
          </p>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.primaryBtn}
              onClick={() => setActiveSection("portfolio")}
            >
              <span className={styles.btnGlow} />
              <span>{t?.hero?.primary ?? "Loyihalarni ko‘rish"}</span>
              <ArrowUpRight size={17} />
            </button>

            <button
              type="button"
              className={styles.secondaryBtn}
              onClick={() => setActiveSection("contact")}
            >
              <span className={styles.btnGlowSoft} />
              <span>{t?.hero?.secondary ?? "Bog‘lanish"}</span>
              <Send size={16} />
            </button>
          </div>
        </div>

        <motion.div
          className={styles.heroSide}
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: 0.12 }}
        >
          <div className={styles.previewCard}>
            <div className={styles.previewTop}>
              <div className={styles.previewPill}>
                <span className={styles.previewDot} />
                <span>{t?.hero?.sideBadge ?? "Frontend Developer"}</span>
              </div>
            </div>

            <div className={styles.previewGrid}>
              <div className={styles.previewBox}>
                <div className={styles.previewIcon}>
                  <LayoutTemplate size={18} />
                </div>
                <div>
                  <h4>{t?.hero?.sideTitle1 ?? "Modern UI / UX"}</h4>
                  <p>
                    {t?.hero?.sideDesc1 ??
                      "Zamonaviy, estetik va foydalanuvchi tajribasiga yo‘naltirilgan interfeyslar yarataman"}
                  </p>
                </div>
              </div>

              <div className={styles.previewBox}>
                <div className={styles.previewIcon}>
                  <Code2 size={18} />
                </div>
                <div>
                  <h4>{t?.hero?.sideTitle2 ?? "Scalable Frontend"}</h4>
                  <p>
                    {t?.hero?.sideDesc2 ??
                      "Toza, tushunarli va kengaytiriladigan frontend yechimlar yarataman"}
                  </p>
                </div>
              </div>

              <div className={styles.previewMiniStats}>
                {stats.map((item, index) => (
                  <div
                    key={`${item.label}-${index}`}
                    className={styles.previewStat}
                  >
                    <strong>
                      <CountUp value={item.value} duration={1400 + index * 150} />
                    </strong>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
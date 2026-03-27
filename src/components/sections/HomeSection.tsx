import { motion } from "framer-motion"
import {
  ArrowUpRight,
  Briefcase,
  Code2,
  LayoutTemplate,
  Send,
} from "lucide-react"
import { useEffect, useState } from "react"
import { portfolioData } from "../../data/portfolio"
import styles from "./HomeSection.module.scss"

type HomeSectionProps = {
  t: any
  setActiveSection: (value: any) => void
}

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

export default function HomeSection({
  t,
  setActiveSection,
}: HomeSectionProps) {
  const stats = [
    { value: portfolioData.stats.experience, label: t.hero.stats1 },
    { value: portfolioData.stats.projects, label: t.hero.stats2 },
    { value: portfolioData.stats.tech, label: t.hero.stats3 },
  ]

  const skills = portfolioData.skills

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
          <p className={styles.overline}>{t.owner ?? "Akmaljon Yusufov"}</p>
          <h1 className={styles.title}>{t.hero.title}</h1>
          <p className={styles.desc}>{t.hero.desc}</p>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.primaryBtn}
              onClick={() => setActiveSection("portfolio")}
            >
              <span className={styles.btnGlow} />
              <span>{t.hero.primary}</span>
              <ArrowUpRight size={17} />
            </button>

            <button
              type="button"
              className={styles.secondaryBtn}
              onClick={() => setActiveSection("contact")}
            >
              <span className={styles.btnGlowSoft} />
              <span>{t.hero.secondary}</span>
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
                  <h4>{t?.hero?.sideTitle1 ?? "Modern UI"}</h4>
                  <p>
                    {t?.hero?.sideDesc1 ??
                      "Clean and premium interfaces for modern web projects"}
                  </p>
                </div>
              </div>

              <div className={styles.previewBox}>
                <div className={styles.previewIcon}>
                  <Code2 size={18} />
                </div>
                <div>
                  <h4>{t?.hero?.sideTitle2 ?? "Scalable Code"}</h4>
                  <p>
                    {t?.hero?.sideDesc2 ??
                      "Readable structure and reusable frontend components"}
                  </p>
                </div>
              </div>

              <div className={styles.previewMiniStats}>
                {stats.map((item, index) => (
                  <div key={item.label} className={styles.previewStat}>
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

      <motion.div
        className={styles.infoGrid}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.16 }}
      >
        <div className={styles.infoCardLarge}>
          <div className={styles.cardIcon}>
            <LayoutTemplate size={20} />
          </div>

          <div className={styles.cardContent}>
            <h3 className={styles.cardTitle}>
              {t?.hero?.cardTitle ?? "Modern UI Focus"}
            </h3>
            <p className={styles.cardText}>
              {t?.hero?.cardText ??
                "Clean layouts, responsive sections, strong spacing and clear visual hierarchy for modern web interfaces."}
            </p>

            <div className={styles.cardTags}>
              <span>Responsive</span>
              <span>Interactive</span>
              <span>Clean Layout</span>
            </div>
          </div>
        </div>

        <div className={styles.infoCardStack}>
          <div className={styles.miniCard}>
            <div className={styles.miniIcon}>
              <Briefcase size={18} />
            </div>
            <div>
              <h4>{t?.hero?.miniTitle1 ?? "Project Ready"}</h4>
              <p>
                {t?.hero?.miniDesc1 ??
                  "Portfolio, dashboard and landing pages"}
              </p>
            </div>
          </div>

          <div className={styles.miniCard}>
            <div className={styles.miniIcon}>
              <Code2 size={18} />
            </div>
            <div>
              <h4>{t?.hero?.miniTitle2 ?? "Code Quality"}</h4>
              <p>
                {t?.hero?.miniDesc2 ??
                  "Readable, modular and scalable frontend structure"}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className={styles.skillsSection}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.24 }}
      >
        <div className={styles.skillsHeader}>
          <span className={styles.skillsEyebrow}>
            {t?.hero?.skillsEyebrow ?? "Core Technologies"}
          </span>
          <h3 className={styles.skillsTitle}>
            {t?.hero?.skillsTitle ?? "Tech Stack"}
          </h3>
          <p className={styles.skillsDesc}>
            {t?.hero?.skillsDesc ??
              "Zamonaviy va ishonchli frontend yechimlar uchun foydalanadigan texnologiyalarim."}
          </p>
        </div>

        <div className={styles.skillsMarqueeWrap}>
          <div className={styles.skillsFadeLeft} />
          <div className={styles.skillsFadeRight} />

          <div className={styles.skillsRow}>
            <div className={styles.scrollLeft}>
              {[...skills, ...skills, ...skills].map((skill: string, i) => (
                <span key={`left-${skill}-${i}`} className={styles.skillChip}>
                  <span className={styles.skillDot} />
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.skillsRow}>
            <div className={styles.scrollRight}>
              {[...skills, ...skills, ...skills].map((skill: string, i) => (
                <span key={`right-${skill}-${i}`} className={styles.skillChip}>
                  <span className={styles.skillDot} />
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
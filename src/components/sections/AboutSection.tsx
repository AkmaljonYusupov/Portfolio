import { motion } from "framer-motion"
import {
  Briefcase,
  CheckCircle2,
  Code2,
  Languages,
  LayoutTemplate,
  MapPin,
  MonitorSmartphone,
  User,
} from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { FaWordpress } from "react-icons/fa"
import AkmaljonImage from "../../assets/Akmaljon.jpg"
import { portfolioData } from "../../data/portfolio"
import styles from "./AboutSection.module.scss"

type ContentBlockItem = {
  key: string
  title: string
  text: string
  tags: string[]
}

function preserveTrailingSpace(value: string) {
  if (!value) return value
  return value.endsWith(" ") ? `${value.slice(0, -1)}\u00A0` : value
}

function TypewriterLoop({
  text,
  typingSpeed = 85,
  deletingSpeed = 42,
  pauseBeforeDelete = 1700,
  pauseBeforeRestart = 500,
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

export default function AboutSection({ t }: { t: any }) {
  const skills = portfolioData.skills

  const aboutTitle = useMemo(
    () => String(t?.about?.title ?? ""),
    [t?.about?.title]
  )

  const introTags: string[] = t?.about?.introTags ?? []
  const featureCards: string[] = t?.about?.cards ?? []
  const contentBlocks: ContentBlockItem[] = t?.about?.contentBlocks ?? []

  const iconMap: Record<string, React.ElementType> = {
    uiux: LayoutTemplate,
    responsive: MonitorSmartphone,
    multilang: Languages,
    wordpress: FaWordpress,
    project: Briefcase,
    code: Code2,
  }

  const profileMetaItems = [
    {
      label: t?.about?.profile?.directionLabel ?? "Direction",
      value: t?.about?.profile?.directionValue ?? "Frontend Development",
      icon: null,
    },
    {
      label: t?.about?.profile?.focusLabel ?? "Main Focus",
      value: t?.about?.profile?.focusValue ?? "UI / UX, Responsiveness, Interactivity",
      icon: null,
    },
    {
      label: t?.about?.profile?.locationLabel ?? "Location",
      value: t?.about?.profile?.locationValue ?? "Uzbekistan",
      icon: <MapPin size={15} />,
    },
  ]

  return (
    <section className={styles.aboutSection}>
      <div className={styles.bgCircleOne} />
      <div className={styles.bgCircleTwo} />

      <div className={styles.sectionWatermark}>
        {t?.nav?.about ?? "About"}
      </div>

      <motion.div
        className={styles.centerContent}
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.45 }}
      >
        <h2 className={styles.title}>
          <TypewriterLoop
            text={aboutTitle}
            typingSpeed={85}
            deletingSpeed={42}
            pauseBeforeDelete={1700}
            pauseBeforeRestart={500}
          />
        </h2>

        <p className={styles.desc}>{t?.about?.desc}</p>
      </motion.div>

      <div className={styles.infoGrid}>
        <motion.div
          className={styles.infoCardLarge}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45, delay: 0.08 }}
        >
          <div className={styles.cardHeader}>
            <div className={styles.iconBox}>
              <User size={18} />
            </div>
            <span className={styles.cardEyebrow}>
              {t?.about?.introEyebrow ?? "Personal Introduction"}
            </span>
          </div>

          <p className={styles.cardText}>
            {t?.about?.introText}
          </p>

          <div className={styles.cardTags}>
            {introTags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>

          <div className={styles.featureList}>
            {featureCards.map((item, index) => (
              <motion.div
                key={`${item}-${index}`}
                className={styles.featureItem}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: index * 0.06 }}
              >
                <div className={styles.iconBox}>
                  <CheckCircle2 size={16} />
                </div>

                <div className={styles.featureContent}>
                  <span className={styles.featureIndex}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p>{item}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className={styles.profileCard}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45, delay: 0.12 }}
        >
          <div className={styles.profileImageWrap}>
            <div className={styles.profileRingOuter} />
            <div className={styles.profileRingInner} />
            <div className={styles.profileRingBlur} />
            <div className={styles.profileShine} />

            <div className={styles.profileImageInner}>
              <img
                src={AkmaljonImage}
                alt={t?.about?.profileName ?? "Profile"}
              />
            </div>

            <span className={styles.profileOnlineDot} />
          </div>

          <div className={styles.profileContent}>
            <h3 className={styles.profileName}>
              {t?.about?.profileName ?? "Akmaljon Yusufov"}
            </h3>

            <p className={styles.profileRole}>
              {t?.about?.profileRole ?? "Frontend Developer"}
            </p>

            <div className={styles.profileMeta}>
              {profileMetaItems.map((item) => (
                <div key={item.label} className={styles.metaItem}>
                  <span className={styles.metaLabel}>{item.label}</span>

                  <span className={styles.metaValue}>
                    {item.icon}
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className={styles.detailGrid}
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.45, delay: 0.05 }}
      >
        <div className={styles.detailMainCard}>
          <div className={styles.detailContentGrid}>
            {contentBlocks.map((item, index) => {
              const Icon = iconMap[item.key] ?? LayoutTemplate
              const isWordpress = item.key === "wordpress"

              return (
                <div key={`${item.key}-${index}`} className={styles.contentBlock}>
                  <div className={styles.iconBox}>
                    <Icon
                      size={18}
                      className={isWordpress ? styles.wordpressIcon : undefined}
                    />
                  </div>

                  <div className={styles.contentBlockBody}>
                    <h4>{item.title}</h4>
                    <p>{item.text}</p>

                    <div className={styles.contentBlockTags}>
                      {item.tags?.map((tag, tagIndex) => (
                        <span key={`${tag}-${tagIndex}`}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </motion.div>

      <motion.div
        className={styles.skillsSection}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.18 }}
        transition={{ duration: 0.4 }}
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
              "Technologies I use to build modern and reliable frontend solutions."}
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
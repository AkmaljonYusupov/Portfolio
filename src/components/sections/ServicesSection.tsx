import { AnimatePresence, motion, type Variants } from "framer-motion"
import {
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Shield,
  Star,
  TrendingUp,
  Zap,
} from "lucide-react"
import { useMemo, useState } from "react"
import ServiceIcon from "../ServiceIcon"
import styles from "./ServicesSection.module.scss"

type ServiceItem = {
  title: string
  text: string
  icon: string
  features?: string[]
  duration?: string
  level?: string
  tags?: string[]
}

type ServicesSectionProps = {
  t: {
    nav?: {
      services?: string
    }
    services: {
      title: string
      desc: string
      tags?: string[]
      items: ServiceItem[]
      stats?: {
        experience?: string
        projects?: string
        clients?: string
        satisfaction?: string
      }
    }
  }
}

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1]

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: smoothEase,
      when: "beforeChildren",
      staggerChildren: 0.08,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: smoothEase },
  },
}

function getLevelColor(level?: string) {
  if (!level) return {}

  const l = level.toLowerCase()

  if (l.includes("pro") || l.includes("advanced") || l.includes("yuqori")) {
    return {
      bg: "rgba(168, 85, 247, 0.10)",
      border: "rgba(168, 85, 247, 0.18)",
      color: "#7c3aed",
    }
  }

  if (l.includes("mid") || l.includes("o'rta") || l.includes("intermediate")) {
    return {
      bg: "rgba(59, 130, 246, 0.10)",
      border: "rgba(59, 130, 246, 0.18)",
      color: "#2563eb",
    }
  }

  return {
    bg: "rgba(34, 197, 94, 0.08)",
    border: "rgba(34, 197, 94, 0.18)",
    color: "#166534",
  }
}

function normalize(value: string) {
  return String(value ?? "").toLowerCase().trim()
}

export default function ServicesSection({ t }: ServicesSectionProps) {
  const sectionLabel = t?.nav?.services ?? "Services"
  const rawItems = t?.services?.items ?? []
  const stats = t?.services?.stats
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const items = useMemo<ServiceItem[]>(() => {
    const hasWordPress = rawItems.some((item) => {
      const title = normalize(item.title)
      const text = normalize(item.text)
      const icon = normalize(item.icon)
      const tags = (item.tags ?? []).map(normalize).join(" ")
      const features = (item.features ?? []).map(normalize).join(" ")

      return (
        title.includes("wordpress") ||
        text.includes("wordpress") ||
        icon.includes("wordpress") ||
        tags.includes("wordpress") ||
        features.includes("wordpress")
      )
    })

    if (hasWordPress) return rawItems

    return [
      ...rawItems,
      {
        title: "WordPress Xizmatlari",
        text: "WordPress asosida zamonaviy, tezkor, responsive va boshqaruvi qulay web saytlar yarataman. Blog, landing page, korporativ sayt va custom sahifalarni professional darajada ishlab chiqaman.",
        icon: "wordpress",
        level: "Professional",
        duration: "Moslashuvchan",
        tags: ["WordPress", "CMS", "Responsive"],
        features: [
          "WordPress sayt yaratish",
          "Custom template moslash",
          "Landing page va blog sahifalar",
          "Admin panel orqali boshqaruv",
          "SEO va tezlikka mos struktura",
        ],
      },
    ]
  }, [rawItems])

  const goToContact = () => {
    const selectors = [
      "#contact",
      '[data-section="contact"]',
      '[id="contact-section"]',
      "section#contact",
    ]

    let target: HTMLElement | null = null

    for (const selector of selectors) {
      const el = document.querySelector(selector)
      if (el instanceof HTMLElement) {
        target = el
        break
      }
    }

    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" })
      if (window.location.hash !== "#contact") {
        window.history.replaceState(null, "", "#contact")
      }
      return
    }

    window.location.hash = "#contact"
  }

  const defaultStats = [
    {
      value: stats?.experience ?? "3+",
      label: "Yil tajriba",
      icon: <TrendingUp size={14} />,
    },
    {
      value: stats?.projects ?? "20+",
      label: "Loyihalar",
      icon: <Zap size={14} />,
    },
    {
      value: stats?.clients ?? "15+",
      label: "Mijozlar",
      icon: <Shield size={14} />,
    },
    {
      value: stats?.satisfaction ?? "100%",
      label: "Mamnunlik",
      icon: <Star size={14} />,
    },
  ]

  return (
    <motion.section
      className={styles.servicesSection}
      variants={sectionVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className={styles.bgGlowOne} />
      <div className={styles.bgGlowTwo} />
      <div className={styles.topLine} />

      <div className={styles.sectionWatermark} aria-hidden="true">
        <span>{sectionLabel}</span>
      </div>

      <div className={styles.inner}>
        <motion.div className={styles.heroCard} variants={itemVariants}>
          <div className={styles.heroContent}>
            <div className={styles.heroLeft}>
              <h2 className={styles.title}>{t.services.title}</h2>
              <p className={styles.desc}>{t.services.desc}</p>

              {t?.services?.tags?.length ? (
                <div className={styles.heroTags}>
                  {t.services.tags.map((tag, i) => (
                    <span key={`${tag}-${i}`}>{tag}</span>
                  ))}
                </div>
              ) : null}
            </div>

            <div className={styles.heroStats}>
              {defaultStats.map((stat, index) => (
                <div className={styles.statItem} key={index}>
                  <div className={styles.statIcon}>{stat.icon}</div>
                  <span className={styles.statValue}>{stat.value}</span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div className={styles.cardsGrid}>
          <AnimatePresence mode="popLayout">
            {items.map((service, index) => {
              const id = `${service.title}-${index}`
              const isExpanded = expandedId === id
              const levelColors = getLevelColor(service.level)

              return (
                <motion.article
                  key={id}
                  className={`${styles.card} ${isExpanded ? styles.cardExpanded : ""}`}
                  variants={itemVariants}
                  layout
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12, scale: 0.97 }}
                  transition={{
                    duration: 0.38,
                    ease: smoothEase,
                    delay: index * 0.05,
                  }}
                >
                  <div className={styles.cardTop}>
                    <div className={styles.iconWrap}>
                      <ServiceIcon type={service.icon} />
                    </div>

                    <div className={styles.cardTopRight}>
                      {service.level && (
                        <span
                          className={styles.levelBadge}
                          style={{
                            background: levelColors.bg,
                            borderColor: levelColors.border,
                            color: levelColors.color,
                          }}
                        >
                          <Star size={11} />
                          {service.level}
                        </span>
                      )}

                      {service.duration && (
                        <span className={styles.durationBadge}>
                          <Clock size={11} />
                          {service.duration}
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className={styles.cardTitle}>{service.title}</h3>
                  <p className={styles.text}>{service.text}</p>

                  {service.tags?.length ? (
                    <div className={styles.featureChips}>
                      {service.tags.slice(0, 3).map((tag, ti) => (
                        <span key={`${id}-tag-${ti}`}>{tag}</span>
                      ))}
                    </div>
                  ) : null}

                  <AnimatePresence initial={false}>
                    {isExpanded && service.features?.length ? (
                      <motion.div
                        className={styles.featuresExpanded}
                        key="features"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.32, ease: smoothEase }}
                      >
                        {service.features.map((feature, fi) => (
                          <div className={styles.featureRow} key={fi}>
                            <CheckCircle2
                              size={13}
                              className={styles.featureCheck}
                            />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </motion.div>
                    ) : null}
                  </AnimatePresence>

                  <div className={styles.cardFooter}>
                    <button
                      type="button"
                      className={styles.expandBtn}
                      onClick={() => setExpandedId(isExpanded ? null : id)}
                      aria-expanded={isExpanded}
                    >
                      {isExpanded ? (
                        <>
                          <ChevronUp size={14} />
                          <span>Yopish</span>
                        </>
                      ) : (
                        <>
                          <ChevronDown size={14} />
                          <span>Batafsil</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      className={styles.moreBtn}
                      onClick={goToContact}
                    >
                      <span>Boshlash</span>
                      <ArrowUpRight size={15} />
                    </button>
                  </div>
                </motion.article>
              )
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.section>
  )
}
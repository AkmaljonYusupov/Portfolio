import { AnimatePresence, motion, type Variants } from "framer-motion"
import {
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  Clock,
  Code2,
  Layers3,
  MonitorSmartphone,
  Palette,
} from "lucide-react"
import { useMemo, useState } from "react"
import { FaWordpress } from "react-icons/fa"
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
      items: ServiceItem[]
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

function normalize(value: string) {
  return String(value ?? "").toLowerCase().trim()
}

function getServiceTheme(icon?: string) {
  const key = normalize(icon)

  if (key.includes("react") || key.includes("code") || key.includes("dev")) {
    return "development"
  }

  if (
    key.includes("ui") ||
    key.includes("ux") ||
    key.includes("design") ||
    key.includes("palette")
  ) {
    return "uiux"
  }

  if (
    key.includes("responsive") ||
    key.includes("mobile") ||
    key.includes("device")
  ) {
    return "responsive"
  }

  if (key.includes("wordpress") || key.includes("wp")) {
    return "wordpress"
  }

  return "default"
}

function getServiceAccentIcon(icon?: string) {
  const key = normalize(icon)

  if (key.includes("react") || key.includes("code") || key.includes("dev")) {
    return Code2
  }

  if (
    key.includes("ui") ||
    key.includes("ux") ||
    key.includes("design") ||
    key.includes("palette")
  ) {
    return Palette
  }

  if (
    key.includes("responsive") ||
    key.includes("mobile") ||
    key.includes("device")
  ) {
    return MonitorSmartphone
  }

  if (key.includes("wordpress") || key.includes("wp")) {
    return FaWordpress
  }

  return Layers3
}

export default function ServicesSection({ t }: ServicesSectionProps) {
  const sectionLabel = t?.nav?.services ?? "Services"
  const rawItems = t?.services?.items ?? []
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const items = useMemo<ServiceItem[]>(() => {
    const mapped = rawItems.map((item) => {
      const title = normalize(item.title)
      const icon = normalize(item.icon)

      if (
        title.includes("react") ||
        icon.includes("react") ||
        icon.includes("code")
      ) {
        return {
          ...item,
          title: item.title || "ReactJS Development",
          text:
            "ReactJS asosida tezkor, toza va kengaytiriladigan web interfeyslar yarataman. Komponentli arxitektura, qayta ishlatiladigan kod va zamonaviy frontend yechimlarga e'tibor beraman.",
          features: item.features?.length
            ? item.features
            : [
                "Component-based arxitektura",
                "Toza va scalable kod yozilishi",
                "API bilan integratsiya",
                "Interaktiv va tezkor UI",
              ],
          tags: item.tags?.length
            ? item.tags
            : ["ReactJS", "Frontend", "Clean Code"],
        }
      }

      if (
        title.includes("ui") ||
        title.includes("ux") ||
        icon.includes("design") ||
        icon.includes("ui")
      ) {
        return {
          ...item,
          title: item.title || "UI/UX Implementation",
          text:
            "Tayyor dizaynlarni premium ko‘rinishda to‘liq frontendga aylantiraman. Foydalanuvchi uchun qulay, estetik va vizual jihatdan tartibli interfeyslar yarataman.",
          features: item.features?.length
            ? item.features
            : [
                "Pixel-perfect layout",
                "Premium UI elementlar",
                "Figma dizaynni kodga aylantirish",
                "Silliq hover va transitionlar",
              ],
          tags: item.tags?.length
            ? item.tags
            : ["UI Design", "UX", "Premium Look"],
        }
      }

      if (
        title.includes("responsive") ||
        title.includes("mobile") ||
        icon.includes("responsive") ||
        icon.includes("mobile")
      ) {
        return {
          ...item,
          title: item.title || "Responsive Web Design",
          text:
            "Saytlarni desktop, planshet va mobil qurilmalarga mukammal moslab ishlab chiqaman. Har bir ekran o‘lchamida toza va qulay ko‘rinish saqlanadi.",
          features: item.features?.length
            ? item.features
            : [
                "Mobile-first yondashuv",
                "Tablet va desktop optimizatsiya",
                "Moslashuvchan grid tizimi",
                "Barcha ekranlarda qulay ko‘rinish",
              ],
          tags: item.tags?.length
            ? item.tags
            : ["Responsive", "Mobile", "Adaptive UI"],
        }
      }

      if (
        title.includes("wordpress") ||
        icon.includes("wordpress") ||
        icon.includes("wp")
      ) {
        return {
          ...item,
          title: item.title || "WordPress Services",
          text:
            "WordPress asosida boshqaruvi qulay, zamonaviy va tezkor saytlar yarataman. Blog, korporativ sayt, landing page va custom sahifalarni ehtiyojga moslab ishlab chiqaman.",
          features: item.features?.length
            ? item.features
            : [
                "WordPress sayt yaratish",
                "Custom template moslash",
                "Admin panel orqali boshqaruv",
                "SEO va tezlikka mos struktura",
              ],
          tags: item.tags?.length
            ? item.tags
            : ["WordPress", "CMS", "Custom Setup"],
        }
      }

      return {
        ...item,
        text:
          item.text ||
          "Zamonaviy frontend ehtiyojlari uchun ishonchli va qulay web yechimlar ishlab chiqaman.",
        features: item.features?.length
          ? item.features
          : [
              "Toza frontend yechim",
              "Moslashuvchan tuzilma",
              "Yuqori sifatli interfeys",
              "Loyiha ehtiyojiga moslashuv",
            ],
        tags: item.tags?.length
          ? item.tags
          : ["Frontend", "Modern", "Reliable"],
      }
    })

    const hasWordPress = mapped.some((item) => {
      const title = normalize(item.title)
      const text = normalize(item.text)
      const icon = normalize(item.icon)
      const tags = (item.tags ?? []).map(normalize).join(" ")

      return (
        title.includes("wordpress") ||
        text.includes("wordpress") ||
        icon.includes("wordpress") ||
        tags.includes("wordpress")
      )
    })

    if (hasWordPress) return mapped

    return [
      ...mapped,
      {
        title: "WordPress Services",
        text:
          "WordPress asosida boshqaruvi qulay, zamonaviy va tezkor saytlar yarataman. Blog, korporativ sayt, landing page va custom sahifalarni ehtiyojga moslab ishlab chiqaman.",
        icon: "wordpress",
        duration: "Moslashuvchan",
        tags: ["WordPress", "CMS", "Custom Setup"],
        features: [
          "WordPress sayt yaratish",
          "Custom template moslash",
          "Admin panel orqali boshqaruv",
          "SEO va tezlikka mos struktura",
        ],
      },
    ]
  }, [rawItems])

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

      <motion.div
        className={styles.centerContent}
        variants={itemVariants}
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.45 }}
      >
        <h2 className={styles.title}>{t?.services?.title ?? "Xizmatlar"}</h2>
        <p className={styles.desc}>
          {t?.services?.desc ??
            "Frontend yo‘nalishida kerakli asosiy xizmatlar to‘plami."}
        </p>
      </motion.div>

      <motion.div className={styles.cardsGrid}>
        <AnimatePresence mode="popLayout">
          {items.map((service, index) => {
            const id = `${service.title}-${index}`
            const isExpanded = expandedId === id
            const theme = getServiceTheme(service.icon)
            const AccentIcon = getServiceAccentIcon(service.icon)

            return (
              <motion.article
                key={id}
                className={`${styles.card} ${styles[theme]} ${
                  isExpanded ? styles.cardExpanded : ""
                }`}
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
                <div className={styles.cardAccent} />

                <div className={styles.cardTop}>
                  <div className={styles.iconWrap}>
                    <ServiceIcon type={service.icon} />
                  </div>

                  <div className={styles.cardTopRight}>
                    <span className={styles.miniType}>
                      <AccentIcon size={14} />
                      <span>{service.tags?.[0] ?? "Service"}</span>
                    </span>

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
                    <ChevronDown
                      size={14}
                      className={isExpanded ? styles.chevronOpen : ""}
                    />
                    <span>Batafsil</span>
                  </button>

                  <button type="button" className={styles.moreBtn}>
                    <span>Boshlash</span>
                    <ArrowUpRight size={15} />
                  </button>
                </div>
              </motion.article>
            )
          })}
        </AnimatePresence>
      </motion.div>
    </motion.section>
  )
}
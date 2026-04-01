import { motion, type Variants } from "framer-motion"
import {
  ArrowUpRight,
  CheckCircle2,
  ExternalLink,
  Globe,
  Layers3,
  MonitorSmartphone,
} from "lucide-react"
import styles from "./PortfolioSection.module.scss"

type PortfolioProject = {
  id: string
  title: string
  category: string
  text: string
  link: string
  status: string
  year?: string
  technologies: string[]
  features?: string[]
}

type PortfolioSectionProps = {
  t: {
    nav?: {
      portfolio?: string
    }
    portfolio: {
      title: string
      desc: string
      stats: {
        totalProjects: string
        uiLevel: string
        responsive: string
      }
      tags: string[]
      card: {
        liveDemo: string
        premiumProject: string
        productionUI: string
        responsive: string
        modernUX: string
        technologies: string
        features: string
        year: string
        status: string
      }
      items: PortfolioProject[]
    }
  }
}

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1]

const sectionVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
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
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: smoothEase,
    },
  },
}

function getPreviewClass(index: number) {
  const variants = [
    styles.previewLayoutOne,
    styles.previewLayoutTwo,
    styles.previewLayoutThree,
    styles.previewLayoutFour,
  ]

  return variants[index % variants.length]
}

export default function PortfolioSection({ t }: PortfolioSectionProps) {
  const portfolioLabel = t?.nav?.portfolio ?? "Portfolio"
  const items = t?.portfolio?.items ?? []
  const totalProjects = items.length

  return (
    <motion.section
      className={styles.portfolioSection}
      variants={sectionVariants}
      initial="hidden"
      animate="show"
    >
      <div className={styles.bgGlowOne} />
      <div className={styles.bgGlowTwo} />
      <div className={styles.topLine} />

      <div className={styles.sectionWatermark}>
        <span>{portfolioLabel}</span>
      </div>

      <div className={styles.inner}>
        <motion.div className={styles.heroCard} variants={itemVariants}>
          <div className={styles.heroContent}>
            <div className={styles.heroLeft}>
              <h2 className={styles.title}>{t.portfolio.title}</h2>
              <p className={styles.desc}>{t.portfolio.desc}</p>

              <div className={styles.heroTags}>
                {t.portfolio.tags.map((tag, index) => (
                  <span key={`${tag}-${index}`}>{tag}</span>
                ))}
              </div>
            </div>

            <div className={styles.heroRight}>
              <div className={styles.statCard}>
                <span className={styles.statValue}>{totalProjects}+</span>
                <span className={styles.statLabel}>
                  {t.portfolio.stats.totalProjects}
                </span>
              </div>

              <div className={styles.statCard}>
                <span className={styles.statValue}>Pro</span>
                <span className={styles.statLabel}>
                  {t.portfolio.stats.uiLevel}
                </span>
              </div>

              <div className={styles.statCard}>
                <span className={styles.statValue}>100%</span>
                <span className={styles.statLabel}>
                  {t.portfolio.stats.responsive}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div className={styles.cardsGrid}>
          {items.map((item, index) => (
            <motion.article
              key={`${item.id}-${index}`}
              className={styles.projectCard}
              variants={itemVariants}
            >
              <div className={styles.cardTop}>
                <div className={styles.cardMeta}>
                  <span className={styles.categoryChip}>{item.category}</span>

                  {item.year ? (
                    <span className={styles.yearChip}>
                      {t.portfolio.card.year}: {item.year}
                    </span>
                  ) : null}
                </div>

                <a
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.iconButton}
                  aria-label={`${item.title} live demo`}
                >
                  <ExternalLink size={16} />
                </a>
              </div>

              <div className={styles.cardBody}>
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.projectText}>{item.text}</p>

                  <div className={styles.metaRow}>
                    <div className={styles.metaItem}>
                      <MonitorSmartphone size={15} />
                      <span>{t.portfolio.card.responsive}</span>
                    </div>

                    <div className={styles.metaItem}>
                      <CheckCircle2 size={15} />
                      <span>{t.portfolio.card.modernUX}</span>
                    </div>
                  </div>
                </div>

                <div
                  className={`${styles.previewCard} ${getPreviewClass(index)}`}
                >
                  <div className={styles.previewHeader}>
                    <span className={styles.previewDot} />
                    <span className={styles.previewDot} />
                    <span className={styles.previewDot} />
                  </div>

                  <div className={styles.previewInner}>
                    <div className={styles.previewBarLg} />
                    <div className={styles.previewBarMd} />
                    <div className={styles.previewGrid}>
                      <div className={styles.previewBlock} />
                      <div className={styles.previewBlockAccent} />
                      <div className={styles.previewBlock} />
                      <div className={styles.previewBlockWide} />
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.infoGrid}>
                <div className={styles.infoCard}>
                  <div className={styles.infoLabel}>
                    <Layers3 size={15} />
                    <span>{t.portfolio.card.technologies}</span>
                  </div>

                  <div className={styles.techStack}>
                    {item.technologies.map((tech, techIndex) => (
                      <span key={`${item.id}-tech-${techIndex}`}>{tech}</span>
                    ))}
                  </div>
                </div>

                {item.features?.length ? (
                  <div className={styles.infoCard}>
                    <div className={styles.infoLabel}>
                      <Globe size={15} />
                      <span>{t.portfolio.card.features}</span>
                    </div>

                    <div className={styles.featureList}>
                      {item.features.map((feature, featureIndex) => (
                        <span key={`${item.id}-feature-${featureIndex}`}>
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>

              <div className={styles.cardBottom}>
                <div className={styles.projectStatus}>
                  <span className={styles.statusDot} />
                  <span>
                    {t.portfolio.card.status}: {item.status}
                  </span>
                </div>

                <a
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.viewButton}
                >
                  <span>{t.portfolio.card.liveDemo}</span>
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}
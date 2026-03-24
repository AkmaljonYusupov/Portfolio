import { motion } from "framer-motion"
import {
  ArrowUpRight,
  Briefcase,
  CheckCircle2,
  ExternalLink,
  Layers3,
} from "lucide-react"
import styles from "./PortfolioSection.module.scss"

type PortfolioItem = {
  category: string
  title: string
  text: string
}

type PortfolioSectionProps = {
  t: {
    nav?: {
      portfolio?: string
    }
    portfolio: {
      title: string
      desc: string
      items: PortfolioItem[]
    }
  }
}

export default function PortfolioSection({ t }: PortfolioSectionProps) {
  const portfolioLabel = t?.nav?.portfolio ?? "Portfolio"

  return (
    <motion.section
      className={styles.section}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.bgCircleOne} />
      <div className={styles.bgCircleTwo} />
      <div className={styles.bgLine} />

      <div className={styles.sectionWatermark}>{portfolioLabel}</div>

      <div className={styles.contentLayer}>
        <div className={styles.topCard}>
          <div className={styles.topContent}>
            <div className={styles.topLeft}>
              <h2 className={styles.title}>{t.portfolio.title}</h2>
              <p className={styles.desc}>{t.portfolio.desc}</p>
            </div>

            <div className={styles.topStats}>
              <div className={styles.statItem}>
                <span className={styles.statValue}>
                  {t?.portfolio?.items?.length || 0}+
                </span>
                <span className={styles.statLabel}>Projects</span>
              </div>

              <div className={styles.statItem}>
                <span className={styles.statValue}>Pro</span>
                <span className={styles.statLabel}>UI Level</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.grid}>
          {t.portfolio.items.map((item, index) => (
            <motion.article
              key={`${item.title}-${index}`}
              className={styles.card}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
            >
              <div className={styles.cardGlow} />

              <div className={styles.cardTop}>
                <div className={styles.cardTopLeft}>
                  <span className={styles.category}>{item.category}</span>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                </div>

                <button
                  type="button"
                  className={styles.linkBtn}
                  aria-label={`${item.title} project link`}
                >
                  <ExternalLink size={16} />
                </button>
              </div>

              <div className={styles.preview}>
                <div className={styles.previewHeader}>
                  <span className={styles.previewDot} />
                  <span className={styles.previewDot} />
                  <span className={styles.previewDot} />
                </div>

                <div className={styles.previewBody}>
                  <div className={styles.previewSidebar}>
                    <div className={styles.sidebarLine} />
                    <div className={styles.sidebarLineShort} />
                    <div className={styles.sidebarLine} />
                    <div className={styles.sidebarLineShort} />
                    <div className={styles.sidebarLine} />
                  </div>

                  <div className={styles.previewContent}>
                    <div className={styles.previewHero}>
                      <div className={styles.previewHeroBadge} />
                      <div className={styles.previewHeroLine} />
                    </div>

                    <div className={styles.previewGrid}>
                      <div className={styles.blockWide} />
                      <div className={styles.blockAccent} />
                      <div className={styles.block} />
                      <div className={styles.block} />
                      <div className={styles.blockWide} />
                    </div>
                  </div>
                </div>
              </div>

              <p className={styles.text}>{item.text}</p>

              <div className={styles.metaRow}>
                <div className={styles.metaItem}>
                  <Briefcase size={15} />
                  <span>Production UI</span>
                </div>

                <div className={styles.metaItem}>
                  <Layers3 size={15} />
                  <span>Responsive</span>
                </div>

                <div className={styles.metaItem}>
                  <CheckCircle2 size={15} />
                  <span>Modern UX</span>
                </div>
              </div>

              <div className={styles.techStack}>
                <span>React</span>
                <span>TypeScript</span>
                <span>SCSS</span>
                <span>Framer Motion</span>
              </div>

              <div className={styles.bottomRow}>
                <div className={styles.projectStatus}>
                  <span className={styles.statusDot} />
                  <span>Premium Project</span>
                </div>

                <button type="button" className={styles.viewMoreBtn}>
                  <span>View Project</span>
                  <ArrowUpRight size={16} />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
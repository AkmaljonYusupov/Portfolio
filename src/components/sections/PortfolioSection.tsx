import { AnimatePresence, motion, type Variants } from "framer-motion"
import { ArrowUpRight, ExternalLink, X } from "lucide-react"
import { useEffect, useMemo, useRef, useState } from "react"
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
      tags?: string[]
      items: PortfolioProject[]
      allLabel?: string
      detailsButton?: string
      viewProjectButton?: string
      techLabel?: string
      statusLabel?: string
      modal?: {
        close?: string
        about?: string
        technologies?: string
        features?: string
        year?: string
        status?: string
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
    transition: {
      duration: 0.45,
      ease: smoothEase,
    },
  },
}

const modalVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 22,
    scale: 0.97,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.25,
      ease: smoothEase,
    },
  },
  exit: {
    opacity: 0,
    y: 18,
    scale: 0.98,
    transition: {
      duration: 0.18,
      ease: "easeOut",
    },
  },
}

export default function PortfolioSection({ t }: PortfolioSectionProps) {
  const portfolioLabel = t?.nav?.portfolio ?? "Portfolio"
  const items = t?.portfolio?.items ?? []

  const [activeCategory, setActiveCategory] = useState("all")
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(
    null
  )
  const [filterOpen, setFilterOpen] = useState(false)

  const filterRef = useRef<HTMLDivElement | null>(null)

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(items.map((item) => item.category).filter(Boolean))
    )

    return ["all", ...uniqueCategories]
  }, [items])

  const filteredProjects = useMemo(() => {
    if (activeCategory === "all") return items
    return items.filter((item) => item.category === activeCategory)
  }, [items, activeCategory])

  useEffect(() => {
    if (!selectedProject) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedProject(null)
      }
    }

    window.addEventListener("keydown", handleEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", handleEscape)
    }
  }, [selectedProject])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!filterRef.current) return
      if (!filterRef.current.contains(event.target as Node)) {
        setFilterOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setFilterOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const allLabel = t?.portfolio?.allLabel ?? "Barchasi"
  const detailsLabel = t?.portfolio?.detailsButton ?? "Batafsil"
  const viewLabel = t?.portfolio?.viewProjectButton ?? "Loyihani ko‘rish"
  const techLabel = t?.portfolio?.techLabel ?? "Ishlatilgan texnologiya"
  const statusLabel = t?.portfolio?.statusLabel ?? "Holati"

  const activeCategoryLabel =
    activeCategory === "all" ? allLabel : activeCategory

  return (
    <>
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

                {t?.portfolio?.tags?.length ? (
                  <div className={styles.heroTags}>
                    {t.portfolio.tags.map((tag, index) => (
                      <span key={`${tag}-${index}`}>{tag}</span>
                    ))}
                  </div>
                ) : null}
              </div>

              <div className={styles.heroRight}>
                <div className={styles.filterWrap} ref={filterRef}>
                  <button
                    type="button"
                    className={styles.filterToggle}
                    onClick={() => setFilterOpen((prev) => !prev)}
                  >
                    <div className={styles.filterToggleText}>
                      <span className={styles.filterToggleLabel}>Filter</span>
                      <span className={styles.filterToggleValue}>
                        {activeCategoryLabel}
                      </span>
                    </div>

                    <span
                      className={`${styles.filterChevron} ${
                        filterOpen ? styles.filterChevronOpen : ""
                      }`}
                    >
                      ▾
                    </span>
                  </button>

                  <div
                    className={`${styles.filterMenu} ${
                      filterOpen ? styles.filterMenuOpen : ""
                    }`}
                  >
                    {categories.map((category) => {
                      const isActive = activeCategory === category

                      return (
                        <button
                          key={category}
                          type="button"
                          className={`${styles.filterItem} ${
                            isActive ? styles.filterItemActive : ""
                          }`}
                          onClick={() => {
                            setActiveCategory(category)
                            setFilterOpen(false)
                          }}
                        >
                          {category === "all" ? allLabel : category}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div className={styles.cardsGrid}>
            {filteredProjects.map((item, index) => (
              <motion.article
                key={`${item.id}-${index}`}
                className={styles.projectCard}
                variants={itemVariants}
                layout
              >
                <div className={styles.cardTopRow}>
                  <span className={styles.yearChip}>{item.year || "—"}</span>

                  <div className={styles.statusWrap}>
                    <span className={styles.statusLabel}>{statusLabel}</span>
                    <span className={styles.statusBadge}>
                      <span className={styles.statusDot} />
                      {item.status}
                    </span>
                  </div>
                </div>

                <h3 className={styles.cardTitle}>{item.title}</h3>

                {item.technologies?.length ? (
                  <div className={styles.techPreview}>
                    <span className={styles.techPreviewLabel}>{techLabel}</span>

                    <div className={styles.techPreviewTags}>
                      {item.technologies.slice(0, 4).map((tech, techIndex) => (
                        <span key={`${item.id}-tech-${techIndex}`}>{tech}</span>
                      ))}
                    </div>
                  </div>
                ) : null}

                <div className={styles.cardActions}>
                  <button
                    type="button"
                    className={styles.detailsButton}
                    onClick={() => setSelectedProject(item)}
                  >
                    <span>{detailsLabel}</span>
                    <ArrowUpRight size={16} />
                  </button>

                  <a
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.viewButton}
                  >
                    <span>{viewLabel}</span>
                    <ExternalLink size={16} />
                  </a>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <AnimatePresence>
        {selectedProject ? (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className={styles.modalCard}
              variants={modalVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.modalGlowOne} />
              <div className={styles.modalGlowTwo} />

              <div className={styles.modalTop}>
                <div className={styles.modalHeadLeft}>
                  {selectedProject.year ? (
                    <span className={styles.modalYear}>{selectedProject.year}</span>
                  ) : null}

                  <h3 className={styles.modalTitle}>{selectedProject.title}</h3>
                </div>

                <button
                  type="button"
                  className={styles.modalClose}
                  onClick={() => setSelectedProject(null)}
                  aria-label={t?.portfolio?.modal?.close ?? "Yopish"}
                >
                  <X size={18} />
                </button>
              </div>

              <div className={styles.modalContent}>
                <div className={styles.modalInfoGrid}>
                  <div className={styles.modalInfoCard}>
                    <span className={styles.modalInfoLabel}>
                      {t?.portfolio?.modal?.about ?? "Loyiha haqida"}
                    </span>
                    <p className={styles.modalText}>{selectedProject.text}</p>
                  </div>

                  <div className={styles.modalInfoCard}>
                    <span className={styles.modalInfoLabel}>
                      {t?.portfolio?.modal?.status ?? "Holati"}
                    </span>
                    <div className={styles.modalStatus}>
                      <span className={styles.statusDot} />
                      <span>{selectedProject.status}</span>
                    </div>
                  </div>

                  {selectedProject.technologies?.length ? (
                    <div className={styles.modalInfoCard}>
                      <span className={styles.modalInfoLabel}>
                        {t?.portfolio?.modal?.technologies ?? "Texnologiyalar"}
                      </span>
                      <div className={styles.modalTags}>
                        {selectedProject.technologies.map((tech, index) => (
                          <span key={`${selectedProject.id}-tech-modal-${index}`}>
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {selectedProject.features?.length ? (
                    <div className={styles.modalInfoCard}>
                      <span className={styles.modalInfoLabel}>
                        {t?.portfolio?.modal?.features ?? "Imkoniyatlar"}
                      </span>
                      <div className={styles.modalTags}>
                        {selectedProject.features.map((feature, index) => (
                          <span key={`${selectedProject.id}-feature-${index}`}>
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>

                <div className={styles.modalActions}>
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.modalPrimaryButton}
                  >
                    <span>{viewLabel}</span>
                    <ExternalLink size={16} />
                  </a>

                  <button
                    type="button"
                    className={styles.modalSecondaryButton}
                    onClick={() => setSelectedProject(null)}
                  >
                    {t?.portfolio?.modal?.close ?? "Yopish"}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
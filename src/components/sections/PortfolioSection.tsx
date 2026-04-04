import { AnimatePresence, motion, type Variants } from "framer-motion"
import { ArrowUpRight, Check, ExternalLink, X } from "lucide-react"
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
      yearLabel?: string
      filterLabel?: string
      selectedCountLabel?: string
      modal?: {
        close?: string
        about?: string
        technologies?: string
        features?: string
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

function normalizeKey(value: string) {
  return String(value ?? "")
    .toLowerCase()
    .replace(/\.[^/.]+$/, "")
    .replace(/&/g, "and")
    .replace(/\s+/g, "")
    .replace(/[-_]+/g, "")
    .replace(/[^a-z0-9]/g, "")
}

const rawImages = import.meta.glob("../../assets/**/*.{png,jpg,jpeg,webp,svg}", {
  eager: true,
  import: "default",
}) as Record<string, string>

function buildImageMap() {
  const map: Record<string, string> = {}

  Object.entries(rawImages).forEach(([path, url]) => {
    const parts = path.split("/")
    const fileName = parts[parts.length - 1] || ""
    const folderName = parts[parts.length - 2] || ""
    const parentFolderName = parts[parts.length - 3] || ""

    const fileKey = normalizeKey(fileName)
    const folderKey = normalizeKey(folderName)
    const parentFolderKey = normalizeKey(parentFolderName)
    const fullPathKey = normalizeKey(path)

    if (fileKey) map[fileKey] = url
    if (folderKey) map[folderKey] = url
    if (parentFolderKey) map[parentFolderKey] = url
    if (fullPathKey) map[fullPathKey] = url

    if (folderKey.includes("besnik") || fileKey.includes("besnik")) {
      map["besnik"] = url
    }
    if (folderKey.includes("coder") || fileKey.includes("coder")) {
      map["coder"] = url
    }
    if (folderKey.includes("crud") || fileKey.includes("crud")) {
      map["crud"] = url
    }
    if (folderKey.includes("novacolor") || fileKey.includes("novacolor")) {
      map["novacolor"] = url
      map["novacoloruz"] = url
    }
    if (folderKey.includes("snake") || fileKey.includes("snake")) {
      map["snake"] = url
      map["snakegame"] = url
    }
    if (folderKey.includes("sendtoadmin") || fileKey.includes("sendtoadmin")) {
      map["sendtoadmin"] = url
    }
    if (folderKey.includes("green") || fileKey.includes("green")) {
      map["greenshop"] = url
      map["green"] = url
    }
    if (
      folderKey.includes("2048") ||
      fileKey.includes("2048") ||
      fullPathKey.includes("2048")
    ) {
      map["2048"] = url
      map["game2048"] = url
      map["strategi2048"] = url
      map["strategik2048"] = url
    }
  })

  return map
}

const portfolioImageMap = buildImageMap()

function getProjectImage(project: PortfolioProject): string | null {
  const candidates = [
    normalizeKey(project.id),
    normalizeKey(project.title),
    normalizeKey(project.category),
    normalizeKey(`${project.id}${project.title}`),
    normalizeKey(`${project.title}${project.category}`),
  ].filter(Boolean)

  for (const candidate of candidates) {
    if (portfolioImageMap[candidate]) {
      return portfolioImageMap[candidate]
    }
  }

  for (const candidate of candidates) {
    const matchedKey = Object.keys(portfolioImageMap).find(
      (key) =>
        key.includes(candidate) ||
        candidate.includes(key) ||
        key.startsWith(candidate) ||
        candidate.startsWith(key)
    )

    if (matchedKey) {
      return portfolioImageMap[matchedKey]
    }
  }

  const rawEntries = Object.entries(rawImages)
  for (const candidate of candidates) {
    const found = rawEntries.find(([path]) => normalizeKey(path).includes(candidate))
    if (found) return found[1]
  }

  return null
}

export default function PortfolioSection({ t }: PortfolioSectionProps) {
  const portfolioLabel = t?.nav?.portfolio ?? "Portfolio"
  const items = t?.portfolio?.items ?? []

  const [activeCategory, setActiveCategory] = useState("all")
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null)
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

    const previousHtmlOverflow = document.documentElement.style.overflow
    const previousBodyOverflow = document.body.style.overflow
    const previousBodyOverflowX = document.body.style.overflowX

    document.documentElement.style.overflow = "hidden"
    document.body.style.overflow = "hidden"
    document.body.style.overflowX = "hidden"

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedProject(null)
    }

    window.addEventListener("keydown", handleEscape)

    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow
      document.body.style.overflow = previousBodyOverflow
      document.body.style.overflowX = previousBodyOverflowX
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

  const allLabel = t?.portfolio?.allLabel ?? "Barchasi"
  const detailsLabel = t?.portfolio?.detailsButton ?? "Batafsil"
  const viewLabel = t?.portfolio?.viewProjectButton ?? "Loyihani ko‘rish"
  const techLabel = t?.portfolio?.techLabel ?? "Ishlatilgan texnologiyalar"
  const statusLabel = t?.portfolio?.statusLabel ?? "Holati"
  const yearLabel = t?.portfolio?.yearLabel ?? "Yil"
  const filterLabel = t?.portfolio?.filterLabel ?? "Kategoriya"
  const selectedCountLabel = t?.portfolio?.selectedCountLabel ?? "ta loyiha"

  const activeCategoryLabel = activeCategory === "all" ? allLabel : activeCategory

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
                <div className={styles.filterCompact} ref={filterRef}>
                  <div className={styles.filterHead}>
                    <span className={styles.filterLabelText}>{filterLabel}</span>
                    <span className={styles.filterCount}>
                      {filteredProjects.length} {selectedCountLabel}
                    </span>
                  </div>

                  <button
                    type="button"
                    className={styles.dropdownButton}
                    onClick={() => setFilterOpen((prev) => !prev)}
                    aria-expanded={filterOpen}
                    aria-haspopup="listbox"
                  >
                    <span className={styles.dropdownButtonText}>{activeCategoryLabel}</span>
                    <span
                      className={`${styles.dropdownChevron} ${
                        filterOpen ? styles.dropdownChevronOpen : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {filterOpen ? (
                      <motion.div
                        className={styles.dropdownMenu}
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.98 }}
                        transition={{ duration: 0.18 }}
                        role="listbox"
                      >
                        {categories.map((category) => {
                          const isActive = activeCategory === category
                          const label = category === "all" ? allLabel : category

                          return (
                            <button
                              key={category}
                              type="button"
                              role="option"
                              aria-selected={isActive}
                              className={`${styles.dropdownItem} ${
                                isActive ? styles.dropdownItemActive : ""
                              }`}
                              onClick={() => {
                                setActiveCategory(category)
                                setFilterOpen(false)
                              }}
                            >
                              <span className={styles.dropdownItemText}>{label}</span>
                              {isActive ? <Check size={16} className={styles.dropdownCheck} /> : null}
                            </button>
                          )
                        })}
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div className={styles.cardsGrid}>
            {filteredProjects.map((item, index) => {
              const projectImage = getProjectImage(item)

              return (
                <motion.article
                  key={`${item.id}-${index}`}
                  className={styles.projectCard}
                  variants={itemVariants}
                  layout
                >
                  <div className={styles.projectImageWrap}>
                    {projectImage ? (
                      <img
                        src={projectImage}
                        alt={item.title}
                        className={styles.projectImage}
                        loading="lazy"
                      />
                    ) : (
                      <div className={styles.projectImageFallback}>
                        <span>{item.title}</span>
                      </div>
                    )}
                  </div>

                  <div className={styles.cardTopRow}>
                    <span className={styles.yearChip}>
                      {yearLabel}: {item.year || "—"}
                    </span>

                    <div className={styles.statusWrap}>
                      <span className={styles.statusLabel}>{statusLabel}</span>
                      <span className={styles.statusBadge}>
                        <span className={styles.statusDot} />
                        <span className={styles.statusBadgeText}>{item.status}</span>
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
              )
            })}
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
                    <span className={styles.modalYear}>
                      {yearLabel}: {selectedProject.year}
                    </span>
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
                {(() => {
                  const selectedProjectImage = getProjectImage(selectedProject)

                  return selectedProjectImage ? (
                    <div className={styles.modalPreview}>
                      <img
                        src={selectedProjectImage}
                        alt={selectedProject.title}
                        className={styles.modalPreviewImage}
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <div className={styles.modalPreviewFallback}>
                      <span>{selectedProject.title}</span>
                    </div>
                  )
                })()}

                <div className={styles.modalInfoGrid}>
                  <div className={styles.modalInfoCard}>
                    <span className={styles.modalInfoLabel}>
                      {t?.portfolio?.modal?.about ?? "Loyiha haqida"}
                    </span>
                    <p className={styles.modalText}>{selectedProject.text}</p>
                  </div>

                  <div className={styles.modalInfoCard}>
                    <span className={styles.modalInfoLabel}>
                      {t?.portfolio?.modal?.status ?? statusLabel}
                    </span>

                    <div className={styles.modalStatusWrap}>
                      <span className={styles.modalStatusLabel}>{statusLabel}</span>
                      <span className={styles.modalStatusBadge}>
                        <span className={styles.statusDot} />
                        <span className={styles.modalStatusBadgeText}>
                          {selectedProject.status}
                        </span>
                      </span>
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
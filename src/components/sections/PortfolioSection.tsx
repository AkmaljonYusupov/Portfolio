import { AnimatePresence, motion, type Variants } from "framer-motion"
import { ArrowUpRight, Check, ExternalLink, X } from "lucide-react"
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import styles from "./PortfolioSection.module.scss"

// ─── Types ────────────────────────────────────────────────────────────────────

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

type PortfolioCard = {
  liveDemo?: string
  premiumProject?: string
  productionUI?: string
  responsive?: string
  modernUX?: string
  technologies?: string
  features?: string
  year?: string
  status?: string
}

type PortfolioStats = {
  totalProjects?: string
  uiLevel?: string
  responsive?: string
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
      stats?: PortfolioStats
      card?: PortfolioCard
      // flat label aliases — kept for backward compat
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

// ─── Animation variants ───────────────────────────────────────────────────────

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
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: smoothEase } },
}

const modalVariants: Variants = {
  hidden: { opacity: 0, y: 22, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.25, ease: smoothEase } },
  exit: { opacity: 0, y: 18, scale: 0.98, transition: { duration: 0.18, ease: "easeOut" } },
}

// ─── Image map (built once at module level, never re-runs) ────────────────────

function normalizeKey(value: string) {
  return String(value ?? "")
    .toLowerCase()
    .replace(/\.[^/.]+$/, "")
    .replace(/&/g, "and")
    .replace(/\s+/g, "")
    .replace(/[-_]+/g, "")
    .replace(/[^a-z0-9]/g, "")
}

const rawImageLoaders = import.meta.glob<{ default: string }>(
  "../../assets/**/*.{png,jpg,jpeg,webp,svg}",
  { eager: false }
)

const pathToKeys: Record<string, string[]> = {}

for (const path of Object.keys(rawImageLoaders)) {
  const parts      = path.split("/")
  const fileName   = parts[parts.length - 1] ?? ""
  const folderName = parts[parts.length - 2] ?? ""

  const keys = [
    normalizeKey(fileName),
    normalizeKey(folderName),
    normalizeKey(path),
  ].filter(Boolean)

  const aliases: Record<string, string[]> = {
    besnik:    ["besnik"],
    coder:     ["coder"],
    crud:      ["crud"],
    novacolor: ["novacolor", "novacoloruz"],
    snake:     ["snake", "snakegame"],
    sendtoadmin: ["sendtoadmin"],
    green:     ["greenshop", "green"],
    "2048":    ["2048", "game2048", "strategi2048", "strategik2048"],
  }

  for (const [keyword, extra] of Object.entries(aliases)) {
    if (keys.some((k) => k.includes(keyword))) keys.push(...extra)
  }

  pathToKeys[path] = [...new Set(keys)]
}

const keyToPath: Record<string, string> = {}
for (const [path, keys] of Object.entries(pathToKeys)) {
  for (const key of keys) {
    if (!keyToPath[key]) keyToPath[key] = path
  }
}

const resolvedUrlCache: Record<string, string> = {}

async function resolveImageUrl(vitePath: string): Promise<string> {
  if (resolvedUrlCache[vitePath]) return resolvedUrlCache[vitePath]
  const mod = await rawImageLoaders[vitePath]()
  resolvedUrlCache[vitePath] = mod.default
  return mod.default
}

function findVitePath(project: PortfolioProject): string | null {
  const candidates = [
    normalizeKey(project.id),
    normalizeKey(project.title),
    normalizeKey(project.category),
    normalizeKey(`${project.id}${project.title}`),
    normalizeKey(`${project.title}${project.category}`),
  ].filter(Boolean)

  for (const candidate of candidates) {
    if (keyToPath[candidate]) return keyToPath[candidate]
  }

  for (const candidate of candidates) {
    const match = Object.keys(keyToPath).find(
      (k) => k.includes(candidate) || candidate.includes(k)
    )
    if (match) return keyToPath[match]
  }

  return null
}

// ─── LazyImage ────────────────────────────────────────────────────────────────

type LazyImageProps = {
  project: PortfolioProject
  className: string
  fallbackClassName: string
  alt: string
  fetchPriority?: "high" | "low" | "auto"
}

function LazyImage({ project, className, fallbackClassName, alt, fetchPriority }: LazyImageProps) {
  const wrapRef             = useRef<HTMLDivElement>(null)
  const [src, setSrc]       = useState<string | null>(null)
  const [loaded, setLoaded] = useState(false)
  const [error, setError]   = useState(false)

  useEffect(() => {
    const vitePath = findVitePath(project)
    if (!vitePath) { setError(true); return }

    if (resolvedUrlCache[vitePath]) { setSrc(resolvedUrlCache[vitePath]); return }

    const el = wrapRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return
        observer.disconnect()
        resolveImageUrl(vitePath).then(setSrc).catch(() => setError(true))
      },
      { rootMargin: "300px 0px", threshold: 0 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [project])

  if (error || (!src && findVitePath(project) === null)) {
    return <div className={fallbackClassName}><span>{alt}</span></div>
  }

  return (
    <div ref={wrapRef} className={styles.lazyImageWrap}>
      {!loaded && <div className={styles.imageSkeleton} aria-hidden="true" />}
      {src && (
        <img
          src={src}
          alt={alt}
          className={`${className} ${loaded ? styles.imgVisible : styles.imgHidden}`}
          decoding="async"
          // @ts-expect-error — fetchpriority is valid HTML but TS types lag
          fetchpriority={fetchPriority ?? "auto"}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
        />
      )}
    </div>
  )
}

// ─── ModalImage ───────────────────────────────────────────────────────────────

function ModalImage({ project }: { project: PortfolioProject }) {
  const [src, setSrc] = useState<string | null>(() => {
    const vitePath = findVitePath(project)
    return vitePath && resolvedUrlCache[vitePath] ? resolvedUrlCache[vitePath] : null
  })
  const [loaded, setLoaded] = useState(false)
  const [error, setError]   = useState(false)

  useEffect(() => {
    if (src) return
    const vitePath = findVitePath(project)
    if (!vitePath) { setError(true); return }
    resolveImageUrl(vitePath).then(setSrc).catch(() => setError(true))
  }, [project, src])

  if (error || findVitePath(project) === null) {
    return (
      <div className={`${styles.modalPreviewFallback} ${styles.projectImageFallback}`}>
        <span>{project.title}</span>
      </div>
    )
  }

  return (
    <div className={styles.modalPreview}>
      {!loaded && <div className={styles.imageSkeleton} aria-hidden="true" />}
      {src && (
        <img
          src={src}
          alt={project.title}
          className={`${styles.modalPreviewImage} ${loaded ? styles.imgVisible : styles.imgHidden}`}
          decoding="async"
          // @ts-expect-error
          fetchpriority="high"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
        />
      )}
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function PortfolioSection({ t }: PortfolioSectionProps) {
  // ── nav ───────────────────────────────────────────────────────────────────
  const portfolioLabel = t?.nav?.portfolio ?? "Portfolio"

  // ── Resolve labels: card.* (JSON) → flat keys (fallback) → hardcoded UZ ──
  const card = t?.portfolio?.card

  const yearLabel          = card?.year              ?? t?.portfolio?.yearLabel           ?? "Yil"
  const statusLabel        = card?.status            ?? t?.portfolio?.statusLabel         ?? "Holati"
  const techLabel          = card?.technologies      ?? t?.portfolio?.techLabel           ?? "Texnologiyalar"
  const detailsLabel       = t?.portfolio?.detailsButton                                 ?? "Batafsil"
  const viewLabel          = card?.liveDemo          ?? t?.portfolio?.viewProjectButton   ?? "Loyihani ko'rish"
  const filterLabel        = t?.portfolio?.filterLabel                                   ?? "Kategoriya"
  const selectedCountLabel = t?.portfolio?.selectedCountLabel                            ?? "ta loyiha"
  const allLabel           = t?.portfolio?.allLabel                                      ?? "Barchasi"

  // ── Modal labels ──────────────────────────────────────────────────────────
  const modal = t?.portfolio?.modal

  const modalCloseLabel  = modal?.close        ?? "Yopish"
  const modalAboutLabel  = modal?.about        ?? "Loyiha haqida"
  const modalTechLabel   = modal?.technologies ?? card?.technologies ?? techLabel
  const modalFeatLabel   = modal?.features     ?? card?.features     ?? "Imkoniyatlar"
  const modalStatusLabel = modal?.status       ?? card?.status       ?? statusLabel

  // ── State ─────────────────────────────────────────────────────────────────
  const items = t?.portfolio?.items ?? []

  const [activeCategory, setActiveCategory]   = useState("all")
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null)
  const [filterOpen, setFilterOpen]           = useState(false)

  const filterRef = useRef<HTMLDivElement | null>(null)

  const categories = useMemo(() => {
    const unique = Array.from(
      new Set(items.map((item) => item.category).filter(Boolean))
    )
    return ["all", ...unique]
  }, [items])

  const filteredProjects = useMemo(() => {
    if (activeCategory === "all") return items
    return items.filter((item) => item.category === activeCategory)
  }, [items, activeCategory])

  // Lock scroll when modal is open
  useEffect(() => {
    if (!selectedProject) return
    const prevHtml  = document.documentElement.style.overflow
    const prevBody  = document.body.style.overflow
    const prevBodyX = document.body.style.overflowX
    document.documentElement.style.overflow = "hidden"
    document.body.style.overflow  = "hidden"
    document.body.style.overflowX = "hidden"
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setSelectedProject(null) }
    window.addEventListener("keydown", onKey)
    return () => {
      document.documentElement.style.overflow = prevHtml
      document.body.style.overflow  = prevBody
      document.body.style.overflowX = prevBodyX
      window.removeEventListener("keydown", onKey)
    }
  }, [selectedProject])

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!filterRef.current?.contains(e.target as Node)) setFilterOpen(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const closeModal          = useCallback(() => setSelectedProject(null), [])
  const activeCategoryLabel = activeCategory === "all" ? allLabel : activeCategory

  // ── Render ────────────────────────────────────────────────────────────────
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

          {/* ── Hero card ─────────────────────────────────────────────────── */}
          <motion.div className={styles.heroCard} variants={itemVariants}>
            <div className={styles.heroContent}>

              <div className={styles.heroLeft}>
                <h2 className={styles.title}>{t.portfolio.title}</h2>
                <p className={styles.desc}>{t.portfolio.desc}</p>

                {t?.portfolio?.tags?.length ? (
                  <div className={styles.heroTags}>
                    {t.portfolio.tags.map((tag, i) => (
                      <span key={`${tag}-${i}`}>{tag}</span>
                    ))}
                  </div>
                ) : null}
              </div>

              {/* Filter dropdown */}
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
                    onClick={() => setFilterOpen((p) => !p)}
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
                    {filterOpen && (
                      <motion.div
                        className={styles.dropdownMenu}
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.98 }}
                        transition={{ duration: 0.18 }}
                        role="listbox"
                      >
                        {categories.map((cat) => {
                          const isActive = activeCategory === cat
                          const label    = cat === "all" ? allLabel : cat
                          return (
                            <button
                              key={cat}
                              type="button"
                              role="option"
                              aria-selected={isActive}
                              className={`${styles.dropdownItem} ${
                                isActive ? styles.dropdownItemActive : ""
                              }`}
                              onClick={() => {
                                setActiveCategory(cat)
                                setFilterOpen(false)
                              }}
                            >
                              <span className={styles.dropdownItemText}>{label}</span>
                              {isActive && (
                                <Check size={16} className={styles.dropdownCheck} />
                              )}
                            </button>
                          )
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Cards grid ───────────────────────────────────────────────── */}
          <motion.div className={styles.cardsGrid}>
            {filteredProjects.map((item, index) => (
              <motion.article
                key={`${item.id}-${index}`}
                className={styles.projectCard}
                variants={itemVariants}
                layout
              >
                {/* Image */}
                <div className={styles.projectImageWrap}>
                  <LazyImage
                    project={item}
                    className={styles.projectImage}
                    fallbackClassName={styles.projectImageFallback}
                    alt={item.title}
                    fetchPriority={index === 0 ? "high" : undefined}
                  />
                </div>

                {/* Year + Status row */}
                <div className={styles.cardTopRow}>
                  <span className={styles.yearChip}>
                    {yearLabel}: {item.year ?? "—"}
                  </span>
                  <div className={styles.statusWrap}>
                    <span className={styles.statusLabel}>{statusLabel}</span>
                    <span className={styles.statusBadge}>
                      <span className={styles.statusDot} />
                      <span className={styles.statusBadgeText}>{item.status}</span>
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className={styles.cardTitle}>{item.title}</h3>

                {/* Technologies preview (max 4) */}
                {item.technologies?.length ? (
                  <div className={styles.techPreview}>
                    <span className={styles.techPreviewLabel}>{techLabel}</span>
                    <div className={styles.techPreviewTags}>
                      {item.technologies.slice(0, 4).map((tech, ti) => (
                        <span key={`${item.id}-tech-${ti}`}>{tech}</span>
                      ))}
                    </div>
                  </div>
                ) : null}

                {/* Card actions */}
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

      {/* ── Modal ─────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
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

              {/* Modal header */}
              <div className={styles.modalTop}>
                <div className={styles.modalHeadLeft}>
                  {selectedProject.year && (
                    <span className={styles.modalYear}>
                      {yearLabel}: {selectedProject.year}
                    </span>
                  )}
                  <h3 className={styles.modalTitle}>{selectedProject.title}</h3>
                </div>
                <button
                  type="button"
                  className={styles.modalClose}
                  onClick={closeModal}
                  aria-label={modalCloseLabel}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal body */}
              <div className={styles.modalContent}>
                <ModalImage project={selectedProject} />

                <div className={styles.modalInfoGrid}>

                  {/* About */}
                  <div className={styles.modalInfoCard}>
                    <span className={styles.modalInfoLabel}>{modalAboutLabel}</span>
                    <p className={styles.modalText}>{selectedProject.text}</p>
                  </div>

                  {/* Status */}
                  <div className={styles.modalInfoCard}>
                    <span className={styles.modalInfoLabel}>{modalStatusLabel}</span>
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

                  {/* Technologies */}
                  {selectedProject.technologies?.length ? (
                    <div className={styles.modalInfoCard}>
                      <span className={styles.modalInfoLabel}>{modalTechLabel}</span>
                      <div className={styles.modalTags}>
                        {selectedProject.technologies.map((tech, i) => (
                          <span key={`${selectedProject.id}-tech-modal-${i}`}>{tech}</span>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {/* Features */}
                  {selectedProject.features?.length ? (
                    <div className={styles.modalInfoCard}>
                      <span className={styles.modalInfoLabel}>{modalFeatLabel}</span>
                      <div className={styles.modalTags}>
                        {selectedProject.features.map((feature, i) => (
                          <span key={`${selectedProject.id}-feature-${i}`}>{feature}</span>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>

                {/* Modal actions */}
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
                    onClick={closeModal}
                  >
                    {modalCloseLabel}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
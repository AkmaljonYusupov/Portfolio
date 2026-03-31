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
import { FaWordpress } from "react-icons/fa"
import AkmaljonImage from "../../assets/Akmaljon.jpg"
import { portfolioData } from "../../data/portfolio"
import styles from "./AboutSection.module.scss"

export default function AboutSection({ t }: { t: any }) {
  const skills = portfolioData.skills

  const contentBlocks = [
    {
      icon: LayoutTemplate,
      title: "Modern UI / UX",
      text: "Zamonaviy, toza va foydalanuvchiga qulay interfeyslar yarataman.",
      tags: ["Premium UI", "Modern Design", "Clean Code", "WordPress"],
      isBrand: false,
    },
    {
      icon: MonitorSmartphone,
      title: "Responsive Layout",
      text: "Saytni mobil, planshet va desktop qurilmalarga mos responsiv tarzda ishlab chiqaman.",
      tags: [
        "Responsive UI",
        "Mobile First",
        "Tablet Ready",
        "Desktop Optimized",
        "Flexible Layout",
        "Cross-device",
      ],
      isBrand: false,
    },
    {
      icon: Languages,
      title: "Multi-language Systems",
      text: "Ko‘p tilli va ko‘p sahifali web saytlarni qulay va kengaytiriladigan struktura bilan yarataman.",
      tags: [
        "react-i18next",
        "i18next",
        "JSON Locales",
        "Language Switcher",
        "Multi-page Structure",
        "Dynamic Translation",
      ],
      isBrand: false,
    },
    {
      icon: FaWordpress,
      title: "WordPress Solutions",
      text: "WordPress template va plaginlari asosida tezkor, tayyor va moslashtirilgan saytlar yarataman.",
      tags: [
        "WordPress Templates",
        "Elementor",
        "WooCommerce",
        "Contact Form",
        "Premium Themes",
        "Plugins",
      ],
      isBrand: true,
    },
    {
      icon: Briefcase,
      title: "Project Ready",
      text: "Portfolio, dashboard, business va corporate loyihalar uchun amaliy frontend yechimlar yarataman.",
      tags: [
        "Portfolio Website",
        "Dashboard UI",
        "Business Website",
        "Corporate Website",
        "Landing Page",
        "Admin Panel",
      ],
      isBrand: false,
    },
    {
      icon: Code2,
      title: "Code Quality",
      text: "Toza, modulli va kengaytiriladigan kod strukturasiga asoslangan frontend yechimlar yarataman.",
      tags: [
        "Clean Code",
        "Reusable Components",
        "Scalable Structure",
        "Readable Files",
        "Maintainable Codebase",
        "Modular Architecture",
      ],
      isBrand: false,
    },
  ]

  return (
    <section className={styles.aboutSection}>
      <div className={styles.bgCircleOne} />
      <div className={styles.bgCircleTwo} />

      <div className={styles.sectionWatermark}>
        {t?.nav?.about ?? "Men haqimda"}
      </div>

      <motion.div
        className={styles.centerContent}
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.45 }}
      >
        <h2 className={styles.title}>{t?.about?.title}</h2>
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
            <span className={styles.cardEyebrow}>Personal Introduction</span>
          </div>

          <p className={styles.cardText}>
            Men zamonaviy, toza va foydalanuvchiga qulay interfeyslar yaratishga
            e’tibor beraman. Frontend development jarayonida responsiv dizayn,
            interaktivlik va professional ko‘rinishga alohida ahamiyat beraman.
          </p>

          <div className={styles.cardTags}>
            <span>Frontend</span>
            <span>Responsive</span>
            <span>Clean UI</span>
          </div>

          <div className={styles.featureList}>
            {t?.about?.cards?.map((item: string, index: number) => (
              <motion.div
                key={item}
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
              <img src={AkmaljonImage} alt="Akmaljon Yusufov" />
            </div>
            <span className={styles.profileOnlineDot} />
          </div>

          <div className={styles.profileContent}>
            <h3 className={styles.profileName}>Akmaljon Yusufov</h3>
            <p className={styles.profileRole}>Frontend Developer</p>

            <div className={styles.profileMeta}>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Yo‘nalish</span>
                <span className={styles.metaValue}>Frontend Development</span>
              </div>

              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Asosiy e’tibor</span>
                <span className={styles.metaValue}>
                  UI, Responsivlik, Interaktivlik
                </span>
              </div>

              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Joylashuv</span>
                <span className={styles.metaValue}>
                  <MapPin size={15} />
                  Uzbekistan
                </span>
              </div>
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
              const Icon = item.icon

              return (
                <div key={`${item.title}-${index}`} className={styles.contentBlock}>
                  <div className={styles.iconBox}>
                    <Icon
                      size={18}
                      className={item.isBrand ? styles.wordpressIcon : undefined}
                    />
                  </div>

                  <div className={styles.contentBlockBody}>
                    <h4>{item.title}</h4>
                    <p>{item.text}</p>

                    <div className={styles.contentBlockTags}>
                      {item.tags.map((tag: string, tagIndex: number) => (
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
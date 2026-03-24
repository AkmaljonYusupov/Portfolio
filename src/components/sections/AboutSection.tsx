import { motion } from "framer-motion"
import { CheckCircle2, MapPin, User } from "lucide-react"
import AkmaljonImage from "../../assets/Akmaljon.jpg"
import styles from "./AboutSection.module.scss"

export default function AboutSection({ t }: { t: any }) {
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
        <h2 className={styles.title}>{t.about.title}</h2>
        <p className={styles.desc}>{t.about.desc}</p>
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
            <div className={styles.cardIcon}>
              <User size={20} />
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
            {t.about.cards.map((item: string, index: number) => (
              <motion.div
                key={item}
                className={styles.featureItem}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: index * 0.06 }}
              >
                <div className={styles.featureIcon}>
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
            <div className={styles.profileRingBlur} />
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
    </section>
  )
}
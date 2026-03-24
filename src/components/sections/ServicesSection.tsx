import { motion } from "framer-motion"
import ServiceIcon from "../ServiceIcon"
import styles from "./ServicesSection.module.scss"

type ServicesSectionProps = {
  t: any
}

export default function ServicesSection({ t }: ServicesSectionProps) {
  const sectionLabel = t?.nav?.services ?? "Services"

  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5 }}
      className={styles.section}
    >
      <div className={styles.bgCircleOne} />
      <div className={styles.bgCircleTwo} />
      <div className={styles.bgLine} />

      <div className={styles.sectionWatermark}>{sectionLabel}</div>

      <div className={styles.contentLayer}>
        <div className={styles.topCard}>
          <div className={styles.topContent}>
            <div className={styles.topLeft}>
              <h2 className={styles.title}>{t.services.title}</h2>
              <p className={styles.desc}>{t.services.desc}</p>
            </div>

            <div className={styles.topBadge}>
              <span className={styles.badgeValue}>
                {t?.services?.items?.length || 0}+
              </span>
              <span className={styles.badgeText}>Premium Services</span>
            </div>
          </div>
        </div>

        <div className={styles.grid}>
          {t.services.items.map((service: any, index: number) => (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className={styles.card}
            >
              <div className={styles.cardGlow} />

              <div className={styles.cardTop}>
                <div className={styles.iconWrap}>
                  <ServiceIcon type={service.icon} />
                </div>

                <span className={styles.cardNumber}>
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.text}>{service.text}</p>

              <div className={styles.cardFooter}>
                <span className={styles.footerBadge}>Professional Service</span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
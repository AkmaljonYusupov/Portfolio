import { motion } from "framer-motion"
import ServiceIcon from "../ServiceIcon"
import styles from "./ServicesSection.module.scss"

export default function ServicesSection({ t }: { t: any }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      className={styles.section}
    >
      <div className={styles.topCard}>
        <h2 className={styles.title}>{t.services.title}</h2>
        <p className={styles.desc}>{t.services.desc}</p>
      </div>

      <div className={styles.grid}>
        {t.services.items.map((service: any, index: number) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.07 }}
            className={styles.card}
          >
            <div className={styles.iconWrap}>
              <ServiceIcon type={service.icon} />
            </div>

            <h3 className={styles.cardTitle}>{service.title}</h3>
            <p className={styles.text}>{service.text}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}
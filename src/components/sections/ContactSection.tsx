import { motion } from "framer-motion"
import { ArrowUpRight, CheckCircle2 } from "lucide-react"
import { portfolioData } from "../../data/portfolio"
import styles from "./ContactSection.module.scss"

export default function ContactSection({ t }: { t: any }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      className={styles.section}
    >
      <div className={styles.infoCard}>
        <div className={styles.availability}>
          <CheckCircle2 size={16} />
          {t.contact.availability}
        </div>

        <h2 className={styles.title}>{t.contact.title}</h2>
        <p className={styles.desc}>{t.contact.desc}</p>

        <div className={styles.infoGrid}>
          {[
            { label: t.contact.email, value: portfolioData.contacts.email },
            { label: t.contact.phone, value: portfolioData.contacts.phone },
            { label: t.contact.location, value: portfolioData.contacts.location },
          ].map(item => (
            <div key={item.label} className={styles.infoItem}>
              <div className={styles.infoLabel}>{item.label}</div>
              <div className={styles.infoValue}>{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.formCard}>
        <div className={styles.form}>
          <input
            type="text"
            className={styles.input}
            placeholder={t.contact.fullName}
          />

          <input
            type="email"
            className={styles.input}
            placeholder={t.contact.email}
          />

          <textarea
            rows={6}
            className={styles.textarea}
            placeholder={t.contact.projectDetails}
          />

          <button className={styles.submitBtn}>
            {t.contact.button}
            <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
    </motion.section>
  )
}
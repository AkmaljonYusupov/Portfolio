import { motion } from "framer-motion"
import { CheckCircle2, Mail, MapPin, Phone, Send, Sparkles } from "lucide-react"
import styles from "./ContactSection.module.scss"

type ContactSectionProps = {
  t: any
}

export default function ContactSection({ t }: ContactSectionProps) {
  return (
    <motion.section
      className={styles.section}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.bgCircleOne} />
      <div className={styles.bgCircleTwo} />
      <div className={styles.bgGrid} />
      <div className={styles.bgLine} />

      <div className={styles.sectionWatermark}>
        {t?.nav?.contact ?? "Contact"}
      </div>

      <motion.div
        className={styles.infoCard}
        initial={{ opacity: 0, x: -18 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45 }}
      >
        <div className={styles.cardTopLine} />

        <div className={styles.availability}>
          <CheckCircle2 size={16} />
          <span>{t?.contact?.availability ?? "Available for new projects"}</span>
        </div>

        <h2 className={styles.title}>{t?.contact?.title ?? "Let’s work together"}</h2>
        <p className={styles.desc}>
          {t?.contact?.desc ??
            "Agar sizga zamonaviy, responsiv va premium darajadagi web loyiha kerak bo‘lsa, men bilan bog‘lanishingiz mumkin."}
        </p>

        <div className={styles.quickStats}>
          <div className={styles.statItem}>
            <span className={styles.statValue}>24h</span>
            <span className={styles.statLabel}>Fast reply</span>
          </div>

          <div className={styles.statItem}>
            <span className={styles.statValue}>Pro</span>
            <span className={styles.statLabel}>Design quality</span>
          </div>
        </div>

        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <div className={styles.infoIcon}>
              <Mail size={18} />
            </div>

            <div>
              <span className={styles.infoLabel}>{t?.contact?.emailLabel ?? "Email"}</span>
              <p className={styles.infoValue}>
                {t?.contact?.email ?? "akmaljon@example.com"}
              </p>
            </div>
          </div>

          <div className={styles.infoItem}>
            <div className={styles.infoIcon}>
              <Phone size={18} />
            </div>

            <div>
              <span className={styles.infoLabel}>{t?.contact?.phoneLabel ?? "Phone"}</span>
              <p className={styles.infoValue}>
                {t?.contact?.phone ?? "+998 90 123 45 67"}
              </p>
            </div>
          </div>

          <div className={styles.infoItem}>
            <div className={styles.infoIcon}>
              <MapPin size={18} />
            </div>

            <div>
              <span className={styles.infoLabel}>{t?.contact?.locationLabel ?? "Location"}</span>
              <p className={styles.infoValue}>
                {t?.contact?.location ?? "Uzbekistan"}
              </p>
            </div>
          </div>
        </div>

        <div className={styles.noteBox}>
          <Sparkles size={16} />
          <span>
            {t?.contact?.note ??
              "Frontend, portfolio, landing page va zamonaviy web interfeyslar bo‘yicha hamkorlik uchun ochiqman."}
          </span>
        </div>
      </motion.div>

      <motion.div
        className={styles.formCard}
        initial={{ opacity: 0, x: 18 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45, delay: 0.08 }}
      >
        <div className={styles.cardTopLine} />

        <div className={styles.formHeader}>
          <h3 className={styles.formTitle}>
            {t?.contact?.formTitle ?? "Send a message"}
          </h3>
          <p className={styles.formDesc}>
            {t?.contact?.formDesc ??
              "Loyihangiz haqida qisqacha yozing, men sizga tez orada javob beraman."}
          </p>
        </div>

        <form className={styles.form}>
          <div className={styles.inputGrid}>
            <div className={styles.field}>
              <label className={styles.label}>
                {t?.contact?.nameLabel ?? "Your name"}
              </label>
              <input
                type="text"
                className={styles.input}
                placeholder={t?.contact?.namePlaceholder ?? "Akmaljon Yusufov"}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>
                {t?.contact?.emailFieldLabel ?? "Email address"}
              </label>
              <input
                type="email"
                className={styles.input}
                placeholder={t?.contact?.emailPlaceholder ?? "you@example.com"}
              />
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>
              {t?.contact?.subjectLabel ?? "Subject"}
            </label>
            <input
              type="text"
              className={styles.input}
              placeholder={t?.contact?.subjectPlaceholder ?? "Project inquiry"}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>
              {t?.contact?.messageLabel ?? "Message"}
            </label>
            <textarea
              className={styles.textarea}
              placeholder={
                t?.contact?.messagePlaceholder ??
                "Tell me about your project, goals, and preferred style..."
              }
            />
          </div>

          <div className={styles.formBottom}>
            <div className={styles.helperText}>
              {t?.contact?.helperText ?? "Usually replies within a short time."}
            </div>

            <button type="submit" className={styles.submitBtn}>
              <Send size={16} />
              <span>{t?.contact?.submit ?? "Send Message"}</span>
            </button>
          </div>
        </form>
      </motion.div>
    </motion.section>
  )
}
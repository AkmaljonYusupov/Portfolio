import { motion } from "framer-motion"
import { Figma, Github, Linkedin } from "lucide-react"
import styles from "./SocialLinks.module.scss"

export default function SocialLinks() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.08 }}
      className={styles.links}
    >
      <a href="#" className={styles.link}>
        <Github size={16} />
        GitHub
      </a>

      <a href="#" className={styles.link}>
        <Linkedin size={16} />
        LinkedIn
      </a>

      <a href="#" className={styles.link}>
        <Figma size={16} />
        Figma
      </a>
    </motion.div>
  )
}
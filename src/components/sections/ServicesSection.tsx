import { AnimatePresence, motion, type Variants } from "framer-motion"
import {
  CheckCircle2,
  Code2,
  Gauge,
  Globe,
  Layers3,
  MonitorSmartphone,
  Palette,
} from "lucide-react"
import { useMemo } from "react"
import { FaWordpress } from "react-icons/fa"

import styles from "./ServicesSection.module.scss"

type ServiceItem = {
  title: string;
  text: string;
  icon?: string;
  features?: string[];
  tags?: string[];
};

type ServicesSectionProps = {
  t: {
    nav?: { services?: string };
    services: {
      title: string;
      desc: string;
      items: ServiceItem[];
    };
  };
};

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

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
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: smoothEase },
  },
};

function normalize(value: string = "") {
  return String(value).toLowerCase().trim();
}

// ==================== THEME & ICON FUNCTIONS ====================
function getServiceTheme(icon = "", title = "") {
  const key = normalize(icon || title);
  if (key.includes("react") || key.includes("code") || key.includes("dev")) return "development";
  if (key.includes("ui") || key.includes("ux") || key.includes("design") || key.includes("palette")) return "uiux";
  if (key.includes("responsive") || key.includes("mobile") || key.includes("device")) return "responsive";
  if (key.includes("optimization") || key.includes("performance")) return "optimization";
  if (key.includes("wordpress") || key.includes("wp")) return "wordpress";
  if (key.includes("lang") || key.includes("multi") || key.includes("globe") || key.includes("i18n")) return "multilang";
  return "default";
}

function getServiceMainIcon(icon = "", title = "") {
  const key = normalize(icon || title);
  if (key.includes("react") || key.includes("development") || key.includes("code")) return Code2;
  if (key.includes("ui") || key.includes("ux") || key.includes("design") || key.includes("palette")) return Palette;
  if (key.includes("responsive") || key.includes("mobile") || key.includes("device")) return MonitorSmartphone;
  if (key.includes("optimization") || key.includes("performance")) return Gauge;
  if (key.includes("lang") || key.includes("multi") || key.includes("globe") || key.includes("i18n")) return Globe;
  if (key.includes("wordpress") || key.includes("wp")) return FaWordpress;
  return Layers3;
}

function getServiceAccentIcon(icon = "") {
  const key = normalize(icon);
  if (key.includes("react") || key.includes("code") || key.includes("dev")) return Code2;
  if (key.includes("ui") || key.includes("ux") || key.includes("design") || key.includes("palette")) return Palette;
  if (key.includes("responsive") || key.includes("mobile") || key.includes("device")) return MonitorSmartphone;
  if (key.includes("wordpress") || key.includes("wp")) return FaWordpress;
  if (key.includes("lang") || key.includes("multi") || key.includes("globe") || key.includes("i18n")) return Globe;
  return Layers3;
}

export default function ServicesSection({ t }: ServicesSectionProps) {
  const sectionLabel = t?.nav?.services ?? "Services";
  const rawItems = t?.services?.items ?? [];

  const items = useMemo<ServiceItem[]>(() => {
    return rawItems.map((item) => ({
      ...item,
      features: item.features || [],
      tags: item.tags || [],
    }));
  }, [rawItems]);

  return (
    <motion.section
      className={styles.servicesSection}
      variants={sectionVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className={styles.bgGlowOne} />
      <div className={styles.bgGlowTwo} />
      <div className={styles.topLine} />

      <div className={styles.sectionWatermark} aria-hidden="true">
        <span>{sectionLabel}</span>
      </div>

      <motion.div className={styles.centerContent} variants={itemVariants}>
        <h2 className={styles.title}>{t?.services?.title}</h2>
        <p className={styles.desc}>{t?.services?.desc}</p>
      </motion.div>

      <motion.div className={styles.cardsGrid}>
        <AnimatePresence mode="popLayout">
          {items.map((service, index) => {
            const id = `${service.title}-${index}`;
            const theme = getServiceTheme(service.icon, service.title);
            const MainIcon = getServiceMainIcon(service.icon, service.title);
            const AccentIcon = getServiceAccentIcon(service.icon);

            return (
              <motion.article
                key={id}
                className={`${styles.card} ${styles[theme]}`}
                variants={itemVariants}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15, scale: 0.98 }}
                transition={{ duration: 0.4, ease: smoothEase, delay: index * 0.04 }}
              >
                {/* Background Icon */}
                <div className={styles.backgroundIcon}>
                  <MainIcon size={205} strokeWidth={1.05} />
                </div>

                <div className={styles.cardAccent} />

                <div className={styles.cardTop}>
                  <div className={styles.iconWrap}>
                    <MainIcon size={29} strokeWidth={2.3} />
                  </div>
                  <div className={styles.cardTopRight}>
                    <span className={styles.miniType}>
                      <AccentIcon size={14} />
                      <span>{service.tags?.[0] || "Service"}</span>
                    </span>
                  </div>
                </div>

                <h3 className={styles.cardTitle}>{service.title}</h3>
                <p className={styles.text}>{service.text}</p>

                {service.tags && service.tags.length > 0 && (
                  <div className={styles.featureChips}>
                    {service.tags.slice(0, 3).map((tag, ti) => (
                      <span key={`${id}-tag-${ti}`}>{tag}</span>
                    ))}
                  </div>
                )}

                {service.features && service.features.length > 0 && (
                  <div className={styles.featuresExpanded}>
                    {service.features.map((feature, fi) => (
                      <div className={styles.featureRow} key={fi}>
                        <CheckCircle2 size={13} className={styles.featureCheck} />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                )}
              </motion.article>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </motion.section>
  );
}
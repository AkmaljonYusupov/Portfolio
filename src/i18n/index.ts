import en from "../locales/en.json"
import ru from "../locales/ru.json"
import tr from "../locales/tr.json"
import uz from "../locales/uz.json"

export const translations = {
  uz,
  ru,
  en,
  tr,
} as const

export type LanguageKey = keyof typeof translations
export type Translation = (typeof translations)[LanguageKey]
// Universal Loader Functions
const loadingOverlay = document.getElementById('loadingOverlay')
const spinner = document.getElementById('spinner')
let loaderTimeout = null
let isSlowNetwork = false

function checkNetworkStatus() {
	if ('connection' in navigator) {
		const connection = navigator.connection
		const effectiveType = connection.effectiveType || '4g'
		isSlowNetwork = ['slow-2g', '2g'].includes(effectiveType)
		if (isSlowNetwork) {
			spinner.classList.add('slow-network')
		} else {
			spinner.classList.remove('slow-network')
		}
		return effectiveType
	}
	return 'unknown'
}

function getMinLoaderTime() {
	return isSlowNetwork ? 1000 : 500
}

function showLoader() {
	try {
		if (loadingOverlay) {
			clearTimeout(loaderTimeout)
			checkNetworkStatus()
			loadingOverlay.classList.remove('hidden')
			loadingOverlay.style.opacity = '1'
		}
	} catch (error) {
		console.error('showLoader xatosi:', error)
	}
}

function hideLoader() {
	try {
		if (loadingOverlay) {
			const minLoaderTime = getMinLoaderTime()
			loaderTimeout = setTimeout(() => {
				loadingOverlay.style.opacity = '0'
				setTimeout(() => {
					loadingOverlay.classList.add('hidden')
				}, 500)
			}, minLoaderTime)
		}
	} catch (error) {
		console.error('hideLoader xatosi:', error)
	}
}

showLoader()

window.addEventListener('load', () => {
	const loadTime = Date.now() - performance.timing.navigationStart
	const minLoaderTime = getMinLoaderTime()
	const minDelay = loadTime < minLoaderTime ? minLoaderTime - loadTime : 0
	setTimeout(() => {
		hideLoader()
		renderFooter()
	}, minDelay)
})

if ('connection' in navigator) {
	navigator.connection.addEventListener('change', () => {
		checkNetworkStatus()
	})
}

function showSection(sectionId) {
	try {
		// Content sections
		document
			.querySelectorAll('.section')
			.forEach(section => section.classList.remove('active'))
		const section = document.getElementById(sectionId)
		if (section) section.classList.add('active')
		else console.error(`Bo‘lim topilmadi: ${sectionId}`)

		// Sidebar menu active class
		document
			.querySelectorAll('.sidebar nav a')
			.forEach(link => link.classList.remove('active'))
		const activeLink = document.querySelector(
			`.sidebar nav a[data-section="${sectionId}"]`
		)
		if (activeLink) activeLink.classList.add('active')

		// Save to localStorage
		localStorage.setItem('activeMenu', sectionId)

		if (window.innerWidth <= 768) toggleSidebar()
	} catch (error) {
		console.error('showSection xatosi:', error)
	}
}

function toggleDropdown() {
	try {
		const dropdownMenu = document.getElementById('dropdownMenu')
		if (dropdownMenu) {
			dropdownMenu.classList.toggle('show')
			dropdownMenu.classList.toggle('hidden')
		} else {
			console.error('Dropdown menyusi topilmadi!')
		}
	} catch (error) {
		console.error('toggleDropdown xatosi:', error)
	}
}

document.addEventListener('click', function (event) {
	const dropdown = document.getElementById('languageDropdown')
	const dropdownMenu = document.getElementById('dropdownMenu')
	if (
		dropdown &&
		dropdownMenu &&
		!dropdown.contains(event.target) &&
		!dropdownMenu.contains(event.target)
	) {
		dropdownMenu.classList.remove('show')
		dropdownMenu.classList.add('hidden')
	}
})

const translations = {
	uz: {
		select_language: 'Uzbekcha',
		flag_url: 'https://flagcdn.com/uz.svg',
		profile_name: 'Akmaljon Yusupov',
		home: 'Bosh sahifa',
		home_text:
			'Men Akmaljon Yusupov, Front-end dasturchiman. Zamonaviy va foydalanuvchi uchun qulay veb-saytlar yaratishda 3 yildan ortiq tajribam bor. Mening portfolio saytimga xush kelibsiz!',
		about: 'Men haqimda',
		about_text:
			'Ismim Akmaljon Yusupov. Men 1998-yilda tug‘ilganman va hozirda Namangan viloyati Uychida tumanida yashayman. 2020-yildan beri Front-end dasturchi sifatida faoliyat yuritaman. HTML, CSS, JavaScript va Bootstrap kabi texnologiyalarda tajribam bor. Mijozlar uchun qulay va zamonaviy veb-saytlar yaratishni yaxshi ko‘raman.',
		skills: 'Ko‘nikmalar',
		portfolio: 'Loyihalar',
		portfolio_item1: 'E-commerce sayti',
		portfolio_item1_desc:
			'HTML, CSS va JavaScript yordamida yaratilgan onlayn do‘kon sayti.',
		portfolio_item2: 'Portfolio sayti',
		portfolio_item2_desc:
			'Bootstrap yordamida yaratilgan shaxsiy portfolio sayti.',
		portfolio_item3: 'Blog platformasi',
		portfolio_item3_desc: 'JavaScript va CSS yordamida yaratilgan blog sayti.',
		blog: 'Blog',
		blog_item1: 'CSS Grid haqida',
		blog_item1_desc:
			'CSS Grid yordamida responsiv dizayn yaratish bo‘yicha qo‘llanma.',
		blog_item2: 'JavaScript Asinxronlik',
		blog_item2_desc:
			"JavaScript’da async/await va Promise’lar haqida ma'lumot.",
		contact: 'Aloqa',
		contact_info_title: "Kontakt ma'lumotlari",
		contact_info_text:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.',
		contact_phone: 'Telefon',
		contact_telegram: 'Telegram',
		contact_email: 'Email',
		form_full_name: 'Ism va familiya',
		form_phone: 'Telefon raqam',
		form_telegram: 'Telegram username',
		form_message: 'Xabar',
		form_submit: 'Yuborish',
		toast_language_changed: 'Til o‘zgartirildi: O‘zbekcha',
		toast_message: 'Xabar yuborildi! Tez orada javob beraman.',
		error_full_name: 'Iltimos, ism va familiyani kiriting!',
		error_phone: 'Iltimos, telefon raqamini to‘liq kiriting!',
		error_telegram: 'Iltimos, Telegram username kiriting!',
		error_message: 'Iltimos, xabar yozing!',
		placeholder_full_name: 'Ismingiz va familiyangiz',
		placeholder_telegram: '@username',
		placeholder_message: 'Xabaringizni yozing',
		placeholder_phone: '(90)-123-45-67',
		tooltip_facebook: 'Facebook',
		tooltip_instagram: 'Instagram',
		tooltip_github: 'GitHub',
		tooltip_linkedin: 'LinkedIn',
		tooltip_contact_facebook: 'Facebook',
		tooltip_contact_instagram: 'Instagram',
		tooltip_contact_linkedin: 'LinkedIn',
		copyright: '2025',
	},
	ru: {
		select_language: 'Ruscha',
		flag_url: 'https://flagcdn.com/ru.svg',
		profile_name: 'Akmaljon Yusupov',
		home: 'Главная',
		home_text:
			'Я Акмалжон Юсупов, Front-end разработчик. У меня более 3 лет опыта в создании современных и удобных веб-сайтов. Добро пожаловать на мой сайт-портфолио!',
		about: 'О себе',
		about_text:
			'Меня зовут Акмалжон Юсупов. Я родился в 1995 году и сейчас живу в Ташкенте. С 2020 года работаю Front-end разработчиком. Имею опыт работы с HTML, CSS, JavaScript и Bootstrap. Люблю создавать удобные и современные веб-сайты для клиентов.',
		skills: 'Навыки',
		portfolio: 'Портфолио',
		portfolio_item1: 'Сайт электронной коммерции',
		portfolio_item1_desc:
			'Онлайн-магазин, созданный с использованием HTML, CSS и JavaScript.',
		portfolio_item2: 'Сайт-портфолио',
		portfolio_item2_desc: 'Личное портфолио, созданное с помощью Bootstrap.',
		portfolio_item3: 'Блог-платформа',
		portfolio_item3_desc:
			'Блог-сайт, созданный с использованием JavaScript и CSS.',
		blog: 'Блог',
		blog_item1: 'О CSS Grid',
		blog_item1_desc:
			'Руководство по созданию адаптивного дизайна с помощью CSS Grid.',
		blog_item2: 'Асинхронность в JavaScript',
		blog_item2_desc: 'Информация о async/await и Promise в JavaScript.',
		contact: 'Контакты',
		contact_info_title: 'Контактная информация',
		contact_info_text:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.',
		contact_phone: 'Телефон',
		contact_telegram: 'Telegram',
		contact_email: 'Email',
		form_full_name: 'Имя и фамилия',
		form_phone: 'Номер телефона',
		form_telegram: 'Имя пользователя Telegram',
		form_message: 'Сообщение',
		form_submit: 'Отправить',
		toast_language_changed: 'Язык изменён: Русский',
		toast_message: 'Сообщение отправлено! Скоро отвечу.',
		error_full_name: 'Пожалуйста, введите имя и фамилию!',
		error_phone: 'Пожалуйста, введите полный номер телефона!',
		error_telegram: 'Пожалуйста, введите имя пользователя Telegram!',
		error_message: 'Пожалуйста, напишите сообщение!',
		placeholder_full_name: 'Ваше имя и фамилия',
		placeholder_telegram: '@имя_пользователя',
		placeholder_message: 'Напишите ваше сообщение',
		placeholder_phone: '(495)-123-45-67',
		tooltip_facebook: 'Facebook',
		tooltip_instagram: 'Instagram',
		tooltip_github: 'GitHub',
		tooltip_linkedin: 'LinkedIn',
		tooltip_contact_facebook: 'Facebook',
		tooltip_contact_instagram: 'Instagram',
		tooltip_contact_linkedin: 'LinkedIn',
		copyright: '2025',
	},
	en: {
		select_language: 'Inglizcha',
		flag_url: 'https://flagcdn.com/gb.svg',
		profile_name: 'Akmaljon Yusupov',
		home: 'Home',
		home_text:
			'I am Akmaljon Yusupov, a Front-end developer. I have over 3 years of experience in creating modern and user-friendly websites. Welcome to my portfolio site!',
		about: 'About',
		about_text:
			'My name is Akmaljon Yusupov. I was born in 1995 and currently live in Tashkent. Since 2020, I have been working as a Front-end developer. I have experience with HTML, CSS, JavaScript, and Bootstrap. I love creating user-friendly and modern websites for clients.',
		skills: 'Skills',
		portfolio: 'Portfolio',
		portfolio_item1: 'E-commerce Website',
		portfolio_item1_desc:
			'An online store built using HTML, CSS, and JavaScript.',
		portfolio_item2: 'Portfolio Website',
		portfolio_item2_desc: 'A personal portfolio built using Bootstrap.',
		portfolio_item3: 'Blog Platform',
		portfolio_item3_desc: 'A blog site built using JavaScript and CSS.',
		blog: 'Blog',
		blog_item1: 'About CSS Grid',
		blog_item1_desc: 'A guide to creating responsive designs using CSS Grid.',
		blog_item2: 'JavaScript Asynchronicity',
		blog_item2_desc:
			'Information about async/await and Promises in JavaScript.',
		contact: 'Contact',
		contact_info_title: 'Contact Information',
		contact_info_text:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.',
		contact_phone: 'Phone',
		contact_telegram: 'Telegram',
		contact_email: 'Email',
		form_full_name: 'Full Name',
		form_phone: 'Phone Number',
		form_telegram: 'Telegram Username',
		form_message: 'Message',
		form_submit: 'Submit',
		toast_language_changed: 'Language changed: English',
		toast_message: 'Message sent! I will respond soon.',
		error_full_name: 'Please enter your full name!',
		error_phone: 'Please enter a complete phone number!',
		error_telegram: 'Please enter a Telegram username!',
		error_message: 'Please write a message!',
		placeholder_full_name: 'Your full name',
		placeholder_telegram: '@username',
		placeholder_message: 'Write your message',
		placeholder_phone: '(212)-123-4567',
		tooltip_facebook: 'Facebook',
		tooltip_instagram: 'Instagram',
		tooltip_github: 'GitHub',
		tooltip_linkedin: 'LinkedIn',
		tooltip_contact_facebook: 'Facebook',
		tooltip_contact_instagram: 'Instagram',
		tooltip_contact_linkedin: 'LinkedIn',
		copyright: '2025',
	},
	tr: {
		select_language: 'Türkçe',
		flag_url: 'https://flagcdn.com/tr.svg',
		profile_name: 'Akmaljon Yusupov',
		home: 'Ana Sayfa',
		home_text:
			'Ben Akmaljon Yusupov, Front-end geliştiricisiyim. Modern ve kullanıcı dostu web siteleri oluşturma konusunda 3 yıldan fazla tecrübem var. Portföy siteme hoş geldiniz!',
		about: 'Hakkımda',
		about_text:
			'Adım Akmaljon Yusupov. 1995 yılında doğdum ve şu anda Taşkent’te yaşıyorum. 2020 yılından beri Front-end geliştirici olarak çalışıyorum. HTML, CSS, JavaScript ve Bootstrap gibi teknolojilerde deneyimim var. Müşteriler için kullanıcı dostu ve modern web siteleri oluşturmayı seviyorum.',
		skills: 'Yetenekler',
		portfolio: 'Portföy',
		portfolio_item1: 'E-ticaret Sitesi',
		portfolio_item1_desc:
			'HTML, CSS ve JavaScript kullanılarak oluşturulmuş bir çevrimiçi mağaza sitesi.',
		portfolio_item2: 'Portföy Sitesi',
		portfolio_item2_desc:
			'Bootstrap kullanılarak oluşturulmuş kişisel bir portföy sitesi.',
		portfolio_item3: 'Blog Platformu',
		portfolio_item3_desc:
			'JavaScript ve CSS kullanılarak oluşturulmuş bir blog sitesi.',
		blog: 'Blog',
		blog_item1: 'CSS Grid Hakkında',
		blog_item1_desc:
			'CSS Grid kullanarak duyarlı tasarımlar oluşturma rehberi.',
		blog_item2: 'JavaScript Asenkronluk',
		blog_item2_desc: 'JavaScript’te async/await ve Promise’lar hakkında bilgi.',
		contact: 'İletişim',
		contact_info_title: 'İletişim Bilgileri',
		contact_info_text:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.',
		contact_phone: 'Telefon',
		contact_telegram: 'Telegram',
		contact_email: 'E-posta',
		form_full_name: 'Ad ve Soyad',
		form_phone: 'Telefon Numarası',
		form_telegram: 'Telegram Kullanıcı Adı',
		form_message: 'Mesaj',
		form_submit: 'Gönder',
		toast_language_changed: 'Dil değiştirildi: Türkçe',
		toast_message: 'Mesaj gönderildi! Yakında cevap vereceğim.',
		error_full_name: 'Lütfen adınızı ve soyadınızı girin!',
		error_phone: 'Lütfen tam bir telefon numarası girin!',
		error_telegram: 'Lütfen Telegram kullanıcı adınızı girin!',
		error_message: 'Lütfen bir mesaj yazın!',
		placeholder_full_name: 'Adınız ve soyadınız',
		placeholder_telegram: '@kullaniciadi',
		placeholder_message: 'Mesajınızı yazın',
		placeholder_phone: '(212)-123-4567',
		tooltip_facebook: 'Facebook',
		tooltip_instagram: 'Instagram',
		tooltip_github: 'GitHub',
		tooltip_linkedin: 'LinkedIn',
		tooltip_contact_facebook: 'Facebook',
		tooltip_contact_instagram: 'Instagram',
		tooltip_contact_linkedin: 'LinkedIn',
		copyright: '2025',
	},
}

// Telefon raqami maskasi
const phoneInput = document.getElementById('phone')
let currentPrefix = '+998'
let mask
if (typeof IMask !== 'undefined') {
	mask = IMask(phoneInput, {
		mask: '(##)-###-##-##',
		lazy: false,
		placeholderChar: '#',
		overwrite: true,
		autofix: true,
		blocks: {
			'#': {
				mask: IMask.MaskedRange,
				from: 0,
				to: 9,
			},
		},
	})
}

// Telefon prefiksini o‘zgartirish
function setPhonePrefix(prefix) {
	if (typeof IMask === 'undefined') return
	currentPrefix = prefix
	document.getElementById('phonePrefixDropdown').textContent = prefix

	let maskPattern
	let placeholder
	if (prefix === '+998') {
		maskPattern = '(##)-###-##-##'
		placeholder = '(90)-123-45-67'
	} else if (prefix === '+7') {
		maskPattern = '(###)-###-##-##'
		placeholder = '(495)-123-45-67'
	} else if (prefix === '+1' || prefix === '+90') {
		maskPattern = '(###)-###-####'
		placeholder = '(212)-123-4567'
	}

	mask.updateOptions({ mask: maskPattern })
	phoneInput.placeholder = placeholder
	phoneInput.value = ''
	mask.updateValue()
	checkFormValidity()
}

// Telegram input filtrlash
const telegramInput = document.getElementById('telegram')
telegramInput.addEventListener('input', function () {
	let value = telegramInput.value.replace(/^@+/, '')
	if (!value.startsWith('@')) value = '@' + value
	telegramInput.value = value.replace(/[^a-zA-Z0-9_@]/g, '')
	checkFormValidity()
})

// Xabar uzunligi hisoblagichi
const messageInput = document.getElementById('message')
const charCount = document.getElementById('message-char-count')
const maxLength = 500

messageInput.addEventListener('input', function () {
	const remaining = maxLength - messageInput.value.length
	charCount.textContent = `${remaining} belgi qoldi`
	if (remaining < 50) {
		charCount.classList.add('warning')
	} else {
		charCount.classList.remove('warning')
	}
	checkFormValidity()
})

// Forma to‘ldirilganligini tekshirish
function checkFormValidity() {
	const fullName = document.getElementById('full_name').value.trim()
	const phone = mask
		? mask.unmaskedValue
		: phoneInput.value.replace(/[^0-9]/g, '')
	const telegram = telegramInput.value.trim()
	const message = messageInput.value.trim()
	const submitBtn = document.getElementById('form-submit')

	let isPhoneValid = false
	if (currentPrefix === '+998') {
		isPhoneValid = phone.length === 9
	} else if (
		currentPrefix === '+7' ||
		currentPrefix === '+1' ||
		currentPrefix === '+90'
	) {
		isPhoneValid = phone.length === 10
	}

	const isValid = fullName && isPhoneValid && telegram.length >= 2 && message

	console.log('Form Validation:', {
		fullName: !!fullName,
		phone: phone,
		isPhoneValid,
		telegram: telegram.length >= 2,
		message: !!message,
		isValid,
	})

	submitBtn.disabled = !isValid
}

// Forma maydonlarini real vaqtda tekshirish
document
	.getElementById('full_name')
	.addEventListener('input', checkFormValidity)
phoneInput.addEventListener('input', checkFormValidity)
telegramInput.addEventListener('input', checkFormValidity)
messageInput.addEventListener('input', checkFormValidity)

// Notifikatsiya funksiyasi
function showError(message) {
	if (typeof Toastify === 'undefined') {
		alert(message)
		return
	}
	Toastify({
		text: message,
		duration: 3000,
		gravity: 'top',
		position: 'right',
		style: { background: '#dc3545' },
	}).showToast()
}

// Avatar animatsiyasi
const avatarInner = document.querySelector('.avatar-inner')
let isRotating = false

function rotateAvatar() {
	if (!isRotating) {
		isRotating = true
		avatarInner.style.transition = 'transform 0.6s ease'
		avatarInner.style.transform = 'rotateY(360deg)'
		setTimeout(() => {
			avatarInner.style.transition = 'none'
			avatarInner.style.transform = 'rotateY(0deg)'
			isRotating = false
		}, 600)
	}
}

setInterval(rotateAvatar, 30000)
rotateAvatar()

const avatarContainer = document.querySelector('.avatar-container')
avatarContainer.addEventListener('mouseleave', () => {
	avatarInner.style.transition = 'none'
	avatarInner.style.transform = 'rotateY(0deg)'
})

// Footer rendersi
function renderFooter(lang = 'uz') {
	try {
		const footerInfo = document.getElementById('footer-info')
		const now = new Date()
		let dateFormat
		let copyright = '2025'

		if (translations[lang] && translations[lang].copyright) {
			copyright = translations[lang].copyright
		}

		if (lang === 'en') {
			const month = String(now.getMonth() + 1).padStart(2, '0')
			const day = String(now.getDate()).padStart(2, '0')
			const year = now.getFullYear()
			dateFormat = `${month}.${day}.${year}`
		} else {
			const day = String(now.getDate()).padStart(2, '0')
			const month = String(now.getMonth() + 1).padStart(2, '0')
			const year = now.getFullYear()
			dateFormat = `${day}.${month}.${year}`
		}

		const hours = String(now.getHours()).padStart(2, '0')
		const minutes = String(now.getMinutes()).padStart(2, '0')
		const seconds = String(now.getSeconds()).padStart(2, '0')
		const timeFormat = `${hours}:${minutes}:${seconds}`

		footerInfo.innerHTML = `
          <p>© ${copyright}</p>
          <p>${dateFormat}</p>
          <p>${timeFormat}</p>
        `
	} catch (error) {
		console.error('renderFooter xatosi:', error)
		const footerInfo = document.getElementById('footer-info')
		const now = new Date()
		const day = String(now.getDate()).padStart(2, '0')
		const month = String(now.getMonth() + 1).padStart(2, '0')
		const year = now.getFullYear()
		const hours = String(now.getHours()).padStart(2, '0')
		const minutes = String(now.getMinutes()).padStart(2, '0')
		const seconds = String(now.getSeconds()).padStart(2, '0')
		footerInfo.innerHTML = `
          <p>© 2025</p>
          <p>${day}.${month}.${year}</p>
          <p>${hours}:${minutes}:${seconds}</p>
        `
	}
}

// Vaqtni har soniyada yangilash
function updateDateTime() {
	const lang = document.documentElement.lang || 'uz'
	renderFooter(lang)
}

setInterval(updateDateTime, 1000)
renderFooter()

// Til o‘zgartirish
function changeLanguage(lang, event) {
	if (event) event.preventDefault() // Sahifa skrollini to‘xtatish
	try {
		const sidebar = document.getElementById('sidebar')
		const scrollPosition = sidebar.scrollTop // Joriy skroll pozitsiyasini saqlash

		document.documentElement.lang = lang
		const languageDisplay = translations[lang].select_language
		const flagUrl = translations[lang].flag_url
		document.getElementById('languageDropdown').innerHTML = `
          <img src="${flagUrl}" class="flag-icon" alt="${languageDisplay} Flag">
          <span class="nav-text">${languageDisplay}</span>
        `
		document.getElementById('profile-name').textContent =
			translations[lang].profile_name
		document.getElementById('nav-home').textContent = translations[lang].home
		document.getElementById('nav-about').textContent = translations[lang].about
		document.getElementById('nav-skills').textContent =
			translations[lang].skills
		document.getElementById('nav-portfolio').textContent =
			translations[lang].portfolio
		document.getElementById('nav-blog').textContent = translations[lang].blog
		document.getElementById('nav-contact').textContent =
			translations[lang].contact
		document.getElementById('home-title').textContent = translations[lang].home
		document.getElementById('home-text').textContent =
			translations[lang].home_text
		document.getElementById('about-title').textContent =
			translations[lang].about
		document.getElementById('about-text').textContent =
			translations[lang].about_text
		document.getElementById('skills-title').textContent =
			translations[lang].skills
		document.getElementById('portfolio-title').textContent =
			translations[lang].portfolio
		document.getElementById('portfolio-item1-title').textContent =
			translations[lang].portfolio_item1
		document.getElementById('portfolio-item1-desc').textContent =
			translations[lang].portfolio_item1_desc
		document.getElementById('portfolio-item2-title').textContent =
			translations[lang].portfolio_item2
		document.getElementById('portfolio-item2-desc').textContent =
			translations[lang].portfolio_item2_desc
		document.getElementById('portfolio-item3-title').textContent =
			translations[lang].portfolio_item3
		document.getElementById('portfolio-item3-desc').textContent =
			translations[lang].portfolio_item3_desc
		document.getElementById('blog-title').textContent = translations[lang].blog
		document.getElementById('blog-item1-title').textContent =
			translations[lang].blog_item1
		document.getElementById('blog-item1-desc').textContent =
			translations[lang].blog_item1_desc
		document.getElementById('blog-item2-title').textContent =
			translations[lang].blog_item2
		document.getElementById('blog-item2-desc').textContent =
			translations[lang].blog_item2_desc
		document.getElementById('contact-title').textContent =
			translations[lang].contact
		document.getElementById('contact-info-title').textContent =
			translations[lang].contact_info_title
		document.getElementById('contact-info-text').textContent =
			translations[lang].contact_info_text
		document.getElementById('contact-phone-label').textContent =
			translations[lang].contact_phone + ':'
		document.getElementById('contact-telegram-label').textContent =
			translations[lang].contact_telegram + ':'
		document.getElementById('contact-email-label').textContent =
			translations[lang].contact_email + ':'
		document.getElementById('form-full-name-label').textContent =
			translations[lang].form_full_name
		document.getElementById('form-phone-label').textContent =
			translations[lang].form_phone
		document.getElementById('form-telegram-label').textContent =
			translations[lang].form_telegram
		document.getElementById('form-message-label').textContent =
			translations[lang].form_message
		document.getElementById(
			'form-submit'
		).innerHTML = `<i class="fas fa-paper-plane"></i> ${translations[lang].form_submit}`
		document.getElementById('full_name').placeholder =
			translations[lang].placeholder_full_name
		document.getElementById('telegram').placeholder =
			translations[lang].placeholder_telegram
		document.getElementById('message').placeholder =
			translations[lang].placeholder_message
		document.getElementById('phone').placeholder =
			translations[lang].placeholder_phone
		document.getElementById('tooltip-facebook').textContent =
			translations[lang].tooltip_facebook
		document.getElementById('tooltip-instagram').textContent =
			translations[lang].tooltip_instagram
		document.getElementById('tooltip-github').textContent =
			translations[lang].tooltip_github
		document.getElementById('tooltip-linkedin').textContent =
			translations[lang].tooltip_linkedin
		document.getElementById('tooltip-contact-facebook').textContent =
			translations[lang].tooltip_contact_facebook
		document.getElementById('tooltip-contact-instagram').textContent =
			translations[lang].tooltip_contact_instagram
		document.getElementById('tooltip-contact-linkedin').textContent =
			translations[lang].tooltip_contact_linkedin

		// Update active class for language
		document
			.querySelectorAll('#dropdownMenu a')
			.forEach(link => link.classList.remove('active'))
		const activeLangLink = document.querySelector(
			`#dropdownMenu a[data-lang="${lang}"]`
		)
		if (activeLangLink) activeLangLink.classList.add('active')

		// Save language to localStorage
		localStorage.setItem('language', lang)

		renderFooter(lang)

		if (typeof Toastify !== 'undefined') {
			Toastify({
				text: translations[lang].toast_language_changed,
				duration: 3000,
				gravity: 'top',
				position: 'right',
				style: { background: '#2563eb' },
			}).showToast()
		}

		document.getElementById('dropdownMenu').classList.remove('show')
		document.getElementById('dropdownMenu').classList.add('hidden')

		// Skroll pozitsiyasini qayta tiklash
		sidebar.scrollTop = scrollPosition

		checkFormValidity()
	} catch (error) {
		console.error('changeLanguage xatosi:', error)
		renderFooter()
	}
}

// Forma yuborish
document.getElementById('contactForm').addEventListener('submit', function (e) {
	e.preventDefault()
	const lang = document.documentElement.lang || 'uz'
	const fullName = document.getElementById('full_name').value.trim()
	let phone = mask
		? mask.unmaskedValue
		: phoneInput.value.replace(/[^0-9]/g, '')
	const telegram = telegramInput.value.trim()
	const message = messageInput.value.trim()
	const submitBtn = document.getElementById('form-submit')

	if (!fullName) {
		showError(translations[lang].error_full_name)
		return
	}

	let isPhoneValid = false
	if (currentPrefix === '+998') {
		isPhoneValid = phone.length === 9
	} else if (
		currentPrefix === '+7' ||
		currentPrefix === '+1' ||
		currentPrefix === '+90'
	) {
		isPhoneValid = phone.length === 10
	}

	if (!isPhoneValid) {
		showError(translations[lang].error_phone)
		return
	}

	if (telegram.length < 2) {
		showError(translations[lang].error_telegram)
		return
	}
	if (!message) {
		showError(translations[lang].error_message)
		return
	}

	// Telefon raqamini mamlakat kodi bilan birlashtirish
	phone = currentPrefix + phone

	submitBtn.disabled = true
	submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm"></span> ${translations[lang].form_submit}`

	showLoader()
	const simulatedRequestTime = isSlowNetwork ? 2000 : 1000
	setTimeout(() => {
		if (typeof Toastify !== 'undefined') {
			Toastify({
				text: translations[lang].toast_message,
				duration: 3000,
				gravity: 'top',
				position: 'right',
				style: { background: '#2563eb' },
			}).showToast()
		} else {
			alert(translations[lang].toast_message)
		}
		this.reset()
		phoneInput.value = ''
		if (mask) mask.updateValue()
		charCount.textContent = `${maxLength} belgi qoldi`
		charCount.classList.remove('warning')
		submitBtn.disabled = true
		submitBtn.innerHTML = `<i class="fas fa-paper-plane"></i> ${translations[lang].form_submit}`
		hideLoader()
	}, simulatedRequestTime)
})

function toggleSidebar() {
	try {
		const sidebar = document.getElementById('sidebar')
		const sidebarOverlay = document.getElementById('sidebarOverlay')
		sidebar.classList.toggle('active')
		sidebarOverlay.classList.toggle('active')
	} catch (error) {
		console.error('toggleSidebar xatosi:', error)
	}
}

// Sahifa yuklanishida localStorage dan holatni tiklash
document.addEventListener('DOMContentLoaded', () => {
	// Restore active menu
	const activeMenu = localStorage.getItem('activeMenu') || 'home'
	showSection(activeMenu)

	// Restore language
	const savedLang = localStorage.getItem('language') || 'en'
	changeLanguage(savedLang)
})

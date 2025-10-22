import type {
  TNavLink,
  TService,
  TTechnology,
  TExperience,
  TTestimonial,
  TProject,
} from "../types";

import {
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  git,
  figma,
  docker,
  noxer,
  logo1,
  project1_1,
  project1_2,
  project1_3,
  project1_4,
  project2_1,
  project2_2,
  project2_3,
  project2_4,
  project3_1,
  project3_2,
} from "../assets";

export const navLinks: TNavLink[] = [
  {
    id: "about",
    title: "Обо мне",
  },
  {
    id: "work",
    title: "Мои работы",
  },
];

const services: TService[] = [
  {
    title: "Frontend Developer",
    icon: web,
  },
];

const technologies: TTechnology[] = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  },
  {
    name: "docker",
    icon: docker,
  },
];

const experiences: TExperience[] = [
	{
		title: "Frontend Developer", 
		companyName: "Web Studio", 
		icon: logo1, 
		iconBg: "#4A4A6A", 
		date: "февраль 2024 - май 2024", 
		points: [
		  "Разработка сайтов \"под ключ\" в составе небольшой команды для клиентов с фриланс-бирж.",
		  "Преобразование дизайн-макетов (Figma, Sketch, PSD) в адаптивные и кросс-браузерные веб-страницы.",
		  "Разработка интерактивных пользовательских интерфейсов с использованием React.js и moduleCSS.",
		  "Взаимодействие с менеджером проекта для уточнения технических заданий и внесения правок."
		],
	 },
	 {
		title: "Frontend Developer",
		companyName: "Noxer",
		icon: noxer,
		iconBg: "black",
		date: "май 2024 - сентябрь 2025",
		points: [
		  "Спроектировал и разработал Telegram Mini App, представляющий собой универсальный маркетплейс.",
		  "Реализовал логику каталога, многоуровневой фильтрации и пользовательской корзины на стороне клиента.",
		  "Интегрировал API умных AI-ассистентов для улучшения пользовательского опыта (UX).",
		  "Разработал с нуля административную панель для управления товарами, заказами и кастомизации интерфейса.",
		  "Обеспечил адаптивность и высокую производительность приложения в среде Telegram."
		]
	 },
];

const testimonials: TTestimonial[] = [
  {
    testimonial:
      "Отличный разработчик! Создал для нас современный и функциональный сайт. Очень ответственный и профессиональный подход к работе.",
    name: "Анна Петрова",
    designation: "Менеджер проекта",
    company: "WebStudio",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "Прекрасная работа с React и TypeScript. Код чистый, производительность отличная. Рекомендую как надежного разработчика.",
    name: "Михаил Иванов",
    designation: "CTO",
    company: "TechCorp",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "После оптимизации нашего сайта трафик вырос на 40%. Очень довольны результатом и скоростью работы!",
    name: "Елена Смирнова",
    designation: "CEO",
    company: "Digital Agency",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const projects: TProject[] = [
  {
    name: "Telegram Mini App",
    description:
      "Один из универсальных маркетплейсов на платформе Telegram для покупки и продажи товаров и услуг",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "MobX",
        color: "green-text-gradient",
      },
      {
        name: "TypeScript",
        color: "pink-text-gradient",
      },
    ],
    images: [project1_1, project1_2, project1_3, project1_4],
    sourceCodeLink: "https://github.com/MaEsTr0oF/Noxerlast",
    sourceCodeLink2: "https://bot-dropshop.ru/webapp/",
  },
  {
    name: "Админ панель",
    description:
      "Административная панель для управления товарами, заказами и кастомизации интерфейса для универсльного маркетплейса telegram mini app",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "RTK Query",
        color: "green-text-gradient",
      },
      {
        name: "CSS Modules",
        color: "pink-text-gradient",
      },
    ],
    images: [project2_1, project2_2, project2_3, project2_4],
    sourceCodeLink: "https://github.com/MaEsTr0oF/AdminPanel",
    sourceCodeLink2: "https://admin.noxer.ru",
  },
  {
	"name": "APKYC",
	"description": "Лендинг АРКУС - цифровая экосистема для автоматизации ЖКХ, включающая биллинговую систему, CRM для диспетчерской и личный кабинет для жителей. Снижает расходы на управление домами до 70% и увеличивает собираемость платежей до 98%",
	"tags": [
	  {
		 "name": "Next.js",
		 "color": "blue-text-gradient"
	  },
	  {
		 "name": "TypeScript", 
		 "color": "green-text-gradient"
	  },
	  {
		 "name": "SCSS",
		 "color": "pink-text-gradient"
	  }
	],
	"images": [project3_1, project3_2],
	"sourceCodeLink": "https://github.com/MaEsTr0oF/APKYC",
	"sourceCodeLink2": "https://apkyc.ru"
 }
];

export { services, technologies, experiences, testimonials, projects };

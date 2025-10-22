type TSection = {
  p: string;
  h2: string;
  content?: string;
};

type TConfig = {
  html: {
    title: string;
    fullName: string;
    email: string;
    telegram: string;
    phone: string;
    hhResume: string;
  };
  hero: {
    name: string;
    p: string[];
  };
  contact: {
    form: {
      name: {
        span: string;
        placeholder: string;
      };
      email: {
        span: string;
        placeholder: string;
      };
      telegram: {
        span: string;
        placeholder: string;
      };
      contactMethod: {
        span: string;
        options: {
          email: string;
          telegram: string;
        };
      };
      message: {
        span: string;
        placeholder: string;
      };
    };
  } & TSection;
  sections: {
    about: Required<TSection>;
    experience: TSection;
    feedbacks: TSection;
    works: Required<TSection>;
  };
};

export const config: TConfig = {
  html: {
    title: "Хвальчев Сергей — Frontend Developer | React, TypeScript, Three.js, Redux",
    fullName: "Хвальчев Сергей",
    email: "skhvalchev@gmail.com",
    telegram: "@s_hvalchev",
    phone: "+7 (980) 629-97-88",
    hhResume: "https://hh.ru/resume/2b720e2eff0c40ab150039ed1f47713255585a",
  },
  hero: {
    name: "Хвальчев Сергей",
    p: ["Я разрабатываю Маркетплейсы, пользовательские", "интерфейсы и веб-приложения"],
  },
  contact: {
    p: "Свяжитесь со мной",
    h2: "Контакты.",
    form: {
      name: {
        span: "Ваше имя (как к вам обращаться)",
        placeholder: "Как вас зовут?",
      },
      email: { 
        span: "Email адрес", 
        placeholder: "your-email@example.com" 
      },
      telegram: { 
        span: "Telegram", 
        placeholder: "@username или номер телефона" 
      },
      contactMethod: {
        span: "Предпочитаемый способ связи",
        options: {
          email: "Email",
          telegram: "Telegram"
        }
      },
      message: {
        span: "Ваше сообщение",
        placeholder: "Что вы хотите сказать?",
      },
    },
  },
  sections: {
    about: {
      p: "Введение",
      h2: "Обо мне.",
      content: `Я являюсь разработчиком с опытом в TypeScript и JavaScript, а также в фреймворках React, Node.js и Three.js. Я быстро обучаюсь и сотрудничаю с клиентами для создания эффективных, масштабируемых и удобных решений, которые решают реальные проблемы. Давайте работать вместе, чтобы воплотить ваши идеи в жизнь!`,
    },
    experience: {
      p: " ",
      h2: "Опыт работы",
    },
    feedbacks: {
      p: "Отзывы",
      h2: "Отзывы.",
    },
    works: {
      p: "Мои работы",
      h2: "Мои работы.",
      content: `Следующие проекты демонстрируют мои навыки и опыт через реальные примеры моей работы. Каждый проект кратко описан с ссылками на репозитории кода и демо-версии. Он отражает мою способность решать сложные проблемы, работать с различными технологиями.`,
    },
  },
};

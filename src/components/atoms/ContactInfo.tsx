import { motion } from "framer-motion";
import { config } from "../../constants/config";

const ContactInfo = () => {
  const contacts = [
    {
      icon: "📧",
      label: "Email",
      value: config.html.email,
      link: `mailto:${config.html.email}`,
      color: "text-blue-400"
    },
    {
      icon: "📱",
      label: "Telegram",
      value: config.html.telegram,
      link: `https://t.me/s_hvalchev`,
      color: "text-blue-300"
    },
    {
      icon: "📞",
      label: "Телефон",
      value: config.html.phone,
      link: `tel:${config.html.phone.replace(/\s/g, '')}`,
      color: "text-green-400"
    },
    {
      icon: "💼",
      label: "Резюме на HH",
      value: "Посмотреть резюме",
      link: config.html.hhResume,
      color: "text-orange-400"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 relative z-10">
      {contacts.map((contact, index) => (
        <motion.a
          key={contact.label}
          href={contact.link}
          target={contact.link.startsWith('http') ? '_blank' : undefined}
          rel={contact.link.startsWith('http') ? 'noopener noreferrer' : undefined}
          className="bg-black-100 p-6 rounded-xl border border-gray-800 hover:border-gray-700 transition-all duration-300 hover:scale-105 relative z-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center space-x-4">
            <div className="text-2xl">{contact.icon}</div>
            <div className="flex-1">
              <h3 className="text-white font-semibold text-lg mb-1">
                {contact.label}
              </h3>
              <p className={`${contact.color} font-medium`}>
                {contact.value}
              </p>
            </div>
            <div className="text-gray-400">
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                />
              </svg>
            </div>
          </div>
        </motion.a>
      ))}
    </div>
  );
};

export default ContactInfo;

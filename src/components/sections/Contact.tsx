import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { EarthCanvas } from "../canvas";
import { SectionWrapper } from "../../hoc";
import { slideIn } from "../../utils/motion";
import { config } from "../../constants/config";
import Header from "../atoms/Header";
import ContactInfo from "../atoms/ContactInfo";

const INITIAL_STATE = Object.fromEntries(
  Object.keys(config.contact.form).map((input) => [input, ""])
);

const emailjsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || import.meta.env.EMAILJS_SERVICE_ID || "service_xxxxxxx",
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || import.meta.env.EMAILJS_TEMPLATE_ID || "template_xxxxxxx", 
  accessToken: import.meta.env.VITE_EMAILJS_ACCESS_TOKEN || import.meta.env.EMAILJS_ACCESS_TOKEN || "xxxxxxxxxxxxxxx",
};

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateTelegram = (telegram: string): boolean => {
  const telegramRegex = /^(@[a-zA-Z0-9_]{5,32}|(\+?[1-9]\d{1,14}))$/;
  return telegramRegex.test(telegram.trim());
};

const validateForm = (form: any): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (!form.name || form.name.trim().length < 2) {
    errors.push("Имя должно содержать минимум 2 символа");
  }
  
  if (!form.contactMethod) {
    errors.push("Выберите предпочитаемый способ связи");
  }
  
  if (form.contactMethod === 'email') {
    if (!form.email || !validateEmail(form.email)) {
      errors.push("Пожалуйста, введите корректный email адрес");
    }
  } else if (form.contactMethod === 'telegram') {
    if (!form.telegram || !validateTelegram(form.telegram)) {
      errors.push("Пожалуйста, введите корректный Telegram (@username или номер телефона)");
    }
  }
  
  if (!form.message || form.message.trim().length === 0) {
    errors.push("Сообщение не может быть пустым");
  } else if (form.message.trim().length > 1000) {
    errors.push("Сообщение не должно превышать 1000 символов");
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState(INITIAL_STATE);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | undefined
  ) => {
    if (e === undefined) return;
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    if (errors.length > 0) {
      setErrors([]);
    }
    if (success) {
      setSuccess(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement> | undefined) => {
    if (e === undefined) return;
    e.preventDefault();
    
    const validation = validateForm(form);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
    
    setLoading(true);
    setErrors([]);
    setSuccess(false);

    const contactInfo = form.contactMethod === 'email' 
      ? `Email: ${form.email}` 
      : `Telegram: ${form.telegram}`;

    emailjs
      .send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        {
          form_name: form.name,
          to_name: config.html.fullName,
          from_email: form.contactMethod === 'email' ? form.email : 'telegram@contact',
          to_email: config.html.email,
          message: form.message,
          contact_method: form.contactMethod,
          contact_info: contactInfo,
          reply_to: form.contactMethod === 'email' ? form.email : 'no-reply@telegram',
        },
        emailjsConfig.accessToken
      )
      .then(
        () => {
          setLoading(false);
          setSuccess(true);
          setForm(INITIAL_STATE);
          
          setTimeout(() => {
            setSuccess(false);
          }, 5000);
        },
        () => {
          setLoading(false);
          setErrors(["Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте еще раз."]);
        }
      );
  };

  return (
    <div className="flex flex-col gap-16">
      <motion.div
        variants={slideIn("up", "tween", 0.2, 1)}
        className="bg-black-100 rounded-2xl p-8 relative z-10"
      >
        <Header useMotion={false} {...config.contact} />
        <div className="mt-8">
          <h3 className="text-white text-xl font-semibold mb-6">
            Свяжитесь со мной удобным способом:
          </h3>
          <ContactInfo />
        </div>
      </motion.div>

      <div
        className={`flex flex-col-reverse gap-10 overflow-hidden xl:mt-12 xl:flex-row`}
      >
        <motion.div
          variants={slideIn("left", "tween", 0.2, 1)}
          className="bg-black-100 flex-[0.75] rounded-2xl p-8 relative z-10"
        >
          <div className="mb-8">
            <h3 className="text-white text-xl font-semibold mb-2">
              Или отправьте сообщение:
            </h3>
            <p className="text-gray-400 text-sm">
              Заполните форму ниже, и я свяжусь с вами в ближайшее время
            </p>
          </div>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-12 flex flex-col gap-8"
        >
          {errors.length > 0 && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
              <ul className="text-red-400 text-sm space-y-1">
                {errors.map((error, index) => (
                  <li key={index}>• {error}</li>
                ))}
              </ul>
            </div>
          )}

          {success && (
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
              <p className="text-green-400 text-sm">
                ✅ Спасибо! Ваше сообщение отправлено. Я свяжусь с вами в ближайшее время.
              </p>
            </div>
          )}

          <label className="flex flex-col">
            <span className="mb-4 font-medium text-white">
              {config.contact.form.name.span} <span className="text-red-400">*</span>
            </span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder={config.contact.form.name.placeholder}
              className="bg-tertiary placeholder:text-secondary rounded-lg border-none px-6 py-4 font-medium text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              disabled={loading}
              required
            />
          </label>

          <label className="flex flex-col">
            <span className="mb-4 font-medium text-white">
              {config.contact.form.contactMethod.span} <span className="text-red-400">*</span>
            </span>
            <select
              name="contactMethod"
              value={form.contactMethod}
              onChange={handleChange}
              className="bg-tertiary rounded-lg border-none px-6 py-4 font-medium text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              disabled={loading}
              required
            >
              <option value="">Выберите способ связи</option>
              <option value="email">{config.contact.form.contactMethod.options.email}</option>
              <option value="telegram">{config.contact.form.contactMethod.options.telegram}</option>
            </select>
          </label>

          {form.contactMethod === 'email' && (
            <label className="flex flex-col">
              <span className="mb-4 font-medium text-white">
                {config.contact.form.email.span} <span className="text-red-400">*</span>
              </span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder={config.contact.form.email.placeholder}
                className="bg-tertiary placeholder:text-secondary rounded-lg border-none px-6 py-4 font-medium text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                disabled={loading}
                required
              />
            </label>
          )}

          {form.contactMethod === 'telegram' && (
            <label className="flex flex-col">
              <span className="mb-4 font-medium text-white">
                {config.contact.form.telegram.span} <span className="text-red-400">*</span>
              </span>
              <input
                type="text"
                name="telegram"
                value={form.telegram}
                onChange={handleChange}
                placeholder={config.contact.form.telegram.placeholder}
                className="bg-tertiary placeholder:text-secondary rounded-lg border-none px-6 py-4 font-medium text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                disabled={loading}
                required
              />
            </label>
          )}

          <label className="flex flex-col">
            <span className="mb-4 font-medium text-white">
              {config.contact.form.message.span} <span className="text-red-400">*</span>
              <span className="text-sm text-gray-400 ml-2">
                ({form.message.length}/1000 символов)
              </span>
            </span>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder={config.contact.form.message.placeholder}
              rows={7}
              maxLength={1000}
              className="bg-tertiary placeholder:text-secondary rounded-lg border-none px-6 py-4 font-medium text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 resize-none"
              disabled={loading}
              required
            />
          </label>
          <button
            type="submit"
            disabled={loading}
            className="bg-tertiary shadow-primary w-fit rounded-xl px-8 py-3 font-bold text-white shadow-md outline-none hover:bg-blue-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Отправка..." : "Отправить"}
          </button>
        </form>
        </motion.div>

        <motion.div
          variants={slideIn("right", "tween", 0.2, 1)}
          className="h-[350px] md:h-[550px] xl:h-auto xl:flex-1"
        >
          <EarthCanvas />
        </motion.div>
      </div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import { styles } from "../../constants/styles";
import { navLinks } from "../../constants";
import { menu, close } from "../../assets";
import { config } from "../../constants/config";

const Navbar = () => {
  const [active, setActive] = useState<string | null>();
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const getNavIcon = (id: string) => {
    switch (id) {
      case "about":
        return "👨";
      case "experience":
        return "💼";
      case "tech":
        return "⚡";
      case "work":
        return "🚀";
      case "contact":
        return "📞";
      default:
        return "🔗";
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      
      setScrollProgress(progress);
      
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
        setActive("");
      }
    };

    window.addEventListener("scroll", handleScroll);

    const navbarHighlighter = () => {
      const sections = document.querySelectorAll("section[id]");

      sections.forEach((current) => {
        const sectionId = current.getAttribute("id");
        const sectionHeight = (current as HTMLElement).offsetHeight;
        const sectionTop =
          current.getBoundingClientRect().top - sectionHeight * 0.2;

        if (sectionTop < 0 && sectionTop + sectionHeight > 0) {
          setActive(sectionId);
        }
      });
    };

    window.addEventListener("scroll", navbarHighlighter);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", navbarHighlighter);
    };
  }, []);

  return (
    <>
      {/* Индикатор прогресса прокрутки */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-30">
        <motion.div
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
          style={{ width: `${scrollProgress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>
      
      <nav
        className={`${
          styles.paddingX
        } fixed top-1 z-20 flex w-full items-center py-5 ${
          scrolled ? "bg-primary/95 backdrop-blur-sm" : "bg-transparent"
        } transition-all duration-300`}
      >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            to="/"
            className="flex items-center gap-3"
            onClick={() => {
              window.scrollTo(0, 0);
            }}
          >
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
              <span className="text-white font-bold text-lg">СХ</span>
            </div>
            <div className="hidden md:block">
              <p className="text-[16px] lg:text-[18px] font-bold text-white">
                {config.html.fullName}
              </p>
              <p className="text-[12px] lg:text-[14px] text-gray-300">
                Frontend Developer
              </p>
            </div>
          </Link>
        </motion.div>

        <ul className="hidden list-none flex-row gap-6 lg:gap-8 xl:gap-10 sm:flex">
          {navLinks.map((nav) => (
            <motion.li
              key={nav.id}
              className={`${
                active === nav.id ? "text-white" : "text-secondary"
              } cursor-pointer text-[16px] lg:text-[18px] font-medium hover:text-white transition-all duration-300 flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-lg">{getNavIcon(nav.id)}</span>
              <a href={`#${nav.id}`} className="whitespace-nowrap">
                {nav.title}
              </a>
            </motion.li>
          ))}
        </ul>

        <div className="flex flex-1 items-center justify-end sm:hidden">
          <motion.img
            src={toggle ? close : menu}
            alt="menu"
            className="h-[28px] w-[28px] object-contain cursor-pointer z-30"
            onClick={() => setToggle(!toggle)}
            whileTap={{ scale: 0.9 }}
          />

          <AnimatePresence>
            {toggle && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                transition={{ duration: 0.2 }}
                className="black-gradient absolute right-0 top-20 z-20 mx-4 my-2 min-w-[200px] rounded-xl p-6 shadow-2xl"
              >
                <ul className="flex flex-1 list-none flex-col items-start justify-end gap-3">
                  {navLinks.map((nav, index) => (
                    <motion.li
                      key={nav.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`font-poppins cursor-pointer text-[16px] font-medium flex items-center gap-3 w-full px-3 py-2 rounded-lg transition-all duration-300 ${
                        active === nav.id 
                          ? "text-white bg-white/20" 
                          : "text-secondary hover:text-white hover:bg-white/10"
                      }`}
                      onClick={() => {
                        setToggle(!toggle);
                      }}
                    >
                      <span className="text-xl">{getNavIcon(nav.id)}</span>
                      <a href={`#${nav.id}`} className="flex-1">
                        {nav.title}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      </nav>
    </>
  );
};

export default Navbar;

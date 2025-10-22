import { motion } from "framer-motion";

import { styles } from "../../constants/styles";
import { ComputersCanvas } from "../canvas";
import { config } from "../../constants/config";

const Hero = () => {
  return (
    <section className={`relative mx-auto h-screen w-full`}>
      <div
        className={`absolute inset-0 top-[120px] mx-auto max-w-7xl ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        <div className="mt-5 flex flex-col items-center justify-center">
          <div className="h-5 w-5 rounded-full bg-[#915EFF]" />
          <div className="violet-gradient h-40 w-1 sm:h-80" />
        </div>

        <div className="relative z-10">
          <h1 className={`${styles.heroHeadText} text-white`}>
            Привет, я <span className="text-[#915EFF]">{config.hero.name}</span>
          </h1>
          <p className={`${styles.heroSubText} text-white-100 mt-2`}>
            {config.hero.p[0]} <br className="hidden sm:block" />
            {config.hero.p[1]}
          </p>
          
          <div className="mt-6 flex flex-wrap gap-4 relative z-20">
            <a 
              href={`mailto:${config.html.email}`}
              className="flex items-center gap-2 bg-blue-600/20 hover:bg-blue-600/30 px-4 py-2 rounded-lg border border-blue-500/30 transition-all duration-300 hover:scale-105"
            >
              <span className="text-blue-400">📧</span>
              <span className="text-white text-sm">Email</span>
            </a>
            <a 
              href="https://t.me/s_hvalchev"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-blue-500/20 hover:bg-blue-500/30 px-4 py-2 rounded-lg border border-blue-400/30 transition-all duration-300 hover:scale-105"
            >
              <span className="text-blue-300">📱</span>
              <span className="text-white text-sm">Telegram</span>
            </a>
            <a 
              href={`tel:${config.html.phone.replace(/\s/g, '')}`}
              className="flex items-center gap-2 bg-green-600/20 hover:bg-green-600/30 px-4 py-2 rounded-lg border border-green-500/30 transition-all duration-300 hover:scale-105"
            >
              <span className="text-green-400">📞</span>
              <span className="text-white text-sm">Позвонить</span>
            </a>
          </div>
        </div>
      </div>

      <ComputersCanvas />

      <div className="xs:bottom-10 absolute bottom-32 flex w-full items-center justify-center">
        <a href="#about">
          <div className="border-secondary flex h-[64px] w-[35px] items-start justify-center rounded-3xl border-4 p-2">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="bg-secondary mb-1 h-3 w-3 rounded-full"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;

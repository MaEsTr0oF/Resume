import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import { useState } from "react";

import { github } from "../../assets";
import { SectionWrapper } from "../../hoc";
import { projects } from "../../constants";
import { fadeIn } from "../../utils/motion";
import { config } from "../../constants/config";
import Header from "../atoms/Header";
import ImageSlider from "../atoms/ImageSlider";
import ProjectModal from "../atoms/ProjectModal";
import { TProject } from "../../types";

const ProjectCard: React.FC<{ index: number } & TProject & { onClick: () => void }> = ({
  index,
  name,
  description,
  tags,
  images,
  sourceCodeLink,
  onClick,
}) => {
  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <Tilt
        glareEnable
        tiltEnable
        tiltMaxAngleX={30}
        tiltMaxAngleY={30}
        glareColor="#aaa6c3"
      >
        <div 
          className="bg-tertiary w-full rounded-2xl p-5 sm:w-[300px] cursor-pointer hover:scale-105 transition-transform duration-200"
          onClick={onClick}
        >
          <div className="relative h-[230px] w-full">
            <ImageSlider
              images={images}
              alt={name}
              className="h-full w-full"
              autoPlay={true}
              showControls={false}
            />
            <div className="card-img_hover absolute inset-0 m-3 flex justify-end">
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(sourceCodeLink, "_blank");
                }}
                className="black-gradient flex h-10 w-10 cursor-pointer items-center justify-center rounded-full"
              >
                <img
                  src={github}
                  alt="github"
                  className="h-1/2 w-1/2 object-contain"
                />
              </div>
            </div>
          </div>
          <div className="mt-5">
            <h3 className="text-[24px] font-bold text-white">{name}</h3>
            <p className="text-secondary mt-2 text-[14px]">{description}</p>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <p key={tag.name} className={`text-[14px] ${tag.color}`}>
                #{tag.name}
              </p>
            ))}
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  const [selectedProject, setSelectedProject] = useState<TProject | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProjectClick = (project: TProject) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <>
      <Header useMotion={true} {...config.sections.works} />

      <div className="flex w-full">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="text-secondary mt-3 max-w-3xl text-[17px] leading-[30px]"
        >
          {config.sections.works.content}
        </motion.p>
      </div>

      <div className="mt-20 flex flex-wrap gap-7">
        {projects.map((project, index) => (
          <ProjectCard 
            key={`project-${index}`} 
            index={index} 
            {...project} 
            onClick={() => handleProjectClick(project)}
          />
        ))}
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default SectionWrapper(Works, "");

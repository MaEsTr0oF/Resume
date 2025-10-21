import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { github } from '../../assets';
import ImageSlider from './ImageSlider';
import { TProject } from '../../types';

interface ProjectModalProps {
  project: TProject | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed inset-4 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-tertiary rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
              <div className="flex items-center justify-between p-6 border-b border-gray-700">
                <div>
                  <h2 className="text-3xl font-bold text-white">{project.name}</h2>
                  <p className="text-secondary mt-2">{project.description}</p>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => window.open(project.sourceCodeLink, "_blank")}
                    className="flex items-center gap-2 bg-primary hover:bg-primary/80 text-white px-4 py-2 rounded-lg transition-all duration-200 min-w-[110px]"
                  >
                    <img src={github} alt="github" className="w-5 h-5" />
                    GitHub
                  </button>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-white text-2xl transition-colors duration-200"
                  >
                    ×
                  </button>
                </div>
              </div>

              <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                 <div className="mb-6">
                   <ImageSlider
                     images={project.images}
                     alt={project.name}
                     className="h-[500px] w-full"
                     autoPlay={false}
                     showControls={true}
                   />
                 </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${tag.color}`}
                    >
                      #{tag.name}
                    </span>
                  ))}
                </div>

                 {project.sourceCodeLink2 && (
                   <div className="text-gray-300">
                     <p className="text-sm leading-relaxed">
                       <a 
                         href={project.sourceCodeLink2} 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="text-blue-400 hover:text-blue-300 underline transition-colors duration-200"
                       >
                         Посмотреть проект онлайн
                       </a>
                     </p>
                   </div>
                 )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;

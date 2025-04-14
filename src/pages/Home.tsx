import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ComputerDesktopIcon,
  GlobeAltIcon,
  CircleStackIcon,
  CodeBracketIcon,
  CubeIcon,
} from "@heroicons/react/24/outline";
import questionsData from "../data/questions.json";
import { Category } from "../types";
import { SVGProps } from "react";

const iconComponents: {
  [key: string]: React.ComponentType<SVGProps<SVGSVGElement>>;
} = {
  ComputerDesktopIcon,
  GlobeAltIcon,
  CircleStackIcon,
  CodeBracketIcon,
  CubeIcon,
};

export default function Home() {
  const categories = questionsData.categories as { [key: string]: Category };

  return (
    <motion.div
      className="py-12"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center mb-12 dark:text-white">
        <motion.h1
          className="text-3xl font-bold text-gray-900 dark:text-white mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          면Job's
        </motion.h1>
        <motion.p
          className="text-lg text-gray-600 dark:text-gray-300"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          면접, 라면보다 쉽게 끓여드릴게요 🍜
        </motion.p>
      </div>

      <motion.div className="home-grid">
        {Object.values(categories).map((category, index) => {
          const Icon = iconComponents[category.icon];
          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.3 }}
            >
              <Link
                to={`/category/${category.id}`}
                className="card category-card"
              >
                <Icon className="category-icon" />
                <h2 className="category-title">{category.name}</h2>
                <p className="category-description line-clamp-1">
                  {category.description}
                </p>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title: string;
  children: ReactNode;
  confirmText?: string;
  cancelText?: string;
}

export default function Modal({
  isOpen,
  onClose,
  onConfirm,
  title,
  children,
  confirmText = "확인",
  cancelText = "취소",
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="bg-primary-50 dark:bg-primary-800 rounded-lg shadow-xl max-w-md w-full p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-2xl font-semibold mb-4 text-primary dark:text-white">
            {title}
          </h2>
          <div className="mb-6 text-primary-500 dark:text-primary-300">
            {children}
          </div>
          <div className="mt-4 flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-primary hover:bg-white hover:text-primary dark:hover:bg-primary-900 dark:hover:text-white text-white dark:bg-primary-600 border-2 border-transparent hover:border-primary dark:hover:border-primary-300 transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ring-offset-white dark:ring-offset-primary-900"
            >
              {cancelText}
            </button>
            {onConfirm && (
              <button
                onClick={onConfirm}
                className="px-4 py-2 rounded-md bg-primary-700 hover:bg-white hover:text-primary-700 dark:hover:bg-primary-900 dark:hover:text-white text-white dark:bg-primary-600 border-2 border-transparent hover:border-primary-700 dark:hover:border-primary-400 transition-all focus:outline-none focus:ring-2 focus:ring-primary-700 dark:focus:ring-primary-400 focus:ring-offset-2 ring-offset-white dark:ring-offset-primary-900"
              >
                {confirmText}
              </button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

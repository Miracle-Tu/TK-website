import { motion } from 'framer-motion';
import { ScrollReveal } from './scroll-reveal';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionTitle({ title, subtitle, className = '' }: SectionTitleProps) {
  return (
    <ScrollReveal className={`text-center mb-16 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl font-bold text-ink mb-4">{title}</h2>
        {subtitle && (
          <p className="text-lg text-muted max-w-2xl mx-auto">{subtitle}</p>
        )}
      </motion.div>
    </ScrollReveal>
  );
}
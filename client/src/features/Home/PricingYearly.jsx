import PricingCard from './PricingCard.jsx';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function PricingYearly() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      <motion.div variants={itemVariants}>
        <PricingCard
          title="Starter"
          description="Perfect for small-scale farms and hobbyists starting their smart journey."
          price="$0"
          includes={[
            'Up to 2 farms monitoring',
            'Real-time soil data',
            'Basic weather alerts',
            '1-year data history',
            'Mobile app access',
          ]}
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <PricingCard
          highlighted={true}
          title="Business"
          description="For professional farms requiring advanced insights and optimization."
          price="$499"
          includes={[
            'Unlimited farms monitoring',
            'AI-powered yield prediction',
            'Advanced resource optimization',
            'Unlimited data history',
            'Priority email support',
            'Custom sensor integration',
            'Save $89 yearly',
          ]}
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <PricingCard
          title="Enterprise"
          description="Custom solutions for large-scale industrial agricultural operations."
          price="$1999"
          includes={[
            'Everything in Business',
            'API access for developers',
            'On-site sensor installation',
            'Priority 24/7 support',
            'Custom dashboard builds',
            'Bulk sensor discounts',
            'Save $389 yearly',
          ]}
        />
      </motion.div>
    </motion.div>
  );
}

export default PricingYearly;

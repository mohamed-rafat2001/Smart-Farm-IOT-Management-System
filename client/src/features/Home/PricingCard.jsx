import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../../ui/Button';

function PricingCard({
  title,
  description,
  price,
  includes,
  highlighted = false,
}) {
  const navigate = useNavigate();

  function handleButton() {
    navigate('/signup');
  }

  return (
    <motion.div
      whileHover={{ y: -12, scale: 1.02 }}
      className={`relative flex h-full flex-col rounded-[3rem] p-10 transition-all duration-500 sm:p-12 ${
        highlighted
          ? 'border-2 border-blue-500 bg-[#283039]/40 shadow-[0_20px_50px_rgba(59,130,246,0.15)] backdrop-blur-md'
          : 'border border-stone-700/50 bg-[#283039]/30 shadow-2xl backdrop-blur-sm hover:border-stone-600'
      }`}
    >
      {highlighted && (
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 px-6 py-2 text-sm font-bold tracking-wider text-white uppercase shadow-xl shadow-blue-500/20">
          Most Popular
        </div>
      )}

      {/* Header */}
      <div className="space-y-6 border-b border-stone-700/50 pb-10 text-center">
        <h3
          className={`text-3xl font-bold ${highlighted ? 'text-blue-400' : 'text-white'}`}
        >
          {title}
        </h3>
        <p className="min-h-[70px] text-lg leading-relaxed text-stone-400">
          {description}
        </p>
        <div className="flex items-baseline justify-center gap-2">
          <span className="text-6xl font-extrabold text-white tracking-tight">{price}</span>
          <span className="text-lg font-medium text-stone-500">/mo</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-grow space-y-8 py-10">
        <h4 className="ml-2 text-sm font-bold tracking-[0.2em] text-stone-500 uppercase">
          Features Included
        </h4>

        <ul className="space-y-5">
          {includes.map((item, index) => (
            <li key={index} className="group flex items-start gap-x-4">
              <div
                className={`mt-1 flex-shrink-0 rounded-full p-1.5 transition-all duration-300 ${
                  highlighted
                    ? 'bg-blue-500/20 text-blue-400 group-hover:bg-blue-500 group-hover:text-white'
                    : 'bg-stone-700/50 text-stone-400 group-hover:bg-stone-600 group-hover:text-white'
                }`}
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <p className="text-lg leading-snug text-stone-300 transition-colors duration-300 group-hover:text-white">
                {item}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-6">
        <Button
          variant={highlighted ? 'primary' : 'outline'}
          size="large"
          fullWidth
          className={`!rounded-[1.5rem] !py-5 !text-lg !font-bold transition-all duration-300 ${
            highlighted
              ? 'shadow-xl shadow-blue-500/20 hover:shadow-2xl hover:shadow-blue-500/40'
              : '!border-stone-700 !text-stone-300 hover:!border-stone-500 hover:!text-white hover:bg-stone-800/50'
          }`}
          onClick={handleButton}
        >
          Get Started Now
        </Button>
      </div>
    </motion.div>
  );
}

export default PricingCard;

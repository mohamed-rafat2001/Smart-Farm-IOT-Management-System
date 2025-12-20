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
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className={`relative flex h-full flex-col rounded-[2.5rem] p-8 transition-all duration-300 sm:p-10 ${
        highlighted
          ? 'border-2 border-blue-500 bg-blue-600/10 shadow-2xl shadow-blue-500/10'
          : 'border border-stone-700/50 bg-[#283039]/30 shadow-xl hover:border-stone-600'
      }`}
    >
      {highlighted && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-blue-500 px-4 py-1 text-xs font-bold tracking-wider text-white uppercase">
          Most Popular
        </div>
      )}

      {/* Header */}
      <div className="space-y-4 border-b border-stone-700/50 pb-8 text-center">
        <h3
          className={`text-2xl font-bold ${highlighted ? 'text-blue-400' : 'text-white'}`}
        >
          {title}
        </h3>
        <p className="min-h-[60px] text-sm leading-relaxed text-stone-400">
          {description}
        </p>
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-5xl font-bold text-white">{price}</span>
          <span className="text-sm text-stone-500">/month</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-grow space-y-6 py-8">
        <h4 className="ml-1 text-xs font-bold tracking-widest text-stone-500 uppercase">
          What’s Included?
        </h4>

        <ul className="space-y-4">
          {includes.map((item, index) => (
            <li key={index} className="group flex items-start gap-x-3">
              <div
                className={`mt-1 flex-shrink-0 rounded-full p-1 transition-colors ${
                  highlighted
                    ? 'bg-blue-500/20 text-blue-400'
                    : 'bg-stone-700/50 text-stone-400'
                }`}
              >
                <svg
                  className="h-3.5 w-3.5"
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
              <p className="text-sm leading-tight text-stone-300 transition-colors group-hover:text-white">
                {item}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-4">
        <Button
          variant={highlighted ? 'primary' : 'outline'}
          size="large"
          fullWidth
          className={
            highlighted
              ? ''
              : '!border-stone-700 !text-stone-300 hover:!border-stone-500 hover:!text-white'
          }
          onClick={handleButton}
        >
          Get Started Now
        </Button>
      </div>
    </motion.div>
  );
}

export default PricingCard;

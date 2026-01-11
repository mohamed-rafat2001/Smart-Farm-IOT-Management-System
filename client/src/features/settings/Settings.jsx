import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Toggle from '../../../shared/components/Toggle';
import Button from '../../../shared/components/Button';
import { toast } from 'react-hot-toast';

function Settings() {
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({
    emailNotifications: true,
    systemAlerts: true,
    smsAlerts: false,
    darkMode: true,
    compactView: false,
    autoRefresh: true,
    language: 'English',
    units: 'Metric',
  });

  useEffect(() => {
    const savedSettings = localStorage.getItem('smart_farm_settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const updateSetting = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    localStorage.setItem('smart_farm_settings', JSON.stringify(settings));
    setLoading(false);
    toast.success('Settings updated successfully!');
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  const sectionClasses = 'space-y-8 p-1';
  const cardClasses =
    'relative flex flex-col gap-6 rounded-[2.5rem] border border-stone-800/50 bg-[#283039]/30 p-8 shadow-2xl backdrop-blur-md overflow-hidden transition-all hover:border-stone-700/50';

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative mx-auto max-w-5xl space-y-12 pb-20"
    >
      <header className="relative space-y-4 text-center sm:text-left">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="inline-flex items-center gap-3 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-sm font-semibold text-blue-400"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
          </span>
          System Preferences
        </motion.div>
        <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-5xl">
          Settings<span className="text-blue-500">.</span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-stone-400 sm:mx-0">
          Personalize your Smart Farm experience. Manage notifications, display
          preferences, and account security.
        </p>
      </header>

      <div className="grid gap-10">
        {/* Appearance Section */}
        <motion.section variants={itemVariants} className={sectionClasses}>
          <div className="mb-6 flex items-center gap-4">
            <h2 className="text-xl font-black tracking-widest text-white uppercase">
              Appearance
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-stone-800 to-transparent"></div>
          </div>
          <div className={cardClasses}>
            <div className="grid gap-8 sm:grid-cols-2">
              <div className="space-y-6">
                <Toggle
                  enabled={settings.darkMode}
                  onChange={(val) => updateSetting('darkMode', val)}
                  label="Dark Mode"
                  description="Enable a darker color scheme for low-light environments."
                />
                <Toggle
                  enabled={settings.compactView}
                  onChange={(val) => updateSetting('compactView', val)}
                  label="Compact View"
                  description="Display more content with less padding."
                />
              </div>
              <div className="space-y-4">
                <label className="mb-2 block text-sm font-bold tracking-wide text-white">
                  Display Language
                </label>
                <select
                  value={settings.language}
                  onChange={(e) => updateSetting('language', e.target.value)}
                  className="w-full rounded-2xl border border-stone-800 bg-[#1b2127] px-4 py-3 text-sm text-stone-300 transition-all focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                >
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>Arabic</option>
                </select>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Notifications Section */}
        <motion.section variants={itemVariants} className={sectionClasses}>
          <div className="mb-6 flex items-center gap-4">
            <h2 className="text-xl font-black tracking-widest text-white uppercase">
              Notifications
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-stone-800 to-transparent"></div>
          </div>
          <div className={cardClasses}>
            <div className="space-y-8">
              <div className="grid gap-8 sm:grid-cols-2">
                <Toggle
                  enabled={settings.emailNotifications}
                  onChange={(val) => updateSetting('emailNotifications', val)}
                  label="Email Updates"
                  description="Receive daily summaries and farm reports via email."
                />
                <Toggle
                  enabled={settings.systemAlerts}
                  onChange={(val) => updateSetting('systemAlerts', val)}
                  label="System Alerts"
                  description="Get real-time push notifications in your browser."
                />
              </div>
              <div className="h-px w-full bg-stone-800/50" />
              <Toggle
                enabled={settings.smsAlerts}
                onChange={(val) => updateSetting('smsAlerts', val)}
                label="SMS Critical Alerts"
                description="Get urgent text messages for critical device failures (Pro Plan)."
              />
            </div>
          </div>
        </motion.section>

        {/* Data & Metrics Section */}
        <motion.section variants={itemVariants} className={sectionClasses}>
          <div className="mb-6 flex items-center gap-4">
            <h2 className="text-xl font-black tracking-widest text-white uppercase">
              Data & Metrics
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-stone-800 to-transparent"></div>
          </div>
          <div className={cardClasses}>
            <div className="grid gap-8 sm:grid-cols-2">
              <Toggle
                enabled={settings.autoRefresh}
                onChange={(val) => updateSetting('autoRefresh', val)}
                label="Auto Refresh"
                description="Automatically update dashboard data every 30 seconds."
              />
              <div className="space-y-4">
                <label className="mb-2 block text-sm font-bold tracking-wide text-white">
                  Measurement Units
                </label>
                <div className="flex gap-2">
                  {['Metric', 'Imperial'].map((u) => (
                    <button
                      key={u}
                      onClick={() => updateSetting('units', u)}
                      className={`flex-1 rounded-2xl py-3 text-xs font-black tracking-widest uppercase transition-all ${
                        settings.units === u
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40'
                          : 'border border-stone-800 bg-[#1b2127] text-stone-500 hover:border-stone-700'
                      }`}
                    >
                      {u}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Action Bar */}
        <motion.div
          variants={itemVariants}
          className="sticky bottom-6 z-30 flex items-center justify-between rounded-3xl border border-white/10 bg-white/5 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur-xl"
        >
          <div className="px-4">
            <p className="text-[10px] font-black tracking-widest text-stone-500 uppercase">
              Unsaved Changes
            </p>
            <p className="text-xs font-bold text-stone-300">
              Settings are stored locally on this device.
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={handleSave}
              disabled={loading}
              className="!px-10 !py-4 shadow-2xl shadow-blue-500/20"
            >
              {loading ? (
                <span className="flex items-center gap-3">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                  Saving...
                </span>
              ) : (
                'Save Changes'
              )}
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Background Blurs */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 -right-1/4 h-[500px] w-[500px] rounded-full bg-blue-600/5 blur-[120px]" />
        <div className="absolute bottom-1/4 -left-1/4 h-[500px] w-[500px] rounded-full bg-emerald-600/5 blur-[120px]" />
      </div>
    </motion.div>
  );
}

export default Settings;

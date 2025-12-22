import { motion } from 'framer-motion';
import ProfileHeader from '../features/user/ProfileHeader';
import ProfileContent from '../features/user/ProfileContent';

function ProfilePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-7xl space-y-8"
    >
      <ProfileHeader />
      <ProfileContent />
    </motion.div>
  );
}

export default ProfilePage;

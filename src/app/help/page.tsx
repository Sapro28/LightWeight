"use client";

import { motion } from "framer-motion";

export default function HelpPage() {
  return (
    <div className="max-w-3xl mx-auto py-20 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-muted/10 backdrop-blur-lg rounded-2xl p-10 shadow-lg border border-white/10"
      >
        <div className="text-center mb-6">
          <h1 className="text-4xl font-extrabold text-primary mb-2">
            🆘 Help & Support
          </h1>
          <div className="h-[3px] w-16 mx-auto my-4 bg-cyan-400/80 rounded-full shadow-md" />
        </div>
        <p className="text-muted-foreground text-lg leading-relaxed mb-6 text-center">
          Need help using the app? We're here for you. While we build out our
          full help center, you can reach us directly via email for any issues.
        </p>
        <p className="text-muted-foreground text-lg leading-relaxed mb-6 text-center">
          Common upcoming topics: tracking workouts, customizing your dashboard,
          troubleshooting login issues.
        </p>
        <p className="text-muted-foreground text-lg leading-relaxed text-center">
          Email us anytime at <strong>support@lightweight.com</strong> — we’re
          happy to help!
        </p>
      </motion.div>
    </div>
  );
}

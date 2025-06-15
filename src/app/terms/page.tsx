"use client";

import { motion } from "framer-motion";

export default function TermsPage() {
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
            📜 Terms of Service
          </h1>
          <div className="h-[3px] w-16 mx-auto my-4 bg-cyan-400/80 rounded-full shadow-md" />
        </div>
        <p className="text-muted-foreground text-lg leading-relaxed mb-6 text-center">
          By using this platform, you agree to the following basic terms:
        </p>
        <ul className="text-muted-foreground text-left text-lg leading-relaxed list-disc list-inside mb-6">
          <li>You must be at least 13 years old to create an account.</li>
          <li>You are responsible for your own fitness and health choices.</li>
          <li>Do not misuse the app or data from other users.</li>
          <li>We may make updates or discontinue features at any time.</li>
        </ul>
        <p className="text-muted-foreground text-lg leading-relaxed text-center">
          This summary is provided for clarity. A full legal version will be
          available soon.
        </p>
      </motion.div>
    </div>
  );
}

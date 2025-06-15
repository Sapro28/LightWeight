"use client";

import { motion } from "framer-motion";

export default function PrivacyPage() {
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
            🔐 Privacy Policy
          </h1>
          <div className="h-[3px] w-16 mx-auto my-4 bg-cyan-400/80 rounded-full shadow-md" />
        </div>
        <p className="text-muted-foreground text-lg leading-relaxed mb-6 text-center">
          Your privacy matters. We only collect the data necessary to provide
          and improve your experience. We never sell your information.
        </p>
        <p className="text-muted-foreground text-lg leading-relaxed mb-6 text-center">
          We may use analytics tools to understand app usage and improve
          performance. All third-party services we use comply with modern
          privacy standards.
        </p>
        <p className="text-muted-foreground text-lg leading-relaxed text-center">
          You can request data deletion or learn more by contacting us at{" "}
          <strong>privacy@yourapp.com</strong>.
        </p>
      </motion.div>
    </div>
  );
}

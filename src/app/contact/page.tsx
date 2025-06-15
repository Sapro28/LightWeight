"use client";

import { motion } from "framer-motion";

export default function ContactPage() {
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
            📨 Contact Us
          </h1>
          <div className="h-[3px] w-16 mx-auto my-4 bg-cyan-400/80 rounded-full shadow-md" />
        </div>
        <p className="text-muted-foreground text-lg leading-relaxed mb-6 text-center">
          Have questions, ideas, or ran into a bug? We’d love to hear from you.
          Your feedback helps us make the app better every day.
        </p>
        <p className="text-muted-foreground text-lg leading-relaxed text-center">
          You can email us anytime at <strong>support@lightweight.com</strong>.
          We usually respond within 1–2 business days. Social links and a full
          contact form are coming soon!
        </p>
      </motion.div>
    </div>
  );
}

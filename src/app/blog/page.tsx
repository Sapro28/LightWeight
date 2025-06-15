"use client";

import { motion } from "framer-motion";

export default function BlogPage() {
  return (
    <div className="max-w-3xl mx-auto py-20 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-muted/10 backdrop-blur-lg rounded-2xl p-10 shadow-lg border border-white/10"
      >
        <div className="text-center mb-6">
          <h1 className="text-4xl font-extrabold text-primary mb-2">📰 Blog</h1>
          <div className="h-[3px] w-16 mx-auto my-4 bg-cyan-400/80 rounded-full shadow-md" />
        </div>
        <p className="text-muted-foreground text-lg leading-relaxed mb-6 text-center">
          Our blog is coming soon! We’ll be covering topics to help you stay on
          track and feel your best — physically and mentally.
        </p>
        <p className="text-muted-foreground text-lg leading-relaxed text-center">
          Expect fitness tips, nutrition breakdowns, beginner guides, interviews
          with real users, and personal stories from our team. Stay tuned!
        </p>
      </motion.div>
    </div>
  );
}

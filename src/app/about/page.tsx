"use client";

import { motion } from "framer-motion";

export default function AboutPage() {
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
            🚀 About Us
          </h1>
          <div className="h-[3px] w-16 mx-auto my-4 bg-cyan-400/80 rounded-full shadow-md" />
        </div>
        <p className="text-muted-foreground text-lg leading-relaxed mb-6 text-center">
          We're a team of fitness enthusiasts, developers, and designers who
          believe that tracking progress should be simple, motivating, and
          personal. This app was created to help users stay committed to their
          goals with a blend of technology and encouragement.
        </p>
        <p className="text-muted-foreground text-lg leading-relaxed text-center">
          Whether you're just starting out or pushing for the next level, we’re
          building tools that grow with you. We're constantly evolving based on
          your feedback, and we’re excited to have you on this journey with us.
        </p>
      </motion.div>
    </div>
  );
}

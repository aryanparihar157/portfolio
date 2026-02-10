"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  }

  return (
    <section id="about" className="py-20 md:py-32 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent -z-10" />
      <motion.div
        ref={ref}
        className="container mx-auto max-w-6xl"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.h2 className="text-3xl md:text-5xl font-bold mb-8 md:mb-16 text-center" variants={itemVariants}>
          About <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Me</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Profile Image */}
          <motion.div
            className="flex justify-center md:justify-start"
            variants={imageVariants}
          >
            <div className="relative w-64 h-80 md:w-72 md:h-96 rounded-xl overflow-hidden shadow-xl border border-primary/20 hover:border-primary/50 transition-all duration-300">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative w-full h-full"
              >
                <Image
                  src="/profile.jpg"
                  alt="Aryan Parihar - Professional Headshot"
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent pointer-events-none" />
            </div>
          </motion.div>

          {/* Text Content */}
          <div className="space-y-6">
            <motion.p className="text-lg leading-relaxed text-muted-foreground text-pretty" variants={itemVariants}>
              I'm a passionate Computer Science and Engineering student at Lovely Professional University (CGPA: 6.7),
              dedicated to building intelligent solutions using Machine Learning and Full-Stack Development. My journey
              combines strong technical skills with practical experience in AI model development and web technologies.
            </motion.p>
            <motion.p className="text-lg leading-relaxed text-muted-foreground text-pretty" variants={itemVariants}>
              During my AI Internship at 1Stop.ai, I developed machine learning models for Text Classification, Face
              Detection, and Landmark Classification, processing over 10,000+ samples and achieving a 12-18% increase in
              model accuracy through algorithm experimentation and hyperparameter tuning. I automated parts of the ML
              workflow using Python, TensorFlow, and NumPy, reducing manual work by 30%.
            </motion.p>
            <motion.p className="text-lg leading-relaxed text-muted-foreground text-pretty" variants={itemVariants}>
              I'm proficient in Python, Java, and JavaScript, with expertise in technologies like HTML/CSS, Bootstrap,
              Node.js, and React. My database skills include MySQL, MongoDB, and AWS/Google Cloud platforms. I'm a team
              player with strong leadership, problem-solving abilities, and project management skills, always excited to
              take on new challenges and grow as a developer.
            </motion.p>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

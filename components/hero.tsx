"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowDown, Download, Github, Linkedin, Mail } from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
}

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden pt-20">
      {/* Animated background gradients */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-40 -left-40 w-80 h-80 bg-primary/30 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-40 -right-40 w-80 h-80 bg-accent/20 rounded-full blur-[128px] animate-pulse delay-1000" />
      </div>

      <motion.div
        className="container mx-auto text-center space-y-8 max-w-4xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main Heading */}
        <motion.div className="space-y-6" variants={itemVariants}>
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-balance leading-tight"
            whileHover={{ scale: 1.02 }}
          >
            Problem Solver{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Developer</span>{" "}
            Tech Enthusiast
          </motion.h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto text-balance font-light">
            Crafting intelligent applications with AI, Machine Learning, and Full-Stack Development
          </p>
          <p className="text-base md:text-lg text-muted-foreground/80 max-w-xl mx-auto leading-relaxed">
            Computer Science student at Lovely Professional University, specializing in ML and modern web technologies.
            Passionate about solving complex problems and building impactful solutions.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div className="flex flex-wrap items-center justify-center gap-4" variants={itemVariants}>
          <Button size="lg" className="gap-2" asChild>
            <motion.a href="#projects" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              View My Work
            </motion.a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <motion.a href="#contact" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              Get In Touch
            </motion.a>
          </Button>
          <Button size="lg" variant="outline" className="gap-2" asChild>
            <motion.a href="/aryan.pdf" download whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Download className="h-5 w-5" />
              Download CV
            </motion.a>
          </Button>
        </motion.div>

        {/* Social Links */}
        <motion.div className="flex items-center justify-center gap-6 pt-4" variants={itemVariants}>
          <motion.a
            href="https://github.com/aryanparihar157"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-muted/50 hover:bg-primary/20 text-muted-foreground hover:text-primary transition-all"
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github className="h-6 w-6" />
            <span className="sr-only">GitHub</span>
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/aryanparihar987/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-muted/50 hover:bg-primary/20 text-muted-foreground hover:text-primary transition-all"
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Linkedin className="h-6 w-6" />
            <span className="sr-only">LinkedIn</span>
          </motion.a>
          <motion.a
            href="mailto:parihararyan88089@gmail.com"
            className="p-3 rounded-full bg-muted/50 hover:bg-primary/20 text-muted-foreground hover:text-primary transition-all"
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Mail className="h-6 w-6" />
            <span className="sr-only">Email</span>
          </motion.a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div className="pt-8" variants={itemVariants}>
          <motion.a
            href="#about"
            className="inline-flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
          >
            <span className="text-sm font-medium">Scroll to explore</span>
            <ArrowDown className="h-5 w-5" />
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  )
}

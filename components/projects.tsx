"use client"

import { motion } from "framer-motion"
import { useRef } from "react"
import { useInView } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"

const projects = [
  {
    title: "Text Classification using TensorFlow",
    description:
      "Built a machine learning model to classify text into predefined categories. Trained using ethical data and evaluated with accuracy and precision metrics for advanced text processing.",
    image: "/project-text-classification.jpg",
    tags: ["Python", "TensorFlow", "Machine Learning", "NLP"],
    github: "https://github.com/aryanparihar157/Text-Classification",
    demo: "",
  },
  {
    title: "AI Model for Real-Time Streaming",
    description:
      "Developing an AI model capable of real-time streaming, integrating text-to-voice processing to enable intelligent conversational replies. Ongoing project with advanced NLP capabilities.",
    image: "/project-ai-streaming.jpg",
    tags: ["Python", "AI", "NLP", "Real-time Processing"],
    github: "https://github.com/aryanparihar157/Ai-vtuber-model",
    demo: "",
  },
  {
    title: "Face Detection & Landmark Classification",
    description:
      "Developed ML models for face detection and landmark classification as part of 1Stop.ai internship. Processed 10,000+ samples with 99.7% accuracy improvement through optimization.",
    image: "/project-face-detection.jpg",
    tags: ["Python", "TensorFlow", "Computer Vision", "NumPy"],
    github: "https://github.com/aryanparihar157/facial-landmark-detection",
    demo: "",
  },
  {
    title: "MERN Stack Projects",
    description:
      "Completed full MERN Stack Development programs with practical projects using MongoDB, Express, React, and Node.js. Built modern, scalable web applications with full-stack capabilities.",
    image: "/project-mern.jpg",
    tags: ["MongoDB", "Express", "React", "Node.js"],
    github: "https://github.com/aryanparihar187",
    demo: "",
  },
]

export function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  return (
    <section id="projects" className="py-20 md:py-32 px-4 bg-gradient-to-b from-secondary/30 to-background">
      <motion.div
        ref={ref}
        className="container mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.h2 className="text-3xl md:text-5xl font-bold mb-4 text-center" variants={itemVariants}>
          Featured <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Projects</span>
        </motion.h2>
        <motion.p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto text-pretty" variants={itemVariants}>
          Here are some of my recent projects showcasing my skills in Machine Learning, AI, and Full-Stack Development.
        </motion.p>

        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8" variants={containerVariants}>
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="h-full"
            >
              <Card className="group h-full hover:border-primary/50 transition-colors overflow-hidden flex flex-col hover:shadow-lg">
                <motion.div className="aspect-video overflow-hidden bg-muted" whileHover={{ scale: 1.05 }}>
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300"
                  />
                </motion.div>
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription className="text-pretty">{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 flex-1 flex flex-col justify-end">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <Button size="sm" variant="outline" asChild>
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2" />
                        Code
                      </a>
                    </Button>
                    {project.demo && (
                      <Button size="sm" asChild>
                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Live Demo
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

"use client"

import { motion } from "framer-motion"
import { useRef } from "react"
import { useInView } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Code2, Database, Cloud, Lightbulb } from "lucide-react"

const skillCategories = [
  {
    title: "Languages",
    icon: Code2,
    skills: ["Python", "Java", "JavaScript"],
  },
  {
    title: "Technologies",
    icon: Database,
    skills: ["HTML & CSS", "Bootstrap", "Node.js", "React"],
  },
  {
    title: "Tech Platforms",
    icon: Cloud,
    skills: ["MySQL", "MongoDB", "AWS", "Google Cloud"],
  },
  {
    title: "Soft Skills",
    icon: Lightbulb,
    skills: ["Leadership", "Problem-Solving", "Team Player", "Project Management", "Adaptability"],
  },
]

export function Skills() {
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
    <section id="skills" className="py-20 md:py-32 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent -z-10" />
      <motion.div
        ref={ref}
        className="container mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.h2 className="text-3xl md:text-5xl font-bold mb-4 text-center" variants={itemVariants}>
          Skills &{" "}
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Technologies</span>
        </motion.h2>
        <motion.p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto text-pretty" variants={itemVariants}>
          A comprehensive toolkit of technologies and soft skills that I use to build scalable applications and lead
          successful projects.
        </motion.p>

        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" variants={containerVariants}>
          {skillCategories.map((category) => {
            const Icon = category.icon
            return (
              <motion.div
                key={category.title}
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full hover:border-primary/50 transition-colors hover:shadow-lg">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <motion.div
                        className="p-2 bg-primary/10 rounded-lg"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <Icon className="h-5 w-5 text-primary" />
                      </motion.div>
                      <CardTitle className="text-lg">{category.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill) => (
                        <motion.div
                          key={skill}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Badge variant="secondary">{skill}</Badge>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      </motion.div>
    </section>
  )
}

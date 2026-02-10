"use client"

import { motion } from "framer-motion"
import { useRef } from "react"
import { useInView } from "framer-motion"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, GraduationCap, Award } from "lucide-react"

const experiences = [
  {
    type: "education",
    title: "Bachelor of Technology - Computer Science and Engineering",
    organization: "Lovely Professional University",
    location: "Punjab, India",
    period: "August 2023 - Present",
    description:
      "CGPA: 6.7 Studying advanced topics in Computer Science and Engineering with focus on AI, Machine Learning, and Full-Stack Development.",
  },
  {
    type: "work",
    title: "AI Intern",
    organization: "1Stop.ai",
    location: "Remote",
    period: "May 2023 - July 2023",
    description:
      "Built and developed ML models for Text Classification, Face Detection, and Landmark Classification. Processed 10,000+ samples and achieved 12-18% accuracy improvement. Automated ML workflow using Python, TensorFlow, and NumPy, reducing manual work by 30%.",
  },
  {
    type: "certificate",
    title: "MERN Stack Development",
    organization: "Pre-grad Program",
    location: "",
    period: "July 2024",
    description:
      "Completed comprehensive MERN Stack Development program. Built practical projects using MongoDB, Express, React, and Node.js.",
  },
  {
    type: "certificate",
    title: "AWS Student Community",
    organization: "Amazon Web Services",
    location: "",
    period: "2024",
    description: "Active member of AWS Student Community, learning cloud computing technologies and best practices.",
  },
  {
    type: "education",
    title: "Intermediate (12th Grade)",
    organization: "Gulmohar Public School",
    location: "Saket Nagar, Kanpur",
    period: "April 2022 - March 2023",
    description: "Percentage: 83.6%",
  },
]

export function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section id="experience" className="py-20 md:py-32 px-4 bg-gradient-to-b from-background to-secondary/30">
      <motion.div
        ref={ref}
        className="container mx-auto max-w-4xl"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.h2 className="text-3xl md:text-5xl font-bold mb-4 text-center" variants={itemVariants}>
          Experience &{" "}
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Education</span>
        </motion.h2>
        <motion.p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto text-pretty" variants={itemVariants}>
          My academic journey, professional experiences, and certifications that have shaped my skills and knowledge.
        </motion.p>

        <motion.div className="space-y-6" variants={containerVariants}>
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ x: 5 }}
            >
              <Card className="hover:border-primary/50 transition-colors hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <motion.div
                      className={`p-2 rounded-lg flex-shrink-0 ${
                        exp.type === "education"
                          ? "bg-primary/10"
                          : exp.type === "work"
                            ? "bg-chart-2/10"
                            : "bg-chart-4/10"
                      }`}
                      whileHover={{ scale: 1.1 }}
                    >
                      {exp.type === "education" ? (
                        <GraduationCap className="h-5 w-5 text-primary" />
                      ) : exp.type === "work" ? (
                        <Briefcase className="h-5 w-5 text-chart-2" />
                      ) : (
                        <Award className="h-5 w-5 text-chart-4" />
                      )}
                    </motion.div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                        <CardTitle>{exp.title}</CardTitle>
                        <span className="text-sm text-muted-foreground">{exp.period}</span>
                      </div>
                      <CardDescription className="font-medium text-foreground/70 mb-1">
                        {exp.organization}
                        {exp.location && <span className="text-muted-foreground"> • {exp.location}</span>}
                      </CardDescription>
                      <p className="text-sm text-muted-foreground text-pretty leading-relaxed">{exp.description}</p>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

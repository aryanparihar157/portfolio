import * as fal from '@fal-ai/serverless-client'
import fs from 'fs'
import path from 'path'
import https from 'https'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Configure fal client
fal.config({
  credentials: process.env.FAL_KEY,
})

const projects = [
  {
    title: 'Text Classification using TensorFlow',
    prompt:
      'Modern digital illustration of machine learning text classification, neural networks visualized with purple and blue glowing nodes, data flowing through abstract networks, professional tech artwork, clean background, 4K quality',
    filename: 'text-classification.png',
  },
  {
    title: 'AI Model for Real-Time Streaming',
    prompt:
      'Futuristic AI streaming visualization with flowing data streams, voice waves audio visualization, real-time processing represented with glowing lines and particles, modern tech aesthetic, cyberpunk style, 4K quality',
    filename: 'ai-streaming.png',
  },
  {
    title: 'Face Detection & Landmark Classification',
    prompt:
      'Computer vision illustration showing face detection with geometric overlays, facial landmarks highlighted with glowing points, neural network processing visualization, technology meets art style, clean modern design, 4K quality',
    filename: 'face-detection.png',
  },
  {
    title: 'MERN Stack Projects',
    prompt:
      'Modern web development illustration with MongoDB, Express, React, Node.js ecosystem, interconnected tech components, vibrant gradient colors, full-stack architecture visualization, professional tech art, 4K quality',
    filename: 'mern-stack.png',
  },
]

async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath)
    https
      .get(url, (response) => {
        response.pipe(file)
        file.on('finish', () => {
          file.close()
          resolve(filepath)
        })
      })
      .on('error', (err) => {
        fs.unlink(filepath, () => {})
        reject(err)
      })
  })
}

async function generateImages() {
  console.log('[v0] Starting project image generation...')
  const publicDir = path.join(__dirname, '../public/projects')

  // Create directory if it doesn't exist
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true })
  }

  for (const project of projects) {
    try {
      console.log(`[v0] Generating image for: ${project.title}`)

      const result = await fal.subscribe('fal-ai/flux-pro', {
        input: {
          prompt: project.prompt,
          image_size: 'landscape_4_3',
          num_inference_steps: 25,
          num_images: 1,
        },
      })

      const imageUrl = result.images?.[0]?.url

      if (!imageUrl) {
        throw new Error(`No image URL generated for ${project.title}`)
      }

      const filepath = path.join(publicDir, project.filename)
      await downloadImage(imageUrl, filepath)
      console.log(`[v0] Successfully saved: ${project.filename}`)
    } catch (error) {
      console.error(`[v0] Error generating image for ${project.title}:`, error.message)
    }
  }

  console.log('[v0] Image generation complete!')
}

generateImages()

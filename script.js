/* ==========================================
    आर्यन परिहार - Interactive Portfolio Logic (JS)
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  
  // --- Initialize Lucide Icons ---
  lucide.createIcons();

  // --- Dynamic Typing Effect ---
  const roles = [
    "AI & Machine Learning Systems.",
    "Full-Stack Web Applications.",
    "Data-Driven Workflows.",
    "Interactive Games in Unity."
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typedTextSpan = document.getElementById("dynamic-role");
  const typingDelay = 100;
  const erasingDelay = 50;
  const newTextDelay = 2000; // Delay between roles

  function typeRole() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      typedTextSpan.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedTextSpan.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? erasingDelay : typingDelay;

    if (!isDeleting && charIndex === currentRole.length) {
      delay = newTextDelay;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 500;
    }

    setTimeout(typeRole, delay);
  }

  // Start typing loop
  if (typedTextSpan) {
    setTimeout(typeRole, 1000);
  }

  // --- Theme Toggle (Light/Dark Mode) ---
  const themeToggleBtn = document.getElementById('theme-toggle');
  const bodyElement = document.body;

  // Retrieve saved theme or default to dark
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  if (savedTheme === 'light') {
    bodyElement.classList.add('light-theme');
    bodyElement.classList.remove('dark-theme');
  } else {
    bodyElement.classList.add('dark-theme');
    bodyElement.classList.remove('light-theme');
  }

  themeToggleBtn.addEventListener('click', () => {
    if (bodyElement.classList.contains('light-theme')) {
      bodyElement.classList.replace('light-theme', 'dark-theme');
      localStorage.setItem('portfolio-theme', 'dark');
    } else {
      bodyElement.classList.replace('dark-theme', 'light-theme');
      localStorage.setItem('portfolio-theme', 'light');
    }
  });

  // --- Mobile Menu Toggle ---
  const menuToggleBtn = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  menuToggleBtn.addEventListener('click', () => {
    menuToggleBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
  });

  // Close mobile menu when clicking a link
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuToggleBtn.classList.remove('active');
      mobileMenu.classList.remove('active');
    });
  });

  // Close mobile menu when clicking outside of it
  document.addEventListener('click', (e) => {
    if (!menuToggleBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
      menuToggleBtn.classList.remove('active');
      mobileMenu.classList.remove('active');
    }
  });

  // --- Active Link Observer (Scrollspy) ---
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -60% 0px', // Trigger when section occupies core viewport
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    sectionObserver.observe(section);
  });

  // --- Scroll Reveal Animations ---
  const revealElements = document.querySelectorAll('.scroll-reveal');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Once revealed, no need to keep observing
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });

  // --- Projects Filter ---
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active button
      filterButtons.forEach(button => button.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300); // match transition speed
        }
      });
    });
  });

  // The Download CV button now downloads resume.pdf natively through HTML5 download attribute.

  // --- Floating Back to Top Button ---
  const backToTopBtn = document.getElementById('back-to-top');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // --- Contact Form Handling ---
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('form-name').value;
      const email = document.getElementById('form-email').value;
      const subject = document.getElementById('form-subject').value;
      const message = document.getElementById('form-message').value;

      // Mock submit validation success
      if (name && email && subject && message) {
        showToast(`Thank you, ${name}! Your message has been sent successfully.`);
        contactForm.reset();
      } else {
        showToast("Please fill out all required fields.");
      }
    });
  }

});

// --- Clipboard Copy Helper ---
function copyText(text, btnElement) {
  navigator.clipboard.writeText(text).then(() => {
    showToast("Copied to clipboard!");
    const btnSpan = btnElement.querySelector('span');
    const originalText = btnSpan.textContent;
    btnSpan.textContent = "Copied!";
    setTimeout(() => {
      btnSpan.textContent = originalText;
    }, 2000);
  }).catch(err => {
    console.error('Failed to copy text: ', err);
  });
}

// --- Custom Toast Notification ---
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('visible');
  
  setTimeout(() => {
    toast.classList.remove('visible');
  }, 3500);
}

// --- Project Modals Data Directory ---
const projectData = {
  'text-classification': {
    title: 'Text Classification using TensorFlow',
    category: 'AI & Natural Language Processing',
    duration: 'May - July 2025',
    bullets: [
      'Engineered an NLP text classifier using TensorFlow/Keras and pre-trained Embeddings.',
      'Trained the neural network using highly curated ethical data blocks to prevent bias.',
      'Evaluated predictions using Accuracy, Recall, F1-Score, and Precision matrices.',
      'Optimized tokenization parameters and embedding dimensions, boosting accuracy by 14%.'
    ],
    tech: ['Python', 'TensorFlow', 'NLP', 'Machine Learning', 'NumPy', 'Keras'],
    codeLink: 'https://github.com/aryanparihar157/Text-Classification'
  },
  'ai-streaming': {
    title: 'AI Model for Real-Time Streaming',
    category: 'AI & Voice Processing',
    duration: 'May 2023 - Ongoing',
    bullets: [
      'Architecting a real-time conversational agent targeting streaming broadcasts.',
      'Integrating Low-Latency Text-To-Voice models to speak text responses dynamically.',
      'Developing memory persistence to maintain context across active conversations.',
      'Currently testing response generation latencies to minimize lag down to under 500ms.'
    ],
    tech: ['Python', 'AI VTuber', 'Text-To-Speech', 'NLP', 'AsyncIO', 'Real-Time APIs'],
    codeLink: 'https://github.com/aryanparihar157/Ai-vtuber-model'
  },
  'face-detection': {
    title: 'Face Detection & Landmark Classification',
    category: 'Computer Vision',
    duration: 'May - July 2025',
    bullets: [
      'Developed lightweight face detection neural network models optimized for edge devices.',
      'Supervised manual cleanup and verification of over 10,000 face images in Google Colab.',
      'Mapped 68 facial landmark coordinates with high precision for facial layout orientation.',
      'Attained landmark coordinate alignment precision scores of up to 99.7%.'
    ],
    tech: ['Python', 'TensorFlow', 'OpenCV', 'Google Colab', 'Computer Vision', 'NumPy'],
    codeLink: 'https://github.com/aryanparihar157/facial-landmark-detection'
  },
  'mern-stack': {
    title: 'MERN Stack Applications',
    category: 'Full-Stack Development',
    duration: 'Completed July 2024',
    bullets: [
      'Coded responsive web frontends using React.js and CSS modules.',
      'Created structured REST APIs using Node.js and Express to route database actions.',
      'Designed transactional document schemas in MongoDB, securing connections using Mongoose.',
      'Implemented JSON Web Token (JWT) user sessions, passwords encryption, and route authorization.'
    ],
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT Auth', 'REST API'],
    codeLink: 'https://github.com/aryanparihar157'
  },
  'car-racing': {
    title: '3D Car Racing Game',
    category: 'Game Development',
    duration: 'May - July 2023',
    bullets: [
      'Programmed rigid body physics controllers in C# for vehicle acceleration and drifting dynamics.',
      'Constructed track layouts using modular assets, implementing collision boundary checkpoints.',
      'Created intelligent AI opponents that follow optimal path nodes around courses.',
      'Polished user experience with particle system engine exhausts, tire marks, and responsive HUD dashboards.'
    ],
    tech: ['Unity Engine', 'C# Scripting', '3D Physics', 'Game Design', 'AI Pathfinding'],
    codeLink: 'https://github.com/aryanparihar157'
  }
};

// --- Project Modal Functions ---
function openProjectModal(projectId) {
  const data = projectData[projectId];
  if (!data) return;

  const modal = document.getElementById('project-modal');
  const body = document.getElementById('modal-project-body');

  let bulletsHtml = data.bullets.map(b => `<li>${b}</li>`).join('');
  let techHtml = data.tech.map(t => `<span class="tag">${t}</span>`).join('');

  body.innerHTML = `
    <div class="modal-proj-header">
      <h3 class="modal-proj-title">${data.title}</h3>
      <div class="modal-proj-meta">${data.category} • ${data.duration}</div>
    </div>
    <div class="modal-proj-body">
      <h4>Project Overview</h4>
      <p>Here is an in-depth breakdown of key highlights and technical objectives achieved in this project:</p>
      <ul class="modal-proj-list">
        ${bulletsHtml}
      </ul>
      
      <h4>Technologies & Libraries Employed</h4>
      <div class="project-tags">
        ${techHtml}
      </div>
    </div>
    <div class="modal-proj-footer">
      <a href="${data.codeLink}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
        <i data-lucide="github"></i> View GitHub Code
      </a>
    </div>
  `;

  // Re-run Lucide to render icon inside modal
  lucide.createIcons();
  
  modal.classList.add('active');
  document.body.style.overflow = 'hidden'; // Lock background scroll
}

function closeProjectModal() {
  const modal = document.getElementById('project-modal');
  modal.classList.remove('active');
  document.body.style.overflow = 'auto'; // Restore background scroll
}

// Close modals when clicking outside contents
window.addEventListener('click', (e) => {
  const projModal = document.getElementById('project-modal');
  const certModal = document.getElementById('cert-modal');
  
  if (e.target === projModal) {
    closeProjectModal();
  }
  if (e.target === certModal) {
    closeCertModal();
  }
});

// --- Certificate Modals Data Directory ---
const certData = {
  '1stop-ai': {
    title: 'AI Internship Certificate',
    issuer: '1Stop.ai Services',
    date: 'May - July 2025',
    desc: 'Awarded for completing hands-on AI intern tasks, building and optimizing Text Classification, Face Detection, and Facial Landmark estimation networks. Verified skills in Python, NumPy, and TensorFlow development.'
  },
  'mern': {
    title: 'MERN Stack Development Certificate',
    issuer: 'Pre-Grad Certification Program',
    date: 'July 2024',
    desc: 'Completed comprehensive practical developer curriculum covering single page React applications, secure authentication servers, MongoDB schemas, and REST API deployment strategies.'
  },
  'aws': {
    title: 'AWS Student Community Certificate',
    issuer: 'AWS Student Community India',
    date: '2024 Partner Event',
    desc: 'Awarded for participating in AWS Cloud Computing cohorts. Trained in launching EC2 virtual machines, managing S3 buckets, setting up IAM security protocols, and hosting Docker container servers.'
  }
};

// --- Certificate Modal Functions ---
function openCertModal(certId, titleText) {
  const data = certData[certId];
  if (!data) return;

  const modal = document.getElementById('cert-modal');
  
  document.getElementById('cert-modal-title').textContent = data.title;
  document.getElementById('cert-doc-title').textContent = data.title;
  document.getElementById('cert-doc-desc').textContent = `Verified Credential of Completion: Aryan Parihar`;
  document.getElementById('cert-doc-date').textContent = `Issued: ${data.date} | Issuer: ${data.issuer}`;
  document.getElementById('cert-modal-desc-text').textContent = data.desc;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCertModal() {
  const modal = document.getElementById('cert-modal');
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

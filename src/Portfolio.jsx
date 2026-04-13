import React, { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun, Github, Linkedin, Mail, ExternalLink, Download, ChevronDown, Code, Zap, Users, Database } from 'lucide-react';
import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key
emailjs.init('XXXXXXXXXXXXXXXXXXXXXXXXX'); // Replace with your EmailJS public key

export default function Portfolio() {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(sectionId);
    setIsMenuOpen(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setSubmitMessage({ type: 'error', text: 'Please fill in all fields' });
      setTimeout(() => setSubmitMessage({ type: '', text: '' }), 5000);
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Send email using EmailJS
      await emailjs.send(
        'service_xxxxx',      // Replace with your service ID
        'template_xxxxx',     // Replace with your template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: 'rajneshranjan5@gmail.com', // Your email
        }
      );
      
      setSubmitMessage({ type: 'success', text: '✓ Message sent successfully! I\'ll get back to you soon.' });
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitMessage({ type: '', text: '' }), 5000);
    } catch (error) {
      console.error('Email error:', error);
      setSubmitMessage({ type: 'error', text: '✗ Failed to send message. Please try again or contact me directly.' });
      setTimeout(() => setSubmitMessage({ type: '', text: '' }), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  const skills = [
    {
      category: 'Backend',
      items: ['Python', 'Flask', 'FastAPI', 'Django'],
      icon: <Code className="w-5 h-5" />,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      category: 'Databases',
      items: ['MySQL', 'PostgreSQL', 'SQL Optimization'],
      icon: <Database className="w-5 h-5" />,
      color: 'from-purple-500 to-pink-500'
    },
    {
      category: 'Cloud & DevOps',
      items: ['AWS (EC2, S3, Lambda)', 'CI/CD', 'Docker'],
      icon: <Zap className="w-5 h-5" />,
      color: 'from-orange-500 to-red-500'
    },
    {
      category: 'Architecture',
      items: ['REST APIs', 'Microservices', 'System Design'],
      icon: <Users className="w-5 h-5" />,
      color: 'from-green-500 to-emerald-500'
    },
  ];

  const experiences = [
    {
      title: 'Lead Backend Developer',
      company: 'Tata Consultancy Services, Delhi',
      period: 'Jan 2022 - Present',
      highlights: [
        'Led a team of 5 backend engineers, driving API architecture and delivery',
        'Built an AI-powered API generator, reducing development time from days to under 1 hour (60%+ productivity boost)',
        'Built and maintained 100+ scalable REST APIs with strong focus on reliability and performance',
        'Optimized API performance, reducing response time by up to 40%',
        'Collaborated with cross-functional teams in agile environments'
      ],
      color: 'from-blue-400 to-blue-600'
    },
    {
      title: 'QA Engineer',
      company: 'Tata Consultancy Services, Delhi',
      period: 'Jul 2021 - Dec 2021',
      highlights: [
        'Executed test strategies achieving 100% coverage and reducing post-deployment bugs',
        'Automated 200+ test cases, improving testing efficiency by 60%',
        'Collaborated on TDD practices and streamlined requirements documentation'
      ],
      color: 'from-purple-400 to-purple-600'
    },
    {
      title: 'SQL Developer (Programmer Analyst Trainee)',
      company: 'Cognizant, Mumbai',
      period: 'Jan 2021 - May 2021',
      highlights: [
        'Processed 50K+ patient records daily using optimized SQL queries',
        'Improved database performance by 35% through indexing and query optimization',
        'Automated reporting workflows, reducing manual effort by 70% while ensuring HIPAA-compliance'
      ],
      color: 'from-pink-400 to-pink-600'
    }
  ];

  const projects = [
    {
      title: 'AI-Powered API Generator',
      description: 'Automated API generation reducing development time from days to under 1 hour',
      tech: ['Python', 'FastAPI', 'AI/ML', 'AWS'],
      impact: '60% productivity boost',
      icon: '⚡'
    },
    {
      title: 'REST API Architecture',
      description: 'Designed and built 100+ scalable REST APIs with focus on reliability',
      tech: ['Flask', 'PostgreSQL', 'AWS', 'Docker'],
      impact: '40% faster response times',
      icon: '🔌'
    },
    {
      title: 'Database Optimization Suite',
      description: 'Query optimization and indexing strategies for high-traffic systems',
      tech: ['SQL', 'MySQL', 'PostgreSQL'],
      impact: '35% performance improvement',
      icon: '📊'
    },
    {
      title: 'Test Automation Framework',
      description: 'Automated 200+ test cases with comprehensive coverage',
      tech: ['Python', 'TDD', 'CI/CD'],
      impact: '60% testing efficiency gain',
      icon: '✅'
    }
  ];

  return (
    <div className={`${isDark ? 'dark bg-slate-950' : 'bg-white'}`}>
      {/* Background Effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className={`absolute top-0 left-1/4 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob ${isDark ? 'bg-blue-500' : 'bg-blue-300'}`}></div>
        <div className={`absolute top-0 right-1/4 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 ${isDark ? 'bg-purple-500' : 'bg-purple-300'}`}></div>
        <div className={`absolute -bottom-8 left-1/3 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000 ${isDark ? 'bg-pink-500' : 'bg-pink-300'}`}></div>
      </div>

      {/* Navbar */}
      <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrollY > 50 ? (isDark ? 'bg-slate-950/95 backdrop-blur-md border-b border-slate-800' : 'bg-white/95 backdrop-blur-md border-b border-slate-200') : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">RR</div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors duration-300 ${activeSection === item.id ? 'text-blue-500' : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-black'}`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsDark(!isDark)}
                className={`p-2 rounded-lg transition-colors ${isDark ? 'bg-slate-800 text-yellow-400' : 'bg-slate-100 text-slate-700'}`}
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className={`md:hidden pb-4 space-y-2 border-t ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section - Glassmorphism */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8 animate-fade-in">
            <div className="w-32 h-32 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-1 animate-pulse-slow">
              <div className={`w-full h-full rounded-2xl ${isDark ? 'bg-slate-950' : 'bg-white'} flex items-center justify-center text-5xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                RR
              </div>
            </div>
          </div>

          <h1 className={`text-5xl sm:text-7xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'} animate-fade-in-up`}>
            Rajnesh Kr. Ranjan
          </h1>

          <p className={`text-xl sm:text-2xl mb-4 ${isDark ? 'text-slate-300' : 'text-slate-600'} animate-fade-in-up animation-delay-200`}>
            Lead Backend Engineer
          </p>

          <p className="text-lg sm:text-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-8 animate-fade-in-up animation-delay-400">
            Building scalable systems • Leading teams • Driving AI automation
          </p>

          <div className={`backdrop-blur-md border rounded-2xl p-6 mb-8 animate-fade-in-up animation-delay-600 ${isDark ? 'bg-white/10 border-white/20' : 'bg-white/40 border-white/60'}`}>
            <p className={`text-lg ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              4+ years of experience building REST APIs, microservices, and cloud-native solutions. Currently leading backend teams at TCS.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in-up animation-delay-800">
            <button
              onClick={() => scrollToSection('contact')}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
            >
              Get In Touch
            </button>
            <a
              href="/Resume26.pdf"
              download="Resume26.pdf"
              className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 border flex items-center justify-center gap-2 ${isDark ? 'border-slate-600 text-white hover:bg-slate-800' : 'border-slate-300 text-slate-900 hover:bg-slate-100'}`}
            >
              <Download className="w-5 h-5" />
              Download Resume
            </a>
          </div>

          <div className="flex justify-center gap-6 animate-fade-in-up animation-delay-1000">
            <a href="https://linkedin.com/in/rajnesh-ranjan/" target="_blank" rel="noopener noreferrer" className={`p-3 rounded-full transition-all hover:scale-110 ${isDark ? 'bg-slate-800 hover:bg-blue-600' : 'bg-slate-200 hover:bg-blue-500'}`}>
              <Linkedin className={`w-6 h-6 ${isDark ? 'text-slate-400' : 'text-slate-700'}`} />
            </a>
            <a href="mailto:rajneshranjan5@gmail.com" className={`p-3 rounded-full transition-all hover:scale-110 ${isDark ? 'bg-slate-800 hover:bg-pink-600' : 'bg-slate-200 hover:bg-pink-500'}`}>
              <Mail className={`w-6 h-6 ${isDark ? 'text-slate-400' : 'text-slate-700'}`} />
            </a>
            <a href="#" className={`p-3 rounded-full transition-all hover:scale-110 ${isDark ? 'bg-slate-800 hover:bg-slate-700' : 'bg-slate-200 hover:bg-slate-400'}`}>
              <Github className={`w-6 h-6 ${isDark ? 'text-slate-400' : 'text-slate-700'}`} />
            </a>
          </div>

          <div className="mt-12 animate-bounce">
            <ChevronDown className={`w-6 h-6 mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'}`} />
          </div>
        </div>
      </section>

      {/* About Section - Minimalist */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className={`text-4xl font-bold mb-12 text-center ${isDark ? 'text-white' : 'text-slate-900'}`}>About Me</h2>

          <div className={`rounded-2xl p-8 sm:p-12 ${isDark ? 'bg-gradient-to-br from-slate-800/50 to-slate-900/50' : 'bg-gradient-to-br from-slate-50 to-slate-100'} border ${isDark ? 'border-slate-700' : 'border-slate-200'}`}>
            <p className={`text-lg leading-relaxed mb-6 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              I'm a Lead Backend Engineer with 4+ years of experience building scalable systems and leading technical teams. My passion lies in designing robust APIs, optimizing database performance, and leveraging AI to accelerate development cycles.
            </p>

            <p className={`text-lg leading-relaxed mb-6 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              At TCS, I've led a team of 5 backend engineers and created an AI-powered API generator that reduced development time from days to under 1 hour—a 60%+ boost in team productivity. I've architected and maintained 100+ REST APIs with a focus on reliability, performance, and low defect rates.
            </p>

            <p className={`text-lg leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Beyond coding, I'm passionate about system design, mentoring junior engineers, and exploring how AI can transform development workflows. When I'm not building backends, I'm probably optimizing queries or learning new technologies.
            </p>

            <div className="grid grid-cols-3 gap-4 mt-10">
              <div className={`p-4 rounded-xl text-center ${isDark ? 'bg-slate-700/50' : 'bg-white/50'}`}>
                <div className="text-3xl font-bold text-blue-500">4+</div>
                <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Years Experience</div>
              </div>
              <div className={`p-4 rounded-xl text-center ${isDark ? 'bg-slate-700/50' : 'bg-white/50'}`}>
                <div className="text-3xl font-bold text-purple-500">5</div>
                <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Team Members Led</div>
              </div>
              <div className={`p-4 rounded-xl text-center ${isDark ? 'bg-slate-700/50' : 'bg-white/50'}`}>
                <div className="text-3xl font-bold text-pink-500">100+</div>
                <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>APIs Built</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className={`text-4xl font-bold mb-12 text-center ${isDark ? 'text-white' : 'text-slate-900'}`}>Experience</h2>

          <div className="space-y-8">
            {experiences.map((exp, idx) => (
              <div
                key={idx}
                className={`rounded-xl p-6 sm:p-8 border transition-all duration-300 hover:shadow-lg ${isDark ? 'bg-slate-800/50 border-slate-700 hover:border-slate-600' : 'bg-slate-50 border-slate-200 hover:border-slate-300'} group`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                  <div>
                    <h3 className={`text-2xl font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>{exp.title}</h3>
                    <p className={`text-lg ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{exp.company}</p>
                  </div>
                  <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold mt-4 sm:mt-0 ${isDark ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'}`}>
                    {exp.period}
                  </span>
                </div>

                <ul className="space-y-3">
                  {exp.highlights.map((highlight, hidx) => (
                    <li key={hidx} className={`flex gap-3 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      <span className="text-blue-500 font-bold mt-1">▪</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section - Neumorphism */}
      <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-4xl font-bold mb-12 text-center ${isDark ? 'text-white' : 'text-slate-900'}`}>Technical Skills</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, idx) => (
              <div
                key={idx}
                className={`rounded-2xl p-6 transition-all duration-300 hover:scale-105 cursor-pointer group ${isDark ? 'bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 hover:border-slate-600' : 'bg-white border border-slate-200 hover:shadow-xl'}`}
              >
                <div className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center bg-gradient-to-br ${skill.color} text-white group-hover:shadow-lg transition-all`}>
                  {skill.icon}
                </div>

                <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>{skill.category}</h3>

                <div className="space-y-2">
                  {skill.items.map((item, iidx) => (
                    <div
                      key={iidx}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${isDark ? 'bg-slate-700/50 text-slate-300 group-hover:bg-slate-700' : 'bg-slate-100 text-slate-700 group-hover:bg-slate-200'}`}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Additional Skills */}
          <div className={`mt-12 rounded-2xl p-8 ${isDark ? 'bg-slate-800/50 border border-slate-700' : 'bg-slate-50 border border-slate-200'}`}>
            <h3 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>Other Proficiencies</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {['Git', 'Docker', 'Linux', 'API Design', 'Database Design', 'Agile/Scrum', 'System Design', 'TDD'].map((skill, idx) => (
                <div
                  key={idx}
                  className={`px-4 py-3 rounded-lg text-center font-medium transition-all hover:scale-105 ${isDark ? 'bg-slate-700 text-slate-300 hover:bg-blue-600' : 'bg-white border border-slate-200 text-slate-700 hover:bg-blue-500 hover:text-white'}`}
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-4xl font-bold mb-12 text-center ${isDark ? 'text-white' : 'text-slate-900'}`}>Key Projects</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, idx) => (
              <div
                key={idx}
                className={`rounded-2xl p-8 transition-all duration-300 group overflow-hidden ${isDark ? 'bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700' : 'bg-white border border-slate-200'} hover:shadow-2xl`}
              >
                <div className={`text-5xl mb-4 group-hover:scale-110 transition-transform`}>{project.icon}</div>

                <h3 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>{project.title}</h3>

                <p className={`mb-4 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, tidx) => (
                    <span
                      key={tidx}
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${isDark ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-700'}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className={`p-3 rounded-lg text-sm font-bold ${isDark ? 'bg-green-500/20 text-green-300' : 'bg-green-100 text-green-700'}`}>
                  📈 {project.impact}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education & Certifications */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className={`text-4xl font-bold mb-12 text-center ${isDark ? 'text-white' : 'text-slate-900'}`}>Education & Certifications</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Education */}
            <div className={`rounded-2xl p-8 ${isDark ? 'bg-gradient-to-br from-blue-900/30 to-blue-800/30 border border-blue-700/50' : 'bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200'}`}>
              <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-blue-300' : 'text-blue-900'}`}>Education</h3>
              <div>
                <h4 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Bachelor of Technology</h4>
                <p className={`${isDark ? 'text-blue-300' : 'text-blue-700'}`}>Computer Science Engineering</p>
                <p className={`mb-4 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Guru Gobind Singh Indraprastha University, Delhi</p>
                <p className={`${isDark ? 'text-slate-400' : 'text-slate-600'}`}>2016 - 2020</p>
              </div>
            </div>

            {/* Certifications */}
            <div className={`rounded-2xl p-8 ${isDark ? 'bg-gradient-to-br from-purple-900/30 to-purple-800/30 border border-purple-700/50' : 'bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200'}`}>
              <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-purple-300' : 'text-purple-900'}`}>Certifications</h3>
              <ul className="space-y-3">
                <li className={`${isDark ? 'text-slate-300' : 'text-slate-700'}`}>✓ AWS Certified Developer – Associate (In Progress)</li>
                <li className={`${isDark ? 'text-slate-300' : 'text-slate-700'}`}>✓ Agile Development Practices (TCS)</li>
                <li className={`${isDark ? 'text-slate-300' : 'text-slate-700'}`}>✓ Database Design & Optimization</li>
                <li className={`${isDark ? 'text-slate-300' : 'text-slate-700'}`}>✓ Django (TCS)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <h2 className={`text-4xl font-bold mb-8 text-center ${isDark ? 'text-white' : 'text-slate-900'}`}>Get In Touch</h2>

          <div className={`rounded-2xl p-8 sm:p-12 ${isDark ? 'bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700' : 'bg-gradient-to-br from-white to-slate-50 border border-slate-200'}`}>
            <p className={`text-center mb-8 text-lg ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              I'm always interested in hearing about new opportunities and interesting projects. Feel free to reach out!
            </p>

            <form className="space-y-6" onSubmit={handleFormSubmit}>
              <div>
                <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  className={`w-full px-4 py-3 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDark ? 'bg-slate-700 border border-slate-600 text-white' : 'bg-slate-100 border border-slate-300 text-slate-900'}`}
                  placeholder="Your Name"
                />
              </div>

              <div>
                <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  className={`w-full px-4 py-3 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDark ? 'bg-slate-700 border border-slate-600 text-white' : 'bg-slate-100 border border-slate-300 text-slate-900'}`}
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Message</label>
                <textarea
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleFormChange}
                  className={`w-full px-4 py-3 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${isDark ? 'bg-slate-700 border border-slate-600 text-white' : 'bg-slate-100 border border-slate-300 text-slate-900'}`}
                  placeholder="Your message..."
                ></textarea>
              </div>

              {submitMessage.text && (
                <div className={`p-4 rounded-lg text-center font-medium ${
                  submitMessage.type === 'success' 
                    ? isDark ? 'bg-green-500/20 text-green-300' : 'bg-green-100 text-green-700'
                    : isDark ? 'bg-red-500/20 text-red-300' : 'bg-red-100 text-red-700'
                }`}>
                  {submitMessage.text}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-slate-700">
              <p className={`text-center font-semibold mb-6 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Or connect with me directly:</p>
              <div className="flex justify-center gap-6">
                <a href="mailto:rajneshranjan5@gmail.com" className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${isDark ? 'bg-slate-700 hover:bg-pink-600 text-slate-300' : 'bg-slate-200 hover:bg-pink-500 text-slate-700 hover:text-white'}`}>
                  <Mail className="w-5 h-5" />
                  Email
                </a>
                <a href="https://linkedin.com/in/rajnesh-ranjan/" target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${isDark ? 'bg-slate-700 hover:bg-blue-600 text-slate-300' : 'bg-slate-200 hover:bg-blue-500 text-slate-700 hover:text-white'}`}>
                  <Linkedin className="w-5 h-5" />
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`${isDark ? 'bg-slate-900 border-t border-slate-800' : 'bg-slate-100 border-t border-slate-200'} py-8 px-4`}>
        <div className="max-w-7xl mx-auto text-center">
          <p className={`${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            © 2026 Rajnesh Kr. Ranjan. All rights reserved. | Designed with ❤️
          </p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
        }

        .animation-delay-600 {
          animation-delay: 0.6s;
        }

        .animation-delay-800 {
          animation-delay: 0.8s;
        }

        .animation-delay-1000 {
          animation-delay: 1s;
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .animate-bounce {
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}

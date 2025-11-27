import React, { useState, useEffect, useRef, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; // Import the CSS file
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  Download, 
  Moon, 
  Sun, 
  Code, 
  Terminal, 
  ExternalLink,
  Award,
  BookOpen,
  Briefcase,
  MapPin,
  Calendar,
  Cpu,
  Server,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';

// --- Configuration ---
// 若您有實際的 PDF 檔案連結（例如放在 public 資料夾或是雲端連結），請填入此處。
// 若留空，點擊按鈕時將會觸發網頁列印功能（可另存為 PDF），並使用下方 PrintResume 的樣式。
const RESUME_FILE_URL = ""; 

// --- CV Data ---
const CV_DATA = {
  name: "Sheng Hao Huang",
  title: "Firmware Engineer",
  contact: {
    phone: "+886-939-225-969",
    email: "tw824679513@gmail.com",
    location: "Taipei, Taiwan 🇹🇼",
    linkedin: "https://www.linkedin.com/in/sheng-hao-huang-210632191/"
  },
  education: [
    {
      school: "National Taiwan University",
      degree: "Master of Mechanical Engineering",
      date: "Sep 2019 – Aug 2021",
      details: "GPA : 3.9/4.3"
    },
    {
      school: "National Taiwan University of Science and Technology",
      degree: "Bachelor of Mechanical Engineering",
      date: "Sep 2015 – Jun 2019"
    }
  ],
  experience: [
    {
      company: "PHISON Electronics Corp.",
      role: "Firmware Engineer",
      location: "Taiwan",
      date: "Jul 2022 – Present",
      points: [
        <>Developed <strong className="text-orange-600 dark:text-yellow-400 font-bold">PCIe Gen5 SSD firmware</strong> for both consumer and enterprise devices across various form factors.</>,
        <>Developed <strong className="text-orange-600 dark:text-yellow-400 font-bold">backend algorithms</strong> for <strong className="text-orange-600 dark:text-yellow-400 font-bold">TLC/QLC NAND</strong>, emphasizing <strong className="text-orange-600 dark:text-yellow-400 font-bold">reliability</strong> and <strong className="text-orange-600 dark:text-yellow-400 font-bold">NAND error correction</strong>.</>,
        <>Drove <strong className="text-orange-600 dark:text-yellow-400 font-bold">NAND device bring-up</strong>, conducting feature characterization and analysis.</>,
        <>Collaborated with cross-functional teams to bring up <strong className="text-orange-600 dark:text-yellow-400 font-bold">large-capacity SSDs (up to 128TB)</strong>, ensuring performance and compatibility.</>,
        <>Built <strong className="text-orange-600 dark:text-yellow-400 font-bold">Python tools</strong> to <strong className="text-orange-600 dark:text-yellow-400 font-bold">automate validation, log analysis, and debugging workflows</strong>.</>
      ]
    },
    {
      company: "Technical University Ilmenau",
      role: "Master Researcher",
      location: "Germany",
      date: "Oct 2021 – Apr 2022",
      points: [
        <>Designed and developed the <strong className="text-orange-600 dark:text-yellow-400 font-bold">core reconstruction algorithm</strong> for the <strong className="text-orange-600 dark:text-yellow-400 font-bold">Nano-Positioning and Nano-Measuring Machine (NPMM)</strong> project, including <strong className="text-orange-600 dark:text-yellow-400 font-bold">large-field techniques</strong>, <strong className="text-orange-600 dark:text-yellow-400 font-bold">simulating the methodology</strong> and <strong className="text-orange-600 dark:text-yellow-400 font-bold">analyzing the resulting data for validation</strong>.</>
      ]
    }
  ],
  projects: [
    {
      title: "Intelligent robot system integration and development project of MOST",
      subtitle: "",
      date: "Sep 2019 – Jun 2021",
      tech: ["Robotics", "Signal Processing", "System Integration"],
      description: <>Developed <strong className="text-orange-600 dark:text-yellow-400 font-bold">automated robot arm end-effector pose detection system</strong>, including system integration, software development, algorithm design and signal processing.</>
    },
    {
      title: "Automated object recognition and classification system",
      subtitle: "NTU Course project",
      date: "Nov 2019 – Jan 2021",
      tech: ["3D Scanning", "Point Cloud", "Algorithms"],
      description: <>Using a developed <strong className="text-orange-600 dark:text-yellow-400 font-bold">structured light 3D scanner</strong> to reconstruct the point cloud of measured object and implement <strong className="text-orange-600 dark:text-yellow-400 font-bold">point cloud registration algorithm</strong> to achieve object classification and recognition.</>
    },
    {
      title: "Real time machine temperature monitoring",
      subtitle: "NTU course project",
      date: "Nov 2019 – Jan 2021",
      tech: ["NUVOTON M478", "TCP/IP", "IoT", "SPI"],
      description: <>Using <strong className="text-orange-600 dark:text-yellow-400 font-bold">microcontroller (NUVOTON M478)</strong> to get the temperature of K-type thermocouple (MAX 31865) through <strong className="text-orange-600 dark:text-yellow-400 font-bold">SPI protocol</strong> and transmitted data via <strong className="text-orange-600 dark:text-yellow-400 font-bold">lightweight TCP/IP</strong> to a front-end for real-time visualization.</>
    }
  ],
  awards: [
    "Honorable Mention in HIWIN THESIS AWARD 2021",
    "Best Paper Award (First place) in 18th International Conference on Automation Technology 2021",
    "Finalist in 2021 GPM Development of AI Intelligent Competition 2021",
    "Honorable Mention in College Mechanical and Electrical and Creative Implementation Competition 2021"
  ],
  skills: {
    programming: ["C/C++", "Python", "Shell", "Bash", "NAND", "FTL"],
    tools: ["Git", "JIRA", "Logic Analyzer"],
    languages: ["Chinese (Native speaker)", "English (Fluent, TOEIC 820)"]
  }
};

// --- Components ---

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <button 
      onClick={() => setIsDark(!isDark)}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors no-print"
      aria-label="Toggle Theme"
    >
      {isDark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-600" />}
    </button>
  );
};

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleDownload = () => {
    if (RESUME_FILE_URL) {
      // Direct file download if URL is provided
      const link = document.createElement('a');
      link.href = RESUME_FILE_URL;
      link.download = 'Sheng_Hao_Huang_CV.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // Fallback to print view
      window.print();
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Height of fixed header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setMobileMenuOpen(false);
  };

  const NavLinks = ({ mobile = false }) => (
    <>
      {['About', 'Experience', 'Education', 'Projects', 'Awards'].map((item) => (
        <button
          key={item}
          onClick={() => scrollToSection(item.toLowerCase())}
          className={`text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors font-medium ${mobile ? 'text-lg py-2 w-full text-left' : 'text-sm'}`}
        >
          {item}
        </button>
      ))}
    </>
  );

  return (
    <nav className="fixed w-full top-0 z-50 bg-white/90 dark:bg-dark/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 no-print transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <span 
              className="text-xl font-bold font-mono tracking-tighter text-blue-600 dark:text-blue-400 cursor-pointer hover:scale-105 transition-transform" 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              &lt;SH.H /&gt;
            </span>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-6 items-center">
            <NavLinks />
            <div className="h-4 w-px bg-gray-300 dark:bg-gray-700 mx-2"></div>
            <button 
              onClick={handleDownload}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all shadow-md hover:shadow-blue-500/20 active:scale-95 text-sm font-medium"
            >
              <Download className="w-4 h-4" />
              <span>Resume</span>
            </button>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
             <ThemeToggle />
             <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-gray-600 dark:text-gray-300">
               {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
             </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white dark:bg-dark border-b border-gray-200 dark:border-gray-800 shadow-xl p-4 flex flex-col space-y-4">
          <NavLinks mobile />
          <button 
            onClick={handleDownload}
            className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition-all w-full font-medium"
          >
            <Download className="w-4 h-4" />
            <span>Download Resume</span>
          </button>
        </div>
      )}
    </nav>
  );
};

// --- Code Typewriter Component ---
const CodeTypewriter = () => {
  const codeStructure = useMemo(() => [
    [
      { text: "const ", className: "text-purple-400" },
      { text: "engineer ", className: "text-blue-400" },
      { text: "= {", className: "text-yellow-400" },
    ],
    [
      { text: "  name: ", className: "text-blue-300" },
      { text: `"${CV_DATA.name}"`, className: "text-green-400" },
      { text: ",", className: "text-gray-400" },
    ],
    [
      { text: "  role: ", className: "text-blue-300" },
      { text: `"${CV_DATA.title}"`, className: "text-green-400" },
      { text: ",", className: "text-gray-400" },
    ],
    [
      { text: "  location: ", className: "text-blue-300" },
      { text: `"${CV_DATA.contact.location}"`, className: "text-green-400" },
      { text: ",", className: "text-gray-400" },
    ],
    [
      { text: "  stack: [", className: "text-blue-300" },
    ],
    ...CV_DATA.skills.programming.map(skill => ([
       { text: `    "${skill}"`, className: "text-green-400" },
       { text: ",", className: "text-gray-400" },
    ])),
    [
      { text: "  ],", className: "text-blue-300" },
    ],
     [
      { text: "  status: ", className: "text-blue-300" },
      { text: `"Building the invisible foundations of tomorrow."`, className: "text-green-400" },
    ],
    [
      { text: "};", className: "text-yellow-400" },
    ]
  ], []);

  const [cursorState, setCursorState] = useState({ line: 0, segment: 0, char: 0 });
  
  // Refs to manage interval mutable state to avoid closure staleness
  const progressRef = useRef({ line: 0, segment: 0, char: 0 });
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const typeNextChar = () => {
      const { line, segment, char } = progressRef.current;
      
      // Check if finished all lines
      if (line >= codeStructure.length) {
         // Reset after a delay
         timeoutRef.current = setTimeout(() => {
            progressRef.current = { line: 0, segment: 0, char: 0 };
            setCursorState({ line: 0, segment: 0, char: 0 });
            typeNextChar();
         }, 3000);
         return;
      }

      const currentLine = codeStructure[line];
      const currentSegment = currentLine[segment];

      // Type character
      if (char < currentSegment.text.length) {
        progressRef.current.char += 1;
      } else {
        // Move to next segment
        if (segment < currentLine.length - 1) {
          progressRef.current.segment += 1;
          progressRef.current.char = 0;
        } else {
          // Move to next line
          progressRef.current.line += 1;
          progressRef.current.segment = 0;
          progressRef.current.char = 0;
        }
      }

      // Update state to trigger render
      setCursorState({ ...progressRef.current });

      // Schedule next char (randomized slightly for realism)
      timeoutRef.current = setTimeout(typeNextChar, 20 + Math.random() * 20);
    };

    // Start typing
    typeNextChar();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [codeStructure]);

  return (
    <div className="font-mono text-sm leading-relaxed w-full h-full">
      {codeStructure.map((line, lIndex) => {
        // If line hasn't started typing yet, don't render
        if (lIndex > cursorState.line) return null;

        return (
          <div key={lIndex} className="whitespace-pre">
            {line.map((segment, sIndex) => {
              let textToShow = "";
              
              if (lIndex < cursorState.line) {
                // Fully completed line
                textToShow = segment.text;
              } else if (lIndex === cursorState.line) {
                // Current line being typed
                if (sIndex < cursorState.segment) {
                   // Completed segment in current line
                   textToShow = segment.text;
                } else if (sIndex === cursorState.segment) {
                   // Current segment being typed
                   textToShow = segment.text.slice(0, cursorState.char);
                }
              }
              
              return (
                <span key={sIndex} className={segment.className}>
                  {textToShow}
                </span>
              );
            })}
            {/* Cursor Logic */}
            {lIndex === cursorState.line && (
               <span className="inline-block w-2 h-4 bg-green-500 align-middle ml-1 animate-pulse"></span>
            )}
          </div>
        );
      })}
      {/* Show cursor at the end even when finished waiting for reset */}
      {cursorState.line >= codeStructure.length && (
         <div className="animate-pulse"><span className="inline-block w-2 h-4 bg-green-500 align-middle"></span></div>
      )}
    </div>
  );
};

const Hero = () => {
  return (
    <section id="about" className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
      {/* Tech Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute right-0 top-0 -z-10 m-auto h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[100px]"></div>

      <div className="max-w-7xl mx-auto px-4 w-full relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          
          {/* Text Content */}
          <div className="md:w-1/2 text-left space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800">
               <Terminal className="w-4 h-4 text-blue-600 dark:text-blue-400" />
               <span className="text-xs font-mono font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                 Firmware Engineer
               </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 dark:text-white">
              Sheng Hao <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400">Huang</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-lg">
              Expertise in architecting high-performance <span className="text-blue-600 dark:text-blue-400 font-semibold">PCIe Gen5 SSD</span> firmware and comprehensive validation tools. Focused on transforming complex NAND logic into reliable storage solutions.
            </p>
            
            <div className="flex flex-wrap gap-3 pt-4">
              {CV_DATA.skills.programming.map((skill) => (
                <span key={skill} className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded text-sm font-mono border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-blue-500 transition-colors cursor-default hover:-translate-y-1 hover:shadow-lg duration-200">
                  {skill}
                </span>
              ))}
            </div>

            <div className="flex space-x-6 pt-6">
              <a href={`mailto:${CV_DATA.contact.email}`} className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors hover:scale-105 transform duration-200">
                <Mail className="w-5 h-5" />
                <span>Email</span>
              </a>
              <a href={CV_DATA.contact.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors hover:scale-105 transform duration-200">
                <Linkedin className="w-5 h-5" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Code/Tech Visual */}
          <div className="md:w-1/2 w-full flex justify-center md:justify-end">
            <div className="w-full max-w-lg bg-gray-900 rounded-xl shadow-2xl border border-gray-800 overflow-hidden transform transition-all hover:scale-[1.02] hover:shadow-blue-500/20 duration-500 min-h-[360px]">
              <div className="bg-gray-800 px-4 py-2 flex items-center space-x-2 border-b border-gray-700">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <div className="flex-1 text-center text-xs font-mono text-gray-400">profile.ts</div>
              </div>
              <div className="p-6 h-full">
                <CodeTypewriter />
              </div>
            </div>
          </div>
          
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block text-gray-400">
         <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-gray-400 rounded-full mt-2"></div>
         </div>
      </div>
    </section>
  );
};

const Experience = () => {
  return (
    <section id="experience" className="py-24 bg-white dark:bg-dark">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center mb-12">
           <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg mr-4">
              <Briefcase className="w-6 h-6 text-blue-600 dark:text-blue-400" />
           </div>
           <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Experience</h2>
        </div>
        
        <div className="relative border-l-2 border-gray-200 dark:border-gray-800 ml-3 md:ml-6 space-y-12">
          {CV_DATA.experience.map((job, idx) => (
            <div key={idx} className="relative pl-8 md:pl-12 group">
              {/* Timeline Dot */}
              <div className="absolute left-[-9px] top-6 w-4 h-4 rounded-full bg-white dark:bg-dark border-4 border-blue-500 transition-all duration-300 group-hover:scale-150 group-hover:border-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
              
              <div className="bg-gray-50 dark:bg-card/50 p-8 rounded-2xl border border-gray-100 dark:border-gray-800 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.01] hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-500/30 cursor-default">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors">
                        {job.role}
                      </h3>
                      <div className="text-lg font-semibold text-blue-600 dark:text-blue-400 mt-1">
                        {job.company}
                      </div>
                    </div>
                    <div className="flex flex-col sm:items-end mt-2 sm:mt-0 text-sm text-gray-500 dark:text-gray-400 font-mono">
                      <span className="flex items-center bg-white dark:bg-gray-800 px-2 py-1 rounded border border-gray-100 dark:border-gray-700"><Calendar className="w-3 h-3 mr-2"/> {job.date}</span>
                      <span className="flex items-center mt-1 bg-white dark:bg-gray-800 px-2 py-1 rounded border border-gray-100 dark:border-gray-700"><MapPin className="w-3 h-3 mr-2"/> {job.location === "Taiwan" ? "🇹🇼 Taiwan" : job.location === "Germany" ? "🇩🇪 Germany" : job.location}</span>
                    </div>
                  </div>

                  <ul className="space-y-4">
                    {job.points.map((point, pIdx) => (
                      <li key={pIdx} className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed flex items-start group/item">
                        <ChevronRight className="w-4 h-4 mr-3 text-blue-500 mt-[2px] flex-shrink-0 transition-transform group-hover/item:translate-x-1" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Education = () => {
  return (
    <section id="education" className="py-24 bg-gray-50 dark:bg-[#0b1120]">
      <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center mb-12">
             <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg mr-4">
                <BookOpen className="w-6 h-6 text-purple-600 dark:text-purple-400" />
             </div>
             <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Education</h2>
          </div>
          <div className="relative border-l-2 border-gray-200 dark:border-gray-800 ml-3 md:ml-6 space-y-12">
            {CV_DATA.education.map((edu, idx) => (
              <div key={idx} className="relative pl-8 md:pl-12 group">
                {/* Timeline Dot (for Education) */}
                <div className="absolute left-[-9px] top-6 w-4 h-4 rounded-full bg-white dark:bg-dark border-4 border-purple-500 transition-all duration-300 group-hover:scale-150 group-hover:border-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>
                
                <div className="bg-white dark:bg-card p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.01] hover:shadow-2xl hover:shadow-purple-500/10 hover:border-purple-500/30 group cursor-default">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                      <h3 className="font-bold text-xl text-gray-900 dark:text-white group-hover:text-purple-500 transition-colors">{edu.school}</h3>
                      <span className="flex items-center mt-1 md:mt-0 bg-white dark:bg-gray-800 px-2 py-1 rounded border border-gray-100 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400 font-mono"><Calendar className="w-3 h-3 mr-2"/> {edu.date}</span>
                  </div>
                  <p className="text-purple-600 dark:text-purple-400 font-semibold text-lg">{edu.degree}</p>
                  {edu.details && (
                    <div className="mt-4 inline-block bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-300 px-3 py-1 rounded-md text-sm font-medium border border-purple-100 dark:border-purple-800">
                      {edu.details}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
      </div>
    </section>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="py-24 bg-white dark:bg-dark">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center mb-12">
           <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg mr-4">
              <Cpu className="w-6 h-6 text-green-600 dark:text-green-400" />
           </div>
           <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Projects</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {CV_DATA.projects.map((project, idx) => (
            <div key={idx} className="group bg-gray-50 dark:bg-card rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 flex flex-col h-full relative transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl hover:shadow-green-500/10 hover:border-green-500/50 cursor-default">
              <div className="p-8 flex-1">
                <div className="flex items-center space-x-2 mb-4">
                   <div className="p-1.5 bg-green-100 dark:bg-green-900/30 rounded text-green-600 dark:text-green-400">
                      <Server className="w-5 h-5" />
                   </div>
                   <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                    {project.title}
                  </h3>
                </div>
                {project.subtitle && <div className="text-xs font-semibold text-green-600 dark:text-green-500 mb-4 uppercase tracking-wide border-l-2 border-green-500 pl-3">{project.subtitle}</div>}
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 leading-relaxed">
                  {project.description}
                </p>
              </div>
              <div className="px-8 pb-8">
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tech.map(t => (
                    <span key={t} className="text-xs px-2.5 py-1 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 font-mono shadow-sm group-hover:border-green-500/30 transition-colors">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="text-xs text-gray-400 font-mono border-t border-gray-200 dark:border-gray-700 pt-4 mt-auto flex justify-between items-center">
                  <span>{project.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Awards = () => {
  return (
    <section id="awards" className="py-24 bg-gray-50 dark:bg-[#0b1120]">
      <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center mb-12">
             <div className="p-2 bg-teal-100 dark:bg-teal-900/20 rounded-lg mr-4">
                <Award className="w-6 h-6 text-teal-600 dark:text-teal-400" />
             </div>
             <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Awards</h2>
          </div>
          <div className="grid gap-4">
            {CV_DATA.awards.map((award, idx) => (
              <div key={idx} className="flex items-center p-6 bg-white dark:bg-card rounded-xl border border-gray-100 dark:border-gray-800 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-lg hover:shadow-teal-500/10 hover:border-teal-500/30 group cursor-default">
                <div className="flex-shrink-0 mr-4 p-3 bg-teal-50 dark:bg-teal-900/20 rounded-full group-hover:bg-teal-100 dark:group-hover:bg-teal-900/30 transition-colors">
                   <Award className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                </div>
                <span className="text-gray-700 dark:text-gray-200 text-sm font-medium leading-relaxed">{award}</span>
              </div>
            ))}
          </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 border-t border-gray-200 dark:border-gray-800 text-center no-print bg-gray-50 dark:bg-dark">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-center space-x-8 mb-8">
          <a href={`mailto:${CV_DATA.contact.email}`} className="p-3 rounded-full bg-white dark:bg-card shadow-sm hover:shadow-md text-gray-400 hover:text-blue-500 transition-all hover:-translate-y-1">
            <Mail className="w-6 h-6" />
          </a>
          <a href={CV_DATA.contact.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white dark:bg-card shadow-sm hover:shadow-md text-gray-400 hover:text-blue-500 transition-all hover:-translate-y-1">
            <Linkedin className="w-6 h-6" />
          </a>
        </div>
        <div className="text-gray-500 dark:text-gray-400 text-sm font-mono">
          © {new Date().getFullYear()} Sheng Hao Huang. Built with React & Tailwind.
        </div>
      </div>
    </footer>
  );
};

// --- Print View Component (Redesigned to match PDF Screenshot) ---
const PrintResume = () => {
  return (
    <div className="hidden print:block bg-white text-black p-10 max-w-[210mm] mx-auto font-serif leading-snug">
       {/* Header */}
       <div className="text-center border-b-2 border-black pb-4 mb-6">
          <h1 className="text-3xl font-bold uppercase tracking-wide mb-2 font-serif">{CV_DATA.name}</h1>
          <div className="flex justify-center items-center flex-wrap gap-2 text-[11pt] text-gray-900">
             <span>{CV_DATA.contact.phone}</span>
             <span>/</span>
             <span>{CV_DATA.contact.email}</span>
          </div>
       </div>

       {/* Education */}
       <section className="mb-6">
         <h2 className="text-[12pt] font-bold uppercase border-b border-black mb-3 font-serif">EDUCATION</h2>
         {CV_DATA.education.map((edu, i) => (
            <div key={i} className="mb-4">
               <div className="flex justify-between items-baseline">
                  <span className="font-bold text-[11pt]">{edu.school}</span>
                  <span className="text-[11pt]">{edu.date}</span>
               </div>
               <div className="flex justify-between text-[11pt] italic">
                  <span>{edu.degree}</span>
               </div>
               {edu.details && <div className="text-[11pt]">{edu.details}</div>}
            </div>
         ))}
       </section>

       {/* Experience */}
       <section className="mb-6">
         <h2 className="text-[12pt] font-bold uppercase border-b border-black mb-3 font-serif">WORK EXPERIENCE</h2>
         {CV_DATA.experience.map((exp, i) => (
            <div key={i} className="mb-5 break-inside-avoid">
               <div className="flex justify-between items-baseline mb-1">
                  <div className="text-[11pt]">
                    <span className="font-bold">{exp.company}</span> — <span className="italic">{exp.role}, {exp.location === "Taiwan" ? "🇹🇼 Taiwan" : exp.location === "Germany" ? "🇩🇪 Germany" : exp.location}</span>
                  </div>
                  <span className="text-[11pt]">{exp.date}</span>
               </div>
               <ul className="list-disc list-outside ml-5 text-[10.5pt] space-y-1">
                  {exp.points.map((pt, j) => (
                     <li key={j} className="pl-1 leading-tight">{pt}</li>
                  ))}
               </ul>
            </div>
         ))}
       </section>
       
       {/* Projects */}
       <section className="mb-6">
         <h2 className="text-[12pt] font-bold uppercase border-b border-black mb-3 font-serif">PROJECT EXPERIENCE</h2>
         {CV_DATA.projects.map((proj, i) => (
            <div key={i} className="mb-4 break-inside-avoid">
               <div className="flex justify-between items-baseline text-[11pt]">
                  <span className="font-bold">{proj.title}</span>
                  <span>{proj.date}</span>
               </div>
               {proj.subtitle && <div className="text-[11pt] italic mb-1">{proj.subtitle}</div>}
               <ul className="list-disc list-outside ml-5 text-[10.5pt] mt-1">
                  <li className="pl-1 leading-tight">{proj.description}</li>
               </ul>
            </div>
         ))}
       </section>

        {/* Awards */}
       <section className="mb-6">
         <h2 className="text-[12pt] font-bold uppercase border-b border-black mb-3 font-serif">ACADEMIC AWARDS</h2>
         <ul className="list-disc list-outside ml-5 text-[10.5pt] space-y-1">
            {CV_DATA.awards.map((award, i) => (
                <li key={i} className="pl-1 flex justify-between">
                  <span>{award.split('(')[0]}</span>
                  <span className="ml-2">{award.includes('(') ? award.split('(').pop()?.replace(')', '') : '2021'}</span>
                </li>
            ))}
         </ul>
       </section>

       {/* Skills */}
       <section className="break-inside-avoid">
         <h2 className="text-[12pt] font-bold uppercase border-b border-black mb-3 font-serif">SKILLS & INTERESTS</h2>
         <ul className="list-disc list-outside ml-5 text-[10.5pt] space-y-1">
            <li className="pl-1"><span className="font-bold">Programming:</span> {CV_DATA.skills.programming.join(", ")}</li>
            <li className="pl-1"><span className="font-bold">Development tool:</span> {CV_DATA.skills.tools.join(", ")}</li>
            <li className="pl-1"><span className="font-bold">Language:</span> {CV_DATA.skills.languages.join(", ")}</li>
         </ul>
       </section>
    </div>
  );
};

const App = () => {
  return (
    <>
      {/* Web View - Hidden on Print */}
      <div className="print:hidden bg-gray-50 text-slate-900 dark:bg-dark dark:text-slate-100 font-sans selection:bg-blue-500 selection:text-white transition-colors duration-300">
        <Header />
        <main>
          <Hero />
          <Experience />
          <Education />
          <Projects />
          <Awards />
        </main>
        <Footer />
      </div>

      {/* Print View - Visible only on Print */}
      <PrintResume />
    </>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
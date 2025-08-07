import React, { useState, useEffect, useRef } from 'react';

// I. HELPER COMPONENTS & ICONS
const useOnScreen = (options) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, options);
    if (ref.current) { observer.observe(ref.current); }
    return () => { if (ref.current) { observer.unobserve(ref.current); } };
  }, [ref, options]);
  return [ref, isVisible];
};

const AnimatedSection = ({ children }) => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });
  return (
    <div ref={ref} className={`transition-opacity duration-1000 ${isVisible ? 'opacity-100 animate-fade-in-up' : 'opacity-0'}`}>
      {children}
    </div>
  );
};

const CodeIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>);
const MentorshipIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>);
const SchoolIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-5.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-5.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222 4 2.222V20M1 12v7a2 2 0 002 2h18a2 2 0 002-2v-7" /></svg>);
const TrophyIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z" transform="translate(0, 1)"/><path strokeLinecap="round" strokeLinejoin="round" d="M19.428 10.428a8.001 8.001 0 00-14.856 0A8.001 8.001 0 0012 21.9a8.001 8.001 0 007.428-11.472zM12 6v6m0 0v6m0-6h6m-6 0H6" transform="scale(0.8) translate(3, 3)"/><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-2a3 3 0 013-3h0a3 3 0 013 3v2" /><path strokeLinecap="round" strokeLinejoin="round" d="M5 13a2 2 0 012-2h10a2 2 0 012 2v2a2 2 0 01-2 2H7a2 2 0 01-2-2v-2z" transform="translate(0, 2)"/><path strokeLinecap="round" strokeLinejoin="round" d="M12 21.9c-1.5 0-2.8-.5-3.8-1.4" /><path strokeLinecap="round" strokeLinejoin="round" d="M15.8 20.5c-1 .9-2.3 1.4-3.8 1.4s-2.8-.5-3.8-1.4" transform="scale(-1, 1) translate(-24, 0)"/></svg>);
const WhatsAppIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99 0-3.902-.539-5.586-1.544l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.886-.001 2.269.655 4.357 1.849 6.075l-1.266 4.625 4.733-1.241z" /></svg>);

// II. PAGE COMPONENTS
const Header = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = [{ name: 'Home', page: 'home' }, { name: 'Services', page: 'services' }, { name: 'School Programs', page: 'school' }, { name: 'About Us', page: 'about' }, { name: 'Contact', page: 'contact' }];
  return (
    <nav className="bg-slate-900/70 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center"><div className="flex-shrink-0"><span className="text-white text-2xl font-bold tracking-wider">Innovizta<span className="text-cyan-400">.</span></span></div></div>
          <div className="hidden md:block"><div className="ml-10 flex items-baseline space-x-4">{navLinks.map((link) => (<button key={link.name} onClick={() => onNavigate(link.page)} className="text-gray-300 hover:bg-slate-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">{link.name}</button>))}</div></div>
          <div className="hidden md:block"><WhatsAppButton text="Get a Free Consultation"/></div>
          <div className="-mr-2 flex md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} type="button" className="bg-slate-800 inline-flex items-center justify-center p-2 rounded-md text-cyan-400 hover:text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              {isOpen ? (<svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>) : (<svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>)}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (<div className="md:hidden" id="mobile-menu"><div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">{navLinks.map((link) => (<button key={link.name} onClick={() => { onNavigate(link.page); setIsOpen(false); }} className="text-gray-300 hover:bg-slate-700 hover:text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors">{link.name}</button>))} <div className="pt-4 px-3"><WhatsAppButton text="Free Consultation"/></div></div></div>)}
    </nav>
  );
};

const WhatsAppButton = ({ text }) => {
    const phoneNumber = "911234567890"; // IMPORTANT: Replace with your actual WhatsApp number
    const message = "Hello, I'm interested in a free consultation for a project.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    return (<a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-cyan-500 hover:bg-cyan-600 transition-transform hover:scale-105 transform shadow-lg"><WhatsAppIcon/> {text}</a>);
};

const HomePage = ({ onNavigate }) => {
  return (
    <div className="space-y-24 md:space-y-32">
      <section className="relative text-white text-center pt-24 pb-32">
        <div className="absolute top-0 left-0 w-full h-full bg-slate-900 opacity-40" style={{ backgroundImage: 'url(https://placehold.co/1920x1080/0f172a/transparent?text=)' }}></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-slate-900 to-transparent"></div>
        <div className="relative max-w-4xl mx-auto px-4 z-10">
          <AnimatedSection>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">Transform Your Project Idea into Reality with <span className="text-cyan-400">One-on-One Mentorship</span></h1>
            <p className="mt-6 text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">From ideation to final submission, we provide dedicated guidance and end-to-end support to help you build unique, high-quality projects.</p>
            <div className="mt-10"><div className="animate-subtle-pulse"><WhatsAppButton text="Get Your Free 1-Hour Consultation"/></div></div>
          </AnimatedSection>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
              <div className="bg-slate-800/50 rounded-2xl p-8 md:p-12 border border-slate-700 shadow-xl">
                  <div className="text-center"><h2 className="text-3xl font-bold text-white tracking-tight">Proven Expertise, Real Results</h2><p className="mt-4 text-lg text-slate-400">Our founders aren't just mentors; they are active creators and competitors.</p></div>
                  <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                      <div className="flex flex-col items-center"><TrophyIcon/><h3 className="text-xl font-semibold text-white">Hackathon Winners</h3><p className="mt-2 text-slate-400">Multiple first-place victories in national-level hackathons.</p></div>
                      <div className="flex flex-col items-center"><TrophyIcon/><h3 className="text-xl font-semibold text-white">Innovative Prototyping</h3><p className="mt-2 text-slate-400">Recognized for excellence in hardware and software integration.</p></div>
                      <div className="flex flex-col items-center"><TrophyIcon/><h3 className="text-xl font-semibold text-white">Community Leaders</h3><p className="mt-2 text-slate-400">Mentored dozens of students to project success and competition wins.</p></div>
                  </div>
              </div>
          </AnimatedSection>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedSection><h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Our Core Services</h2><p className="mt-4 text-lg text-slate-400">A complete ecosystem for your technical and academic growth.</p></AnimatedSection>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <AnimatedSection><div onClick={() => onNavigate('services')} className="cursor-pointer group bg-slate-800 p-8 rounded-xl border border-slate-700 hover:border-cyan-500 hover:-translate-y-2 transition-all duration-300 shadow-lg"><MentorshipIcon /><h3 className="mt-4 text-xl font-bold text-white">Custom Project Development</h3><p className="mt-2 text-slate-400">We build on your idea, or help you ideate from scratch, providing one-on-one mentorship throughout.</p></div></AnimatedSection>
          <AnimatedSection><div onClick={() => onNavigate('services')} className="cursor-pointer group bg-slate-800 p-8 rounded-xl border border-slate-700 hover:border-cyan-500 hover:-translate-y-2 transition-all duration-300 shadow-lg"><CodeIcon /><h3 className="mt-4 text-xl font-bold text-white">Hands-On Internships</h3><p className="mt-2 text-slate-400">Get a free internship with our project help, or opt for a flexible standalone internship experience.</p></div></AnimatedSection>
          <AnimatedSection><div onClick={() => onNavigate('school')} className="cursor-pointer group bg-slate-800 p-8 rounded-xl border border-slate-700 hover:border-cyan-500 hover:-translate-y-2 transition-all duration-300 shadow-lg"><SchoolIcon /><h3 className="mt-4 text-xl font-bold text-white">Edu-Tech for Schools</h3><p className="mt-2 text-slate-400">Empowering the next generation with STEM, IoT, and project-based learning for competitions.</p></div></AnimatedSection>
        </div>
      </section>
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="bg-slate-800/50 rounded-lg p-8 text-center border border-slate-700">
            <img className="w-24 h-24 rounded-full mx-auto" src="https://placehold.co/100x100/e2e8f0/1e293b?text=S" alt="Student Testimonial" />
            <blockquote className="mt-6 text-slate-300 italic"><p>"The one-on-one guidance was a game-changer. My simple idea for an IoT device became an award-winning project, all thanks to the team at Innovizta. They helped with everything from coding to the final viva prep."</p></blockquote>
            <cite className="mt-4 block font-semibold text-white not-italic">Priya S., B.Tech Final Year</cite>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
};

const ServicesPage = () => {
    const ComingSoonCard = ({ title, description }) => (
        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 text-center relative overflow-hidden">
            <div className="absolute top-2 right-2 bg-amber-500 text-slate-900 text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider">Coming Soon</div>
            <h3 className="text-xl font-bold text-white mt-4">{title}</h3><p className="mt-2 text-slate-400">{description}</p>
            <div className="mt-4 w-full bg-slate-700 rounded-full h-2.5"><div className="bg-cyan-500 h-2.5 rounded-full" style={{width: '25%'}}></div></div>
            <button className="mt-6 w-full bg-slate-700 text-white font-semibold py-2 px-4 rounded-lg hover:bg-slate-600 transition-colors cursor-not-allowed opacity-60">Notify Me</button>
        </div>
    );
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-white">
            <AnimatedSection><div className="text-center"><h1 className="text-4xl font-extrabold tracking-tight">Our Services</h1><p className="mt-4 max-w-2xl mx-auto text-lg text-slate-300">A comprehensive suite of technical services and mentorship programs.</p></div></AnimatedSection>
            <AnimatedSection>
                <div className="mt-16">
                    <h2 className="text-3xl font-bold tracking-tight text-cyan-400">For University Students</h2>
                    <div className="mt-8 grid md:grid-cols-2 gap-8">
                        <div className="bg-slate-800 p-8 rounded-xl border border-slate-700"><MentorshipIcon /><h3 className="mt-4 text-2xl font-bold">Customized Project Development</h3><p className="mt-4 text-slate-300">Our flagship service. We partner with you to turn your vision into a fully functional project. Our process includes:</p><ul className="mt-4 space-y-2 list-disc list-inside text-slate-300"><li>One-on-one ideation and brainstorming sessions.</li><li>Personalized mentorship with a dedicated expert.</li><li>Full support with documentation and viva preparation.</li><li>Hands-on guidance with hardware and software.</li></ul></div>
                        <div className="bg-slate-800 p-8 rounded-xl border border-slate-700"><CodeIcon/><h3 className="mt-4 text-2xl font-bold">Flexible Internships</h3><p className="mt-4 text-slate-300">Gain invaluable practical experience. We offer two models:</p><ul className="mt-4 space-y-2 list-disc list-inside text-slate-300"><li><span className="font-semibold text-white">Free Internship:</span> Included for all students who develop their projects with us.</li><li><span className="font-semibold text-white">Standalone Internship:</span> Flexible duration (from 7 days to a full month) for focused skill development.</li></ul></div>
                    </div>
                </div>
            </AnimatedSection>
            <AnimatedSection>
                <div className="mt-16"><h2 className="text-3xl font-bold tracking-tight">Future Offerings</h2><div className="mt-8 grid md:grid-cols-2 gap-8"><ComingSoonCard title="Ready-to-Buy Projects" description="Complete project kits with hardware, code, and documentation, ready for submission."/><ComingSoonCard title="GPU as a Service" description="Access our powerful GPU resources to train your custom AI/ML models without the expensive hardware."/></div></div>
            </AnimatedSection>
            <AnimatedSection>
                 <div className="mt-16">
                    <h2 className="text-3xl font-bold tracking-tight">Specialized Technical Services</h2>
                     <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 text-center">{['3D Printing', '3D Designing', 'PCB Designing', 'IoT Integration', 'AI/ML Training'].map(service => (<div key={service} className="bg-slate-800 p-6 rounded-lg border border-slate-700 hover:bg-slate-700 transition-colors"><p className="font-semibold">{service}</p></div>))}</div>
                </div>
            </AnimatedSection>
        </div>
    );
};

const SchoolProgramsPage = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-white">
            <AnimatedSection><div className="text-center"><h1 className="text-4xl font-extrabold tracking-tight">Edu-Tech Programs for Schools</h1><p className="mt-4 max-w-2xl mx-auto text-lg text-slate-300">Igniting curiosity and building future-ready skills for young innovators.</p></div></AnimatedSection>
            <AnimatedSection>
                <div className="mt-16 grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-cyan-400">Win Science Fairs & Competitions</h2>
                        <p className="mt-4 text-slate-300">Our programs are specifically designed to give school students a competitive edge. We focus on hands-on, project-based learning that translates into impressive, award-winning projects for science fairs and tech competitions.</p>
                        <ul className="mt-6 space-y-4"><li className="flex items-start"><SchoolIcon /><div className="ml-4"><h3 className="text-lg font-semibold">STEM & IoT Kits</h3><p className="text-slate-400">Engaging, easy-to-use kits that teach the fundamentals of circuits, coding, and the Internet of Things.</p></div></li><li className="flex items-start"><MentorshipIcon /><div className="ml-4"><h3 className="text-lg font-semibold">Expert-Led Classes</h3><p className="text-slate-400">Interactive classes and workshops that guide students from basic concepts to building their own unique projects.</p></div></li></ul>
                        <div className="mt-8"><WhatsAppButton text="Inquire About School Programs" /></div>
                    </div>
                     <div className="grid grid-cols-2 gap-4">
                        <img src="https://placehold.co/600x400/1e293b/94a3b8?text=Class+Photo+1" alt="Students in a class" className="rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300" />
                        <img src="https://placehold.co/600x400/1e293b/94a3b8?text=Project+Kit" alt="A project kit" className="rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 mt-8" />
                        <img src="https://placehold.co/600x400/1e293b/94a3b8?text=Student+Project" alt="Student project" className="rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300" />
                        <img src="https://placehold.co/600x400/1e293b/94a3b8?text=Team+Working" alt="Students working together" className="rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 mt-8" />
                    </div>
                </div>
            </AnimatedSection>
        </div>
    );
};

const AboutUsPage = () => {
    const FounderProfile = ({ name, title, imageUrl, bio, achievements }) => (
        <div className="bg-slate-800/50 rounded-lg p-6 text-center border border-slate-700 transform hover:scale-105 hover:border-cyan-400 transition-all duration-300">
            <img className="w-32 h-32 rounded-full mx-auto" src={imageUrl} alt={`Photo of ${name}`} />
            <h3 className="mt-4 text-2xl font-bold text-white">{name}</h3><p className="text-cyan-400 font-semibold">{title}</p>
            <p className="mt-4 text-slate-300">{bio}</p>
            <div className="mt-4 text-left"><h4 className="font-semibold text-white">Key Achievements:</h4><ul className="mt-2 space-y-1 list-disc list-inside text-slate-400">{achievements.map((ach, index) => <li key={index}>{ach}</li>)}</ul></div>
        </div>
    );
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-white">
            <AnimatedSection><div className="text-center"><h1 className="text-4xl font-extrabold tracking-tight">About Innovizta Technologies</h1><p className="mt-4 max-w-3xl mx-auto text-lg text-slate-300">We are a team of passionate innovators dedicated to bridging the gap between academic learning and real-world application.</p></div></AnimatedSection>
            <AnimatedSection><div className="mt-16 text-center max-w-3xl mx-auto"><h2 className="text-3xl font-bold tracking-tight text-cyan-400">Our Mission & Philosophy</h2><p className="mt-4 text-slate-300">Our core mission is to empower students by helping them develop unique, high-quality projects through dedicated one-on-one guidance and comprehensive support. We believe in learning by doing. True innovation comes from hands-on experience, and we provide the resources, mentorship, and environment to make that happen.</p></div></AnimatedSection>
            <AnimatedSection>
                 <div className="mt-20">
                    <h2 className="text-3xl font-bold tracking-tight text-center">Meet the Founders</h2>
                     <div className="mt-8 grid md:grid-cols-2 gap-10">
                        <FounderProfile name="Founder One" title="Co-Founder & Lead Mentor" imageUrl="https://placehold.co/200x200/e2e8f0/1e293b?text=F1" bio="An avid problem-solver and hardware enthusiast with a passion for teaching and building complex IoT systems from the ground up." achievements={["Winner, National IoT Challenge 2024", "First Place, Smart India Hackathon", "Expert in PCB Design & Rapid Prototyping"]}/>
                        <FounderProfile name="Founder Two" title="Co-Founder & AI/ML Specialist" imageUrl="https://placehold.co/200x200/e2e8f0/1e293b?text=F2" bio="A machine learning practitioner who excels at turning data into intelligent applications and mentoring students in advanced algorithms." achievements={["Winner, Data Science Conclave Hackathon", "Published research on predictive modeling", "Specialist in Python, TensorFlow, and Cloud AI"]}/>
                    </div>
                </div>
            </AnimatedSection>
        </div>
    );
};

const ContactPage = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-white">
            <AnimatedSection><div className="text-center"><h1 className="text-4xl font-extrabold tracking-tight">Get in Touch</h1><p className="mt-4 max-w-2xl mx-auto text-lg text-slate-300">Ready to start your project? Have a question? We're here to help. The best way to begin is with a free, no-obligation consultation.</p></div></AnimatedSection>
            <AnimatedSection>
                <div className="mt-16 max-w-lg mx-auto bg-slate-800 rounded-xl p-8 md:p-12 border border-slate-700 text-center">
                    <h2 className="text-2xl font-bold text-cyan-400">Your Free 1-Hour Consultation</h2>
                    <p className="mt-4 text-slate-300">Click the button below to connect with us directly on WhatsApp. We'll discuss your ideas, explore possibilities, and outline a plan for your project.</p>
                    <div className="mt-8 animate-subtle-pulse"><WhatsAppButton text="Start Your Free Consultation Now" /></div>
                    <div className="mt-10 pt-6 border-t border-slate-700"><h3 className="text-xl font-semibold">Or, Contact Us Via Email</h3><a href="mailto:contact@innovizta.tech" className="mt-2 inline-block text-cyan-400 hover:text-cyan-300 transition-colors">contact@innovizta.tech</a></div>
                </div>
            </AnimatedSection>
        </div>
    );
};

const Footer = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1"><span className="text-white text-xl font-bold tracking-wider">Innovizta<span className="text-cyan-400">.</span></span><p className="mt-4 text-slate-400 text-sm">Empowering students through personalized project mentorship and technical services.</p></div>
          <div><h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Navigation</h3><ul className="mt-4 space-y-2"><li><button onClick={() => onNavigate('home')} className="text-base text-slate-300 hover:text-white">Home</button></li><li><button onClick={() => onNavigate('services')} className="text-base text-slate-300 hover:text-white">Services</button></li><li><button onClick={() => onNavigate('school')} className="text-base text-slate-300 hover:text-white">School Programs</button></li><li><button onClick={() => onNavigate('about')} className="text-base text-slate-300 hover:text-white">About Us</button></li></ul></div>
          <div><h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Contact</h3><ul className="mt-4 space-y-2"><li><a href="mailto:contact@innovizta.tech" className="text-base text-slate-300 hover:text-white">Email Us</a></li><li><button onClick={() => onNavigate('contact')} className="text-base text-slate-300 hover:text-white">WhatsApp</button></li></ul></div>
        </div>
        <div className="mt-8 border-t border-slate-800 pt-8 text-center"><p className="text-base text-slate-400">&copy; {new Date().getFullYear()} Innovizta Technologies. All rights reserved.</p></div>
      </div>
    </footer>
  );
};

// III. MAIN APP COMPONENT
function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage onNavigate={setCurrentPage} />;
      case 'services': return <ServicesPage />;
      case 'school': return <SchoolProgramsPage />;
      case 'about': return <AboutUsPage />;
      case 'contact': return <ContactPage />;
      default: return <HomePage onNavigate={setCurrentPage} />;
    }
  };
  useEffect(() => { window.scrollTo(0, 0); }, [currentPage]);
  return (<div className="bg-slate-900 min-h-screen font-sans"><Header onNavigate={setCurrentPage} /><main>{renderPage()}</main><Footer onNavigate={setCurrentPage} /></div>);
}

export default App;
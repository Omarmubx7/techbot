'use client';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Heart, Users, HandHeart, Mail, Phone, MapPin, Calendar, Award, Target } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from 'react'
import QuickAccessTools from "@/components/QuickAccessTools"

export default function AtharVolunteerWebsite() {
  // Function to trigger the chat widget open event
  const openAtharBot = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-atharbot-widget'))
    }
  }

  // Join Us form state and logic
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    heardFrom: '',
  });
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    if (!form.firstName || !form.lastName || !form.email || !form.phone || !form.message || !form.heardFrom) {
      setFormError('Please fill in all fields.');
      return;
    }
    setFormError('');
    try {
      const res = await fetch('/api/join-us', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const result = await res.json();
      if (result.success) {
        setFormSuccess(true);
      } else {
        setFormError('There was an error submitting your application. Please try again.');
      }
    } catch (err) {
      setFormError('There was an error submitting your application. Please try again.');
    }
  };

  const [activeSection, setActiveSection] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'departments', 'tools', 'impact', 'testimonials', 'blog', 'events', 'social', 'team', 'join', 'contact'];
      let found = '';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 80 && rect.bottom >= 80) {
            found = id;
            break;
          }
        }
      }
      setActiveSection(found);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
        <Link href="/" className="flex items-center justify-center">
          <Heart className="h-8 w-8 text-primary" />
          <span className="ml-2 text-2xl font-bold text-gray-900">Athar</span>
        </Link>
        <nav className="ml-auto hidden md:flex gap-4 sm:gap-6">
          {[
            { id: 'about', label: 'About' },
            { id: 'departments', label: 'Departments' },
            { id: 'tools', label: 'Tools' },   
            { id: 'events', label: 'Events' },
            { id: 'social', label: 'Social' },
            { id: 'team', label: 'Team' },
            { id: 'join', label: 'Join Us' },
            { id: 'contact', label: 'Contact' },
          ].map((item) => (
            <Link
              key={item.id}
              href={`#${item.id}`}
              className={`text-sm font-medium transition-colors ${activeSection === item.id ? 'text-primary underline underline-offset-4' : 'hover:text-primary'}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        {/* Mobile menu toggle */}
        <button className="ml-auto md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
        </button>
        {mobileMenuOpen && (
          <div className="absolute top-16 right-4 bg-white rounded shadow-lg flex flex-col gap-2 p-4 z-50 md:hidden">
            {[
              { id: 'about', label: 'About' },
              { id: 'departments', label: 'Departments' },
              { id: 'tools', label: 'Tools' },
              { id: 'impact', label: 'Our Impact' },
              { id: 'testimonials', label: 'Stories' },
              { id: 'blog', label: 'News' },
              { id: 'events', label: 'Events' },
              { id: 'social', label: 'Social' },
              { id: 'team', label: 'Team' },
              { id: 'join', label: 'Join Us' },
              { id: 'contact', label: 'Contact' },
            ].map((item) => (
              <Link
                key={item.id}
                href={`#${item.id}`}
                className={`text-base font-medium transition-colors ${activeSection === item.id ? 'text-primary underline underline-offset-4' : 'hover:text-primary'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-white to-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-gray-900">
                    Welcome to <span className="text-primary">Athar</span>
                  </h1>
                  <p className="max-w-[600px] text-gray-600 md:text-xl">
                    A dedicated volunteer team committed to making a positive impact in our community. Together, we
                    create meaningful change through compassion, action, and unity.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="bg-primary hover:bg-primary-dark">
                    <Link href="#join">Join Our Mission</Link>
                  </Button>
                  <Button variant="outline" size="lg">
                    <Link href="#about">Learn More</Link>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
               <Image   
  src="/htubr.jpg"
  width="600"
  height="400"
  alt="Community service activities"
  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
/>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900">About Athar</h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Athar, meaning "impact" in Arabic, represents our commitment to creating lasting positive change. We
                  are a diverse group of volunteers united by our shared values of compassion, service, and community
                  building.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
             <Image
  src="/htuold.jpg"
  width="400"
  height="400"
  alt="Athar volunteer team in action"
  className="aspect-square overflow-hidden rounded-xl object-cover"
/>
              <div className="flex flex-col justify-center space-y-4">
                <div className="grid gap-6">
                  <div className="flex items-start gap-4">
                    <Target className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Our Mission</h3>
                      <p className="text-gray-600">
                       We support students with empathy and action, handle all suggestions professionally, ease fears around administration and finances, and manage crises with excellence.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Heart className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Our Values</h3>
                      <p className="text-gray-600">
                     Our volunteer team is built on trust, teamwork, respect, and clear communication. We are committed to empathy, accountability, and inclusivity, with a shared focus on integrity and meaningful impact.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Users className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Our Vision</h3>
                      <p className="text-gray-600">
                        Our vision is to earn the trust of students and the university community while building a strong, positive presence through reliability and professionalism.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Departments Section */}
        <section id="departments" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900" id="departments">Our Departments</h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Each department brings unique expertise and passion to serve our community effectively.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-6xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-8">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Image src="/logos/blue logo.png" width="120" height="120" alt="Blue Team Logo for R&D Department" className="mx-auto" />
                  <CardTitle className="text-blue-600">R&D Team</CardTitle>
                  <CardDescription>Research & Development</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Innovating solutions and researching best practices to enhance our volunteer programs and community
                    impact.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Image
                    src="/logos/team-athar-logo.png"
                    width={120}
                    height={120}
                    alt="Team Athar Logo"
                    className="mx-auto object-contain"
                    style={{ background: '#fff', padding: 8, borderRadius: 12 }}
                  />
                  <CardTitle className="text-red-600">Team Athar</CardTitle>
                  <CardDescription>Core Operations</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    The heart of our organization, coordinating activities and ensuring our mission is carried out
                    effectively.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Image src="/logos/brown logo.png" width="120" height="120" alt="Instructors Team Logo" className="mx-auto" />
                  <CardTitle className="text-amber-700">Instructors Team</CardTitle>
                  <CardDescription>Education & Training</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Providing educational programs, workshops, and training sessions to empower community members.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Image src="/logos/green.png" width="120" height="120" alt="Logistics Team Logo" className="mx-auto" />
                  <CardTitle className="text-green-600">Logistics Team</CardTitle>
                  <CardDescription>Operations & Coordination</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Managing resources, coordinating events, and ensuring smooth operations across all our initiatives.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Image src="/logos/yellow.png" width="120" height="120" alt="Media Team Logo" className="mx-auto" />
                  <CardTitle className="text-yellow-600">Media Team</CardTitle>
                  <CardDescription>Communications & Content</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Creating engaging content, managing social media, and documenting our community impact stories.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Image src="/logos/pink.jpg" width="120" height="120" alt="PR Team Logo" className="mx-auto" />
                  <CardTitle className="text-pink-600">PR Team</CardTitle>
                  <CardDescription>Public Relations</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Building relationships with partners, managing communications, and representing Athar in the
                    community.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Tools Section */}
        <section id="tools" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900">
                  Volunteer Tools & Resources
                </h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Essential tools and resources to help our volunteers work effectively and make a greater impact.
                </p>
              </div>
            </div>
            

            {/* Place bus image just before Quick Access Tools */}
            <div className="flex justify-center mt-12 mb-8">
              <Image
                src="/bussystem.png"
                alt="Bus System"
                style={{ maxWidth: '100%', height: 'auto', borderRadius: 16, boxShadow: '0 2px 16px rgba(0,0,0,0.08)' }}
                width={800}
                height={400}
                priority
              />
            </div>

            {/* Quick Access Tools */}
            <QuickAccessTools />
          </div>
        </section>

       

       

        {/* Upcoming Events Section */}
        <section id="events" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900">Upcoming Events</h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join us at our upcoming events and make a difference in the community!
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-3xl items-center gap-6 py-12 lg:grid-cols-1 lg:gap-8">
              <div className="bg-gray-50 rounded-xl p-6 shadow flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="text-primary font-bold text-lg">July 30, 2025</div>
                  <div className="text-xl font-semibold text-gray-900">Putting sticker on the floors door</div>
                  <div className="text-gray-700">Improve the student experience</div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-6 shadow flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="text-primary font-bold text-lg">October 20, 2025</div>
                  <div className="text-xl font-semibold text-gray-900">Welcome 07 – Kickoff Celebration</div>
                  <div className="text-gray-700">Join us as we welcome the newest generation of HTU students!
Meet your classmates, explore student life, and kickstart your journey with fun, food, and unforgettable memories.</div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-6 shadow flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="text-primary font-bold text-lg">Novmber 20, 2025</div>
                  <div className="text-xl font-semibold text-gray-900">Athar Meet & Greet – Join the Impact</div>
                  <div className="text-gray-700">Get to know the volunteer team behind HTU’s biggest student initiatives.
Hear our story, meet the departments, and see how you can be part of something meaningful.</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Media Integration Section */}
        <section id="social" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900">Connect With Us</h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Follow us on social media to stay updated and help spread the word!
                </p>
              </div>
            </div>
            <div className="flex justify-center gap-6 py-8">
              <a href="https://www.instagram.com/athar.htu?igsh=aHB3MXpuNWpyajN2" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg width="32" height="32" fill="currentColor" className="text-pink-600" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608C4.515 2.567 5.782 2.295 7.148 2.233 8.414 2.175 8.794 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.771.131 4.659.363 3.678 1.344c-.98.98-1.213 2.092-1.272 3.373C2.013 5.668 2 6.077 2 12c0 5.923.013 6.332.072 7.613.059 1.281.292 2.393 1.272 3.373.98.98 2.092 1.213 3.373 1.272C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.281-.059 2.393-.292 3.373-1.272.98-.98 1.213-2.092 1.272-3.373.059-1.281.072-1.69.072-7.613 0-5.923-.013-6.332-.072-7.613-.059-1.281-.292-2.393-1.272-3.373-.98-.98-2.092-1.213-3.373-1.272C15.668.013 15.259 0 12 0z"/><path d="M12 5.838A6.162 6.162 0 0 0 5.838 12 6.162 6.162 0 0 0 12 18.162 6.162 6.162 0 0 0 18.162 12 6.162 6.162 0 0 0 12 5.838zm0 10.162A3.999 3.999 0 1 1 12 8a3.999 3.999 0 0 1 0 7.999zm6.406-11.845a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z"/></svg>
              </a>
              
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg width="32" height="32" fill="currentColor" className="text-blue-800" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.327-.027-3.037-1.849-3.037-1.851 0-2.132 1.445-2.132 2.939v5.667H9.358V9h3.414v1.561h.049c.476-.899 1.637-1.849 3.37-1.849 3.602 0 4.267 2.368 4.267 5.455v6.285zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zm1.777 13.019H3.56V9h3.554v11.452zM22.225 0H1.771C.792 0 0 .771 0 1.723v20.549C0 23.229.792 24 1.771 24h20.451C23.2 24 24 23.229 24 22.271V1.723C24 .771 23.2 0 22.225 0z"/></svg>
              </a>
            </div>
            <div className="flex flex-col items-center py-4">
              <div className="w-full max-w-md bg-white rounded-xl shadow p-6">
                <div className="text-gray-700 font-semibold mb-2">Instagram Feed</div>
                <div className="w-full h-40 bg-gray-100 flex items-center justify-center rounded text-gray-400">[Instagram feed preview here]</div>
                <a href="https://www.instagram.com/athar.htu?igsh=aHB3MXpuNWpyajN2" target="_blank" rel="noopener noreferrer" className="text-pink-600 font-medium mt-2 inline-block">@athar.htu</a>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
<section id="faq" className="w-full py-12 md:py-24 lg:py-32 bg-white">
  <div className="container px-4 md:px-6">
    <div className="flex flex-col items-center justify-center space-y-4 text-center">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900">
          Frequently Asked Questions
        </h2>
        <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Find answers to common questions about Athar.
        </p>
      </div>
    </div>
    <div className="mx-auto max-w-2xl py-8 space-y-4">
      

      {/* Custom Athar Questions */}
      <details className="border rounded-lg p-4">
        <summary className="font-semibold cursor-pointer text-primary">What makes Athar different from other student or volunteer groups?</summary>
        <div className="mt-2 text-gray-700">
          Athar combines structured organization with innovation and service. We deliver real impact through a mix of field work, student support, and tech-driven solutions.
        </div>
      </details>
      <details className="border rounded-lg p-4">
        <summary className="font-semibold cursor-pointer text-primary">How many members are currently in Athar?</summary>
        <div className="mt-2 text-gray-700">
          Athar has over 16 active members distributed across six departments including R&D, Media, PR, Logistics, Education.
        </div>
    
      </details>
      <details className="border rounded-lg p-4">
        <summary className="font-semibold cursor-pointer text-primary">How are decisions made within the team?</summary>
        <div className="mt-2 text-gray-700">
          Department leads propose initiatives in regular meetings. Key decisions are discussed and approved by the leadership team collaboratively.
        </div>
      </details>
      <details className="border rounded-lg p-4">
        <summary className="font-semibold cursor-pointer text-primary">How do new volunteers get trained or assigned tasks?</summary>
        <div className="mt-2 text-gray-700">
          New members receive onboarding and are placed in departments based on interest. Coordinators provide training and continuous guidance.
        </div>
      </details>
      <details className="border rounded-lg p-4">
        <summary className="font-semibold cursor-pointer text-primary">What problems will Athar solve for students or the university?</summary>
        <div className="mt-2 text-gray-700">
          Athar will always search how to improve the students experience in HTU
        </div>
      </details>
    
      <details className="border rounded-lg p-4">
        <summary className="font-semibold cursor-pointer text-primary">Is Athar building any platforms or bots to support students?</summary>
        <div className="mt-2 text-gray-700">
          Yes. Our R&D team is building tools like AtharBot to answer FAQs, guide students, and improve access to services through technology.
        </div>
      </details>
      <details className="border rounded-lg p-4">
        <summary className="font-semibold cursor-pointer text-primary">What’s the role of the R&D team in Athar?</summary>
        <div className="mt-2 text-gray-700">
          The R&D team leads tech innovation by creating digital tools, automating workflows, and collecting feedback to improve our services.
        </div>
      </details>
      <details className="border rounded-lg p-4">
        <summary className="font-semibold cursor-pointer text-primary">How do you ensure volunteers are well-prepared and skilled?</summary>
        <div className="mt-2 text-gray-700">
          We provide onboarding, internal workshops, mentorship, and real-time feedback to support continuous growth and development.
        </div>
      </details>
      <details className="border rounded-lg p-4">
        <summary className="font-semibold cursor-pointer text-primary">How does the Education/Instructor team operate?</summary>
        <div className="mt-2 text-gray-700">
          The Education team designs and delivers learning workshops, campaigns, and resources to empower both volunteers and the broader student body.
        </div>
      </details>
      <details className="border rounded-lg p-4">
        <summary className="font-semibold cursor-pointer text-primary">Does Athar work closely with university departments (like student affairs)?</summary>
        <div className="mt-2 text-gray-700">
          Yes. We collaborate with university offices such as Student Affairs to coordinate events, get approvals, and align our goals with university policies.
        </div>
      </details>
      <details className="border rounded-lg p-4">
        <summary className="font-semibold cursor-pointer text-primary">How do you handle large-scale events or multi-department operations?</summary>
        <div className="mt-2 text-gray-700">
          We assign a lead coordinator, divide roles across departments, and use digital tools for planning and communication to ensure smooth execution.
        </div>
      </details>
      <details className="border rounded-lg p-4">
        <summary className="font-semibold cursor-pointer text-primary">How do you handle internal conflicts or misunderstandings?</summary>
        <div className="mt-2 text-gray-700">
          Conflicts are handled through respectful private dialogue, mediation by department heads, and involvement of leadership when necessary.
        </div>
      </details>
      <details className="border rounded-lg p-4">
        <summary className="font-semibold cursor-pointer text-primary">Do you have rules for how volunteers should behave?</summary>
        <div className="mt-2 text-gray-700">
          Yes. We follow a code of conduct promoting professionalism, respect, and teamwork. Volunteers are expected to uphold Athar’s values in all activities.
        </div>
      </details>
      <details className="border rounded-lg p-4">
        <summary className="font-semibold cursor-pointer text-primary">What are Athar’s goals for the upcoming semester or year?</summary>
        <div className="mt-2 text-gray-700">
          Launch AtharBot, host major events, expand partnerships, and enhance internal training to build a stronger, tech-supported volunteer community.
        </div>
      </details>
      <details className="border rounded-lg p-4">
        <summary className="font-semibold cursor-pointer text-primary">How will the website or digital tools help you grow?</summary>
        <div className="mt-2 text-gray-700">
          These tools will automate routine tasks, improve communication, support onboarding, and extend our impact by offering 24/7 student support online.
        </div>
      </details>
    </div>
  </div>
</section>


        {/* Team Section */}
        <section id="team" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900">Meet Our Team</h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Dedicated volunteers who lead by example and inspire others to make a difference.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-8">
              <Card>
                <CardHeader className="text-center">
                  <Image
                    src="/placeholder.svg?height=120&width=120"
                    width="120"
                    height="120"
                    alt="Team Leader"
                    className="mx-auto rounded-full"
                  />
                  <CardTitle className="text-gray-900">Omar Mubaidin</CardTitle>
                  <CardDescription>Head of R&D</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600">
                  Leading community outreach programs and coordinating volunteer activities with passion and dedication to maximize our impact on the community.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="text-center">
                  <Image
                    src="/placeholder.svg?height=120&width=120"
                    width="120"
                    height="120"
                    alt="Program Manager"
                    className="mx-auto rounded-full"
                  />
                  <CardTitle className="text-gray-900">Hassan Zagdhad</CardTitle>
                  <CardDescription>President</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600">
                  Developing and implementing sustainable programs that effectively address community needs, ensuring our volunteer efforts create lasting positive change
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="text-center">
                  <Image
                    src="/placeholder.svg?height=120&width=120"
                    width="120"
                    height="120"
                    alt="Community Liaison"
                    className="mx-auto rounded-full"
                  />
                  <CardTitle className="text-gray-900">Abdrahman Nassar</CardTitle>
                  <CardDescription>Vice President</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600">
                  Building strong bridges between our volunteer team (Athar) and the community, ensuring our collective efforts are responsive to real needs and foster true collaboration.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Join Us Section */}
        <section id="join" className="w-full py-12 md:py-24 lg:py-32 bg-primary">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-white">
                    Join the Athar Family
                  </h2>
                  <p className="max-w-[600px] text-white md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Ready to make a difference? We welcome volunteers of all backgrounds and skill levels. Whether you
                    have a few hours a week or want to take on a leadership role, there's a place for you in Athar.
                  </p>
                </div>
                <div className="grid gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span className="text-white">Flexible volunteer opportunities</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span className="text-white">Training and support provided</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span className="text-white">Connect with like-minded individuals</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span className="text-white">Make a real impact in your community</span>
                  </div>
                </div>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-gray-900">Get Involved</CardTitle>
                  <CardDescription>
                    Fill out this form and we'll get in touch with you about volunteer opportunities.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {formSuccess ? (
                    <div className="text-green-600 font-semibold text-center py-8">Thank you for applying! We'll be in touch soon.</div>
                  ) : (
                  <form className="space-y-4" onSubmit={handleFormSubmit}>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="first-name" className="text-sm font-medium text-gray-700">
                          First Name
                        </label>
                        <Input id="first-name" name="firstName" value={form.firstName} onChange={handleFormChange} placeholder="Enter your first name" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="last-name" className="text-sm font-medium text-gray-700">
                          Last Name
                        </label>
                        <Input id="last-name" name="lastName" value={form.lastName} onChange={handleFormChange} placeholder="Enter your last name" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <Input id="email" name="email" type="email" value={form.email} onChange={handleFormChange} placeholder="Enter your email" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                        Phone
                      </label>
                      <Input id="phone" name="phone" type="tel" value={form.phone} onChange={handleFormChange} placeholder="Enter your phone number" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="heardFrom" className="text-sm font-medium text-gray-700">
                        How did you hear about us?
                      </label>
                      <select id="heardFrom" name="heardFrom" value={form.heardFrom} onChange={handleFormChange} className="w-full border rounded px-3 py-2">
                        <option value="">Select an option</option>
                        <option value="friend">Friend or Family</option>
                        <option value="social">Social Media</option>
                        <option value="event">Event</option>
                        <option value="search">Search Engine</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium text-gray-700">
                        Why do you want to volunteer?
                      </label>
                      <Textarea id="message" name="message" value={form.message} onChange={handleFormChange} placeholder="Tell us about your motivation and interests" />
                    </div>
                    {formError && <div className="text-red-600 text-sm">{formError}</div>}
                    <Button className="w-full bg-primary hover:bg-primary-dark" type="submit">Submit Application</Button>
                  </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="w-full py-12 md:py-24 lg:py-32 border-t">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900">Get in Touch</h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Have questions about our work or want to learn more about volunteering? We'd love to hear from you.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-8">
              <Card className="text-center">
                <CardHeader>
                  <Mail className="h-8 w-8 text-primary mx-auto" />
                  <CardTitle className="text-gray-900">Email Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">info@atharvolunteers.org</p>
                  <p className="text-gray-600">volunteer@atharvolunteers.org</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <Phone className="h-8 w-8 text-primary mx-auto" />
                  <CardTitle className="text-gray-900">Call Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                  <p className="text-sm text-gray-500">Mon-Fri, 9AM-5PM</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <MapPin className="h-8 w-8 text-primary mx-auto" />
                  <CardTitle className="text-gray-900">Visit Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">123 Community Center Dr</p>
                  <p className="text-gray-600">Your City, State 12345</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-gray-50">
        <div className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-primary" />
          <p className="text-xs text-gray-600">© 2024 Athar Volunteer Team. Making a difference together.</p>
        </div>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4 text-gray-600">
            Privacy Policy
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4 text-gray-600">
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4 text-gray-600">
            Newsletter
          </Link>
        </nav>
      </footer>
    </div>
  )
}

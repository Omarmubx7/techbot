import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Heart, Users, HandHeart, Mail, Phone, MapPin, Calendar, Award, Target } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect } from 'react'
import QuickAccessTools from "@/components/QuickAccessTools"

export default function AtharVolunteerWebsite() {
  // Function to trigger the chat widget open event
  const openAtharBot = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-atharbot-widget'))
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
        <Link href="/" className="flex items-center justify-center">
          <Heart className="h-8 w-8 text-primary" />
          <span className="ml-2 text-2xl font-bold text-gray-900">Athar</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="#about" className="text-sm font-medium hover:text-primary transition-colors">
            About
          </Link>
          <Link href="#departments" className="text-sm font-medium hover:text-primary transition-colors">
            Departments
          </Link>
          <Link href="#tools" className="text-sm font-medium hover:text-primary transition-colors">
            Tools
          </Link>
          <Link href="#impact" className="text-sm font-medium hover:text-primary transition-colors">
            Our Impact
          </Link>
          <Link href="#team" className="text-sm font-medium hover:text-primary transition-colors">
            Team
          </Link>
          <Link href="#join" className="text-sm font-medium hover:text-primary transition-colors">
            Join Us
          </Link>
          <Link href="#contact" className="text-sm font-medium hover:text-primary transition-colors">
            Contact
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Bus System Image */}
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
                  src="/placeholder.svg?height=400&width=400"
                  width="400"
                  height="400"
                  alt="Athar volunteer team in action"
                  className="aspect-square overflow-hidden rounded-xl object-cover"
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
                src="/placeholder.svg?height=400&width=600"
                width="600"
                height="400"
                alt="Community service activities"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
              />
              <div className="flex flex-col justify-center space-y-4">
                <div className="grid gap-6">
                  <div className="flex items-start gap-4">
                    <Target className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Our Mission</h3>
                      <p className="text-gray-600">
                        To empower communities through volunteer service, education, and sustainable development
                        initiatives.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Heart className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Our Values</h3>
                      <p className="text-gray-600">
                        Compassion, integrity, inclusivity, and dedication to serving those in need with respect and
                        dignity.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Users className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Our Community</h3>
                      <p className="text-gray-600">
                        A welcoming space for volunteers from all backgrounds to contribute their skills and make a
                        difference.
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
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900">Our Departments</h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Each department brings unique expertise and passion to serve our community effectively.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-6xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-8">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Image src="/logos/blue logo.png" width="120" height="120" alt="Blue Team Logo" className="mx-auto" />
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
                  <Image src="/logos/team-athar-logo.png" width="120" height="120" alt="Team Athar Logo" className="mx-auto" />
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
            <div className="mx-auto grid max-w-6xl items-start gap-6 py-12 lg:grid-cols-2 lg:gap-8">
              {/* Communication Tools */}
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Mail className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-gray-900">Communication Hub</CardTitle>
                      <CardDescription>Stay connected with the team</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">WhatsApp Groups</h4>
                        <p className="text-sm text-gray-600">Department-specific communication</p>
                      </div>
                      <Button size="sm" variant="outline">
                        Join
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">Slack Workspace</h4>
                        <p className="text-sm text-gray-600">Project collaboration platform</p>
                      </div>
                      <Button size="sm" variant="outline">
                        Access
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">Newsletter</h4>
                        <p className="text-sm text-gray-600">Weekly updates and announcements</p>
                      </div>
                      <Button size="sm" variant="outline">
                        Subscribe
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Project Management */}
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <CardTitle className="text-gray-900">Project Management</CardTitle>
                      <CardDescription>Organize and track our initiatives</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">Event Calendar</h4>
                        <p className="text-sm text-gray-600">Upcoming volunteer activities</p>
                      </div>
                      <Button size="sm" variant="outline">
                        View
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">Task Board</h4>
                        <p className="text-sm text-gray-600">Track project progress</p>
                      </div>
                      <Button size="sm" variant="outline">
                        Open
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">Volunteer Hours</h4>
                        <p className="text-sm text-gray-600">Log and track your contributions</p>
                      </div>
                      <Button size="sm" variant="outline">
                        Log Hours
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Educational Resources */}
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Award className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <CardTitle className="text-gray-900">Learning Resources</CardTitle>
                      <CardDescription>Training and development materials</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">Volunteer Handbook</h4>
                        <p className="text-sm text-gray-600">Complete guide for new volunteers</p>
                      </div>
                      <Button size="sm" variant="outline">
                        Download
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">Training Videos</h4>
                        <p className="text-sm text-gray-600">Skill development tutorials</p>
                      </div>
                      <Button size="sm" variant="outline">
                        Watch
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">Certification Courses</h4>
                        <p className="text-sm text-gray-600">Professional development programs</p>
                      </div>
                      <Button size="sm" variant="outline">
                        Enroll
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Community Resources */}
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Users className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <CardTitle className="text-gray-900">Community Resources</CardTitle>
                      <CardDescription>Tools for community members</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">Resource Directory</h4>
                        <p className="text-sm text-gray-600">Local services and support</p>
                      </div>
                      <Button size="sm" variant="outline">
                        Browse
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">Emergency Contacts</h4>
                        <p className="text-sm text-gray-600">Important phone numbers</p>
                      </div>
                      <Button size="sm" variant="outline">
                        View
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">Request Help</h4>
                        <p className="text-sm text-gray-600">Submit assistance requests</p>
                      </div>
                      <Button size="sm" variant="outline">
                        Submit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Access Tools */}
            <QuickAccessTools />
          </div>
        </section>

        {/* Impact Section */}
        <section id="impact" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900">Our Impact</h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Through dedication and teamwork, we've made meaningful contributions to our community.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-8">
              <Card className="text-center">
                <CardHeader>
                  <HandHeart className="h-12 w-12 text-primary mx-auto" />
                  <CardTitle className="text-3xl font-bold text-gray-900">500+</CardTitle>
                  <CardDescription>Families Helped</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Providing essential support and resources to families in need across our community.
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <Calendar className="h-12 w-12 text-primary mx-auto" />
                  <CardTitle className="text-3xl font-bold text-gray-900">50+</CardTitle>
                  <CardDescription>Events Organized</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Community events, workshops, and initiatives that bring people together for positive change.
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <Award className="h-12 w-12 text-primary mx-auto" />
                  <CardTitle className="text-3xl font-bold text-gray-900">1000+</CardTitle>
                  <CardDescription>Volunteer Hours</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Countless hours dedicated by our amazing volunteers to serve and support our community.
                  </p>
                </CardContent>
              </Card>
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
                  <CardTitle className="text-gray-900">Sarah Ahmed</CardTitle>
                  <CardDescription>Team Coordinator</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600">
                    Leading community outreach programs and coordinating volunteer activities with passion and
                    dedication.
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
                  <CardTitle className="text-gray-900">Omar Hassan</CardTitle>
                  <CardDescription>Program Manager</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600">
                    Developing and implementing sustainable programs that address community needs effectively.
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
                  <CardTitle className="text-gray-900">Fatima Ali</CardTitle>
                  <CardDescription>Community Liaison</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600">
                    Building bridges between Athar and the community, ensuring our efforts meet real needs.
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
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="first-name" className="text-sm font-medium text-gray-700">
                        First Name
                      </label>
                      <Input id="first-name" placeholder="Enter your first name" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="last-name" className="text-sm font-medium text-gray-700">
                        Last Name
                      </label>
                      <Input id="last-name" placeholder="Enter your last name" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <Input id="email" type="email" placeholder="Enter your email" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                      Phone
                    </label>
                    <Input id="phone" type="tel" placeholder="Enter your phone number" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-gray-700">
                      Why do you want to volunteer?
                    </label>
                    <Textarea id="message" placeholder="Tell us about your motivation and interests" />
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary-dark">Submit Application</Button>
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

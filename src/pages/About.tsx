import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail, Download } from 'lucide-react';

export default function About() {
  const experiences = [
    {
      title: "Senior DevRel Engineer",
      company: "Tech Company",
      period: "2023 - Present",
      description: "Leading developer relations initiatives, creating technical content, and building community engagement programs."
    },
    {
      title: "Full Stack Developer",
      company: "Startup Inc",
      period: "2021 - 2023", 
      description: "Built scalable web applications using React, Node.js, and AWS. Implemented CI/CD pipelines and infrastructure automation."
    },
    {
      title: "DevOps Engineer",
      company: "Cloud Solutions Ltd",
      period: "2019 - 2021",
      description: "Managed cloud infrastructure, containerized applications with Docker/Kubernetes, and automated deployment processes."
    }
  ];

  const skills = {
    "Frontend": ["React", "TypeScript", "Next.js", "Tailwind CSS", "Vue.js"],
    "Backend": ["Node.js", "Python", "Go", "PostgreSQL", "MongoDB"],
    "DevOps": ["Docker", "Kubernetes", "AWS", "CI/CD", "Terraform"],
    "Tools": ["Git", "Linux", "Monitoring", "Testing", "Documentation"]
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            About Me
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            I'm a passionate developer who loves building things that make a difference. 
            With a background spanning full-stack development, DevOps, and developer relations, 
            I enjoy wearing multiple hats and solving complex problems.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="container mx-auto px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">My Journey</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-lg max-w-none">
              <p>
                My journey in tech started with curiosity about how websites worked. 
                What began as tinkering with HTML and CSS evolved into a deep passion 
                for creating digital experiences that solve real problems.
              </p>
              <p>
                Over the years, I've had the opportunity to work across the entire 
                technology stack - from crafting user interfaces to designing scalable 
                backend systems, and from automating infrastructure to building 
                developer communities.
              </p>
              <p>
                Today, I focus on the intersection of technology and community, 
                helping developers build better software while sharing knowledge 
                through writing, speaking, and open source contributions.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Experience */}
      <section className="container mx-auto px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-8">Experience</h2>
          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{exp.title}</CardTitle>
                      <CardDescription className="text-lg font-medium">
                        {exp.company}
                      </CardDescription>
                    </div>
                    <Badge variant="outline">{exp.period}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{exp.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="container mx-auto px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-8">Skills & Technologies</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(skills).map(([category, items]) => (
              <Card key={category}>
                <CardHeader>
                  <CardTitle className="text-lg">{category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-2xl">Let's Connect</CardTitle>
              <CardDescription className="text-lg">
                I'm always interested in connecting with fellow developers, 
                discussing new technologies, or exploring collaboration opportunities.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild>
                  <a href="mailto:taiwrash@example.com">
                    <Mail className="h-4 w-4 mr-2" />
                    Email Me
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="https://github.com/taiwrash" target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4 mr-2" />
                    GitHub
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="https://linkedin.com/in/taiwrash" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-4 w-4 mr-2" />
                    LinkedIn
                  </a>
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download Resume
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
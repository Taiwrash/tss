import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, Star, GitFork } from 'lucide-react';

export default function Projects() {
  const projects = [
    {
      title: "DevOps Automation Suite",
      description: "A comprehensive toolkit for automating infrastructure deployment and management using Terraform, Ansible, and Docker.",
      image: "/placeholder.svg",
      technologies: ["Python", "Terraform", "Docker", "AWS", "Ansible"],
      github: "https://github.com/taiwrash/devops-suite",
      demo: "https://demo.devops-suite.com",
      stars: 124,
      forks: 32,
      featured: true
    },
    {
      title: "React Component Library",
      description: "A modern, accessible component library built with React, TypeScript, and Tailwind CSS. Used by 500+ developers.",
      image: "/placeholder.svg", 
      technologies: ["React", "TypeScript", "Tailwind CSS", "Storybook"],
      github: "https://github.com/taiwrash/react-components",
      demo: "https://components.taiwrash.dev",
      stars: 89,
      forks: 23,
      featured: true
    },
    {
      title: "API Gateway Service",
      description: "Microservices API gateway with rate limiting, authentication, and monitoring built with Node.js and Redis.",
      image: "/placeholder.svg",
      technologies: ["Node.js", "Redis", "MongoDB", "Docker", "JWT"],
      github: "https://github.com/taiwrash/api-gateway",
      demo: null,
      stars: 67,
      forks: 18,
      featured: false
    },
    {
      title: "Cloud Cost Optimizer",
      description: "Intelligent cloud resource optimization tool that reduces AWS costs by up to 40% through automated scaling and resource management.",
      image: "/placeholder.svg",
      technologies: ["Python", "AWS", "Lambda", "CloudWatch", "Terraform"],
      github: "https://github.com/taiwrash/cloud-optimizer",
      demo: "https://optimizer.taiwrash.dev",
      stars: 156,
      forks: 45,
      featured: true
    },
    {
      title: "Developer Community Platform",
      description: "A platform for developer communities to share knowledge, collaborate on projects, and organize events.",
      image: "/placeholder.svg",
      technologies: ["Next.js", "Supabase", "TypeScript", "Tailwind CSS"],
      github: "https://github.com/taiwrash/dev-community",
      demo: "https://community.taiwrash.dev",
      stars: 234,
      forks: 67,
      featured: false
    },
    {
      title: "CI/CD Pipeline Generator",
      description: "Automatically generates optimized CI/CD pipelines for various tech stacks and deployment targets.",
      image: "/placeholder.svg",
      technologies: ["Go", "YAML", "GitHub Actions", "GitLab CI", "Jenkins"],
      github: "https://github.com/taiwrash/pipeline-generator",
      demo: null,
      stars: 98,
      forks: 29,
      featured: false
    }
  ];

  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            My Projects
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A collection of projects showcasing my work in full-stack development, 
            DevOps automation, and developer tooling. Each project represents a 
            solution to real-world problems I've encountered.
          </p>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="container mx-auto px-4 pb-16">
        <h2 className="text-3xl font-bold text-foreground mb-8">Featured Projects</h2>
        <div className="grid lg:grid-cols-2 gap-8">
          {featuredProjects.map((project, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-muted"></div>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4" />
                      {project.stars}
                    </div>
                    <div className="flex items-center gap-1">
                      <GitFork className="h-4 w-4" />
                      {project.forks}
                    </div>
                  </div>
                </div>
                <CardDescription className="text-base">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-3">
                  <Button asChild>
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      Code
                    </a>
                  </Button>
                  {project.demo && (
                    <Button variant="outline" asChild>
                      <a href={project.demo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Demo
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Other Projects */}
      <section className="container mx-auto px-4 pb-16">
        <h2 className="text-3xl font-bold text-foreground mb-8">Other Projects</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherProjects.map((project, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3" />
                      {project.stars}
                    </div>
                    <div className="flex items-center gap-1">
                      <GitFork className="h-3 w-3" />
                      {project.forks}
                    </div>
                  </div>
                </div>
                <CardDescription>
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{project.technologies.length - 3}
                    </Badge>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" asChild>
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-3 w-3 mr-1" />
                      Code
                    </a>
                  </Button>
                  {project.demo && (
                    <Button size="sm" variant="outline" asChild>
                      <a href={project.demo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Demo
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 pb-16">
        <Card className="text-center max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Interested in Collaborating?</CardTitle>
            <CardDescription className="text-lg">
              I'm always open to working on interesting projects and contributing to open source.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <a href="https://github.com/taiwrash" target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4 mr-2" />
                  Follow on GitHub
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="mailto:taiwrash@example.com">
                  Contact Me
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

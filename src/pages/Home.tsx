import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Github, Linkedin, Mail, ExternalLink, Code, Server, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const skills = [
    'React', 'TypeScript', 'Node.js', 'Python', 'Docker', 
    'Kubernetes', 'AWS', 'DevOps', 'Developer Relations',
    'Technical Writing', 'Community Building', 'Public Speaking'
  ];

  const roles = [
    {
      icon: <Code className="h-6 w-6" />,
      title: "Full Stack Developer",
      description: "Building modern web applications with React, Node.js, and cloud technologies"
    },
    {
      icon: <Server className="h-6 w-6" />,
      title: "DevOps Engineer", 
      description: "Automating infrastructure, CI/CD pipelines, and cloud deployments"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Developer Relations",
      description: "Building communities, creating content, and helping developers succeed"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground">
            Hi, I'm <span className="text-primary">Taiwrash</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Full Stack Developer, DevOps Engineer & Developer Relations Professional
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            I build scalable applications, automate infrastructure, and help developer communities thrive.
            Passionate about modern web technologies, cloud computing, and developer experience.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Link to="/projects">
              <Button size="lg" className="gap-2">
                View My Projects <ExternalLink className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/blog">
              <Button variant="outline" size="lg">
                Read My Blog
              </Button>
            </Link>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-4 mt-8">
            <Button variant="outline" size="icon" asChild>
              <a href="https://github.com/taiwrash" target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
              </a>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <a href="https://linkedin.com/in/taiwrash" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-4 w-4" />
              </a>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <a href="mailto:taiwrash@example.com">
                <Mail className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* What I Do Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            What I Do
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            I wear multiple hats in the tech world, bringing together development, operations, and community building.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {roles.map((role, index) => (
            <Card key={index} className="text-center">
              <CardHeader>
                <div className="mx-auto mb-4 text-primary">
                  {role.icon}
                </div>
                <CardTitle className="text-xl">{role.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {role.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Skills & Technologies
          </h2>
          <p className="text-lg text-muted-foreground">
            Technologies and tools I work with daily
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
          {skills.map((skill, index) => (
            <Badge 
              key={index} 
              variant="secondary" 
              className="text-sm py-2 px-4"
            >
              {skill}
            </Badge>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="text-center max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl">
              Let's Work Together
            </CardTitle>
            <CardDescription className="text-lg">
              I'm always open to discussing new opportunities, 
              collaborations, or just having a chat about technology.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="gap-2">
                  Get In Touch <Mail className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/blog">
                <Button variant="outline" size="lg">
                  Read My Thoughts
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
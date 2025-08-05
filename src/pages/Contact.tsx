import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, Github, Linkedin,  MapPin, Calendar, XIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: "Message Sent!",
      description: "Thanks for reaching out. I'll get back to you soon!",
    });

    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    setIsSubmitting(false);
  };

  const contactMethods = [
    {
      icon: <Mail className="h-5 w-5" />,
      title: "Email",
      description: "taiwrash.tech@gmail.com",
      action: "Send Email",
      href: "mailto:taiwrash.tech@gmail.com"
    },
    {
      icon: <Github className="h-5 w-5" />,
      title: "GitHub",
      description: "@taiwrash",
      action: "View Profile",
      href: "https://github.com/taiwrash"
    },
    {
      icon: <Linkedin className="h-5 w-5" />,
      title: "LinkedIn",
      description: "Connect with me",
      action: "Connect",
      href: "https://linkedin.com/in/rasheedtaiwo"
    },
    {
      icon: <XIcon className="h-5 w-5" />,
      title: "X",
      description: "@taiwrash",
      action: "Follow",
      href: "https://x.com/taiwrash"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Get In Touch
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            I'd love to hear from you! Whether you have a project in mind, 
            want to collaborate, or just want to say hello, feel free to reach out.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Send me a message</CardTitle>
              <CardDescription>
                Fill out the form below and I'll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
                <div className="mt-6 text-center">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    asChild
                    className="w-full hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <a 
                      href="https://cal.com/taiwrash/big-deal" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      <Calendar className="h-4 w-4" />
                      Book a Calendar Meeting
                    </a>
                  </Button>
                </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Methods */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Other ways to reach me</h2>
              <div className="grid gap-4">
                {contactMethods.map((method, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="flex items-center justify-between p-6">
                      <div className="flex items-center gap-4">
                        <div className="text-primary">
                          {method.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold">{method.title}</h3>
                          <p className="text-sm text-muted-foreground">{method.description}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <a href={method.href} target="_blank" rel="noopener noreferrer">
                          {method.action}
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Additional Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Let's collaborate</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Remote / Global</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Available for freelance projects</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  I am always interested in discussing new opportunities, DevOps 
                  open source contributions, speaking engagements, or just 
                  having a conversation about technology and development.
                </p>
              </CardContent>
            </Card>

            {/* Response Time */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Response Time</h3>
                <p className="text-sm text-muted-foreground">
                  I respond to emails within 24 hours. 
                  For urgent matters, feel free to reach out.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
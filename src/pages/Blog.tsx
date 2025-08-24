import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Clock, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { calculateReadingTime } from '@/utils/readingTime';

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  published_at: string;
  github_path: string;
  tags?: string[];
  readingTime?: number;
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      // Fetch posts directly from GitHub repository (no database storage)
      const repoUrl = 'https://api.github.com/repos/taiwrash/blogs/contents';
      const response = await fetch(repoUrl);
      
      if (!response.ok) {
        throw new Error('Failed to fetch blog posts');
      }

      const files = await response.json();
      const mdFiles = files.filter((file: any) => file.name.endsWith('.md'));

      const posts = await Promise.all(
        mdFiles.map(async (file: any) => {
          try {
            const contentResponse = await fetch(file.download_url);
            const content = await contentResponse.text();
            const readingTime = calculateReadingTime(content)
            // Extract metadata from markdown
            const slug = file.name.replace('.md', '');
            let title = slug.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase());
            let excerpt = '';
            let publishedAt = new Date().toISOString().split('T')[0];
            let tags: string[] = [];
    
            // Simple frontmatter parsing
            const lines = content.split('\n');
            if (lines[0] === '---') {
              const frontmatterEnd = lines.slice(1).findIndex(line => line === '---') + 1;
              if (frontmatterEnd > 0) {
                const frontmatter = lines.slice(1, frontmatterEnd);
                frontmatter.forEach(line => {
                  if (line.startsWith('title:')) title = line.replace('title:', '').trim();
                  if (line.startsWith('excerpt:')) excerpt = line.replace('excerpt:', '').trim();
                  if (line.startsWith('date:')) publishedAt = line.replace('date:', '').trim();
                  if (line.startsWith('tags:')) {
                    tags = line.replace('tags:', '').trim().split(',').map(tag => tag.trim());
                  }
                });
              }
            }

            // If no excerpt, use first paragraph
            if (!excerpt) {
              const contentWithoutFrontmatter = lines.slice(lines[0] === '---' ? lines.slice(1).findIndex(line => line === '---') + 2 : 0);
              const firstParagraph = contentWithoutFrontmatter.find(line => line.trim() && !line.startsWith('#'));
              excerpt = firstParagraph?.substring(0, 150) + '...' || '';
            }

            return {
              slug,
              title,
              excerpt,
              content: '',
              published_at: publishedAt,
              github_path: file.name,
              tags,
              readingTime
            };
          } catch (error) {
            console.error(`Error processing ${file.name}:`, error);
            return null;
          }
        })
      );

      const validPosts = posts.filter(post => post !== null);
      setPosts(validPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
    
    setLoading(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-8">Loading...</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            My Blog
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Thoughts on development, DevOps, developer relations, and the ever-evolving tech landscape.
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="container mx-auto px-4 pb-16">
        <div className="grid gap-8 max-w-4xl mx-auto">
          {posts.map((post) => (
            <Card key={post.slug} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                  <div className="flex items-center gap-1">
                    <CalendarDays className="h-4 w-4" />
                    {formatDate(post.published_at)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {post.readingTime} min read
                  </div>
                </div>
                
                <CardTitle className="text-2xl hover:text-primary transition-colors">
                  <Link to={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </CardTitle>
                
                <CardDescription className="text-base leading-relaxed">
                  {post.excerpt}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags?.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <Link to={`/blog/${post.slug}`}>
                    <Button>
                      Read More
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold mb-4">No posts yet</h2>
            <p className="text-muted-foreground">
              Blog posts will appear here once they're fetched from GitHub.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
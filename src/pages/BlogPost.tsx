import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Heart, MessageCircle, ExternalLink, CalendarDays } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';

interface BlogPost {
  slug: string;
  title: string;
  content: string;
  published_at: string;
  github_path: string;
  tags?: string[];
}

interface Comment {
  id: string;
  content: string;
  created_at: string;
  profiles: {
    username: string | null;
    full_name: string | null;
  };
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [submittingComment, setSubmittingComment] = useState(false);
  
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (slug) {
      fetchPost();
      fetchComments();
      fetchLikes();
    }
  }, [slug]);

  const fetchPost = async () => {
    try {
      // Fetch directly from GitHub (no database storage for posts)
      const githubUrl = `https://raw.githubusercontent.com/taiwrash/blogs/main/${slug}.md`;
      const response = await fetch(githubUrl);
      
      if (!response.ok) {
        throw new Error('Post not found');
      }

      const markdown = await response.text();
      
      // Extract metadata from markdown (frontmatter)
      const lines = markdown.split('\n');
      let title = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      let publishedAt = new Date().toISOString().split('T')[0];
      let tags: string[] = [];
      
      // Simple frontmatter parsing
      if (lines[0] === '---') {
        const frontmatterEnd = lines.slice(1).findIndex(line => line === '---') + 1;
        if (frontmatterEnd > 0) {
          const frontmatter = lines.slice(1, frontmatterEnd);
          frontmatter.forEach(line => {
            if (line.startsWith('title:')) title = line.replace('title:', '').trim();
            if (line.startsWith('date:')) publishedAt = line.replace('date:', '').trim();
            if (line.startsWith('tags:')) {
              tags = line.replace('tags:', '').trim().split(',').map(tag => tag.trim());
            }
          });
          // Remove frontmatter from content
          const content = lines.slice(frontmatterEnd + 1).join('\n');
          setPost({
            slug: slug!,
            title,
            content,
            published_at: publishedAt,
            github_path: `${slug}.md`,
            tags
          });
        }
      } else {
        // No frontmatter, use the whole content
        setPost({
          slug: slug!,
          title,
          content: markdown,
          published_at: publishedAt,
          github_path: `${slug}.md`,
          tags
        });
      }
    } catch (error) {
      console.error('Error fetching post:', error);
      setPost(null);
    }
    
    setLoading(false);
  };

  const fetchComments = async () => {
    if (!slug) return;

    const { data, error } = await supabase
      .from('comments')
      .select(`
        id,
        content,
        created_at,
        user_id
      `)
      .eq('post_slug', slug)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching comments:', error);
    } else {
      // Fetch profiles separately for each comment
      const commentsWithProfiles = await Promise.all(
        (data || []).map(async (comment) => {
          const { data: profile } = await supabase
            .from('profiles')
            .select('username, full_name')
            .eq('user_id', comment.user_id)
            .single();
          
          return {
            ...comment,
            profiles: profile || { username: null, full_name: null }
          };
        })
      );
      
      setComments(commentsWithProfiles);
    }
  };

  const fetchLikes = async () => {
    if (!slug) return;

    const { data, error } = await supabase
      .from('likes')
      .select('*')
      .eq('post_slug', slug);

    if (error) {
      console.error('Error fetching likes:', error);
    } else {
      setLikes(data?.length || 0);
      if (user) {
        setIsLiked(data?.some(like => like.user_id === user.id) || false);
      }
    }
  };

  const handleLike = async () => {
    if (!user || !slug) {
      toast({
        title: "Authentication required",
        description: "Please sign in to like posts.",
        variant: "destructive",
      });
      return;
    }

    if (isLiked) {
      // Unlike
      const { error } = await supabase
        .from('likes')
        .delete()
        .eq('post_slug', slug)
        .eq('user_id', user.id);

      if (!error) {
        setIsLiked(false);
        setLikes(prev => prev - 1);
      }
    } else {
      // Like
      const { error } = await supabase
        .from('likes')
        .insert({ post_slug: slug, user_id: user.id });

      if (!error) {
        setIsLiked(true);
        setLikes(prev => prev + 1);
      }
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || !slug || !newComment.trim()) {
      toast({
        title: "Error",
        description: "Please sign in and enter a comment.",
        variant: "destructive",
      });
      return;
    }

    setSubmittingComment(true);

    const { error } = await supabase
      .from('comments')
      .insert({
        post_slug: slug,
        user_id: user.id,
        content: newComment.trim(),
      });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to post comment. Please try again.",
        variant: "destructive",
      });
    } else {
      setNewComment('');
      fetchComments(); // Refresh comments
      toast({
        title: "Success",
        description: "Comment posted successfully!",
      });
    }

    setSubmittingComment(false);
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

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-8">Post not found</h1>
            <Link to="/blog">
              <Button>Back to Blog</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link to="/blog">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Button>
        </Link>

        {/* Post Header */}
        <article className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {post.title}
            </h1>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-1">
                <CalendarDays className="h-4 w-4" />
                {formatDate(post.published_at)}
              </div>
              <Button variant="outline" size="sm" asChild>
                <a 
                  href={`https://github.com/taiwrash/blogs/blob/main/${post.github_path}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4 mr-1" />
                  View Source
                </a>
              </Button>
            </div>

            {post.tags && (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </header>

          {/* Post Content */}
          <Card className="mb-8">
            <CardContent className="prose prose-lg max-w-none p-8 dark:prose-invert prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-code:text-foreground prose-pre:bg-muted prose-pre:text-foreground prose-blockquote:text-muted-foreground prose-blockquote:border-border prose-a:text-primary hover:prose-a:text-primary/80 prose-img:rounded-lg prose-img:shadow-lg prose-table:border-collapse prose-th:border prose-th:border-border prose-td:border prose-td:border-border prose-th:bg-muted prose-th:p-3 prose-td:p-3">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]} 
                rehypePlugins={[rehypeHighlight]}
                components={{
                  h1: ({node, ...props}) => <h1 className="text-3xl font-bold mb-6 text-foreground border-b border-border pb-3" {...props} />,
                  h2: ({node, ...props}) => <h2 className="text-2xl font-semibold mb-4 text-foreground border-b border-border pb-2" {...props} />,
                  h3: ({node, ...props}) => <h3 className="text-xl font-semibold mb-3 text-foreground" {...props} />,
                  p: ({node, ...props}) => <p className="mb-4 text-foreground leading-relaxed" {...props} />,
                  code: ({node, ...props}: any) => 
                    props.inline 
                      ? <code className="bg-muted px-2 py-1 rounded text-sm font-mono text-foreground" {...props} />
                      : <code className="block bg-muted p-4 rounded-lg text-sm font-mono text-foreground overflow-x-auto" {...props} />,
                  pre: ({node, ...props}) => <pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-4" {...props} />,
                  blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground my-4" {...props} />,
                  ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-4 text-foreground" {...props} />,
                  ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-4 text-foreground" {...props} />,
                  li: ({node, ...props}) => <li className="mb-2 text-foreground" {...props} />,
                  a: ({node, ...props}) => <a className="text-primary hover:text-primary/80 underline font-medium" {...props} />,
                  img: ({node, ...props}) => <img className="rounded-lg shadow-lg my-6 max-w-full h-auto" {...props} />,
                  table: ({node, ...props}) => <table className="w-full border-collapse border border-border rounded-lg overflow-hidden my-6" {...props} />,
                  th: ({node, ...props}) => <th className="bg-muted p-3 text-left font-semibold text-foreground border border-border" {...props} />,
                  td: ({node, ...props}) => <td className="p-3 text-foreground border border-border" {...props} />,
                  hr: ({node, ...props}) => <hr className="border-border my-8" {...props} />,
                }}
              >
                {post.content}
              </ReactMarkdown>
            </CardContent>
          </Card>

          {/* Likes and Comments */}
          <div className="flex items-center gap-6 mb-8">
            <Button
              variant={isLiked ? "default" : "outline"}
              onClick={handleLike}
              className="gap-2"
            >
              <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
              {likes} {likes === 1 ? 'Like' : 'Likes'}
            </Button>
            
            <div className="flex items-center gap-2 text-muted-foreground">
              <MessageCircle className="h-4 w-4" />
              {comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}
            </div>
          </div>

          {/* Comment Form */}
          {user ? (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-lg">Leave a Comment</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCommentSubmit} className="space-y-4">
                  <Textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Share your thoughts..."
                    rows={4}
                  />
                  <Button type="submit" disabled={submittingComment || !newComment.trim()}>
                    {submittingComment ? 'Posting...' : 'Post Comment'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          ) : (
            <Card className="mb-8">
              <CardContent className="text-center py-8">
                <p className="text-muted-foreground mb-4">
                  Sign in to leave comments and interact with the community.
                </p>
                <Link to="/auth">
                  <Button>Sign In</Button>
                </Link>
              </CardContent>
            </Card>
          )}

          {/* Comments */}
          <div className="space-y-6">
            {comments.map((comment) => (
              <Card key={comment.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">
                      {comment.profiles?.full_name || comment.profiles?.username || 'Anonymous'}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {formatDate(comment.created_at)}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-foreground">{comment.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
}
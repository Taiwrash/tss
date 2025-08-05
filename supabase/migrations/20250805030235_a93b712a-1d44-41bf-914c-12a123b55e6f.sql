-- Remove foreign key constraint between comments and blog_posts
-- since we want to store only comments and likes in DB, not blog posts
ALTER TABLE public.comments DROP CONSTRAINT IF EXISTS comments_post_slug_fkey;

-- Remove foreign key constraint between likes and blog_posts
ALTER TABLE public.likes DROP CONSTRAINT IF EXISTS likes_post_slug_fkey;
# Blog Structure Example

This is an example of how to structure your markdown files in the `taiwrash/blogs` repository for optimal display in your portfolio blog.

## File Naming Convention
- Use kebab-case for file names: `my-awesome-blog-post.md`
- The filename becomes the URL slug: `/blog/my-awesome-blog-post`

## Frontmatter (Required at the top of each markdown file)

```markdown
---
title: "My Awesome Blog Post"
excerpt: "A compelling summary of your blog post that will appear in the blog listing"
date: "2024-01-15"
tags: "React, TypeScript, Tutorial, DevOps"
---

# Your Blog Post Title

Your markdown content starts here...

## Introduction

Write an engaging introduction that hooks your readers.

## Code Examples

```javascript
// Code blocks are fully supported
function exampleCode() {
  console.log("This will be syntax highlighted!");
}
```

## Lists and Features

- Bullet points work great
- Use them to break down complex topics
- Make your content scannable

### Numbered Lists

1. Step-by-step instructions
2. Are perfect for tutorials
3. And guides

## Images

![Alt text](https://example.com/image.jpg)

## Links

[External links](https://example.com) work perfectly.

## Quotes

> Use blockquotes to highlight important information or quotes from other sources.

## Tables

| Feature | Support |
|---------|---------|
| Markdown | ✅ |
| Code highlighting | ✅ |
| Tables | ✅ |
| Math | ✅ |

## Conclusion

Wrap up your post with key takeaways and next steps.
```

## Best Practices

### 1. Always Include Frontmatter
Every markdown file should start with frontmatter containing:
- `title`: The display title of your post
- `excerpt`: A brief description (150-200 characters)
- `date`: Publication date in YYYY-MM-DD format
- `tags`: Comma-separated list of relevant tags

### 2. Use Proper Heading Structure
- Use `#` for the main title (should match frontmatter title)
- Use `##` for main sections
- Use `###` for subsections
- Don't skip heading levels

### 3. Write Compelling Excerpts
The excerpt appears in the blog listing, so make it:
- Clear and concise
- Engaging enough to make people want to read more
- 150-200 characters long

### 4. Choose Relevant Tags
Tags help categorize your content:
- Use consistent tag names across posts
- Keep tags broad enough to be reusable
- Examples: "React", "DevOps", "Tutorial", "JavaScript", "Backend"

### 5. Structure Your Content
- Start with an engaging introduction
- Break content into digestible sections
- Use code examples when relevant
- End with a clear conclusion

## Example File Structure in Your Repository

```
taiwrash/blogs/
├── getting-started-with-docker.md
├── building-scalable-react-apps.md
├── devrel-community-building.md
├── typescript-best-practices.md
└── serverless-architecture-guide.md
```

## GitHub Integration Features

Your portfolio automatically:
- Fetches all `.md` files from your repository
- Parses frontmatter for metadata
- Generates clean URLs from filenames
- Provides "View Source" links to GitHub
- Supports real-time updates when you push changes

## Tips for Great Blog Posts

1. **Start with an outline** - Plan your content structure before writing
2. **Use code examples** - Practical examples make technical posts more valuable
3. **Include visuals** - Images, diagrams, and code snippets break up text
4. **Write for your audience** - Consider who will be reading and their skill level
5. **Edit and revise** - Great writing comes from rewriting
6. **Link to sources** - Credit other work and provide additional resources

Happy blogging! 🚀
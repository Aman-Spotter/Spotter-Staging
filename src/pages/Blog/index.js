/* eslint-disable arrow-body-style */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, Share2 } from 'lucide-react';
import * as S from './styles';
import blogData from '../../data/blogData';

const Blog = () => {
  const history = useHistory();

  // Update page title for SEO
  React.useEffect(() => {
    document.title = 'Insights & Analysis | Spotter.ai - Data-driven Industry Knowledge';
  }, []);

  const handleBlogClick = (blogId) => {
    history.push(`/insights/${blogId}`);
  };

  const handleShare = (e, blog) => {
    e.stopPropagation(); // Prevent card click
    const url = `${window.location.origin}/insights/${blog.id}`;
    const text = `Check out this insight: ${blog.title}`;

    if (navigator.share) {
      navigator.share({
        title: blog.title,
        text: blog.excerpt,
        url,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${text}\n\n${url}`);
      alert('Link copied to clipboard!');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Background particles configuration
  const particles = [
    { id: 1, size: 4, color: '#14b8a6', left: 10, top: 20, duration: 8, delay: 0 },
    { id: 2, size: 6, color: '#40e0d0', left: 85, top: 15, duration: 12, delay: 2 },
    { id: 3, size: 3, color: '#0f766e', left: 20, top: 80, duration: 10, delay: 1 },
    { id: 4, size: 5, color: '#14b8a6', left: 75, top: 70, duration: 15, delay: 3 },
    { id: 5, size: 4, color: '#40e0d0', left: 50, top: 30, duration: 9, delay: 0.5 },
    { id: 6, size: 7, color: '#0f766e', left: 90, top: 60, duration: 11, delay: 1.5 },
    { id: 7, size: 3, color: '#14b8a6', left: 15, top: 60, duration: 13, delay: 2.5 },
    { id: 8, size: 5, color: '#40e0d0', left: 60, top: 85, duration: 7, delay: 0.8 },
  ];

  return (
    <S.Layout>
      {/* Animated Background Particles */}
      <S.BackgroundParticles>
        {particles.map((particle) => (
          <S.Particle
            key={particle.id}
            size={particle.size}
            color={particle.color}
            left={particle.left}
            top={particle.top}
            duration={particle.duration}
            delay={particle.delay}
          />
        ))}
      </S.BackgroundParticles>

      {/* Blog Header */}
      <S.BlogHeader>
        <S.BlogPageTitle>Insights & Analysis</S.BlogPageTitle>
        <S.BlogSubtitle>Data-driven insights and industry knowledge</S.BlogSubtitle>
      </S.BlogHeader>

      {/* Blog Grid - Redesigned Card Layout */}
      <S.BlogGrid>
        {blogData.map((blog) => (
          <S.BlogCard key={blog.id} onClick={() => handleBlogClick(blog.id)}>
            <S.CardContent>
              {/* Left-aligned image (smaller, supporting content) */}
              <S.CardImageContainer>
                <S.CardImage src={blog.image} alt={blog.title} loading="lazy" />
              </S.CardImageContainer>

              {/* Right-aligned content block */}
              <S.CardTextContent>
                <S.CardContentWrapper>
                  {/* Date at the top */}
                  <S.CardMeta>
                    <S.MetaItem>
                      <Calendar size={11} />
                      {formatDate(blog.publishDate)}
                    </S.MetaItem>
                    <S.MetaItem>
                      <Clock size={11} />
                      {blog.readTime}
                    </S.MetaItem>
                  </S.CardMeta>

                  {/* Bold, attention-grabbing article title */}
                  <S.CardTitle>{blog.title}</S.CardTitle>

                  {/* Short preview text (description snippet) */}
                  <S.CardExcerpt>{blog.excerpt}</S.CardExcerpt>

                  {/* Category tags */}
                  <S.CardTags>
                    {blog.tags &&
                      blog.tags.slice(0, 2).map((tag) => <S.Tag key={tag}>{tag}</S.Tag>)}
                  </S.CardTags>
                </S.CardContentWrapper>

                {/* Clear CTA button */}
                <S.CardActions>
                  <S.ReadMoreButton>
                    Read More
                    <ArrowRight size={12} />
                  </S.ReadMoreButton>
                  <S.ShareButton onClick={(e) => handleShare(e, blog)}>
                    <Share2 size={12} />
                  </S.ShareButton>
                </S.CardActions>
              </S.CardTextContent>
            </S.CardContent>
          </S.BlogCard>
        ))}
      </S.BlogGrid>
    </S.Layout>
  );
};

export default Blog;

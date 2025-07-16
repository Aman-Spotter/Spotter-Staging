/* eslint-disable arrow-body-style */
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import * as S from './styles';
import blogData from '../../data/blogData';

const Blog = () => {
  const history = useHistory();

  const handleBlogClick = (blogId) => {
    history.push(`/insights/${blogId}`);
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

      {/* Blog List */}
      <S.BlogList>
        {blogData.map((blog) => (
          <S.BlogCard key={blog.id} onClick={() => handleBlogClick(blog.id)}>
            <S.BlogCardImage src={blog.image} alt={blog.title} />
            <S.BlogContent>
              <S.BlogTitle>{blog.title}</S.BlogTitle>
              <S.BlogExcerpt>{blog.excerpt}</S.BlogExcerpt>
              <S.BlogMeta>
                <S.MetaItem>
                  <Calendar size={14} />
                  {formatDate(blog.publishDate)}
                </S.MetaItem>
                <S.MetaItem>
                  <Clock size={14} />
                  {blog.readTime}
                </S.MetaItem>
              </S.BlogMeta>
              <S.ReadMoreButton>
                Read Article <ArrowRight size={16} />
              </S.ReadMoreButton>
            </S.BlogContent>
          </S.BlogCard>
        ))}
      </S.BlogList>
    </S.Layout>
  );
};

export default Blog;

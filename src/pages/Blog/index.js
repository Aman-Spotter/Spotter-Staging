/* eslint-disable arrow-body-style */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, Search, Share2 } from 'lucide-react';
import * as S from './styles';
import blogData from '../../data/blogData';

const Blog = () => {
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState('');

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

  // Filter blogs based on search term
  const filteredBlogs = blogData.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

        {/* Search Bar */}
        <S.SearchContainer>
          <S.SearchWrapper>
            <Search size={20} color="#94a3b8" />
            <S.SearchInput
              type="text"
              placeholder="Search insights..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </S.SearchWrapper>
          {searchTerm && (
            <S.SearchResults>
              Found {filteredBlogs.length} result{filteredBlogs.length !== 1 ? 's' : ''}
            </S.SearchResults>
          )}
        </S.SearchContainer>
      </S.BlogHeader>

      {/* Blog List */}
      <S.BlogList>
        {filteredBlogs.map((blog) => (
          <S.BlogCard key={blog.id} onClick={() => handleBlogClick(blog.id)}>
            <S.BlogCardImage src={blog.image} alt={blog.title} loading="lazy" />
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
              <S.BlogActions>
                <S.ReadMoreButton>
                  Read Article <ArrowRight size={16} />
                </S.ReadMoreButton>
                <S.ShareButton onClick={(e) => handleShare(e, blog)}>
                  <Share2 size={16} />
                </S.ShareButton>
              </S.BlogActions>
            </S.BlogContent>
          </S.BlogCard>
        ))}
      </S.BlogList>
    </S.Layout>
  );
};

export default Blog;

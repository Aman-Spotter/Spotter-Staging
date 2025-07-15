/* eslint-disable arrow-body-style */
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Calendar, User, Clock, ArrowRight } from 'lucide-react';
import * as S from './styles';
import blogData from '../../data/blogData';

const Blog = () => {
  const history = useHistory();

  const handleBlogClick = (blogId) => {
    history.push(`/blog/${blogId}`);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <S.Layout>
      {/* Blog Header */}
      <S.BlogHeader>
        <S.BlogPageTitle>Spotter Blog</S.BlogPageTitle>
        <S.BlogSubtitle>Insights and industry knowledge for trucking professionals</S.BlogSubtitle>
      </S.BlogHeader>

      {/* Blog List */}
      <S.BlogList>
        {blogData.map((blog) => (
          <S.BlogCard key={blog.id} onClick={() => handleBlogClick(blog.id)}>
            {/* Remove old S.BlogImage, add new BlogCardImage below title */}
            <S.BlogContent>
              <S.BlogCategory>{blog.category}</S.BlogCategory>
              <S.BlogTitle>{blog.title}</S.BlogTitle>
              <S.BlogCardImage src={blog.image} alt={blog.title} />
              <S.BlogExcerpt>{blog.excerpt}</S.BlogExcerpt>
              <S.BlogMeta>
                <S.MetaItem>
                  <User size={14} />
                  {blog.author}
                </S.MetaItem>
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

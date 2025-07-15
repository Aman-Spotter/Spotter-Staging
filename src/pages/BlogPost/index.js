/* eslint-disable arrow-body-style */
import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';
import * as S from './styles';
import blogData from '../../data/blogData';

const BlogPost = () => {
  const { id } = useParams();
  const history = useHistory();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const blogId = parseInt(id, 10);
    const foundBlog = blogData.find((b) => b.id === blogId);
    setBlog(foundBlog);
  }, [id]);

  const handleBackClick = () => {
    history.push('/blog');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (!blog) {
    return (
      <S.Layout>
        <S.LoadingContainer>
          <S.LoadingText>Loading article...</S.LoadingText>
        </S.LoadingContainer>
      </S.Layout>
    );
  }

  return (
    <S.Layout>
      {/* Article Header */}
      <S.ArticleHeader>
        <S.ArticleContainer>
          <S.ArticleCategory>{blog.category}</S.ArticleCategory>
          <S.ArticleTitle>{blog.title}</S.ArticleTitle>
          <S.ArticleMeta>
            <S.MetaItem>
              <User size={16} />
              {blog.author}
            </S.MetaItem>
            <S.MetaItem>
              <Calendar size={16} />
              {formatDate(blog.publishDate)}
            </S.MetaItem>
            <S.MetaItem>
              <Clock size={16} />
              {blog.readTime}
            </S.MetaItem>
          </S.ArticleMeta>
        </S.ArticleContainer>
      </S.ArticleHeader>

      {/* Article Content */}
      <S.ArticleContent>
        <S.ContentContainer>
          {/* Back Button (left-aligned with content) */}
          <S.BackButton onClick={handleBackClick}>
            <ArrowLeft size={20} />
            Back to Blog
          </S.BackButton>
          <S.ContentWrapper dangerouslySetInnerHTML={{ __html: blog.content }} />
        </S.ContentContainer>
      </S.ArticleContent>
    </S.Layout>
  );
};

export default BlogPost;

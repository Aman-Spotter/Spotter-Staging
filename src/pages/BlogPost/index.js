/* eslint-disable arrow-body-style */
import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';
import * as S from './styles';
import blogData, { blogImages } from '../../data/blogData';

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

  // Function to process content and replace image placeholders with actual images
  const processContent = (content) => {
    if (!content) return '';

    // Create a mapping of placeholder to actual image URLs
    const imageMapping = {
      BLOG_IMAGE_1: blogImages.MarketMomentumSlows,
      BLOG_IMAGE_2: blogImages.Class8TruckOrders,
      BLOG_IMAGE_3: blogImages.Graph,
      BLOG_IMAGE_4: blogImages.bl3img1,
      BLOG_IMAGE_5: blogImages.bl3img2,
      BLOG_IMAGE_6: blogImages.bl3img3,
      BLOG_IMAGE_7: blogImages.bl3img4,
      BLOG_IMAGE_8: blogImages.bl3img5,
      BLOG_IMAGE_9: blogImages.bl3img6,
      BLOG_IMAGE_10: blogImages.bl3img7,
      BLOG_IMAGE_11: blogImages.bl3img8,
      BLOG_IMAGE_12: blogImages.bl4img1,
      BLOG_IMAGE_13: blogImages.bl4img2,
      BLOG_IMAGE_14: blogImages.bl4img3,
      BLOG_IMAGE_15: blogImages.bl4img4,
      BLOG_IMAGE_16: blogImages.bl4img5,
    };

    // Replace all placeholder references with actual image URLs
    let processedContent = content;
    Object.entries(imageMapping).forEach(([placeholder, imageUrl]) => {
      processedContent = processedContent.replace(new RegExp(placeholder, 'g'), imageUrl);
    });

    return processedContent;
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
          <S.ContentWrapper dangerouslySetInnerHTML={{ __html: processContent(blog.content) }} />
        </S.ContentContainer>
      </S.ArticleContent>
    </S.Layout>
  );
};

export default BlogPost;

/* eslint-disable arrow-body-style */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, Share2, Mail, CheckCircle } from 'lucide-react';
import * as S from './styles';
import blogData from '../../data/blogData';

const Blog = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Update page title for SEO
  React.useEffect(() => {
    document.title = 'Insights & Analysis | Spotter.ai - Data-driven Industry Knowledge';
  }, []);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      alert('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call - replace with actual subscription logic
    setTimeout(() => {
      setIsSubscribed(true);
      setIsSubmitting(false);
      setEmail('');
    }, 1000);
  };

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

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!email) {
      setErrorMessage('Please enter your email address');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call delay
    setTimeout(() => {
      setSuccessMessage("Successfully subscribed! You'll receive our weekly insights soon.");
      setEmail('');
      setIsSubscribed(true);
      setIsSubmitting(false);
    }, 1000);
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

      {/* Blog Grid - Full Width */}
      <S.BlogGrid>
        {blogData
          .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))
          .map((blog) => (
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

      {/* Newsletter Section */}
      <S.NewsletterSection>
        <S.NewsletterContainer>
          <S.NewsletterContent>
            <S.NewsletterForm onSubmit={handleNewsletterSubmit}>
              <S.FormGroup>
                <S.EmailInput
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <S.SubscribeButton type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <S.LoadingSpinner />
                  ) : (
                    <>
                      Subscribe
                      <S.ArrowIcon>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5 12H19M19 12L12 5M19 12L12 19"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </S.ArrowIcon>
                    </>
                  )}
                </S.SubscribeButton>
              </S.FormGroup>

              {successMessage && (
                <S.SuccessMessage>
                  <S.CheckIcon>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20 6L9 17L4 12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </S.CheckIcon>
                  {successMessage}
                </S.SuccessMessage>
              )}

              {errorMessage && (
                <S.ErrorMessage>
                  <S.ErrorIcon>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                      <path
                        d="M15 9L9 15M9 9L15 15"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </S.ErrorIcon>
                  {errorMessage}
                </S.ErrorMessage>
              )}

              <S.PrivacyNote>Unsubscribe anytime.</S.PrivacyNote>
            </S.NewsletterForm>
          </S.NewsletterContent>
        </S.NewsletterContainer>
      </S.NewsletterSection>
    </S.Layout>
  );
};

export default Blog;

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { db } from '../services/db';
import { ThumbsUp, MessageSquare, Share2, Trash2, CornerDownRight } from 'lucide-react';

export const PostCard = ({ post }) => {
  const { activeUser, toggleLike, addComment, deletePost, navigateTo } = useApp();
  const [showComments, setShowComments] = useState(true);
  const [commentText, setCommentText] = useState('');

  const author = db.getUser(post.authorId);
  const targetUser = post.targetUserId ? db.getUser(post.targetUserId) : null;

  if (!author) return null;

  const isLikedByMe = post.likes.includes(activeUser.id);
  const canDelete = post.authorId === activeUser.id || post.targetUserId === activeUser.id;

  const handleLike = () => {
    toggleLike(post.id);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addComment(post.id, commentText);
    setCommentText('');
  };

  // Format likers string
  const formatLikers = () => {
    if (post.likes.length === 0) return null;
    const names = post.likes.map(id => {
      if (id === activeUser.id) return 'You';
      return db.getUser(id)?.name || 'Someone';
    });

    if (names.length === 1) return `${names[0]} likes this.`;
    if (names.length === 2) return `${names[0]} and ${names[1]} like this.`;
    return `${names[0]}, ${names[1]} and ${names.length - 2} others like this.`;
  };

  const formattedDate = new Date(post.timestamp).toLocaleString([], {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <article className="fb-post-card">
      {/* Post Header */}
      <div className="fb-post-header">
        <div className="fb-post-user-info">
          <img
            src={author.avatar}
            className="fb-post-avatar"
            alt=""
            onClick={() => navigateTo('profile', author.id)}
            style={{ cursor: 'pointer' }}
          />
          <div>
            <div style={{ fontSize: '12px' }}>
              <a className="fb-post-author-name" onClick={() => navigateTo('profile', author.id)}>
                {author.name}
              </a>
              {targetUser && (
                <span>
                  {' '}►{' '}
                  <a className="fb-post-author-name" onClick={() => navigateTo('profile', targetUser.id)}>
                    {targetUser.name}
                  </a>
                </span>
              )}
            </div>
            <div className="fb-post-timestamp">{formattedDate} via Web</div>
          </div>
        </div>

        {canDelete && (
          <button
            onClick={() => deletePost(post.id)}
            style={{ background: 'none', border: 'none', color: '#999', cursor: 'pointer' }}
            title="Delete post"
          >
            <Trash2 size={13} />
          </button>
        )}
      </div>

      {/* Post Body */}
      <div className="fb-post-body">
        {post.content}

        {post.mediaUrl && (
          <div className="fb-post-media">
            <img src={post.mediaUrl} alt="" />
          </div>
        )}
      </div>

      {/* Action Bar */}
      <div className="fb-post-actions">
        <span
          className="fb-post-action-btn"
          onClick={handleLike}
          style={{ color: isLikedByMe ? '#29447e' : '#3b5998' }}
        >
          <ThumbsUp size={12} fill={isLikedByMe ? '#3b5998' : 'none'} /> {isLikedByMe ? 'Unlike' : 'Like'}
        </span>
        <span
          className="fb-post-action-btn"
          onClick={() => setShowComments(!showComments)}
        >
          <MessageSquare size={12} /> Comment ({post.comments.length})
        </span>
        <span
          className="fb-post-action-btn"
          onClick={() => alert(`Shared post by ${author.name} to your wall!`)}
        >
          <Share2 size={12} /> Share
        </span>
      </div>

      {/* Like Counter Stats Bar */}
      {post.likes.length > 0 && (
        <div className="fb-post-stats">
          <ThumbsUp size={11} color="#3b5998" />
          <span>{formatLikers()}</span>
        </div>
      )}

      {/* Comments List & Publisher */}
      {showComments && (
        <div className="fb-comments-box">
          {post.comments.map(c => {
            const cAuthor = db.getUser(c.authorId);
            const cDate = new Date(c.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            return (
              <div key={c.id} className="fb-comment-item">
                <img
                  src={cAuthor?.avatar || '/assets/imgs/1.jpg'}
                  className="fb-comment-avatar"
                  alt=""
                  onClick={() => navigateTo('profile', c.authorId)}
                  style={{ cursor: 'pointer' }}
                />
                <div className="fb-comment-content">
                  <div>
                    <a className="fb-comment-author" onClick={() => navigateTo('profile', c.authorId)}>
                      {cAuthor?.name || 'User'}
                    </a>
                    {c.content}
                  </div>
                  <div className="fb-comment-time">{cDate}</div>
                </div>
              </div>
            );
          })}

          <form onSubmit={handleCommentSubmit} className="fb-comment-input-wrap">
            <img src={activeUser.avatar} style={{ width: 24, height: 24, borderRadius: 2 }} alt="" />
            <input
              type="text"
              className="fb-comment-input"
              placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button type="submit" className="fb-btn fb-btn-primary" style={{ padding: '2px 8px' }}>
              Post
            </button>
          </form>
        </div>
      )}
    </article>
  );
};

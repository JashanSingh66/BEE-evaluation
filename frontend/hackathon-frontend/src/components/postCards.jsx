import React from 'react';

const PostCard = ({ post }) => {
    return (
        <div className="post-card">
            <h2 className="post-title">{post.title}</h2>
            <p className="post-content">{post.content}</p>
            <div className="post-details">
                <span className="post-date">{new Date(post.date).toLocaleDateString()}</span>
                <span className="post-prize">Prize: {post.prize}</span>
                <span className="post-organizer">Organizer: {post.organizer}</span>
            </div>
        </div>
    );
};

export default PostCard;

// src/components/PostCard.tsx

import type { Post } from '../interfaces/Post';
import { Link } from 'react-router-dom';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link to={`/posts/${post.id}`} className="block">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl h-full">
        {post.urls_image && post.urls_image.length > 0 && (
          <img src={post.urls_image[0]} alt={post.title} className="w-full h-56 object-cover" />
        )}
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-2 truncate">{post.title}</h2>
          <p className="text-gray-600 line-clamp-3">{post.description}</p>
        </div>
      </div>
    </Link>
  );
}
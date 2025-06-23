import type { Post } from '../interfaces/Post';
import { Link } from 'react-router-dom';
import { Star } from 'phosphor-react';

export function PostCard({ post }: { post: Post }) {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl h-full flex flex-col">
      
      {/* A imagem agora é um link para o post */}
      <Link to={`/posts/${post.id}`}>
        {post.firstImage ? (
          <img src={post.firstImage} alt={post.title} className="w-full h-48 object-cover" />
        ) : (
          <div className="w-full h-48 bg-gray-200"></div> 
        )}
      </Link>
      
      <div className="p-4 flex flex-col flex-grow">
        {/* O nome do profissional é um link separado para o perfil */}
        <Link to={`/profile/${post.professionalId}`} className="font-semibold text-gray-800 text-sm hover:underline mb-2">
          {post.professionalName}
        </Link>

        {/* O título também é um link para o post */}
        <Link to={`/posts/${post.id}`} className="flex-grow">
          <h2 className="text-lg font-bold text-gray-900 mb-2 truncate">{post.title}</h2>
        </Link>
        
        <div className="flex justify-between items-center mt-auto pt-2 text-sm">
          <div className="flex items-center gap-1">
            <Star size={16} className="text-yellow-500" weight="fill" />
            <span className="font-bold">{post.averageRating.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
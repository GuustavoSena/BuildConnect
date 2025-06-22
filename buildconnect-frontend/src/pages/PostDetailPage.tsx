import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; 
import api from '../api/axiosInstance'; // Importamos nossa instância
import type { Post } from '../interfaces/Post';

export function PostDetailPage() {
  const { id } = useParams<{ id: string }>();

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      api.get(`http://localhost:8081/posts/${id}`)
        .then(response => {
          setPost(response.data);
          setLoading(false);
        })
        .catch(err => {
          console.error(`Erro ao buscar o post com ID ${id}:`, err);
          setError('Falha ao carregar os dados do post.');
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Carregando detalhes...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  }

  if (!post) {
      return <div className="text-center p-10">Post não encontrado.</div>
  }

  return (
    <main className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8">
        {/* Link para voltar para a página inicial */}
        <Link to="/" className="text-blue-600 hover:underline mb-6 block">&larr; Voltar para todos os serviços</Link>

        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{post.title}</h1>
        
        {/* Carrossel de Imagens Simples */}
        {post.urls_image && post.urls_image.length > 0 && (
            <div className="mb-6">
                <img src={post.urls_image[0]} alt={post.title} className="w-full rounded-lg shadow-md" />
                {/* Aqui vamos adicionar lógica para um carrossel de verdade */}
            </div>
        )}

        <div className="prose max-w-none">
            <h2 className="text-2xl font-bold">Descrição</h2>
            <p>{post.description}</p>
        </div>

        <button className="mt-8 w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors">
          Conversar com o Profissional
        </button>
      </div>
    </main>
  );
}
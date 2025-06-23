// src/pages/HomePage.tsx (Código mais robusto)

import { useState, useEffect } from 'react';
import api from '../api/axiosInstance';
import type { Post } from '../interfaces/Post';
import type { Servico } from '../interfaces/Servico';
import { PostCard } from '../components/PostCard';
import { CategoryCard } from '../components/CategoryCard';

const PAGE_SIZE = 12;

export function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSearchTerm, setActiveSearchTerm] = useState('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchInitialData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [postsResponse, servicosResponse] = await Promise.all([
        api.get(`/posts?page=0&size=${PAGE_SIZE}&sort=id,desc`),
        api.get('/servicos')
      ]);
      // CORREÇÃO: Garante que sempre passamos uma lista, mesmo que a resposta seja vazia
      setPosts(postsResponse.data.content || []); 
      setServicos(servicosResponse.data || []);
      setHasMore(postsResponse.data ? !postsResponse.data.last : false);
      setPage(0);
    } catch (err) {
      console.error('Erro ao buscar dados da página inicial:', err);
      setError('Falha ao carregar os dados.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  const handleLoadMore = async () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    const nextPage = page + 1;
    try {
      const endpoint = activeSearchTerm
        ? `/search?query=${activeSearchTerm}&page=${nextPage}&size=${PAGE_SIZE}`
        : `/posts?page=${nextPage}&size=${PAGE_SIZE}&sort=id,desc`;
      const response = await api.get(endpoint);

      // CORREÇÃO: Garante que os novos posts são uma lista antes de concatenar
      const newPosts = response.data.content || [];
      setPosts(prevPosts => [...prevPosts, ...newPosts]);
      setPage(nextPage);
      setHasMore(response.data ? !response.data.last : false);
    } catch (err) {
      console.error("Erro ao carregar mais posts", err);
    } finally {
      setLoadingMore(false);
    }
  };

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    if (searchTerm.trim() === '') {
      setActiveSearchTerm('');
      fetchInitialData();
      return;
    }
    setLoading(true);
    setError(null);
    setActiveSearchTerm(searchTerm);
    try {
      const response = await api.get(`/search?query=${searchTerm}&page=0&size=${PAGE_SIZE}`);
      // CORREÇÃO: Garante que sempre passamos uma lista
      setPosts(response.data.content || []);
      setHasMore(response.data ? !response.data.last : false);
      setPage(0);
    } catch (err) {
      console.log("Erro:", err)
      setError('Nenhum resultado encontrado.');
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  // O JSX para renderização continua o mesmo
  if (loading && posts.length === 0) {
    return <div className="flex justify-center items-center h-screen">Carregando...</div>;
  }
  // ... resto do JSX ...
  
  return (
    <div className="bg-gray-50">
      {/* Seção Hero/Busca */}
      <div className="relative bg-cover bg-center h-80" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=870&q=80')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white p-4">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Encontre o profissional ideal</h1>
          <p className="text-lg md:text-xl mb-6">Tudo para a sua construção ou reforma.</p>
          <form onSubmit={handleSearch} className="w-full max-w-xl flex gap-2">
            <input 
              type="text" 
              placeholder="Pesquisar por profissionais ou serviços..."
              className="w-full p-4 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold p-4 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </form>
        </div>
      </div>
      
      {/* Container principal */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {!activeSearchTerm && servicos.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Com o que você precisa de ajuda?</h2>
            <div className="flex space-x-6 overflow-x-auto pb-4">
              {servicos.map(servico => <CategoryCard key={servico.id} servico={servico} />)}
            </div>
          </section>
        )}

        <section>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            {activeSearchTerm ? `Resultados para "${activeSearchTerm}"` : 'Melhores serviços perto de você'}
          </h2>
          {loading ? ( <p>Carregando...</p> ) : 
           error ? ( <p className="text-red-500">{error}</p> ) : 
           posts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {posts.map(post => <PostCard key={post.id} post={post} />)}
            </div>
          ) : ( <p>Nenhum serviço encontrado.</p> )}
        </section>

        {/* Botão de Carregar Mais */}
        {hasMore && !loading && (
          <div className="text-center mt-12">
            <button 
              onClick={handleLoadMore} 
              disabled={loadingMore}
              className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
            >
              {loadingMore ? 'Carregando...' : 'Carregar Mais'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
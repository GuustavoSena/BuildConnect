// src/pages/ProfilePage.tsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axiosInstance';
import type { ProfessionalProfile } from '../interfaces/ProfessionalProfile';
import { PostCard } from '../components/PostCard';
import { Star } from 'phosphor-react';

export function ProfilePage() {
  const { id } = useParams<{ id: string }>();
  const [profile, setProfile] = useState<ProfessionalProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      api.get(`/professionals/${id}`)
        .then(response => {
          setProfile(response.data);
        })
        .catch(err => {
          console.error(`Erro ao buscar o perfil com ID ${id}:`, err);
          setError('Falha ao carregar os dados do profissional.');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Carregando perfil...</div>;
  }

  if (error || !profile) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error || 'Perfil não encontrado.'}</div>;
  }

  return (
    <div className="bg-gray-100">
      {/* Cover Photo */}
      <div className="h-64 bg-cover bg-center" style={{ backgroundImage: `url(${profile.backgroundPhoto || 'https://via.placeholder.com/1500x300'})` }}></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Profile Header */}
        <div className="-mt-16 sm:-mt-24 flex flex-col sm:flex-row items-center sm:items-end sm:space-x-5">
          <div className="flex-shrink-0">
            <img
              className="h-32 w-32 sm:h-48 sm:w-48 rounded-full ring-4 ring-white object-cover"
              src={profile.profilePhoto || 'https://via.placeholder.com/150'}
              alt={profile.name}
            />
          </div>
          <div className="mt-6 sm:mt-16 sm:pb-1 w-full flex flex-col sm:flex-row justify-between items-center">
            <div className="text-center sm:text-left">
              <h1 className="text-3xl font-bold text-gray-900">{profile.name}</h1>
              <p className="text-sm font-medium text-gray-500">{profile.city}</p>
              <div className="flex items-center justify-center sm:justify-start mt-2 gap-2">
                <Star size={20} className="text-yellow-500" weight="fill" />
                <span className="font-bold text-gray-800">{profile.averageRating.toFixed(1)}</span>
              </div>
            </div>
            <div className="mt-5 flex justify-center sm:mt-0">
              <button className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors">
                Conversar com {profile.name.split(' ')[0]}
              </button>
            </div>
          </div>
        </div>

        {/* About Me Section */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-800 mb-2">Sobre mim</h2>
            <p className="text-gray-600">
              {/* O "Sobre mim" viria do backend. Por enquanto, um texto genérico. */}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae eros vitae nisl Egestas consequat.
            </p>
        </div>

        {/* Posts Section */}
        <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Serviços Prestados</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {profile.posts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
        </div>
      </div>
    </div>
  );
}
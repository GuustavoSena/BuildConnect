import type { Servico } from '../interfaces/Servico';

const placeholderImages: { [key: string]: string } = {
  default: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=870&q=80',
};

export function CategoryCard({ servico }: { servico: Servico }) {
  const imageUrl = placeholderImages[servico.type] || placeholderImages.default;
  return (
    <div className="flex-shrink-0 w-40 text-center">
      <div className="w-32 h-32 mx-auto rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-110">
        <img src={imageUrl} alt={servico.type} className="w-full h-full object-cover" />
      </div>
      <p className="mt-2 font-semibold text-gray-700">{servico.type}</p>
    </div>
  );
}
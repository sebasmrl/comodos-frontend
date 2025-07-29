export default function EmptyFavoriteAds() {
  return (
    <div className="col-span-12 flex flex-col items-center justify-center h-[400px] text-center px-4">
      {/* Círculo con ícono */}
      <div className="w-28 h-28 rounded-full bg-orange-100 flex items-center justify-center mb-6 shadow-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12 text-orange-500"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 
                   4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 
                   3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 
                   8.5c0 3.78-3.4 6.86-8.55 
                   11.54L12 21.35z" />
        </svg>
      </div>

      <h2 className="text-lg font-semibold text-gray-700 mb-1">
        Aún no tienes favoritos
      </h2>
      <p className="text-sm text-gray-500 max-w-xs">
        Guarda los anuncios que más te gusten para encontrarlos fácilmente más adelante.
      </p>
    </div>
  );
}

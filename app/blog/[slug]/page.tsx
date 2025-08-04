// Temporarily disabled for static export
// This dynamic route will be restored after implementing proper static generation
export default function BlogSlugPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog Makalesi</h1>
        <p className="text-gray-600 mb-4">Bu sayfa yakında aktif olacak.</p>
        <a href="/blog" className="text-blue-600 hover:text-blue-700 underline">
          Blog ana sayfasına dön
        </a>
      </div>
    </div>
  );
}

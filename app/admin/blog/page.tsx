'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BlogService, BlogPost } from '@/lib/blog';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default function BlogAdminPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    image: '',
    category: '',
    readTime: '',
    slug: '',
    seoTitle: '',
    seoDescription: '',
    author: 'Volkan Şimşirkaya',
    tags: '',
    featured: false,
    status: 'draft' as 'published' | 'draft',
    date: new Date().toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  });

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const allPosts = await BlogService.getAllPosts();
      setPosts(allPosts);
    } catch (error) {
      console.error('Blog yazıları yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const postData = {
        ...formData,
        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : [],
        slug: formData.slug || generateSlug(formData.title),
        date: formData.date || new Date().toLocaleDateString('tr-TR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      };

      if (editingPost) {
        await BlogService.updatePost(editingPost.id, postData);
      } else {
        await BlogService.createPost(postData);
      }

      resetForm();
      loadPosts();
      alert(editingPost ? 'Yazı güncellendi!' : 'Yazı oluşturuldu!');
    } catch (error) {
      console.error('Kaydetme hatası:', error);
      alert('Bir hata oluştu!');
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content || '',
      image: post.image,
      category: post.category,
      readTime: post.readTime,
      slug: post.slug,
      seoTitle: post.seoTitle || '',
      seoDescription: post.seoDescription || '',
      author: post.author || 'Volkan Şimşirkaya',
      tags: post.tags?.join(', ') || '',
      featured: post.featured || false,
      status: post.status,
      date: post.date
    });
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Bu yazıyı silmek istediğinizden emin misiniz?')) {
      try {
        await BlogService.deletePost(id);
        loadPosts();
        alert('Yazı silindi!');
      } catch (error) {
        console.error('Silme hatası:', error);
        alert('Silme işleminde hata oluştu!');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      image: '',
      category: '',
      readTime: '',
      slug: '',
      seoTitle: '',
      seoDescription: '',
      author: 'Volkan Şimşirkaya',
      tags: '',
      featured: false,
      status: 'draft',
      date: new Date().toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    });
    setEditingPost(null);
    setShowForm(false);
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const categories = ['Yatırım', 'Teknoloji', 'Sera Yönetimi', 'Araçlar', 'Otomasyon'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="w-full bg-white border-b border-gray-200">
        <div className="body-content-container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F2c7ec7c93776440b923d3518963fc941%2F96da5382e9584c3fb2d32eca60944359?format=webp&width=800"
                alt="SeraGPT Logo"
                className="h-8 w-auto"
              />
              <h1 className="text-xl font-bold text-gray-900">Blog Yönetimi</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <a href="/" className="text-gray-600 hover:text-gray-900 font-medium">
                Ana Sayfa
              </a>
              <a href="/blog" className="text-gray-600 hover:text-gray-900 font-medium">
                Blog
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="body-content-container py-8">
        {/* Controls */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Blog Yazıları ({posts.length})
          </h2>
          
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            {showForm ? 'Listeyi Göster' : 'Yeni Yazı Ekle'}
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-8 shadow-lg border border-gray-200 mb-8"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              {editingPost ? 'Yazıyı Düzenle' : 'Yeni Yazı Ekle'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Başlık *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Yazı başlığını girin..."
                />
              </div>

              {/* Slug */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL Slug
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="otomatik-olusturulacak"
                />
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Özet *
                </label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  required
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Yazının kısa özetini girin..."
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  İçerik (HTML) *
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  required
                  rows={10}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 font-mono text-sm"
                  placeholder="HTML içeriği girin..."
                />
                <p className="text-sm text-gray-500 mt-1">
                  HTML formatında içerik girebilirsiniz. Görseller için Builder.io, videolar için YouTube kullanın.
                </p>
              </div>

              {/* Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Görsel URL (Builder.io) *
                </label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="https://cdn.builder.io/api/v1/image/assets%2F..."
                />
              </div>

              {/* Category, Read Time & Date */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kategori *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Kategori seçin</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Okuma Süresi *
                  </label>
                  <input
                    type="text"
                    value={formData.readTime}
                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="5 dk okuma"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Yayın Tarihi *
                  </label>
                  <input
                    type="text"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="29 Aralık 2025"
                  />
                </div>
              </div>

              {/* SEO Fields */}
              <div className="border-t pt-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">SEO Ayarları</h4>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      SEO Başlık
                    </label>
                    <input
                      type="text"
                      value={formData.seoTitle}
                      onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Başlık boşsa otomatik oluşturulacak"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      SEO Açıklama
                    </label>
                    <textarea
                      value={formData.seoDescription}
                      onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                      rows={2}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Meta açıklama (160 karakter)"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Etiketler
                    </label>
                    <input
                      type="text"
                      value={formData.tags}
                      onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="etiket1, etiket2, etiket3"
                    />
                  </div>
                </div>
              </div>

              {/* Settings */}
              <div className="border-t pt-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Ayarlar</h4>
                
                <div className="flex items-center space-x-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="w-4 h-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Öne Çıkarılmış</span>
                  </label>

                  <div className="flex items-center space-x-2">
                    <label className="text-sm text-gray-700">Durum:</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as 'published' | 'draft' })}
                      className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="draft">Taslak</option>
                      <option value="published">Yayınlandı</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end space-x-4 pt-6">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  {editingPost ? 'Güncelle' : 'Kaydet'}
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Posts List */}
        {!showForm && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-200">
            {loading ? (
              <div className="p-8 text-center">
                <div className="loading-corporate mx-auto mb-4"></div>
                <p className="text-gray-600">Yazılar yükleniyor...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Başlık</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Kategori</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Durum</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Tarih</th>
                      <th className="px-6 py-4 text-right text-sm font-medium text-gray-900">İşlemler</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {posts.map((post) => (
                      <tr key={post.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-sm font-medium text-gray-900 flex items-center">
                              {post.title}
                              {post.featured && (
                                <span className="ml-2 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                                  Öne Çıkan
                                </span>
                              )}
                            </div>
                            <div className="text-sm text-gray-500">{post.readTime}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {post.category}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            post.status === 'published' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {post.status === 'published' ? 'Yayında' : 'Taslak'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {post.date}
                        </td>
                        <td className="px-6 py-4 text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => handleEdit(post)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              Düzenle
                            </button>
                            <button
                              onClick={() => handleDelete(post.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Sil
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

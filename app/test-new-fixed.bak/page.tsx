{/* 5. Referanslarımız */}
      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <div className="max-w-[800px] mx-auto">
            {/* Title */}
            <h2 
              className="mb-8"
              style={{ 
                color: '#f6f8f9', 
                fontSize: '36px', 
                fontWeight: '600' 
              }}
            >
              Referanslarımız
            </h2>

            {/* Description */}
            <div className="max-w-[576px] mx-auto mb-16">
              <p 
                className="leading-relaxed text-center"
                style={{ 
                  color: '#f6f8f9', 
                  fontSize: '20px', 
                  fontWeight: '400' 
                }}
              >
                Fikir aşamasından, projelendirmeye; Kurulum'dan, üretim danışmanlığına profesyonel hizmet
              </p>
            </div>

            {/* Image Gallery - 900px container */}
            <div className="relative mb-16">
              <div className="max-w-[900px] mx-auto">
                <div className="relative overflow-hidden">
                  {/* Gallery Container */}
                  <div className="flex space-x-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4">
                    {/* Image 1 */}
                    <div className="flex-shrink-0 w-[600px] snap-start">
                      <div className="rounded-2xl overflow-hidden shadow-lg">
                        <img
                          src="https://cdn.builder.io/api/v1/image/assets%2F2c7ec7c93776440b923d3518963fc941%2F83aac41966c5485a9276d65ef5d4e96b?format=webp&width=800"
                          alt="Sera Projesi Referans 1"
                          className="w-full h-80 object-cover"
                        />
                        <div className="bg-white/10 backdrop-blur-sm p-4 text-center">
                          <h4 style={{ color: '#f6f8f9', fontSize: '16px', fontWeight: '600' }}>
                            Antalya Sera Projesi
                          </h4>
                          <p style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400' }}>
                            5.000 m² Modern Sera Kurulumu
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Image 2 */}
                    <div className="flex-shrink-0 w-[600px] snap-start">
                      <div className="rounded-2xl overflow-hidden shadow-lg">
                        <div 
                          className="w-full h-80 bg-gradient-to-br from-green-600 to-green-800 flex items-center justify-center"
                        >
                          <div className="text-center">
                            <div className="text-6xl mb-4">🏗️</div>
                            <h4 style={{ color: '#f6f8f9', fontSize: '20px', fontWeight: '600' }}>
                              İzmir Projesi
                            </h4>
                          </div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm p-4 text-center">
                          <h4 style={{ color: '#f6f8f9', fontSize: '16px', fontWeight: '600' }}>
                            İzmir Sera Kompleksi
                          </h4>
                          <p style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400' }}>
                            12.000 m² Teknolojik Sera
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Image 3 */}
                    <div className="flex-shrink-0 w-[600px] snap-start">
                      <div className="rounded-2xl overflow-hidden shadow-lg">
                        <div 
                          className="w-full h-80 bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center"
                        >
                          <div className="text-center">
                            <div className="text-6xl mb-4">🌱</div>
                            <h4 style={{ color: '#f6f8f9', fontSize: '20px', fontWeight: '600' }}>
                              Mersin Projesi
                            </h4>
                          </div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm p-4 text-center">
                          <h4 style={{ color: '#f6f8f9', fontSize: '16px', fontWeight: '600' }}>
                            Mersin Organik Sera
                          </h4>
                          <p style={{ color: '#f6f8f9', fontSize: '14px', fontWeight: '400' }}>
                            8.500 m² Organik Üretim
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Navigation Arrow */}
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 -mr-4">
                    <button 
                      className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
                      style={{ backgroundColor: '#baf200' }}
                    >
                      <svg 
                        className="w-6 h-6" 
                        style={{ color: '#1e3237' }}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <Link 
              href="/anahtar-teslim-proje" 
              className="inline-block px-8 py-4 rounded-xl font-medium transition-all hover:opacity-90 hover:scale-105 transform"
              style={{ 
                backgroundColor: '#baf200', 
                color: '#1e3237', 
                fontSize: '16px', 
                fontWeight: '600' 
              }}
            >
              Anahtar Teslim Sera
            </Link>
          </div>
        </div>
      </section>

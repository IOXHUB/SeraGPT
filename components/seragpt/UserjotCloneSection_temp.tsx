{/* User Message */}
                    <div className="flex justify-end">
                      <div className="bg-blue-600 text-white px-4 py-2 rounded-lg max-w-xs">
                        <p className="text-sm">Bu ROI hesabında enerji maliyetleri nasıl değerlendirildi?</p>
                      </div>
                    </div>

                    {/* AI Response */}
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs">🤖</span>
                      </div>
                      <div className="bg-white border border-gray-200 px-4 py-3 rounded-lg max-w-md">
                        <p className="text-sm text-gray-700 mb-2">
                          Enerji maliyetleri hesaplamasında şu faktörleri dikkate aldım:
                        </p>
                        <ul className="text-xs text-gray-600 space-y-1">
                          <li>• Antalya elektrik tarifesi: 2.18 ₺/kWh</li>
                          <li>• Sera ısıtma ihtiyacı: 180 gün/yıl</li>
                          <li>• LED aydınlatma: 12 saat/gün</li>
                          <li>• Soğutma sistemi: Mayıs-Ekim arası</li>
                        </ul>
                        <p className="text-xs text-gray-500 mt-2">
                          <strong>Yıllık enerji maliyeti: ₺142,000</strong>
                        </p>
                      </div>
                    </div>

                    {/* User Follow-up */}
                    <div className="flex justify-end">
                      <div className="bg-blue-600 text-white px-4 py-2 rounded-lg max-w-xs">
                        <p className="text-sm">Güneş paneli yatırımı ROI'yi nasıl etkiler?</p>
                      </div>
                    </div>

                    {/* AI Response with Chart Reference */}
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs">🤖</span>
                      </div>
                      <div className="bg-white border border-gray-200 px-4 py-3 rounded-lg max-w-md">
                        <p className="text-sm text-gray-700 mb-2">
                          100kW güneş paneli sistemi ile:
                        </p>
                        <div className="bg-green-50 p-3 rounded border border-green-200 text-xs">
                          <div className="flex justify-between mb-1">
                            <span>Enerji tasarrufu:</span>
                            <span className="font-semibold">₺89,000/yıl</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span>Yeni ROI:</span>
                            <span className="font-semibold text-green-600">%31.2</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Geri dönüş süresi:</span>
                            <span className="font-semibold text-green-600">2.4 yıl</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Chat Input */}
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-3">
                      <input
                        type="text"
                        placeholder="Analiz sonuçları hakkında soru sorun..."
                        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button className="bg-black text-white p-2 rounded-lg hover:bg-gray-800">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                    <p className="text-xs text-gray-500">SeraGPT AI Asistan tarafından desteklenmektedir</p>
                  </div>
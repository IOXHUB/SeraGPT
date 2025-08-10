'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { MockAnalysisService } from '@/lib/services/mock-analysis-service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const dynamic = 'force-dynamic';

interface EquipmentData {
  greenhouseSize: number;
  location: string;
  plantType: string;
  budgetRange: string;
  automationLevel: string;
  categories: {
    name: string;
    totalCost: number;
    items: {
      name: string;
      brand: string;
      model: string;
      description: string;
      estimatedCost: number;
      priority: 'essential' | 'recommended' | 'optional';
      specifications?: string;
      supplier?: string;
      warranty?: string;
      installationTime?: string;
    }[];
  }[];
  costSummary: {
    essential: number;
    recommended: number;
    optional: number;
    total: number;
  };
  timeline: {
    phase: string;
    duration: string;
    activities: string[];
    cost: number;
  }[];
  engineerRecommendations: string[];
  maintenanceSchedule: {
    equipment: string;
    frequency: string;
    cost: number;
    description: string;
  }[];
}

export default function EquipmentReportPage() {
  const params = useParams();
  const reportRef = useRef<HTMLDivElement>(null);
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    loadAnalysis();
  }, [params.id]);

  const loadAnalysis = async () => {
    try {
      const analysisData = await MockAnalysisService.getAnalysisById(params.id as string);
      if (analysisData && analysisData.type === 'equipment') {
        setAnalysis(analysisData);
      }
    } catch (error) {
      console.error('Analiz yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const generatePDF = async () => {
    if (!reportRef.current) return;
    
    setGenerating(true);
    try {
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      
      let position = 0;
      
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      pdf.save(`Ekipman-Listesi-${analysis.id}.pdf`);
    } catch (error) {
      console.error('PDF oluşturulurken hata:', error);
      alert('PDF oluşturulurken hata oluştu');
    } finally {
      setGenerating(false);
    }
  };

  const printReport = () => {
    window.print();
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'essential': return 'bg-red-100 text-red-700 border-red-200';
      case 'recommended': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'optional': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'essential': return 'Zorunlu';
      case 'recommended': return 'Önerilen';
      case 'optional': return 'Opsiyonel';
      default: return priority;
    }
  };

  if (loading) {
    return (
      <DashboardLayout title="Ekipman Analizi Raporu" subtitle="Rapor yükleniyor...">
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (!analysis) {
    return (
      <DashboardLayout title="Ekipman Analizi Raporu" subtitle="Rapor bulunamadı">
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900">Rapor bulunamadı</h3>
          <p className="text-gray-600">Bu rapor mevcut değil veya silinmiş olabilir.</p>
        </div>
      </DashboardLayout>
    );
  }

  // Mock equipment data based on analysis
  const equipmentData: EquipmentData = {
    greenhouseSize: 1000,
    location: "Antalya",
    plantType: "Domates",
    budgetRange: "medium",
    automationLevel: "intermediate",
    categories: [
      {
        name: "Yapısal Sistemler",
        totalCost: 180000,
        items: [
          {
            name: "Sera Çelik Konstrüksiyon",
            brand: "SeraYapı",
            model: "SY-1000",
            description: "Galvanizli çelik sera konstrüksiyonu, 1000m² için",
            estimatedCost: 120000,
            priority: 'essential',
            specifications: "40x25m, 4m yükseklik",
            supplier: "SeraYapı A.Ş.",
            warranty: "10 yıl",
            installationTime: "2 hafta"
          },
          {
            name: "Polikarbon Panel",
            brand: "Palram",
            model: "Sunclear",
            description: "16mm çift cidarlı polikarbon paneller",
            estimatedCost: 45000,
            priority: 'essential',
            specifications: "16mm kalınlık, UV korumalı",
            supplier: "Plastik Seralar Ltd.",
            warranty: "15 yıl",
            installationTime: "3 gün"
          },
          {
            name: "Havalandırma Sistemleri",
            brand: "VentTech",
            model: "VT-AUTO",
            description: "Otomatik kenar ve çatı havalandırma",
            estimatedCost: 15000,
            priority: 'essential',
            specifications: "Motorlu açma/kapama",
            supplier: "VentTech Sistemleri",
            warranty: "5 yıl",
            installationTime: "1 hafta"
          }
        ]
      },
      {
        name: "İklim Kontrol",
        totalCost: 95000,
        items: [
          {
            name: "Isıtma Sistemi",
            brand: "ThermoGreen",
            model: "TG-150",
            description: "150kW kapasiteli doğalgaz kazanı",
            estimatedCost: 35000,
            priority: 'essential',
            specifications: "150kW, doğalgaz yakıtlı",
            supplier: "Sera İklim A.Ş.",
            warranty: "2 yıl",
            installationTime: "1 hafta"
          },
          {
            name: "Soğutma Sistemi",
            brand: "CoolMax",
            model: "CM-1000",
            description: "Evaporatif soğutma sistemi",
            estimatedCost: 25000,
            priority: 'recommended',
            specifications: "1000m² kapasiteli",
            supplier: "Sera İklim A.Ş.",
            warranty: "3 yıl",
            installationTime: "3 gün"
          },
          {
            name: "Nem Kontrol",
            brand: "HumidityPro",
            model: "HP-500",
            description: "Otomatik nem kontrol sistemi",
            estimatedCost: 18000,
            priority: 'recommended',
            specifications: "Sensörlü otomatik kontrol",
            supplier: "Otomasyon Sistemleri",
            warranty: "2 yıl",
            installationTime: "2 gün"
          },
          {
            name: "Sıcaklık Sensörleri",
            brand: "TempSense",
            model: "TS-PRO",
            description: "Kablosuz sıcaklık ve nem sensörleri",
            estimatedCost: 8000,
            priority: 'essential',
            specifications: "12 adet kablosuz sensör",
            supplier: "Sensör Teknolojileri",
            warranty: "3 yıl",
            installationTime: "1 gün"
          },
          {
            name: "Gölgeleme Sistemi",
            brand: "ShadeTech",
            model: "ST-1000",
            description: "Otomatik gölgeleme perdeleri",
            estimatedCost: 9000,
            priority: 'optional',
            specifications: "Alüminyum profil, motor tahrikli",
            supplier: "Gölgeleme Sistemleri",
            warranty: "5 yıl",
            installationTime: "2 gün"
          }
        ]
      },
      {
        name: "Sulama ve Beslenme",
        totalCost: 65000,
        items: [
          {
            name: "Damla Sulama Sistemi",
            brand: "DripMaster",
            model: "DM-1000",
            description: "Tam otomatik damla sulama sistemi",
            estimatedCost: 25000,
            priority: 'essential',
            specifications: "1000m² kapasiteli",
            supplier: "Sulama Teknolojileri",
            warranty: "5 yıl",
            installationTime: "1 hafta"
          },
          {
            name: "Beslenme Sistemi",
            brand: "NutriFlow",
            model: "NF-PRO",
            description: "Otomatik gübre karışım ve dozaj sistemi",
            estimatedCost: 30000,
            priority: 'recommended',
            specifications: "3 kanal gübre karışımı",
            supplier: "Beslenme Sistemleri",
            warranty: "3 yıl",
            installationTime: "3 gün"
          },
          {
            name: "Su Filtrasyon",
            brand: "AquaPure",
            model: "AP-1000",
            description: "Çok kademeli su filtrasyon sistemi",
            estimatedCost: 10000,
            priority: 'recommended',
            specifications: "RO + UV sterilizasyon",
            supplier: "Su Arıtma Sistemleri",
            warranty: "2 yıl",
            installationTime: "1 gün"
          }
        ]
      },
      {
        name: "Enerji ve Elektrik",
        totalCost: 45000,
        items: [
          {
            name: "Elektrik Panosu",
            brand: "ElectroPro",
            model: "EP-SERA",
            description: "Sera özel elektrik dağıtım panosu",
            estimatedCost: 15000,
            priority: 'essential',
            specifications: "IP65 korumalı, 100A",
            supplier: "Elektrik Panoları A.Ş.",
            warranty: "10 yıl",
            installationTime: "2 gün"
          },
          {
            name: "LED Aydınlatma",
            brand: "GrowLight",
            model: "GL-FULL",
            description: "Full spektrum LED büyütme lambaları",
            estimatedCost: 20000,
            priority: 'optional',
            specifications: "600W LED paneller",
            supplier: "LED Teknolojileri",
            warranty: "5 yıl",
            installationTime: "2 gün"
          },
          {
            name: "Güneş Paneli",
            brand: "SolarMax",
            model: "SM-50",
            description: "50kW güneş enerji sistemi",
            estimatedCost: 10000,
            priority: 'optional',
            specifications: "Monokristalin panel",
            supplier: "Güneş Enerjisi A.Ş.",
            warranty: "25 yıl",
            installationTime: "3 gün"
          }
        ]
      },
      {
        name: "Otomasyon ve Kontrol",
        totalCost: 35000,
        items: [
          {
            name: "Merkezi Kontrol Sistemi",
            brand: "AutoGreen",
            model: "AG-MASTER",
            description: "Tüm sistemleri kontrol eden merkezi unit",
            estimatedCost: 25000,
            priority: 'recommended',
            specifications: "Touchscreen panel, IoT bağlantılı",
            supplier: "Otomasyon Sistemleri",
            warranty: "3 yıl",
            installationTime: "2 gün"
          },
          {
            name: "Mobil Uygulama",
            brand: "SeraApp",
            model: "SA-PRO",
            description: "Uzaktan izleme ve kontrol uygulaması",
            estimatedCost: 5000,
            priority: 'optional',
            specifications: "iOS/Android uyumlu",
            supplier: "Yazılım Çözümleri",
            warranty: "1 yıl",
            installationTime: "1 gün"
          },
          {
            name: "Alarm Sistemi",
            brand: "AlertMax",
            model: "AM-SERA",
            description: "Acil durum alarm ve bildirim sistemi",
            estimatedCost: 5000,
            priority: 'essential',
            specifications: "SMS ve email bildirimi",
            supplier: "Güvenlik Sistemleri",
            warranty: "2 yıl",
            installationTime: "1 gün"
          }
        ]
      }
    ],
    costSummary: {
      essential: 238000,
      recommended: 123000,
      optional: 59000,
      total: 420000
    },
    timeline: [
      {
        phase: "Hazırlık ve Temel",
        duration: "2 hafta",
        activities: ["Zemin hazırlığı", "Temel atma", "Elektrik ve su altyapısı"],
        cost: 50000
      },
      {
        phase: "Konstrüksiyon",
        duration: "3 hafta",
        activities: ["Çelik konstrüksiyon montajı", "Panel takımı", "Kapı ve pencere montajı"],
        cost: 165000
      },
      {
        phase: "Sistemler",
        duration: "2 hafta",
        activities: ["İklim kontrol sistemi", "Sulama sistemi", "Elektrik tesisatı"],
        cost: 140000
      },
      {
        phase: "Otomasyon",
        duration: "1 hafta",
        activities: ["Kontrol sistemleri", "Sensör kurulumu", "Yazılım konfigürasyonu"],
        cost: 35000
      },
      {
        phase: "Test ve Devreye Alma",
        duration: "1 hafta",
        activities: ["Sistem testleri", "Kalibrasyon", "Personel eğitimi"],
        cost: 30000
      }
    ],
    engineerRecommendations: [
      "İlk kurulumda temel sistemlerle başlayıp aşamalı olarak otomasyon seviyesini artırın",
      "Kaliteli marka tercih ederek uzun vadeli işletme maliyetlerini düşürün",
      "Yerel bayi desteği olan markaları tercih edin",
      "Düzenli bakım programı oluşturun ve takip edin",
      "Enerji verimliliği için LED aydınlatma ve güneş paneli yatırımı değerlendirin"
    ],
    maintenanceSchedule: [
      {
        equipment: "İklim Kontrol Sistemi",
        frequency: "Aylık",
        cost: 500,
        description: "Sensör kalibrasyonu ve temizlik"
      },
      {
        equipment: "Sulama Sistemi",
        frequency: "Haftalık",
        cost: 200,
        description: "Filtre temizliği ve basınç kontrolü"
      },
      {
        equipment: "Havalandırma",
        frequency: "Mevsimlik",
        cost: 300,
        description: "Motor yağlama ve kayış kontrolü"
      },
      {
        equipment: "Elektrik Sistemi",
        frequency: "6 Aylık",
        cost: 400,
        description: "Bağlantı kontrolü ve termografi"
      }
    ]
  };

  return (
    <DashboardLayout title="Ekipman Analizi Raporu" subtitle={analysis.title}>
      <div className="space-y-6">
        {/* Action Buttons */}
        <div className="flex space-x-3 print:hidden">
          <button
            onClick={generatePDF}
            disabled={generating}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
          >
            {generating ? 'PDF Oluşturuluyor...' : '📄 PDF İndir'}
          </button>
          <button
            onClick={printReport}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            🖨️ Yazdır
          </button>
          <a
            href="/dashboard/analysis"
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            ← Analizlere Dön
          </a>
        </div>

        {/* Report Content */}
        <div ref={reportRef} className="bg-white rounded-lg border p-8 print:shadow-none print:border-none">
          {/* Header */}
          <div className="border-b border-gray-200 pb-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Mühendis Onaylı Ekipman Listesi</h1>
                <p className="text-lg text-gray-600 mt-2">{analysis.title}</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">Rapor Tarihi</div>
                <div className="font-medium">{new Date(analysis.createdAt).toLocaleDateString('tr-TR')}</div>
                <div className="text-sm text-gray-600 mt-2">Rapor ID</div>
                <div className="font-mono text-sm">{analysis.id}</div>
              </div>
            </div>
          </div>

          {/* Project Overview */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Proje Özeti</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-lg font-bold text-blue-600">{equipmentData.greenhouseSize} m²</div>
                <div className="text-sm text-gray-600">Sera Büyüklüğü</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <div className="text-lg font-bold text-green-600">{equipmentData.location}</div>
                <div className="text-sm text-gray-600">Lokasyon</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="text-lg font-bold text-purple-600">{equipmentData.plantType}</div>
                <div className="text-sm text-gray-600">Hedef Ürün</div>
              </div>
              <div className="bg-yellow-50 rounded-lg p-4">
                <div className="text-lg font-bold text-yellow-600">
                  {equipmentData.automationLevel === 'intermediate' ? 'Orta Seviye' : equipmentData.automationLevel}
                </div>
                <div className="text-sm text-gray-600">Otomasyon</div>
              </div>
            </div>
          </div>

          {/* Cost Summary */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Maliyet Özeti</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-red-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-red-600">₺{equipmentData.costSummary.essential.toLocaleString('tr-TR')}</div>
                <div className="text-sm text-gray-600">Zorunlu Ekipmanlar</div>
              </div>
              <div className="bg-yellow-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-yellow-600">₺{equipmentData.costSummary.recommended.toLocaleString('tr-TR')}</div>
                <div className="text-sm text-gray-600">Önerilen Ekipmanlar</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-600">₺{equipmentData.costSummary.optional.toLocaleString('tr-TR')}</div>
                <div className="text-sm text-gray-600">Opsiyonel Ekipmanlar</div>
              </div>
              <div className="bg-gray-900 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-white">₺{equipmentData.costSummary.total.toLocaleString('tr-TR')}</div>
                <div className="text-sm text-gray-300">Toplam Maliyet</div>
              </div>
            </div>
          </div>

          {/* Equipment Categories */}
          {equipmentData.categories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">{category.name}</h2>
                <div className="text-lg font-bold text-gray-700">
                  Toplam: ₺{category.totalCost.toLocaleString('tr-TR')}
                </div>
              </div>
              
              <div className="space-y-4">
                {category.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(item.priority)}`}>
                            {getPriorityText(item.priority)}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-2">{item.description}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p><span className="font-medium">Marka:</span> {item.brand}</p>
                            <p><span className="font-medium">Model:</span> {item.model}</p>
                            {item.specifications && (
                              <p><span className="font-medium">Özellikler:</span> {item.specifications}</p>
                            )}
                          </div>
                          <div>
                            {item.supplier && (
                              <p><span className="font-medium">Tedarikçi:</span> {item.supplier}</p>
                            )}
                            {item.warranty && (
                              <p><span className="font-medium">Garanti:</span> {item.warranty}</p>
                            )}
                            {item.installationTime && (
                              <p><span className="font-medium">Kurulum Süresi:</span> {item.installationTime}</p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-gray-900">
                          ₺{item.estimatedCost.toLocaleString('tr-TR')}
                        </div>
                        <div className="text-sm text-gray-600">Tahmini Fiyat</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Implementation Timeline */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Uygulama Takvimi</h2>
            <div className="space-y-4">
              {equipmentData.timeline.map((phase, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">{phase.phase}</h3>
                    <div className="text-right">
                      <div className="font-bold text-gray-900">{phase.duration}</div>
                      <div className="text-sm text-gray-600">₺{phase.cost.toLocaleString('tr-TR')}</div>
                    </div>
                  </div>
                  <ul className="space-y-1">
                    {phase.activities.map((activity, actIndex) => (
                      <li key={actIndex} className="flex items-center space-x-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        <span className="text-gray-700">{activity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Maintenance Schedule */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Bakım Takvimi</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-2 text-left">Ekipman</th>
                    <th className="border border-gray-300 px-4 py-2 text-center">Sıklık</th>
                    <th className="border border-gray-300 px-4 py-2 text-center">Maliyet</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Açıklama</th>
                  </tr>
                </thead>
                <tbody>
                  {equipmentData.maintenanceSchedule.map((maintenance, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="border border-gray-300 px-4 py-2 font-medium">{maintenance.equipment}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">{maintenance.frequency}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">₺{maintenance.cost}</td>
                      <td className="border border-gray-300 px-4 py-2">{maintenance.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Engineer Recommendations */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Mühendis Tavsiyeleri</h2>
            <div className="bg-blue-50 rounded-lg p-6">
              <ul className="space-y-3">
                {equipmentData.engineerRecommendations.map((recommendation, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mt-0.5">
                      {index + 1}
                    </span>
                    <span className="text-gray-700">{recommendation}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 pt-6 mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Rapor Bilgileri</h4>
                <p>Bu rapor 20+ yıl deneyimli sera mühendisleri tarafından hazırlanmıştır.</p>
                <p>Tüm ekipmanlar sektör standartlarına uygun olarak seçilmiştir.</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Sorumluluk Reddi</h4>
                <p>Fiyatlar piyasa koşullarına göre değişebilir. Nihai fiyat için tedarikçilerle iletişime geçin.</p>
                <p>Kurulum öncesi yerel şartlar ve izinler kontrol edilmelidir.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { MockAnalysisService } from '@/lib/services/mock-analysis-service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const dynamic = 'force-dynamic';

interface LayoutData {
  dimensions: {
    length: number;
    width: number;
    totalArea: number;
    usableArea: number;
  };
  plantType: string;
  automationLevel: string;
  layout: {
    elements: {
      id: string;
      name: string;
      type: 'growing_bed' | 'walkway' | 'work_area' | 'storage' | 'equipment';
      coordinates: { x: number; y: number; width: number; height: number };
      area: number;
    }[];
    efficiency: {
      spaceUtilization: number;
      plantCapacity: number;
      walkwayRatio: number;
      workAreaRatio: number;
    };
  };
  technical: {
    foundationSpecs: string;
    structuralSystem: string;
    ventilationDesign: string;
    irrigationLayout: string;
    electricalPlan: string;
    drainageSystem: string;
  };
  costs: {
    foundation: number;
    structure: number;
    systems: number;
    finishing: number;
    total: number;
  };
  timeline: {
    phase: string;
    duration: string;
    description: string;
    dependencies: string[];
  }[];
  recommendations: string[];
  warnings: string[];
  materials: {
    category: string;
    items: {
      name: string;
      quantity: number;
      unit: string;
      unitPrice: number;
      totalPrice: number;
    }[];
  }[];
}

export default function LayoutReportPage() {
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
      if (analysisData && analysisData.type === 'layout') {
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
      
      pdf.save(`Layout-Plani-${analysis.id}.pdf`);
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

  const renderLayoutVisualization = (layoutData: LayoutData) => {
    const scale = 350 / Math.max(layoutData.dimensions.length, layoutData.dimensions.width);
    
    return (
      <div className="bg-white border-2 border-gray-300 rounded-lg p-4 mx-auto" style={{ width: '380px', height: '380px' }}>
        <svg width="350" height="350" viewBox={`0 0 ${layoutData.dimensions.width * scale} ${layoutData.dimensions.length * scale}`}>
          {/* Background */}
          <rect 
            width={layoutData.dimensions.width * scale} 
            height={layoutData.dimensions.length * scale} 
            fill="#f9fafb" 
            stroke="#e5e7eb" 
            strokeWidth="2"
          />
          
          {/* Layout elements */}
          {layoutData.layout.elements.map((element) => {
            const x = element.coordinates.x * scale;
            const y = element.coordinates.y * scale;
            const width = element.coordinates.width * scale;
            const height = element.coordinates.height * scale;
            
            let fill = '#e5e7eb';
            let stroke = '#9ca3af';
            
            switch (element.type) {
              case 'growing_bed':
                fill = '#d1fae5';
                stroke = '#10b981';
                break;
              case 'walkway':
                fill = '#f3f4f6';
                stroke = '#6b7280';
                break;
              case 'work_area':
                fill = '#dbeafe';
                stroke = '#3b82f6';
                break;
              case 'storage':
                fill = '#fef3c7';
                stroke = '#f59e0b';
                break;
              case 'equipment':
                fill = '#e0e7ff';
                stroke = '#6366f1';
                break;
            }
            
            return (
              <g key={element.id}>
                <rect
                  x={x}
                  y={y}
                  width={width}
                  height={height}
                  fill={fill}
                  stroke={stroke}
                  strokeWidth="1"
                />
                {width > 20 && height > 20 && (
                  <text
                    x={x + width/2}
                    y={y + height/2}
                    textAnchor="middle"
                    fontSize="7"
                    fill="#374151"
                    dominantBaseline="middle"
                  >
                    {element.name.split(' ')[0]}
                  </text>
                )}
              </g>
            );
          })}
          
          {/* Dimensions */}
          <text x="10" y="15" fontSize="10" fill="#6b7280">
            {layoutData.dimensions.width}m × {layoutData.dimensions.length}m
          </text>
        </svg>
        
        {/* Legend */}
        <div className="mt-2 grid grid-cols-3 gap-1 text-xs">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-200 border border-green-500 rounded"></div>
            <span>Yetiştirme</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-gray-200 border border-gray-500 rounded"></div>
            <span>Geçit</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-blue-200 border border-blue-500 rounded"></div>
            <span>Çalışma</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-yellow-200 border border-yellow-500 rounded"></div>
            <span>Depo</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-indigo-200 border border-indigo-500 rounded"></div>
            <span>Ekipman</span>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <DashboardLayout title="Layout Planlama Raporu" subtitle="Rapor yükleniyor...">
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (!analysis) {
    return (
      <DashboardLayout title="Layout Planlama Raporu" subtitle="Rapor bulunamadı">
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900">Rapor bulunamadı</h3>
          <p className="text-gray-600">Bu rapor mevcut değil veya silinmiş olabilir.</p>
        </div>
      </DashboardLayout>
    );
  }

  // Mock layout data based on analysis
  const layoutData: LayoutData = {
    dimensions: {
      length: 30,
      width: 20,
      totalArea: 600,
      usableArea: 485
    },
    plantType: "Domates",
    automationLevel: "Orta Seviye",
    layout: {
      elements: [
        { id: '1', name: 'Yetiştirme Alanı 1', type: 'growing_bed', coordinates: { x: 1, y: 1, width: 8, height: 28 }, area: 224 },
        { id: '2', name: 'Ana Geçit', type: 'walkway', coordinates: { x: 9, y: 1, width: 2, height: 28 }, area: 56 },
        { id: '3', name: 'Yetiştirme Alanı 2', type: 'growing_bed', coordinates: { x: 11, y: 1, width: 8, height: 28 }, area: 224 },
        { id: '4', name: 'Çalışma Alanı', type: 'work_area', coordinates: { x: 1, y: 29, width: 10, height: 1 }, area: 10 },
        { id: '5', name: 'Ekipman Odası', type: 'equipment', coordinates: { x: 11, y: 29, width: 4, height: 1 }, area: 4 },
        { id: '6', name: 'Depo', type: 'storage', coordinates: { x: 15, y: 29, width: 4, height: 1 }, area: 4 }
      ],
      efficiency: {
        spaceUtilization: 88.5,
        plantCapacity: 1792,
        walkwayRatio: 12.5,
        workAreaRatio: 8.0
      }
    },
    technical: {
      foundationSpecs: "Betonarme radye temel, 30cm kalınlık, C25 beton",
      structuralSystem: "Galvanizli çelik konstrüksiyon, IPE140 ana kirişler",
      ventilationDesign: "Otomatik çatı ve kenar havalandırma, %30 açılabilir alan",
      irrigationLayout: "Damla sulama sistemi, 4 ana hat, basınç kompanzatörlü",
      electricalPlan: "100A ana pano, LED aydınlatma, sensör devreleri",
      drainageSystem: "Çevre drenajı ve sera içi sızma sistemi"
    },
    costs: {
      foundation: 45000,
      structure: 120000,
      systems: 95000,
      finishing: 35000,
      total: 295000
    },
    timeline: [
      {
        phase: "Zemin Hazırlığı",
        duration: "1 hafta",
        description: "Kazı, dolgu ve temel hazırlığı",
        dependencies: []
      },
      {
        phase: "Temel ve Alt Yapı",
        duration: "2 hafta",
        description: "Betonarme temel, drenaj ve altyapı tesisatı",
        dependencies: ["Zemin Hazırlığı"]
      },
      {
        phase: "Çelik Konstrüksiyon",
        duration: "2 hafta",
        description: "Ana çelik iskelet montajı",
        dependencies: ["Temel ve Alt Yapı"]
      },
      {
        phase: "Kaplama ve Kapatma",
        duration: "1 hafta",
        description: "Polikarbon panel montajı ve sızdırmazlık",
        dependencies: ["Çelik Konstrüksiyon"]
      },
      {
        phase: "Mekanik Sistemler",
        duration: "2 hafta",
        description: "İklim kontrol, sulama ve elektrik sistemleri",
        dependencies: ["Kaplama ve Kapatma"]
      },
      {
        phase: "Test ve Devreye Alma",
        duration: "1 hafta",
        description: "Sistem testleri ve final kontroller",
        dependencies: ["Mekanik Sistemler"]
      }
    ],
    recommendations: [
      "Güney yönde maksimum ışık alımı için konumlandırma",
      "Havalandırma sistem kapasitesinin artırılması",
      "Gelecek genişleme için kuzey duvarın hafif yapılması",
      "Enerji verimliliği için çift cidarlı polikarbon kullanımı",
      "Otomatik sulama sistemi ile işçilik optimizasyonu"
    ],
    warnings: [
      "Yüksek rüzgar bölgesi için ek bağlantı elemanları gerekli",
      "Kar yükü hesaplaması bölgesel şartlara göre güncellenmelidir",
      "Elektrik tesisatı nemli ortam standartlarına uygun olmalıdır"
    ],
    materials: [
      {
        category: "Çelik Konstrüksiyon",
        items: [
          { name: "IPE140 Ana Kiriş", quantity: 24, unit: "adet", unitPrice: 1200, totalPrice: 28800 },
          { name: "UNP80 Yan Kiriş", quantity: 48, unit: "adet", unitPrice: 450, totalPrice: 21600 },
          { name: "Çelik Kolon", quantity: 20, unit: "adet", unitPrice: 800, totalPrice: 16000 },
          { name: "Bağlantı Elemanları", quantity: 1, unit: "takım", unitPrice: 8500, totalPrice: 8500 }
        ]
      },
      {
        category: "Kaplama Malzemeleri",
        items: [
          { name: "16mm Polikarbon Panel", quantity: 750, unit: "m²", unitPrice: 65, totalPrice: 48750 },
          { name: "Alüminyum Profil", quantity: 320, unit: "m", unitPrice: 85, totalPrice: 27200 },
          { name: "Conta ve Sızdırmazlık", quantity: 1, unit: "takım", unitPrice: 4500, totalPrice: 4500 }
        ]
      },
      {
        category: "Temel ve Betonarme",
        items: [
          { name: "C25 Beton", quantity: 180, unit: "m³", unitPrice: 350, totalPrice: 63000 },
          { name: "Betonarme Demiri", quantity: 8500, unit: "kg", unitPrice: 12, totalPrice: 102000 },
          { name: "Kalıp Malzemesi", quantity: 300, unit: "m²", unitPrice: 45, totalPrice: 13500 }
        ]
      },
      {
        category: "Sistemler",
        items: [
          { name: "İklim Kontrol Sistemi", quantity: 1, unit: "takım", unitPrice: 35000, totalPrice: 35000 },
          { name: "Sulama Sistemi", quantity: 1, unit: "takım", unitPrice: 25000, totalPrice: 25000 },
          { name: "Elektrik Tesisatı", quantity: 1, unit: "takım", unitPrice: 18000, totalPrice: 18000 }
        ]
      }
    ]
  };

  return (
    <DashboardLayout title="Layout Planlama Raporu" subtitle={analysis.title}>
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
                <h1 className="text-3xl font-bold text-gray-900">Sera Layout Teknik Planı</h1>
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

          {/* Project Summary */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Proje Özeti</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{layoutData.dimensions.totalArea} m²</div>
                <div className="text-sm text-gray-600">Toplam Alan</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{layoutData.layout.efficiency.spaceUtilization}%</div>
                <div className="text-sm text-gray-600">Alan Verimliliği</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">{layoutData.layout.efficiency.plantCapacity}</div>
                <div className="text-sm text-gray-600">Bitki Kapasitesi</div>
              </div>
              <div className="bg-orange-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">{layoutData.automationLevel}</div>
                <div className="text-sm text-gray-600">Otomasyon</div>
              </div>
            </div>
          </div>

          {/* Layout Visualization */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2D Layout Planı</h2>
            <div className="flex justify-center mb-6">
              {renderLayoutVisualization(layoutData)}
            </div>
            
            {/* Layout Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Alan Dağılımı</h3>
                <div className="space-y-2">
                  {layoutData.layout.elements.map((element, index) => (
                    <div key={index} className="flex justify-between py-1 border-b border-gray-100">
                      <span className="text-gray-600">{element.name}</span>
                      <span className="font-medium">{element.area} m²</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Verimlilik Metrikleri</h3>
                <div className="space-y-2">
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span className="text-gray-600">Alan Kullanımı</span>
                    <span className="font-medium">%{layoutData.layout.efficiency.spaceUtilization}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span className="text-gray-600">Geçit Oranı</span>
                    <span className="font-medium">%{layoutData.layout.efficiency.walkwayRatio}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span className="text-gray-600">Çalışma Alanı</span>
                    <span className="font-medium">%{layoutData.layout.efficiency.workAreaRatio}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span className="text-gray-600">Bitki Kapasitesi</span>
                    <span className="font-medium">{layoutData.layout.efficiency.plantCapacity} adet</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Specifications */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Teknik Özellikler</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Temel Sistemi</h3>
                  <p className="text-gray-700">{layoutData.technical.foundationSpecs}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Yapısal Sistem</h3>
                  <p className="text-gray-700">{layoutData.technical.structuralSystem}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Havalandırma</h3>
                  <p className="text-gray-700">{layoutData.technical.ventilationDesign}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Sulama Sistemi</h3>
                  <p className="text-gray-700">{layoutData.technical.irrigationLayout}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Elektrik Planı</h3>
                  <p className="text-gray-700">{layoutData.technical.electricalPlan}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Drenaj Sistemi</h3>
                  <p className="text-gray-700">{layoutData.technical.drainageSystem}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Material List */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Malzeme Listesi</h2>
            {layoutData.materials.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{category.category}</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-300 px-3 py-2 text-left">Malzeme</th>
                        <th className="border border-gray-300 px-3 py-2 text-center">Miktar</th>
                        <th className="border border-gray-300 px-3 py-2 text-center">Birim</th>
                        <th className="border border-gray-300 px-3 py-2 text-center">Birim Fiyat</th>
                        <th className="border border-gray-300 px-3 py-2 text-center">Toplam</th>
                      </tr>
                    </thead>
                    <tbody>
                      {category.items.map((item, itemIndex) => (
                        <tr key={itemIndex} className={itemIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="border border-gray-300 px-3 py-2 font-medium">{item.name}</td>
                          <td className="border border-gray-300 px-3 py-2 text-center">{item.quantity}</td>
                          <td className="border border-gray-300 px-3 py-2 text-center">{item.unit}</td>
                          <td className="border border-gray-300 px-3 py-2 text-center">₺{item.unitPrice.toLocaleString('tr-TR')}</td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold">₺{item.totalPrice.toLocaleString('tr-TR')}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-gray-100">
                        <td colSpan={4} className="border border-gray-300 px-3 py-2 font-bold text-right">Kategori Toplamı:</td>
                        <td className="border border-gray-300 px-3 py-2 text-center font-bold text-blue-600">
                          ₺{category.items.reduce((sum, item) => sum + item.totalPrice, 0).toLocaleString('tr-TR')}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            ))}
          </div>

          {/* Cost Breakdown */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Maliyet Analizi</h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="bg-red-50 rounded-lg p-4 text-center">
                <div className="text-lg font-bold text-red-600">₺{layoutData.costs.foundation.toLocaleString('tr-TR')}</div>
                <div className="text-sm text-gray-600">Temel</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <div className="text-lg font-bold text-blue-600">₺{layoutData.costs.structure.toLocaleString('tr-TR')}</div>
                <div className="text-sm text-gray-600">Yapı</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <div className="text-lg font-bold text-green-600">₺{layoutData.costs.systems.toLocaleString('tr-TR')}</div>
                <div className="text-sm text-gray-600">Sistemler</div>
              </div>
              <div className="bg-yellow-50 rounded-lg p-4 text-center">
                <div className="text-lg font-bold text-yellow-600">₺{layoutData.costs.finishing.toLocaleString('tr-TR')}</div>
                <div className="text-sm text-gray-600">Finishing</div>
              </div>
              <div className="bg-gray-900 rounded-lg p-4 text-center">
                <div className="text-lg font-bold text-white">₺{layoutData.costs.total.toLocaleString('tr-TR')}</div>
                <div className="text-sm text-gray-300">Toplam</div>
              </div>
            </div>
          </div>

          {/* Implementation Timeline */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Uygulama Takvimi</h2>
            <div className="space-y-4">
              {layoutData.timeline.map((phase, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{phase.phase}</h3>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {phase.duration}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-2">{phase.description}</p>
                  {phase.dependencies.length > 0 && (
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Bağımlılıklar:</span> {phase.dependencies.join(', ')}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4 bg-blue-50 rounded-lg p-4">
              <p className="text-blue-800 text-sm">
                <strong>Toplam Süre:</strong> 9 hafta (Hava koşulları ve izin süreçleri dahil değil)
              </p>
            </div>
          </div>

          {/* Recommendations and Warnings */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Öneriler ve Uyarılar</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-green-800 mb-3">Teknik Öneriler</h3>
                <ul className="space-y-2">
                  {layoutData.recommendations.map((recommendation, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-green-500 mt-1">✅</span>
                      <span className="text-gray-700">{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-red-800 mb-3">Dikkat Edilecek Hususlar</h3>
                <ul className="space-y-2">
                  {layoutData.warnings.map((warning, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-red-500 mt-1">⚠️</span>
                      <span className="text-gray-700">{warning}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 pt-6 mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Tasar��m Bilgileri</h4>
                <p>Bu plan SeraGPT AI tasarım sistemi tarafından oluşturulmuştur.</p>
                <p>Yerel yapı yönetmelikleri ve standartlar dikkate alınmıştır.</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Sorumluluk Reddi</h4>
                <p>Uygulama öncesi yerel yönetmelikler ve jeoteknik rapor kontrol edilmelidir.</p>
                <p>Detay projeler için uzman mühendis kontrolü gereklidir.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

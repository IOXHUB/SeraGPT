'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { MockAnalysisService } from '@/lib/services/mock-analysis-service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const dynamic = 'force-dynamic';

interface ROIData {
  estimatedROI: string;
  paybackPeriod: string;
  riskLevel: string;
  confidence: number;
  totalInvestment: number;
  yearlyRevenue: number;
  operatingCosts: number;
  netProfit: number;
  breakEvenPoint: string;
  marketProjection: string;
  financialProjections: {
    year: number;
    revenue: number;
    costs: number;
    profit: number;
    cumulativeProfit: number;
  }[];
  riskFactors: string[];
  opportunities: string[];
  recommendations: string[];
}

export default function ROIReportPage() {
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
      if (analysisData && analysisData.type === 'roi') {
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
      
      pdf.save(`ROI-Analizi-${analysis.id}.pdf`);
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

  if (loading) {
    return (
      <DashboardLayout title="ROI Analizi Raporu" subtitle="Rapor yükleniyor...">
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (!analysis) {
    return (
      <DashboardLayout title="ROI Analizi Raporu" subtitle="Rapor bulunamadı">
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900">Rapor bulunamadı</h3>
          <p className="text-gray-600">Bu rapor mevcut değil veya silinmiş olabilir.</p>
        </div>
      </DashboardLayout>
    );
  }

  // Mock ROI data based on analysis
  const roiData: ROIData = {
    estimatedROI: "18.5%",
    paybackPeriod: "3.2 yıl",
    riskLevel: "Orta",
    confidence: 85,
    totalInvestment: 200000,
    yearlyRevenue: 180000,
    operatingCosts: 120000,
    netProfit: 60000,
    breakEvenPoint: "2.8 yıl",
    marketProjection: "Pozitif",
    financialProjections: [
      { year: 1, revenue: 120000, costs: 110000, profit: 10000, cumulativeProfit: 10000 },
      { year: 2, revenue: 150000, costs: 115000, profit: 35000, cumulativeProfit: 45000 },
      { year: 3, revenue: 180000, costs: 120000, profit: 60000, cumulativeProfit: 105000 },
      { year: 4, revenue: 190000, costs: 125000, profit: 65000, cumulativeProfit: 170000 },
      { year: 5, revenue: 200000, costs: 130000, profit: 70000, cumulativeProfit: 240000 },
    ],
    riskFactors: [
      "Domates fiyat dalgalanmaları",
      "İklim değişikli��i riskleri",
      "Enerji maliyeti artışları",
      "Pazar rekabet yoğunluğu"
    ],
    opportunities: [
      "Organik üretim prim fiyatı",
      "Direkt satış kanalları",
      "Sera turizmi potansiyeli",
      "İhracat fırsatları"
    ],
    recommendations: [
      "İlk yıl konservatif üretim planı",
      "Pazar araştırması ve satış kanalı çeşitlendirme",
      "Teknoloji yatırımları için aşamalı yaklaşım",
      "Risk yönetimi ve sigorta planı"
    ]
  };

  return (
    <DashboardLayout title="ROI Analizi Raporu" subtitle={analysis.title}>
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
                <h1 className="text-3xl font-bold text-gray-900">ROI Analizi Raporu</h1>
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

          {/* Executive Summary */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Yönetici Özeti</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{roiData.estimatedROI}</div>
                <div className="text-sm text-gray-600">Tahmini ROI</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{roiData.paybackPeriod}</div>
                <div className="text-sm text-gray-600">Geri Dönüş Süresi</div>
              </div>
              <div className="bg-yellow-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-yellow-600">{roiData.riskLevel}</div>
                <div className="text-sm text-gray-600">Risk Seviyesi</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">%{roiData.confidence}</div>
                <div className="text-sm text-gray-600">Güven Oranı</div>
              </div>
            </div>
          </div>

          {/* Financial Overview */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Finansal Genel Bakış</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Toplam Yatırım</span>
                  <span className="font-medium">₺{roiData.totalInvestment.toLocaleString('tr-TR')}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Yıllık Gelir (Hedef)</span>
                  <span className="font-medium">₺{roiData.yearlyRevenue.toLocaleString('tr-TR')}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Yıllık İşletme Gideri</span>
                  <span className="font-medium">₺{roiData.operatingCosts.toLocaleString('tr-TR')}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Net Kâr (Yıllık)</span>
                  <span className="font-medium text-green-600">₺{roiData.netProfit.toLocaleString('tr-TR')}</span>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Özet Değerlendirme</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Bu sera projesi, {roiData.confidence}% güven oranıyla {roiData.estimatedROI} ROI sunmaktadır. 
                  Yatırım geri dönüş süresi {roiData.paybackPeriod} olarak hesaplanmıştır. 
                  Proje {roiData.riskLevel.toLowerCase()} risk seviyesinde olup, pazar koşulları {roiData.marketProjection.toLowerCase()} görünmektedir.
                </p>
              </div>
            </div>
          </div>

          {/* Financial Projections Table */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5 Yıllık Finansal Projeksiyon</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-2 text-left">Yıl</th>
                    <th className="border border-gray-300 px-4 py-2 text-right">Gelir (₺)</th>
                    <th className="border border-gray-300 px-4 py-2 text-right">Gider (₺)</th>
                    <th className="border border-gray-300 px-4 py-2 text-right">Net Kâr (₺)</th>
                    <th className="border border-gray-300 px-4 py-2 text-right">Kümülatif Kâr (₺)</th>
                  </tr>
                </thead>
                <tbody>
                  {roiData.financialProjections.map((projection, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="border border-gray-300 px-4 py-2 font-medium">{projection.year}</td>
                      <td className="border border-gray-300 px-4 py-2 text-right">
                        {projection.revenue.toLocaleString('tr-TR')}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-right">
                        {projection.costs.toLocaleString('tr-TR')}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-right text-green-600 font-medium">
                        {projection.profit.toLocaleString('tr-TR')}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-right font-bold">
                        {projection.cumulativeProfit.toLocaleString('tr-TR')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Risk Analysis */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Risk Analizi ve Fırsatlar</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-red-800 mb-3">Risk Faktörleri</h3>
                <ul className="space-y-2">
                  {roiData.riskFactors.map((risk, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-red-500 mt-1">⚠️</span>
                      <span className="text-gray-700">{risk}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-800 mb-3">Fırsatlar</h3>
                <ul className="space-y-2">
                  {roiData.opportunities.map((opportunity, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-green-500 mt-1">✅</span>
                      <span className="text-gray-700">{opportunity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Öneriler ve Tavsiyeler</h2>
            <div className="bg-blue-50 rounded-lg p-6">
              <ul className="space-y-3">
                {roiData.recommendations.map((recommendation, index) => (
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
                <p>Bu rapor SeraGPT AI analiz sistemi tarafından oluşturulmuştur.</p>
                <p>Güncel pazar verileri ve mühendislik hesaplamaları kullanılmıştır.</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Sorumluluk Reddi</h4>
                <p>Bu rapor bilgilendirme amaçlıdır. Yatırım kararları için profesyonel danışmanlık alınması önerilir.</p>
                <p>Pazar koşulları değişebilir ve sonuçlar farklılık gösterebilir.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

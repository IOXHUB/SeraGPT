import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { reportId: string } }
) {
  try {
    const { reportId } = params;
    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format') || 'pdf';

    console.log('📥 Report download request:', { reportId, format });

    // Validate report ID
    if (!reportId || !reportId.startsWith('RPT-')) {
      return NextResponse.json({
        success: false,
        error: 'Geçersiz rapor ID'
      }, { status: 400 });
    }

    // Mock report data - In real implementation, fetch from database
    const reportData = await getReportFromDatabase(reportId);
    
    if (!reportData) {
      return NextResponse.json({
        success: false,
        error: 'Rapor bulunamadı'
      }, { status: 404 });
    }

    // Generate report based on format
    switch (format) {
      case 'pdf':
        return generatePDFReport(reportData, reportId);
      case 'json':
        return generateJSONReport(reportData);
      case 'excel':
        return generateExcelReport(reportData, reportId);
      default:
        return NextResponse.json({
          success: false,
          error: 'Desteklenmeyen format'
        }, { status: 400 });
    }

  } catch (error) {
    console.error('❌ Report download error:', error);
    return NextResponse.json({
      success: false,
      error: 'Rapor indirilirken hata oluştu'
    }, { status: 500 });
  }
}

async function getReportFromDatabase(reportId: string) {
  // Mock report retrieval - In real implementation, query Supabase
  console.log('🔍 Fetching report from database:', reportId);
  
  // Simulate database lookup
  const mockReport = {
    reportId,
    metadata: {
      title: 'Kapsamlı Sera Yatırım Fizibilite Raporu',
      generatedAt: new Date().toISOString(),
      reportType: 'comprehensive',
      version: '1.0'
    },
    analysis: {
      roi: {
        initial_investment: 900000,
        annual_revenue: 425000,
        annual_costs: 275000,
        net_profit: 150000,
        roi_percentage: 16.7,
        payback_period: 6.0,
        profitability: 'Orta'
      },
      climate: {
        location: 'Antalya',
        climate_score: 95,
        temperature: 18.5,
        sunshine_days: 300,
        humidity: 65,
        suitability: 'Mükemmel'
      },
      equipment: {
        technology_level: 'orta',
        cost_per_m2: 180,
        automation_level: 60,
        efficiency: 85,
        total_equipment_cost: 900000
      }
    },
    recommendations: {
      strategic: ['Yatırım planını değerlendirin', 'Premium segment hedefleyin'],
      operational: ['Deneyimli personel alın', 'Kalite kontrol kurun'],
      financial: ['Nakit akış planlayın', 'Risk fonu oluşturun'],
      technical: ['Düzenli bakım yapın', 'Enerji verimli sistemler kurun']
    }
  };

  return mockReport;
}

function generatePDFReport(reportData: any, reportId: string) {
  // Mock PDF generation - In real implementation, use libraries like:
  // - puppeteer (HTML to PDF)
  // - jsPDF (client-side PDF generation)
  // - External service like PDFShift, DocRaptor
  
  const htmlContent = generateHTMLReport(reportData);
  
  // For now, return HTML that can be printed as PDF
  return new NextResponse(htmlContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Content-Disposition': `attachment; filename="sera-raporu-${reportId}.html"`
    }
  });
}

function generateJSONReport(reportData: any) {
  return NextResponse.json({
    success: true,
    data: reportData,
    downloadedAt: new Date().toISOString()
  }, {
    headers: {
      'Content-Disposition': `attachment; filename="sera-raporu-${reportData.reportId}.json"`
    }
  });
}

function generateExcelReport(reportData: any, reportId: string) {
  // Mock Excel generation - In real implementation, use libraries like:
  // - exceljs
  // - xlsx
  
  const csvContent = generateCSVReport(reportData);
  
  return new NextResponse(csvContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="sera-raporu-${reportId}.csv"`
    }
  });
}

function generateHTMLReport(reportData: any): string {
  return `
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${reportData.metadata.title}</title>
    <style>
        body {
            font-family: -apple-system, "system-ui", Inter, "Segoe UI", Roboto, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 40px;
            color: #1e3237;
            background: white;
        }
        .header {
            text-align: center;
            margin-bottom: 40px;
            padding-bottom: 20px;
            border-bottom: 3px solid #baf200;
        }
        .header h1 {
            color: #146448;
            font-size: 28px;
            margin-bottom: 10px;
        }
        .meta-info {
            color: #666;
            font-size: 14px;
        }
        .section {
            margin-bottom: 30px;
            padding: 20px;
            border: 1px solid #e5e5e5;
            border-radius: 8px;
        }
        .section h2 {
            color: #146448;
            font-size: 20px;
            margin-bottom: 15px;
            padding-bottom: 8px;
            border-bottom: 2px solid #baf200;
        }
        .section h3 {
            color: #1e3237;
            font-size: 16px;
            margin-bottom: 10px;
        }
        .metrics {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin: 20px 0;
        }
        .metric {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 6px;
            text-align: center;
        }
        .metric-value {
            font-size: 24px;
            font-weight: bold;
            color: #146448;
        }
        .metric-label {
            font-size: 14px;
            color: #666;
            margin-top: 5px;
        }
        .recommendations {
            background: #f0f8ff;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #baf200;
        }
        .recommendations ul {
            margin: 0;
            padding-left: 20px;
        }
        .recommendations li {
            margin-bottom: 8px;
        }
        .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e5e5e5;
            text-align: center;
            color: #666;
            font-size: 12px;
        }
        @media print {
            body { padding: 20px; }
            .section { break-inside: avoid; }
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>${reportData.metadata.title}</h1>
        <div class="meta-info">
            <p>Rapor ID: ${reportData.reportId}</p>
            <p>Oluşturulma Tarihi: ${new Date(reportData.metadata.generatedAt).toLocaleDateString('tr-TR')}</p>
            <p>Versiyon: ${reportData.metadata.version}</p>
        </div>
    </div>

    <div class="section">
        <h2>📊 Finansal Analiz</h2>
        <div class="metrics">
            <div class="metric">
                <div class="metric-value">₺${reportData.analysis.roi.initial_investment.toLocaleString()}</div>
                <div class="metric-label">Başlangıç Yatırımı</div>
            </div>
            <div class="metric">
                <div class="metric-value">₺${reportData.analysis.roi.annual_revenue.toLocaleString()}</div>
                <div class="metric-label">Yıllık Gelir</div>
            </div>
            <div class="metric">
                <div class="metric-value">₺${reportData.analysis.roi.net_profit.toLocaleString()}</div>
                <div class="metric-label">Net Kâr</div>
            </div>
            <div class="metric">
                <div class="metric-value">%${reportData.analysis.roi.roi_percentage}</div>
                <div class="metric-label">ROI Oranı</div>
            </div>
            <div class="metric">
                <div class="metric-value">${reportData.analysis.roi.payback_period} yıl</div>
                <div class="metric-label">Geri Ödeme Süresi</div>
            </div>
            <div class="metric">
                <div class="metric-value">${reportData.analysis.roi.profitability}</div>
                <div class="metric-label">Karlılık Düzeyi</div>
            </div>
        </div>
    </div>

    <div class="section">
        <h2>🌡️ İklim Analizi</h2>
        <div class="metrics">
            <div class="metric">
                <div class="metric-value">${reportData.analysis.climate.climate_score}/100</div>
                <div class="metric-label">İklim Skoru</div>
            </div>
            <div class="metric">
                <div class="metric-value">${reportData.analysis.climate.temperature}°C</div>
                <div class="metric-label">Ort. Sıcaklık</div>
            </div>
            <div class="metric">
                <div class="metric-value">${reportData.analysis.climate.sunshine_days}</div>
                <div class="metric-label">Güneşli Gün</div>
            </div>
            <div class="metric">
                <div class="metric-value">%${reportData.analysis.climate.humidity}</div>
                <div class="metric-label">Nem Oranı</div>
            </div>
        </div>
        <p><strong>Lokasyon:</strong> ${reportData.analysis.climate.location}</p>
        <p><strong>Uygunluk:</strong> ${reportData.analysis.climate.suitability}</p>
    </div>

    <div class="section">
        <h2>⚙️ Ekipman Analizi</h2>
        <div class="metrics">
            <div class="metric">
                <div class="metric-value">${reportData.analysis.equipment.technology_level}</div>
                <div class="metric-label">Teknoloji Seviyesi</div>
            </div>
            <div class="metric">
                <div class="metric-value">₺${reportData.analysis.equipment.cost_per_m2}</div>
                <div class="metric-label">m² Başına Maliyet</div>
            </div>
            <div class="metric">
                <div class="metric-value">%${reportData.analysis.equipment.automation_level}</div>
                <div class="metric-label">Otomasyon Oranı</div>
            </div>
            <div class="metric">
                <div class="metric-value">%${reportData.analysis.equipment.efficiency}</div>
                <div class="metric-label">Verimlilik</div>
            </div>
        </div>
    </div>

    <div class="section">
        <h2>💡 Öneriler</h2>
        
        <h3>Stratejik Öneriler</h3>
        <div class="recommendations">
            <ul>
                ${reportData.recommendations.strategic.map(rec => `<li>${rec}</li>`).join('')}
            </ul>
        </div>

        <h3>Operasyonel Öneriler</h3>
        <div class="recommendations">
            <ul>
                ${reportData.recommendations.operational.map(rec => `<li>${rec}</li>`).join('')}
            </ul>
        </div>

        <h3>Finansal Öneriler</h3>
        <div class="recommendations">
            <ul>
                ${reportData.recommendations.financial.map(rec => `<li>${rec}</li>`).join('')}
            </ul>
        </div>

        <h3>Teknik Öneriler</h3>
        <div class="recommendations">
            <ul>
                ${reportData.recommendations.technical.map(rec => `<li>${rec}</li>`).join('')}
            </ul>
        </div>
    </div>

    <div class="footer">
        <p>Bu rapor SeraGPT tarafından oluşturulmuştur.</p>
        <p>© 2025 SeraGPT - Tüm hakları saklıdır.</p>
        <p>Detaylı bilgi için: info@seragpt.com | +90 XXX XXX XXXX</p>
    </div>
</body>
</html>`;
}

function generateCSVReport(reportData: any): string {
  const csv = [
    'Kategori,Metrik,Değer,Birim',
    `Finansal,Başlangıç Yatırımı,${reportData.analysis.roi.initial_investment},₺`,
    `Finansal,Yıllık Gelir,${reportData.analysis.roi.annual_revenue},₺`,
    `Finansal,Net Kâr,${reportData.analysis.roi.net_profit},₺`,
    `Finansal,ROI Oranı,${reportData.analysis.roi.roi_percentage},%`,
    `Finansal,Geri Ödeme Süresi,${reportData.analysis.roi.payback_period},yıl`,
    `İklim,İklim Skoru,${reportData.analysis.climate.climate_score},/100`,
    `İklim,Ortalama Sıcaklık,${reportData.analysis.climate.temperature},°C`,
    `İklim,Güneşli Gün,${reportData.analysis.climate.sunshine_days},gün`,
    `İklim,Nem Oranı,${reportData.analysis.climate.humidity},%`,
    `Ekipman,Teknoloji Seviyesi,${reportData.analysis.equipment.technology_level},`,
    `Ekipman,m² Başına Maliyet,${reportData.analysis.equipment.cost_per_m2},₺`,
    `Ekipman,Otomasyon Oranı,${reportData.analysis.equipment.automation_level},%`,
    `Ekipman,Verimlilik,${reportData.analysis.equipment.efficiency},%`
  ];

  return csv.join('\n');
}

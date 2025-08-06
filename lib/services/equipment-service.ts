import { API_CONFIG, ApiResponse } from '../api-config';

export interface EquipmentInputs {
  greenhouseSize: number;
  location: string;
  plantType: string;
  budgetRange: 'low' | 'medium' | 'high';
  automationLevel: 'manual' | 'basic' | 'advanced' | 'full';
  energySource: 'electric' | 'gas' | 'solar' | 'hybrid';
  specialRequirements?: string[];
}

export interface EquipmentItem {
  name: string;
  description: string;
  brand: string;
  model: string;
  estimatedCost: number;
  priority: 'essential' | 'recommended' | 'optional';
  specifications?: string;
  features: string[];
  supplier: string;
  deliveryTime: string;
}

export interface EquipmentCategory {
  name: string;
  items: EquipmentItem[];
  totalCost: number;
  description: string;
}

export interface EquipmentRecommendations {
  categories: EquipmentCategory[];
  costSummary: {
    minimum: number;
    recommended: number;
    premium: number;
  };
  engineerRecommendations: string[];
  projectTimeline: {
    planning: string;
    procurement: string;
    installation: string;
    commissioning: string;
  };
}

class EquipmentService {
  private readonly equipmentDatabase = {
    structure: [
      {
        name: 'Galvanizli Çelik İskelet Sistemi',
        description: 'Korozyona dayanıklı, uzun ömürlü sera iskelet sistemi',
        brand: 'SeraMax',
        model: 'SM-2024',
        baseCostPerM2: 180,
        features: ['15 yıl garanti', 'TSE sertifikası', 'Kolay montaj'],
        supplier: 'SeraMax Türkiye - Antalya',
        deliveryTime: '2-3 hafta'
      },
      {
        name: 'Alüminyum İskelet Sistemi',
        description: 'Hafif ve dayanıklı alüminyum konstrüksiyon',
        brand: 'AluminumPro',
        model: 'AP-Light',
        baseCostPerM2: 220,
        features: ['Pas yapmaz', 'Hafif', '20 yıl garanti'],
        supplier: 'AluminumPro - İstanbul',
        deliveryTime: '3-4 hafta'
      }
    ],
    climate: [
      {
        name: 'Akıllı İklim Kontrol Sistemi',
        description: 'Otomatik sıcaklık, nem ve havalandırma kontrolü',
        brand: 'ClimatePro',
        model: 'CP-Smart-2024',
        baseCostPerM2: 25,
        features: ['Mobil uygulama', 'Otomatik ayar', 'Enerji tasarrufu'],
        supplier: 'ClimatePro Türkiye - İstanbul',
        deliveryTime: '4-6 hafta'
      },
      {
        name: 'Temel Havalandırma Sistemi',
        description: 'Manuel kontrollü temel havalandırma sistemi',
        brand: 'VentilMax',
        model: 'VM-Basic',
        baseCostPerM2: 8,
        features: ['Basit kontrol', 'Dayanıklı', 'Ekonomik'],
        supplier: 'VentilMax - Mersin',
        deliveryTime: '1-2 hafta'
      }
    ],
    irrigation: [
      {
        name: 'Damla Sulama Sistemi',
        description: 'Yüksek verimli damla sulama sistemi',
        brand: 'AquaTech',
        model: 'AT-Drip-Pro',
        baseCostPerM2: 45,
        features: ['%95 su verimliliği', 'Gübreleme entegrasyonu', 'Otomatik timer'],
        supplier: 'AquaTech Sulama - Mersin',
        deliveryTime: '1-2 hafta'
      },
      {
        name: 'Yağmurlama Sistemi',
        description: 'Geleneksel yağmurlama sulama sistemi',
        brand: 'SprayMax',
        model: 'SM-Classic',
        baseCostPerM2: 30,
        features: ['Geniş alan kapsamı', 'Basit kontrol', 'Düşük maliyet'],
        supplier: 'SprayMax - Adana',
        deliveryTime: '1 hafta'
      }
    ],
    heating: [
      {
        name: 'Güneş Paneli Sistemi',
        description: 'Temiz enerji üreten güneş paneli sistemi',
        brand: 'SolarMax',
        model: 'SM-400W',
        baseCostPerM2: 15,
        features: ['25 yıl garanti', '%22 verimlilik', 'Devlet teşviki'],
        supplier: 'SolarMax Enerji - Ankara',
        deliveryTime: '6-8 hafta'
      },
      {
        name: 'Doğalgaz Isıtma Sistemi',
        description: 'Verimli doğalgaz yakıtlı ısıtma sistemi',
        brand: 'HeatPro',
        model: 'HP-Gas-2024',
        baseCostPerM2: 35,
        features: ['Yüksek verim', 'Otomatik kontrol', 'Güvenli'],
        supplier: 'HeatPro - Bursa',
        deliveryTime: '2-3 hafta'
      }
    ],
    monitoring: [
      {
        name: 'IoT Sensör Paketi',
        description: 'Akıllı sera izleme sensör sistemi',
        brand: 'SmartFarm',
        model: 'SF-IoT-2024',
        baseCostPerM2: 8,
        features: ['Gerçek zamanlı veri', 'Mobil app', 'Otomatik uyarılar'],
        supplier: 'SmartFarm Tech - İzmir',
        deliveryTime: '2-3 hafta'
      },
      {
        name: 'Temel Termometre Sistemi',
        description: 'Basit sıcaklık ve nem ölçüm sistemi',
        brand: 'ThermoBasic',
        model: 'TB-Simple',
        baseCostPerM2: 2,
        features: ['Dijital ekran', 'Min/Max kayıt', 'Ekonomik'],
        supplier: 'ThermoBasic - Ankara',
        deliveryTime: '1 hafta'
      }
    ],
    automation: [
      {
        name: 'Tam Otomasyon Sistemi',
        description: 'Yapay zeka destekli tam otomasyon sistemi',
        brand: 'AutoMax',
        model: 'AM-AI-2024',
        baseCostPerM2: 50,
        features: ['AI kontrolü', 'Uzaktan yönetim', 'Verim optimizasyonu'],
        supplier: 'AutoMax Systems - İstanbul',
        deliveryTime: '8-10 hafta'
      },
      {
        name: 'Temel Otomasyon',
        description: 'Basit timer tabanlı otomasyon sistemi',
        brand: 'SimpleAuto',
        model: 'SA-Timer',
        baseCostPerM2: 12,
        features: ['Timer kontrol', 'Basit programlama', 'Güvenilir'],
        supplier: 'SimpleAuto - Antalya',
        deliveryTime: '2 hafta'
      }
    ]
  };

  async generateRecommendations(inputs: EquipmentInputs): Promise<ApiResponse<EquipmentRecommendations>> {
    try {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call

      const categories = this.buildRecommendations(inputs);
      const costSummary = this.calculateCostSummary(categories);
      const engineerRecommendations = this.generateEngineerAdvice(inputs);

      const recommendations: EquipmentRecommendations = {
        categories,
        costSummary,
        engineerRecommendations,
        projectTimeline: {
          planning: '2-3 hafta',
          procurement: '4-8 hafta',
          installation: '3-5 hafta',
          commissioning: '1-2 hafta'
        }
      };

      return {
        success: true,
        data: recommendations
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Equipment analysis failed'
      };
    }
  }

  private buildRecommendations(inputs: EquipmentInputs): EquipmentCategory[] {
    const categories: EquipmentCategory[] = [];

    // Structure Category
    const structureItems = this.selectEquipmentForCategory('structure', inputs);
    categories.push({
      name: 'Yapı ve İskelet Sistemi',
      description: 'Sera iskelet ve konstrüksiyon elemanları',
      items: structureItems,
      totalCost: structureItems.reduce((sum, item) => sum + item.estimatedCost, 0)
    });

    // Climate Control Category
    const climateItems = this.selectEquipmentForCategory('climate', inputs);
    categories.push({
      name: 'İklim Kontrol Sistemi',
      description: 'Sıcaklık, nem ve havalandırma kontrolü',
      items: climateItems,
      totalCost: climateItems.reduce((sum, item) => sum + item.estimatedCost, 0)
    });

    // Irrigation Category
    const irrigationItems = this.selectEquipmentForCategory('irrigation', inputs);
    categories.push({
      name: 'Sulama Sistemi',
      description: 'Su dağıtım ve sulama ekipmanları',
      items: irrigationItems,
      totalCost: irrigationItems.reduce((sum, item) => sum + item.estimatedCost, 0)
    });

    // Heating/Energy Category
    const heatingItems = this.selectEquipmentForCategory('heating', inputs);
    categories.push({
      name: 'Enerji ve Isıtma Sistemi',
      description: 'Enerji üretimi ve ısıtma ekipmanları',
      items: heatingItems,
      totalCost: heatingItems.reduce((sum, item) => sum + item.estimatedCost, 0)
    });

    // Monitoring Category (if automation level requires it)
    if (inputs.automationLevel !== 'manual') {
      const monitoringItems = this.selectEquipmentForCategory('monitoring', inputs);
      categories.push({
        name: 'İzleme ve Kontrol Sistemi',
        description: 'Sensörler ve izleme ekipmanları',
        items: monitoringItems,
        totalCost: monitoringItems.reduce((sum, item) => sum + item.estimatedCost, 0)
      });
    }

    // Automation Category (if advanced automation requested)
    if (inputs.automationLevel === 'advanced' || inputs.automationLevel === 'full') {
      const automationItems = this.selectEquipmentForCategory('automation', inputs);
      categories.push({
        name: 'Otomasyon Sistemi',
        description: 'Otomatik kontrol ve yönetim sistemi',
        items: automationItems,
        totalCost: automationItems.reduce((sum, item) => sum + item.estimatedCost, 0)
      });
    }

    return categories;
  }

  private selectEquipmentForCategory(category: string, inputs: EquipmentInputs): EquipmentItem[] {
    const items: EquipmentItem[] = [];
    const categoryEquipment = this.equipmentDatabase[category] || [];

    for (const equipment of categoryEquipment) {
      const isRecommended = this.shouldRecommendEquipment(equipment, inputs);
      
      if (isRecommended) {
        const priority = this.getEquipmentPriority(category, equipment, inputs);
        const cost = this.calculateEquipmentCost(equipment, inputs);

        items.push({
          name: equipment.name,
          description: equipment.description,
          brand: equipment.brand,
          model: equipment.model,
          estimatedCost: cost,
          priority,
          specifications: this.getSpecifications(equipment, inputs),
          features: equipment.features,
          supplier: equipment.supplier,
          deliveryTime: equipment.deliveryTime
        });
      }
    }

    return items.sort((a, b) => {
      const priorityOrder = { essential: 0, recommended: 1, optional: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
  }

  private shouldRecommendEquipment(equipment: any, inputs: EquipmentInputs): boolean {
    // All equipment is compatible for this demo
    return true;
  }

  private getEquipmentPriority(category: string, equipment: any, inputs: EquipmentInputs): 'essential' | 'recommended' | 'optional' {
    const priorities = {
      structure: 'essential' as const,
      climate: inputs.automationLevel === 'manual' ? 'recommended' as const : 'essential' as const,
      irrigation: 'essential' as const,
      heating: 'recommended' as const,
      monitoring: inputs.automationLevel === 'manual' ? 'optional' as const : 'recommended' as const,
      automation: inputs.automationLevel === 'full' ? 'essential' as const : 'optional' as const
    };

    return priorities[category] || 'optional';
  }

  private calculateEquipmentCost(equipment: any, inputs: EquipmentInputs): number {
    let baseCost = equipment.baseCostPerM2 * inputs.greenhouseSize;

    // Apply budget range multiplier
    const budgetMultipliers = {
      low: 0.8,
      medium: 1.0,
      high: 1.3
    };

    baseCost *= budgetMultipliers[inputs.budgetRange];

    // Apply location multiplier (shipping costs)
    const locationMultipliers = {
      antalya: 1.0,
      mersin: 1.1,
      izmir: 1.15,
      adana: 1.1,
      mugla: 1.2,
      istanbul: 1.25
    };

    baseCost *= locationMultipliers[inputs.location] || 1.1;

    return Math.round(baseCost);
  }

  private getSpecifications(equipment: any, inputs: EquipmentInputs): string {
    return `${inputs.greenhouseSize} m² sera için optimize edilmiş`;
  }

  private calculateCostSummary(categories: EquipmentCategory[]) {
    const essentialCost = categories.reduce((sum, cat) => 
      sum + cat.items
        .filter(item => item.priority === 'essential')
        .reduce((itemSum, item) => itemSum + item.estimatedCost, 0)
    , 0);

    const recommendedCost = categories.reduce((sum, cat) => 
      sum + cat.items
        .filter(item => ['essential', 'recommended'].includes(item.priority))
        .reduce((itemSum, item) => itemSum + item.estimatedCost, 0)
    , 0);

    const premiumCost = categories.reduce((sum, cat) => 
      sum + cat.items.reduce((itemSum, item) => itemSum + item.estimatedCost, 0)
    , 0);

    return {
      minimum: essentialCost,
      recommended: recommendedCost,
      premium: premiumCost
    };
  }

  private generateEngineerAdvice(inputs: EquipmentInputs): string[] {
    const advice: string[] = [];

    // Size-based advice
    if (inputs.greenhouseSize < 500) {
      advice.push('Küçük sera alanınız için modüler ekipmanları tercih edin, gelecekte genişletme olanağı sağlar.');
    } else if (inputs.greenhouseSize > 2000) {
      advice.push('Büyük sera alanınız için merkezi kontrol sistemi kurulumu zorunludur.');
    }

    // Plant-specific advice
    const plantAdvice = {
      tomato: 'Domates üretimi için yüksek nem kontrollü sistemler tercih edin.',
      cucumber: 'Salatalık için sıcaklık stabilitesi çok önemlidir.',
      pepper: 'Biber üretiminde iyi havalandırma sistemi gereklidir.',
      strawberry: 'Çilek için soğutma sistemi ve hassas nem kontrolü gerekir.'
    };

    if (plantAdvice[inputs.plantType]) {
      advice.push(plantAdvice[inputs.plantType]);
    }

    // Automation advice
    if (inputs.automationLevel === 'full') {
      advice.push('Tam otomasyon sistemi kuruyorsanız, yedek sensör takımı bulundurun.');
    }

    // Energy advice
    if (inputs.energySource === 'solar') {
      advice.push('Güneş enerjisi sistemi için enerji depolama çözümü eklemeyi düşünün.');
    }

    // Budget advice
    if (inputs.budgetRange === 'low') {
      advice.push('Düşük bütçe için önce temel sistemleri kurun, kademeli olarak geliştirin.');
    }

    // Location advice
    const locationAdvice = {
      antalya: 'Antalya ikliminde yaz aylarında ekstra soğutma sistemi gerekebilir.',
      istanbul: 'İstanbul ikliminde nem kontrolü ve ısıtma sistemi önemlidir.',
      izmir: 'İzmir için rüzgar dayanıklı konstrüksiyon tercih edin.'
    };

    if (locationAdvice[inputs.location]) {
      advice.push(locationAdvice[inputs.location]);
    }

    // General advice
    advice.push('Kurulum öncesi zemin analizi yaptırın ve drenaj sistemi planlayın.');
    advice.push('Elektrik alt yapısını ekipman ihtiyaçlarına göre boyutlandırın.');
    advice.push('Bakım planlaması için yerel servis ağı olan markaları tercih edin.');

    return advice.slice(0, 6); // Return max 6 recommendations
  }
}

export const equipmentService = new EquipmentService();

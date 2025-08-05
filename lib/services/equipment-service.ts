import { API_CONFIG, ApiResponse } from '../api-config';

export interface EquipmentItem {
  id: string;
  name: string;
  category: 'structure' | 'climate' | 'irrigation' | 'automation' | 'energy' | 'monitoring';
  type: string;
  brand: string;
  model: string;
  price: number; // TL
  currency: 'TL' | 'USD' | 'EUR';
  specifications: {
    capacity?: string;
    powerConsumption?: string;
    dimensions?: string;
    weight?: string;
    efficiency?: string;
    warranty?: string;
    certification?: string[];
  };
  suitability: {
    greenhouseSize: 'small' | 'medium' | 'large' | 'any';
    climateZone: string[];
    cropTypes: string[];
    budgetRange: 'budget' | 'mid-range' | 'premium';
  };
  features: string[];
  pros: string[];
  cons: string[];
  installationComplexity: 'easy' | 'medium' | 'complex';
  maintenanceLevel: 'low' | 'medium' | 'high';
  energyRating: 'A+' | 'A' | 'B' | 'C' | 'D';
  supplierInfo: {
    name: string;
    location: string;
    contact: string;
    deliveryTime: string;
  };
}

export interface EquipmentRecommendation {
  category: string;
  priority: 'essential' | 'recommended' | 'optional';
  items: EquipmentItem[];
  totalCost: number;
  reasoning: string;
  alternatives: string[];
}

export interface EquipmentPackage {
  id: string;
  name: string;
  description: string;
  categories: EquipmentRecommendation[];
  totalCost: number;
  savings: number;
  suitableFor: {
    greenhouseSize: string;
    cropType: string;
    budget: string;
  };
  timeline: {
    planning: string;
    procurement: string;
    installation: string;
    commissioning: string;
  };
}

class EquipmentService {
  private readonly equipmentDatabase: EquipmentItem[] = [
    // Structure Equipment
    {
      id: 'struct_001',
      name: 'Galvanizli Çelik İskelet Sistemi',
      category: 'structure',
      type: 'frame',
      brand: 'SeraMax',
      model: 'SM-2024',
      price: 180,
      currency: 'TL',
      specifications: {
        dimensions: '6m genişlik destekli',
        weight: '25 kg/m²',
        warranty: '15 yıl',
        certification: ['TSE', 'CE']
      },
      suitability: {
        greenhouseSize: 'any',
        climateZone: ['Akdeniz', 'Ege', 'Marmara'],
        cropTypes: ['domates', 'salatalik', 'biber'],
        budgetRange: 'mid-range'
      },
      features: ['Korozyona dayanıklı', 'Kolay montaj', 'Modüler tasarım'],
      pros: ['Uzun ömürlü', 'Bakım gerektirmez', 'Güçlü yapı'],
      cons: ['Orta seviye maliyet', 'Ağır'],
      installationComplexity: 'medium',
      maintenanceLevel: 'low',
      energyRating: 'A',
      supplierInfo: {
        name: 'SeraMax Türkiye',
        location: 'Antalya',
        contact: '0242 XXX XX XX',
        deliveryTime: '2-3 hafta'
      }
    },
    {
      id: 'climate_001',
      name: 'Akıllı İklim Kontrol Sistemi',
      category: 'climate',
      type: 'climate_control',
      brand: 'ClimatePro',
      model: 'CP-Smart-2024',
      price: 15000,
      currency: 'TL',
      specifications: {
        capacity: '1000 m² sera',
        powerConsumption: '2.5 kW',
        warranty: '3 yıl',
        certification: ['CE', 'IP65']
      },
      suitability: {
        greenhouseSize: 'medium',
        climateZone: ['tüm bölgeler'],
        cropTypes: ['tüm ürünler'],
        budgetRange: 'premium'
      },
      features: ['Otomatik sıcaklık kontrolü', 'Nem kontrolü', 'Mobil uygulama'],
      pros: ['Tam otomatik', 'Enerji tasarrufu', 'Uzaktan kontrol'],
      cons: ['Yüksek maliyet', 'Karmaşık kurulum'],
      installationComplexity: 'complex',
      maintenanceLevel: 'medium',
      energyRating: 'A+',
      supplierInfo: {
        name: 'ClimatePro Türkiye',
        location: 'İstanbul',
        contact: '0212 XXX XX XX',
        deliveryTime: '4-6 hafta'
      }
    },
    {
      id: 'irrigation_001',
      name: 'Damla Sulama Sistemi',
      category: 'irrigation',
      type: 'drip_irrigation',
      brand: 'AquaTech',
      model: 'AT-Drip-Pro',
      price: 45,
      currency: 'TL',
      specifications: {
        capacity: 'M² başına',
        powerConsumption: '0.5 kW pompa',
        warranty: '2 yıl',
        efficiency: '%95 su verimliliği'
      },
      suitability: {
        greenhouseSize: 'any',
        climateZone: ['tüm bölgeler'],
        cropTypes: ['domates', 'salatalik', 'biber', 'patlican'],
        budgetRange: 'budget'
      },
      features: ['Su tasarrufu', 'Gübreleme entegrasyonu', 'Otomatik timer'],
      pros: ['Düşük maliyet', 'Kolay kurulum', 'Su tasarrufu'],
      cons: ['Manuel ayar gerekir', 'Düzenli temizlik'],
      installationComplexity: 'easy',
      maintenanceLevel: 'medium',
      energyRating: 'A',
      supplierInfo: {
        name: 'AquaTech Sulama',
        location: 'Mersin',
        contact: '0324 XXX XX XX',
        deliveryTime: '1-2 hafta'
      }
    },
    {
      id: 'energy_001',
      name: 'Güneş Paneli Sistemi',
      category: 'energy',
      type: 'solar_panel',
      brand: 'SolarMax',
      model: 'SM-400W',
      price: 2500,
      currency: 'TL',
      specifications: {
        capacity: '400W panel',
        efficiency: '%22 verimlilik',
        warranty: '25 yıl',
        certification: ['TÜV', 'CE']
      },
      suitability: {
        greenhouseSize: 'any',
        climateZone: ['Akdeniz', 'Ege', 'İç Anadolu'],
        cropTypes: ['tüm ürünler'],
        budgetRange: 'premium'
      },
      features: ['Temiz enerji', 'Uzun ömür', 'Düşük bakım'],
      pros: ['Enerji tasarrufu', 'Çevre dostu', 'Devlet teşviki'],
      cons: ['Yüksek başlangıç maliyeti', 'Hava şartlarına bağımlı'],
      installationComplexity: 'complex',
      maintenanceLevel: 'low',
      energyRating: 'A+',
      supplierInfo: {
        name: 'SolarMax Enerji',
        location: 'Ankara',
        contact: '0312 XXX XX XX',
        deliveryTime: '6-8 hafta'
      }
    },
    {
      id: 'monitoring_001',
      name: 'IoT Sensör Paketi',
      category: 'monitoring',
      type: 'sensors',
      brand: 'SmartFarm',
      model: 'SF-IoT-2024',
      price: 3500,
      currency: 'TL',
      specifications: {
        capacity: '1000 m² sera',
        powerConsumption: '0.1 kW',
        warranty: '2 yıl',
        certification: ['CE', 'WiFi']
      },
      suitability: {
        greenhouseSize: 'medium',
        climateZone: ['tüm bölgeler'],
        cropTypes: ['tüm ürünler'],
        budgetRange: 'mid-range'
      },
      features: ['Sıcaklık sensörü', 'Nem sensörü', 'Toprak sensörü', 'Mobil app'],
      pros: ['Gerçek zamanlı veri', 'Otomatik uyarılar', 'Trend analizi'],
      cons: ['İnternet bağımlılığı', 'Teknik bilgi gerekir'],
      installationComplexity: 'medium',
      maintenanceLevel: 'low',
      energyRating: 'A+',
      supplierInfo: {
        name: 'SmartFarm Tech',
        location: 'İzmir',
        contact: '0232 XXX XX XX',
        deliveryTime: '2-3 hafta'
      }
    }
  ];

  async getEquipmentRecommendations(
    greenhouseSpecs: {
      area: number;
      type: string;
      location: string;
      budget: number;
      cropType: string;
      automationLevel: 'basic' | 'intermediate' | 'advanced';
    }
  ): Promise<ApiResponse<EquipmentRecommendation[]>> {
    try {
      const recommendations: EquipmentRecommendation[] = [];
      
      // Categorize recommendations
      const categories = ['structure', 'climate', 'irrigation', 'energy', 'monitoring', 'automation'];
      
      for (const category of categories) {
        const categoryItems = this.equipmentDatabase.filter(item => 
          item.category === category &&
          this.isEquipmentSuitable(item, greenhouseSpecs)
        );

        if (categoryItems.length > 0) {
          const priority = this.getCategoryPriority(category, greenhouseSpecs.automationLevel);
          const bestItems = this.selectBestItems(categoryItems, greenhouseSpecs.budget);
          
          recommendations.push({
            category: this.getCategoryName(category),
            priority,
            items: bestItems,
            totalCost: bestItems.reduce((sum, item) => sum + item.price, 0),
            reasoning: this.getReasoningForCategory(category, greenhouseSpecs),
            alternatives: this.getAlternatives(category)
          });
        }
      }

      // Sort by priority
      const priorityOrder = { essential: 0, recommended: 1, optional: 2 };
      recommendations.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

      return {
        success: true,
        data: recommendations
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Equipment recommendation failed'
      };
    }
  }

  async getEquipmentPackages(
    greenhouseSpecs: {
      area: number;
      type: string;
      budget: number;
      cropType: string;
    }
  ): Promise<ApiResponse<EquipmentPackage[]>> {
    try {
      const packages: EquipmentPackage[] = [
        {
          id: 'basic_package',
          name: 'Temel Sera Paketi',
          description: 'Başlangıç seviyesi sera kurulumu için gerekli temel ekipmanlar',
          categories: await this.getBasicPackageItems(greenhouseSpecs),
          totalCost: 0, // Will be calculated
          savings: 15,
          suitableFor: {
            greenhouseSize: 'küçük-orta',
            cropType: 'genel',
            budget: 'ekonomik'
          },
          timeline: {
            planning: '1 hafta',
            procurement: '2-3 hafta',
            installation: '1-2 hafta',
            commissioning: '3-5 gün'
          }
        },
        {
          id: 'professional_package',
          name: 'Profesyonel Sera Paketi',
          description: 'Ticari sera işletmesi için optimize edilmiş ekipman seti',
          categories: await this.getProfessionalPackageItems(greenhouseSpecs),
          totalCost: 0,
          savings: 20,
          suitableFor: {
            greenhouseSize: 'orta-büyük',
            cropType: 'ticari',
            budget: 'orta seviye'
          },
          timeline: {
            planning: '2 hafta',
            procurement: '4-6 hafta',
            installation: '2-3 hafta',
            commissioning: '1 hafta'
          }
        },
        {
          id: 'premium_package',
          name: 'Premium Akıllı Sera Paketi',
          description: 'Tam otomatik, IoT entegreli, premium sera sistemi',
          categories: await this.getPremiumPackageItems(greenhouseSpecs),
          totalCost: 0,
          savings: 25,
          suitableFor: {
            greenhouseSize: 'büyük',
            cropType: 'yüksek değerli',
            budget: 'premium'
          },
          timeline: {
            planning: '3 hafta',
            procurement: '6-8 hafta',
            installation: '3-4 hafta',
            commissioning: '2 hafta'
          }
        }
      ];

      // Calculate total costs
      packages.forEach(pkg => {
        pkg.totalCost = pkg.categories.reduce((sum, cat) => 
          sum + cat.items.reduce((catSum, item) => catSum + item.price, 0), 0
        );
      });

      return {
        success: true,
        data: packages
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Package generation failed'
      };
    }
  }

  private isEquipmentSuitable(item: EquipmentItem, specs: any): boolean {
    // Check greenhouse size compatibility
    if (item.suitability.greenhouseSize !== 'any') {
      const sizeCategory = specs.area < 200 ? 'small' : specs.area < 1000 ? 'medium' : 'large';
      if (item.suitability.greenhouseSize !== sizeCategory) return false;
    }

    // Check crop type compatibility
    if (!item.suitability.cropTypes.includes(specs.cropType) && 
        !item.suitability.cropTypes.includes('tüm ürünler')) {
      return false;
    }

    // Check budget compatibility
    const budgetCategory = specs.budget < 100000 ? 'budget' : specs.budget < 300000 ? 'mid-range' : 'premium';
    const itemBudgetOrder = { budget: 1, 'mid-range': 2, premium: 3 };
    const specsBudgetOrder = { budget: 1, 'mid-range': 2, premium: 3 };
    
    return itemBudgetOrder[item.suitability.budgetRange] <= specsBudgetOrder[budgetCategory];
  }

  private getCategoryPriority(category: string, automationLevel: string): 'essential' | 'recommended' | 'optional' {
    const priorities: Record<string, Record<string, 'essential' | 'recommended' | 'optional'>> = {
      structure: { basic: 'essential', intermediate: 'essential', advanced: 'essential' },
      irrigation: { basic: 'essential', intermediate: 'essential', advanced: 'essential' },
      climate: { basic: 'recommended', intermediate: 'essential', advanced: 'essential' },
      energy: { basic: 'optional', intermediate: 'recommended', advanced: 'recommended' },
      monitoring: { basic: 'optional', intermediate: 'recommended', advanced: 'essential' },
      automation: { basic: 'optional', intermediate: 'optional', advanced: 'essential' }
    };

    return priorities[category]?.[automationLevel] || 'optional';
  }

  private selectBestItems(items: EquipmentItem[], budget: number): EquipmentItem[] {
    // Sort by value for money (features/price ratio)
    return items
      .sort((a, b) => {
        const aValue = (a.features.length + a.pros.length) / a.price;
        const bValue = (b.features.length + b.pros.length) / b.price;
        return bValue - aValue;
      })
      .slice(0, 3); // Top 3 recommendations
  }

  private getCategoryName(category: string): string {
    const names: Record<string, string> = {
      structure: 'Yapı Sistemi',
      climate: 'İklim Kontrolü',
      irrigation: 'Sulama Sistemi',
      energy: 'Enerji Sistemi',
      monitoring: 'İzleme Sistemi',
      automation: 'Otomasyon Sistemi'
    };
    return names[category] || category;
  }

  private getReasoningForCategory(category: string, specs: any): string {
    const reasoning: Record<string, string> = {
      structure: `${specs.area} m² sera alanınız için dayanıklı ve ekonomik iskelet sistemi gereklidir`,
      climate: `${specs.location} iklim koşullarında optimal büyüme için iklim kontrolü önemlidir`,
      irrigation: `${specs.cropType} üretimi için verimli sulama sistemi gereklidir`,
      energy: 'Enerji maliyetlerini düşürmek ve sürdürülebilirlik için önerilir',
      monitoring: 'Verim optimizasyonu ve sorun tespiti için önemlidir',
      automation: 'İşçilik maliyetlerini düşürmek ve verimlilik artırmak için gereklidir'
    };
    return reasoning[category] || '';
  }

  private getAlternatives(category: string): string[] {
    const alternatives: Record<string, string[]> = {
      structure: ['Alüminyum iskelet', 'Ahşap konstrüksiyon', 'Hibrit sistemler'],
      climate: ['Doğal havalandırma', 'Pasif iklim kontrolü', 'Hibrit sistemler'],
      irrigation: ['Yağmurlama sistemi', 'Manuel sulama', 'Hidroponik sistem'],
      energy: ['Şebeke elektriği', 'Jeneratör sistemi', 'Hibrit enerji'],
      monitoring: ['Manuel takip', 'Basit termometreler', 'Kısmi otomasyon'],
      automation: ['Manuel işletim', 'Yarı otomatik', 'Kademeli otomasyon']
    };
    return alternatives[category] || [];
  }

  private async getBasicPackageItems(specs: any): Promise<EquipmentRecommendation[]> {
    const response = await this.getEquipmentRecommendations({
      ...specs,
      automationLevel: 'basic'
    });
    
    return response.success ? response.data?.filter(cat => 
      cat.priority === 'essential'
    ) || [] : [];
  }

  private async getProfessionalPackageItems(specs: any): Promise<EquipmentRecommendation[]> {
    const response = await this.getEquipmentRecommendations({
      ...specs,
      automationLevel: 'intermediate'
    });
    
    return response.success ? response.data?.filter(cat => 
      ['essential', 'recommended'].includes(cat.priority)
    ) || [] : [];
  }

  private async getPremiumPackageItems(specs: any): Promise<EquipmentRecommendation[]> {
    const response = await this.getEquipmentRecommendations({
      ...specs,
      automationLevel: 'advanced'
    });
    
    return response.success ? response.data || [] : [];
  }
}

export const equipmentService = new EquipmentService();

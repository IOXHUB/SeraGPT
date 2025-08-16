# Admin API Endpoints

Bu dosya admin panelinin ihtiyaç duyduğu API endpoint'lerini listeler. Tüm mock veriler kaldırıldı ve gerçek API'ler bekleniyor.

## Gerekli API Endpoints

### Dashboard
- `GET /api/admin/dashboard` - Admin dashboard istatistikleri

### AI Training
- `GET /api/admin/ai-training` - Eğitim işleri ve veri setleri
- `POST /api/admin/ai-training` - Yeni eğitim başlat

### Users Management  
- `GET /api/admin/users` - Kullanıcı listesi
- `PATCH /api/admin/users/{id}/status` - Kullanıcı durumu güncelle
- `PATCH /api/admin/users/{id}/role` - Kullanıcı rolü güncelle

### Analysis Management
- `GET /api/admin/analysis-types` - Analiz türleri listesi
- `POST /api/admin/analysis-types` - Yeni analiz türü oluştur

### Backup System
- `GET /api/admin/backups` - Yedek listesi ve istatistikler
- `POST /api/admin/backups` - Yeni yedek başlat

### API Testing
- `GET /api/admin/api-endpoints` - Test edilebilir endpoint'ler
- `POST /api/admin/api-test` - API testi çalıştır

### Cache Management
- `GET /api/admin/cache` - Cache verileri ve istatistikler
- `DELETE /api/admin/cache` - Cache temizle

### Deployment
- `GET /api/admin/deployments` - Deployment geçmişi
- `POST /api/admin/deployments` - Yeni deployment başlat

### User Dashboard APIs
- `GET /api/user/stats` - Kullanıcı istatistikleri
- `GET /api/chat/sessions` - Chat oturumları
- `GET /api/analysis/user` - Kullanıcının analizleri
- `POST /api/analysis/create` - Yeni analiz oluştur
- `POST /api/analysis/preview` - Analiz önizlemesi
- `DELETE /api/analysis/{id}` - Analiz sil

## Önemli Notlar

1. Tüm mock veriler ve setTimeout gecikmeleri kaldırıldı
2. API'ler gerçek veriler döndürmelidir
3. Hata durumları uygun HTTP status kodları ile işlenmeli
4. Boş durumlar için empty state UI'lar hazırlandı
5. Loading state'ler tüm sayfalarda mevcut

## Örnek API Response Formatları

```json
// GET /api/admin/dashboard
{
  "success": true,
  "data": {
    "stats": {
      "totalUsers": 0,
      "activeUsers": 0,
      "totalAnalyses": 0,
      "systemHealth": 0,
      "apiCalls": 0,
      "revenue": 0,
      "errorCount": 0,
      "backupStatus": "unknown"
    },
    "systemStatus": {
      "server": { "status": "unknown", "cpu": 0, "memory": 0, "disk": 0 },
      "database": { "status": "unknown", "connections": 0, "queries": 0 },
      "apis": { "active": 0, "failing": 0, "avgResponse": 0 },
      "cache": { "hitRate": 0, "size": "0GB", "evictions": 0 }
    }
  }
}
```

Bu API'ler implement edilmeden admin paneli boş state'lerde kalacaktır.

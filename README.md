# Casa de Banquetes Sarahy — Rediseño Web Élite ($1,000,000 Experience)

> **Sitio Web Oficial (Dominio Destino):** [`https://www.casadebanquetessarahy.com/`](https://www.casadebanquetessarahy.com/)  
> **Despliegue de Producción en Vercel:** [`https://casadebanquetessarahy.vercel.app/`](https://casadebanquetessarahy.vercel.app/)  
> **Cotizador en Línea 24/7:** [`https://app.casadebanquetessarahy.com/`](https://app.casadebanquetessarahy.com/)  
> **Repositorio Oficial GitHub:** [`https://github.com/Cryptogame31/casadebanquetessarahy.com`](https://github.com/Cryptogame31/casadebanquetessarahy.com)  
> **ID Proyecto Vercel:** `prj_jhC35i9a3d1lSjOWz85eLLlAUmhR` (Equipo: `crececonexpandete31` / `team_gtxNNXDbRePZrvIoRJ0ULsmp`)  
> **Ecosistema:** EXPÁNDETE OS — `01 — BANQUETES SARAHY` (Ficha Maestra: `BS-WEB-001`)  
> **Normativa Técnica:** `ET-SEO-001` (Estándar Global Expándete: SEO + GEO + AEO + AI Search Optimization)

---

## 1. Visión y Propósito del Rediseño

Este repositorio contiene la reconstrucción integral de la presencia web pública de **Casa de Banquetes Sarahy** en Medellín y el Área Metropolitana.

### 🌟 Problemas Resueltos del Sitio Anterior (Hostinger / Zyro AI Builder):
1. **Precios Desactualizados Eliminados:** La web anterior contenía decenas de subpáginas con tarifas estáticas obsoletas. Este rediseño integra una **transparencia de precios total** mediante un **Simulador Interactivo Dopamínico** conectado directamente al **Cotizador Oficial en Tiempo Real (`https://app.casadebanquetessarahy.com/`)**, garantizando propuestas actualizadas al centavo con disponibilidad de salones verificada.
2. **Escaneo y Reorganización de 123 URLs:** Se escanearon las rutas del `sitemap.xml` original de Hostinger y se normalizaron **118 servicios, sedes y paquetes oficiales** en una base de datos estructurada (`data/services.json`), con buscador omnibar en tiempo real y fotografía real de alta resolución.
3. **Consolidación Legal y Cumplimiento Google Play Store:** Las 4 rutas legales del sitio anterior (`/refund-policy`, `/darse-de-baja-play-store`, `/darse-de-baja` y `/politica-de-privacidad-y-otras`) quedaron unificadas en [`politicas.html`](./politicas.html) con enlaces discretos ubicados **únicamente en el footer inferior** de todas las páginas y reescrituras limpias en [`vercel.json`](./vercel.json).
4. **Estética de Alta Gama ($1,000,000 Experience):**
   - Paleta *Obsidian Slate* (`#07090E`) y *Royal Champagne Gold* (`#D4AF37`).
   - Tipografía `Cinzel` y `Playfair Display` combinada con `Plus Jakarta Sans`.
   - Micro-interacciones: tarjetas con glassmorphism, slider interactivo de invitados, animaciones con `canvas-confetti` y botones directos al Cotizador y WhatsApp Concierge.

---

## 2. Arquitectura de Archivos del Proyecto

```
05 — LANDING OFICIAL CASADEBANQUETESSARAHY.COM/
├── index.html                          # Experiencia Principal + Simulador + Catálogo 118 servicios
├── bodas.html                          # Landing especializada en Bodas de Ensueño + Galería y Reels
├── quinces.html                        # Landing especializada en Quinceañeras Élite + Galería y Reels
├── salones.html                        # Directorio de Sedes (Prado Colonial, Playa Real, Duquesa, Valencia, Buenos Aires)
├── servicios.html                      # Catálogo visual de Menús, Menaje, Cabina 360°, Robots LED y Domicilio
├── politicas.html                      # Políticas unificadas (Reembolsos, Fotografía, Privacidad, Baja y Play Store)
├── assets/
│   ├── js/sarahy-gallery.js            # Motor compartido de Galerías Interactivas, Reels MP4 y Lightbox HD
│   └── media/                          # Banco curado (633 WebP reales + logo + 17 Reels MP4 sin precios obsoletos)
├── data/
│   ├── galleries.json                  # Manifiesto estructurado de álbumes fotográficos y reels en vivo
│   └── services.json                   # Base de datos normalizada y saneada de 118 servicios escaneados
├── robots.txt                          # Acceso permitido para Googlebot, Bingbot, Applebot, OAI-SearchBot, PerplexityBot y Claude-Web
├── sitemap.xml                         # Mapa del sitio canónico (6 URLs principales)
├── llms.txt                            # Resumen estructurado para motores generativos de IA
├── vercel.json                         # URLs limpias (cleanUrls), rewrites legales hacia /politicas, headers de seguridad y caché (.webp/.mp4)
├── .gitignore                          # Exclusión de temporales y .vercel/
├── ABRIR_LANDING_REDISEÑO_SARAHY.bat   # Lanzador rápido local en Windows
└── README.md                           # Documentación técnica del repositorio
```

---

## 3. Integración con el Cotizador Oficial en Tiempo Real

El llamado a la acción principal en toda la web está conectado al SaaS de producción:
- **URL Cotizador Oficial:** [`https://app.casadebanquetessarahy.com/`](https://app.casadebanquetessarahy.com/)
- Permite a los clientes:
  - Seleccionar salón disponible según la fecha deseada.
  - Escalar el banquete para el número exacto de invitados.
  - Agregar servicios opcionales (pistas LED, pólvora fría, recreación, fotografía profesional, etc.).
  - Descargar su propuesta formal en PDF corporativo y activar el seguimiento comercial vía **n8n**.

---

## 4. Agendamiento de Visitas en Prado Colonial (`BS-AGE-001` / `BS-AGE-002`)

El sitio incluye módulo de solicitud de visitas presenciales regido por las políticas operativas vigentes:
- **Sede de encuentro inicial:** Prado Colonial (Medellín).
- **Horario:** Lunes a Sábado de 11:00 a. m. a 6:00 p. m. (bloques de 30 minutos).
- **Aforo:** Máximo 3 familias simultáneas por bloque horario.
- **Confirmación:** WhatsApp oficial (`+57 316 304 8505` / `+57 319 718 8973`).

---

## 5. Políticas Legales Unificadas (`politicas.html`) y Rewrites en Vercel

Todas las páginas (`index.html`, `bodas.html`, `quinces.html`, `salones.html` y `servicios.html`) enlazan discretamente en su `<footer>` hacia las 4 secciones con ancla de `politicas.html`:
1. **`#reembolsos`:** Reprogramación sin multa con mínimo 15 días calendario de anticipación, escala oficial de penalidades de cancelación (`$100.000` a `$1.700.000 COP`), anticipos de reserva no reembolsables y contacto de Gerencia (`316 304 8505`).
2. **`#fotografia`:** Entrega digital en `10 días hábiles` (`BS-OPE-001`), trabajos físicos hasta en `45 días hábiles` tras entrega de selección, plazo máximo de `40 días calendario` para reclamar tras notificación y garantía de `60 días calendario`.
3. **`#privacidad`:** Política de Privacidad, tratamiento de datos personales y derechos de Habeas Data.
4. **`#darse-de-baja`:** Solicitud directa de baja / eliminación de datos (formulario conectado a WhatsApp oficial) + bloque oficial en inglés **`Account Deletion Policy`** exigido por **Google Play Console**.

Gracias a `"cleanUrls": true` y `rewrites` en [`vercel.json`](./vercel.json), las siguientes rutas históricas responden `200 OK` sirviendo `/politicas`:
- `/refund-policy` → `/politicas`
- `/darse-de-baja-play-store` → `/politicas`
- `/darse-de-baja` → `/politicas`
- `/politica-de-privacidad-y-otras` → `/politicas`

---

## 6. Cumplimiento Normativo `ET-SEO-001`

- **Schema.org JSON-LD:** Marcado semántico válido con `@graph` (`CateringService` + `EventVenue`, y `FAQPage`).
- **AEO (Answer Engine Optimization):** Respuestas directas a preguntas frecuentes comerciales sobre precios dinámicos, visitas en Prado Colonial y entrega fotográfica a 10 días hábiles.
- **GEO (Generative Engine Optimization):** Archivo `llms.txt` y habilitación explícita de `OAI-SearchBot`, `PerplexityBot` y `Claude-Web` en `robots.txt`.
- **Seguridad HTTP (`vercel.json`):** `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `X-XSS-Protection: 1; mode=block` y caché inmutable de 1 año para activos gráficos.

---

## 7. Despliegue y Cambio de Dominio en Vercel

- **Rama conectada en GitHub:** `main` (`Cryptogame31/casadebanquetessarahy.com`).
- **URL de pruebas/producción actual:** [`https://casadebanquetessarahy.vercel.app/`](https://casadebanquetessarahy.vercel.app/).
- **Para conectar el dominio `casadebanquetessarahy.com` cuando se autorice:**
  1. En Vercel (**Project Settings → Domains**), agregar `casadebanquetessarahy.com` y `www.casadebanquetessarahy.com`.
  2. En el panel DNS de Hostinger, apuntar únicamente el registro `A` de `@` hacia `76.76.21.21` y el `CNAME` de `www` hacia `cname.vercel-dns.com`.
  3. **No modificar** el subdominio **`app`** (`app.casadebanquetessarahy.com`), que apunta al cotizador y sistema v16 en el VPS.

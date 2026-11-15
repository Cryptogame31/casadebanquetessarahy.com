# Casa de Banquetes Sarahy — Rediseño Web Élite ($1,000,000 Experience)

> **Sitio Web Oficial:** [`https://www.casadebanquetessarahy.com/`](https://www.casadebanquetessarahy.com/)  
> **Cotizador en Línea 24/7:** [`https://app.casadebanquetessarahy.com/`](https://app.casadebanquetessarahy.com/)  
> **Ecosistema:** EXPÁNDETE OS — 01 Banquetes Sarahy  
> **Normativa Técnica:** `ET-SEO-001` (Estándar Global Expándete: SEO + GEO + AEO + AI Search Optimization) & `ET-DEV-002`  
> **Cuenta Oficial GitHub:** `https://github.com/Cryptogame31/`

---

## 1. Visión y Propósito del Rediseño

Este repositorio contiene la reconstrucción integral de la presencia web pública de **Casa de Banquetes Sarahy**.

### 🌟 Problemas Resueltos del Sitio Anterior (Hostinger / Zyro AI Builder):
1. **Precios Desactualizados Eliminados:** La web anterior contenía decenas de subpáginas con tarifas estáticas obsoletas. Este rediseño integra una **transparencia de precios total** mediante un **Simulador Interactivo Dopamínico** conectado directamente al **Cotizador Oficial en Tiempo Real (`https://app.casadebanquetessarahy.com/`)**, garantizando propuestas al centavo con disponibilidad de salones verificada.
2. **Escaneo y Reorganización de 123 Rutas:** Se escanearon y normalizaron todas las subpáginas originales de Hostinger, consolidando un catálogo interactivo con buscador omnibar de **118 servicios y menaje**, con fotografía real de alta resolución.
3. **Estética de Alta Gama ($1,000,000 Dopamina Visual):**
   - Paleta de color *Obsidian Slate* (`#07090E`), *Royal Champagne Gold* (`#D4AF37`) y acentos de brillo.
   - Tipografía aristocrática con `Cinzel` y `Playfair Display` combinada con la legibilidad moderna de `Plus Jakarta Sans`.
   - Micro-interacciones: tarjetas con glassmorphism, resplandores en gradiente, slider interactivo de invitados con animación, efectos de confeti celebratory (`canvas-confetti`) y concierge flotante.

---

## 2. Arquitectura de Archivos del Proyecto

```
05 — LANDING OFICIAL CASADEBANQUETESSARAHY.COM/
├── index.html                  # Experiencia Principal SPA + Simulador + Catálogo 118 servicios
├── bodas.html                  # Landing especializada en Bodas de Ensueño
├── quinces.html                # Landing especializada en Quinceañeras Élite
├── salones.html                # Directorio exhaustivo de Sedes Coloniales y Fincas Campestres
├── servicios.html              # Catálogo de Menús 3 Tiempos, Menaje y Efectos Especiales
├── robots.txt                  # Directivas de acceso para Googlebot, Bingbot, OAI-SearchBot y PerplexityBot
├── sitemap.xml                 # Mapa del sitio canónico
├── llms.txt                    # Resumen denso para motores de búsqueda de Inteligencia Artificial
├── vercel.json                 # Configuración de cabeceras, compresión y caché estático
├── .gitignore                  # Exclusión de temporales
├── data/
│   └── services.json           # Base de datos limpia de las 118 subpáginas y servicios escaneados
└── README.md                   # Documentación técnica completa
```

---

## 3. Integración con el Cotizador Oficial en Tiempo Real

El botón de acción principal de toda la plataforma está conectado al SaaS de producción:
- **URL Cotizador Oficial:** `https://app.casadebanquetessarahy.com/`
- Permite a los novios, quinceañeras y empresas:
  - Seleccionar salón disponible en el calendario gremial.
  - Escalar el banquete para el número exacto de invitados.
  - Agregar servicios opcionales (pistas LED, pólvora fría, recreación, fotografía profesional).
  - Descargar de inmediato su propuesta formal en PDF corporativo (Slate/Gold) y disparar el webhook hacia **n8n** para seguimiento por WhatsApp.

---

## 4. Agendamiento de Visitas en Prado Colonial (`BS-AGE-001` / `BS-AGE-002`)

El sitio web incorpora un módulo de reserva de visitas presenciales con las siguientes reglas aprobadas por la dirección:
- **Sede de encuentro inicial:** Prado Colonial (Medellín).
- **Horario:** Lunes a Sábado de 11:00 a. m. a 6:00 p. m. (14 bloques de 30 minutos).
- **Aforo:** Máximo 3 familias simultáneas por bloque.
- **Canal de confirmación:** WhatsApp oficial (`+57 316 304 8505` / `+57 319 718 8973`).

---

## 5. Cumplimiento Normativo `ET-SEO-001`

- **Schema.org JSON-LD:** Marcado semántico completo como `CateringService`, `EventVenue`, `Organization`, `WebSite`, `WebPage` y `FAQPage`.
- **AEO (Answer Engine Optimization):** Respuestas directas a las preguntas frecuentes clave sobre precios dinámicos, visitas en Prado Colonial y entrega fotográfica a 10 días hábiles (`BS-OPE-001`).
- **GEO (Generative Engine Optimization):** Indexación optimizada para ChatGPT Search, Perplexity, Copilot y Google AI Overviews a través de `llms.txt` y metadatos verificados.
- **Rendimiento:** Cero dependencias pesadas que bloqueen el renderizado; carga ultrarrápida con CDN global y Tailwind CSS.

---

## 6. Instrucciones de Despliegue

### Opción A — Despliegue en GitHub Pages:
1. Subir a la rama `main` del repositorio `https://github.com/Cryptogame31/casadebanquetessarahy.com`.
2. En Settings $\rightarrow$ Pages, seleccionar la rama `main` y raíz `/`.

### Opción B — Despliegue en Vercel / Netlify:
1. Importar el repositorio directamente. El archivo `vercel.json` autoconfigurará las cabeceras de seguridad y URLs limpias.

### Opción C — Subida a Hostinger:
1. Comprimir el contenido de esta carpeta y subirlo a la carpeta `public_html` del administrador de archivos de Hostinger.

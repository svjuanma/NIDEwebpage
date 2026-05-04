# Kid plays Frontend - React Web App

Este repositorio contiene la interfaz de usuario y los paneles de control del sistema educativo **Kid plays**. Es una aplicación web tipo *Single Page Application* (SPA) que permite a administradores, instructores, tutores y estudiantes interactuar con la plataforma, además de integrar de forma nativa el videojuego educativo en WebGL.

Desarrollado como proyecto integrador para el socio formador **NIDE** en la unidad de formación *“Construcción de Software y Toma de Decisiones”* del **Tecnológico de Monterrey, Campus Estado de México**.

---

## Repositorios del Ecosistema

El sistema completo se compone de tres piezas fundamentales:

*   **Frontend Web (Este repositorio):**
*   [**Backend API:**](https://github.com/JBanuel/backendNIDE.git)
*   [**Videojuego:**](https://github.com/NewAndifer/VideojuegoNIDE.git)

---

## Stack Tecnológico

*   **Librería Principal:** [React 18](https://react.dev/)
*   **Lenguaje:** TypeScript (`.tsx`).
*   **Empaquetador/Build Tool:** [Vite](https://vitejs.dev/).
*   **Runtime:** Node.js v24.14.1.

---

## Estructura Principal

*   `/src`: Código fuente.
*   `/public/unityBuild`: Archivos exportados del videojuego en WebGL.
*   `/dist`: Carpeta minificada lista para subirse a producción.

---

## Instalación y Configuración Local

### Requisitos previos
*   [Node.js](https://nodejs.org/) instalado.
*   Servidor Backend activo.

### 1. Clonar e Instalar dependencias

```bash
git clone https://github.com/svjuanma/NIDEwebpage.git
cd frontendNIDE
npm install
```
### 2. Configurar variables de entorno 
Crear archivo `.env` que incluya:
```bash 
VITE_API_URL=direccion_url_del_backend
```
---

## Licencia
Este proyecto se distribuye bajo la Licencia MIT. Puedes consultar el archivo [LICENSE](https://github.com/svjuanma/NIDEwebpage/blob/main/LICENSE) para más detalles.

---
© 2026 - Juan Manuel Sánchez Velázquez | ITESM Campus Estado de México
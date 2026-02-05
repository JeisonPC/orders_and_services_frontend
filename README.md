# Orders and Services Frontend 🚀

> Prueba técnica FullStack Developer - Monokera

Sistema de gestión de pedidos y clientes construido con **Next.js 16**, **React 19** y **TypeScript**, implementando arquitectura limpia, Atomic Design y patrones modernos de desarrollo frontend.

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Arquitectura](#-arquitectura)
- [Tech Stack](#-tech-stack)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Instalación](#-instalación)
- [Variables de Entorno](#-variables-de-entorno)
- [Ejecución](#-ejecución)
- [Decisiones Técnicas](#-decisiones-técnicas)
- [Diagramas C4](#-diagramas-c4)
- [Características Implementadas](#-características-implementadas)

## ✨ Características

- ✅ **Gestión de Pedidos** con filtrado por cliente
- ✅ **Gestión de Clientes** con CRUD completo
- ✅ **Paginación** del lado del servidor con selector de items por página
- ✅ **Estado Global** con Zustand para cliente seleccionado
- ✅ **Caché inteligente** con React Query (independiente por cliente/página)
- ✅ **Interfaz Desktop-like** sin scroll en contenedor principal
- ✅ **Tabla con scroll independiente** (header fijo, body scrollable, footer fijo)
- ✅ **Atomic Design** completo (Atoms → Molecules → Organisms → Templates → Pages)
- ✅ **BFF Pattern** con Next.js API Routes
- ✅ **Clean Architecture** por features
- ✅ **TypeScript** estricto en toda la aplicación
- ✅ **Responsive Design** con CSS Modules

## 🏛️ Arquitectura

El proyecto implementa múltiples patrones arquitectónicos:

### 1. **Atomic Design**
```
UI Layer:
├── atoms/       → Componentes básicos (Button, Label, Input)
├── molecules/   → Combinaciones simples (Field, NavbarBrand, CustomerSelector)
├── organisms/   → Componentes complejos (Table, Modal, Navbar, Sidebar)
├── templates/   → Plantillas con lógica de datos (Client Components)
└── pages/       → Rutas del App Router (Server Components)
```

### 2. **Clean Architecture (por Feature)**
```
Feature Module:
├── types/       → Interfaces TypeScript
├── services/    → HTTP Client (fetch)
├── useCases/    → Lógica de negocio
├── hooks/       → React Query hooks
├── components/  → Componentes específicos del feature
├── config/      → Configuraciones (columnas de tabla, etc.)
└── store/       → Estado global (Zustand)
```

### 3. **BFF (Backend for Frontend)**
```
Client → Service → BFF (API Routes) → Backend Rails
```

**Beneficios del BFF:**
- 🔒 Seguridad: Oculta URLs y credenciales del backend
- 🔄 Transformación: Adapta respuestas del backend al frontend
- 🎯 Agregación: Combina múltiples APIs si es necesario
- ⚡ Cache: Capa adicional de optimización
- 🛡️ CORS: Manejo centralizado

## 🛠 Tech Stack

### Core
- **Next.js 16.1.6** - Framework React con App Router
- **React 19.2.3** - Biblioteca UI con concurrent features
- **TypeScript 5** - Tipado estático

### Estado y Datos
- **TanStack Query v5.90.20** - Server state management, caché, sincronización
- **Zustand v5.0.11** - Global client state (cliente seleccionado)

### Estilos
- **CSS Modules** - Estilos con scope local
- **CSS Variables** - Design tokens para tema

### Backend Integration
- **Orders Backend** - Rails service en puerto 3001
- **Customers Backend** - Rails service en puerto 3002

## 📁 Estructura del Proyecto

```
orders_and_services_frontend/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── api/                      # BFF Layer (API Routes)
│   │   │   ├── orders/               # Proxy a Orders Backend
│   │   │   └── customers/            # Proxy a Customers Backend
│   │   ├── layout.tsx                # Layout raíz con providers
│   │   ├── page.tsx                  # Home page
│   │   ├── orders/page.tsx           # Página de pedidos
│   │   └── clients/page.tsx          # Página de clientes
│   │
│   ├── features/                     # Feature-based modules
│   │   ├── orders/
│   │   │   ├── types/                # Order, OrdersResponse, DTOs
│   │   │   ├── services/             # HTTP client para orders
│   │   │   ├── useCases/             # Lógica de negocio
│   │   │   ├── hooks/                # useOrders, useCreateOrder, etc.
│   │   │   └── config/               # ordersTableColumns
│   │   │
│   │   └── customers/
│   │       ├── types/                # Customer, DTOs
│   │       ├── services/             # HTTP client para customers
│   │       ├── useCases/             # Lógica de negocio
│   │       ├── hooks/                # useCustomers, useCreateCustomer, etc.
│   │       ├── config/               # customersTableColumns
│   │       ├── components/           # CustomerSelector
│   │       └── store/                # customerStore (Zustand)
│   │
│   ├── ui/                           # UI Layer (Atomic Design)
│   │   ├── atoms/
│   │   │   ├── Button/
│   │   │   ├── Label/
│   │   │   └── Input/
│   │   ├── molecules/
│   │   │   ├── Field/
│   │   │   ├── NavbarBrand/
│   │   │   ├── NavbarActions/
│   │   │   └── SidebarFooter/
│   │   ├── organisms/
│   │   │   ├── Table/                # Tabla genérica con paginación
│   │   │   ├── Modal/
│   │   │   ├── Navbar/
│   │   │   ├── Sidebar/
│   │   │   └── PageLayout/           # Layout reutilizable
│   │   └── templates/
│   │       ├── OrdersPageWithData/   # Client Component con lógica
│   │       └── CustomersPageWithData/
│   │
│   ├── lib/
│   │   ├── api-client.ts             # HTTP client base
│   │   └── react-query.ts            # React Query config
│   │
│   ├── providers/
│   │   └── query.provider.tsx        # QueryClientProvider
│   │
│   └── shared/
│       └── hooks/                    # Hooks compartidos
│
├── c4_front.png                      # Diagrama C4 de arquitectura
├── C4-ARCHITECTURE.md                # Documentación de diagramas
└── README.md                         # Este archivo
```

## 🚀 Instalación

### Prerrequisitos

- Node.js 20+ 
- Yarn (recomendado) o npm
- Backends Rails corriendo en puertos 3001 y 3002

### Pasos

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd orders_and_services_frontend
```

2. **Instalar dependencias**
```bash
yarn install
# o
npm install
```

3. **Configurar variables de entorno**

Crear archivo `.env` en la raíz:
```env
NEXT_PUBLIC_ORDERS_API_URL=http://localhost:3001
NEXT_PUBLIC_CUSTOMERS_API_URL=http://localhost:3002
```

## 🔧 Variables de Entorno

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `NEXT_PUBLIC_ORDERS_API_URL` | URL del backend de pedidos | `http://localhost:3001` |
| `NEXT_PUBLIC_CUSTOMERS_API_URL` | URL del backend de clientes | `http://localhost:3002` |

> ⚠️ **Importante**: Las variables con prefijo `NEXT_PUBLIC_` son expuestas al cliente.

## ▶️ Ejecución

### Desarrollo
```bash
yarn dev
```
La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

### Producción
```bash
yarn build
yarn start
```

### Linting
```bash
yarn lint
```

## 🎯 Decisiones Técnicas

### 1. **¿Por qué BFF Pattern?**
- **Seguridad**: Las URLs de los backends Rails no se exponen al cliente
- **Flexibilidad**: Podemos transformar/adaptar respuestas sin modificar el backend
- **Mantenibilidad**: Cambios en el backend no impactan directamente al cliente
- **Escalabilidad**: Podemos agregar lógica de caché, rate limiting, etc.

### 2. **¿Por qué separar Server y Client Components?**
- **Templates**: Client Components con lógica de datos y estado
- **Pages**: Server Components que solo renderizan templates
- **Beneficio**: Mejor rendimiento, menos JavaScript en el cliente

### 3. **¿Por qué React Query + Zustand?**
- **React Query**: Ideal para estado del servidor (pedidos, clientes), caché automático, revalidación
- **Zustand**: Perfecto para estado global del cliente (cliente seleccionado)
- **Separación de responsabilidades**: Cada herramienta para su propósito específico

### 4. **¿Por qué Atomic Design?**
- **Reutilización**: Componentes pequeños y reutilizables
- **Escalabilidad**: Fácil agregar nuevas páginas combinando componentes existentes
- **Testing**: Componentes atómicos son más fáciles de testear
- **Consistencia**: Design system coherente

### 5. **¿Por qué Clean Architecture por Feature?**
- **Cohesión**: Todo lo relacionado a un feature está junto
- **Independencia**: Features no dependen entre sí
- **Testeable**: Capas separadas facilitan el testing
- **Mantenible**: Fácil encontrar y modificar código

### 6. **Paginación del lado del servidor**
- **Performance**: No cargamos todos los datos de golpe
- **Escalabilidad**: Funciona con miles de registros
- **UX**: Respuesta inmediata al cambiar de página
- **Caché**: Cada combinación (cliente/página/perPage) se cachea independientemente

### 7. **Tabla con scroll independiente**
- **UX Desktop**: Se siente como una aplicación de escritorio
- **Header fijo**: Siempre visible, facilita lectura de datos
- **Footer fijo**: Paginación siempre accesible
- **Body scrollable**: Solo el contenido de datos hace scroll

## 📊 Diagramas C4

El proyecto incluye documentación arquitectónica completa usando el modelo C4.

![Diagrama C4 - Arquitectura del Sistema](./c4_front.png)

### Vistas disponibles

1. **SystemContext** - Vista general del sistema
2. **Containers** - Contenedores principales (Next.js App)
3. **Components** - Todos los componentes
4. **UILayer** - Jerarquía de Atomic Design
5. **OrdersFeature** - Flujo completo del feature de pedidos
6. **CustomersFeature** - Flujo completo del feature de clientes
7. **BFFLayer** - Patrón Backend for Frontend
8. **Deployment** - Diagrama de despliegue

Ver [C4-ARCHITECTURE.md](./C4-ARCHITECTURE.md) para más detalles.

## ✅ Características Implementadas

### Pedidos (Orders)
- [x] Listado de pedidos filtrados por cliente
- [x] Paginación con backend integration
- [x] Selector de items por página (5, 10, 20, 30, 40)
- [x] Crear pedido (modal)
- [x] Título dinámico: "Pedidos de {nombre_cliente}"
- [x] Caché inteligente por cliente/página/perPage
- [ ] Editar pedido (backend implementado, UI pendiente)
- [ ] Eliminar pedido (backend implementado, UI pendiente)

### Clientes (Customers)
- [x] Listado de clientes
- [x] Selector de cliente en Navbar
- [x] Auto-selección del primer cliente
- [x] Store global con Zustand
- [x] Integración con orders (filtrado)
- [ ] Crear cliente (backend implementado, UI pendiente)
- [ ] Editar cliente (backend implementado, UI pendiente)
- [ ] Eliminar cliente (backend implementado, UI pendiente)

### UI/UX
- [x] Atomic Design completo
- [x] Navbar con brand y customer selector
- [x] Sidebar con navegación
- [x] Layout desktop-like (sin scroll principal)
- [x] Tabla con header fijo y body scrollable
- [x] Paginación fija en footer de tabla
- [x] Responsive design
- [x] Loading states (skeletons)
- [x] Empty states

### Arquitectura
- [x] BFF con Next.js API Routes
- [x] Clean Architecture por feature
- [x] TypeScript estricto
- [x] React Query para server state
- [x] Zustand para client state
- [x] Server/Client component separation
- [x] Documentación C4 completa

## 📝 Notas Adicionales

### Caché Strategy (React Query)

```typescript
// Cada combinación se cachea independientemente
queryKey: ['orders', customerId, page, perPage]

// Ejemplo:
['orders', 1, 1, 10]  // Cliente 1, página 1, 10 items
['orders', 1, 2, 10]  // Cliente 1, página 2, 10 items
['orders', 2, 1, 20]  // Cliente 2, página 1, 20 items
```

### Convenciones de Código

- **Componentes**: PascalCase (`Button.tsx`, `CustomerSelector.tsx`)
- **Utilities**: camelCase (`api-client.ts`, `react-query.ts`)
- **CSS Modules**: kebab-case (`Button.module.css`, `navbar.module.css`)
- **Types**: PascalCase con `.type.ts` suffix (`Order.type.ts`)
- **Exports**: Named exports (no default exports)

### Testing (Pendiente)
```bash
# Tests unitarios
yarn test

# Tests e2e
yarn test:e2e

# Coverage
yarn test:coverage
```

## 🤝 Contribución

Este proyecto fue desarrollado como prueba técnica para **Monokera**.

## 📄 Licencia

Private - Monokera Technical Test

---

**Desarrollado con ❤️ usando Next.js 16 y React 19**

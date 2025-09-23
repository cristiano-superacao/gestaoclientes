# Gestão de Clientes

Sistema moderno de gestão de clientes desenvolvido em React com TypeScript, Tailwind CSS e shadcn/ui.

## 🚀 Funcionalidades

### Dashboard
- **Visão Geral Completa**: Cartões informativos com totais de clientes por status
- **Gráficos Interativos**: Visualização em pizza e barras dos dados
- **Métricas Financeiras**: Valores totais, pagos, pendentes e vencidos
- **Interface Responsiva**: Adaptável a diferentes tamanhos de tela

# Gestão de Clientes - PWA 📱

## Progressive Web App para Gestão de Clientes

Um sistema completo e moderno para gestão de clientes e cobranças que funciona na web e pode ser instalado como app no celular.

### ✨ Funcionalidades Principais

#### 📊 Dashboard Completo
- Cards com métricas em tempo real
- Gráficos interativos (Pizza e Barras) 
- Indicadores visuais de status
- Navegação rápida

#### 👥 Gestão de Clientes
- ✅ Cadastro completo de clientes
- ✅ Busca inteligente por nome, contato ou email
- ✅ Filtros por status de pagamento
- ✅ Ordenação por nome, data ou valor
- ✅ Edição e exclusão de clientes
- ✅ Importação via Excel/CSV
- ✅ Envio de lembretes via WhatsApp

#### 📱 PWA (Progressive Web App)
- ✅ Instalação no celular como app nativo
- ✅ Funcionamento offline
- ✅ Sincronização em background
- ✅ Notificações push
- ✅ Cache inteligente
- ✅ Interface totalmente responsiva

### 🚀 Como Usar

#### 1. Instalação
```bash
npm install
```

#### 2. Desenvolvimento
```bash
npm run dev
```
Acesse: http://localhost:3000

#### 3. Build para Produção
```bash
npm run build
```

### 📱 Instalação no Celular

#### Android:
1. Abra no Chrome
2. Menu → "Instalar app"
3. Confirme

#### iPhone:
1. Abra no Safari  
2. Compartilhar → "Adicionar à Tela"
3. Confirme

### 🛠️ Tecnologias
- React 18 + TypeScript
- Vite + PWA Plugin  
- Tailwind CSS + shadcn/ui
- Recharts (gráficos)
- Service Worker + Workbox

---
**Desenvolvido com ❤️ para gestão eficiente de clientes**
- **CRUD Completo**: Criar, visualizar, editar e excluir clientes
- **Busca Avançada**: Por nome, contato ou email
- **Filtros por Status**: Pagos, pendentes, vencidos
- **Ordenação**: Por nome, data de vencimento ou valor
- **Campos Expandidos**: Nome, contato, email, endereço, valor e datas

### Funcionalidades Avançadas
- **WhatsApp Integration**: Envio automático de lembretes
- **Importação Excel**: Suporte para arquivos .xlsx, .xls, .csv
- **Validação de Formulários**: Campos obrigatórios e validações
- **Status Dinâmicos**: Indicadores visuais coloridos
- **Responsividade**: Design mobile-first

### Interface Moderna
- **Design System**: Baseado em shadcn/ui e Tailwind CSS
- **Componentes Reutilizáveis**: Arquitetura modular
- **Acessibilidade**: Seguindo padrões WCAG
- **Performance**: Otimização com React hooks e useMemo

## 🛠️ Tecnologias

### Frontend
- **React 18** - Framework principal
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e desenvolvimento
- **Tailwind CSS** - Estilização utilitária
- **shadcn/ui** - Componentes de interface
- **Recharts** - Gráficos e visualizações
- **Lucide React** - Ícones modernos
- **date-fns** - Manipulação de datas

### Backend
- **Node.js + Express** - Servidor API
- **Prisma ORM** - Database toolkit
- **PostgreSQL** - Banco de dados na nuvem
- **CORS + Helmet** - Segurança
- **Rate Limiting** - Proteção contra abuso

## 🚀 Como Usar com Banco de Dados na Nuvem

### 📋 Pré-requisitos
- Node.js 18+ instalado
- Uma conta em um provedor de banco PostgreSQL na nuvem

### ⚡ Setup Rápido

1. **Clone e instale dependências:**
   ```bash
   git clone <url-do-repositorio>
   cd gestao-clientes
   npm install --legacy-peer-deps
   npm run backend:install
   ```

2. **Configure o banco de dados:**
   ```bash
   # Copie o arquivo de exemplo
   cp backend/.env.example backend/.env
   
   # Edite backend/.env e configure sua DATABASE_URL
   # Exemplo para Railway: postgresql://postgres:password@host:port/railway
   # Exemplo para Supabase: postgresql://postgres:password@host:port/postgres
   ```

3. **Execute migrações e dados iniciais:**
   ```bash
   npm run setup:cloud
   ```

4. **Inicie o sistema:**
   ```bash
   npm run dev
   ```

   Acesse:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001
   - Health Check: http://localhost:3001/health

### 🏗️ Estrutura Completa

```
gestao-clientes/
├── src/                    # Frontend React + TypeScript
│   ├── components/ui/      # Componentes UI
│   ├── lib/               # Utilitários e API
│   ├── types/             # Definições TypeScript
│   └── App.tsx            # Componente principal
├── backend/               # Backend Node.js + Express
│   ├── src/
│   │   ├── controllers/   # Controllers da API
│   │   ├── routes/        # Rotas da API
│   │   └── config/        # Configurações
│   ├── prisma/           # Schema e migrations
│   └── deploy.md         # Guia de deployment
└── README.md             # Este arquivo
```

## 📁 Estrutura do Projeto

```
src/
├── components/
│   └── ui/           # Componentes base (shadcn/ui)
│       ├── card.tsx
│       ├── button.tsx
│       ├── input.tsx
│       └── table.tsx
├── lib/
│   └── utils.ts      # Utilitários e helpers
├── types/
│   └── index.ts      # Definições de tipos TypeScript
├── App.tsx           # Componente principal
├── main.tsx          # Ponto de entrada
└── index.css         # Estilos globais
```

## 🔧 Scripts Disponíveis

- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build para produção
- `npm run preview` - Preview do build
- `npm run lint` - Verificação de código

## 📊 Funcionalidades do Dashboard

### Cards Informativos
- **Total de Clientes**: Contador geral com navegação rápida
- **Pagos**: Quantidade e valor total dos pagamentos recebidos
- **Pendentes**: Clientes com pagamentos em aberto
- **Vencidos**: Alertas para cobranças atrasadas

### Gráficos
- **Pizza**: Distribuição percentual por status
- **Barras**: Valores monetários por categoria
- **Responsivos**: Adaptam-se ao tamanho da tela

## 👥 Gestão de Clientes

### Formulário Completo
- **Campos Obrigatórios**: Nome, contato, vencimento, valor
- **Campos Opcionais**: Email, endereço
- **Validações**: Verificação em tempo real
- **Edição Inline**: Modificação rápida dos dados

### Funcionalidades da Lista
- **Busca Inteligente**: Busca em múltiplos campos
- **Filtros Dinâmicos**: Por status de pagamento
- **Ordenação**: Clique nos cabeçalhos para ordenar
- **Ações Rápidas**: WhatsApp, edição e exclusão

## 📱 WhatsApp Integration

O sistema gera automaticamente mensagens personalizadas:

```
Olá [Nome], este é um lembrete sobre seu pagamento de R$ [Valor] com vencimento em [Data].
```

## 🎨 Customização

### Cores do Status
- **Verde**: Pagos (#22c55e)
- **Amarelo**: Pendentes (#eab308)  
- **Vermelho**: Vencidos (#ef4444)

### Responsividade
- **Mobile**: Layout em coluna única
- **Tablet**: Grid 2 colunas
- **Desktop**: Grid até 4 colunas

## 🔐 Tipos de Dados

```typescript
interface Cliente {
  id: number;
  name: string;
  contact: string;
  dueDate: string;
  status: 'PENDING' | 'PAID' | 'OVERDUE';
  amount: number;
  email?: string;
  address?: string;
  createdAt?: string;
}
```

## 🏗️ Backend API e Banco de Dados

Este projeto agora inclui um backend completo com integração para banco de dados na nuvem!

### 🗄️ Configuração do Banco de Dados na Nuvem

#### Opções de Provedores Suportados:
- **Railway** 🚄 (Recomendado para iniciantes)
- **Supabase** 🎯 (Tier gratuito disponível)
- **Neon** ⚡ (PostgreSQL serverless)
- **AWS RDS** 🌐 (Para produção)

#### Configuração Rápida:

1. **Instalar dependências do backend:**
   ```bash
   npm run backend:install
   ```

2. **Configurar variáveis de ambiente:**
   ```bash
   cp backend/.env.example backend/.env
   # Edite backend/.env com sua URL do banco
   ```

3. **Executar migrações e seed:**
   ```bash
   npm run setup:cloud
   ```

4. **Iniciar em desenvolvimento:**
   ```bash
   npm run dev
   ```

### 🔗 Estrutura da API

#### Endpoints Disponíveis:
- `GET /api/clients` - Listar clientes
- `POST /api/clients` - Criar cliente
- `GET /api/clients/:id` - Buscar cliente
- `PUT /api/clients/:id` - Atualizar cliente
- `DELETE /api/clients/:id` - Deletar cliente
- `GET /api/clients/stats` - Estatísticas dashboard
- `GET /health` - Health check

#### Funcionalidades:
- ✅ CRUD completo de clientes
- ✅ Filtros e busca
- ✅ Paginação
- ✅ Status automático (PENDING/PAID/OVERDUE)
- ✅ Validação de dados
- ✅ Rate limiting
- ✅ CORS configurado
- ✅ Error handling

### 📋 Deployment Guide

Consulte `backend/deploy.md` para instruções detalhadas de deployment com diferentes provedores de nuvem.

## 🚀 Próximos Passos

Funcionalidades adicionais que podem ser implementadas:

1. ✅ **Backend API** (Node.js + Express + Prisma) - **IMPLEMENTADO**
2. ✅ **Banco de Dados** (PostgreSQL na nuvem) - **IMPLEMENTADO**
3. **Autenticação** (JWT + bcrypt)
4. **Notificações** (Email + SMS)
5. **Relatórios PDF** (jsPDF)
6. **Backup/Restore** (Exportação/Importação)

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
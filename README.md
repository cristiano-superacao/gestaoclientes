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

- **React 18** - Framework principal
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utilitária
- **shadcn/ui** - Componentes de interface
- **Recharts** - Gráficos e visualizações
- **Lucide React** - Ícones modernos
- **date-fns** - Manipulação de datas
- **Vite** - Build tool e desenvolvimento

## 📦 Instalação

1. **Clone o repositório**
   ```bash
   git clone <url-do-repositorio>
   cd gestao-clientes
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Execute em modo de desenvolvimento**
   ```bash
   npm run dev
   ```

4. **Acesse o sistema**
   ```
   http://localhost:5173
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

## 🚀 Próximos Passos

Para expandir o sistema, considere implementar:

1. **Backend API** (Node.js + Express + Prisma)
2. **Banco de Dados** (PostgreSQL/MySQL)
3. **Autenticação** (JWT + bcrypt)
4. **Notificações** (Email + SMS)
5. **Relatórios PDF** (jsPDF)
6. **Backup/Restore** (Exportação/Importação)

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
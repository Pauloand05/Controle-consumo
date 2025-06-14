
# Sistema de Controle de Consumo - Água e Energia

Sistema web moderno para controle e monitoramento de consumo de água e energia elétrica, desenvolvido com Next.js 14 e TailwindCSS.

## 🚀 Funcionalidades

- **Dashboard Interativo**: Gráficos comparativos e cartões de consumo
- **Registro de Consumo**: Formulário para registrar consumo mensal
- **Histórico Completo**: Tabela com variações de consumo
- **Sistema de Metas**: Definição e acompanhamento de metas
- **Alertas Inteligentes**: Notificações quando metas são ultrapassadas
- **Autenticação**: Sistema de login e cadastro
- **Design Responsivo**: Interface adaptável para todos os dispositivos

## 🛠️ Tecnologias

- **Next.js 14** (App Router)
- **TypeScript**
- **TailwindCSS**
- **shadcn/ui**
- **Recharts** (gráficos)
- **Axios** (requisições HTTP)
- **Lucide React** (ícones)

## 📁 Estrutura do Projeto

\`\`\`
├── app/                    # Páginas (App Router)
│   ├── login/             # Página de login
│   ├── register/          # Página de cadastro
│   ├── consumo/novo/      # Registro de consumo
│   ├── historico/         # Histórico de consumos
│   └── metas/             # Definição de metas
├── components/            # Componentes reutilizáveis
│   ├── auth/              # Componentes de autenticação
│   ├── dashboard/         # Componentes do dashboard
│   ├── layout/            # Layout e navegação
│   └── ui/                # Componentes base (shadcn/ui)
├── services/              # Serviços de API
├── types/                 # Tipos TypeScript
└── lib/                   # Utilitários
\`\`\`

## 🔧 Configuração

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Instalação

1. Clone o repositório
2. Instale as dependências:
   \`\`\`bash
   npm install
   \`\`\`

3. Configure as variáveis de ambiente:
   \`\`\`bash
   # .env.local
   NEXT_PUBLIC_API_URL=http://localhost:8080/api
   \`\`\`

4. Execute o projeto:
   \`\`\`bash
   npm run dev
   \`\`\`

## 🌐 API Integration

O sistema está preparado para integração com API REST Spring Boot:

### Endpoints Esperados

- **Autenticação**
  - `POST /api/auth/login`
  - `POST /api/auth/register`

- **Consumos**
  - `GET /api/consumos/ultimos-6-meses`
  - `GET /api/consumos/historico`
  - `POST /api/consumos`
  - `PUT /api/consumos/{id}`
  - `DELETE /api/consumos/{id}`

- **Metas**
  - `GET /api/metas`
  - `PUT /api/metas`

### Estrutura de Dados

\`\`\`typescript
// Consumo
interface ConsumoData {
  id?: number
  mes: number
  ano: number
  consumoAgua: number
  consumoEnergia: number
}

// Meta
interface MetaData {
  id?: number
  metaAgua: number
  metaEnergia: number
}
\`\`\`

## 📱 Deploy

### Vercel (Recomendado)

1. Conecte seu repositório ao Vercel
2. Configure as variáveis de ambiente
3. Deploy automático a cada push

### Outras Plataformas

O projeto é compatível com qualquer plataforma que suporte Next.js:
- Netlify
- Railway
- AWS Amplify
- DigitalOcean App Platform

## 🎨 Personalização

### Cores e Tema

Edite `app/globals.css` para personalizar as cores:

\`\`\`css
:root {
  --primary: 221.2 83.2% 53.3%;
  --secondary: 210 40% 96%;
  /* ... */
}
\`\`\`

### Componentes

Todos os componentes são customizáveis e seguem o padrão shadcn/ui.

## 📊 Funcionalidades Detalhadas

### Dashboard
- Gráfico de linha comparativo (6 meses)
- Cartões com consumo atual e variação
- Alertas visuais para metas ultrapassadas
- Ações rápidas

### Sistema de Alertas
- Comparação automática com metas
- Indicadores visuais coloridos
- Notificações em tempo real

### Histórico
- Tabela completa de registros
- Cálculo automático de variações
- Indicadores de tendência

## 🔒 Segurança

- Autenticação JWT
- Interceptors para requisições
- Redirecionamento automático em caso de token expirado
- Validação de formulários

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.

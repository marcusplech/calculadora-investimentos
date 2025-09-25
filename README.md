# 📊 Calculadora de Investimentos - Grupo Primo

Uma aplicação web moderna para calcular rendimentos de investimentos, desenvolvida com Next.js 15 e TypeScript.

![Testes da Aplicação](https://github.com/user-attachments/assets/4c8b5c5a-8b5f-4c8a-9c5e-2d3f4e5a6b7c)

## 🚀 Funcionalidades

### Calculadora Principal
- **Cálculo de Rendimento**: Calcula o rendimento de investimentos com base no valor inicial, taxa de juros e período
- **Formatação Automática**: Formatação automática de valores monetários em tempo real
- **Validação de Entrada**: Validação inteligente para garantir apenas valores positivos válidos
- **Interface Responsiva**: Design adaptável para desktop e dispositivos móveis

### Componentes Reutilizáveis
- **InputText**: Campo de entrada com formatação automática para moeda e anos
- **Button**: Botão customizável com diferentes variantes (primary, secondary) e tamanhos
- **Header**: Cabeçalho com navegação e logo da empresa
- **Hero**: Seção principal com call-to-action

### Página de Resultados
- **Visualização Detalhada**: Exibe o resultado do cálculo de rendimento
- **Informações Completas**: Mostra valor inicial, taxa, período e valor final
- **Navegação Intuitiva**: Botão (logo do grupo primo) para retornar à calculadora

## 🛠️ Tecnologias Utilizadas

- **Next.js 15**: Framework React com App Router
- **TypeScript**: Tipagem estática para maior segurança no código
- **Tailwind CSS**: Framework CSS utilitário para estilização
- **React**: Biblioteca para construção de interfaces
- **Jest**: Framework de testes unitários
- **Testing Library**: Utilitários para testes de componentes React

## 📋 Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Git

## 🔧 Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/marcusplech/calculadora-investimentos
cd calculadora-investimentos
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
```

3. **Execute o projeto em modo de desenvolvimento**
```bash
npm run dev
# ou
yarn dev
```

4. **Acesse a aplicação**
Abra [http://localhost:3000](http://localhost:3000) no seu navegador

## 📝 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera a build de produção
- `npm run start` - Inicia o servidor de produção
- `npm run lint` - Executa o linter para verificar o código
- `npm run test` - Executa os testes unitários
- `npm run test:watch` - Executa os testes em modo watch
- `npm run test:coverage` - Executa os testes com relatório de cobertura

## 🧪 Testes

O projeto possui uma suíte completa de testes unitários com excelente cobertura:

### Executar Testes
```bash
# Executar todos os testes
npm run test

# Executar testes em modo watch
npm run test:watch

# Executar testes com cobertura
npm run test:coverage
```

### Resultados dos Testes

A aplicação possui **42 testes** distribuídos em **3 suítes de teste**, todos passando com sucesso:

- ✅ **src/components/InputText/InputText.test.tsx** - Testes do componente InputText
- ✅ **src/components/Button/Button.test.tsx** - Testes do componente Button  
- ✅ **src/utils/index.test.ts** - Testes das funções utilitárias

### Cobertura de Testes
- **Button Component**: 100% de cobertura
- **InputText Component**: 96.15% de cobertura
- **Utilitários**: 100% de cobertura

### Testes Implementados
- Renderização de componentes
- Interações do usuário (cliques, digitação)
- Formatação de valores
- Validações de entrada
- Acessibilidade
- Estados de componentes
- Eventos de foco e blur
- Formatação automática de moeda e anos

## 📁 Estrutura do Projeto

```
calculadora-investimentos/
├── public/                 # Arquivos estáticos
│   ├── favicon.ico        # Favicon (logo Grupo Primo)
│   └── *.svg             # Ícones e logos
├── src/
│   ├── app/              # App Router do Next.js
│   │   ├── layout.tsx    # Layout principal
│   │   ├── page.tsx      # Página inicial
│   │   └── rendimento/   # Página de resultados
│   ├── components/       # Componentes reutilizáveis
│   │   ├── Button/       # Componente de botão
│   │   ├── InputText/    # Campo de entrada
│   │   ├── Calculator.tsx # Calculadora principal
│   │   ├── Header.tsx    # Cabeçalho
│   │   ├── Hero.tsx      # Seção hero
│   │   └── RendimentoContent.tsx # Conteúdo dos resultados
│   ├── utils/            # Funções utilitárias
│   │   └── index.ts      # Formatação e validação
│   └── setupTests.ts     # Configuração dos testes
├── jest.config.js        # Configuração do Jest
├── tailwind.config.js    # Configuração do Tailwind
└── tsconfig.json         # Configuração do TypeScript
```

## 🎯 Como Funciona

### Fluxo da Aplicação

1. **Página Inicial** (`/`)
   - Usuário acessa a calculadora
   - Preenche os campos: valor inicial, taxa de juros e período
   - Clica em "Calcular Rendimento"

2. **Processamento**
   - Validação dos dados de entrada
   - Cálculo do rendimento usando juros compostos
   - Redirecionamento para página de resultados

3. **Página de Resultados** (`/rendimento`)
   - Exibe o resultado do cálculo
   - Mostra todos os parâmetros utilizados
   - Opção de voltar para nova simulação

### Fórmula de Cálculo

A aplicação utiliza a fórmula de juros compostos:

```
Valor Final = Valor Inicial × (1 + Taxa/100)^Período
```

### Formatação de Dados

- **Valores Monetários**: Formatados automaticamente como R$ 0.000,00
- **Taxas**: Aceita valores decimais e percentuais
- **Períodos**: Formatação inteligente (1 ano / 2 anos)

## 🎨 Design e UX

- **Design Responsivo**: Adaptável a diferentes tamanhos de tela
- **Cores Corporativas**: Utiliza a paleta de cores do Grupo Primo
- **Tipografia**: Fonte Inter para melhor legibilidade
- **Acessibilidade**: Componentes acessíveis com ARIA labels
- **Feedback Visual**: Estados de hover, focus e loading

## 🔒 Validações

- **Valores Positivos**: Apenas números positivos são aceitos
- **Formatação Automática**: Conversão automática de entrada para formato correto
- **Prevenção de Erros**: Validação em tempo real durante a digitação
- **Sanitização**: Remoção de caracteres inválidos automaticamente

## 🚀 Deploy

### Vercel (Recomendado)

#### Deploy Automático via GitHub
1. Acesse [vercel.com](https://vercel.com)
2. Conecte sua conta GitHub
3. Importe o repositório `calculadora-investimentos`
4. A Vercel detectará automaticamente que é um projeto Next.js
5. Clique em "Deploy" - o deploy será automático!

#### Deploy via CLI
```bash
# Instalar Vercel CLI
npm i -g vercel

# Fazer login na Vercel
vercel login

# Deploy
vercel

# Para deploy de produção
vercel --prod
```

#### Configurações da Vercel
O projeto já está configurado com:
- `vercel.json` com configurações otimizadas
- Build command: `npm run build`
- Framework: Next.js (detectado automaticamente)
- Node.js version: 18.x (padrão da Vercel)

### Build Manual
```bash
# Gerar build de produção
npm run build

# Iniciar servidor de produção
npm run start
```

### Outras Plataformas

#### Netlify
```bash
# Build command: npm run build
# Publish directory: .next
```

#### Railway
```bash
# O projeto está pronto para deploy no Railway
# Conecte o repositório GitHub diretamente
```

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é propriedade do Grupo Primo.

## 📞 Suporte

Para suporte técnico ou dúvidas sobre o projeto, entre em contato com a equipe de desenvolvimento.

---

**Desenvolvido com ❤️ para o Grupo Primo**
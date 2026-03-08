# 🔐 Implementação Completa - Autenticação AWS Cognito

## 📋 Resumo Executivo

Implementação completa de autenticação AWS Cognito com:
- ✅ Restrição de acesso exclusivo para emails @znit.io
- ✅ Infraestrutura 100% automatizada via Terraform
- ✅ JWT authentication em todas as APIs
- ✅ Frontend protegido com AuthGuard
- ✅ Lambda trigger para validação de domínio
- ✅ Shared session entre múltiplos apps

---

## 🏗️ Arquitetura

```
┌─────────────────────────────────────────────────────────────┐
│                    AWS Cognito User Pool                     │
│                  (Restrição @znit.io)                        │
└──────────────┬──────────────────────────┬───────────────────┘
               │                          │
               │ Lambda Pre-Signup        │ JWT Tokens
               │ (Validação Email)        │ (1h validade)
               │                          │
┌──────────────▼──────────────────────────▼───────────────────┐
│              Landing Page (Login Hub)                        │
│              http://localhost:3002                           │
│              - Login com Cognito                             │
│              - Dashboard Selector                            │
└──────────────┬──────────────────────────┬───────────────────┘
               │                          │
               │ Após Auth                │
               │                          │
    ┌──────────▼──────────┐    ┌─────────▼──────────┐
    │  Management UI      │    │   Dashboard        │
    │  localhost:3000     │    │   localhost:3001   │
    │  (AuthGuard)        │    │   (AuthGuard)      │
    └──────────┬──────────┘    └─────────┬──────────┘
               │                          │
               │ API Calls com JWT        │
               │                          │
    ┌──────────▼──────────────────────────▼──────────┐
    │        Serverless API (JWT Protected)           │
    │        http://localhost:8001                    │
    │        - Todas as rotas protegidas              │
    │        - Health endpoint público                │
    └─────────────────────────────────────────────────┘
```

---

## 📦 O que foi Implementado

### 🔧 Infraestrutura Terraform (100% Automatizada)

**Localização:** `terraform/tbot-cognito-auth-infrastructure/`

#### Recursos Criados:
1. **AWS Cognito User Pool**
   - Sign-in por email
   - Auto-confirmação de usuários
   - Advanced Security Mode
   - MFA opcional
   - Deletion protection

2. **Cognito App Client**
   - OAuth 2.0 Authorization Code Flow
   - Tokens com validade configurável
   - Callback URLs para local e produção

3. **Cognito Hosted Domain**
   - UI de login gerenciada pela AWS
   - Domínio personalizado

4. **Lambda Pre-Signup Trigger**
   - Validação de email @znit.io
   - Auto-confirmação de usuários válidos
   - CloudWatch Logs integrado

5. **IAM Roles e Policies**
   - Permissões mínimas necessárias
   - CloudWatch Logs access

#### Arquivos Terraform:
```
tbot-cognito-auth-infrastructure/
├── main.tf              # Provider e backend S3
├── variables.tf         # Variáveis configuráveis
├── cognito.tf          # Recursos Cognito
├── lambda.tf           # Lambda function
├── iam.tf              # IAM roles
├── outputs.tf          # Outputs importantes
├── terraform.tfvars.example
├── README.md           # Documentação completa
├── QUICK_START.md      # Guia rápido
├── validate.sh         # Script de validação
├── .gitignore
└── lambda/
    └── pre-signup.js   # Código Lambda
```

### 💻 Backend API (serverless-tbot-management-api)

#### Arquivos Criados:
- `src/utils/auth.ts` - Utilitário para extrair JWT claims

#### Arquivos Modificados:
- `serverless.yml` - JWT authorizer + CORS + env vars
- `src/handlers/createBot.ts` - Auth logging + createdBy
- `src/handlers/listBots.ts` - Auth logging
- `src/handlers/getBotDetails.ts` - Auth logging
- `src/handlers/stopBot.ts` - Auth logging
- `src/handlers/deleteBot.ts` - Auth logging
- `src/handlers/getBotLogs.ts` - Auth logging
- `.env` - Variáveis Cognito

### 🎨 Landing Page (Login Hub)

#### Arquivos Criados:
- `src/config/amplify.ts` - Configuração AWS Amplify
- `src/contexts/AuthProvider.tsx` - Context de autenticação
- `src/components/Login.tsx` - UI de login
- `src/components/DashboardSelector.tsx` - Seletor de dashboards

#### Arquivos Modificados:
- `src/App.tsx` - Removido Web3, adicionado Cognito auth
- `.env` - Variáveis Cognito

#### Novas Rotas:
- `/login` - Página de login
- `/callback` - OAuth callback
- `/dashboard-selector` - Seleção de dashboard (protegida)

### 🛠️ Management UI (tbot-management-ui)

#### Arquivos Criados:
- `src/components/AuthGuard.tsx` - Guard de autenticação

#### Arquivos Modificados:
- `src/api/client.ts` - Interceptor JWT + redirect 401
- `src/App.tsx` - Adicionado AuthGuard

### 📊 Dashboard (tbot-dashboard)

#### Arquivos Criados:
- `src/AuthGuard.tsx` - Guard de autenticação

#### Arquivos Modificados:
- `src/App.tsx` - Adicionado AuthGuard
- `src/PortfolioDashboard.tsx` - Verificação de token

---

## 🚀 Passo a Passo de Execução

### Fase 1: Deploy da Infraestrutura Cognito (5 min)

```bash
# 1. Criar bucket S3 para Terraform state
aws s3 mb s3://terraform-state-tbot-cognito-auth --region ap-southeast-1
aws s3api put-bucket-versioning \
  --bucket terraform-state-tbot-cognito-auth \
  --versioning-configuration Status=Enabled

# 2. Navegar para o diretório Terraform
cd /Users/luis.rohten/Documents/tarbot/terraform/tbot-cognito-auth-infrastructure

# 3. Copiar e configurar variáveis
cp terraform.tfvars.example terraform.tfvars
# Editar terraform.tfvars se necessário (valores padrão já estão OK)

# 4. Inicializar Terraform
terraform init

# 5. Visualizar plano
terraform plan

# 6. Aplicar infraestrutura
terraform apply
# Confirme com 'yes'

# 7. Salvar configuração
terraform output -raw env_configuration > cognito-config.txt
cat cognito-config.txt
```

### Fase 2: Validar Infraestrutura (2 min)

```bash
# Executar script de validação
./validate.sh

# Verificar logs Lambda
aws logs tail /aws/lambda/tarbot-cognito-pre-signup-staging --follow
```

### Fase 3: Atualizar .env Files (3 min)

```bash
# Copiar valores de cognito-config.txt para:

# Backend API
nano /Users/luis.rohten/Documents/tarbot/tbot-lambda-collection/serverless-tbot-management-api/.env
# Adicionar:
# COGNITO_USER_POOL_ID=ap-southeast-1_XXXXXXX
# COGNITO_APP_CLIENT_ID=xxxxxxxxxxxxxxxxxxxx

# Landing Page
nano /Users/luis.rohten/Documents/tarbot/landing-page/.env
# Adicionar todas as variáveis REACT_APP_COGNITO_*
```

### Fase 4: Instalar Dependências (2 min)

```bash
cd /Users/luis.rohten/Documents/tarbot/landing-page
npm install aws-amplify @aws-amplify/ui-react
```

### Fase 5: Deploy Backend API (3 min)

```bash
cd /Users/luis.rohten/Documents/tarbot/tbot-lambda-collection/serverless-tbot-management-api
serverless deploy --stage staging
```

### Fase 6: Iniciar Aplicações (4 Terminais)

**Terminal 1 - Backend API:**
```bash
cd /Users/luis.rohten/Documents/tarbot/tbot-lambda-collection/serverless-tbot-management-api
serverless offline --stage staging
# Porta: 8001
```

**Terminal 2 - Landing Page:**
```bash
cd /Users/luis.rohten/Documents/tarbot/landing-page
PORT=3002 npm start
# Porta: 3002
```

**Terminal 3 - Management UI:**
```bash
cd /Users/luis.rohten/Documents/tarbot/tbot-management-ui
npm run dev
# Porta: 3000
```

**Terminal 4 - Dashboard:**
```bash
cd /Users/luis.rohten/Documents/tarbot/tbot-dashboard
npm start
# Porta: 3001
```

---

## ✅ Testes de Validação

### Teste 1: Registro com Email Inválido

**Objetivo:** Verificar se Lambda bloqueia emails não-@znit.io

1. Acesse: http://localhost:3002/login
2. Clique em "Create Account"
3. Tente registrar: `teste@gmail.com`
4. **Esperado:** Erro "Apenas emails @znit.io são permitidos"

### Teste 2: Registro com Email Válido

**Objetivo:** Verificar auto-confirmação de emails válidos

1. Acesse: http://localhost:3002/login
2. Clique em "Create Account"
3. Registre com:
   - Email: `seu-nome@znit.io`
   - Nome: Seu Nome
   - Senha: Senha123!
4. **Esperado:** Login automático, redirect para `/dashboard-selector`

### Teste 3: Navegação Entre Dashboards

**Objetivo:** Verificar shared session

1. Após login, deve estar em `/dashboard-selector`
2. Clique em "Abrir Gerenciador"
3. **Esperado:** Abre `http://localhost:3000` sem pedir login
4. Clique em "Abrir Dashboard"
5. **Esperado:** Abre `http://localhost:3001` sem pedir login

### Teste 4: Proteção de API com JWT

**Objetivo:** Verificar que API recebe token

1. No Management UI, tente criar um bot
2. Abra DevTools → Network → Find request → Headers
3. **Esperado:** Header `Authorization: Bearer <token>` presente
4. Backend logs devem mostrar: `CreateBot request from: seu-nome@znit.io`

### Teste 5: Verificação de Token Expirado

**Objetivo:** Verificar redirect em token inválido

1. No navegador, abra DevTools → Console
2. Execute: `localStorage.removeItem('idToken')`
3. Recarregue Management UI ou Dashboard
4. **Esperado:** Redireciona para `http://localhost:3002/login`

### Teste 6: Logout e Limpeza de Sessão

**Objetivo:** Verificar limpeza de tokens

1. No dashboard selector, clique em "Sair"
2. **Esperado:** Redirect para landing page
3. Tente acessar `http://localhost:3000`
4. **Esperado:** Redireciona para login

### Teste 7: Validar Lambda Logs

**Objetivo:** Verificar logs de validação

```bash
# Ver logs em tempo real
aws logs tail /aws/lambda/tarbot-cognito-pre-signup-staging --follow

# Tente registrar um usuário e veja os logs aparecerem
```

### Teste 8: Verificar Token no API Gateway

**Objetivo:** Verificar que API Gateway valida JWT

1. Obtenha o token: `localStorage.getItem('idToken')`
2. Teste chamada direta à API:

```bash
# Com token válido (deve funcionar)
curl -H "Authorization: Bearer <seu-token>" \
  http://localhost:8001/api/bots

# Sem token (deve retornar 401)
curl http://localhost:8001/api/bots

# Health endpoint (deve funcionar sem token)
curl http://localhost:8001/health
```

---

## 🔧 Comandos Úteis

### Terraform

```bash
# Ver todos os outputs
terraform output

# Ver output específico
terraform output user_pool_id
terraform output app_client_id

# Ver configuração formatada para .env
terraform output -raw env_configuration

# Atualizar infraestrutura
terraform plan
terraform apply

# Validar infraestrutura
./validate.sh

# Destruir infraestrutura (CUIDADO!)
terraform destroy
```

### AWS CLI - Cognito

```bash
# Listar usuários
aws cognito-idp list-users --user-pool-id <USER_POOL_ID>

# Ver detalhes de usuário
aws cognito-idp admin-get-user \
  --user-pool-id <USER_POOL_ID> \
  --username <email@znit.io>

# Deletar usuário
aws cognito-idp admin-delete-user \
  --user-pool-id <USER_POOL_ID> \
  --username <email@znit.io>

# Ver configuração do User Pool
aws cognito-idp describe-user-pool --user-pool-id <USER_POOL_ID>
```

### AWS CLI - Lambda

```bash
# Ver logs da Lambda
aws logs tail /aws/lambda/tarbot-cognito-pre-signup-staging --follow

# Testar Lambda manualmente (email inválido)
aws lambda invoke \
  --function-name tarbot-cognito-pre-signup-staging \
  --payload '{"request":{"userAttributes":{"email":"test@gmail.com"}},"response":{}}' \
  --cli-binary-format raw-in-base64-out \
  response.json

# Testar Lambda manualmente (email válido)
aws lambda invoke \
  --function-name tarbot-cognito-pre-signup-staging \
  --payload '{"request":{"userAttributes":{"email":"test@znit.io"}},"response":{}}' \
  --cli-binary-format raw-in-base64-out \
  response.json
```

### Debug Frontend

```bash
# Ver token no console do navegador
localStorage.getItem('idToken')

# Decodificar JWT (usar jwt.io ou)
echo "<token>" | cut -d'.' -f2 | base64 -d | jq

# Limpar sessão
localStorage.clear()

# Verificar se token expirou
const payload = JSON.parse(atob(localStorage.getItem('idToken').split('.')[1]));
console.log('Expira em:', new Date(payload.exp * 1000));
```

---

## 🔐 Segurança Implementada

### ✅ Features de Segurança:

1. **Domain Validation**
   - Apenas emails @znit.io podem se registrar
   - Validação server-side via Lambda
   - Impossível burlar pelo cliente

2. **JWT Authentication**
   - Todas as rotas protegidas (exceto /health)
   - Tokens com validade de 1 hora
   - Validação automática pelo API Gateway

3. **Token Management**
   - Refresh tokens com 30 dias de validade
   - Auto-refresh antes de expirar
   - Token revocation habilitado

4. **Advanced Security Mode**
   - Proteção contra credential stuffing
   - Detecção de dispositivos comprometidos
   - Rate limiting automático

5. **Frontend Protection**
   - AuthGuard em todas as rotas protegidas
   - Verificação de expiração de token
   - Redirect automático em 401

6. **Backend Protection**
   - JWT authorizer no API Gateway
   - Extração de user claims
   - Logging de todas as ações

7. **MFA Opcional**
   - TOTP via app authenticator
   - Configurável por usuário

8. **Password Policy**
   - Mínimo 8 caracteres
   - Letras maiúsculas e minúsculas
   - Números obrigatórios

---

## 📊 Custos Estimados (AWS)

### Cognito
- **Free Tier**: 50,000 MAU (Monthly Active Users) grátis
- **Após free tier**: $0.0055 por MAU
- **Advanced Security**: $0.05 por autenticação
- **Estimativa (100 usuários)**: ~$5-10/mês

### Lambda
- **Free Tier**: 1M requests grátis/mês
- **Após free tier**: $0.20 por 1M requests
- **Estimativa**: < $1/mês

### CloudWatch Logs
- **Retenção 14 dias**: ~$0.50/GB
- **Estimativa**: < $1/mês

**Total Estimado**: ~$7-12/mês para 100 usuários ativos

---

## 🐛 Troubleshooting

### Erro: "Domain already exists"

**Solução:**
```bash
# Editar terraform.tfvars
cognito_domain_prefix = "tarbot-auth-v2"  # ou outro nome único

# Aplicar
terraform apply
```

### Erro: "S3 bucket does not exist"

**Solução:**
```bash
aws s3 mb s3://terraform-state-tbot-cognito-auth --region ap-southeast-1
```

### Lambda não valida emails

**Debug:**
```bash
# Ver logs
aws logs tail /aws/lambda/tarbot-cognito-pre-signup-staging --follow

# Verificar variável de ambiente
aws lambda get-function-configuration \
  --function-name tarbot-cognito-pre-signup-staging \
  --query 'Environment.Variables'
```

### Frontend não recebe token

**Debug:**
```bash
# Verificar .env
cat /Users/luis.rohten/Documents/tarbot/landing-page/.env

# Verificar outputs Terraform
terraform output cognito_domain
terraform output app_client_id

# Ver erros no console do navegador
# DevTools → Console → Filtrar por "auth"
```

### API retorna 401

**Debug:**
```bash
# Verificar token no localStorage
localStorage.getItem('idToken')

# Verificar se backend tem User Pool ID correto
cat /Users/luis.rohten/Documents/tarbot/tbot-lambda-collection/serverless-tbot-management-api/.env

# Verificar se token está sendo enviado
# DevTools → Network → Request → Headers → Authorization
```

---

## 📚 Documentação Adicional

### Arquivos de Referência:

1. **`terraform/tbot-cognito-auth-infrastructure/README.md`**
   - Documentação completa do Terraform
   - Explicação de cada recurso
   - Referências AWS

2. **`terraform/tbot-cognito-auth-infrastructure/QUICK_START.md`**
   - Guia rápido de 5 minutos
   - Comandos essenciais
   - Testes básicos

3. **`terraform/tbot-cognito-auth-infrastructure/validate.sh`**
   - Script de validação automática
   - Verifica todos os recursos
   - Gera relatório de status

### Links Úteis:

- [AWS Cognito Documentation](https://docs.aws.amazon.com/cognito/)
- [Terraform AWS Provider](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)
- [AWS Amplify Documentation](https://docs.amplify.aws/)
- [JWT.io - Token Decoder](https://jwt.io/)

---

## ✨ Próximos Passos (Produção)

Quando for migrar para produção:

1. **Atualizar URLs em `terraform.tfvars`:**
   ```hcl
   frontend_callback_urls = [
     "https://app.znit.io/callback"
   ]
   ```

2. **Criar novo environment:**
   ```bash
   # Editar terraform.tfvars
   environment = "production"

   # Deploy
   terraform workspace new production
   terraform apply
   ```

3. **Configurar Custom Domain (opcional):**
   - Usar Route53 + ACM certificate
   - Domínio personalizado: `auth.znit.io`

4. **Habilitar CloudWatch Alarms:**
   - Monitorar falhas de autenticação
   - Alertas de quota exceeded

5. **Backup de Usuários:**
   - Configurar backup automático do User Pool
   - Export periódico de usuários

---

## 🎉 Conclusão

Implementação completa e funcional de autenticação AWS Cognito com:

- ✅ 100% automatizada via Terraform
- ✅ Validação de domínio @znit.io
- ✅ JWT em todas as APIs
- ✅ Frontend protegido
- ✅ Shared session entre apps
- ✅ Infraestrutura como código
- ✅ Totalmente testável
- ✅ Pronta para produção

**Tempo total de setup: ~15 minutos**

Boa implementação! 🚀

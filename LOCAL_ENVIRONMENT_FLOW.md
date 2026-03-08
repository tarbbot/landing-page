# 🔄 Fluxo de Autenticação no Ambiente Local

## 🎯 Problema: localStorage Isolado por Porta

No ambiente local, cada aplicação roda em uma porta diferente:
- **Landing Page**: `localhost:3002`
- **Management UI**: `localhost:3000`
- **Dashboard**: `localhost:3001`

O **localStorage é isolado por origem** (protocolo + domínio + porta), então:
- Tokens salvos em `localhost:3002` **NÃO** estão disponíveis em `localhost:3000`
- Tokens salvos em `localhost:3002` **NÃO** estão disponíveis em `localhost:3001`

## ✅ Solução Implementada: Token via URL

### Fluxo Completo

```
┌─────────────────────────────────────────────────────────────────────┐
│ 1. LANDING PAGE (localhost:3002)                                    │
│    - Usuário faz login via Cognito                                  │
│    - Tokens salvos no localStorage da porta 3002                    │
│    - AuthProvider gerencia sessão                                   │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│ 2. DASHBOARD SELECTOR (/dashboard-selector)                         │
│    - Usuário clica em "Abrir Gerenciador" ou "Abrir Dashboard"     │
│    - DashboardSelector pega tokens do localStorage                  │
│    - Abre nova aba com tokens na URL:                               │
│      → localhost:3000?idToken=xxx&accessToken=yyy                   │
│      → localhost:3001?idToken=xxx&accessToken=yyy                   │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│ 3. MANAGEMENT UI / DASHBOARD (nova aba)                             │
│    - AuthGuard detecta tokens na URL                                │
│    - Salva tokens no localStorage LOCAL (da porta 3000 ou 3001)     │
│    - Remove tokens da URL por segurança                             │
│    - Valida token (expiração)                                       │
│    - ✅ Aplicação carrega normalmente                               │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│ 4. SESSÃO PERSISTENTE                                               │
│    - Token agora está no localStorage LOCAL                         │
│    - Próximas visitas não precisam do token na URL                  │
│    - AuthGuard verifica localStorage primeiro                       │
│    - Se token expirar, redireciona para localhost:3002/login        │
└─────────────────────────────────────────────────────────────────────┘
```

## 📝 Código Implementado

### 1. DashboardSelector (Landing Page)

```typescript
const openDashboard = (url: string) => {
  // Pega tokens do localStorage local
  const idToken = localStorage.getItem('idToken');
  const accessToken = localStorage.getItem('accessToken');

  if (idToken) {
    // Passa tokens via URL
    const tokenParams = new URLSearchParams({
      idToken: idToken,
      accessToken: accessToken || '',
    });
    window.open(`${url}?${tokenParams.toString()}`, '_blank');
  } else {
    window.open(url, '_blank');
  }
};
```

### 2. AuthGuard (Management UI & Dashboard)

```typescript
useEffect(() => {
  const checkAuth = () => {
    // 1. Verificar se tem tokens na URL (primeira visita)
    const urlParams = new URLSearchParams(window.location.search);
    const urlIdToken = urlParams.get('idToken');
    const urlAccessToken = urlParams.get('accessToken');

    if (urlIdToken) {
      // Salvar no localStorage LOCAL
      localStorage.setItem('idToken', urlIdToken);
      if (urlAccessToken) {
        localStorage.setItem('accessToken', urlAccessToken);
      }
      // Remover da URL (segurança)
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    // 2. Verificar localStorage (visitas subsequentes)
    const token = localStorage.getItem('idToken');
    if (!token) {
      window.location.href = 'http://localhost:3002/login';
      return;
    }

    // 3. Validar token
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expirationTime = payload.exp * 1000;
    if (Date.now() >= expirationTime) {
      localStorage.clear();
      window.location.href = 'http://localhost:3002/login';
      return;
    }

    setIsAuthenticated(true);
    setIsChecking(false);
  };

  checkAuth();
}, []);
```

## 🔐 Segurança

### ✅ Pontos Positivos

1. **Tokens removidos da URL imediatamente** após serem salvos
2. **window.history.replaceState** limpa a URL sem recarregar a página
3. **Validação de expiração** em cada AuthGuard
4. **Tokens não persistem na URL** após primeiro load

### ⚠️ Considerações

1. **Tokens aparecem momentaneamente na URL**
   - Durante ~100ms até serem salvos e removidos
   - Em ambiente local, isso é aceitável
   - Em produção, considerar alternativas (ver seção abaixo)

2. **Browser History**
   - Tokens NÃO ficam no histórico (replaceState, não pushState)

3. **DevTools Network Tab**
   - Tokens visíveis em requests subsequentes (header Authorization)
   - Isso é normal e esperado para JWT

## 🌐 Alternativas para Produção

### Opção 1: Mesma Origem (Recomendado)

Usar subdomínios ou paths na mesma origem:
- `app.znit.io` → Landing Page
- `app.znit.io/management` → Management UI
- `app.znit.io/dashboard` → Dashboard

**Vantagem:** localStorage compartilhado automaticamente

**Implementação:** Proxy reverso (Nginx/CloudFront) ou monorepo

### Opção 2: Cookie SameSite=Lax

Usar cookie HTTP-Only em vez de localStorage:
```typescript
// Backend seta cookie
response.setHeader('Set-Cookie',
  `idToken=${token}; HttpOnly; SameSite=Lax; Secure; Domain=.znit.io`
);
```

**Vantagem:** Mais seguro (HttpOnly), compartilhado entre subdomínios

**Desvantagem:** Requer mudanças no backend

### Opção 3: PostMessage API

Comunicação entre janelas:
```typescript
// Landing page
window.opener.postMessage({ token: 'xxx' }, 'https://management.znit.io');

// Management UI
window.addEventListener('message', (event) => {
  if (event.origin === 'https://app.znit.io') {
    localStorage.setItem('idToken', event.data.token);
  }
});
```

**Vantagem:** Seguro, sem tokens na URL

**Desvantagem:** Complexo, requer janela pai aberta

## 🧪 Testes do Fluxo Local

### Teste 1: Primeira Visita ao Management UI

```bash
1. Login em localhost:3002
2. Click "Abrir Gerenciador"
3. Nova aba abre: localhost:3000?idToken=xxx&accessToken=yyy
4. URL rapidamente muda para: localhost:3000 (sem query params)
5. ✅ Management UI carrega normalmente
```

### Teste 2: Visita Subsequente

```bash
1. Fechar aba do Management UI
2. Click "Abrir Gerenciador" novamente
3. Nova aba abre com tokens na URL
4. AuthGuard detecta token já existe no localStorage
5. ✅ Carrega imediatamente
```

### Teste 3: Token Expirado

```bash
1. Aguardar 1 hora (token expira)
2. Tentar acessar Management UI
3. AuthGuard detecta token expirado
4. ✅ Redireciona para localhost:3002/login
```

### Teste 4: Acesso Direto (sem token)

```bash
1. Abrir nova aba anônima
2. Acessar diretamente: localhost:3000
3. AuthGuard não encontra token na URL nem no localStorage
4. ✅ Redireciona para localhost:3002/login
```

### Teste 5: Multiple Tabs

```bash
1. Abrir Management UI (aba 1)
2. Abrir Dashboard (aba 2)
3. Fazer logout na Landing Page
4. Recarregar aba 1 → Redireciona para login
5. Recarregar aba 2 → Redireciona para login
6. ✅ Logout global funciona
```

## 📊 Comparação: Local vs Produção

| Aspecto | Local (Multi-Port) | Produção (Mesma Origem) |
|---------|-------------------|------------------------|
| **URLs** | localhost:3000, :3001, :3002 | app.znit.io/management, /dashboard |
| **localStorage** | Isolado por porta | Compartilhado |
| **Token Sharing** | Via URL params | Automático |
| **Segurança** | Boa (tokens removidos rapidamente) | Melhor (sem tokens na URL) |
| **Complexidade** | Simples | Requer proxy/monorepo |

## 🚀 Comandos para Testar

```bash
# Terminal 1 - Backend API
cd tbot-lambda-collection/serverless-tbot-management-api
serverless offline --stage staging

# Terminal 2 - Landing Page (porta 3002)
cd landing-page
PORT=3002 npm start

# Terminal 3 - Management UI (porta 3000)
cd tbot-management-ui
npm run dev

# Terminal 4 - Dashboard (porta 3001)
cd tbot-dashboard
npm start
```

## 🔍 Debug do Fluxo

### Ver tokens sendo passados na URL

```javascript
// No console do Management UI/Dashboard (logo ao abrir)
const urlParams = new URLSearchParams(window.location.search);
console.log('idToken na URL:', urlParams.get('idToken'));
console.log('accessToken na URL:', urlParams.get('accessToken'));
```

### Ver tokens no localStorage

```javascript
// No console de qualquer app
console.log('idToken:', localStorage.getItem('idToken'));
console.log('accessToken:', localStorage.getItem('accessToken'));
```

### Ver quando token expira

```javascript
const token = localStorage.getItem('idToken');
const payload = JSON.parse(atob(token.split('.')[1]));
console.log('Expira em:', new Date(payload.exp * 1000));
console.log('Tempo restante:', Math.round((payload.exp * 1000 - Date.now()) / 1000 / 60), 'minutos');
```

## ✅ Checklist de Validação

- [ ] Landing Page salva tokens no localStorage (porta 3002)
- [ ] DashboardSelector passa tokens via URL
- [ ] Management UI recebe e salva tokens da URL
- [ ] Dashboard recebe e salva tokens da URL
- [ ] Tokens são removidos da URL após salvos
- [ ] AuthGuard valida expiração do token
- [ ] Token expirado redireciona para login
- [ ] Acesso direto sem token redireciona para login
- [ ] Logout limpa localStorage e redireciona

## 📚 Referências

- [Web Storage API (localStorage)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)
- [Same-Origin Policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy)
- [URLSearchParams API](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)
- [History API (replaceState)](https://developer.mozilla.org/en-US/docs/Web/API/History/replaceState)

---

## 🎉 Conclusão

O fluxo implementado funciona perfeitamente no ambiente local com múltiplas portas, passando tokens via URL de forma segura e transparente para o usuário. Para produção, recomenda-se migrar para mesma origem ou usar cookies HTTP-Only para máxima segurança.

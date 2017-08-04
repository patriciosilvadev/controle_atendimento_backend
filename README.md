# Atendimento Backend
Sistema Open Source para Gerenciamento de Atendimentos e Faturamento

## Table of Contents

**[Installation Instructions](#installation-instructions)** <br/>
**[Endpoints](#endpoints)**  <br/>
**[Testing](#testing)** <br/>
**[Features](#features)**

## Installation Instructions
```
    git clone https://github.com/vitorsilvalima/controle_atendimento_backend.git
    npm install
    npm start
```

## Endpoints
### Atendimentos
```
    get localhost:4000/api/atendimentos 
    post localhost:4000/api/atendimentos 
    get localhost:4000/api/atendimentos/:id 
    get localhost:4000/api/atendimenos/:ano/:mes
    put localhost:4000/api/atendimenos/:id 
    delete localhost:4000/api/atendimenos/:id
```

### Clientes
```
    get localhost:4000/api/clientes
    post localhost:4000/api/clientes
    get localhost:4000/api/clientes/:cnpj
    put localhost:4000/api/clientes/nome/:nome
    put localhost:4000/api/clientes/:cnpj
    delete localhost:4000/api/clientes/:cnpj
```

### Usuarios
```
    get localhost:4000/api/usuarios 
    get localhost:4000/api/usuarios/:id
    post localhost:4000/api/usuarios
    put localhost:4000/api/usuarios/:id
    delete localhost:4000/api/usuarios/:id
```

### Login
```
    post localhost:4000/login 
```

### Tipo de Atendimentos
```
    get localhost:4000/api/tipoAtendimento 
```

## Testing
```
    npm test
    npm run coverage
```



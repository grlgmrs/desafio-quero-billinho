# Billinho - Nestjs
A demonstração de funcionamento conta com os testes e/ou o swagger, portanto, siga os passo-a-passos para podermos utiliza-lo!

Por motivos de praticidade e facilidade no desenvolvimento, a aplicação foi desenvolvida utilizando o docker-compose, assim, enquanto desenvolvemos nossa api, basta deixarmos os containers rodando.

### Considerações
Considerando que a pasta `dist` é gerada pelo nosso container, caso você decida rodar o projeto diretamente em sua máquina, pode ser que seja necessário excluí-la como super usuario, já que o usuário do docker por padrão está configurado como root.

## Iniciando nossa aplicação
Basta copiarmos nosso env, instalarmos nossas dependencias e subirmos nosso container:
```bash
cp .env.example .env && \
yarn install && \
docker-compose up
```

Após nossa aplicação ter iniciado, basta sincronizarmos as migrações:
```bash
yarn typeorm schema:sync
```
e podemos seguir o desenvolvimento!

## Testando com swagger
Após termos iniciado nossa aplicação com sucesso, basta acessarmos [localhost:3000/api](http://localhost:3000/api/) e iniciarmos nossos testes!

## Testes e2e
Podemos executar os testes e2e tendo nosso arquivo `.env` e executando o arquivo `.docker/e2e/exec.sh`, então na raiz do projeto:
```bash
bash .docker/e2e/exec.sh
```

Ou iniciando o nosso banco com:
```bash
docker-compose up -f docker-compose.debug-e2e.yaml
```
E depois executando-os:
```bash
yarn test:e2e
```
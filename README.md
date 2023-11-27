# CleanCommerce

Esse projeto, apelidado de CleanCommerce, segue o modelo de Software como Serviço (SaaS), ao fornecer uma plataforma de desenvolvimento e operação de **e-commerces**, e foi implementado com o intuito de praticar principalmente a **Clean Architecture**, bem como princípios de princípios de DDD e SOLID, utilizando NodeJS e Typescript.

## Requisitos Funcionais Implementados

### Pedidos

- Criação de um pedido
- Confirmação de pedido via e-mail
- Pagamento de um pedido
    - Integração com Mercado Pago
    - Pagamento via cartão de crédito
    - Pagamento via cartão de PIX
- Histórico
    - Consulta de dados de pedidos

### Entrega

- Frete
    - Integração com uma API que consulta dados dos Correios
    - Consulta da estimativa de tempo de entrega
    - Consulta da estimativa de custo de entrega
    
### Descontos

- Cupons de Desconto
    - Criação de cupons de desconto
    - Adição de cupons de desconto a um pedido
    - Consulta dos detalhes de cupons de desconto
- Promoções
    - Criação de promoções
    - Adição de promoções em produtos ou categorias

### Interações Vendedor/Consumidor

- Chat
    - Envio de mensagens em tempo real entre o cliente e o vendedor
- Perguntas e Respostas
    - Envio de dúvidas por parte dos clientes com relação a um produto
    - Envio de respostas por parte do vendedor às dúvidas dos clientes
- Avaliação de Produtos
    - Adição de avaliações de produtos por parte dos clientes

### Operação/Gerenciamento

- Papéis
    - Criação de papéis
    - Atribuição de papéis aos usuários
- Permissões
    - Atribuição de permissões aos papéis
- Produtos
    - Cadastro de produtos
    - Consulta de dados de um produto
- Usuários
    - Cadastro e autenticação de usuários
    - Cadastro e consulta de endereços (residenciais ou logísticos)
    - Atualização e consulta de dados pessoais
    - Consulta de pedidos realizados

## Tecnologias Utilizadas
- Typescript
- MySQL e Sequelize
- Jest para testes automatizados
- Inversify para inversão de controle
- JWT e Bcrypt para autenticação de usuários
- Express para o servidor HTTP
- WebSocket para chat em tempo real
- NodeMailer para envio de e-mail
- Joi para validação de dados


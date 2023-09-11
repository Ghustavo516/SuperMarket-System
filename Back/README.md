# Supermercado-API

Esse projeto foi desenvolvido com a intensão de colocar em pratica os conteudo obtido durante os cursos de Java, Servlet, Spring Boot e Banco de dados, com isso desenvolvi uma API para fazer acesso a dados atraves de requesições HTTP: usando GET, POST, PUT e DELETE atraves do aplicativo PostMan.

## Como utilizar?

Antes de realizarmos as configurações necessarias para fazer a API rodar e necessario ter alguns aplicativos e ferramentas onde iremos fazer a utilização deles para o uso da API.

* VSCode
* PostMan
* TablePlus
* Docker

### 1 - Passo: Realizar o download de todos os arquivos desse repositorio

Realizando o download de todos os arquivos desse repositorio, iremos abrir eles atraves do editor de codico VSCode.

### 2 - Passo: Abrir o arquvo ```Docker-composer.yml```
Esse arquivo é responsavel por ter todas as configurações necessarias para a API rodar

### 3 - Passo: Executar o comando ```docker compose up```
Ao entrar no terminal da aplicação e executar o comando docker compose up, o docker ira realizar o download de todas dependencia necessarias para o funcionamento da imagem.

### 4 - Passo: Executar a API pelo VScode
Para executar a API pelo VScode é necessario entrar e encontrar o arquivo que chamado ```SupermarketApiApplication.java``` essa classe é responsavel por gerenciar a inicialização de nosso projeto com Spring Boot, isso somente é possivel por conta da anotação ```@SpringBootApplication```

Para iniciar a execução de nossa API podemos usar o ```botão de executar``` ou precionar as teclas ```Ctrl + F5```

#### Como saber que a aplicação esta iniciando?

Quando executar a aplicação Spring Boot iremos notar que no terminal sera exibido o logo do ```Spring``` e logo abaixo sera exibido o nome ```::Spring Boot ::```, dessa seguinte forma:

![image](https://github.com/Ghustavo516/Supermercado-API/assets/41215700/8d97958b-4ee9-4a10-a80c-d346553ac337)

#### Como saber que a API esta rodando?

Apos o Spring Boot inicializar e carregar todos os modulos necessarios para o funcionamento e não exibir nenhum erro, o Spring Boot ira exibir uma mensagem indicando que o servidor TomCat era rodando e indicando a porta que ele esta utilizando, geralmente essa porta é a 8080.

Com a API ja rodando e todas as dependencias baixadas e instaladas para o funcionamento da API, iremos utilizar o aplication PostMan para fazer o envio de requesições HTTP, como GET, POST, PUT e DELETE.


  




# Usa a imagem base do Node.js para build (versão 20, por exemplo)
FROM node:20 AS build

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de configuração do projeto (package.json e package-lock.json/yarn.lock)
# e instala as dependências. Aproveita o cache do Docker.
COPY package*.json ./
RUN npm install # ou yarn install, se você usa Yarn

# Copia o restante dos arquivos do projeto React
COPY . .

# Constrói a aplicação React para produção
RUN npm run build

# Usa a imagem base do Nginx para servir os arquivos estáticos
FROM nginx:alpine AS final
WORKDIR /usr/share/nginx/html

# Remove a configuração padrão do Nginx
RUN rm -rf ./*

# Copia os arquivos estáticos construídos da etapa de build
COPY --from=build /app/build .

# Copia o arquivo de configuração do Nginx customizado
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expõe a porta padrão do Nginx para HTTP
EXPOSE 80

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]
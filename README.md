# vue2-biblioteca

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Configuracion URL_API
Para configurar el la url de la API modificar la variable `axios.defaults.baseURL` que se encuentra en el archivo `main.js` en la carpeta raiz del proyecto, por defecto se esta usando: `http://localhost:3000/api`, tener en cuenta que la API siempre usa un path adicional despues del dominio o host (`/api`)
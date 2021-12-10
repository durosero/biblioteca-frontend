<template>
<div id="app">

    <div id="nav" class="d-flex justify-content-center">
        <div class="row">
            <ul class="nav align-items-center navbar navbar-light">
                <li class="nav-item">
                    <router-link to="/" class="nav-link"><i class="fa fa-home"></i> Inicio</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/libro" class="nav-link"><i class="fa fa-book"></i> Libros</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/usuario" class="nav-link">
                        <i class="fa fa-users"></i> Usuarios</router-link>
                </li>

                <li class="nav-item">
                    <router-link to="/prestamo" class="nav-link">
                        <i class="fa fa-address-book"></i> Prestamos</router-link>
                </li>
            </ul>
        </div>

    </div>
   
    <div class="container">
        <router-view />
    </div>

</div>
</template>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#nav {
    padding: 30px;
}

#nav a {
    font-weight: bold;
    color: #2c3e50;
}

#nav a.router-link-exact-active {
    color: #42b983;
}
</style>

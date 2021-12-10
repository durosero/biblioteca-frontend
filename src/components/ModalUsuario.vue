<template>
<form @submit.stop.prevent="guardarUsuario" novalidate>

    <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">{{ titulo }}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>

    <div class="modal-body text-left">

         <div class="form-group">
            <label for="text-titulo">Nro identificación</label>
            <input type="text" class="form-control" v-model.trim="formUser.id_usuario" id="text-id_usuario" placeholder="Número de documento" />
        </div>

        <div class="form-group">
            <label for="text-titulo">Nombres</label>
            <input type="text" class="form-control" v-model.trim="formUser.nombres" id="text-nombres" placeholder="Nombres completos" />
        </div>
        <div class="form-group">
            <label for="txt-editorial">Apellidos</label>

            <input type="text" class="form-control" v-model.trim="formUser.apellidos" id="txt-apellidos" placeholder="Apellidos completos" />
        </div>
        <div class="form-group">
            <label for="txt-autor">Email</label>

            <input type="email" class="form-control" v-model.trim="formUser.email" id="txt-email" placeholder="Correo electrónico" />
        </div>
        <div class="form-group">
            <label for="txt-area">Celular</label>

            <input type="text" class="form-control" v-model.trim="formUser.celular" id="txt-celular" placeholder="Celular" />
        </div>

        <div class="form-group">
            <label for="txt-area">Direccion</label>

            <input type="text" class="form-control" v-model.trim="formUser.direccion" id="txt-direccion" placeholder="Direccion" />
        </div>

        <b-alert :show="dismissCountDown" dismissible :variant="mensaje.color" @dismissed="dismissCountDown = 0" @dismiss-count-down="countDownChanged">
            {{ mensaje.texto }}
        </b-alert>
    </div>

    <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Cancelar
        </button>
        <button type="submit" class="btn btn-primary">Guardar cambios</button>
    </div>

</form>
</template>

<script>

import { mapState } from 'vuex';
export default {
    created(){
        // if(this.libroSelected.id_libro==undefined){
        //     console.log("nuevo libro");
        // }else{
        //     console.log(this.libroSelected);
        //     this.formLibro =  this.libroSelected;
        //     console.log(this.libroSelected);

        // }

        //this.formLibro = this.libroSelected;
        
    },
    data() {
        return {
            mensaje: {
                color: "success",
                texto: "",
            },
            dismissSecs: 5,
            dismissCountDown: 0,
            tituloModal: "Registrar nuevo libro",
            formUser: {
                id_usuario: 0,
                nombres : "",
                apellidos : "",
                email : "",
                celular : "",
                direccion : ""
            },
           // formLibro : this.libroSelected
        };
    },

    methods: {
        countDownChanged(dismissCountDown) {
            this.dismissCountDown = dismissCountDown;
        },
        showAlert() {
            this.dismissCountDown = this.dismissSecs;
        },

        guardarUsuario() {

    


            if (this.nuevoL) {
                this.axios
                    .post("/usuario", this.formUser)
                    .then((data) => {
                        let res = data.data;
                        if (res.error) {
                            this.showAlert();
                            this.mensaje.texto = res.message;
                            this.mensaje.color = "warning";
                        } else {
                            this.showAlert();
                            this.mensaje.texto = res.message;
                            this.mensaje.color = "success";
                            this.formUser = {};
                            this.$parent.cargarUsuarios();
                            
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        this.showAlert();
                        this.mensaje.texto = "Error al guardar el registro";
                        this.mensaje.color = "danger";
                    });
            } else {

                console.log("vamos a editar");
                console.log(this.formLibro);
                this.axios
                    .put("/usuario", this.formUser)
                    .then((data) => {
                        let res = data.data;
                        if (res.error) {
                            this.showAlert();
                            this.mensaje.texto = res.message;
                            this.mensaje.color = "warning";
                        } else {
                            this.showAlert();
                            this.mensaje.texto = res.message;
                            this.mensaje.color = "success";
                            this.formLibro = {};

                            this.$parent.cargarUsuarios();
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        this.showAlert();
                        this.mensaje.texto = "Error al guardar el registro";
                        this.mensaje.color = "danger";
                    });
            }
        },
    },

    props: {
        titulo: String,
        nuevoL: Boolean,
        user : {}
    },

    computed: {
    ...mapState(['userSelected'])
    },
    watch :{
        userSelected : function(data){
            console.log(data);
            this.formUser = data;
         //   this.changeDataFrom(data)
            
        }
    }
};
</script>

<style>
</style>

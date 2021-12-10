<template>
<form @submit.stop.prevent="guardarLibro" novalidate>

    <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">{{ titulo }}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>

    <div class="modal-body text-left">
        <div class="form-group">
            <label for="text-titulo">Titulo</label>
            <input type="text" class="form-control" v-model.trim="formLibro.titulo" id="text-titulo" placeholder="Titulo" />
        </div>
        <div class="form-group">
            <label for="txt-editorial">Editorial</label>

            <input type="email" class="form-control" v-model.trim="formLibro.editorial" id="txt-editorial" placeholder="Editorial" />
        </div>
        <div class="form-group">
            <label for="txt-autor">Autor</label>

            <input type="email" class="form-control" v-model.trim="formLibro.nombre_autor" id="txt-autor" placeholder="Autor" />
        </div>
        <div class="form-group">
            <label for="txt-area">Area</label>

            <input type="email" class="form-control" v-model.trim="formLibro.area" id="txt-area" placeholder="Area" />
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
            formLibro: {
                id_libro: 0,
                titulo: "",
                editorial: "",
                nombre_autor: "",
                area: "",
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


        changeDataFrom(data){
            this.formLibro = data;
        },

        guardarLibro() {

    


            if (this.nuevoL) {
                this.axios
                    .post("/libro", this.formLibro)
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
                            this.$parent.cargarLibros();
                            
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
                    .put("/libro", this.formLibro)
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

                            this.$parent.$on('cargarLibros');
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
        libro : {}
    },
    computed: {
    ...mapState(['libroSelected'])
    },
    watch :{
        libroSelected : function(data){
            this.formLibro = data;
         //   this.changeDataFrom(data)
            
        }
    }
};
</script>

<style>
</style>

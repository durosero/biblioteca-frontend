<template>
<div>
    <h1>Administrador de prestamos</h1>

    <div class="row">
        <!-- Modal -->

        <b-modal id="modal-lg-from" size="lg" :title="tituloModal" @ok="handleOk">
            <form ref="form" @submit.stop.prevent="handleSubmit">
                <div class="row">
                    <div class="col-md-6">
                        <label for="text-id_usuario">Número documento usuario</label>
                        <div class="input-group">
                            <input type="text" class="form-control" required v-on:keyup.enter="buscarUsuario" v-model="txtBuscarUser" id="text-id_usuario" placeholder="Numero de identificación" />
                            <button type="button" @click="buscarUsuario" class="btn btn-outline-secondary" style="width: 30%">
                                <span class="sr-only">Loading...</span>

                                Buscar <i class="fa fa-search"></i>
                            </button>
                        </div>
                    </div>

                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="text-usuario">Usuario</label>
                            <input type="text" disabled class="form-control" id="text-usuario" v-model="txtUserInfo" placeholder="Informacion del usuario" />
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="text-id_libro">Libro</label>

                            <ejs-autocomplete id="autocompleteLibro" :dataSource="libros" v-model="txtLibro" :showPopupButton="true" :fields="dataFields" placeholder="Buscar libros disponibles" popupWidth="100%" popupHeight="400px" @select="onChangePrestamo">
                            </ejs-autocomplete>
                        </div>
                    </div>

                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="sel_devuelto">Devuelto</label>
                            <select class="custom-select" id="sel_devuelto" v-model.trim="formPrestamo.devuelto">
                                <option value="NO" selected>NO</option>
                                <option value="SI">SI</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="date_fecha_prestamo">Fecha prestamo</label>
                            <b-form-datepicker placeholder="Seleccionar fecha prestamo" id="date_fecha_prestamo" v-model="formPrestamo.fecha_prestamo" class="mb-2"></b-form-datepicker>
                        </div>
                    </div>

                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="date_fecha_devolucion">Fecha devolución</label>
                            <b-form-datepicker id="date_fecha_devolucion" placeholder="Seleccionar fecha devolución" v-model="formPrestamo.fecha_devolucion" class="mb-2"></b-form-datepicker>
                        </div>
                    </div>
                </div>
                <b-alert :show="dismissCountDown" dismissible :variant="mensaje.color" @dismissed="dismissCountDown = 0" @dismiss-count-down="countDownChanged">
                    {{ mensaje.texto }}
                </b-alert>
            </form>
        </b-modal>

        <div class="col-md-12">
            <b-button @click="nuevoPrestamo(null, true)" ref="btnShow" class="btn-sm btn btn-primary float-end m-1">
                <i class="fa fa-plus"></i> Agregar nuevo
            </b-button>
        </div>

        <div class="col-md-12">
            <div class="">
                <table class="table table-striped table-bordered table-sm text-start">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">CÓDIGO</th>
                            <th scope="col">LIBRO</th>
                            <th scope="col">FECHA PRESTAMO</th>
                            <th scope="col">FECHA DEVOLUCIÓN</th>
                            <th scope="col">DEVUELTO</th>
                            <th scope="col">USUARIO</th>
                            <th scope="col">CONTACTO</th>
                            <th scope="col">ACCIÓN</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(prestamo, index) in prestamos" :key="prestamo.id_prestamo">
                            <th scope="row">{{ index + 1 }}</th>
                            <td>{{ prestamo.id_prestamo }}</td>
                            <td>{{ prestamo.titulo }} - {{ prestamo.editorial }}</td>

                            <td>{{ prestamo.fecha_prestamo | moment("DD-MM-YYYY") }}</td>
                            <td>{{ prestamo.fecha_devolucion | moment("DD-MM-YYYY") }}</td>
                            <td>{{ prestamo.devuelto }}</td>
                            <td>{{ prestamo.nombres }} {{ prestamo.apellidos }}</td>
                            <td>{{ prestamo.celular }} - {{ prestamo.email }}</td>
                            <td>
                                <div class="row">
                                    <div class="col-6">
                                        <a href="javascript:void(0)" class="text-danger" @click="eliminarPrestamo(prestamo)" data-toggle="tooltip" title="Eliminar este libro">
                                            <i class="fa fa-trash"></i>
                                        </a>
                                    </div>
                                    <div class="col-6">
                                        <a href="javascript:void(0)" class="text-info" data-toggle="modal" data-target="#exampleModal" @click="nuevoPrestamo(prestamo, false)" title="Editar este libro">
                                            <i class="fa fa-pencil"></i>
                                        </a>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <b-pagination v-model="currentPage" @page-click="paginar" :total-rows="totalUsuario" :per-page="perPage" align="right" last-number></b-pagination>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {
    mapState,
    mapMutations,
    mapActions
} from "vuex";

import Vue from "vue";
import {
    AutoCompletePlugin
} from "@syncfusion/ej2-vue-dropdowns";

Vue.use(AutoCompletePlugin);
import {
    DataManager,
    WebApiAdaptor,
    Query
} from "@syncfusion/ej2-data";

export default Vue.extend({
    data() {
        return {
            dataFields: {
                value: "titulo",
            },

            mensaje: {
                color: "success",
                texto: "",
            },
            dismissSecs: 5,
            dismissCountDown: 0,

            formPrestamo: {
                id_prestamo: 0,
                libro_id: 0,
                usuario_id: 0,
                fecha_prestamo: "",
                fecha_devolucion: "",
                devuelto: "NO",
            },
            libros: [],
            txtBuscarUser: "",
            txtUserInfo: "",
            txtLibro: "",
            editarPrestamo: false,

            prestamos: [],
            tituloModal: "Registrar nuevo usuario",
            nuevo: false,
            totalUsuario: 0,
            limite: 10,
            start: 0,
            perPage: 10,
            currentPage: 1,
            boxOne: "",
            modalShow: false,
        };
    },
    created() {
        this.cargarPrestamos();
        this.buscarLibros();
    },

    methods: {
        ...mapActions(["accionSetUser"]),
        countDownChanged(dismissCountDown) {
            this.dismissCountDown = dismissCountDown;
        },
        showAlert() {
            this.dismissCountDown = this.dismissSecs;
        },
        editarUsuario(user) {
            this.nuevo = false;
            this.accionSetUser(user);

            this.tituloModal = "Editar usuario";

        },

        onChangePrestamo: function (data) {
            this.formPrestamo.libro_id = data.itemData.id_libro;
        },

        buscarLibros() {
            this.axios
                .get("/libro/disponibles", {
                    params: {
                        termino: this.txtBuscarUser,
                    },
                })
                .then((data) => {
               
                    if (data.data.data.length > 0) {
                        const libros = data.data.data;
                        this.libros = libros;
                    } else {
                        this.libros = [];
                    }
                })
                .catch((err) => {
                    console.log(err);

                    this.libros = [];
                });
        },

        checkFormValidity() {
            const valid = this.$refs.form.checkValidity();
            this.nameState = valid;
            return valid;
        },

        handleOk(bvModalEvt) {
            // Prevent modal from closing
            bvModalEvt.preventDefault();
            // Trigger submit handler
            // this.handleSubmit()
            console.log("click");
            console.log(this.formPrestamo);

            this.guardarPrestamo();
        },
        handleSubmit() {
            // Exit when the form isn't valid
            if (!this.checkFormValidity()) {
                return;
            }
            // Push the name to submitted names
            this.submittedNames.push(this.name);
            // Hide the modal manually
            this.$nextTick(() => {
                this.$bvModal.hide("modal-prevent-closing");
            });
        },

        paginar(event, pagina) {
            this.cargarPrestamos(pagina);
        },

        buscarUsuario() {
            this.axios
                .get("/usuario/buscar", {
                    params: {
                        termino: this.txtBuscarUser,
                    },
                })
                .then((data) => {
                  
                    if (data.data.data.length > 0) {
                        const usuario = data.data.data[0];
                 
                        this.formPrestamo.usuario_id = usuario.id_usuario;
                        this.txtUserInfo = `${usuario.nombres} ${usuario.apellidos}`;
                    } else {
                        this.formPrestamo.usuario_id = "";
                        this.txtUserInfo = "";
                    }
                })
                .catch((err) => {
                    console.log(err);

                    this.txtUserInfo = `${usuario.nombres} ${usuario.apellidos}`;
                });
        },

        eliminarPrestamo(prestamo) {
            this.boxOne = "";
            this.$bvModal
                .msgBoxConfirm(
                    `¿Seguro que desea eliminar el prestamo con código ${prestamo.id_prestamo} ?`
                )
                .then((value) => {
                   
                    this.boxOne = value;

                    if (!value) return;

                    this.axios
                        .delete("/prestamo/" + prestamo.id_prestamo)
                        .then((data) => {
                           
                            const index = this.prestamos.indexOf(prestamo);
                            this.prestamos.splice(index, 1);
                        })
                        .catch((err) => {
                            console.log(err);
                            this.prestamos.splice(index, 1);
                        });
                })
                .catch((err) => {
                    // An error occurred
                    console.log(err);
                });

            //
        },

        nuevoPrestamo(prestamo, nuevo = true) {
            if (nuevo) {
                this.tituloModal = "Registrar nuevo prestamo";
                this.formPrestamo = {};
                this.formPrestamo.devuelto = "NO";
                this.txtUserInfo = "";
                this.txtBuscarUser = "";
                this.txtLibro = "";
            }else{
                this.editarPrestamo = true;
                this.tituloModal = "Editar nuevo prestamo";
                this.formPrestamo.id_prestamo =  prestamo.id_prestamo;
                this.formPrestamo.libro_id = prestamo.id_libro;
                this.formPrestamo.usuario_id = prestamo.id_usuario;
                this.formPrestamo.fecha_prestamo = prestamo.fecha_prestamo;
                this.formPrestamo.fecha_devolucion = prestamo.fecha_devolucion;
                this.formPrestamo.devuelto = prestamo.devuelto;
                this.txtLibro = prestamo.titulo;
                this.txtUserInfo = prestamo.nombres + " "+prestamo.apellidos;
                this.txtBuscarUser = prestamo.id_usuario;

            }
   
            this.$root.$emit("bv::show::modal", "modal-lg-from", "#btnShow");
            this.nuevo = true;
            this.accionSetUser({});
            console.log("Nuevo libro");

            
        },

        guardarPrestamo() {

            if(this.editarPrestamo){
           
            this.axios
                .put("/prestamo", this.formPrestamo)
                .then((data) => {
                    let res = data.data;
                    if (res.error) {
                        // this.showAlert();
                        this.mensaje.texto = res.message;
                        this.mensaje.color = "warning";
                    } else {
                        this.showAlert();
                        this.mensaje.texto = res.message;
                        this.mensaje.color = "success";
                        // this.formPrestamo = {};
                        // this.formPrestamo.devuelto = "NO";
                        // this.txtUserInfo = "";
                        // this.txtBuscarUser = "";
                        // this.txtLibro = "";

                       // this.$root.$emit('bv::hide::modal', 'modal-lg-from', '#btnShow');
                    }
                })
                .catch((err) => {
                    console.log(err);
                    this.showAlert();
                    this.mensaje.texto = "Error al guardar el registro";
                    this.mensaje.color = "danger";
                });
            }else{
            delete this.formPrestamo.id_prestamo;
            this.axios
                .post("/prestamo", this.formPrestamo)
                .then((data) => {
                    let res = data.data;
                    if (res.error) {
                        // this.showAlert();
                        this.mensaje.texto = res.message;
                        this.mensaje.color = "warning";
                    } else {
                        this.showAlert();
                        this.mensaje.texto = res.message;
                        this.mensaje.color = "success";
                        this.formPrestamo = {};
                        this.formPrestamo.devuelto = "NO";
                        this.txtUserInfo = "";
                        this.txtBuscarUser = "";
                        this.txtLibro = "";
                        //this.$root.$emit('bv::hide::modal', 'modal-lg-from', '#btnShow');

                
                    }
                })
                .catch((err) => {
                    console.log(err);
                    this.showAlert();
                    this.mensaje.texto = "Error al guardar el registro";
                    this.mensaje.color = "danger";
                });
            }

            this.cargarPrestamos();


        },

        cargarPrestamos(pagina = 1) {
            this.axios
                .get("/prestamo/lista", {
                    params: {
                        limite: this.limite,
                        start: pagina * this.perPage - this.perPage,
                    },
                })
                .then((data) => {
                   
                    this.prestamos = data.data.data;
                    this.totalUsuario = data.data.total;
                })
                .catch((err) => {
                    console.log(err);
                    this.prestamos = [];
                });
        },
    },
    computed: {
        cantidadPaginas() {
            return Math.ceil(this.totalLibro / this.limite);
        },
    },
});
</script>

<style>
@import "../../node_modules/@syncfusion/ej2-base/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-inputs/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-vue-dropdowns/styles/material.css";
</style>

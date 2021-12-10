<template>
<div>
    <h1>Administrador de usuarios</h1>

    <div class="row">
        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">

                    <ModalUsuario :nuevoL="nuevo" :titulo="tituloModal" :user="usuarioSelected" />
                </div>
            </div>
        </div>

        <div class="col-md-12">
            <button @click="nuevoLibro()" class="btn-sm btn btn-primary float-end m-1" data-toggle="modal" data-target="#exampleModal">
                <i class="fa fa-plus"></i> Agregar nuevo
            </button>

        </div>

        <div class="col-md-12">
            <div class="">
                <table class="table table-striped table-bordered table-sm text-start">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">NOMBRES</th>
                            <th scope="col">APELLIDOS</th>
                            <th scope="col">EMAIL</th>
                            <th scope="col">CELULAR</th>
                            <th scope="col">DIRECCION</th>
                            <th scope="col">ACCION</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(user, index) in usuarios" :key="user.id_usuario">
                            <th scope="row">{{ index + 1 }}</th>
                            <td>{{ user.nombres }}</td>
                            <td>{{ user.apellidos }}</td>
                            <td>{{ user.email }}</td>
                            <td>{{ user.celular }}</td>
                            <td>{{ user.direccion }}</td>
                            <td>
                                <div class="row">
                                    <div class="col-6">
                                        <a href="javascript:void(0)" class="text-danger" @click="eliminarUsuario(user)" data-toggle="tooltip" title="Eliminar este libro">
                                            <i class="fa fa-trash"></i>
                                        </a>
                                    </div>
                                    <div class="col-6">
                                        <a href="javascript:void(0)" class="text-info" data-toggle="modal" data-target="#exampleModal" @click="editarUsuario(user)" title="Editar este libro">
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
} from 'vuex'
import ModalUsuario from "@/components/ModalUsuario.vue";
export default {
    components : {
        ModalUsuario
    },
    data() {

        

        return {
            usuarios: [],
            usuarioSelected: {},
            tituloModal: "Registrar nuevo usuario",
            nuevo: false,
            totalUsuario: 0,
            limite: 10,
            start: 0,
            perPage: 10,
            currentPage: 1,
            boxOne: '',
            modalShow: false
        };
    },
            created() {

            this.cargarUsuarios();
        },

    methods: {
  ...mapActions(['accionSetUser']),
        editarUsuario(user) {
            this.nuevo = false;
            this.accionSetUser(user);

            this.tituloModal = "Editar usuario";

            //  console.log(libro);
        },

        paginar(event, pagina) {
            this.cargarUsuarios(pagina);
        },

        eliminarUsuario(user) {

            this.boxOne = ''
            this.$bvModal.msgBoxConfirm(`¿Seguro que desea eliminar el usuario ${user.nombres} ?`)
                .then(value => {
                    console.log(value);
                    this.boxOne = value

                    if (!value) return;

                    this.axios.delete('/usuario/' + user.id_usuario)
                        .then((data) => {
                            console.log(data);
                            const index = this.usuarios.indexOf(user);
                            this.usuarios.splice(index, 1);
                        })
                        .catch((err) => {
                            console.log(err);
                            this.usuarios.splice(index, 1);
                        });

                })
                .catch(err => {
                    // An error occurred
                    console.log(err);
                })

            //

        },

        nuevoLibro() {
            this.nuevo = true;
            this.accionSetUser({});
            console.log("Nuevo libro");

            this.tituloModal = "Registrar nuevo libro";

        },

        cargarUsuarios(pagina = 1) {
            this.axios.get('/usuario/lista', {
                    params: {
                        limite: this.limite,
                        start: (pagina * this.perPage) - this.perPage
                    }
                })
                .then((data) => {
                    console.log(data);
                    this.usuarios = data.data.data;
                    this.totalUsuario = data.data.total;
                })
                .catch((err) => {
                    console.log(err);
                    this.usuarios = [];
                });
        },
    },
        computed: {
        cantidadPaginas() {
            return Math.ceil(this.totalLibro / this.limite);
        }
    },
};
</script>

<style></style>

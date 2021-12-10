<template>
<div>
    <h1>Administrador de libros</h1>

    <div class="row">
        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    
                    <ModalLibro :nuevoL="nuevo" :titulo="tituloModal" :libro="libroSelected" />
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
                            <th scope="col">TITULO</th>
                            <th scope="col">EDITORIAL</th>
                            <th scope="col">AUTOR</th>
                            <th scope="col">AREA</th>
                            <th scope="col">DISPONIBLE</th>
                            <th scope="col">ACCION</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(lib, index) in libros" :key="lib.id_libro">
                            <th scope="row">{{ index + 1 }}</th>
                            <td>{{ lib.titulo }}</td>
                            <td>{{ lib.editorial }}</td>
                            <td>{{ lib.nombre_autor }}</td>
                            <td>{{ lib.area }}</td>
                            <td>{{ lib.disponible }}</td>
                            <td>
                                <div class="row">
                                    <div class="col-6">
                                        <a href="javascript:void(0)" class="text-danger" @click="eliminarLibro(lib)" data-toggle="tooltip" title="Eliminar este libro">
                                            <i class="fa fa-trash"></i>
                                        </a>
                                    </div>
                                    <div class="col-6">
                                        <a href="javascript:void(0)" class="text-info" data-toggle="modal" data-target="#exampleModal" @click="editarLibro(lib)" title="Editar este libro">
                                            <i class="fa fa-pencil"></i>
                                        </a>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <b-pagination v-model="currentPage" @page-click="paginar" :total-rows="totalLibro" :per-page="perPage" align="right" last-number></b-pagination>

            </div>
        </div>
    </div>
</div>
</template>

<script>


import ModalLibro from "@/components/ModalLibro.vue";
import {
    mapState,
    mapMutations,
    mapActions
} from 'vuex'
export default {
    components: {
        ModalLibro,
    },
    data() {
        return {
            libros: [],
            libroSelected: {},
            tituloModal: "Registrar nuevo libro",
            nuevo: false,
            totalLibro: 0,
            limite: 10,
            start: 0,
            perPage: 10,
            currentPage: 1,
            boxOne: '',
            modalShow : false
        };
    },
    created() {
        console.log("Mounted listo");
        this.cargarLibros();
    },
    methods: {
        ...mapActions(['accionSetLibro']),

        editarLibro(libro) {
            this.nuevo = false;
            this.accionSetLibro(libro);

            this.tituloModal = "Editar libro";

            //  console.log(libro);
        },

        paginar(event, pagina) {
            this.cargarLibros(pagina);
        },

        eliminarLibro(libro) {

            this.boxOne = ''
            this.$bvModal.msgBoxConfirm(`¿Seguro que desea eliminar el libro ${libro.titulo} ?`)
                .then(value => {
                    console.log(value);
                    this.boxOne = value

                    if (!value) return;

                    this.axios.delete('/libro/' + libro.id_libro)
                        .then((data) => {
                            console.log(data);
                            const index = this.libros.indexOf(libro);
                            this.libros.splice(index, 1);
                        })
                        .catch((err) => {
                            console.log(err);
                            this.libros.splice(index, 1);
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
            this.accionSetLibro({});
            console.log("Nuevo libro");

            this.tituloModal = "Registrar nuevo libro";

        },

        cargarLibros(pagina = 1) {
            this.axios.get('/libro/lista', {
                    params: {
                        limite: this.limite,
                        start: (pagina * this.perPage) - this.perPage
                    }
                })
                .then((data) => {
                    console.log(data);
                    this.libros = data.data.data;
                    this.totalLibro = data.data.total;
                })
                .catch((err) => {
                    console.log(err);
                    this.libros = [];
                });
        },

    },
    computed: {
        cantidadPaginas() {
            return Math.ceil(this.totalLibro / this.limite);
        }
    },
    watch :{
        modalShow : function(val){
            console.log(val);
            if(!val){
                this.cargarLibros();
            }
        }
    }
};
</script>

<style></style>

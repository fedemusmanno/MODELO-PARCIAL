<template>
  <section class="src-components-form">
    <div class="jumbotron">
    
      <h2>Formulario</h2>
      <hr>
      <br>
    
      <vue-form :state="formState" @submit.prevent="enviar()">

        <validate tag="div">
          <label for="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            class="form-control"
            autocomplete="off"
            v-model.trim="formData.nombre"
            required
            :minlength="nombreLengthMin"
            :maxlength="nombreLengthMax"
            sin-espacios-medios
          >
          <field-messages name="nombre" show="$dirty">
            <div slot="required" class="alert alert-danger mt-1">Campo requerido</div>
            <div slot="sin-espacios-medios" class="alert alert-warning mt-1">
              No se permiten espacios intermedios
            </div>
            <div slot="minlength" class="alert alert-danger mt-1">
              Este campo requiere como mínimo {{ nombreLengthMin }} caracteres
            </div>
            <div v-if="formData.nombre.length == nombreLengthMax" class="alert alert-warning mt-1">
              Este campo permite como máximo {{ nombreLengthMax }} caracteres
            </div>
          </field-messages>  
        </validate>
        <br>

        <validate tag="div">
          <label for="documento">Documento</label>
          <input
            type="number"
            id="documento"
            name="documento"
            class="form-control"
            autocomplete="off"
            v-model.number="formData.documento"
            required
            :max="documentoMax"
          >
          <field-messages name="documento" show="$dirty">
            <div slot="required" class="alert alert-danger mt-1">Campo requerido</div>
            <div slot="max" class="alert alert-danger mt-1">
              El número máximo es de {{ documentoMax }}
            </div>
          </field-messages>  
        </validate>
        <br>

        <validate tag="div">
          <label for="montoAPagar">Monto a pagar</label>
          <input
            type="number"
            id="montoAPagar"
            name="montoAPagar"
            class="form-control"
            autocomplete="off"
            v-model.number="formData.montoAPagar"
            required
            :min="pagoMin"
          >
          <field-messages name="montoAPagar" show="$dirty">
            <div slot="required" class="alert alert-danger mt-1">Campo requerido</div>
            <div slot="min" class="alert alert-danger mt-1">
              El monto debe ser mayor a 0
            </div>
          </field-messages>  
        </validate>
        <br>

        <validate tag="div">
          <label for="pagoAbonado">Pago Abonado</label>
          <input
            type="number"
            id="pagoAbonado"
            name="pagoAbonado"
            class="form-control"
            autocomplete="off"
            v-model.number="formData.pagoAbonado"
            required
            :min="pagoMin"
          >
          <field-messages name="pagoAbonado" show="$dirty">
            <div slot="required" class="alert alert-danger mt-1">Campo requerido</div>
            <div slot="min" class="alert alert-danger mt-1">
              El monto debe ser mayor a 0
            </div>
          </field-messages>   
        </validate>
        <br>

        <button class="btn btn-info btn-block my-3" :disabled="formState.$invalid" type="submit">Enviar</button>

      </vue-form>
      <br>
      <hr>

      <div v-if="registros.length">
       <!-- formState.$dirty" -->
        <table class="table table-dark">
          <!-- <tr>
            <th>Nombre</th>
            <th>Documento</th>
            <th>Monto a Pagar</th>
            <th>Pago Abonado</th>
            <th>Fecha de Registro</th>
          </tr> -->
          <!-- <tr>
            <td >{{formData.nombre}}</td>
            <td >{{formData.documento}}</td>
            <td >{{formData.montoAPagar}}</td>
            <td >{{formData.pagoAbonado}}</td>
            <td >{{convertirFmtFyh(formData.fechaRegistro)}}</td>
          </tr> -->
          <tr>
            <th v-for="(col, index) in getCols" :key="index"> {{ col.toUpperCase() }}</th>
          </tr>
          
          <tr v-for="(registro, index) in registros" :key="index" :style="{ backgroundColor: getColor(registro.saldo) }">
            <td v-for="(col, index) in getCols" :key="index"> {{ registro[col] }} </td>
          </tr>
        </table>
      </div >
      
    </div>
  </section>  
</template>

<script lang="js">
  export default {
    name: 'Form',
    props: [],
    data() {
      return{
        formData : this.getInicialData(),
        formState : {},
        nombreLengthMin : 5,
        nombreLengthMax : 15,
        documentoMax : 99999999,
        pagoMin : 0,
        registros : [],
      }
    },
    methods:{
      getInicialData(){
        return{
          nombre: '',
          documento: '',
          montoAPagar: '',
          pagoAbonado: '',
          fechaRegistro: this.convertirFmtFyh(this.calcularFecha()),
          saldo: '',
        }
      },
      calcularSaldo(){
        this.formData.saldo = this.formData.montoAPagar - this.formData.pagoAbonado
      },
      getColor(saldo){
        let color = ''
        if(saldo < 0) color = 'blue'
        if(saldo === 0) color = 'green'
        if(saldo > 0) color = 'red'
        return color
      },
      enviar(){
        console.log({...this.formData})
        this.calcularSaldo()
        const payload = {
          nombre : this.formData.nombre,
          documento : this.formData.documento,
          'monto a pagar': this.formData.montoAPagar,
          'pago abonado': this.formData.pagoAbonado,
          saldo: this.formData.saldo,
          'fecha de registro': this.formData.fechaRegistro,
        }
        this.registros.push(payload)
        this.formData = this.getInicialData()
        this.formState._reset()
      },
      calcularFecha(){
        return new Date()
      },
      convertirFmtFyh(fyh) {
        return new Date(fyh).toLocaleString()
      },
    },
    computed: {
      getCols() {
        return Object.keys(this.registros[0])
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="css">
  
  .jumbotron{
    background-color: rgb(78, 86, 138);
    color: white;
  }

  hr{
    background-color: #eee;
  }

</style>
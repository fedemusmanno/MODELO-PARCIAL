import Vue from 'vue'
import VueForm from 'vue-form'

var options = {
    validators: {
      'sin-espacios-medios' : function(value) {
        return !value.includes(' ')
      }
    }
}

Vue.use(VueForm, options)
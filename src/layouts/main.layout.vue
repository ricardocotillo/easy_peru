<template>
  <main>
    <h1 class="is-size-1 has-text-centered">Easy Perú</h1>
    <h3 class="is-size-3 has-text-centered">
      PBI de los Departamentos, según actividades económicas
    </h3>
    <div style="height: 10px"></div>
    <div class="container">
      <div class="field is-grouped">
        <div class="field control">
          <label class="label is-small has-text-centered">Departamentos</label>
          <div class="control">
            <div class="select is-small is-rounded">
              <select @change="seleccionarDep">
                <option value="0" selected>Todos los departamentos</option>
                <option
                  v-for="item in departamentos"
                  :key="item.id"
                  :value="item.id"
                >
                  {{ capitalizeText(item.name) }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="field control">
          <label class="label is-small has-text-centered">
            Actividades económicas
          </label>
          <div class="control">
            <div class="select is-small is-rounded">
              <select @change="seleccionarActividad">
                <option value="0">Agregado Bruto</option>
                <option v-for="a in actividades" :key="a.id" :value="a.id">
                  {{ a.name }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="field control">
          <label class="label is-small has-text-centered">
            Tipos de valores
          </label>
          <div class="control">
            <div class="select is-small is-rounded" @change="seleccionarValor">
              <select>
                <option v-for="(v, i) in valores" :key="v.key" :value="i">
                  {{ v.title }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="field control">
          <label class="label is-small has-text-centered">
            Tipos de valores
          </label>
          <div class="control">
            <div class="select is-small is-rounded">
              <select @change="seleccionarEstructura">
                <option v-for="(v, i) in estructuras" :key="v.key" :value="i">
                  {{ v.title }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="field control">
          <label class="label is-small has-text-centered">Año</label>
          <div class="control">
            <div class="select is-small is-rounded">
              <select @change="seleccionarAño;">
                <option v-for="(a, i) in años" :key="a" :value="i">
                  {{ a }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
    <slot></slot>
  </main>
  <div style="height: 40px"></div>
  <footer>
    <div class="container">
      <p class="has-text-centered">
        Este es un proyecto personal que pretende mostrar los datos estadísticos
        del Perú de forma dináamica y fácil de vizualizar. Todos los datos han
        sido extraidos del INEI
      </p>
    </div>
  </footer>
  <div style="height: 40px"></div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { useStore } from 'vuex'
import { capitalizeText } from '../commons/helpers.common'
export default {
  setup() {
    // data
    const store = useStore()
    const valores = store.state.valores
    const estructuras = store.state.estructuras
    const años = store.state.años

    // computed
    const departamentos = computed(() => store.state.departamentos)
    const actividades = computed(() => store.state.actividades)

    // methods
    const seleccionarDep = e => store.dispatch('seleccionarDep', Number(e.target.value))
    const seleccionarValor = e => store.dispatch('seleccionarValor', Number(e.target.value))
    const seleccionarEstructura = e => store.dispatch('seleccionarEstructura', Number(e.target.value))
    const seleccionarActividad = e => store.dispatch('seleccionarActividad', Number(e.target.value))
    const seleccionarAño = e => store.dispatch('seleccionarAño', Number(e.target.value))

    return {
      capitalizeText,
      departamentos,
      seleccionarDep,
      valores,
      estructuras,
      seleccionarValor,
      seleccionarEstructura,
      seleccionarActividad,
      seleccionarAño,
      actividades,
      años,
    }
  }
}
</script>

<style>
</style>
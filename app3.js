new Vue({
    el: '#app2',
    data () {
      return {
        Datos: [],
        loading: true,
        errored: false
      }
    },
    SeñalarTabla () {
      $('#table').bootstrapTable({
          data: this.Datos
      })
    },
    methods:{
    GetforAxios(){
      axios.get('http://192.168.1.42:3300/api/departments')
        .then(response => {
          this.Datos = response.data,
          console.log("JASON: ",this.Datos )
        })
        .catch(error => {
          console.log(error)
          this.errored = true
        })
        .finally(() => this.loading = false)
      }
    },
    created () {
        this.GetforAxios()
        this.SeñalarTabla()
      }
  })
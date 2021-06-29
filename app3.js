new Vue({
  el: '#app2',
  data() {
    return {
      // Tablas etiqueta
      DatosNew: [],
      DatosNorteDiag: [],
      DatosCentroDiag: [],

      //Tablas principales
      Datos: [],
      DatosCentro: [],
      DatosNorte: [],
      DatosDomicilio: [],
      loading: true,
      errored: false,
      CamasLiresTotal: 0,
      CamasLibresCentro: 0,
      CamasLibresNorte: 0,
      CamasLibresDomicilio: 0,
      activeNames: ['0']
    }
  },
  methods: {
    handleChange(val) {
      // console.log(val);
    },
    SumarCamasLibres() {
      let CamasArray = 0;
      for (let i = 0; i < this.Datos.length; i++) {
        CamasArray = CamasArray + this.Datos[i].camaslibres;
        this.CamasLiresTotal = CamasArray;
      }
    },
    SumarCamasCentro() {
      let CamasArray = 0;
      for (let i = 0; i < this.DatosCentro.length; i++) {
        CamasArray = CamasArray + this.DatosCentro[i].camaslibres;
        this.CamasLibresCentro = CamasArray;
      }
    },
    SumarCamasNorte() {
      let CamasArray = 0;
      for (let i = 0; i < this.DatosNorte.length; i++) {
        CamasArray = CamasArray + this.DatosNorte[i].camaslibres;
        this.CamasLibresNorte = CamasArray;
      }
    },
    SumarCamasDomicilio() {
      let CamasArray = 0;
      for (let i = 0; i < this.DatosDomiocilio.length; i++) {
        CamasArray = CamasArray + this.DatosDomiocilio[i].camaslibres;
        this.CamasLibresDomicilio = CamasArray;
      }
    },
    GetforAxiosDatos() {
      axios.get('http://proveedor1.asistir.net:3300/occupied/occupied')
        .then(response => {
          this.DatosNew = response.data,
            // console.log("Datos Nuevos del get", this.DatosNew)
            this.ContructorDatosNorteDiagnosticados();
          this.ContructorDatosCentroDiagnosticados();
        })
    },
    GetforAxiosCamas() {
      axios.get('http://proveedor1.asistir.net:3300/api/events')
        .then(response => {
          this.Datos = response.data,
            // console.log("Datos del get", this.Datos)
            this.SumarCamasLibres();
          this.ContructorDatosCentro();
          this.ContructorDatosNorte();
          this.ContructorDatosDomicilio();
          this.SumarCamasCentro();
          this.SumarCamasNorte();
          this.SumarCamasDomicilio();
        })
        .catch(error => {
          console.log(error)
          this.errored = true
        })
        .finally(() => this.loading = false);

    },
    ContructorDatosNorteDiagnosticados() {
      let NewArray = this.DatosNew.filter(ClinicaCentro => {
        return ClinicaCentro.Ubic_nombre === "CLÍNICA ESPERANZA NORTE                           ";
      })
      this.DatosNorteDiag = NewArray;
      // console.log("DATOS new Norte ", this.DatosNorteDiag);
    },
    ContructorDatosCentroDiagnosticados() {
      let NewArray = this.DatosNew.filter(ClinicaCentro => {
        return ClinicaCentro.Ubic_nombre === "CLÍNICA ESPERANZA CENTRO                          ";
      })
      this.DatosCentroDiag = NewArray;
      // console.log("DATOS new Centro ", this.DatosCentroDiag);
    },



    //Contructore T principales 
    ContructorDatosCentro() {
      let NewArray = this.Datos.filter(ClinicaCentro => {
        return ClinicaCentro.ubic_nombre === "CLÍNICA ESPERANZA CENTRO                          ";
      })
      this.DatosCentro = NewArray;
      //console.log("DATOS CENTRO",this.DatosCentro);
    },
    ContructorDatosNorte() {
      let NewArray = this.Datos.filter(ClinicaNorte => {
        return ClinicaNorte.ubic_nombre === "CLÍNICA ESPERANZA NORTE                           ";
      })
      this.DatosNorte = NewArray;
      //console.log("Norte",this.DatosNorte);
    },
    ContructorDatosDomicilio() {
      let NewArray = this.Datos.filter(DatosDomiocilio => {
        return DatosDomiocilio.ubic_nombre === "INTERNACION DOMICILIARIA                          ";
      });
      this.DatosDomiocilio = NewArray;
      //console.log("DATOS ais",this.DatosDomiocilio);
    }
  },
  created() {
    this.GetforAxiosCamas();
    this.GetforAxiosDatos();
  }
})
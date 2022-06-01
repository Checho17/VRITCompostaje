import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getDatabase, ref, onChildAdded, get, child, limitToLast, query, onValue } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAmjttAsxjb_e6tTpl4vAeXpFPd4dHLmCA",
  authDomain: "cicproject-f2819.firebaseapp.com",
  databaseURL: "https://cicproject-f2819-default-rtdb.firebaseio.com/",
  projectId: "cicproject-f2819",
  storageBucket: "cicproject-f2819.appspot.com",
  messagingSenderId: "1038100639436",
  appId: "1:1038100639436:web:5fae7987ebe8cfe236dc69",
  measurementId: "G-WMBRT5DZ2W"
};

// Inicialización firebase
initializeApp(firebaseConfig)

// Conexión Realtime-Database
const databaseRef = getDatabase()

const dateEx = document.getElementById('dateE')
const hourEx = document.getElementById('hourE')
const dateOEx = document.getElementById('dateOE')
const hourOEx = document.getElementById('hourOE')

const valTemperaturaEx = document.getElementById('valorTE')
const valOxigenoEx = document.getElementById('valorOE')

let fechas = []
let horas = []
const referenceDateTime = query( ref(databaseRef, 'Termocupla/Mediciones/Fecha'), limitToLast(25) )
onValue(referenceDateTime, (data) => {
  for (let key in data.val()) {
    let dateObj = new Date(data.val()[key])
    fechas.push(dateObj.toLocaleDateString())
    horas.push(dateObj.toTimeString().split(' ')[0])
  }
  myChart.data.labels = horas
  myChart.update()
  fechas = []
  horas = []
   /*const fechasFiltradas = myDates(fechas)*/
})

let fecha;
const referenceFecha = query( ref(databaseRef, 'Termocupla/Mediciones/Fecha'), limitToLast(1))
onValue(referenceFecha, (data) => {
for (let key in data.val()) {
        let dateObj = new Date(data.val()[key])
        fecha=dateObj.toLocaleDateString()
        
}
    dateEx.innerHTML = fecha
    dateOEx.innerHTML = fecha
})

let hora;
const referenceHora = query( ref(databaseRef, 'Termocupla/Mediciones/Fecha'), limitToLast(1))
onValue(referenceHora, (data) => {
for (let key in data.val()) {
        let dateObj = new Date(data.val()[key])
        hora=dateObj.toTimeString().split(' ')[0]
       
}
    hourEx.innerHTML = hora
    hourOEx.innerHTML = hora
})

let valuesT = []
const referenceValues = query( ref(databaseRef, 'EXP421/Mediciones/ValorTemperatura'), limitToLast(25) )
onValue(referenceValues, (data) => {
  for (let key in data.val()) {
    valuesT.push(data.val()[key])
  }
  myChart.data.datasets[0].data = valuesT
  myChart.update()
  valuesT= []
  
})

let valuesO = []
const referenceValuesO = query( ref(databaseRef, 'EXP421/Mediciones/ValorOxigeno'), limitToLast(25) )
onValue(referenceValuesO, (data) => {
  for (let key in data.val()) {
    valuesO.push(data.val()[key])
  }
  myChart.data.datasets[1].data = valuesO
  myChart.update()
  valuesT= []
  
})

let valorT;
const referenceValor = query( ref(databaseRef, 'EXP421/Mediciones/ValorTemperatura'), limitToLast(1))
onValue(referenceValor, (data) => {
    
valorT=data.val()
let key = Object.keys(valorT)[0]
valTemperaturaEx.innerHTML = `${valorT[key]} °C`
})

let valorO;
const referenceValorO = query( ref(databaseRef, 'EXP421/Mediciones/ValorOxigeno'), limitToLast(1))
onValue(referenceValorO, (data) => {
    
valorO=data.val()
let key = Object.keys(valorO)[0]
valOxigenoEx.innerHTML = `${valorO[key]} %`
})


let myDates = (dates) => {
    const datesReduced = dates.reduce((acc, el) => {
        if(!acc[el]) acc[el] = el
        return acc
    }, {})
    const datesFiltered = []
    for(let date in datesReduced){
        datesFiltered.push(datesReduced[date])
    }
    return datesFiltered
}

const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Temperatura (°C)',
            data: [],
            backgroundColor: [
                '#EC940E',
            ],
            borderColor: [
                '#EC940E',
                
            ],
            borderWidth: 2
        },{
            label: 'Oxigeno',
            data: [],
            backgroundColor: [
                '#008080',
            ],
            borderColor: [
                '#008080',
                
            ],
            borderWidth: 2,
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: false
            }
        },
        responsive: true
    }
});



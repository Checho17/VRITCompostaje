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

const dateHumedad = document.getElementById('dateh')
const hourHumedad = document.getElementById('hourh')
const valHumedad = document.getElementById('hvalor')

let fechas = []
let horas = []
const referenceDateTime = query( ref(databaseRef, 'Termocupla/Mediciones/Fecha'), limitToLast(20) )
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
  
})
let fecha;
const referenceFecha = query( ref(databaseRef, 'Termocupla/Mediciones/Fecha'), limitToLast(1))
onValue(referenceFecha, (data) => {
for (let key in data.val()) {
        let dateObj = new Date(data.val()[key])
        fecha=dateObj.toLocaleDateString()
        
}
    dateHumedad.innerHTML = fecha
})

let hora;
const referenceHora = query( ref(databaseRef, 'Termocupla/Mediciones/Fecha'), limitToLast(1))
onValue(referenceHora, (data) => {
for (let key in data.val()) {
        let dateObj = new Date(data.val()[key])
        hora=dateObj.toTimeString().split(' ')[0]
       
}
    hourHumedad.innerHTML = hora
})

let values = []
const referenceValues = query( ref(databaseRef, 'Sensor Humedad/Mediciones/Valor'), limitToLast(20) )
onValue(referenceValues, (data) => {
  for (let key in data.val()) {
    values.push(data.val()[key])
  }
  myChart.data.datasets[0].data = values
  myChart.update()
  values= []
  
})

let valor;
const referenceValor = query( ref(databaseRef, 'Sensor Humedad/Mediciones/Valor'), limitToLast(1))
onValue(referenceValor, (data) => {
    
valor=data.val()
let key = Object.keys(valor)[0]
valHumedad.innerHTML = `${valor[key]} %`
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
            label: 'Humedad Relativa',
            data: [],
            backgroundColor: [
                '#800080',
            ],
            borderColor: [
                '#800080' ,
                
            ],
            borderWidth: 2
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




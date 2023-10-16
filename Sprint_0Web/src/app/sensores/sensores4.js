/*
    En este archivo me encargo de mostrar la información de la base de datos en mi web
*/

//inicializo listas para almacenar los datos de mi usuario y mis mediciones
let datosUsuario = []
let datosMediciones = [];

//inicializo valores globales para poderlos usar varias funciones
let valorPpm = 0;
let valorTemp = 0;
let valorBat = 0;
let longitud = 0;
let start = 0;
let valorCreciente = 0;

//añado las clases que me permiten sacar datos de la BBDD
const MedicionesMetodos = new medicionesMetodos();

//almaceno en variables varios elementos de mi html para modificar sus valores más adelante
var mostrarValor = document.getElementById("texto-informativo");
let progressCircular = document.querySelector(".progress-circular");
var imagen = document.getElementById("foto-cambiar");
var ozono = document.getElementById("contenedor-ozono");
var temp = document.getElementById("contenedor-temp");
var bateria = document.getElementById("contenedor-bateria");

(async () => {
    //obtengo los datos de mis ultimas mediciones
    datosMediciones = await MedicionesMetodos.recuperarMediciones(1);
    longitud = datosMediciones.length-1;

    //muestro los datos de mis últimas mediciones
    document.getElementById('temperatura-sensor').innerText = datosMediciones[longitud].temperatura + "ºC";
    document.getElementById('ppm-sensor').innerText = datosMediciones[longitud].ppm + " ppm";
    document.getElementById('bateria-sensor').innerText = datosMediciones[longitud].bateria + "%";
    mostrarValor.innerText = datosMediciones[longitud].ppm + " ppm";
    ozono.style.backgroundColor = "var(--azul-claro)"

    //almaceno el valor de mis datos, los cuales usaré en otras funciones
    valorPpm= datosMediciones[longitud].ppm;
    valorTemp= datosMediciones[longitud].temperatura;
    valorBat= datosMediciones[longitud].bateria;

    //llamo a la funcion que me muestra mi progressbar, pasandole el valor de mi ppm.
    valorCreciente = valorPpm;
    aumenta();

    //prueba para asegurarme de que puedo sacar datos 
    console.log(datosMediciones);
})();

//funcion que me permite que funcione mi progressbar
function aumenta(){
    // Usamos un intervalo para realizar el aumento de manera gradual
    let progress=setInterval(()=>{
        if(start<valorCreciente){
            //para que se vea como aumenta poco a poco 
            start++;
            ProgressEND();
        }else if(start>valorCreciente){
            //para que se vea como decrece
            start--;
            ProgressEND();
        }
        function ProgressEND(){
            //hago que mi texto aumente poco a poco
            mostrarValor.textContent =`${start}%`
            //hago que mi circulo aumente poco a poco
            progressCircular.style.background = `conic-gradient(var(--azul-oscuro) ${start*3.6}deg, var(--azul-claro) 0deg)`; 
            //para que cuando llegue al valor no siga aumentando
            if(start==valorCreciente){
                clearInterval(progress);
                valorCreciente = "";
            }
        }
    },15)//quiero que lo haga en 15 segundos
}

//para que cuando clicke mi boton de ozono, muestre mis valores del ozono
function pulsadoOzono(){
    imagen.src= "../../images/icono_ozono.svg";
    imagen.style.transform = "rotate(180deg)";

    ozono.style.backgroundColor = "var(--azul-claro)"
    temp.style.backgroundColor = "var(--blanco-recuadros)"
    bateria.style.backgroundColor = "var(--blanco-recuadros)"

    //le paso el valor de mi ppm a la progressbar 
    valorCreciente = valorPpm;
    aumenta();
}

//para que cuando clicke mi boton de temperatura, muestre mis valores de temperatura
function pulsadoTemperatura(){
    imagen.src= "../../images/icono_temp.svg";
    imagen.style.transform = "rotate(180deg)";

    ozono.style.backgroundColor = "var(--blanco-recuadros)"
    temp.style.backgroundColor = "var(--azul-claro)"
    bateria.style.backgroundColor = "var(--blanco-recuadros)"

    //le paso el valor de mi temp a la progressbar 
    valorCreciente = valorTemp;
    aumenta();

}

//para que cuando clicke mi boton de bateria, muestre mis valores del bateria
function pulsadoBateria(){
    imagen.src= "../../images/icono_bateria.svg";
    imagen.style.transform = "rotate(180deg)";

    ozono.style.backgroundColor = "var(--blanco-recuadros)"
    temp.style.backgroundColor = "var(--blanco-recuadros)"
    bateria.style.backgroundColor = "var(--azul-claro)"

    //le paso el valor de mi temp a la progressbar 
    valorCreciente = valorBat;
    aumenta();
}

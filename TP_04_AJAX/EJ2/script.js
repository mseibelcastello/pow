
//-------LIMITES-----------
function guardar_configuracion() {

    var limites = obtener_inputs_limites();
    var min = limites.minimo;
    var max = limites.maximo;

    if (min >= max) {
        alert("El limite minimo debe ser menor que el limite maximo");
        return;
    }

    guardar_limites(min, max);

}

function obtener_inputs_limites() {
    var min = Number(document.getElementById("minimo").value);
    var max = Number(document.getElementById("maximo").value);

    return {
        minimo: min,
        maximo: max
    };
}

function leer_limites() {
    var xmlhttp = new XMLHttpRequest();
    var url = "datos.json?" + new Date().getTime();

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var myArr = JSON.parse(this.responseText);
            var texto = "";
            if (myArr["minimo"] != null && myArr["maximo"] != null) {
                texto += "<p>Limite inferior " + myArr["minimo"] + "</p>";
                texto += "<p>Limite superior " + myArr["maximo"] + "</p>";
            }
            document.getElementById("datos").innerHTML = texto
        }
    }

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function guardar_limites(min, max, numeros) {
    var datos = {
        minimo: min,
        maximo: max
    };

    if (numeros != undefined) {
        datos["numeros"] = numeros;
    }

    var xmlhttp2 = new XMLHttpRequest();
    xmlhttp2.open("POST", "guardar_datos.php", true);
    xmlhttp2.send(JSON.stringify(datos));
}

function reset_configuracion() {
    guardar_limites(0, 0, []);
}

///-----------NUMEROS---------
function generar_numero() {

    var limites = obtener_inputs_limites();
    var min = limites.minimo;
    var max = limites.maximo;

    var rnd = Math.floor(Math.random() * (max - min + 1) + min);

    leer_numeros(rnd);
}

function leer_numeros(nro) {
    var xmlhttp = new XMLHttpRequest();
    var url = "datos.json?" + new Date().getTime();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var myArr = JSON.parse(this.responseText);
            var numeros = myArr["numeros"];
            var min = myArr["minimo"];
            var max = myArr["maximo"];

            // se guardo la configuracion?
            if (min == null || max == null) {
                alert("primero guarda la configuracion");
                return;
            }

            // se generaron todos? 
            var disponibles = 0;
            for (var i = min; i <= max; i++) {
                if (!esta_generado(numeros, i)) {
                    disponibles++;
                }
            }

            if (disponibles == 0) {
                alert("todos los números están generados");
                return;
            }

            // ya se genero el numero? 
            if (esta_generado(numeros, nro)) {
                generar_numero();
                return;
            }

            document.getElementById("num_random").innerHTML = nro;
            guardar_numeros(nro, numeros);
        }
    }

    xmlhttp.open("GET", url, true);
    xmlhttp.send();

}

function guardar_numeros(nro, numeros) {
    numeros.push({ numero: nro });

    var datos = {
        numeros: numeros
    };

    var xmlhttp2 = new XMLHttpRequest();
    xmlhttp2.open("POST", "guardar_datos.php", true);
    xmlhttp2.send(JSON.stringify(datos));
}

function esta_generado(numeros, nro) {
    for (var i = 0; i < numeros.length; i++) {
        if (numeros[i].numero == nro) {
            return true;
        }
    }

    return false;
}



function mostrar_numeros() {
    var xmlhttp = new XMLHttpRequest();
    var url = "datos.json?" + new Date().getTime();

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var myArr = JSON.parse(this.responseText);
            var numeros = myArr["numeros"];
            var texto = "";

            for (var i = 0; i < numeros.length; i++) {
                texto += "<p>" + numeros[i].numero + "</p>";
            }

            if (numeros.length == 0) {
                texto = "<p>Todavia no se genero ningun numero</p>";
            }

            document.getElementById("numeros").innerHTML = texto;
        }
    }

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
cargar_categorias();
cargar_areas();
cargar_ingredientes();

function mostrar_resultados(url) {
    mostrar_cargando("Buscando recetas...");

    var xmlhttp = new XMLHttpRequest();


    xmlhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            var myArr = JSON.parse(this.responseText);
            var meals = filtrar_recetas(myArr.meals, url);

            var texto = "";

            for (i = 0; i < meals.length; i++) {

                texto += "<div class='col s12 m6 l4'>";
                texto += "<div class='card result-card'>";
                texto += "<div class='card-image'>";
                texto += "<img src='" + meals[i].strMealThumb + "' alt='" + meals[i].strMeal + "'>";
                texto += "</div>";
                texto += "<div class='card-content'>";
                texto += "<span class='card-title'>" + meals[i].strMeal + "</span>";
                texto += "<div class='etiquetas'>";
                if (meals[i].strCategory) {
                    texto += "<span class='etiqueta categoria'><i class='material-icons'>restaurant</i>" + meals[i].strCategory + "</span>";
                }
                if (meals[i].strArea) {
                    texto += "<span class='etiqueta area'><i class='material-icons'>public</i>" + meals[i].strArea + "</span>";
                }
                texto += "</div>";
                texto += "</div>";
                texto += "<div class='card-action'>";
                texto += "<button class='btn btn-small waves-effect waves-light' onclick='mostrar_instrucciones(" + meals[i].idMeal + ")'>Ver instrucciones</button>";
                texto += "<button class='btn btn-small btn-naranja waves-effect waves-light' onclick='mostrar_ingredientes(" + meals[i].idMeal + ")'>Ver ingredientes</button>";
                texto += "</div>";
                texto += "</div>";
                texto += "</div>";

            }
            document.getElementById("resultados_buscar").innerHTML = texto;

            if (meals.length == 0) {
                mostrar_sin_resultados();
            } else {
                limpiar_estado();
            }

        }

    }

    xmlhttp.open("GET", url, true);
    xmlhttp.send();

}


function buscar_nombre() {
    mostrar_resultados(construir_url());
}

function buscar() {
    mostrar_resultados(construir_url());
}

function construir_url() {

    var nombre = document.getElementById("buscador").value.trim();
    var categoria = document.getElementById("categorias").value;
    var area = document.getElementById("areas").value;
    var ingrediente = document.getElementById("ingredientes").value;

    // con nombre usamos search.php y los demas filtros se aplican en el navegador,
    // porque filter.php no busca por nombre
    if (nombre != "") {
        return "https://www.themealdb.com/api/json/v1/1/search.php?s=" + nombre;
    }

    if (categoria == "" && area == "" && ingrediente == "") {
        return "https://www.themealdb.com/api/json/v1/1/search.php?s=";
    }

    // sin nombre los tres filtros van juntos a filter.php
    var url = "https://www.themealdb.com/api/json/v1/1/filter.php?";

    if (categoria != "") {
        url += "c=" + categoria;
        if (area != "" || ingrediente != "") {
            url += "&";
        }
    }
    if (area != "") {
        url += "a=" + area;
        if (ingrediente != "") {
            url += "&";
        }
    }
    if (ingrediente != "") {
        url += "i=" + ingrediente;
    }

    return url;
}

function filtrar_recetas(meals, url) {

    if (meals == null) {
        return [];
    }

    // filter.php ya viene filtrado
    if (url.indexOf("search.php") == -1) {
        return meals;
    }

    var categoria = document.getElementById("categorias").value;
    var area = document.getElementById("areas").value;
    var ingrediente = document.getElementById("ingredientes").value;

    if (categoria == "" && area == "" && ingrediente == "") {
        return meals;
    }

    var filtradas = [];

    for (var i = 0; i < meals.length; i++) {

        if (categoria != "" && meals[i].strCategory != categoria) {
            continue;
        }
        if (area != "" && meals[i].strArea != area) {
            continue;
        }
        if (ingrediente != "" && !tiene_ingrediente(meals[i], ingrediente)) {
            continue;
        }

        filtradas.push(meals[i]);
    }

    return filtradas;
}

function tiene_ingrediente(receta, ingrediente) {
    for (var i = 1; i <= 20; i++) {
        var actual = receta["strIngredient" + i];
        if (actual != null && actual.toLowerCase() == ingrediente.toLowerCase()) {
            return true;
        }
    }
    return false;
}



function cargar_categorias() {

    var xmlhttp = new XMLHttpRequest();
    var url = "https://www.themealdb.com/api/json/v1/1/list.php?c=list";

    xmlhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {

            var myArr = JSON.parse(this.responseText);
            var texto = "<option value='' disabled selected>Seleccionar categoría</option>";

            for (i = 0; i < myArr.meals.length; i++) {
                texto += "<option value='" + myArr.meals[i].strCategory + "'>";
                texto += myArr.meals[i].strCategory;
                texto += "</option>";
            }
            document.getElementById("categorias").innerHTML = texto;
            refrescar_select("categorias");
        }
    }

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function cargar_areas() {

    var xmlhttp = new XMLHttpRequest();

    var url = "https://www.themealdb.com/api/json/v1/1/list.php?a=list";

    xmlhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            var myArr = JSON.parse(this.responseText);
            var texto = "<option value='' disabled selected>Seleccionar área</option>";
            for (i = 0; i < myArr.meals.length; i++) {
                texto += "<option value='" + myArr.meals[i].strArea + "'>";
                texto += myArr.meals[i].strArea;
                texto += "</option>";
            }
            document.getElementById("areas").innerHTML = texto;
            refrescar_select("areas");
        }
    }

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}



function cargar_ingredientes() {

    var xmlhttp = new XMLHttpRequest();
    var url = "https://www.themealdb.com/api/json/v1/1/list.php?i=list";

    xmlhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            var myArr = JSON.parse(this.responseText);
            var texto = "<option value='' disabled selected>Seleccionar ingrediente</option>";
            for (i = 0; i < myArr.meals.length; i++) {
                texto += "<option value='" + myArr.meals[i].strIngredient + "'>";
                texto += myArr.meals[i].strIngredient;
                texto += "</option>";
            }

            document.getElementById("ingredientes").innerHTML = texto;
            refrescar_select("ingredientes");
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}


function mostrar_instrucciones(id) {

    var xmlhttp = new XMLHttpRequest();

    var url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id;

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var myArr = JSON.parse(this.responseText);
            var receta = myArr.meals[0];
            var texto = "";

            texto += "<h2>" + receta.strMeal + "</h2>";
            texto += "<img src='" + receta.strMealThumb + "' alt='" + receta.strMeal + "'>";
            texto += "<p><b>Categoría:</b> " + receta.strCategory + "</p>";
            texto += "<p><b>Área:</b> " + receta.strArea + "</p>";
            texto += "<p><b>Instrucciones:</b></p>";
            texto += "<p class='instrucciones'>" + receta.strInstructions + "</p>";

            document.getElementById("detalle").innerHTML = texto;
            limpiar_estado();
        }
    }

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function mostrar_ingredientes(id) {

    var xmlhttp = new XMLHttpRequest();

    var url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id;

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            var myArr = JSON.parse(this.responseText);
            var receta = myArr.meals[0];

            var texto = "<table class='tabla-ingredientes'>";
            texto += "<tr><th>Nombre</th><th>Cantidad</th></tr>";

            for (i = 1; i <= 20; i++) {

                var ingrediente = receta["strIngredient" + i];
                var cantidad = receta["strMeasure" + i];

                if (ingrediente != "") {
                    texto += "<tr>";
                    texto += "<td>" + ingrediente + "</td>";
                    texto += "<td>" + cantidad + "</td>";
                    texto += "</tr>";
                }
            }

            texto += "</table>";

            document.getElementById("detalle").innerHTML = texto;
            limpiar_estado();
        }
    }

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}


function mostrar_cargando(texto) {
    document.getElementById("estado").innerHTML =
        "<div class='estado cargando'><i class='material-icons girando'>autorenew</i>" + texto + "</div>";
}

function limpiar_estado() {
    document.getElementById("estado").innerHTML = "";
}

function mostrar_sin_resultados() {

    var filtros = [];
    var nombre = document.getElementById("buscador").value.trim();

    if (nombre != "") {
        filtros.push('"' + nombre + '"');
    }
    if (document.getElementById("categorias").value != "") {
        filtros.push(document.getElementById("categorias").value);
    }
    if (document.getElementById("areas").value != "") {
        filtros.push(document.getElementById("areas").value);
    }
    if (document.getElementById("ingredientes").value != "") {
        filtros.push(document.getElementById("ingredientes").value);
    }

    var texto = "No hay recetas que combinen " + filtros.join(" + ");

    if (nombre != "") {
        texto += ". La búsqueda por nombre solo trae recetas cuyo nombre la contiene, probá sacando algún filtro";
    }

    document.getElementById("estado").innerHTML =
        "<div class='estado vacio'><i class='material-icons left'>search_off</i>" + texto + "</div>";
}

function refrescar_select(id) {
    var select = document.getElementById(id);
    var instancia = M.FormSelect.getInstance(select);
    if (instancia) {
        instancia.destroy();
    }
    M.FormSelect.init(select);
}
cargar_categorias();
cargar_areas();
cargar_ingredientes();

function mostrar_resultados(url) {
    var xmlhttp = new XMLHttpRequest();


    xmlhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            var myArr = JSON.parse(this.responseText);

            var texto = "";

            for (i = 0; i < myArr.meals.length; i++) {

                texto += "<div>";
                texto += "<h3>" + myArr.meals[i].strMeal + "</h3>";
                texto += "<img src='" + myArr.meals[i].strMealThumb + "'>";
                texto += "<button onclick='mostrar_instrucciones(" + myArr.meals[i].idMeal + ")'>Ver instrucciones</button>";
                texto += "<button onclick='mostrar_ingredientes(" + myArr.meals[i].idMeal + ")'>Ver ingredientes</button>";
                texto += "</div>";

            }
            document.getElementById("resultados_buscar").innerHTML = texto;

        }

    }

    xmlhttp.open("GET", url, true);
    xmlhttp.send();

}


function buscar_nombre() {

    var nombre = document.getElementById("buscador").value;

    var url = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + nombre;

    mostrar_resultados(url);
}

function buscar_categoria(categoria) {
    var url = "https://www.themealdb.com/api/json/v1/1/filter.php?c=" + categoria;

    mostrar_resultados(url);
}


function cargar_categorias() {

    var xmlhttp = new XMLHttpRequest();
    var url = "https://www.themealdb.com/api/json/v1/1/list.php?c=list";

    xmlhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {

            var myArr = JSON.parse(this.responseText);
            var texto = "<option value=''>Seleccionar categoría</option>";

            for (i = 0; i < myArr.meals.length; i++) {
                texto += "<option value='" + myArr.meals[i].strCategory + "'>";
                texto += myArr.meals[i].strCategory;
                texto += "</option>";
            }
            document.getElementById("categorias").innerHTML = texto;
        }
    }

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function buscar_area(area) {
    var url = "https://www.themealdb.com/api/json/v1/1/filter.php?a=" + area;
    mostrar_resultados(url);
}

function cargar_areas() {

    var xmlhttp = new XMLHttpRequest();

    var url = "https://www.themealdb.com/api/json/v1/1/list.php?a=list";

    xmlhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            var myArr = JSON.parse(this.responseText);
            var texto = "<option value=''>Seleccionar área</option>";
            for (i = 0; i < myArr.meals.length; i++) {
                texto += "<option value='" + myArr.meals[i].strArea + "'>";
                texto += myArr.meals[i].strArea;
                texto += "</option>";
            }
            document.getElementById("areas").innerHTML = texto;
        }
    }

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}


function buscar_ingrediente(ingrediente) {
    var url = "https://www.themealdb.com/api/json/v1/1/filter.php?i=" + ingrediente;
    mostrar_resultados(url);
}
function cargar_ingredientes() {

    var xmlhttp = new XMLHttpRequest();
    var url = "https://www.themealdb.com/api/json/v1/1/list.php?i=list";

    xmlhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            var myArr = JSON.parse(this.responseText);
            var texto = "<option value=''>Seleccionar ingrediente</option>";
            for (i = 0; i < myArr.meals.length; i++) {
                texto += "<option value='" + myArr.meals[i].strIngredient + "'>";
                texto += myArr.meals[i].strIngredient;
                texto += "</option>";
            }

            document.getElementById("ingredientes").innerHTML = texto;
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
            texto += "<img src='" + receta.strMealThumb + "'>";
            texto += "<p><b>Categoría:</b> " + receta.strCategory + "</p>";
            texto += "<p><b>Área:</b> " + receta.strArea + "</p>";
            texto += "<p><b>Instrucciones:</b></p>";
            texto += "<p>" + receta.strInstructions + "</p>";

            document.getElementById("detalle").innerHTML = texto;
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

            var texto = "<table border=1>";
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
        }
    }

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
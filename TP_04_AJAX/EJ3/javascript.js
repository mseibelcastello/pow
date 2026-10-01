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
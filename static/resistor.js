/*object of select buttuom*/

/* to ensure that the page was loaded*/
$(document).ready(function() {
    $("#first_form input[type=radio]").click(function() {
        let number_of_band = this.value;

        /*set the background*/
        var selected_input = document.querySelectorAll(".color_code");
        for (selected of selected_input) {
            selected.value = "";
            selected.style.backgroundColor = "white";
            selected.style.color = "black"
        }
        document.getElementById("resistorvalue").innerHTML = " ";

        if (parseInt(number_of_band) == 4) {
            document.getElementById("band3").style.display = "none";
            document.getElementById("band6").style.display = "none";
        } else if (parseInt(number_of_band) == 5) {
            document.getElementById("band3").style.display = "flex";
            document.getElementById("band6").style.display = "none";
        } else {
            document.getElementById("band3").style.display = "flex";
            document.getElementById("band6").style.display = "flex";
        }

    });
});
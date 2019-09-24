/*this page manage the colors of our */

let colors = {
    black: { name: "black", color: "#000000", value: 0, multiplier: 0 },
    blue: { name: "blue", color: "#0000FF", value: 6, tolerance: 0.25, tempco: 10, multiplier: 6 },
    brown: { name: "brown", color: "#964B00", value: 1, tolerance: 1, tempco: 100, multiplier: 1 },
    gold: { name: "gold", color: "#F0D52D", value: 5, tolerance: 5, multiplier: -1 },
    /* this is a percentage*/
    gray: { name: "gray", color: "#808080", value: 8, tolerance: 0.05, multiplier: 8 },
    green: { name: "green", color: "#00FF00", value: 5, tolerance: 0.5, multiplier: 5 },
    orange: { name: "orange", color: "#FF681F", value: 3, tolerance: 3, tempco: 10, multiplier: 3 },
    red: { name: "red", color: "#FF0000", value: 2, tolerance: 2, tempco: 50, multiplier: 2 },
    silver: { name: "silver", color: "#BFC1C2", value: 10, tolerance: 10, multiplier: -2 },
    /* this is a percentage*/
    violet: { name: "violet", color: "#240A40", value: 7, tolerance: 0.10, tempco: 5, multiplier: 7 },
    white: { name: "white", color: "#FFFFFF", value: 9, multiplier: 9 },
    yellow: { name: "yellow", color: "#FFFF00", value: 4, tolerance: 4, tempco: 25, multiplier: 4 },
};

let units = {
    tera: { symbol: "T&Omega;", number: -12 },
    giga: { symbol: "G&Omega;", number: -9 },
    mega: { symbol: "M&Omega;", number: -6 },
    kilo: { symbol: "k&Omega;", number: -3 },
    mili: { symbol: "m&Omega;", number: -3 },
    micro: { symbol: "&micro;&Omega;", number: -6 },
    nano: { symbol: "n&Omega;", number: -9 },
    pico: { symbol: "P&Omega;", number: -12 }
};


/*define some function */

function units_converter(result, units) {
    var real_result = result;

    /* check if the result is equal to one*/
    if (real_result == 0) {
        return real_result + " " + "&Omega;";
    }
    /*check if the reuslt is grater or less than 1*/
    else if (real_result > 1) {
        /*check if the result is an integer*/
        if (Number.isInteger(real_result)) {
            /*result for an integer value*/
            result_length = real_result.toString().length;
            if (result_length < 4) {
                /*format the result*/
                var real_result_final = real_result.toFixed(3) + " " + "&Omega;";

                /*return the result*/
                return real_result_final;
            }
            /*handle 4 to 6 digits */
            else if (result_length >= 4 && result_length < 7) {
                /*multiply the real_result by 10 to the power -3*/
                var real_result_converted = real_result * Math.pow(10, units["kilo"]["number"]);

                /*convert the result to a string using toFixed method*/
                var real_result_rounded = real_result_converted.toFixed(2);

                /*format the result*/
                var real_result_final = real_result_rounded + " " + units["kilo"]["symbol"];

                /*return the result*/
                return real_result_final;
            }
            /*handle 7 to 9 digits*/
            else if (result_length >= 7 && result_length < 10) {
                /*multiply the real_result by 10 to the power -6*/
                var real_result_converted = real_result * Math.pow(10, units["mega"]["number"]);

                /*convert the result to a string using toFixed method*/
                var real_result_rounded = real_result_converted.toFixed(2);

                /*format the result*/
                var real_result_final = real_result_rounded + " " + units["mega"]["symbol"];

                /*return the result*/
                return real_result_final;
            }
            /*handle  to 10 12 digits*/
            else if (result_length >= 10 && result_length < 13) {
                /*multiply the real_result by 10 to the power -9*/
                var real_result_converted = real_result * Math.pow(10, units["giga"]["number"]);

                /*convert the result to a string using toFixed method*/
                var real_result_rounded = real_result_converted.toFixed(3);

                /*format the result*/
                var real_result_final = real_result_rounded + " " + units["giga"]["symbol"];

                /*return the result*/
                return real_result_final;
            }
            /*handle more than 13 digits*/
            else {
                /*multiply the real_result by 10 to the power -12*/
                var real_result_converted = real_result * Math.pow(10, units["tera"]["number"]);

                /*convert the result to a string using toFixed method*/
                var real_result_rounded = real_result_converted.toFixed(3);

                /*format the result*/
                var real_result_final = real_result_rounded + " " + units["tera"]["symbol"];

                /*return the result*/
                return real_result_final;
            }

        }
        /*if the result is a float*/
        else {
            /* split the result at . */
            var real_result_splited = real_result.toString().split(".");

            /*get the lenght of the first part*/
            var real_result_splited_length = real_result_splited[0].length;

            /*handle less than 4 digits */
            if (real_result_splited_length < 4) {
                /*format the result*/
                var real_result_final = real_result.toFixed(3) + " " + "&Omega;";

                /* return the final result*/
                return real_result_final;
            }
            /*handle 4 to 6 digits */
            else if (real_result_splited_length >= 4 && real_result_splited_length < 7) {
                /*multiply the  first part by 10 to the power -3*/
                var real_result_converted = (parseInt(real_result_splited[0])) * Math.pow(10, units["kilo"]["number"])

                /*concatenate the two part */
                var real_result_concatenate = parseInt(real_result_converted + real_result_splited[1]);

                /*round the final result*/
                var real_result_rounded = real_result_concatenate.toFixed(3);

                /*format the result*/
                var real_result_final = real_result_rounded + " " + units["kilo"]["symbol"];

                /*return the result*/
                return real_result_final;
            }
            /*handle 7 to 9 digits*/
            else if (real_result_splited_length >= 7 && real_result_splited_length < 10) {
                /*multiply the  first part by 10 to the power -6*/
                var real_result_converted = (parseInt(real_result_splited[0])) * Math.pow(10, units["mega"]["number"])

                /*concatenate the two part */
                var real_result_concatenate = parseInt(real_result_converted + real_result_splited[1]);

                /*round the final result*/
                var real_result_rounded = real_result_concatenate.toFixed(3);

                /*format the result*/
                var real_result_final = real_result_rounded + " " + units["mega"]["symbol"];

                /*return the result*/
                return real_result_final;
            }
            /*handle 10 to 12 digits*/
            else if (real_result_splited_length >= 10 && real_result_splited_length > 13) {
                /*multiply the  first part by 10 to the power -9*/
                var real_result_converted = (parseInt(real_result_splited[0])) * Math.pow(10, units["giga"]["number"])

                /*concatenate the two part */
                var real_result_concatenate = parseInt(real_result_converted + real_result_splited[1]);

                /*round the final result*/
                var real_result_rounded = real_result_concatenate.toFixed(3);

                /*format the result*/
                var real_result_final = real_result_rounded + " " + units["giga"]["symbol"];

                /*return the result*/
                return real_result_final;
            }
            /*handle more than 13 digits*/
            else {
                /*multiply the  first part by 10 to the power -3*/
                var real_result_converted = (parseInt(real_result_splited[0])) * Math.pow(10, units["tera"]["number"])

                /*concatenate the two part */
                var real_result_concatenate = parseInt(real_result_converted + real_result_splited[1]);

                /*round the final result*/
                var real_result_rounded = real_result_concatenate.toFixed(3);

                /*format the result*/
                var real_result_final = real_result_rounded + " " + units["tera"]["symbol"];

                /*return the result*/
                return real_result_final;
            }
        }
    }
    /*if the result is less than one*/
    else {
        /* split the result at . */
        var real_result_splited = real_result.toString().split(".");

        /*get the lenght of the first part*/
        var real_result_splited_length = real_result_splited[1].length;

        /*handle less than 4 digits*/
        if (real_result_splited_length < 4) {
            /*format the result*/
            var real_result_final = real_result.toFixed(3) + " " + "&Omega;";

            /*return the result*/
            return real_result_final;
        }
        /*handle 4 to 6 digits */
        else if (real_result_splited_length >= 4 && real_result_splited_length < 7) {
            /*multiply the second part by 10 to the power 3*/
            var real_result_converted = (parseInt(real_result_splited[1])) * Math.pow(10, units["mili"]["number"]);

            /*round the result*/
            var real_result_rounded = real_result_converted.toFixed(3);

            /*format the result*/
            var real_result_final = real_result_rounded + " " + units["mili"]["symbol"];

            /*return the result*/
            return real_result_final;
        }
        /*handle 7 to 9 digits*/
        else if (real_result_splited_length >= 7 && real_result_splited_length < 10) {
            /*multiply the second part by 10 to the power 3*/
            var real_result_converted = (parseInt(real_result_splited[1])) * Math.pow(10, units["micro"]["number"]);

            /*round the result*/
            var real_result_rounded = real_result_converted.toFixed(3);

            /*format the result*/
            var real_result_final = real_result_rounded + " " + units["micro"]["symbol"];

            /*return the result*/
            return real_result_final;
        }
        /*handle 10 to 12 digits*/
        else if (real_result_splited_length >= 10 && real_result_splited_length < 13) {
            /*multiply the second part by 10 to the power 3*/
            var real_result_converted = (parseInt(real_result_splited[1])) * Math.pow(10, units["nano"]["number"]);

            /*round the result*/
            var real_result_rounded = real_result_converted.toFixed(3);

            /*format the result*/
            var real_result_final = real_result_rounded + " " + units["nano"]["symbol"];

            /*return the result*/
            return real_result_final;
        } else {
            /*multiply the second part by 10 to the power 3*/
            var real_result_converted = (parseInt(real_result_splited[1])) * Math.pow(10, units["pico"]["number"]);

            /*round the result*/
            var real_result_rounded = real_result_converted.toFixed(3);

            /*format the result*/
            var real_result_final = real_result_rounded + " " + units["pico"]["symbol"];

            /*return the result*/
            return real_result_final;
        }
    }
}


/*Rertrieve value of input fields in the form*/
function get_value(band, colors, parameter = "value") {
    var value_of_the_band = document.getElementById(band).value;
    if (value_of_the_band == "") {
        return null;
    } else {
        return colors[value_of_the_band][parameter];
    }
}

/*four_bands resistor calculator */
function fourbands_calculator(list_of_bands, colors) {
    /*check if all input were provided by the user*/
    var fields = list_of_bands;
    for (value of fields) {
        var input_value = get_value(value, colors, "value");
        if (typeof(input_value) != "number") {
            return null;
        }
    }

    /* set all variable for the calculation*/
    var firstband = get_value("firstband", colors, "value");
    var secondband = get_value("secondband", colors, "value");
    var multiplier = get_value("multiplier", colors, "multiplier");
    var tolerance = get_value("tolerance", colors, "tolerance");

    /*perform calculations*/
    var sum = firstband.toString() + secondband.toString();
    var result = (parseInt(sum)) * Math.pow(10, multiplier);

    /*format the result*/
    var result_formated = units_converter(result, units);
    /*show the result */
    document.getElementById("resistorvalue").innerHTML = result_formated + " " + tolerance + "%";

}

/*five_bands resistor calculator*/
function fivebands_calculator(list_of_bands, colores) {
    /*check if all input were provided by the user*/
    var fields = list_of_bands;
    for (value of fields) {
        var input_value = get_value(value, colors, "value");
        if (typeof(input_value) != "number") {
            return null;
        }
    }

    /* set all variable for the calculation*/
    var firstband = get_value("firstband", colors, "value");
    var secondband = get_value("secondband", colors, "value");
    var thirdband = get_value("thirdband", colors, "value");
    var multiplier = get_value("multiplier", colors, "multiplier");
    var tolerance = get_value("tolerance", colors, "tolerance");

    /*perform calculations*/
    var sum = firstband.toString() + secondband.toString() + thirdband.toString();
    var result = (parseInt(sum)) * Math.pow(10, multiplier);

    /*format the result*/
    var result_formated = units_converter(result, units);
    /*show the result */
    document.getElementById("resistorvalue").innerHTML = result_formated + " " + tolerance + "%";
}

/*sixbands_resistor calculator */
function sixbands_calculator(list_of_bands, colors) {

    /*check if all input were provided by the user*/
    var fields = list_of_bands;
    for (value of fields) {
        var input_value = get_value(value, colors, "value");
        if (typeof(input_value) != "number") {
            return null;
        }
    }

    /* set all variable for the calculation*/
    var firstband = get_value("firstband", colors, "value");
    var secondband = get_value("secondband", colors, "value");
    var thirdband = get_value("thirdband", colors, "value");
    var multiplier = get_value("multiplier", colors, "multiplier");
    var tolerance = get_value("tolerance", colors, "tolerance");
    var tempco = get_value("tempco", colors, "tempco");

    /*perform calculations*/
    var sum = firstband.toString() + secondband.toString() + thirdband.toString();
    var result = (parseInt(sum)) * Math.pow(10, multiplier);

    /*format the result*/
    var result_formated = units_converter(result, units);
    /*show the result */
    document.getElementById("resistorvalue").innerHTML = result_formated + " " + tolerance + "%" + " " + tempco + " " + "ppm/&#8451;";
}



/*main function of the resisotr calculator*/
function main_funtion(number_of_bands, colors) {
    var new_colors = colors;
    if (number_of_bands == 4) {
        fourbands_calculator(["firstband", "secondband", "multiplier", "tolerance"], new_colors);
    } else if (number_of_bands == 5) {
        fivebands_calculator(["firstband", "secondband", "thirdband", "multiplier", "tolerance"], new_colors);
    } else if (number_of_bands == 6) {
        sixbands_calculator(["firstband", "secondband", "thirdband", "multiplier", "tolerance", "tempco"], new_colors);
    } else {
        console.log("");
    }
}


/*add eventlistener  to our button*/
$(document).ready(function() {
    console.log("ready2");
    $("#second_form select").change(function() {
        var Color = this.value;
        var new_background = colors[Color]["color"];
        this.style.backgroundColor = new_background;
        if (Color == "white") {
            this.style.color = "black";
        } else {
            this.style.color = "white";
        }


        var number_of_bands = document.querySelector('input[name = "band"]:checked').value;
        main_funtion(number_of_bands, colors);
    });
});
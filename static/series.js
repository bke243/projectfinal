/*units converter */
/*units */
let units = {
    tera: { symbol: "T;", number: -12 },
    giga: { symbol: "G", number: -9 },
    mega: { symbol: "M", number: -6 },
    kilo: { symbol: "k", number: -3 },
    mili: { symbol: "m", number: -3 },
    micro: { symbol: "&micro;", number: -6 },
    nano: { symbol: "n", number: -9 },
    pico: { symbol: "P", number: -12 }
};

/*Converter function */

function units_converter(result, units) {
    var real_result = result;

    /* check if the result is equal to one*/
    if (real_result == 0) {
        return real_result + " ";
    }
    /*check if the reuslt is grater or less than 1*/
    else if (real_result > 1) {
        /*check if the result is an integer*/
        if (Number.isInteger(real_result)) {
            /*result for an integer value*/
            result_length = real_result.toString().length;
            if (result_length < 4) {
                /*format the result*/
                var real_result_final = real_result.toFixed(3) + " ";

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
                var real_result_final = real_result.toFixed(3) + " ";

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
            var real_result_final = real_result.toFixed(3) + " ";

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
            var real_result_converted = parseInt(real_result_splited[1]) * Math.pow(10, units["pico"]["number"]);

            /*round the result*/
            var real_result_rounded = real_result_converted.toFixed(3);

            /*format the result*/
            var real_result_final = real_result_rounded + " " + units["pico"]["symbol"];

            /*return the result*/
            return real_result_final;
        }
    }
}


/*Display function to display the result*/
function display(result, units, option) {
    /*the formatted result */
    var formated_result = units_converter(result, units)

    /*dispay the result*/
    if (option == "resistance") {
        document.getElementById("reuslt").innerHTML = formated_result + "&Omega;"
    } else {
        document.getElementById("reuslt").innerHTML = formated_result + "S";
    }
}


/*the dynamic templating functions*/
function update_templating(numberofresistors, template) {
    /*define an array */
    var listofid = [];

    var mytemplate = template;
    /*creates ids*/
    for (var i = 0; i < numberofresistors; i++) {
        /*create new ids*/
        var local_variable = i + 1;
        var new_local_variable = "R" + local_variable;

        /*add those ids to the listofid*/
        listofid.push(new_local_variable);
    }

    /*Use template to insert all the ids*/
    container.innerHTML = listofid.map(url => mytemplate.replace(/{RX}/g, url)).join('');

    /*return list of ids*/
    return listofid;
}

/*the calculator function*/
function value_calculator(listofids) {
    /*set the result to Zero*/
    var result = 0;

    /*get the option */
    var option = document.getElementById("option").value;

    /*calculate the total resistance*/
    if (option == "resistance") {
        for (ids of listofids) {
            /*get the value */
            var value_inputed = document.getElementById(ids).value;

            /*convert the value from string to number*/
            var value_inputed_converted = parseInt(value_inputed);

            result = result + value_inputed_converted;
        }

        return result;
    } else {
        for (ids of listofids) {
            /*get the value */
            var value_inputed = document.getElementById(ids).value;

            /*convert the value from string to number*/
            var value_inputed_converted = Math.pow(parseInt(value_inputed), -1);

            result = result + value_inputed_converted;
        }
        return result;
    }

}



/*to ensure that the doc was load*/
$(document).ready(function() {

    /* Load the template HTML */
    let template = document.querySelector('script[language="text/template"]').innerHTML;

    /* set the list of ids */
    let Myids = ["R1", "R2"];

    /*set the old number of resistors*/
    let old_value = $("#numberofresistors").val();

    /*add an event listener for the number of resistor */
    $("#numberofresistors").bind('keyup mouseup', function() {
        var current_value = parseInt(this.value);
        /*check if the current value is digits, greater or equal to two and different from the old one*/
        if ((isFinite(current_value) == true && current_value >= 2) && current_value != old_value) {

            /*set the old value to the current one*/
            old_value = current_value;

            /*change the numbers of inputs and udpdate the ids list*/
            Myids = update_templating(current_value, template);
        }
    });

    /*event listener for the option button*/
    $("#option").change(function() {
        /*Get the option value*/
        var option = this.value;

        /*set the resuslt title*/
        if (option == "resistance") {
            document.getElementById("resulttitle").innerHTML = "Total Series Resistance";
        } else {
            document.getElementById("resulttitle").innerHTML = "Total Series Conductance";
        }
    })


    /*envent listener for the calculate button*/
    $("#calculate").click(function() {
        var button = this.value;

        /*check if all input were given*/
        var form = document.querySelector(".needs-validation");

        if (form.checkValidity() == false) {
            form.classList.add("was-validated");
        } else {

            var value_calculated = value_calculator(Myids);
            /*Display the result*/
            var option = document.getElementById("option").value;

            display(value_calculated, units, option);
        }

    })
});
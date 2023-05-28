$(document).ready(function () {
    // Attach click event handlers to number buttons
    $("#btn-0,#btn-comma,#btn-1, #btn-2, #btn-3, #btn-4, #btn-5, #btn-6, #btn-7, #btn-8, #btn-9").click(function () {
        var currentValue = $("#calcinput").val();
        var clickedValue = $(this).text();
        $("#calcinput").val(currentValue + clickedValue);
    });

    // Attach click event handlers to operator buttons
    $("#btn-plus, #btn-minus, #btn-multiply, #btn-divide").click(function () {
        var currentValue = $("#calcinput").val();
        var clickedValue = $(this).text();
        $("#calcinput").val(currentValue + " " + clickedValue + " ");
    });

    // Attach click event handler to the "=" button
    $("#submit").click(function () {
        var expression = $("#calcinput").val(); // Get the user input from the input field

        // Send AJAX POST request to the Calculate action method
        $.ajax({
            type: "POST",
            url: "/Calculator/Calculate",
            data: { expression: expression },
            success: function (response) {
                if (response.success) {
                    // Display the calculated result
                    $("#calcinput").val(response.result);
                } else {
                    // Display error message if calculation fails
                    alert("Error: " + response.errorMessage);
                }
            },
            error: function () {
                alert("An error occurred while processing the request.");
            }
        });
    });

    // Attach click event handler to the backspace button
    $("#btn-backspace").click(function () {
        var expression = $("#calcinput").val();
        if (expression.length > 0) {
            // Remove the last character from the expression
            expression = expression.substring(0, expression.length - 1);
            $("#calcinput").val(expression);
        }
    });

    // Attach click event handler to the "ac" button
    $("#btn-ac").click(function () {
        // Clear the input field completely
        $("#calcinput").val("");
    });

    // Attach click event handler to the "ce" button
    $("#btn-ce").click(function () {
        // Clear the input field completely
        $("#calcinput").val("");
    });

    // Attach click event handler to the "+/-" button
    $("#btn-plus-minus").click(function () {
        var currentValue = $("#calcinput").val();

        if (currentValue !== "") {
            // Check if the current value is a negative number
            if (currentValue.startsWith("-")) {
                // Remove the negative sign to make it positive
                currentValue = currentValue.substring(1);
            } else {
                // Add a negative sign to make it negative
                currentValue = "-" + currentValue;
            }
            $("#calcinput").val(currentValue);
        }
    });

    // Attach click event handler to the reciprocal button
    $("#btn-reciprocal").click(function () {
        var currentValue = $("#calcinput").val();

        if (currentValue !== "") {
            // Evaluate the reciprocal operation
            var reciprocal = 1 / parseFloat(currentValue);

            // Set the result as the new input value
            $("#calcinput").val(reciprocal);
        }
    });

    // Attach click event handler to the square button
    $("#btn-square").click(function () {
        var currentValue = $("#calcinput").val();

        if (currentValue !== "") {
            // Evaluate the square operation
            var square = Math.pow(parseFloat(currentValue), 2);

            // Set the result as the new input value
            $("#calcinput").val(square);
        }
    });

    // Attach click event handler to the square root button
    $("#btn-square-root").click(function () {
        var currentValue = $("#calcinput").val();

        if (currentValue !== "") {
            // Evaluate the square root operation
            var squareRoot = Math.sqrt(parseFloat(currentValue));

            // Set the result as the new input value
            $("#calcinput").val(squareRoot);
        }
    });

    // Attach click event handler to the percentage button
    $("#btn-percentage").click(function () {
        var currentValue = $("#calcinput").val();

        if (currentValue !== "") {
            // Evaluate the percentage operation
            var percentage = parseFloat(currentValue) / 100;

            // Set the result as the new input value
            $("#calcinput").val(percentage);
        }
    });
    // Attach click event handler to the memory recall button
    $("#btn-mr").click(function () {
        // Retrieve the value from memory
        var memoryValue = localStorage.getItem("calculatorMemory");

        if (memoryValue !== null) {
            // Set the memory value as the new input value
            $("#calcinput").val(memoryValue);
        }
    });

    // Attach click event handler to the memory minus button
    $("#btn-m-minus").click(function () {
        var currentValue = $("#calcinput").val();

        if (currentValue !== "") {
            // Subtract the current value from the memory value and update the memory
            var memoryValue = localStorage.getItem("calculatorMemory");
            var newValue = parseFloat(memoryValue || 0) - parseFloat(currentValue);
            localStorage.setItem("calculatorMemory", newValue);
        }
    });

    // Attach click event handler to the memory plus button
    $("#btn-m-plus").click(function () {
        var currentValue = $("#calcinput").val();

        if (currentValue !== "") {
            // Add the current value to the memory value and update the memory
            var memoryValue = localStorage.getItem("calculatorMemory");
            var newValue = parseFloat(memoryValue || 0) + parseFloat(currentValue);
            localStorage.setItem("calculatorMemory", newValue);
        }
    });

});
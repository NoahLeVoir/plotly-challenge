// Starting code comes from Office hour session with Instructor Dom
// May share similarities with other students

console.log("app.js loaded");


function InitDashboard() {
    console.log("InitDashboard()")

    // Populate the dropdown
    var selector = d3.select("#selDataset")

    d3.json("samples.json").then(function(data) {
        console.log(data);

    });


    // Update the bargraph
    // Update the bubble chart
    // Update the demographic info


}

InitDashboard();
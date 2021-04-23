// Starting code comes from Office hour session with Instructor Dom
// May share similarities with other students

console.log("app.js loaded");

// Functions to draw each graph per homework instructions
function drawBargraph(sampleID) {
    console.log(`Draw Bargraph for ${sampleID}`);

    d3.json("samples.json").then(data => {
        // console.log(data)

        var samples = data.samples;
        var resultArray = samples.filter(s => s.id == sampleID);
        // console.log(resultArray);
        var result = resultArray[0];

        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;

        yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();

        var barData = {
            x: sample_values.slice(0, 10).reverse(),
            y: yticks,
            type: "bar",
            text: otu_labels.slice(0, 10).reverse(),
            orientation: "h"
        }

        var barArray = [barData];

        var barLayout = {
            title: "Top 10 Bacterial Cultures Found",
            margin: {t:30, l:150}
        }

        Plotly.newPlot(bar, barArray, barLayout)

    });

}

function drawBubblechart(sampleID) {
    console.log(`Draw Bubblechart for ${sampleID}`);
}

function showMetadata(sampleID) {
    console.log(`Show the Metadata for ${sampleID}`);
}

// Event change handler function
function optionChanged(newsampleID) {
    console.log(`User selected new sample ID ${newsampleID}`);

    drawBargraph(newsampleID);
    drawBubblechart(newsampleID);
    showMetadata(newsampleID);

}

// Initializing the dashboard function
function initDashboard() {
    console.log("InitDashboard()")

    // Populate the dropdown
    var selector = d3.select("#selDataset")

    d3.json("samples.json").then(data => {
        console.log(data);

        var sampleNames = data.names

        sampleNames.forEach(sampleID => {
            selector.append("option")
            .text(sampleID)
            .property("value", sampleID);

        }); 

        var id = sampleNames[0]

        drawBargraph(id);
        drawBubblechart(id);
        showMetadata(id);

    });


    // Update the bargraph
    // Update the bubble chart
    // Update the demographic info


}

initDashboard();
// Starting code comes from Office hour session with Instructor Dom
// May share similarities with other students

console.log("app.js loaded");

// Functions to draw each graph per homework instructions
function drawBargraph(sampleID) {
    console.log(`Draw Bargraph for ${sampleID}`);

    // Use d3 to read data from samples.json
    d3.json("samples.json").then(data => {

        var samples = data.samples;
        var resultArray = samples.filter(s => s.id == sampleID);
        var result = resultArray[0];

        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;

        // Set up values for the bargraph
        // Using the .reverse function here to match the hw example layout
        yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();

        var barData = {
            x: sample_values.slice(0, 10).reverse(),
            y: yticks,
            type: "bar",
            text: otu_labels.slice(0, 10).reverse(),
            orientation: "h"
        }

        var barArray = [barData];

        // Define layout for the bargraph
        var barLayout = {
            title: "Top 10 Bacterial Cultures Found",
            margin: {t:30, l:150}
        }

        // Use plotly to draw the bar chart
        Plotly.newPlot(bar, barArray, barLayout)

    });

}

// Bubble chart function
function drawBubblechart(sampleID) {
    console.log(`Draw Bubblechart for ${sampleID}`);

    // Use d3 to read data from samples.json
    d3.json("samples.json").then(data => {

        var samples = data.samples;
        var resultArray = samples.filter(s => s.id == sampleID);
        var result = resultArray[0];

        // Define variable to be used in the bubble chart
        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;
      
        var bubbleData = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }
        }
      
        // Putting the bubble data into an array for plotly
        var bubbleArray = [bubbleData];

        // Bubble chart layout
        var bubbleLayout = {
            title: "Samples Found",
            margin: { t: 30 },
            hovermode: "closests",
            xaxis: { title: "OTU ID"}
        }

        // Use plotly to draw the bubble chart
        Plotly.newPlot("bubble", bubbleArray, bubbleLayout);

    });

}

// Demographic Info table function
function showMetadata(sampleID) {
    console.log(`Show the Metadata for ${sampleID}`);

    // Use d3 to read data from samples.json
    d3.json("samples.json").then(data => {

        // Get the metadata and store it into a result
        var metaData = data.metadata;
        var resultArray = metaData.filter(m => m.id == sampleID);
        console.log(resultArray);
        var result = resultArray[0];

        // Append data to Demographic Info Table
        var demographicTable = d3.select("#sample-metadata");
        
        // Use `.html("") to clear any existing data in the table
        demographicTable.html("");
        
        // Use `Object.entries` to add each key & value pair        
        Object.entries(result).forEach(([key, value]) => {
            demographicTable.append("h6").text(`${key}: ${value}`);
          })

    });

}

// Event change handler function
function optionChanged(newsampleID) {
    console.log(`User selected new sample ID ${newsampleID}`);

    // Draw each graph when the value for newsampleID is changed
    // This will call all functions above to draw updated charts
    drawBargraph(newsampleID);
    drawBubblechart(newsampleID);
    showMetadata(newsampleID);

}

// Initializing the dashboard function
// This code comes from an office hours session with Instructor Dom
function initDashboard() {
    console.log("InitDashboard()")

    // Populate the dropdown
    var selector = d3.select("#selDataset")

    // Use d3 to read data from samples.json
    d3.json("samples.json").then(data => {
        console.log(data);

        var sampleNames = data.names

        sampleNames.forEach(sampleID => {
            selector.append("option")
            .text(sampleID)
            .property("value", sampleID);

        }); 

        // Define id and use it to draw each chart initially for the page
        var id = sampleNames[0]

        drawBargraph(id);
        drawBubblechart(id);
        showMetadata(id);

    });
}

// Call the initial load function
initDashboard();
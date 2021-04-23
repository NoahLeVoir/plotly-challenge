// Starting code comes from Office hour session with Instructor Dom
// May share similarities with other students

console.log("app.js loaded");

function drawBargraph(sampleID) {
    console.log(`Draw Bargraph for ${sampleID}`);
}

function drawBubblechart(sampleID) {
    console.log(`Draw Bubblechart for ${sampleID}`);
}

function showMetadata(sampleID) {
    console.log(`Show the Metadata for ${sampleID}`);
}

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
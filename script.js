// Store an array for selected rows
var selectedRows = [];

// Function to load and parse the CSV file
function loadCSVFile(file) {
    Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: function (results) {
            // Store the parsed CSV data in a variable
            window.csvData = results.data;
        }
    });
}

// Function to execute the search
// Function to execute the search
function executeSearch() {
    var searchInput = document.getElementById('search').value.toLowerCase();
    var searchResults = [];

    if (!window.csvData) {
        alert('Please select a CSV file first.');
        return;
    }

    // Clear the selected table at the beginning of the search
    clearSelectedTable();

    // Loop through the CSV data and search for the input text
    for (var i = 0; i < window.csvData.length; i++) {
        for (var key in window.csvData[i]) {
            if (window.csvData[i][key] && window.csvData[i][key].toString().toLowerCase().includes(searchInput)) {
                searchResults.push(window.csvData[i]);
                break;
            }
        }
    }

    // Display the search results
    displaySearchResults(searchResults);
}
// Event listener for generate CSV button click
document.getElementById('generateCSVButton').addEventListener('click', function () {
    generateCSV();
});

// Function to generate and download a CSV with selected row data
function generateCSV() {
    if (selectedRows.length === 0) {
        alert('No rows selected. Please select rows to generate a CSV.');
        return;
    }

    // Create a CSV content string
    var csvContent = '';
    var headers = Object.keys(selectedRows[0]);
    csvContent += headers.join(',') + '\n';

    for (var i = 0; i < selectedRows.length; i++) {
        var values = headers.map(function (header) {
            return selectedRows[i][header];
        });
        csvContent += values.join(',') + '\n';
    }

    // Create a Blob containing the CSV data
    var blob = new Blob([csvContent], { type: 'text/csv' });

    // Create a download link and trigger the download
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'selected_data.csv';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Function to clear the selected table
function clearSelectedTable() {
    var selectedTable = document.getElementById('selectedTable');
    selectedTable.innerHTML = '';
    selectedRows = [];
}


// Function to display search results
function displaySearchResults(results) {
    var searchResultsDiv = document.getElementById('searchResults');
    searchResultsDiv.innerHTML = '';

    if (results.length === 0) {
        searchResultsDiv.textContent = 'No results found.';
        return;
    }

    // Create a table to display the results
    var table = document.createElement('table');
    var headerRow = table.insertRow(0);

    for (var key in results[0]) {
        var headerCell = headerRow.insertCell(-1);
        headerCell.textContent = key;
    }

    for (var i = 0; i < results.length; i++) {
        var row = table.insertRow(-1);

        for (var key in results[i]) {
            var cell = row.insertCell(-1);
            cell.textContent = results[i][key];
        }

        // Assign a data attribute to store the row index
        row.dataset.rowIndex = i.toString();

        // Add a click event listener to each row to select or deselect it
        row.addEventListener('click', function () {
            var rowIndex = parseInt(this.dataset.rowIndex, 10); // Parse the index as an integer
            if (!isNaN(rowIndex) && rowIndex >= 0) {
                addSelectedRow(rowIndex, results); // Pass searchResults as an argument
            }
        });
    }

    searchResultsDiv.appendChild(table);
}

// Function to clear the search box and selected table
function clearSearch() {
    document.getElementById('search').value = '';
    var searchResultsDiv = document.getElementById('searchResults');
    searchResultsDiv.innerHTML = '';

    // Clear the selectedRows array
    selectedRows = [];
}

function addSelectedRow(rowIndex, searchResults) {
    var selectedTable = document.getElementById('selectedTable');
    var existingRows = selectedTable.querySelectorAll('tr');

    // Check if the row is already in the selected table
    for (var i = 0; i < existingRows.length; i++) {
        if (existingRows[i].dataset.rowIndex === rowIndex.toString()) {
            selectedTable.deleteRow(i);
            // Remove the row from the selectedRows array
            selectedRows.splice(i, 1);
            return;
        }
    }

    // If not, add the row to the selected table and apply the "selected" class
    var newRow = selectedTable.insertRow(-1);
    newRow.dataset.rowIndex = rowIndex.toString();

    var rowData = searchResults[rowIndex]; // Get the data for the selected row from searchResults

    for (var key in rowData) {
        var cell = newRow.insertCell(-1);
        cell.textContent = rowData[key];
    }

    // Add the "selected" class to highlight the row
    newRow.classList.add('selected');

    // Add the row to the selectedRows array
    selectedRows.push(rowData);
}

// Event listener for file input change
document.getElementById('csvFile').addEventListener('change', function (event) {
    var file = event.target.files[0];
    loadCSVFile(file);
});

// Execute the search when Enter key is pressed in the search box
document.getElementById('search').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        executeSearch();
        event.preventDefault();
    }
});

// Event listener for search button click
document.getElementById('searchButton').addEventListener('click', function () {
    executeSearch();
});

// Event listener for clear button click
document.getElementById('clearButton').addEventListener('click', function () {
    clearSearch();
});

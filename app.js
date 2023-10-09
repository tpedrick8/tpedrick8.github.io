document.addEventListener('DOMContentLoaded', () => {
    const csvFileInput = document.getElementById('csvFile');
    const uploadButton = document.getElementById('uploadButton');
    const downloadLink = document.getElementById('downloadLink');

    let searchInput = null;
    let searchButton = null;
    let searchResultsTable = document.getElementById('searchResultsTable'); // Move the declaration here
    let column1ToLibraryDayMapping = {};
    document.getElementById('searchResultsTable').addEventListener('click', (event) => {
        const selectedRow = event.target.closest('tr');

        if (selectedRow && selectedRow !== searchResultsTable.firstChild) {
            const selectedRowIndex = Array.from(searchResultsTable.querySelectorAll('tr')).indexOf(selectedRow);
            const selectedRowData = result.data[selectedRowIndex - 1]; // Subtract 1 to account for the header row

            // Generate the new table with the selected row's data
            const newTableContainer = createNewTable(selectedRowData);
        }
    });

    fetch('mappings.json')
         .then(response => response.json())
         .then(data => {
             // Process the loaded mappings data
             const mappings = data;

             const column1ToColumn10Mapping = {};


             mappings.forEach(mapping => {
                 column1ToColumn10Mapping[mapping.column1] = mapping.column10;
                 column1ToLibraryDayMapping[mapping.column1] = mapping.libraryDay;
             });

           })
                   .catch(error => {
                       console.error('Error loading mappings.json:', error);
                   });

    // Create the search input and button
    searchInput = document.createElement('input');
    searchInput.id = 'searchInput';
    searchInput.type = 'text';
    searchInput.placeholder = 'Search...';

    searchButton = document.createElement('button');
    searchButton.id = 'searchButton';
    searchButton.textContent = 'Search';

    // Replace 'container' with the actual container element where you want to append the search input and button
    const container = document.getElementById('container');
    container.appendChild(searchInput);
    container.appendChild(searchButton);

    // Function to create a new table
    function createNewTable(selectedRowData) {
        const newTableContainer = document.createElement('div');
        newTableContainer.classList.add('new-table-container');

        const newTable = document.createElement('table');
        newTable.classList.add('new-table');

        // Create table header
        const newTableHeader = document.createElement('thead');
        const newTableHeaderRow = document.createElement('tr');
        const headers = Object.keys(selectedRowData);

        headers.forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
            newTableHeaderRow.appendChild(th);
        });

        newTableHeader.appendChild(newTableHeaderRow);
        newTable.appendChild(newTableHeader);

        // Create table body
        const newTableBody = document.createElement('tbody');
        const newRow = document.createElement('tr');

        headers.forEach(header => {
            const td = document.createElement('td');
            td.textContent = selectedRowData[header];
            newRow.appendChild(td);
        });

        newTableBody.appendChild(newRow);
        newTable.appendChild(newTableBody);

        newTableContainer.appendChild(newTable);

        // Insert the new table above the old table
        const searchResultsTable = document.querySelector('.search-results-table');
        searchResultsTable.parentElement.insertBefore(newTableContainer, searchResultsTable);

        return newTableContainer;
    }

    // Automatically run the script when the file input changes
    csvFileInput.addEventListener('change', () => {
        const file = csvFileInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                let contents = e.target.result;

                contents = contents.replace(/^"([^"]+)"/gm, '$1');

                const delimiter = '\t';

                Papa.parse(contents, {
                    delimiter: delimiter,
                    header: false,
                    dynamicTyping: true,
                    complete: (parsedResult) => {
                        result = parsedResult; // Store the result
                        const newHeader = ['Home Room', 'Teacher', 'Student Number', 'First Name', 'Last Name', 'Preferred Name', 'Student Email', 'Student User Name', 'Teacher Email', '', 'Student Pass', 'Library Day', 'Division', 'Cybrarian', 'Books'];
                        result.data[0] = newHeader;

                        for (let i = 1; i < result.data.length; i++) {
                            result.data[i].splice(8, 1);

                            const firstColumnValue = result.data[i][0];
                            const startsWith345 = /^[345]/.test(firstColumnValue);
                            result.data[i][12] = startsWith345 ? 'UES' : 'LES';

                            if (result.data[i][12] === 'UES') {
                                result.data[i][13] = 'Mr. Wong';
                                result.data[i][14] = 5;
                                result.data[i][8] = column1ToColumn10Mapping[firstColumnValue] || '';
                                result.data[i][11] = column1ToLibraryDayMapping[firstColumnValue] || '';

                                const column3Value = String(result.data[i][2]);
                                result.data[i][10] = startsWith345 ? `${result.data[i][4]}${column3Value.slice(-4)}` : 'abc123';
                            } else {
                                result.data[i][13] = 'Ms. Bec';
                                result.data[i][14] = 3;
                                result.data[i][11] = column1ToLibraryDayMapping[firstColumnValue] || '';
                                result.data[i][8] = column1ToColumn10Mapping[firstColumnValue] || '';
                                result.data[i][10] = 'abc123';
                            }
                        }

                        result.data = result.data.filter(row => row.some(cell => cell !== '' && cell !== null));

                        for (let col = result.data[0].length - 1; col >= 0; col--) {
                            if (!result.data.some(row => row[col] !== '' && row[col] !== null)) {
                                result.data.forEach(row => row.splice(col, 1));
                            }
                        }

                        const modifiedContents = Papa.unparse(result, { quotes: false });

                        const blob = new Blob([modifiedContents], { type: 'text/csv' });
                        const url = URL.createObjectURL(blob);

                        downloadLink.href = url;
                        downloadLink.style.display = 'block';
                        downloadLink.setAttribute('download', 'students.csv');
                    },
                });
            };
            reader.readAsText(file);
        }

        // Simulate a click on the search button to trigger the script
        if (searchButton) {
            searchButton.click();
        }
    });

    // Function to create and populate the search results table
    function createTable(data) {
        // Check if searchResultsTable is null before accessing its firstChild
        if (searchResultsTable) {
            searchResultsTable.innerHTML = '';

            if (data.length === 0) {
                searchResultsTable.textContent = 'No results found.';
                return;
            }

            const table = document.createElement('table');
            table.classList.add('search-results-table');

            const tableHeader = document.createElement('thead');
            const headerRow = document.createElement('tr');

            const headers = ['Home Room', 'Teacher', 'Student Number', 'First Name', 'Last Name', 'Preferred Name', 'Student Email', 'Student User Name', 'Teacher Email', '', 'Student Pass', 'Library Day', 'Division', 'Cybrarian', 'Books'];

            headers.forEach(headerText => {
                const th = document.createElement('th');
                th.textContent = headerText;
                headerRow.appendChild(th);
            });

            tableHeader.appendChild(headerRow);
            table.appendChild(tableHeader);

            const tableBody = document.createElement('tbody');

            data.forEach(rowData => {
                const row = document.createElement('tr');
                rowData.forEach(cellData => {
                    const cell = document.createElement('td');
                    cell.textContent = cellData;
                    row.appendChild(cell);
                });
                tableBody.appendChild(row);
            });

            table.appendChild(tableBody);

            searchResultsTable.appendChild(table);
        } else {
            console.error('searchResultsTable element not found');
        }
    }

    // Attach click event listener to search button
    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.trim();
        if (searchTerm !== '') {
            const searchResults = result.data.filter(row =>
                row.some(cell =>
                    typeof cell === 'string' && cell.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );

            createTable(searchResults);
        }
    });
});

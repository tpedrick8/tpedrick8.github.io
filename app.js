document.addEventListener('DOMContentLoaded', () => {
    const csvFileInput = document.getElementById('csvFile');
    const uploadButton = document.getElementById('uploadButton');
    const downloadLink = document.getElementById('downloadLink');

    let searchInput = null;
    let searchButton = null;
    let searchResultsTable = document.getElementById('searchResultsTable'); // Move the declaration here

    document.getElementById('searchResultsTable').addEventListener('click', (event) => {
        const selectedRow = event.target.closest('tr');

        if (selectedRow && selectedRow !== searchResultsTable.firstChild) {
            const selectedRowIndex = Array.from(searchResultsTable.querySelectorAll('tr')).indexOf(selectedRow);
            const selectedRowData = result.data[selectedRowIndex - 1]; // Subtract 1 to account for the header row

            // Generate the new table with the selected row's data
            const newTableContainer = createNewTable(selectedRowData);
        }
    });

    const mappings = [
          {
              column1: 'EY3-EL',
              column10: 'elivy@isb.cn',
              libraryDay: 'B',
          },
          {
              column1: 'EY3-LW',
              column10: 'lsirottiwong@isb.bj.edu.cn',
              libraryDay: 'A',
          },
          {
              column1: 'EY3-LT',
              column10: 'ltong@isb.bj.edu.cn',
              libraryDay: 'C',
          },
          {
              column1: 'EY4-KA',
              column10: 'kadams@isb.bj.edu.cn',
              libraryDay: 'D',
          },
          {
              column1: 'EY4-CM',
              column10: 'cmaclachlan@isb.bj.edu.cn',
              libraryDay: 'F',
          },
          {
              column1: 'EY4-JZ',
              column10: 'jzhu@isb.bj.edu.cn',
              libraryDay: 'B',
          },
          {
              column1: 'KG-JH',
              column10: 'jhatton@isb.cn',
              libraryDay: 'F',
          },
          {
              column1: 'KG-LT',
              column10: 'lthompson@isb.bj.edu.cn',
              libraryDay: 'A',
          },
          {
              column1: 'KG-WW',
              column10: 'wwang@isb.bj.edu.cn',
              libraryDay: 'C',
          },
          {
              column1: 'KG-MA',
              column10: 'maustin@isb.bj.edu.cn',
              libraryDay: 'C',
          },
          {
              column1: '1-SJ',
              column10: 'sbasso@isb.cn',
              libraryDay: 'E',
          },
          {
              column1: '1-AP',
              column10: 'apayne@isb.bj.edu.cn',
              libraryDay: 'A',
          },
          {
              column1: '1-JZ',
              column10: 'jzhang01@isb.bj.edu.cn',
              libraryDay: 'B',
          },
          {
              column1: '1-CP',
              column10: 'cpardo@isb.bj.edu.cn',
              libraryDay: 'F',
          },
          {
              column1: '1-CB',
              column10: 'cbodt@isb.cn',
              libraryDay: 'D',
          },
          {
              column1: '1-MA',
              column10: 'masif@isb.bj.edu.cn',
              libraryDay: 'B',
          },
          {
              column1: '2-JC',
              column10: 'jcecere@isb.cn',
              libraryDay: 'E',
          },
          {
              column1: '2-AY',
              column10: 'ayan@isb.bj.edu.cn',
              libraryDay: 'E',
          },
          {
              column1: '2-NC',
              column10: 'ncoen@isb.bj.edu.cn',
              libraryDay: 'D',
          },
          {
              column1: '2-SY',
              column10: 'syue@isb.cn',
              libraryDay: 'B',
          },
          {
              column1: '2-ZP',
              column10: 'zpisheh@isb.cn',
              libraryDay: 'A',
          },
          {
              column1: '2-AT',
              column10: 'atanner@isb.bj.edu.cn',
              libraryDay: 'E',
          },
          {
              column1: '3-BF',
              column10: 'bfarace@isb.cn',
              libraryDay: 'E',
          },
          {
              column1: '3-DA',
              column10: 'dallinson@isb.cn',
              libraryDay: 'F',
          },
          {
              column1: '3-CD',
              column10: 'cdionco@isb.bj.edu.cn',
              libraryDay: 'C',
          },
          {
              column1: '3-JQ',
              column10: 'jquigley@isb.bj.edu.cn',
              libraryDay: 'D',
          },
          {
              column1: '3-MF',
              column10: 'mfrazer@isb.cn',
              libraryDay: 'D',
          },
          {
              column1: '3-PC',
              column10: 'pcastro@isb.cn',
              libraryDay: 'D',
          },
          {
              column1: '3-MW',
              column10: 'hwang1@isb.bj.edu.cn',
              libraryDay: 'B',
          },
          {
              column1: '4-EP',
              column10: 'epetersen@isb.cn',
              libraryDay: 'F',
          },
          {
              column1: '4-BR',
              column10: 'brussell@isb.bj.edu.cn',
              libraryDay: 'C',
          },
          {
              column1: '4-LL',
              column10: 'lli02@isb.bj.edu.cn',
              libraryDay: 'E',
          },
          {
              column1: '4-PG',
              column10: 'pgrant@isb.bj.edu.cn',
              libraryDay: 'F',
          },
          {
              column1: '4-RB',
              column10: 'rbrewis@isb.bj.edu.cn',
              libraryDay: 'F',
          },
          {
              column1: '4-TF',
              column10: 'tflanagan@isb.bj.edu.cn',
              libraryDay: 'F',
          },
          {
              column1: '4-PI',
              column10: 'pip@isb.cn',
              libraryDay: 'E',
          },
          {
              column1: '5-RC',
              column10: 'rcook@isb.bj.edu.cn',
              libraryDay: 'E',
          },
          {
              column1: '5-WQ',
              column10: 'wqian@isb.cn',
              libraryDay: 'B',
          },
          {
              column1: '5-PM',
              column10: 'pmurphy@isb.bj.edu.cn',
              libraryDay: 'E',
          },
          {
              column1: '5-CS',
              column10: 'cstephens@isb.bj.edu.cn',
              libraryDay: 'B',
          },
          {
              column1: '5-TR',
              column10: 'trumley@isb.bj.edu.cn',
              libraryDay: 'D',
          },
          {
              column1: '5-BN',
              column10: 'bnelson@isb.bj.edu.cn',
              libraryDay: 'A',
          },
          {
              column1: '5-CC',
              column10: 'ccoen@isb.bj.edu.cn',
              libraryDay: 'B',
          },
          {
              column1: '5-TC',
              column10: 'tcary@isb.bj.edu.cn',
              libraryDay: 'A',
          },
          // Add more mappings here...
        ];

    const column1ToColumn10Mapping = {};
    const column1ToLibraryDayMapping = {};

    mappings.forEach(mapping => {
        column1ToColumn10Mapping[mapping.column1] = mapping.column10;
        column1ToLibraryDayMapping[mapping.column1] = mapping.libraryDay;
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

            const headers = ['Home Room', 'Teacher', 'Student Number', 'First Name', 'Last Name', 'Preferred Name', 'Student Email', 'Student User Name', 'Teacher Email', 'Student Pass', 'Library Day', 'Division', 'Cybrarian', 'Books'];

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
            removeTenthColumn();
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
function removeTenthColumn() {
    const searchResultsTable = document.querySelector('.search-results-table');

    if (searchResultsTable) {
        const tableRows = searchResultsTable.querySelectorAll('tr');

        tableRows.forEach(row => {
            const cells = row.querySelectorAll('td');
            if (cells.length > 10) {
                // Remove the 10th column (index 9) from each row
                row.removeChild(cells[9]);
            }
        });
    } else {
        console.error('searchResultsTable element not found');
    }
}

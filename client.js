// Add this code in your client.js file
$(document).ready(function () {
    console.log('Document ready')
    // Fetch available currencies and populate the dropdown
    $.ajax({
      type: 'POST',
      url: 'http://localhost:7879/api/getAvailableCurrencies',
      success: function (data) {
        console.log('POST success!')
        // Assuming data is an array like ["MIN", "UPK", "ONI", "MXN", "USD", "CAD", "EUR"]
        populateDropdown(data);
      },
      error: function (error) {
        console.error('Error fetching available currencies:', error);
      }
    });
  
    // Function to populate the dropdown with options
    function populateDropdown(currencies) {
        console.log('Populating dropdown')
        var dropdown = document.getElementById('currency');

        // Clear existing options
        dropdown.empty();

        // Add options based on the fetched data
        $.each(currencies, function (index, currency) {
            dropdown.append($('<option>').text(currency).val(currency));
        });
    }
  });
  
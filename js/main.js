$(document).ready(function() {
  // Simulate login form submission (you already have this part)
  $("#loginForm").on("submit", function(event) {
      event.preventDefault(); 

      var username = $("#username").val();
      var password = $("#password").val();

      // Simulate login validation
      if (username === "admin" && password === "admin") {
          $("#login-page").hide();
          $("#page-two").show();
          
          setTimeout(function() {
              $("#loadingOverlay").show();
          }, 1000); 
      } else {
          alert("Invalid username or password");
      }
  });

  
  const employees = [
    { name: 'James Butt', location: 'Benton', imageSrc: 'https://via.placeholder.com/70', color: '#66bb6a' },
    { name: 'Josephine Darakjy', location: 'Chanay', imageSrc: 'https://via.placeholder.com/70', color: '#8e24aa' },
    { name: 'Art Venere', location: 'Chemel', imageSrc: 'https://via.placeholder.com/70', color: '#42a5f5' },
    { name: 'Art Venere', location: 'Chemel', imageSrc: 'https://via.placeholder.com/70', color: '#42a5f5' },
    { name: 'Art Venere', location: 'Chemel', imageSrc: 'https://via.placeholder.com/70', color: '#42a5f5' },
    { name: 'James Butt', location: 'Benton', imageSrc: 'https://via.placeholder.com/70', color: '#66bb6a' },
    { name: 'Josephine Darakjy', location: 'Chanay', imageSrc: 'https://via.placeholder.com/70', color: '#8e24aa' },
    { name: 'James Butt', location: 'Benton', imageSrc: 'https://via.placeholder.com/70', color: '#66bb6a' },
    { name: 'Josephine Darakjy', location: 'Chanay', imageSrc: 'https://via.placeholder.com/70', color: '#8e24aa' },
    { name: 'James Butt', location: 'Benton', imageSrc: 'https://via.placeholder.com/70', color: '#66bb6a' },
    { name: 'Josephine Darakjy', location: 'Chanay', imageSrc: 'https://via.placeholder.com/70', color: '#8e24aa' },
    { name: 'James Butt', location: 'Benton', imageSrc: 'https://via.placeholder.com/70', color: '#66bb6a' }
  ];

  // Define the number of cards to show per page
  const cardsPerPage = 12;
  let currentPage = 1;

  // Calculate the total number of pages
  const totalPages = Math.ceil(employees.length / cardsPerPage);

  // Function to create the employee card HTML
  function createEmployeeCard(employee) {
      return `
          <div class="col-md-4 d-flex">
              <div class="employee-card  data-company="${employee.location}">
                  <div class="card-content">
                      <img src="${employee.imageSrc}" alt="${employee.name}">
                      <div class="employee-details">
                          <h5>${employee.name}</h5>
                          <p>${employee.location}</p>
                      </div>
                  </div>
                  <div class="color-strip" style="background-color: ${employee.color};"></div>
              </div>
          </div>
      `;
  }

  // Function to display the employee cards for the current page
  function displayEmployeeCards(page) {
      const startIndex = (page - 1) * cardsPerPage;
      const endIndex = startIndex + cardsPerPage;
      const currentEmployees = employees.slice(startIndex, endIndex);
      
      // Clear the employee list before appending new cards
      $('#employee-list').html('');
      
      // Append the employee cards for the current page
      currentEmployees.forEach(employee => {
          $('#employee-list').append(createEmployeeCard(employee));
      });

      // Update the pagination controls
      updatePagination(page);
  }

  // Function to update the pagination controls
  function updatePagination(page) {
      // Disable/enable the previous and next buttons
      if (page === 1) {
          $('.pagination .previous').addClass('disabled');
      } else {
          $('.pagination .previous').removeClass('disabled');
      }

      if (page === totalPages) {
          $('.pagination .next').addClass('disabled');
      } else {
          $('.pagination .next').removeClass('disabled');
      }

      // Update the active page number
      $('.pagination .page-item').removeClass('active');
      $(`.pagination .page-item[data-page="${page}"]`).addClass('active');
  }

  // Event listener for pagination page number clicks
  $(document).on('click', '.pagination .page-item', function(event) {
      const page = $(this).data('page');
      if (page && page !== currentPage) {  // Check if it's a valid page and not the current one
          currentPage = page;
          displayEmployeeCards(currentPage);
      }
  });

  // Event listener for the 'previous' button
  $(document).on('click', '.pagination .previous', function() {
      if (currentPage > 1) {
          currentPage--;
          displayEmployeeCards(currentPage);
      }
  });

  // Event listener for the 'next' button
  $(document).on('click', '.pagination .next', function() {
      if (currentPage < totalPages) {
          currentPage++;
          displayEmployeeCards(currentPage);
      }
  });

  // Function to create pagination buttons dynamically
  function createPagination() {
      const paginationContainer = $('.pagination');
      paginationContainer.empty();

      // Previous button
      paginationContainer.append(`
          <li class="page-item previous">
              <a class="page-link" href="#">Previous</a>
          </li>
      `);

      // Page number buttons
      for (let i = 1; i <= totalPages; i++) {
          paginationContainer.append(`
              <li class="page-item" data-page="${i}">
                  <a class="page-link" href="#">${i}</a>
              </li>
          `);
      }

      // Next button
      paginationContainer.append(`
          <li class="page-item next">
              <a class="page-link" href="#">Next</a>
          </li>
      `);
  }

        // Initialize the page with employee cards and pagination
        displayEmployeeCards(currentPage);
        createPagination();
        
        $(document).on('click', '.employee-card', function() {
            
            const name = $(this).data('name');
            const location = $(this).data('location');
            const imageSrc = $(this).data('image');
            const additionalInfo = $(this).data('additional');
    
            
            $('#modalEmployeeName').text(name);
            $('#modalEmployeeLocation').text(location);
            $('#modalEmployeeImage').attr('src', imageSrc);
            $('#modalEmployeeAdditionalInfo').text(additionalInfo);
    
           
            $('#employeeModal').modal('show');
        });

        // Function to filter employees based on selected checkboxes
        function filterEmployees() {
            var selectedCompanies = [];
            
           
            $('input[type="checkbox"]:checked').each(function() {
                selectedCompanies.push($(this).val());
            });

            $('.employee-card').each(function() {
                var company = $(this).data('company');
            
                if (selectedCompanies.length === 0 || selectedCompanies.includes(company)) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            });
        }

        $('input[type="checkbox"]').change(function() {
            filterEmployees();
        });

        filterEmployees();

  
});





  /*
  $(document).ready(function(){
    $.ajax({
      url:'/users/get-Users',
      method: 'GET',
      dataType: 'json',
      success: function(users){
          users.forEach(user =>{
            createEmployeeCard(user.name, user.location, user.imageSrc, user.color);
          });
      },
      error: function(xhr, status, error){
        console.error('Error Fetching users ' ,error);
      }
    });

  });
 */

  
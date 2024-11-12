$(document).ready(function() {
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
});

function createEmployeeCard(name, location, imageSrc, color) {
    const card = `
      <div class="col-md-4 d-flex ">
        <div class="employee-card">
          <div class="card-content">
            <img src="${imageSrc}" alt="${name}">
            <div class="employee-details">
              <h5>${name}</h5>
              <p>${location}</p>
            </div>
          </div>
          <div class="color-strip" style="background-color: ${color};"></div>
        </div>
      </div>
    `;
    
    $('#employee-list').append(card);
  }

  // Example usage:
  $(document).ready(function() {
    createEmployeeCard('James Butt', 'Benton', 'https://via.placeholder.com/70', '#66bb6a');
    createEmployeeCard('Josephine Darakjy', 'Chanay', 'https://via.placeholder.com/70', '#8e24aa');
    createEmployeeCard('Art Venere', 'Chemel', 'https://via.placeholder.com/70', '#42a5f5');
  });

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


  
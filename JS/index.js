//Global Variables
const loginForm = document.getElementById("login");


//Events
loginForm.addEventListener('submit',function(e){
  e.preventDefault();
})


//API
async function checkData() {
  const options = {
    
  }
  try {
    loading.classList.remove("d-none");
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=08e06a3688dd4585be133144242006&q=${searchKeyword}&days=3`
    );
}
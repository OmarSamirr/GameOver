//Global Variables
const loginForm = document.forms[0];
const inputs = document.querySelectorAll("input");
const loading = document.querySelector(".loading");

//Events
loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  setForm();
});

//fuctions
function setForm() {
  const user = {
    first_name: inputs[0].value,
    last_name: inputs[1].value,
    email: inputs[2].value,
    password: inputs[3].value,
    age: inputs[4].value,
  };

  console.log(user);

  registerForm(user);
}

async function registerForm(userData) {
  //show loading screen
  loading.classList.remove("d-none");

  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  };

  try {
    const response = await fetch(
      `https://movies-api.routemisr.com/signup`,
      options
    );
    const content = await response.json();
    console.log(content);

    setInterval(function () {
        window.location = "./index.html";
      }, 1000);
  } catch (error) {
    alert(error);
  } finally {
    //remove loading screen
    loading.classList.add("d-none");
  }
}

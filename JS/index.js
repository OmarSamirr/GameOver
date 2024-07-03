//? Global Variables
const form = document.forms[0];
const inputs = document.querySelectorAll("input");
const loading = document.querySelector(".loading");
const errorMsg = document.getElementById("msg");

//! On Start
(function () {
  const icon = document.getElementById("mode");
  icon.addEventListener("click", function () {
    if (document.documentElement.dataset.theme == "dark") {
      document.documentElement.dataset.theme = "light";
      icon.classList.replace("fa-sun", "fa-moon");
      localStorage.setItem("theme", "light");
    } else if (document.documentElement.dataset.theme == "light") {
      document.documentElement.dataset.theme = "dark";
      icon.classList.replace("fa-moon", "fa-sun");
      localStorage.setItem("theme", "dark");
    }
  });
  if (localStorage.getItem("theme") !== null) {
    if (localStorage.getItem("theme") == "dark") {
      document.documentElement.dataset.theme = "dark";
      icon.classList.replace("fa-moon", "fa-sun");
    } else {
      document.documentElement.dataset.theme = "light";
      icon.classList.replace("fa-sun", "fa-moon");
    }
  }
})();


//? Events
form.addEventListener("submit", function (e) {
  e.preventDefault();

  setForm();
});

//! Fuctions
function setForm() {
  const user = {
    email: inputs[0].value,
    password: inputs[1].value,
  };

  console.log(user);

  if (validate(inputs[0]) && validate(inputs[1])) {
    loginForm(user);
  }
}

async function loginForm(userData) {
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
      `https://movies-api.routemisr.com/signin`,
      options
    );
    const content = await response.json();
    console.log(content);
    if (content.message == "success") {
      errorMsg.classList.add("text-success");
      errorMsg.classList.remove("text-danger");
      errorMsg.innerHTML = "success!";

      //Save token
      localStorage.setItem("token", content.token);
      //Go to home
      window.location = "./home.html";
    } else {
      errorMsg.classList.add("text-danger");
      errorMsg.classList.remove("text-success");
      errorMsg.innerHTML = content.message;
    }
  } catch (error) {
    alert(error);
  } finally {
    //remove loading screen
    loading.classList.add("d-none");
  }
}

//! Validation
function validate(element) {
  const text = element.value;
  const regex = {
    email:
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
    password: /^(?=.*[A-Za-z])[A-Za-z\d]{1,}$/,
  };
  if (regex[element.id].test(text)) {
    element.classList.remove("is-invalid");
    return true;
  } else {
    element.classList.add("is-invalid");
    return false;
  }
}

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
    first_name: inputs[0].value,
    last_name: inputs[1].value,
    email: inputs[2].value,
    password: inputs[3].value,
    age: inputs[4].value,
  };

  console.log(user);

  if (
    validate(inputs[0]) &&
    validate(inputs[1]) &&
    validate(inputs[2]) &&
    validate(inputs[3]) &&
    validate(inputs[4])
  ) {
    registerForm(user);
  }
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
    if (content.message == "success") {
      errorMsg.classList.add("text-success");
      errorMsg.classList.remove("text-danger");
      errorMsg.innerHTML = "Account created successfully!";

      //Go to login page
      setInterval(function () {
        window.location = "./index.html";
      }, 1000);
    } else {
      errorMsg.classList.add("text-danger");
      errorMsg.classList.remove("text-success");
      errorMsg.innerHTML = "E-mail already exists!";
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
    fName:
      /^(?:[a-zA-Z0-9\s@,=%$#&_\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){2,20}$/,
    lName:
      /^(?:[a-zA-Z0-9\s@,=%$#&_\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){2,20}$/,
    email:
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    age: /^([1-7][0-9]|80)$/,
  };
  if (regex[element.id].test(text)) {
    element.classList.remove("is-invalid");
    element.classList.add("is-valid");
    return true;
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    return false;
  }
}

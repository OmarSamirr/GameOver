//? Global
const params = location.search;
const id = new URLSearchParams(params).get("id");
let data = {};
const loading = document.querySelector(".loading");

//! Fuctions
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


(async function () {
  //show loading screen
  loading.classList.remove("d-none");

  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "f1cfef0f3amshe895472e92fccc0p1fa791jsn8b5b8fcb9c43",
      "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
    },
  };

  try {
    const api = await fetch(
      `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`,
      options
    );
    data = await api.json();
    console.log(data);
  } catch (error) {
    alert(error);
  }
  displayData();
  //remove loading screen
  loading.classList.add("d-none");
})();

function displayData() {
  const detailsBox = `
   
   <div class="col-md-4">
   <figure>
      <img src="${data.thumbnail}" class="w-100" alt="details image" />
   </figure>
</div>
<div class="col-md-8">

   <div>
      <nav aria-label="breadcrumb">
         <ol class="breadcrumb" class="text-light">
            <li class="breadcrumb-item text-reset"><a href="./home.html">Home</a></li>
            <li class="breadcrumb-item text-info" aria-current="page">${data.title}</li>
         </ol>
      </nav>

      <h1>${data.title}</h1>

      <h3>About ${data.title}</h3>
      <p>${data.description}</p>

      
   </div>
</div>

   `;
  document.getElementById("detailsData").innerHTML = detailsBox;
  const background = data.thumbnail.replace("thumbnail", "background");
  document.body.style.cssText = `
    background-image : url(${background});
    background-size: cover;
    background-position: center;`;
}

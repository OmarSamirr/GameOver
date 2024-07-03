//? Global Variables
const loading = document.querySelector(".loading");
const gameData = document.getElementById("gameData");
let data = [];

// Events
document.querySelectorAll(".menu .nav-link").forEach((link) => {
  link.addEventListener("click", function () {
    //remove active from current tab
    document.querySelector(".menu .active").classList.remove("active");
    //move active to new tab
    this.classList.add("active");
    const category = this.dataset.category;
    getGames(category);
  });
});

document.querySelector(".logout").addEventListener("click", function () {
  localStorage.removeItem("token");
  window.location = "./index.html";
});

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

getGames("mmorpg");

//! Functions
async function getGames(gameCategory) {
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
      `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${gameCategory}`,
      options
    );
    data = await api.json();
    console.log(data);
  } catch (error) {
    alert(error);
  } finally {
    //remove loading screen
    loading.classList.add("d-none");
  }
  displayData();
}

function displayData() {
  //show loading screen
  loading.classList.remove("d-none");

  gamesBox = "";
  for (let i = 0; i < data.length; i++) {
    //video path
    let videoPath = data[i].thumbnail.replace(
      "thumbnail.jpg",
      "videoplayback.webm"
    );

    gamesBox += `<div class="col">
                  <div onclick="getDetails(${data[i].id})" onmouseenter="playVideo(event)" onmouseleave="pauseVideo(event)" class="card h-100 bg-transparent" role="button">
                     <div class="card-body">
                        <figure class="position-relative">
                           <img class="card-img-top object-fit-cover h-100" src="${data[i].thumbnail}" />
            
                         <video muted="true"  preload="none" loop   class="w-100 d-none h-100 position-absolute top-0 start-0 z-3">
                          <source src="${videoPath}">
                          </video>
            
                        </figure>
            
                        <figcaption>
            
                           <div class="hstack justify-content-between">
                              <h3 class="h6 small">${data[i].title}</h3>
                              <span class="badge text-bg-primary p-2">Free</span>
                           </div>
            
                           <div class="hstack">
                           <p class="card-text small text-center opacity-50">
                           ${data[i].short_description}
                           </p>
                           </div>
            
                        </figcaption>
                     </div>
            
                     <footer class="card-footer small hstack justify-content-between">
            
                        <span class="badge badge-color">${data[i].genre}</span>
                        <span class="badge badge-color">${data[i].platform}</span>
            
                     </footer>
                     </div>
                  </div>`;
  }
  gameData.innerHTML = gamesBox;

  //remove loading screen
  loading.classList.add("d-none");
}

function playVideo(event) {
  let video = event.target.querySelector("video");
  video.classList.remove("d-none");
  video.play();
}
function pauseVideo(event) {
  let video = event.target.querySelector("video");
  video.classList.add("d-none");
  video.pause();
}

function getDetails(id) {
  window.location = `./details.html?id=${id}`;
}

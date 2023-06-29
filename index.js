// Intializing all elements constants
const temperateField = document.querySelector(".weather1");
const cityField = document.querySelector(".weather2 p");
const dateField = document.querySelector(".weather2 span");
const emojiField = document.querySelector(".weather3 img");
const weatherField = document.querySelector(".weather3 span");
const searchField = document.querySelector(".searchField");
const form = document.querySelector("form");

// Adding event Listen to the form
form.addEventListener("submit", search);

// Default Location
let target = "Bhubaneswar";

// Function to fetch Data from weather API
const fetchData = async (target) => {
  try {
    const url = `https://api.weatherapi.com/v1/current.json?key=caaf3ef091ed4390b5c50945232504&q=${target}`;

    const response = await fetch(url);
    const data = await response.json();

// Destructring
    const {
      current: {
        temp_c,
        condition: { text, icon },
      },
      location: { name, localtime },
    } = data;

// Calling update Dom Function
    updateDom(temp_c, name, localtime, icon, text);
  } catch (error) {
    alert("Location not found");
  }
};

// Function to update Dom
function updateDom(temperate, city, time, emoji, text) {
  const exactTime = time.split(" ")[1];
  const exactDate = time.split(" ")[0];
  const exactDay = getDayFullName(new Date(exactDate).getDay());

  temperateField.innerText = temperate;
  cityField.innerText = city;
  dateField.innerText = `${exactTime} - ${exactDay} - ${exactDate}`;
  emojiField.src = emoji;
  weatherField.innerText = text;
}

fetchData(target);


// Function to search the Location
function search  (e) {
  e.preventDefault();

  target = searchField.value;

  fetchData(target);
};


// Function to get name of day
// function getDayFullName(num) {
//     switch (num) {
//       case 0:
//         return "Sunday";
  
//       case 1:
//         return "Monday";
  
//       case 2:
//         return "Tuesday";
  
//       case 3:
//         return "Wednesday";
  
//       case 4:
//         return "Thursday";
  
//       case 5:
//         return "Friday";
  
//       case 6:
//         return "Saturday";
  
//       default:
//         return "Don't Know";
//     }
//   }

function getDayFullName(num) {
  const dayMap = new Map([
    [0, "Sunday"],
    [1, "Monday"],
    [2, "Tuesday"], 
    [3, "Wednesday"],
    [4, "Thursday"],
    [5, "Friday"],
    [6, "Saturday"]
  ]);

  return dayMap.has(num) ? dayMap.get(num) : "Don't Know";
}
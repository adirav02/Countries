let regionFilter = "All";
let countries = [];

// fetch countries from CountriesData
const fetchCountries = async () => {
  try {
    const res = await fetch("CountriesData.json");
    if (!res.ok) {
      throw new Error("Error Fetching Countries");
    }
    countries = await res.json();
    renderCountries(countries);
  } catch (e) {
    console.error(e);
  }
};

// Region Filter Handlers

// Open/close the filter selection
const onRegionFilterWrapperClick = () => {
  document.querySelector(".dropdown-wrapper").classList.toggle("open");
};

// Choose region to filter
const onRegionFIlterChange = (e) => {
  regionFilter = e.target.getAttribute("data-region");
  updateUi();
};

// Update UI
const updateUi = () => {
  // Filter Dropdown Label
  document.querySelector(".dropdown-header span").textContent =
    capitalizeFirstLetter(regionFilter);
  // Render Countries
  if (regionFilter.trim().toLowerCase() === "all") {
    renderCountries(countries);
  } else {
    if (regionFilter !== "All") {
      console.log("countries", countries);
      const filteredCountries = countries.filter(
        (country) =>
          country.region.toLowerCase() === regionFilter.trim().toLowerCase()
      );
      renderCountries(filteredCountries);
    }
  }
};

// Render countries - after fetch and filters
const renderCountries = (countriesList) => {
  const countriesGrid = document.querySelector(".countries-grid");
  countriesGrid.innerHTML = "";
  countriesList.forEach((country) => {
    countriesGrid.innerHTML += `
        <div class="country scale-effect" data-country-name="${country.name}">
            <div class="country-flag">
            <img src="${country.flag}" alt="${country.name} Flag" />
          </div>
          <div class="country-info">
            <h2 class="country-title">${country.name}</h2>
            <ul class="country-brief">
              <li><strong>Population: </strong>${country.population}</li>
              <li><strong>Region: </strong>${country.region}</li>
              <li><strong>Capital: </strong>${country.capital}</li>
            </ul>
          </div>
        </div>
        `;
  });
};

const onCountryItemClick = (e) => {
  const countryElement = e.target.closest(".country");
  if (countryElement) {
    const countryName = countryElement.dataset.countryName;
    const url = `details.html?country=${countryName}`;
    window.location.assign(url);
  }
};

// Capitalize first letter in the filter selection
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// Start at run time
fetchCountries();

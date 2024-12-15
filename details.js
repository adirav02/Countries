const urlParams = new URLSearchParams(window.location.search);
let selectedCountry;

const getCountry = async () => {
  const countryName = urlParams.get("country");
  try {
    const res = await fetch("CountriesData.json");
    if (!res.ok) {
      throw new Error("Error Fetching Countries");
    }
    const countries = await res.json();
    selectedCountry = countries.find(
      (country) => country.name.toLowerCase() === countryName.toLowerCase()
    );

    if (selectedCountry) {
      console.log(selectedCountry);
      updateUi();
    } else {
      throw new Error("Country Not Found");
    }
  } catch (e) {
    console.error(e);
  }
};

const updateUi = () => {
  document.querySelector("#country-name").textContent = selectedCountry.name;
  document.querySelector(".loader").style.display = "none";
};

getCountry();

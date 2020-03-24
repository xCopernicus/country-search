'use strict';

const select = {
  templateOf: {
    country: '#template-country',
  },
  info: {
    country: 'td.country',
    currency: 'td.currency',
    region: 'td.region',
    flag: 'td.flag',
  },
  countryContainer: '.country-container',
  search: {
    field: 'input.input-search',
    btn: 'button.btn-search',
  },
};

const templates = {
  country: Handlebars.compile(document.querySelector(select.templateOf.country).innerHTML),
};

class CountryGenerate {
  constructor(data) {
    this.data = data;
    this.getElements();
    this.generate();
  }

  getElements() {
    this.countryContainer = document.querySelector(select.countryContainer);
  }

  generate() {
    const info = {countries: {}};

    for (const country of this.data) {
      const countryName = country.name.toLowerCase();
      info.countries[countryName] = {};
      info.countries[countryName].name = country.name;
      info.countries[countryName].currency = country.currencies[0].name;
      info.countries[countryName].region = country.region;
      info.countries[countryName].flag = country.flag;
    }

    this.countryContainer.innerHTML = templates.country(info);
  }
}


const app = {
  init: function() {
    const searchField = document.querySelector(select.search.field);
    const searchButton = document.querySelector(select.search.btn);

    searchButton.addEventListener('click', function(event) {
      event.preventDefault();
      app.getData(searchField.value);
    });
  },

  getData: function(searchValue) {
    const url = 'https://restcountries.eu/rest/v2/name/' + searchValue;
    console.log(url);

    fetch(url)
      .then(function(rawResponse){
        return rawResponse.json();
      })
      .then(function(parsedResponse){
        console.log('parsedResponse: ', parsedResponse);

        app.data = parsedResponse;
        new CountryGenerate(app.data);
      })
      .catch(function() {
        alert('Error! Enter a name of a country');
      });
  }
};

app.init();

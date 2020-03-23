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
}

const templates = {
  country: Handlebars.compile(document.querySelector(select.templateOf.country).innerHTML),
};

class CountryGenerate {
  constructor(id) {
    this.id = id;
    this.getData();
    this.getElements();
    this.data = {};
  }

  getElements() {
    this.countryContainer = document.querySelector(select.countryContainer);
  }


  getData() {
    const thisCountryGenerate = this;
    const url = 'https://restcountries.eu/rest/v2/name/' + this.id;
    console.log(url);


    fetch(url)
      .then(function(rawResponse){
        return rawResponse.json();
      })
      .then(function(parsedResponse){
        console.log('parsedResponse: ', parsedResponse);

        thisCountryGenerate.data = parsedResponse[0];
        thisCountryGenerate.generate();
      });
  }

  generate() {
      const info = {
        name: this.data.name,
        currency: this.data.currencies[0].name,
        region: this.data.region,
        flag: this.data.flag,
      }
    this.countryContainer.innerHTML = templates.country(info);
  }
}


const app = {
  init: function() {
    const searchButton = document.querySelector(select.search.btn);
    const searchField = document.querySelector(select.search.field);

    searchButton.addEventListener('click', function(event) {
      event.preventDefault();
      new CountryGenerate(searchField.value)
    });
  }
}

app.init();

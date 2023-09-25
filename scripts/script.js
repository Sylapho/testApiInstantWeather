
let codePostal = document.getElementById('codePostal');
let boutonValidation = document.getElementById('validation');
let tempMax = document.getElementById('tempMax');
let tempMin = document.getElementById('tempMin');
let probaPluie = document.getElementById('probaPluie');
let heureSoleil = document.getElementById('heureSoleil');
let nomVille = document.getElementById('nomVille');
let labelCommuneSelect = document.getElementById('labelCommuneSelect');

let codeInsee;
let selectedCommune
const communeSelect = document.getElementById('communeSelect')

boutonValidation.style.display = 'none';
communeSelect.style.display = 'none';
labelCommuneSelect.style.display = 'none';

codePostal.addEventListener('input', () => {
  communeSelect.style.display = 'none';
  let valeurCodePostal = codePostal.value
  if (/^\d{5}$/.test(valeurCodePostal)) {
    if(valeurCodePostal === 75000 || 13000 || 69000)
    boutonValidation.style.display = 'inline-flex';
    
    fetch(`https://geo.api.gouv.fr/communes?codePostal=${valeurCodePostal}`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        if (data && data.length === 1) {
          communeSelect.style.display = 'inline-flex'
          communeSelect.innerHTML = ''
          let choix = document.createElement('option');
          choix.value = data[0].code;
          choix.textContent = data[0].nom;
          communeSelect.appendChild(choix);

          communeSelect.style.display = "inline-flex"
        } else if (data && data.length > 1) {
          labelCommuneSelect.style.display = 'inline-flex';
          for (let i = 0; i < data.length; i++) {

            communeSelect.style.display = 'inline-flex'
            communeSelect.innerHTML = ''
            data.forEach(commune => {
              let choix = document.createElement('option')
              choix.value = commune.code
              choix.textContent = commune.nom
              communeSelect.appendChild(choix)
              communeSelect.style.display = "inline-flex"
            })
          }
        }
      })

      .catch(error => {
        console.error('Erreur lors de la requête API:', error)
      })
  } else {
    boutonValidation.style.display = 'none';
  }
})

boutonValidation.addEventListener('click', () => {
  communeSelect.style.display = 'none'
  boutonValidation.style.display = 'none';
  labelCommuneSelect.style.display = 'none';
  selectedCommune = communeSelect.value
  fetch(`https://api.meteo-concept.com/api/forecast/daily/0?token=4bba169b3e3365061d39563419ab23e5016c0f838ba282498439c41a00ef1091&insee=${selectedCommune}`)
    .then(response => response.json())
    .then(data => {
      nomVille.textContent = data.city.name;
      console.log('Détails de la commune sélectionnée:', data)
      tempMax.textContent = 'Température maximale : ' + data.forecast.tmax + '°C';
      tempMin.textContent = 'Température minimale : ' + data.forecast.tmin + '°C'
      probaPluie.textContent = 'Probabilité de pluie : ' + data.forecast.probarain + ' %'
      heureSoleil.textContent = 'Ensoleillement : ' + data.forecast.sun_hours + ' heures'
    })
    .catch(error => {
      console.error('Erreur lors de la requête API:', error)
    })
});

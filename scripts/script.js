let section = document.getElementById("weatherSection");
let codePostal = document.getElementById('codePostal');
let boutonValidation = document.getElementById('validation');
let tempMax = document.getElementById('tempMax');
let tempMin = document.getElementById('tempMin');
let probaPluie = document.getElementById('probaPluie');
let heureSoleil = document.getElementById('heureSoleil');
let nomVille = document.getElementById('nomVille');
let labelCommuneSelect = document.getElementById('labelCommuneSelect');
let nbJours = document.getElementById("nbJours");
let latitude = document.getElementById('op1')
let longitude = document.getElementById('op2')
let cumulPluie = document.getElementById('op3')
let ventMoyen = document.getElementById('op4')
let directionVent = document.getElementById('op5')





let codeInsee;
let selectedCommune
const communeSelect = document.getElementById('communeSelect')

boutonValidation.style.display = 'none';
communeSelect.style.display = 'none';
labelCommuneSelect.style.display = 'none';

nbJours.addEventListener('change', () => {
  
  let valeurCodePostal = codePostal.value
  if (nbJours.value >= 7) {
    nbJours.textContent = 7;
    nbJours.value = 7;
  }
  if (/^\d{5}$/.test(valeurCodePostal)) {
    labelCommuneSelect.style.display = 'inline-flex';
    communeSelect.style.display = "inline-flex"
    boutonValidation.style.display = 'inline-flex';
  }
})

codePostal.addEventListener('input', () => {

  communeSelect.style.display = 'none';
  labelCommuneSelect.style.display = 'none';
  let valeurCodePostal = codePostal.value
  if (/^\d{5}$/.test(valeurCodePostal)) {
    if (valeurCodePostal === 75000 || 13000 || 69000)
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
          labelCommuneSelect.style.display = 'inline-flex';
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
              communeSelect.appendChild(choix);
            })
          }
        } else {
          boutonValidation.style.display = 'none';
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
  fetch(`https://api.meteo-concept.com/api/forecast/daily?token=4bba169b3e3365061d39563419ab23e5016c0f838ba282498439c41a00ef1091&insee=${selectedCommune}`)
    .then(response => response.json())
    .then(data => {
      nomVille.textContent = data.city.name;
      console.log('Détails de la commune sélectionnée:', data)
      while (section.firstChild) {
        section.removeChild(section.firstChild);
      }

      for (let i = 0; i < nbJours.value; i++) {
        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
          if (nbJours.value == 1) {
            section.style.marginLeft = "23%";
            section.style.display = "grid";
            section.style.gridTemplateColumns = "0.25fr 0.25fr"
            section.style.gap = "50px";
            section.style.fontSize = "20px";
          } else {
            section.style.marginLeft = "0%";
            section.style.display = "grid";
            section.style.gridTemplateColumns = "0.25fr 0.25fr"
            section.style.gap = "0%";
            section.style.fontSize = "20px";
          }

        }else{
          if (nbJours.value == 1) {
            section.style.marginLeft = "43%";
            section.style.display = "grid";
            section.style.gridTemplateColumns = "0.25fr 0.25fr"
            section.style.gap = "50px";
            section.style.fontSize = "20px";
          } else {
            section.style.marginLeft = "33%";
            section.style.display = "grid";
            section.style.gridTemplateColumns = "0.25fr 0.25fr"
            section.style.gap = "50px";
            section.style.fontSize = "20px";
          }
        }
        
        weatherCard(data, i);
      }
    })
    .catch(error => {
      console.error('Erreur lors de la requête API:', error)
    })
});

latitude.addEventListener('change', () => {
  let valeurCodePostal = codePostal.value
  if (/^\d{5}$/.test(valeurCodePostal)) {
    labelCommuneSelect.style.display = 'inline-flex';
    communeSelect.style.display = "inline-flex"
    boutonValidation.style.display = 'inline-flex';
  }
})

longitude.addEventListener('change', () => {
  let valeurCodePostal = codePostal.value
  if (/^\d{5}$/.test(valeurCodePostal)) {
    labelCommuneSelect.style.display = 'inline-flex';
    communeSelect.style.display = "inline-flex"
    boutonValidation.style.display = 'inline-flex';
  }
})

cumulPluie.addEventListener('change', () => {
  let valeurCodePostal = codePostal.value
  if (/^\d{5}$/.test(valeurCodePostal)) {
    labelCommuneSelect.style.display = 'inline-flex';
    communeSelect.style.display = "inline-flex"
    boutonValidation.style.display = 'inline-flex';
  }
})

ventMoyen.addEventListener('change', () => {
  let valeurCodePostal = codePostal.value
  if (/^\d{5}$/.test(valeurCodePostal)) {
    labelCommuneSelect.style.display = 'inline-flex';
    communeSelect.style.display = "inline-flex"
    boutonValidation.style.display = 'inline-flex';
  }
})

directionVent.addEventListener('change', () => {
  let valeurCodePostal = codePostal.value
  if (/^\d{5}$/.test(valeurCodePostal)) {
    labelCommuneSelect.style.display = 'inline-flex';
    communeSelect.style.display = "inline-flex"
    boutonValidation.style.display = 'inline-flex';
  }
})
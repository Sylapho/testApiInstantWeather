let codePostal = document.getElementById('codePostal');
let test = document.getElementById('test');
let codePostal2 = document.getElementById('codePostalVoulu');
let codeInsee;

const communeSelect = document.getElementById('communeSelect')

codePostal.addEventListener('input', () => {
    let valeurCodePostal = codePostal.value
    if (/^\d{5}$/.test(valeurCodePostal)) {
      fetch(`https://geo.api.gouv.fr/communes?codePostal=${valeurCodePostal}`)
        .then(response => response.json())
        .then(data => {
          console.log(data)
          if (data && data.length === 1) {
            //console.log(data)
            //console.log(data[0].code);
            codeInsee = data[0].code;
          } else if (data && data.length > 1) {
            for(let i = 0; i < data.length; i++){
                // console.log(data[i]);
                communeSelect.style.display = 'block'
                communeSelect.innerHTML = ''
                data.forEach(commune => {
                let choix = document.createElement('option')
                choix.value = commune.code
                choix.textContent = commune.nom
                communeSelect.appendChild(choix)
            })
          }
        }
        })
        
        .catch(error => {
          console.error('Erreur lors de la requête API:', error)
        })
    } else {
      //console.log('format invalide')
    }
    // affichageCodeInsee();
  })


   
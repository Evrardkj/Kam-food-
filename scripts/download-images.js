const fs = require('fs');
const path = require('path');
const https = require('https');

const images = [
  ['ndole.jpg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Ndol%C3%A9_camerounais.JPG/960px-Ndol%C3%A9_camerounais.JPG'],
  ['ndole_crevettes.jpg', 'https://upload.wikimedia.org/wikipedia/commons/9/91/Ndol%C3%A8_%C3%A0_la_viande%2C_morue_et_crevettes.jpg'],
  ['poulet_dg.jpg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Poulet_GD_%28fried_chicken_with_ripe_plantains_and_mixed_vegetables%29.jpg/960px-Poulet_GD_%28fried_chicken_with_ripe_plantains_and_mixed_vegetables%29.jpg'],
  ['eru.jpg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Le_Eru%2C_un_plat_camerounais.jpg/960px-Le_Eru%2C_un_plat_camerounais.jpg'],
  ['garri_eru.jpg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Garri_and_Eru.jpg/960px-Garri_and_Eru.jpg'],
  ['water_fufu_eru.jpg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Water_fufu_and_Eru.jpg/960px-Water_fufu_and_Eru.jpg'],
  ['achu.jpg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Achu_meal.jpg/960px-Achu_meal.jpg'],
  ['taro.jpg', 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1d/Taro_sauce_jaune_avec_peau_de_boeuf.jpg/960px-Taro_sauce_jaune_avec_peau_de_boeuf.jpg'],
  ['koki.jpg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Koki_Beans.jpg/960px-Koki_Beans.jpg'],
  ['koki_plantain.jpg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Koki_and_ripe_plantains.jpg/500px-Koki_and_ripe_plantains.jpg'],
  ['kwacoco.jpg', 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ed/Kwacoco_bible.jpg/960px-Kwacoco_bible.jpg'],
  ['kati_kati.jpg', 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ec/Kati_kati_cameroun.jpg/960px-Kati_kati_cameroun.jpg'],
  ['fufu_kati.jpg', 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/35/Fufu_corn_and_khati_khati.jpg/500px-Fufu_corn_and_khati_khati.jpg'],
  ['poisson_braise.jpg', 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f8/Poisson_brais%C3%A9_et_fleur_de_citron..JPG/960px-Poisson_brais%C3%A9_et_fleur_de_citron..JPG'],
  ['sanga.jpg', 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7c/Sanga%2C_Plat_camerounais.jpg/960px-Sanga%2C_Plat_camerounais.jpg'],
  ['mbongo.jpg', 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1b/Mbongo_Tchobi_%28sauce_noir%29.jpg/960px-Mbongo_Tchobi_%28sauce_noir%29.jpg'],
  ['ndomba_poulet.jpg', 'https://upload.wikimedia.org/wikipedia/commons/1/1c/Ndomba_de_poulet.jpg'],
  ['ndomba_porc.jpg', 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/89/Ndomba_de_porc_et_frites_de_plantain_m%C3%BBr.jpg/330px-Ndomba_de_porc_et_frites_de_plantain_m%C3%BBr.jpg'],
  ['suya.jpg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Soya_or_Suya.jpg/500px-Soya_or_Suya.jpg'],
  ['nnam_ngon.jpg', 'https://upload.wikimedia.org/wikipedia/commons/6/69/Le_mets_de_pistache_%28Nnam_ngon%29.jpg'],
  ['mintumba.jpg', 'https://upload.wikimedia.org/wikipedia/commons/a/a7/Mintumba.jpg']
];

const dir = path.join(process.cwd(), 'assets', 'recipes');
fs.mkdirSync(dir, { recursive: true });

function download(url, destination) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destination);

    https.get(url, {
  headers: {
    'User-Agent': 'CamFood/1.0 (Cameroon recipe app)'
  }
}, response => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        file.close();
        fs.unlinkSync(destination);
        return download(response.headers.location, destination)
          .then(resolve)
          .catch(reject);
      }

      if (response.statusCode !== 200) {
        file.close();
        fs.unlinkSync(destination);
        return reject(new Error(`HTTP ${response.statusCode}: ${url}`));
      }

      response.pipe(file);

      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', error => {
      file.close();
      if (fs.existsSync(destination)) fs.unlinkSync(destination);
      reject(error);
    });
  });
}

(async () => {
  for (const [name, url] of images) {
    const destination = path.join(dir, name);
    console.log(`Téléchargement: ${name}`);
    await download(url, destination);
  }

  console.log('21 images téléchargées avec succès.');
})();

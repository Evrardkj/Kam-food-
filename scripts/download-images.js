const fs = require('fs');
const path = require('path');
const https = require('https');

const images = [
  ['ndole.jpg', 'File:Ndolé camerounais.JPG'],
  ['ndole_crevettes.jpg', 'File:Ndolè à la viande, morue et crevettes.jpg'],
  ['poulet_dg.jpg', 'File:Poulet GD (fried chicken with ripe plantains and mixed vegetables).jpg'],
  ['eru.jpg', 'File:Le Eru, un plat camerounais.jpg'],
  ['garri_eru.jpg', 'File:Garri and Eru.jpg'],
  ['water_fufu_eru.jpg', 'File:Water fufu and Eru.jpg'],
  ['achu.jpg', 'File:Achu meal.jpg'],
  ['taro.jpg', 'File:Taro sauce jaune avec peau de boeuf.jpg'],
  ['koki.jpg', 'File:Koki Beans.jpg'],
  ['koki_plantain.jpg', 'File:Koki and ripe plantains.jpg'],
  ['kwacoco.jpg', 'File:Kwacoco bible.jpg'],
  ['kati_kati.jpg', 'File:Kati kati cameroun.jpg'],
  ['fufu_kati.jpg', 'File:Fufu corn and khati khati.jpg'],
  ['poisson_braise.jpg', 'File:Poisson braisé et fleur de citron..JPG'],
  ['sanga.jpg', 'File:Sanga, Plat camerounais.jpg'],
  ['mbongo.jpg', 'File:Mbongo Tchobi (sauce noir).jpg'],
  ['ndomba_poulet.jpg', 'File:Ndomba de poulet.jpg'],
  ['ndomba_porc.jpg', 'File:Ndomba de porc et frites de plantain mûr.jpg'],
  ['suya.jpg', 'File:Soya or Suya.jpg'],
  ['nnam_ngon.jpg', 'File:Le mets de pistache (Nnam ngon).jpg'],
  ['mintumba.jpg', 'File:Mintumba.jpg']
];

const dir = path.join(process.cwd(), 'assets', 'recipes');
fs.mkdirSync(dir, { recursive: true });

function requestJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'CamFood/1.0 (Cameroon recipe app)'
      }
    }, response => {
      let data = '';

      response.on('data', chunk => {
        data += chunk;
      });

      response.on('end', () => {
        if (response.statusCode !== 200) {
          return reject(
            new Error(`API HTTP ${response.statusCode}`)
          );
        }

        try {
          resolve(JSON.parse(data));
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', reject);
  });
}

function download(url, destination, attempt = 0) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destination);

    https.get(url, {
      headers: {
        'User-Agent': 'CamFood/1.0 (Cameroon recipe app)'
      }
    }, response => {

      if (response.statusCode === 429) {
        file.close();

        if (fs.existsSync(destination)) {
          fs.unlinkSync(destination);
        }

        response.resume();

        if (attempt >= 3) {
          return reject(
            new Error(`HTTP 429 après plusieurs tentatives: ${url}`)
          );
        }

        const retryAfter =
          Number(response.headers['retry-after']) || 15;

        console.log(
          `Limite Wikimedia. Nouvelle tentative dans ${retryAfter}s...`
        );

        setTimeout(() => {
          download(url, destination, attempt + 1)
            .then(resolve)
            .catch(reject);
        }, retryAfter * 1000);

        return;
      }

      if (
        response.statusCode >= 300 &&
        response.statusCode < 400 &&
        response.headers.location
      ) {
        file.close();

        if (fs.existsSync(destination)) {
          fs.unlinkSync(destination);
        }

        return download(
          response.headers.location,
          destination,
          attempt
        )
          .then(resolve)
          .catch(reject);
      }

      if (response.statusCode !== 200) {
        file.close();

        if (fs.existsSync(destination)) {
          fs.unlinkSync(destination);
        }

        return reject(
          new Error(`HTTP ${response.statusCode}: ${url}`)
        );
      }

      response.pipe(file);

      file.on('finish', () => {
        file.close(resolve);
      });

    }).on('error', error => {
      file.close();

      if (fs.existsSync(destination)) {
        fs.unlinkSync(destination);
      }

      reject(error);
    });
  });
}

async function getImageUrl(title) {
  const params = new URLSearchParams({
    action: 'query',
    format: 'json',
    prop: 'imageinfo',
    titles: title,
    iiprop: 'url',
    iiurlwidth: '960'
  });

  const apiUrl =
    `https://commons.wikimedia.org/w/api.php?${params.toString()}`;

  const data = await requestJson(apiUrl);

  const pages = data?.query?.pages || {};

  for (const page of Object.values(pages)) {
    if (page.imageinfo && page.imageinfo[0]) {
      const sourceUrl =
  page.imageinfo[0].thumburl ||
  page.imageinfo[0].url;

return `https://wsrv.nl/?url=${encodeURIComponent(sourceUrl)}&w=960&q=85&output=jpg`;
      
    }
  }

  throw new Error(`Image introuvable: ${title}`);
}

(async () => {
  for (const [name, title] of images) {
    const destination = path.join(dir, name);

    console.log(`Recherche Wikimedia: ${title}`);

    const imageUrl = await getImageUrl(title);

    console.log(`Téléchargement: ${name}`);

    await download(imageUrl, destination);

    console.log(`OK: ${name}`);
  }

  console.log('');
  console.log('21 images téléchargées avec succès');
})();

      

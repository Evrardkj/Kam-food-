# Cam Food — React Native + Expo

Application mobile camerounaise de recettes.

## Inclus
- Accueil, recherche et filtres par région
- Recettes d'exemple avec photos
- Ingrédients + préparation étape par étape
- Lecture audio avec Text-to-Speech
- Vidéo sur une recette de démonstration
- Favoris et liste de courses sauvegardés sur le téléphone
- Partage d'une recette
- Configuration EAS pour APK Android

## Installation
Avec Node.js LTS :

```bash
npm install
npx expo start
```

APK Android :

```bash
npx eas-cli@latest login
npx eas-cli@latest build -p android --profile preview
```

Google Play (AAB) :

```bash
npx eas-cli@latest build -p android --profile production
```

Les images et la vidéo sont des exemples distants. Remplace-les par des médias dont tu as les droits avant publication commerciale. Les recettes sont une base de démonstration et doivent être complétées/vérifiées.

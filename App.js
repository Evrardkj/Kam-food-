import React, { useMemo, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  TextInput,
  Pressable,
  Modal,
  Image,
  StatusBar,
  Alert,
  Share,
} from 'react-native';


const COLORS = {
  primary: '#E85D04',
  primaryDark: '#C94D00',
  cream: '#FFF8F0',
  white: '#FFFFFF',
  dark: '#202020',
  gray: '#777777',
  light: '#F2F2F2',
  green: '#2D8A4E',
  red: '#D62828',
  yellow: '#F4A261',
};

const RECIPES = [
    {
    id: '1',
    name: 'Ndolé',
    region: 'Littoral',
    category: 'Plats',
    time: '60 min',
    rating: '4.9',
    emoji: '🥬',
    image:
      'https://commons.wikimedia.org/wiki/Special:Redirect/file/Ndol%C3%A9%20camerounais.JPG',
    description:
      'Plat camerounais à base de feuilles de ndolé, pâte d’arachide, viande et crevettes.',
    ingredients: [
      'Feuilles de ndolé',
      'Arachides',
      'Viande de bœuf',
      'Crevettes',
      'Oignon',
      'Ail',
      'Huile',
      'Sel',
    ],
    preparation: [
      'Nettoyer et faire bouillir les feuilles de ndolé.',
      'Cuire la viande et les crevettes.',
      'Préparer la pâte d’arachides.',
      'Faire revenir l’oignon et l’ail.',
      'Ajouter les feuilles et les arachides.',
      'Ajouter la viande et les crevettes puis laisser mijoter.',
    ],
  },

  {
    id: '2',
    name: 'Poulet DG',
    region: 'Littoral',
    category: 'Plats',
    time: '55 min',
    rating: '4.8',
    emoji: '🍗',
    image:
      'https://commons.wikimedia.org/wiki/Special:Redirect/file/Poulet%20GD%20%28fried%20chicken%20with%20ripe%20plantains%20and%20mixed%20vegetables%29.jpg',
    description:
      'Poulet accompagné de plantains mûrs frits et de légumes.',
    ingredients: [
      'Poulet',
      'Bananes plantains mûres',
      'Carottes',
      'Haricots verts',
      'Poivron',
      'Tomates',
      'Oignon',
      'Ail',
      'Gingembre',
      'Huile',
    ],
    preparation: [
      'Découper et assaisonner le poulet.',
      'Faire dorer le poulet.',
      'Éplucher et frire les plantains.',
      'Faire revenir les légumes.',
      'Ajouter le poulet et les légumes.',
      'Ajouter les plantains et laisser mijoter quelques minutes.',
    ],
  },

  {
    id: '3',
    name: 'Eru',
    region: 'Sud-Ouest',
    category: 'Plats',
    time: '70 min',
    rating: '4.9',
    emoji: '🌿',
    image:
      'https://commons.wikimedia.org/wiki/Special:Redirect/file/Le%20Eru%2C%20un%20plat%20camerounais.jpg',
    description:
      'Mélange traditionnel de feuilles d’eru et de waterleaf avec viande, poisson fumé et huile de palme.',
    ingredients: [
      'Eru',
      'Waterleaf',
      'Viande',
      'Poisson fumé',
      'Crevettes',
      'Huile de palme',
      'Piment',
      'Sel',
    ],
    preparation: [
      'Nettoyer et découper les feuilles.',
      'Cuire la viande et le poisson fumé.',
      'Ajouter le waterleaf.',
      'Ajouter progressivement l’eru.',
      'Ajouter les crevettes et l’huile de palme.',
      'Laisser mijoter puis servir avec du water fufu.',
    ],
  },

  {
    id: '4',
    name: 'Koki',
    region: 'Ouest',
    category: 'Plats',
    time: '90 min',
    rating: '4.7',
    emoji: '🫘',
    image:
      'https://commons.wikimedia.org/wiki/Special:Redirect/file/Koki%20Beans.jpg',
    description:
      'Gâteau traditionnel de haricots cuit à la vapeur avec de l’huile de palme.',
    ingredients: [
      'Haricots cornille',
      'Huile de palme',
      'Piment',
      'Oignon',
      'Sel',
      'Eau',
      'Feuilles de bananier',
    ],
    preparation: [
      'Tremper les haricots puis retirer leur peau.',
      'Mixer les haricots avec un peu d’eau.',
      'Ajouter l’huile de palme, le piment et le sel.',
      'Verser la pâte dans les feuilles de bananier.',
      'Fermer les paquets.',
      'Cuire à la vapeur jusqu’à complète cuisson.',
    ],
  },

  {
    id: '5',
    name: 'Achu sauce jaune',
    region: 'Nord-Ouest',
    category: 'Plats',
    time: '75 min',
    rating: '4.8',
    emoji: '🥔',
    image:
      'https://commons.wikimedia.org/wiki/Special:Redirect/file/Achu%20and%20Yellow%20Soup%20with%20vegetable.jpg',
    description:
      'Taro pilé accompagné de la traditionnelle sauce jaune.',
    ingredients: [
      'Taro',
      'Huile de palme',
      'Épices',
      'Viande',
      'Peau de bœuf',
      'Poisson fumé',
      'Piment',
      'Sel',
    ],
    preparation: [
      'Cuire le taro jusqu’à ce qu’il soit tendre.',
      'Piler le taro pour obtenir une pâte lisse.',
      'Préparer la sauce jaune avec l’huile de palme et les épices.',
      'Ajouter la viande et le poisson.',
      'Laisser mijoter.',
      'Servir la sauce avec le taro.',
    ],
  },

  {
    id: '6',
    name: 'Poisson braisé',
    region: 'Littoral',
    category: 'Grillades',
    time: '40 min',
    rating: '4.9',
    emoji: '🐟',
    image:
      'https://commons.wikimedia.org/wiki/Special:Redirect/file/Poisson%20brais%C3%A9%20et%20fleur%20de%20citron..JPG',
    description:
      'Poisson mariné aux aromates puis braisé au feu.',
    ingredients: [
      'Poisson entier',
      'Ail',
      'Gingembre',
      'Oignon',
      'Piment',
      'Poivre',
      'Citron',
      'Sel',
      'Huile',
    ],
    preparation: [
      'Nettoyer et inciser le poisson.',
      'Préparer une marinade avec les épices.',
      'Mariner le poisson.',
      'Faire braiser sur le grill.',
      'Retourner régulièrement.',
      'Servir avec plantain, miondo ou bâtons de manioc.',
    ],
  },

  {
    id: '7',
    name: 'Mbongo Tchobi',
    region: 'Littoral',
    category: 'Plats',
    time: '65 min',
    rating: '4.8',
    emoji: '🍲',
    image:
      'https://commons.wikimedia.org/wiki/Special:Redirect/file/Le%20Mbongo%20de%20machoiron%2C%20un%20plat%20camerounais.jpg',
    description:
      'Poisson mijoté dans une sauce noire parfumée aux épices traditionnelles.',
    ingredients: [
      'Poisson',
      'Épices mbongo',
      'Tomates',
      'Oignon',
      'Ail',
      'Gingembre',
      'Huile',
      'Sel',
    ],
    preparation: [
      'Nettoyer et assaisonner le poisson.',
      'Préparer et écraser les épices.',
      'Faire revenir l’oignon et l’ail.',
      'Ajouter les tomates et les épices.',
      'Ajouter le poisson.',
      'Couvrir et laisser mijoter doucement.',
    ],
  },

  {
    id: '8',
    name: 'Sanga',
    region: 'Centre',
    category: 'Plats',
    time: '90 min',
    rating: '4.7',
    emoji: '🌽',
    image:
      'https://commons.wikimedia.org/wiki/Special:Redirect/file/Sanga%2C%20Plat%20camerounais.jpg',
    description:
      'Préparation traditionnelle associant maïs, feuilles vertes et jus de noix de palme.',
    ingredients: [
      'Maïs',
      'Feuilles vertes',
      'Jus de noix de palme',
      'Oignon',
      'Piment',
      'Sel',
    ],
    preparation: [
      'Nettoyer les feuilles.',
      'Préparer et cuire le maïs.',
      'Ajouter les feuilles vertes.',
      'Ajouter le jus de noix de palme.',
      'Assaisonner avec le sel et le piment.',
      'Laisser cuire doucement puis servir.',
    ],
  },

  {
    id: '9',
    name: 'Kondré de chèvre',
    region: 'Ouest',
    category: 'Plats',
    time: '110 min',
    rating: '4.8',
    emoji: '🐐',
    image:
      'https://commons.wikimedia.org/wiki/Special:Redirect/file/Kondr%C3%A9.jpg',
    description:
      'Ragoût de plantains verts mijotés avec de la viande de chèvre et des épices.',
    ingredients: [
      'Plantains verts',
      'Viande de chèvre',
      'Tomates',
      'Oignon',
      'Ail',
      'Gingembre',
      'Huile de palme',
      'Piment',
      'Sel',
    ],
    preparation: [
      'Couper les plantains verts.',
      'Faire revenir la viande de chèvre.',
      'Ajouter oignon, ail et gingembre.',
      'Ajouter les tomates et les épices.',
      'Ajouter les plantains et couvrir d’eau.',
      'Cuire doucement jusqu’à ce que la viande et les plantains soient tendres.',
    ],
  },

  {
    id: '10',
    name: 'Water fufu',
    region: 'Sud-Ouest',
    category: 'Accompagnements',
    time: '30 min',
    rating: '4.7',
    emoji: '🍚',
    image:
      'https://commons.wikimedia.org/wiki/Special:Redirect/file/Water%20fufu%20and%20Eru.jpg',
    description:
      'Pâte souple de manioc fermenté traditionnellement servie avec l’eru.',
    ingredients: [
      'Manioc',
      'Eau',
      'Sel',
    ],
    preparation: [
      'Faire fermenter le manioc dans l’eau.',
      'Égoutter puis retirer les fibres.',
      'Écraser ou mixer le manioc.',
      'Cuire en remuant constamment.',
      'Continuer jusqu’à obtenir une pâte lisse.',
      'Former les portions et servir avec l’eru.',
    ],
  },
              
      {
    id: '11',
    name: 'Miondo',
    region: 'Littoral',
    category: 'Accompagnements',
    time: '45 min',
    rating: '4.7',
    emoji: '🥖',
    image:
      'https://commons.wikimedia.org/wiki/Special:Redirect/file/Miondo.jpg',
    description:
      'Bâtons de manioc fermenté, très appréciés avec le poisson braisé et les sauces.',
    ingredients: [
      'Manioc',
      'Eau',
      'Sel',
    ],
    preparation: [
      'Éplucher et laver le manioc.',
      'Faire fermenter le manioc dans l’eau.',
      'Écraser finement le manioc.',
      'Former de longs bâtons dans des feuilles.',
      'Attacher soigneusement les feuilles.',
      'Cuire les bâtons à la vapeur.',
    ],
  },

  {
    id: '12',
    name: 'Bâtons de manioc',
    region: 'Ouest',
    category: 'Accompagnements',
    time: '60 min',
    rating: '4.6',
    emoji: '🥖',
    image:
      'https://commons.wikimedia.org/wiki/Special:Redirect/file/Baton%20de%20manioc%20du%20Village.jpg',
    description:
      'Préparation traditionnelle à base de manioc fermenté et cuit dans des feuilles.',
    ingredients: [
      'Manioc',
      'Eau',
      'Sel',
      'Feuilles',
    ],
    preparation: [
      'Éplucher le manioc.',
      'Le faire tremper pour le faire fermenter.',
      'Retirer les fibres.',
      'Écraser le manioc.',
      'Envelopper la pâte dans des feuilles.',
      'Cuire à la vapeur jusqu’à obtenir des bâtons fermes.',
    ],
  },

  {
    id: '13',
    name: 'Fufu maïs & Kati Kati',
    region: 'Nord-Ouest',
    category: 'Plats',
    time: '80 min',
    rating: '4.8',
    emoji: '🌽',
    image:
      'https://commons.wikimedia.org/wiki/Special:Redirect/file/Fufu%20corn%20and%20khati%20khati.jpg',
    description:
      'Fufu de maïs accompagné de Kati Kati et de légumes traditionnels.',
    ingredients: [
      'Farine de maïs',
      'Poulet',
      'Feuilles de njama njama',
      'Tomates',
      'Oignon',
      'Piment',
      'Huile',
      'Sel',
    ],
    preparation: [
      'Préparer la pâte de maïs.',
      'Cuire la pâte en remuant jusqu’à obtenir un fufu ferme.',
      'Assaisonner et cuire le poulet.',
      'Préparer les légumes avec l’oignon et le piment.',
      'Servir le fufu avec le poulet et les légumes.',
    ],
  },

  {
    id: '14',
    name: 'Soya camerounais',
    region: 'Nord',
    category: 'Grillades',
    time: '35 min',
    rating: '4.8',
    emoji: '🥩',
    image:
      'https://commons.wikimedia.org/wiki/Special:Redirect/file/Soya%20or%20Suya.jpg',
    description:
      'Brochettes de viande épicées, grillées et très populaires dans les rues du Cameroun.',
    ingredients: [
      'Viande de bœuf',
      'Arachides grillées',
      'Poivre',
      'Piment',
      'Paprika',
      'Ail',
      'Gingembre',
      'Sel',
    ],
    preparation: [
      'Découper la viande en fines lamelles.',
      'Préparer le mélange d’épices.',
      'Enrober la viande avec les épices.',
      'Laisser mariner.',
      'Mettre la viande sur les brochettes.',
      'Griller au feu jusqu’à obtenir une belle coloration.',
    ],
  },

  {
    id: '15',
    name: 'Sauce arachide',
    region: 'Centre',
    category: 'Sauces',
    time: '55 min',
    rating: '4.7',
    emoji: '🥜',
    image:
      'https://commons.wikimedia.org/wiki/Special:Redirect/file/Sauce%20d%27Arachide%2004.jpg',
    description:
      'Sauce onctueuse aux arachides pouvant accompagner du riz, du plantain ou du manioc.',
    ingredients: [
      'Arachides',
      'Viande',
      'Tomates',
      'Oignon',
      'Ail',
      'Gingembre',
      'Piment',
      'Huile',
      'Sel',
    ],
    preparation: [
      'Griller légèrement les arachides.',
      'Les écraser pour obtenir une pâte.',
      'Cuire la viande avec les aromates.',
      'Faire revenir l’oignon et les tomates.',
      'Ajouter la pâte d’arachide.',
      'Ajouter de l’eau et laisser mijoter jusqu’à obtenir une sauce épaisse.',
    ],
  },

  {
    id: '16',
    name: 'Porridge de plantain',
    region: 'Centre',
    category: 'Plats',
    time: '50 min',
    rating: '4.7',
    emoji: '🍌',
    image:
      'https://commons.wikimedia.org/wiki/Special:Redirect/file/Cameroonian%20Porridge%20Plantain.jpg',
    description:
      'Plantains verts cuits dans une sauce parfumée avec viande et épices.',
    ingredients: [
      'Plantains verts',
      'Viande',
      'Huile de palme',
      'Arachides ou egusi',
      'Oignon',
      'Poivre',
      'Piment',
      'Sel',
    ],
    preparation: [
      'Éplucher et couper les plantains.',
      'Faire revenir la viande avec les aromates.',
      'Ajouter les plantains.',
      'Ajouter l’huile de palme et les épices.',
      'Ajouter suffisamment d’eau.',
      'Laisser mijoter jusqu’à cuisson complète.',
    ],
  },

  {
    id: '17',
    name: 'Okok',
    region: 'Centre',
    category: 'Plats',
    time: '65 min',
    rating: '4.7',
    emoji: '🌿',
    image:
      'https://commons.wikimedia.org/wiki/Special:Redirect/file/Okok.jpg',
    description:
      'Plat traditionnel préparé avec les feuilles d’okok, arachides et huile de palme.',
    ingredients: [
      'Feuilles d’okok',
      'Arachides',
      'Huile de palme',
      'Viande',
      'Crevettes',
      'Oignon',
      'Piment',
      'Sel',
    ],
    preparation: [
      'Nettoyer et découper les feuilles d’okok.',
      'Écraser les arachides.',
      'Cuire la viande et les crevettes.',
      'Faire revenir les aromates.',
      'Ajouter les feuilles et les arachides.',
      'Ajouter l’huile de palme et laisser mijoter.',
    ],
  },

  {
    id: '18',
    name: 'Sauce gombo au poisson fumé',
    region: 'Littoral',
    category: 'Sauces',
    time: '50 min',
    rating: '4.8',
    emoji: '🍲',
    image:
      'https://commons.wikimedia.org/wiki/Special:Redirect/file/PLAT%20DE%20SAUCE%20GOMBO%20%281%29.jpg',
    description:
      'Sauce gombo traditionnelle préparée avec du poisson fumé et des aromates.',
    ingredients: [
      'Gombos',
      'Poisson fumé',
      'Tomates',
      'Oignon',
      'Ail',
      'Piment',
      'Huile de palme',
      'Sel',
    ],
    preparation: [
      'Nettoyer et découper les gombos.',
      'Nettoyer le poisson fumé.',
      'Faire revenir l’oignon et l’ail.',
      'Ajouter les tomates et le piment.',
      'Ajouter les gombos et le poisson.',
      'Laisser mijoter jusqu’à obtenir une sauce bien liée.',
    ],
  },

  {
    id: '19',
    name: 'Taro sauce jaune',
    region: 'Ouest',
    category: 'Plats',
    time: '90 min',
    rating: '4.9',
    emoji: '🥔',
    image:
      'https://commons.wikimedia.org/wiki/Special:Redirect/file/Le%20Taro%20-%20Sauce%20jaune%2C%20un%20plat%20camerounais.jpg',
    description:
      'Taro pilé accompagné d’une sauce jaune traditionnelle à base d’huile de palme.',
    ingredients: [
      'Taro',
      'Huile de palme',
      'Viande',
      'Poisson fumé',
      'Épices',
      'Piment',
      'Sel',
    ],
    preparation: [
      'Laver et cuire le taro.',
      'Éplucher le taro encore chaud.',
      'Piler jusqu’à obtenir une pâte homogène.',
      'Préparer la sauce jaune avec l’huile de palme.',
      'Ajouter viande, poisson et épices.',
      'Servir la sauce avec le taro pilé.',
    ],
  },

  {
    id: '20',
    name: 'Kwacoco Bible',
    region: 'Sud-Ouest',
    category: 'Plats',
    time: '100 min',
    rating: '4.8',
    emoji: '🍠',
    image:
      'https://commons.wikimedia.org/wiki/Special:Redirect/file/Kwacoco%20bible.jpg',
    description:
      'Plat traditionnel des Bakweri à base de macabo râpé et préparé avec des épices.',
    ingredients: [
      'Macabo',
      'Huile de palme',
      'Poisson fumé',
      'Crevettes',
      'Épices',
      'Piment',
      'Sel',
    ],
    preparation: [
      'Éplucher et laver les macabos.',
      'Râper finement les macabos.',
      'Mélanger avec les épices et l’huile de palme.',
      'Ajouter le poisson fumé et les crevettes.',
      'Envelopper la préparation dans des feuilles.',
      'Cuire à la vapeur jusqu’à complète cuisson.',
    ],
  },
    {
    id: '21',
    name: 'Koki de maïs',
    region: 'Ouest',
    category: 'Plats',
    time: '85 min',
    rating: '4.7',
    emoji: '🌽',
    image:
      'https://commons.wikimedia.org/wiki/Special:Redirect/file/Koki%20Beans.jpg',
    description:
      'Préparation traditionnelle cuite à la vapeur dans des feuilles, à base de pâte de maïs.',
    ingredients: [
      'Maïs',
      'Huile de palme',
      'Piment',
      'Oignon',
      'Sel',
      'Feuilles de bananier',
    ],
    preparation: [
      'Moudre finement le maïs.',
      'Mélanger avec l’eau pour obtenir une pâte.',
      'Ajouter l’huile de palme et les épices.',
      'Verser la préparation dans les feuilles.',
      'Fermer soigneusement les paquets.',
      'Cuire à la vapeur jusqu’à complète cuisson.',
    ],
  },

  {
    id: '22',
    name: 'Bâtons de manioc',
    region: 'Littoral',
    category: 'Accompagnements',
    time: '60 min',
    rating: '4.7',
    emoji: '🥖',
    image:
      'https://commons.wikimedia.org/wiki/Special:Redirect/file/Baton%20de%20manioc%20du%20Village.jpg',
    description:
      'Bâtons de manioc fermenté traditionnellement cuits dans des feuilles.',
    ingredients: [
      'Manioc',
      'Eau',
      'Sel',
      'Feuilles',
    ],
    preparation: [
      'Éplucher et laver le manioc.',
      'Faire fermenter le manioc.',
      'Retirer les fibres.',
      'Écraser le manioc.',
      'Former les bâtons dans les feuilles.',
      'Cuire à la vapeur.',
    ],
  },

  {
    id: '23',
    name: 'Couscous de maïs',
    region: 'Nord-Ouest',
    category: 'Accompagnements',
    time: '45 min',
    rating: '4.7',
    emoji: '🌽',
    image:
      'https://commons.wikimedia.org/wiki/Special:Redirect/file/Fufu%20corn%20and%20khati%20khati.jpg',
    description:
      'Accompagnement traditionnel à base de maïs, servi avec différentes sauces et viandes.',
    ingredients: [
      'Farine de maïs',
      'Eau',
      'Sel',
    ],
    preparation: [
      'Faire chauffer l’eau.',
      'Ajouter progressivement la farine de maïs.',
      'Remuer constamment.',
      'Continuer la cuisson jusqu’à obtenir une pâte ferme.',
      'Former les portions.',
      'Servir chaud avec une sauce ou une viande.',
    ],
  },

  {
    id: '24',
    name: 'Kati Kati',
    region: 'Nord-Ouest',
    category: 'Grillades',
    time: '60 min',
    rating: '4.8',
    emoji: '🍗',
    image:
      'https://commons.wikimedia.org/wiki/Special:Redirect/file/Kati%20kati.jpg',
    description:
      'Poulet traditionnel assaisonné puis cuit au feu et accompagné de légumes.',
    ingredients: [
      'Poulet',
      'Tomates',
      'Oignon',
      'Piment',
      'Ail',
      'Gingembre',
      'Huile',
      'Sel',
    ],
    preparation: [
      'Nettoyer et découper le poulet.',
      'Préparer la marinade avec les épices.',
      'Laisser mariner le poulet.',
      'Faire griller le poulet au feu.',
      'Préparer les légumes avec les tomates et l’oignon.',
      'Servir le poulet avec les légumes.',
    ],
  },

  {
    id: '25',
    name: 'Macabo aux haricots',
    region: 'Ouest',
    category: 'Plats',
    time: '75 min',
    rating: '4.7',
    emoji: '🍠',
    image:
      'https://commons.wikimedia.org/wiki/Special:Redirect/file/Kwacoco%20bible.jpg',
    description:
      'Préparation traditionnelle associant le macabo et une sauce de haricots.',
    ingredients: [
      'Macabo',
      'Haricots rouges',
      'Tomates',
      'Oignon',
      'Ail',
      'Piment',
      'Huile de palme',
      'Sel',
    ],
    preparation: [
      'Éplucher et couper le macabo.',
      'Faire cuire les haricots.',
      'Faire revenir l’oignon et l’ail.',
      'Ajouter les tomates et le piment.',
      'Ajouter les haricots et laisser mijoter.',
      'Cuire le macabo puis servir avec la sauce.',
    ],
  },

  {
    id: '26',
    name: 'Couscous de mil',
    region: 'Extrême-Nord',
    category: 'Accompagnements',
    time: '50 min',
    rating: '4.6',
    emoji: '🌾',
    image:
      'https://commons.wikimedia.org/wiki/Special:Redirect/file/Couscous%20de%20mil.jpg',
    description:
      'Couscous traditionnel à base de mil, particulièrement présent dans les régions septentrionales.',
    ingredients: [
      'Mil',
      'Eau',
      'Sel',
    ],
    preparation: [
      'Nettoyer et moudre le mil.',
      'Humidifier progressivement la farine.',
      'Former les grains de couscous.',
      'Cuire à la vapeur.',
      'Remuer puis poursuivre la cuisson.',
      'Servir avec une sauce ou une viande.',
    ],
  },

  {
    id: '27',
    name: 'Kati Kati au couscous de maïs',
    region: 'Nord-Ouest',
    category: 'Plats',
    time: '70 min',
    rating: '4.8',
    emoji: '🍗',
    image:
      'https://commons.wikimedia.org/wiki/Special:Redirect/file/Kati%20Kati%20Wiki%20Kouman%20Cameroun.jpg',
    description:
      'Poulet Kati Kati servi avec du couscous de maïs et des légumes.',
    ingredients: [
      'Poulet',
      'Farine de maïs',
      'Tomates',
      'Oignon',
      'Piment',
      'Ail',
      'Gingembre',
      'Sel',
    ],
    preparation: [
      'Assaisonner le poulet.',
      'Faire griller le poulet au feu.',
      'Préparer le couscous de maïs.',
      'Préparer les légumes.',
      'Découper le poulet en morceaux.',
      'Servir ensemble avec les légumes.',
    ],
  },

  {
    id: '28',
    name: 'Egusi aux feuilles',
    region: 'Sud-Ouest',
    category: 'Plats',
    time: '65 min',
    rating: '4.8',
    emoji: '🌿',
    image:
      'https://commons.wikimedia.org/wiki/Special:Redirect/file/Water%20Fu%20and%20Eru%20with%20cow%20meat.jpg',
    description:
      'Sauce épaisse aux graines de courge et aux feuilles vertes, accompagnée de viande ou de poisson.',
    ingredients: [
      'Graines d’egusi',
      'Feuilles vertes',
      'Viande',
      'Poisson fumé',
      'Huile de palme',
      'Oignon',
      'Piment',
      'Sel',
    ],
    preparation: [
      'Écraser les graines d’egusi.',
      'Cuire la viande et le poisson fumé.',
      'Faire revenir l’oignon.',
      'Ajouter les graines d’egusi.',
      'Ajouter les feuilles vertes et l’huile de palme.',
      'Laisser mijoter jusqu’à obtenir une sauce épaisse.',
    ],
  },

  {
    id: '29',
    name: 'Grillade de poulet',
    region: 'Centre',
    category: 'Grillades',
    time: '50 min',
    rating: '4.8',
    emoji: '🍗',
    image:
      'https://commons.wikimedia.org/wiki/Special:Redirect/file/Grillade%20de%20Poulet.jpg',
    description:
      'Poulet mariné aux épices puis grillé au feu de bois.',
    ingredients: [
      'Poulet',
      'Ail',
      'Gingembre',
      'Oignon',
      'Piment',
      'Poivre',
      'Citron',
      'Sel',
    ],
    preparation: [
      'Nettoyer et découper le poulet.',
      'Préparer la marinade.',
      'Mariner le poulet pendant plusieurs heures.',
      'Faire chauffer le grill.',
      'Griller le poulet en le retournant régulièrement.',
      'Servir avec plantain, manioc ou salade.',
    ],
  },

  {
    id: '30',
    name: 'Plantain mûr frit',
    region: 'Littoral',
    category: 'Street Food',
    time: '20 min',
    rating: '4.7',
    emoji: '🍌',
    image:
      'https://commons.wikimedia.org/wiki/Special:Redirect/file/Poulet%20GD%20%28fried%20chicken%20with%20ripe%20plantains%20and%20mixed%20vegetables%29.jpg',
    description:
      'Bananes plantains mûres découpées puis frites jusqu’à obtenir une belle couleur dorée.',
    ingredients: [
      'Bananes plantains mûres',
      'Huile',
      'Sel',
    ],
    preparation: [
      'Éplucher les plantains.',
      'Les découper en morceaux.',
      'Faire chauffer l’huile.',
      'Frire les morceaux de plantain.',
      'Retourner pour obtenir une cuisson uniforme.',
      'Égoutter et servir chaud.',
    ],
  },
];
const RECIPE_IMAGES = [
  require('./assets/recipes/grillade_poulet.jpg'),
  require('./assets/recipes/ndole_crevettes.jpg'),
  require('./assets/recipes/poulet_dg.jpg'),
  require('./assets/recipes/eru.jpg'),
  require('./assets/recipes/garri_eru.jpg'),
  require('./assets/recipes/water_fufu_eru.jpg'),
  require('./assets/recipes/achu.jpg'),
  require('./assets/recipes/taro.jpg'),
  require('./assets/recipes/koki.jpg'),
  require('./assets/recipes/koki_plantain.jpg'),
  require('./assets/recipes/kwacoco.jpg'),
  require('./assets/recipes/kati_kati.jpg'),
  require('./assets/recipes/fufu_kati.jpg'),
  require('./assets/recipes/poisson_braise.jpg'),
  require('./assets/recipes/sanga.jpg'),
  require('./assets/recipes/mbongo.jpg'),
  require('./assets/recipes/ndomba_poulet.jpg'),
  require('./assets/recipes/ndomba_porc.jpg'),
  require('./assets/recipes/suya.jpg'),
  require('./assets/recipes/nnam_ngon.jpg'),
  require('./assets/recipes/mintumba.jpg'),
  require('./assets/recipes/okok.jpg'),
  require('./assets/recipes/sauce_gombo.jpg'),
  require('./assets/recipes/sauce_arachides.jpg'),
  require('./assets/recipes/miondo.jpg'),
  require('./assets/recipes/bobolo.jpg'),
  require('./assets/recipes/kondre.jpg'),
  require('./assets/recipes/porridge_plantain.jpg'),
  require('./assets/recipes/macabo_haricots.jpg'),
  require('./assets/recipes/couscous_mais.jpg'),
];

RECIPES.forEach((recipe, index) => {
  recipe.image = RECIPE_IMAGES[index];
});
const REGIONS = [
  'Toutes',
  'Centre',
  'Littoral',
  'Ouest',
  'Nord-Ouest',
  'Sud-Ouest',
  'Nord',
  'Extrême-Nord',
  'Sud',
  'Est',
];
  
  
  
  
  
  


const CATEGORIES = [
  { name: 'Toutes', icon: '🍽️' },
  { name: 'Plats', icon: '🍲' },
  { name: 'Grillades', icon: '🔥' },
  { name: 'Accompagnements', icon: '🍌' },
  { name: 'Sauces', icon: '🥘' },
  { name: 'Street Food', icon: '🍢' },
];
  
  
  
  


function Header({ onProfile }) {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.logo}>🇨🇲 Cam Food</Text>
        <Text style={styles.subtitle}>La cuisine camerounaise</Text>
      </View>

      <Pressable style={styles.profileButton} onPress={onProfile}>
        <Text style={styles.profileIcon}>👤</Text>
      </Pressable>
    </View>
  );
}

function SearchBar({ value, onChange }) {
  return (
    <View style={styles.searchBox}>
      <Text style={styles.searchIcon}>🔎</Text>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder="Rechercher une recette..."
        placeholderTextColor="#999"
        style={styles.searchInput}
      />
      {value.length > 0 && (
        <Pressable onPress={() => onChange('')}>
          <Text style={styles.clearText}>✕</Text>
        </Pressable>
      )}
    </View>
  );
}

function RecipeCard({ recipe, favorite, onFavorite, onOpen }) {
  return (
    <Pressable style={styles.card} onPress={() => onOpen(recipe)}>
      <View style={styles.imageWrap}>
        <Image source={{ uri: recipe.image }} style={styles.cardImage} />
        <View style={styles.emojiBadge}>
          <Text>{recipe.emoji}</Text>
        </View>

        <Pressable
          style={styles.favoriteButton}
          onPress={(event) => {
            event.stopPropagation();
            onFavorite(recipe.id);
          }}
        >
          <Text style={{ fontSize: 20 }}>
            {favorite ? '❤️' : '🤍'}
          </Text>
        </Pressable>
      </View>

      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{recipe.name}</Text>
        <Text style={styles.cardRegion}>📍 {recipe.region}</Text>

        <View style={styles.cardBottom}>
          <Text style={styles.rating}>⭐ {recipe.rating}</Text>
          <Text style={styles.time}>⏱ {recipe.time}</Text>
        </View>
      </View>
    </Pressable>
  );
}

function RecipeModal({ recipe, visible, onClose, onAddShopping }) {
  if (!recipe) return null;

  return (
    <Modal visible={visible} animationType="slide">
      <SafeAreaView style={styles.modalSafe}>
        <StatusBar barStyle="light-content" />

        <ScrollView>
          <View style={styles.detailImageWrap}>
            <Image
              source={{ uri: recipe.image }}
              style={styles.detailImage}
            />

            <Pressable style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>✕</Text>
            </Pressable>

            <View style={styles.detailEmoji}>
              <Text style={{ fontSize: 32 }}>{recipe.emoji}</Text>
            </View>
          </View>

          <View style={styles.detailContent}>
            <Text style={styles.detailTitle}>{recipe.name}</Text>

            <View style={styles.infoRow}>
              <Text style={styles.infoPill}>📍 {recipe.region}</Text>
              <Text style={styles.infoPill}>⭐ {recipe.rating}</Text>
              <Text style={styles.infoPill}>⏱ {recipe.time}</Text>
            </View>

            <Text style={styles.detailDescription}>
              {recipe.description}
            </Text>

            <Text style={styles.sectionTitle}>🛒 Ingrédients</Text>

            {recipe.ingredients.map((ingredient, index) => (
              <Pressable
                key={index}
                style={styles.ingredientRow}
                onPress={() => onAddShopping(ingredient)}
              >
                <Text style={styles.ingredientCheck}>＋</Text>
                <Text style={styles.ingredientText}>{ingredient}</Text>
              </Pressable>
            ))}

            <Text style={styles.sectionTitle}>👨‍🍳 Préparation</Text>

            {recipe.preparation.map((step, index) => (
              <View key={index} style={styles.stepRow}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>{index + 1}</Text>
                </View>
                <Text style={styles.stepText}>{step}</Text>
              </View>
            ))}
<Pressable
  style={styles.shareButton}
  onPress={() =>
    Share.share({
      message:
        `🇨🇲 ${recipe.name}\n\n` +
        `${recipe.description}\n\n` +
        `📍 Région : ${recipe.region}\n` +
        `⏱ Temps : ${recipe.time}\n` +
        `⭐ Note : ${recipe.rating}\n\n` +
        `Découvrez cette recette sur Cam Food !`,
    })
  }
>
  <Text style={styles.shareButtonText}>📤 Partager la recette</Text>
</Pressable>
            <Pressable
              style={styles.mainButton}
              onPress={() => {
                recipe.ingredients.forEach(onAddShopping);
                Alert.alert(
                  'Ajouté !',
                  'Les ingrédients ont été ajoutés à votre liste de courses.'
                );
              }}
            >
              <Text style={styles.mainButtonText}>
                🛒 Ajouter les ingrédients
              </Text>
            </Pressable>

            <View style={{ height: 40 }} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

function HomeScreen({
  search,
  setSearch,
  region,
  setRegion,
  category,
  setCategory,
  recipes,
  favorites,
  toggleFavorite,
  openRecipe,
}) {
  return (
    <FlatList
      data={recipes}
      keyExtractor={(item) => item.id}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      columnWrapperStyle={styles.columnWrapper}
      contentContainerStyle={styles.listContent}
      ListHeaderComponent={
        <>
          <View style={styles.hero}>
            <View style={styles.heroText}>
              <Text style={styles.heroSmall}>BIENVENUE SUR</Text>
              <Text style={styles.heroTitle}>Cam Food 🇨🇲</Text>
              <Text style={styles.heroDescription}>
                Découvre les saveurs authentiques du Cameroun.
              </Text>
            </View>
            <Text style={styles.heroEmoji}>🍲</Text>
          </View>

          <SearchBar value={search} onChange={setSearch} />

          <Text style={styles.sectionHeading}>Catégories</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          >
            {CATEGORIES.map((item) => (
              <Pressable
                key={item.name}
                onPress={() => setCategory(item.name)}
                style={[
                  styles.categoryChip,
                  category === item.name && styles.categoryChipActive,
                ]}
              >
                <Text style={styles.categoryIcon}>{item.icon}</Text>
                <Text
                  style={[
                    styles.categoryText,
                    category === item.name && styles.categoryTextActive,
                  ]}
                >
                  {item.name}
                </Text>
              </Pressable>
            ))}
          </ScrollView>

          <Text style={styles.sectionHeading}>Régions</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          >
            {REGIONS.map((item) => (
              <Pressable
                key={item}
                onPress={() => setRegion(item)}
                style={[
                  styles.regionChip,
                  region === item && styles.regionChipActive,
                ]}
              >
                <Text
                  style={[
                    styles.regionText,
                    region === item && styles.regionTextActive,
                  ]}
                >
                  {item}
                </Text>
              </Pressable>
            ))}
          </ScrollView>

          <View style={styles.recipeHeadingRow}>
            <Text style={styles.sectionHeading}>Nos recettes</Text>
            <Text style={styles.recipeCount}>{recipes.length} recettes</Text>
          </View>
        </>
      }
      renderItem={({ item }) => (
        <RecipeCard
          recipe={item}
          favorite={favorites.includes(item.id)}
          onFavorite={toggleFavorite}
          onOpen={openRecipe}
        />
      )}
      ListEmptyComponent={
        <View style={styles.empty}>
          <Text style={styles.emptyEmoji}>😕</Text>
          <Text style={styles.emptyTitle}>Aucune recette trouvée</Text>
          <Text style={styles.emptyText}>
            Essaie une autre recherche ou une autre région.
          </Text>
        </View>
      }
    />
  );
}

function FavoritesScreen({
  recipes,
  favorites,
  toggleFavorite,
  openRecipe,
}) {
  const favoriteRecipes = recipes.filter((r) =>
    favorites.includes(r.id)
  );

  if (favoriteRecipes.length === 0) {
    return (
      <View style={styles.emptyScreen}>
        <Text style={styles.emptyEmoji}>❤️</Text>
        <Text style={styles.emptyTitle}>Aucun favori</Text>
        <Text style={styles.emptyText}>
          Appuie sur ❤️ sur une recette pour la retrouver ici.
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={favoriteRecipes}
      keyExtractor={(item) => item.id}
      numColumns={2}
      columnWrapperStyle={styles.columnWrapper}
      contentContainerStyle={styles.listContent}
      ListHeaderComponent={
        <Text style={styles.pageTitle}>❤️ Mes favoris</Text>
      }
      renderItem={({ item }) => (
        <RecipeCard
          recipe={item}
          favorite
          onFavorite={toggleFavorite}
          onOpen={openRecipe}
        />
      )}
    />
  );
}

function ShoppingScreen({ shopping, removeShopping, clearShopping }) {
  return (
    <View style={styles.screen}>
      <View style={styles.shoppingHeader}>
        <View>
          <Text style={styles.pageTitle}>🛒 Ma liste</Text>
          <Text style={styles.shoppingSubtitle}>
            {shopping.length} élément(s)
          </Text>
        </View>

        {shopping.length > 0 && (
          <Pressable onPress={clearShopping}>
            <Text style={styles.deleteAll}>Tout vider</Text>
          </Pressable>
        )}
      </View>

      {shopping.length === 0 ? (
        <View style={styles.emptyScreen}>
          <Text style={styles.emptyEmoji}>🛒</Text>
          <Text style={styles.emptyTitle}>Liste vide</Text>
          <Text style={styles.emptyText}>
            Ajoute des ingrédients depuis une recette.
          </Text>
        </View>
      ) : (
        <FlatList
          data={shopping}
          keyExtractor={(item, index) => `${item}-${index}`}
          contentContainerStyle={{ paddingBottom: 30 }}
          renderItem={({ item }) => (
            <View style={styles.shoppingItem}>
              <View style={styles.shoppingCircle}>
                <Text>✓</Text>
              </View>

              <Text style={styles.shoppingText}>{item}</Text>

              <Pressable onPress={() => removeShopping(item)}>
                <Text style={styles.removeText}>✕</Text>
              </Pressable>
            </View>
          )}
        />
      )}
    </View>
  );
}

function ProfileScreen({ favorites, shopping }) {
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <View style={styles.profileHero}>
        <View style={styles.bigAvatar}>
          <Text style={{ fontSize: 40 }}>👨🏾‍🍳</Text>
        </View>
        <Text style={styles.profileName}>Bienvenue sur Cam Food</Text>
        <Text style={styles.profileSub}>
          Ton carnet de cuisine camerounaise
        </Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{RECIPES.length}</Text>
          <Text style={styles.statLabel}>Recettes</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{favorites.length}</Text>
          <Text style={styles.statLabel}>Favoris</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{shopping.length}</Text>
          <Text style={styles.statLabel}>Courses</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>À propos</Text>

      <View style={styles.aboutCard}>
        <Text style={styles.aboutTitle}>🇨🇲 Cam Food</Text>
        <Text style={styles.aboutText}>
          Une application dédiée aux recettes et aux saveurs du Cameroun.
          Explore les plats traditionnels, découvre les différentes régions
          culinaires et prépare facilement tes recettes préférées.
        </Text>
      </View>

      <View style={styles.aboutCard}>
        <Text style={styles.aboutTitle}>✨ Version</Text>
        <Text style={styles.aboutText}>Cam Food 1.0 • React Native + Expo</Text>
      </View>
    </ScrollView>
  );
}

export default function App() {
  const [tab, setTab] = useState('home');
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('Toutes');
  const [category, setCategory] = useState('Toutes');
  const [favorites, setFavorites] = useState([]);
  const [shopping, setShopping] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const filteredRecipes = useMemo(() => {
    const query = search.trim().toLowerCase();

    return RECIPES.filter((recipe) => {
      const matchesSearch =
        !query ||
        recipe.name.toLowerCase().includes(query) ||
        recipe.region.toLowerCase().includes(query) ||
        recipe.ingredients.some((item) =>
          item.toLowerCase().includes(query)
        );

      const matchesRegion =
        region === 'Toutes' || recipe.region === region;

      const matchesCategory =
        category === 'Toutes' || recipe.category === category;

      return matchesSearch && matchesRegion && matchesCategory;
    });
  }, [search, region, category]);

  const toggleFavorite = (id) => {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const addShopping = (ingredient) => {
    setShopping((current) =>
      current.includes(ingredient)
        ? current
        : [...current, ingredient]
    );
  };

  const removeShopping = (ingredient) => {
    setShopping((current) =>
      current.filter((item) => item !== ingredient)
    );
  };

  const clearShopping = () => {
    Alert.alert(
      'Vider la liste',
      'Voulez-vous vraiment supprimer tous les ingrédients ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Vider',
          style: 'destructive',
          onPress: () => setShopping([]),
        },
      ]
    );
  };

  const renderScreen = () => {
    if (tab === 'favorites') {
      return (
        <FavoritesScreen
          recipes={RECIPES}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          openRecipe={setSelectedRecipe}
        />
      );
    }

    if (tab === 'shopping') {
      return (
        <ShoppingScreen
          shopping={shopping}
          removeShopping={removeShopping}
          clearShopping={clearShopping}
        />
      );
    }

    if (tab === 'profile') {
      return (
        <ProfileScreen
          favorites={favorites}
          shopping={shopping}
        />
      );
    }

    return (
      <HomeScreen
        search={search}
        setSearch={setSearch}
        region={region}
        setRegion={setRegion}
        category={category}
        setCategory={setCategory}
        recipes={filteredRecipes}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        openRecipe={setSelectedRecipe}
      />
    );
  };

  return (
    <SafeAreaView style={styles.app}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.cream}
      />

      {tab === 'home' && (
        <Header onProfile={() => setTab('profile')} />
      )}

      <View style={styles.content}>{renderScreen()}</View>

      <View style={styles.bottomNav}>
        <NavButton
          icon="🏠"
          label="Accueil"
          active={tab === 'home'}
          onPress={() => setTab('home')}
        />

        <NavButton
          icon="❤️"
          label="Favoris"
          active={tab === 'favorites'}
          onPress={() => setTab('favorites')}
          badge={favorites.length}
        />

        <NavButton
          icon="🛒"
          label="Courses"
          active={tab === 'shopping'}
          onPress={() => setTab('shopping')}
          badge={shopping.length}
        />

        <NavButton
          icon="👤"
          label="Profil"
          active={tab === 'profile'}
          onPress={() => setTab('profile')}
        />
      </View>

      <RecipeModal
        recipe={selectedRecipe}
        visible={!!selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
        onAddShopping={addShopping}
      />
    </SafeAreaView>
  );
}

function NavButton({ icon, label, active, onPress, badge }) {
  return (
    <Pressable style={styles.navButton} onPress={onPress}>
      <View>
        <Text style={[styles.navIcon, active && styles.navIconActive]}>
          {icon}
        </Text>

        {badge > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badge}</Text>
          </View>
        )}
      </View>

      <Text style={[styles.navLabel, active && styles.navLabelActive]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: COLORS.cream,
  },

  content: {
    flex: 1,
  },

  header: {
    height: 76,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.cream,
  },

  logo: {
    fontSize: 25,
    fontWeight: '900',
    color: COLORS.dark,
  },

  subtitle: {
    marginTop: 2,
    fontSize: 12,
    color: COLORS.gray,
  },

  profileButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },

  profileIcon: {
    fontSize: 22,
  },

  hero: {
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 18,
    padding: 20,
    minHeight: 150,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },

  heroText: {
    flex: 1,
  },

  heroSmall: {
    color: '#FFE5D0',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },

  heroTitle: {
    color: COLORS.white,
    fontSize: 30,
    fontWeight: '900',
    marginTop: 4,
  },

  heroDescription: {
    color: COLORS.white,
    opacity: 0.9,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 6,
    maxWidth: 240,
  },

  heroEmoji: {
    fontSize: 65,
    marginLeft: 8,
  },

  searchBox: {
    height: 52,
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    elevation: 2,
  },

  searchIcon: {
    fontSize: 20,
    marginRight: 9,
  },

  searchInput: {
    flex: 1,
    fontSize: 15,
    color: COLORS.dark,
  },

  clearText: {
    color: COLORS.gray,
    fontSize: 17,
    padding: 5,
  },

  sectionHeading: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.dark,
    marginHorizontal: 16,
    marginBottom: 12,
  },

  horizontalList: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },

  categoryChip: {
    minWidth: 88,
    height: 68,
    marginRight: 10,
    paddingHorizontal: 14,
    borderRadius: 17,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
  },

  categoryChipActive: {
    backgroundColor: COLORS.primary,
  },

  categoryIcon: {
    fontSize: 24,
    marginBottom: 4,
  },

  categoryText: {
    color: COLORS.dark,
    fontSize: 11,
    fontWeight: '700',
  },

  categoryTextActive: {
    color: COLORS.white,
  },

  regionChip: {
    paddingHorizontal: 16,
    height: 38,
    marginRight: 9,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
  },

  regionChipActive: {
    backgroundColor: COLORS.dark,
  },

  regionText: {
    color: COLORS.dark,
    fontSize: 12,
    fontWeight: '700',
  },

  regionTextActive: {
    color: COLORS.white,
  },

  recipeHeadingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 16,
  },

  recipeCount: {
    color: COLORS.gray,
    fontSize: 12,
    marginBottom: 12,
  },

  listContent: {
    paddingBottom: 25,
  },

  columnWrapper: {
    paddingHorizontal: 11,
    justifyContent: 'space-between',
  },

  card: {
    width: '47%',
    marginHorizontal: 5,
    marginBottom: 15,
    borderRadius: 18,
    backgroundColor: COLORS.white,
    overflow: 'hidden',
    elevation: 2,
  },

  imageWrap: {
    height: 140,
    position: 'relative',
  },

  cardImage: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.light,
  },

  emojiBadge: {
    position: 'absolute',
    left: 8,
    bottom: 8,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },

  favoriteButton: {
    position: 'absolute',
    right: 8,
    top: 8,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },

  cardContent: {
    padding: 11,
  },

  cardTitle: {
    fontSize: 15,
    fontWeight: '900',
    color: COLORS.dark,
  },

  cardRegion: {
    color: COLORS.gray,
    fontSize: 10,
    marginTop: 4,
  },

  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  rating: {
    color: COLORS.primary,
    fontSize: 10,
    fontWeight: '800',
  },

  time: {
    color: COLORS.gray,
    fontSize: 10,
  },

  bottomNav: {
    height: 70,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  navButton: {
    minWidth: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },

  navIcon: {
    fontSize: 21,
    opacity: 0.55,
  },

  navIconActive: {
    opacity: 1,
  },

  navLabel: {
    fontSize: 10,
    marginTop: 3,
    color: COLORS.gray,
    fontWeight: '600',
  },

  navLabelActive: {
    color: COLORS.primary,
    fontWeight: '900',
  },

  badge: {
    position: 'absolute',
    right: -9,
    top: -5,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    paddingHorizontal: 4,
    backgroundColor: COLORS.red,
    alignItems: 'center',
    justifyContent: 'center',
  },

  badgeText: {
    color: COLORS.white,
    fontSize: 9,
    fontWeight: '900',
  },

  empty: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 45,
  },

  emptyScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },

  emptyEmoji: {
    fontSize: 55,
    marginBottom: 12,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.dark,
  },

  emptyText: {
    textAlign: 'center',
    color: COLORS.gray,
    lineHeight: 20,
    marginTop: 7,
  },

  modalSafe: {
    flex: 1,
    backgroundColor: COLORS.cream,
  },

  detailImageWrap: {
    height: 300,
    position: 'relative',
  },

  detailImage: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.light,
  },

  closeButton: {
    position: 'absolute',
    top: 15,
    left: 15,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },

  closeButtonText: {
    fontSize: 20,
    color: COLORS.dark,
  },

  detailEmoji: {
    position: 'absolute',
    bottom: -25,
    left: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },

  detailContent: {
    padding: 22,
    paddingTop: 40,
  },

  detailTitle: {
    fontSize: 30,
    fontWeight: '900',
    color: COLORS.dark,
  },

  infoRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
  },

  infoPill: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 15,
    marginRight: 7,
    marginBottom: 7,
    color: COLORS.gray,
    fontSize: 11,
    fontWeight: '700',
  },

  detailDescription: {
    color: COLORS.gray,
    fontSize: 14,
    lineHeight: 22,
    marginTop: 10,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.dark,
    marginTop: 25,
    marginBottom: 12,
  },

  ingredientRow: {
    minHeight: 45,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginBottom: 8,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },

  ingredientCheck: {
    color: COLORS.primary,
    fontSize: 24,
    marginRight: 10,
  },

  ingredientText: {
    color: COLORS.dark,
    fontSize: 14,
    fontWeight: '600',
  },

  stepRow: {
    flexDirection: 'row',
    marginBottom: 13,
  },

  stepNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },

  stepNumberText: {
    color: COLORS.white,
    fontWeight: '900',
  },

  stepText: {
    flex: 1,
    color: COLORS.dark,
    fontSize: 14,
    lineHeight: 21,
  },
shareButton: {
  height: 54,
  borderRadius: 16,
  backgroundColor: COLORS.white,
  borderWidth: 2,
  borderColor: COLORS.primary,
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 12,
},

shareButtonText: {
  color: COLORS.primary,
  fontSize: 15,
  fontWeight: '900',
},
  mainButton: {
    height: 54,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },

  mainButtonText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '900',
  },

  screen: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 15,
  },

  pageTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: COLORS.dark,
    marginBottom: 5,
  },

  shoppingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  shoppingSubtitle: {
    color: COLORS.gray,
    fontSize: 12,
  },

  deleteAll: {
    color: COLORS.red,
    fontSize: 13,
    fontWeight: '800',
  },

  shoppingItem: {
    minHeight: 58,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    paddingHorizontal: 14,
    marginBottom: 9,
    flexDirection: 'row',
    alignItems: 'center',
  },

  shoppingCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#E8F5EC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  shoppingText: {
    flex: 1,
    color: COLORS.dark,
    fontSize: 14,
    fontWeight: '600',
  },

  removeText: {
    color: COLORS.red,
    fontSize: 17,
    padding: 5,
  },

  profileHero: {
    alignItems: 'center',
    paddingVertical: 20,
  },

  bigAvatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    marginBottom: 12,
  },

  profileName: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.dark,
    textAlign: 'center',
  },

  profileSub: {
    color: COLORS.gray,
    marginTop: 5,
    textAlign: 'center',
  },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
  },

  statCard: {
    width: '31%',
    paddingVertical: 15,
    borderRadius: 15,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    elevation: 1,
  },

  statNumber: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.primary,
  },

  statLabel: {
    fontSize: 11,
    color: COLORS.gray,
    marginTop: 3,
  },

  aboutCard: {
    backgroundColor: COLORS.white,
    padding: 17,
    borderRadius: 16,
    marginBottom: 12,
  },

  aboutTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: COLORS.dark,
    marginBottom: 7,
  },

  aboutText: {
    color: COLORS.gray,
    fontSize: 13,
    lineHeight: 20,
  },
});
      
      
      
                    

                              


  

      


      
      import React, { useMemo, useState } from 'react';
import {
  FlatList,
Image,
ImageBackground,
Modal,
  

  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

      const RECIPES = [
  {
    id: '1',
    name: 'Ndolé',
    region: 'Littoral',
    description: 'Le célèbre plat camerounais préparé avec les feuilles de ndolé, arachides et viande ou poisson.',
    image: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Ndolé%20camerounais.JPG',
    ingredients: [
      '500 g de feuilles de ndolé',
      '300 g de viande de bœuf',
      '200 g de crevettes',
      '200 g d’arachides',
      '1 oignon',
      '2 gousses d’ail',
      '100 ml d’huile de palme',
      'Sel et poivre'
    ],
    steps: [
      'Laver et faire bouillir les feuilles de ndolé pour réduire leur amertume.',
      'Cuire la viande jusqu’à ce qu’elle soit tendre.',
      'Écraser les arachides avec l’ail et l’oignon.',
      'Faire revenir la préparation dans l’huile.',
      'Ajouter le ndolé, la viande et les crevettes.',
      'Laisser mijoter puis servir chaud.'
    ]
  },

  {
    id: '2',
    name: 'Ndolé aux crevettes',
    region: 'Littoral',
    description: 'Une variante du ndolé avec crevettes et poisson, servie avec plantain, miondo ou riz.',
    image: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Ndolè%20à%20la%20viande,%20morue%20et%20crevettes.jpg',
    ingredients: [
      '500 g de ndolé',
      '300 g de crevettes',
      '200 g de morue',
      '150 g d’arachides',
      '1 oignon',
      '2 gousses d’ail',
      'Huile de palme',
      'Sel'
    ],
    steps: [
      'Préparer et dessaler la morue.',
      'Faire bouillir puis égoutter les feuilles de ndolé.',
      'Préparer la pâte d’arachides.',
      'Faire revenir oignon et ail dans l’huile.',
      'Ajouter les arachides, le ndolé, la morue et les crevettes.',
      'Laisser mijoter quelques minutes avant de servir.'
    ]
  },

  {
    id: '3',
    name: 'Poulet DG',
    region: 'Centre',
    description: 'Poulet frit accompagné de plantains mûrs et de légumes, une spécialité camerounaise très connue.',
    image: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Poulet%20DG.JPG',
    ingredients: [
      '1 poulet découpé',
      '4 plantains mûrs',
      '2 carottes',
      '1 poivron',
      '150 g de haricots verts',
      '2 tomates',
      '1 oignon',
      '3 gousses d’ail',
      'Huile',
      'Sel et poivre'
    ],
    steps: [
      'Assaisonner puis faire frire les morceaux de poulet.',
      'Découper les plantains et les faire frire.',
      'Faire revenir oignon, ail, tomates et légumes.',
      'Ajouter le poulet et laisser mijoter.',
      'Ajouter les plantains à la fin.',
      'Servir chaud.'
    ]
  },

  {
    id: '4',
    name: 'Eru',
    region: 'Sud-Ouest',
    description: 'Plat traditionnel du Sud-Ouest préparé avec feuilles d’eru, waterleaf et viande ou poisson fumé.',
    image: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Le%20Eru,%20un%20plat%20camerounais.jpg',
    ingredients: [
      '500 g de feuilles d’eru',
      '300 g de waterleaf',
      '300 g de viande',
      '200 g de poisson fumé',
      '100 ml d’huile de palme',
      '1 oignon',
      'Piment selon le goût',
      'Sel'
    ],
    steps: [
      'Laver et découper les feuilles.',
      'Cuire la viande jusqu’à ce qu’elle soit tendre.',
      'Ajouter le poisson fumé.',
      'Ajouter le waterleaf puis l’eru.',
      'Verser l’huile de palme.',
      'Laisser mijoter jusqu’à obtenir une sauce bien liée.'
    ]
  },

  {
    id: '5',
    name: 'Garri et Eru',
    region: 'Sud-Ouest',
    description: 'Eru traditionnel accompagné de garri, une association très appréciée dans le Sud-Ouest.',
    image: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Garri%20and%20Eru.jpg',
    ingredients: [
      '500 g d’eru',
      '300 g de waterleaf',
      '250 g de viande',
      '150 g de poisson fumé',
      '100 ml d’huile de palme',
      '300 g de garri',
      'Sel'
    ],
    steps: [
      'Préparer l’eru avec la viande et le poisson fumé.',
      'Ajouter progressivement les feuilles.',
      'Ajouter l’huile de palme.',
      'Laisser mijoter jusqu’à obtenir la texture souhaitée.',
      'Préparer le garri dans un bol.',
      'Servir l’eru chaud avec le garri.'
    ]
  },

  {
    id: '6',
    name: 'Water fufu et Eru',
    region: 'Sud-Ouest',
    description: 'Water fufu accompagné de la sauce eru traditionnelle.',
    image: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Water%20fufu%20and%20Eru.jpg',
    ingredients: [
      '500 g de manioc fermenté',
      '500 g de feuilles d’eru',
      '300 g de waterleaf',
      '250 g de viande',
      '150 g de poisson fumé',
      'Huile de palme',
      'Sel'
    ],
    steps: [
      'Préparer la pâte de manioc fermenté.',
      'Cuire la pâte avec de l’eau en remuant continuellement.',
      'Former une pâte lisse et élastique.',
      'Préparer l’eru avec viande, poisson et légumes.',
      'Ajouter l’huile de palme.',
      'Servir le water fufu avec l’eru.'
    ]
  },

  {
    id: '7',
    name: 'Achu et sauce jaune',
    region: 'Ouest',
    description: 'Taro pilé accompagné de la traditionnelle sauce jaune.',
    image: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Achu%20meal.jpg',
    ingredients: [
      '1 kg de taro',
      '300 g de viande',
      '100 g de peau de bœuf',
      '100 g d’huile de palme',
      'Épices jaunes',
      'Piment',
      'Sel'
    ],
    steps: [
      'Cuire le taro jusqu’à ce qu’il soit très tendre.',
      'Éplucher puis piler le taro chaud.',
      'Préparer le bouillon avec la viande et la peau de bœuf.',
      'Ajouter les épices et l’huile de palme.',
      'Ajuster le sel et le piment.',
      'Servir la pâte de taro avec la sauce jaune.'
    ]
  },

  {
    id: '8',
    name: 'Taro sauce jaune',
    region: 'Ouest',
    description: 'Taro accompagné d’une sauce jaune traditionnelle avec viande et peau de bœuf.',
    image: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Taro%20sauce%20jaune%20avec%20peau%20de%20boeuf.jpg',
    ingredients: [
      '1 kg de taro',
      '300 g de viande de bœuf',
      '150 g de peau de bœuf',
      'Huile de palme',
      'Épices jaunes',
      'Piment',
      'Sel'
    ],
    steps: [
      'Cuire le taro jusqu’à ce qu’il soit tendre.',
      'Piler le taro pour obtenir une pâte homogène.',
      'Cuire la viande et la peau de bœuf.',
      'Préparer la sauce avec les épices jaunes.',
      'Ajouter l’huile de palme.',
      'Servir avec le taro pilé.'
    ]
  },

  {
    id: '9',
    name: 'Koki',
    region: 'Littoral',
    description: 'Gâteau de haricots traditionnel cuit dans des feuilles de bananier.',
    image: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Koki%20Beans.jpg',
    ingredients: [
      '500 g de niébé',
      '150 ml d’huile de palme',
      '1 oignon',
      'Piment',
      'Sel',
      'Feuilles de bananier'
    ],
    steps: [
      'Tremper les haricots puis retirer leur peau.',
      'Écraser les haricots jusqu’à obtenir une pâte.',
      'Ajouter l’huile de palme, le sel et le piment.',
      'Mélanger soigneusement.',
      'Envelopper dans les feuilles de bananier.',
      'Cuire à la vapeur pendant environ une heure.'
    ]
  },

  {
    id: '10',
    name: 'Koki et plantain mûr',
    region: 'Littoral',
    description: 'Koki de haricots servi avec des plantains mûrs.',
    image: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Koki%20and%20ripe%20plantains.jpg',
    ingredients: [
      '500 g de koki',
      '4 plantains mûrs',
      'Huile de palme',
      'Sel'
    ],
    steps: [
      'Préparer le koki et le cuire dans les feuilles.',
      'Éplucher les plantains.',
      'Faire bouillir ou frire les plantains selon le goût.',
      'Découper le koki en portions.',
      'Servir chaud avec les plantains.'
    ]
  },

  {
    id: '11',
    name: 'Kwacoco Bible',
    region: 'Sud-Ouest',
    description: 'Plat traditionnel à base de macabo, souvent préparé avec huile de palme et épices.',
    image: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Kwacoco%20bible.jpg',
    ingredients: [
      '1 kg de macabo',
      '150 ml d’huile de palme',
      '200 g de poisson fumé',
      '1 oignon',
      'Piment',
      'Sel',
      'Feuilles de bananier'
    ],
    steps: [
      'Éplucher et râper le macabo.',
      'Ajouter le poisson fumé émietté.',
      'Ajouter l’huile de palme, l’oignon et les épices.',
      'Mélanger soigneusement.',
      'Envelopper dans des feuilles.',
      'Cuire à la vapeur jusqu’à obtenir une texture ferme.'
    ]
  },

  {
    id: '12',
    name: 'Kati Kati',
    region: 'Nord-Ouest',
    description: 'Poulet traditionnel grillé accompagné de couscous de maïs.',
    image: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/PLAT%20DE%20KATI%20KATI.jpg',
    ingredients: [
      '1 poulet',
      '500 g de maïs pour couscous',
      '2 tomates',
      '1 oignon',
      'Piment',
      'Sel',
      'Épices'
    ],
    steps: [
      'Nettoyer et assaisonner le poulet.',
      'Faire griller le poulet progressivement.',
      'Préparer le couscous de maïs.',
      'Préparer une petite sauce tomate épicée.',
      'Découper le poulet.',
      'Servir avec le couscous de maïs.'
    ]
  },

  {
    id: '13',
    name: 'Fufu de maïs et Kati Kati',
    region: 'Nord-Ouest',
    description: 'Fufu de maïs accompagné de poulet Kati Kati.',
    image: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Fufu%20corn%20and%20khati%20khati.jpg',
    ingredients: [
      '500 g de farine de maïs',
      '1 poulet',
      '2 tomates',
      '1 oignon',
      'Piment',
      'Sel'
    ],
    steps: [
      'Préparer le poulet avec les épices.',
      'Griller le poulet jusqu’à obtenir une peau dorée.',
      'Faire bouillir de l’eau.',
      'Ajouter progressivement la farine de maïs.',
      'Remuer jusqu’à obtenir une pâte ferme.',
      'Servir le fufu avec le poulet.'
    ]
  },

  {
    id: '14',
    name: 'Poisson braisé',
    region: 'Littoral',
    description: 'Poisson assaisonné puis grillé au feu, servi avec une sauce pimentée et des accompagnements.',
    image: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Poisson%20braisé%20et%20fleur%20de%20citron..JPG',
    ingredients: [
      '1 gros poisson',
      '2 gousses d’ail',
      '1 oignon',
      '1 citron',
      'Piment',
      'Persil',
      'Huile',
      'Sel'
    ],
    steps: [
      'Nettoyer et inciser le poisson.',
      'Préparer une marinade avec ail, oignon, citron et épices.',
      'Badigeonner le poisson.',
      'Laisser mariner.',
      'Griller le poisson des deux côtés.',
      'Servir avec plantain, miondo ou bâton de manioc.'
    ]
  },

  {
    id: '15',
    name: 'Sanga',
    region: 'Centre',
    description: 'Plat traditionnel camerounais à base de maïs et de légumes, particulièrement associé aux traditions Beti.',
    image: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Sanga%2C%20Plat%20camerounais.jpg',
    ingredients: [
      '500 g de maïs frais',
      '500 g de feuilles de légumes',
      '200 ml d’huile de palme',
      '1 oignon',
      'Piment',
      'Sel'
    ],
    steps: [
      'Égrener le maïs.',
      'Laver et découper les feuilles.',
      'Faire revenir l’oignon dans l’huile de palme.',
      'Ajouter le maïs.',
      'Ajouter progressivement les feuilles.',
      'Cuire jusqu’à obtenir une préparation bien fondante.'
    ]
  },

  {
    id: '16',
    name: 'Mbongo Tchobi',
    region: 'Littoral',
    description: 'Sauce noire traditionnelle aux épices brûlées, souvent préparée avec du poisson ou de la viande.',
    image: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Mbongo%20Tchobi%20%28sauce%20noir%29.jpg',
    ingredients: [
      '1 kg de poisson ou viande',
      '100 g d’épices mbongo',
      '2 tomates',
      '1 oignon',
      '2 gousses d’ail',
      'Huile',
      'Piment',
      'Sel'
    ],
    steps: [
      'Nettoyer et assaisonner le poisson ou la viande.',
      'Faire griller légèrement les épices.',
      'Écraser les épices avec tomate, oignon et ail.',
      'Faire revenir la préparation dans l’huile.',
      'Ajouter le poisson ou la viande.',
      'Laisser mijoter jusqu’à obtenir une sauce noire parfumée.'
    ]
  },

  {
    id: '17',
    name: 'Ndomba de poulet',
    region: 'Centre',
    description: 'Poulet épicé cuit dans des feuilles de bananier pour conserver ses arômes.',
    image: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Ndomba%20de%20poulet.jpg',
    ingredients: [
      '1 poulet',
      '2 oignons',
      '3 gousses d’ail',
      'Gingembre',
      'Piment',
      'Poivre',
      'Sel',
      'Feuilles de bananier'
    ],
    steps: [
      'Découper et assaisonner le poulet.',
      'Écraser ail, gingembre, oignon et épices.',
      'Mélanger le poulet avec les aromates.',
      'Placer la préparation dans les feuilles de bananier.',
      'Fermer soigneusement le paquet.',
      'Cuire à la vapeur jusqu’à ce que le poulet soit tendre.'
    ]
  },

  {
    id: '18',
    name: 'Ndomba de porc',
    region: 'Centre',
    description: 'Porc épicé cuit traditionnellement dans des feuilles de bananier.',
    image: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Ndomba%20de%20porc%20et%20frites%20de%20plantain%20mûr.jpg',
    ingredients: [
      '800 g de porc',
      '2 oignons',
      '3 gousses d’ail',
      'Gingembre',
      'Piment',
      'Poivre',
      'Sel',
      'Plantains mûrs'
    ],
    steps: [
      'Découper le porc.',
      'Préparer la marinade avec ail, gingembre et épices.',
      'Mélanger le porc avec la marinade.',
      'Envelopper dans des feuilles de bananier.',
      'Cuire doucement jusqu’à ce que la viande soit tendre.',
      'Servir avec des plantains mûrs.'
    ]
  },

  {
    id: '19',
    name: 'Suya',
    region: 'Extrême-Nord',
    description: 'Brochettes de viande grillée fortement assaisonnées, populaires dans la cuisine camerounaise.',
    image: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Suya.jpg',
    ingredients: [
      '500 g de bœuf',
      '100 g d’arachides grillées',
      'Piment',
      'Paprika',
      'Poivre',
      'Sel',
      'Huile'
    ],
    steps: [
      'Découper la viande en fines lamelles.',
      'Préparer la poudre d’arachides et les épices.',
      'Enrober généreusement la viande.',
      'Placer la viande sur des brochettes.',
      'Griller sur feu vif en retournant régulièrement.',
      'Servir chaud avec oignons et tomates.'
    ]
  },

  {
    id: '20',
    name: 'Nnam Ngon',
    region: 'Centre',
    description: 'Préparation traditionnelle camerounaise à base de pistache, généralement cuite dans des feuilles.',
    image: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Le%20mets%20de%20pistache%20%28Nnam%20ngon%29.jpg',
    ingredients: [
      '500 g de graines de pistache',
      '200 g de viande ou poisson',
      '1 oignon',
      'Piment',
      'Sel',
      'Feuilles de bananier'
    ],
    steps: [
      'Écraser les graines de pistache.',
      'Ajouter la viande ou le poisson.',
      'Ajouter oignon, piment et sel.',
      'Mélanger jusqu’à obtenir une pâte homogène.',
      'Envelopper dans les feuilles.',
      'Cuire à la vapeur jusqu’à obtenir une préparation ferme.'
    ]
  },

  {
    id: '21',
    name: 'Mintumba',
    region: 'Littoral',
    description: 'Gâteau traditionnel préparé à base de manioc et cuit dans des feuilles.',
    image: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Mintumba.jpg',
    ingredients: [
      '1 kg de manioc',
      '150 ml d’huile de palme',
      '1 oignon',
      'Piment',
      'Sel',
      'Feuilles de bananier'
    ],
    steps: [
      'Éplucher et râper le manioc.',
      'Presser le manioc pour retirer l’excès d’eau.',
      'Ajouter l’huile de palme et les épices.',
      'Mélanger soigneusement.',
      'Envelopper dans les feuilles.',
      'Cuire à la vapeur jusqu’à obtenir une texture ferme.'
    ]
  }
];
  


const REGIONS = [
  'Toutes',
  ...Array.from(new Set(RECIPES.map((item) => item.region)))
];

export default function App() {
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('Toutes');
  const [selected, setSelected] = useState(null);

  const filteredRecipes = useMemo(() => {
    const query = search.trim().toLowerCase();

    return RECIPES.filter((recipe) => {
      const matchesRegion =
        region === 'Toutes' || recipe.region === region;

      const text =
        `${recipe.name} ${recipe.region} ${recipe.description} ${recipe.ingredients.join(' ')}`
          .toLowerCase();

      return matchesRegion && (!query || text.includes(query));
    });
  }, [search, region]);

        return (
  <SafeAreaView style={styles.safe}>
    <StatusBar
      barStyle="light-content"
      backgroundColor="#0B6B3A"
    />

    <View style={styles.page}>
      <ImageBackground
        source={{ uri: encodeURI(RECIPES[0]?.image) }}
        style={styles.header}
        imageStyle={styles.headerImage}
      >
        <View style={styles.headerOverlay}>
          <Text style={styles.logo}>Cam Food</Text>

          <Text style={styles.subtitle}>
            La cuisine camerounaise dans votre téléphone
          </Text>

          <View style={styles.searchBox}>
            <Text style={styles.searchIcon}>⌕</Text>

            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Rechercher une recette ou un ingrédient..."
              placeholderTextColor="#777"
              style={styles.search}
            />
          </View>
        </View>
      </ImageBackground>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>
          Découvrir par région
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filters}
        >
          {REGIONS.map((item) => (
            <Pressable
              key={item}
              onPress={() => setRegion(item)}
              style={[
                styles.filter,
                region === item && styles.filterActive
              ]}
            >
              <Text
                style={[
                  styles.filterText,
                  region === item && styles.filterTextActive
                ]}
              >
                {item}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        <View style={styles.recipeHeader}>
          <Text style={styles.sectionTitle}>
            Recettes
          </Text>

          <Text style={styles.recipeCount}>
            {filteredRecipes.length}
          </Text>
        </View>

        <FlatList
          data={filteredRecipes}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Text style={styles.emptyTitle}>
                Aucune recette trouvée
              </Text>

              <Text style={styles.emptyText}>
                Essayez un autre nom, ingrédient ou région.
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <Pressable
              style={styles.card}
              onPress={() => setSelected(item)}
            >
              <Image
                source={{ uri: encodeURI(item.image) }}
                style={styles.cardImage}
              />

              <View style={styles.cardBody}>
                <View style={styles.rowBetween}>
                  <Text style={styles.cardTitle}>
                    {item.name}
                  </Text>

                  <View style={styles.regionBadge}>
                    <Text style={styles.region}>
                      {item.region}
                    </Text>
                  </View>
                </View>

                <Text style={styles.description}>
                  {item.description}
                </Text>

                <Text style={styles.openText}>
                  Voir la recette  →
                </Text>
              </View>
            </Pressable>
          )}
        />

      </View>

      <Modal
        visible={Boolean(selected)}
        animationType="slide"
        onRequestClose={() => setSelected(null)}
      >
        {selected && (
          <SafeAreaView style={styles.modalSafe}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Image
                source={{ uri: encodeURI(selected.image) }}
                style={styles.hero}
              />

              <View style={styles.detail}>
                <Pressable
                  onPress={() => setSelected(null)}
                  style={styles.close}
                >
                  <Text style={styles.closeText}>
                    Fermer
                  </Text>
                </Pressable>

                <Text style={styles.detailTitle}>
                  {selected.name}
                </Text>

                <View style={styles.detailRegionBadge}>
                  <Text style={styles.detailRegion}>
                    {selected.region}
                  </Text>
                </View>

                <Text style={styles.detailDescription}>
                  {selected.description}
                </Text>

                <Text style={styles.detailHeading}>
                  Ingrédients
                </Text>

                {selected.ingredients.map(
                  (ingredient, index) => (
                    <Text
                      key={`${selected.id}-i-${index}`}
                      style={styles.bullet}
                    >
                      • {ingredient}
                    </Text>
                  )
                )}

                <Text style={styles.detailHeading}>
                  Préparation
                </Text>

                {selected.steps.map((step, index) => (
                  <View
                    key={`${selected.id}-s-${index}`}
                    style={styles.step}
                  >
                    <View style={styles.number}>
                      <Text style={styles.numberText}>
                        {index + 1}
                      </Text>
                    </View>

                    <Text style={styles.stepText}>
                      {step}
                    </Text>
                  </View>
                ))}
              </View>
            </ScrollView>
          </SafeAreaView>
        )}
      </Modal>
    </View>
  </SafeAreaView>
);
    
  


const styles = StyleSheet.create({
    safe: {
    flex: 1,
    backgroundColor: '#F5F1E8'
  },

  page: {
    flex: 1,
    backgroundColor: '#F5F1E8'
  },

  header: {
    height: 235,
    justifyContent: 'flex-end'
  },

  headerImage: {
    opacity: 0.9
  },

  headerOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 18,
    paddingBottom: 20,
    paddingTop: 25,
    backgroundColor: 'rgba(5, 70, 35, 0.68)'
  },

  logo: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '900'
  },

  subtitle: {
    color: '#F0FFF5',
    marginTop: 4,
    fontSize: 14,
    fontWeight: '500'
  },

  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginTop: 16,
    paddingHorizontal: 13,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5
  },

  searchIcon: {
    fontSize: 25,
    color: '#0B6B3A',
    marginRight: 4
  },

  search: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 13,
    fontSize: 15,
    color: '#222'
  },

  content: {
    flex: 1,
    paddingHorizontal: 16
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: '900',
    color: '#202020',
    marginTop: 16,
    marginBottom: 9
  },

  filters: {
    paddingRight: 10
  },

  filter: {
    paddingHorizontal: 15,
    paddingVertical: 9,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDD8CE',
    marginRight: 8
  },

  filterActive: {
    backgroundColor: '#0B6B3A',
    borderColor: '#0B6B3A'
  },

  filterText: {
    color: '#444',
    fontWeight: '700'
  },

  filterTextActive: {
    color: '#FFFFFF'
  },

  recipeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  recipeCount: {
    backgroundColor: '#0B6B3A',
    color: '#FFFFFF',
    minWidth: 32,
    textAlign: 'center',
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 15,
    fontWeight: '900',
    overflow: 'hidden'
  },

  list: {
    paddingBottom: 30
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E0D6',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3
    },
    elevation: 3
  },

  cardImage: {
    width: '100%',
    height: 205,
    backgroundColor: '#DDD'
  },

  cardBody: {
    padding: 15
  },

  rowBetween: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },

  cardTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: '900',
    color: '#202020',
    marginRight: 8
  },

  regionBadge: {
    backgroundColor: '#E8F5ED',
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 12
  },

  region: {
    color: '#0B6B3A',
    fontWeight: '800',
    fontSize: 11
  },

  description: {
    color: '#666',
    marginTop: 8,
    lineHeight: 20,
    fontSize: 14
  },

  openText: {
    color: '#0B6B3A',
    fontWeight: '900',
    marginTop: 12,
    fontSize: 14
  },

  empty: {
    alignItems: 'center',
    paddingVertical: 50
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#222'
  },

  emptyText: {
    color: '#666',
    marginTop: 6,
    textAlign: 'center'
  },

  modalSafe: {
    flex: 1,
    backgroundColor: '#F5F1E8'
  },

  hero: {
    width: '100%',
    height: 280,
    backgroundColor: '#DDD'
  },

  detail: {
    padding: 18,
    paddingBottom: 45
  },

  close: {
    alignSelf: 'flex-end',
    backgroundColor: '#E8E4DB',
    paddingHorizontal: 15,
    paddingVertical: 9,
    borderRadius: 20,
    marginBottom: 12
  },

  closeText: {
    color: '#333',
    fontWeight: '800'
  },

  detailTitle: {
    fontSize: 30,
    fontWeight: '900',
    color: '#202020'
  },

  detailRegionBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#E8F5ED',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 15,
    marginTop: 8
  },

  detailRegion: {
    color: '#0B6B3A',
    fontWeight: '900'
  },

  detailDescription: {
    color: '#555',
    lineHeight: 22,
    marginTop: 12,
    fontSize: 15
  },

  detailHeading: {
    fontSize: 21,
    fontWeight: '900',
    marginTop: 25,
    marginBottom: 11,
    color: '#202020'
  },

  bullet: {
    fontSize: 15,
    lineHeight: 23,
    color: '#333',
    marginBottom: 6
  },

  step: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 14
  },

  number: {
    width: 31,
    height: 31,
    borderRadius: 16,
    backgroundColor: '#0B6B3A',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10
  },

  numberText: {
    color: '#FFFFFF',
    fontWeight: '900'
  },

  stepText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
    color: '#333',
    paddingTop: 3
  }
});


          
          
                          
                                    
      

  

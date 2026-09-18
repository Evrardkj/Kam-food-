
      
      import React, { useMemo, useState } from 'react';
import {
  FlatList,
  Image,
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
    description: 'Feuilles de ndolé, arachides et viande ou poisson.',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=80',
    ingredients: [
      '500 g de feuilles de ndolé',
      '250 g d’arachides',
      '300 g de viande ou poisson',
      '2 oignons',
      '2 gousses d’ail',
      'Huile, sel et épices'
    ],
    steps: [
      'Nettoyer et préparer les feuilles de ndolé.',
      'Cuire les arachides puis les écraser.',
      'Faire revenir les oignons et l’ail dans un peu d’huile.',
      'Ajouter la viande ou le poisson et cuire.',
      'Ajouter les arachides puis les feuilles de ndolé.',
      'Laisser mijoter quelques minutes et servir chaud.'
    ]
  },
  {
    id: '2',
    name: 'Poulet DG',
    region: 'Centre',
    description: 'Poulet mijoté avec plantain et légumes.',
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=1000&q=80',
    ingredients: [
      '1 poulet découpé',
      '6 bananes plantain',
      '2 carottes',
      '1 poivron',
      '2 tomates',
      '2 oignons',
      'Huile, sel et épices'
    ],
    steps: [
      'Assaisonner le poulet puis le cuire jusqu’à ce qu’il soit doré.',
      'Découper et frire les plantains.',
      'Faire revenir les légumes et les oignons.',
      'Ajouter le poulet et un peu d’eau.',
      'Ajouter les plantains à la fin.',
      'Mélanger délicatement et servir.'
    ]
  },
  {
    id: '3',
    name: 'Eru',
    region: 'Sud-Ouest',
    description: 'Plat de feuilles traditionnel accompagné de water fufu ou garri.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1000&q=80',
    ingredients: [
      'Feuilles d’eru',
      'Waterleaf',
      'Poisson fumé ou viande',
      'Crevettes séchées',
      'Huile de palme',
      'Sel et épices'
    ],
    steps: [
      'Laver et découper les feuilles.',
      'Cuire la viande ou le poisson.',
      'Ajouter les feuilles et laisser cuire doucement.',
      'Ajouter les crevettes et les assaisonnements.',
      'Verser l’huile de palme.',
      'Mijoter puis servir avec l’accompagnement choisi.'
    ]
  },
  {
    id: '4',
    name: 'Koki',
    region: 'Littoral',
    description: 'Préparation de haricots cuite à la vapeur.',
    image: 'https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&w=1000&q=80',
    ingredients: [
      '500 g de haricots blancs',
      'Huile de palme',
      'Piment selon le goût',
      '1 oignon',
      'Sel'
    ],
    steps: [
      'Tremper les haricots puis retirer les peaux.',
      'Écraser les haricots avec l’oignon et le piment.',
      'Ajouter le sel et l’huile de palme.',
      'Verser la préparation dans des feuilles ou des moules.',
      'Cuire à la vapeur jusqu’à ce que le koki soit ferme.',
      'Laisser tiédir avant de servir.'
    ]
  },
  {
    id: '5',
    name: 'Achou',
    region: 'Nord-Ouest',
    description: 'Taro pilé servi avec une sauce jaune traditionnelle.',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1000&q=80',
    ingredients: [
      'Taro',
      'Huile de palme',
      'Épices jaunes',
      'Poisson fumé ou viande',
      'Piment',
      'Sel'
    ],
    steps: [
      'Cuire le taro jusqu’à ce qu’il soit tendre.',
      'Piler le taro jusqu’à obtenir une pâte homogène.',
      'Préparer la sauce avec l’huile et les épices.',
      'Ajouter le poisson ou la viande.',
      'Rectifier l’assaisonnement.',
      'Servir l’achou avec la sauce.'
    ]
  },
  {
    id: '6',
    name: 'Mbongo Tchobi',
    region: 'Littoral',
    description: 'Poisson préparé dans une sauce noire épicée.',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1000&q=80',
    ingredients: [
      '1 poisson entier ou en morceaux',
      'Épices mbongo',
      '2 tomates',
      '2 oignons',
      'Ail',
      'Huile et sel'
    ],
    steps: [
      'Nettoyer et assaisonner le poisson.',
      'Faire revenir les oignons et l’ail.',
      'Ajouter les tomates et les épices mbongo.',
      'Ajouter le poisson et un peu d’eau.',
      'Couvrir et laisser mijoter.',
      'Servir chaud avec l’accompagnement de votre choix.'
    ]
  },
  {
    id: '7',
    name: 'Soupe de pistache',
    region: 'Ouest',
    description: 'Sauce épaisse aux graines de pistache.',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=80',
    ingredients: [
      '300 g de pistaches',
      '300 g de viande ou poisson',
      '2 tomates',
      '1 oignon',
      'Piment',
      'Sel et épices'
    ],
    steps: [
      'Écraser les pistaches.',
      'Préparer et cuire la viande ou le poisson.',
      'Faire revenir l’oignon et les tomates.',
      'Ajouter les pistaches progressivement.',
      'Ajouter de l’eau et laisser cuire doucement.',
      'Assaisonner et servir.'
    ]
  },
  {
    id: '8',
    name: 'Plantain mûr sauté',
    region: 'Est',
    description: 'Bananes plantain mûres dorées et légèrement épicées.',
    image: 'https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=1000&q=80',
    ingredients: [
      '4 bananes plantain mûres',
      'Huile',
      'Sel',
      'Piment facultatif'
    ],
    steps: [
      'Éplucher les plantains.',
      'Les couper en morceaux.',
      'Faire chauffer un peu d’huile.',
      'Faire dorer les morceaux sur chaque face.',
      'Ajouter une petite pincée de sel.',
      'Servir chaud.'
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

      <View style={styles.header}>
        <Text style={styles.logo}>Cam Food</Text>
        <Text style={styles.subtitle}>
          La cuisine camerounaise dans votre téléphone
        </Text>
      </View>

      <View style={styles.content}>
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Rechercher une recette ou un ingrédient..."
          placeholderTextColor="#777"
          style={styles.search}
        />

        <Text style={styles.sectionTitle}>Régions</Text>

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

        <Text style={styles.sectionTitle}>
          Recettes
          {filteredRecipes.length > 0
            ? ` (${filteredRecipes.length})`
            : ''}
        </Text>

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
                source={{ uri: item.image }}
                style={styles.cardImage}
              />

              <View style={styles.cardBody}>
                <View style={styles.rowBetween}>
                  <Text style={styles.cardTitle}>
                    {item.name}
                  </Text>

                  <Text style={styles.region}>
                    {item.region}
                  </Text>
                </View>

                <Text style={styles.description}>
                  {item.description}
                </Text>

                <Text style={styles.openText}>
                  Voir la recette ›
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
            <ScrollView>
              <Image
                source={{ uri: selected.image }}
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

                <Text style={styles.detailRegion}>
                  {selected.region}
                </Text>

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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F7F4EE'
  },

  header: {
    backgroundColor: '#0B6B3A',
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 20
  },

  logo: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '800'
  },

  subtitle: {
    color: '#E8F5ED',
    marginTop: 4,
    fontSize: 14
  },

  content: {
    flex: 1,
    paddingHorizontal: 16
  },

  search: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E1DDD4',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 13,
    marginTop: 14,
    fontSize: 15,
    color: '#222'
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#202020',
    marginTop: 16,
    marginBottom: 9
  },

  filters: {
    paddingRight: 10
  },

  filter: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 20,
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
    fontWeight: '600'
  },

  filterTextActive: {
    color: '#FFFFFF'
  },

  list: {
    paddingBottom: 24
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E4E0D8'
  },

  cardImage: {
    width: '100%',
    height: 190,
    backgroundColor: '#DDD'
  },

  cardBody: {
    padding: 14
  },

  rowBetween: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },

  cardTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: '800',
    color: '#202020'
  },

  region: {
    color: '#0B6B3A',
    fontWeight: '700',
    fontSize: 12,
    marginLeft: 8
  },

  description: {
    color: '#666',
    marginTop: 7,
    lineHeight: 20
  },

  openText: {
    color: '#0B6B3A',
    fontWeight: '800',
    marginTop: 10
  },

  empty: {
    alignItems: 'center',
    paddingVertical: 50
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: '800'
  },

  emptyText: {
    color: '#666',
    marginTop: 6
  },

  modalSafe: {
    flex: 1,
    backgroundColor: '#F7F4EE'
  },

  hero: {
    width: '100%',
    height: 260,
    backgroundColor: '#DDD'
  },

  detail: {
    padding: 18,
    paddingBottom: 40
  },

  close: {
    alignSelf: 'flex-end',
    backgroundColor: '#E8E4DB',
    paddingHorizontal: 13,
    paddingVertical: 8,
    borderRadius: 18,
    marginBottom: 10
  },

  closeText: {
    color: '#333',
    fontWeight: '700'
  },

  detailTitle: {
    fontSize: 30,
    fontWeight: '900',
    color: '#202020'
  },

  detailRegion: {
    color: '#0B6B3A',
    fontWeight: '800',
    marginTop: 4
  },

  detailDescription: {
    color: '#555',
    lineHeight: 21,
    marginTop: 10
  },

  detailHeading: {
    fontSize: 21,
    fontWeight: '900',
    marginTop: 24,
    marginBottom: 10,
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
    marginBottom: 13
  },

  number: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#0B6B3A',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10
  },

  numberText: {
    color: '#FFFFFF',
    fontWeight: '800'
  },

  stepText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
    color: '#333',
    paddingTop: 3
  }
});
          
          
                          
                                    
      

  

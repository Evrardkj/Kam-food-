import React, { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Speech from 'expo-speech';

const RECIPES = [
  {
    id: '1',
    name: 'Ndolé',
    region: 'Littoral',
    time: '1 h 30',
    difficulty: 'Moyen',
    image:
      'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80',
    ingredients: [
      'Feuilles de ndolé',
      'Arachides',
      'Crevettes ou viande',
      'Oignons',
      'Ail',
      'Huile',
      'Sel',
    ],
    steps: [
      'Nettoyer et blanchir les feuilles de ndolé.',
      'Préparer et griller les arachides puis les écraser.',
      'Faire revenir les oignons, l’ail et la viande ou les crevettes.',
      'Ajouter les arachides et les feuilles de ndolé.',
      'Laisser mijoter puis servir chaud.',
    ],
  },

  {
    id: '2',
    name: 'Poulet DG',
    region: 'Littoral',
    time: '1 h',
    difficulty: 'Moyen',
    image:
      'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=900&q=80',
    ingredients: [
      'Poulet',
      'Plantains mûrs',
      'Carottes',
      'Haricots verts',
      'Poivrons',
      'Oignons',
      'Huile',
    ],
    steps: [
      'Découper et assaisonner le poulet.',
      'Frire ou rôtir les morceaux de poulet.',
      'Découper les plantains et les faire dorer.',
      'Faire revenir les légumes avec les oignons.',
      'Mélanger le poulet, les plantains et les légumes puis laisser mijoter quelques minutes.',
    ],
  },

  {
    id: '3',
    name: 'Eru',
    region: 'Sud-Ouest',
    time: '1 h 15',
    difficulty: 'Moyen',
    image:
      'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=80',
    ingredients: [
      'Eru',
      'Waterleaf',
      'Viande',
      'Poisson fumé',
      'Crevettes',
      'Huile de palme',
    ],
    steps: [
      'Laver et découper les feuilles.',
      'Cuire la viande et le poisson fumé.',
      'Ajouter le waterleaf puis l’eru.',
      'Ajouter les crevettes et l’huile de palme.',
      'Laisser mijoter jusqu’à obtenir une sauce bien liée.',
    ],
  },

  {
    id: '4',
    name: 'Koki',
    region: 'Ouest',
    time: '1 h 30',
    difficulty: 'Moyen',
    image:
      'https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=900&q=80',
    ingredients: [
      'Haricots cornille',
      'Huile de palme',
      'Piment',
      'Oignons',
      'Feuilles de bananier',
      'Sel',
    ],
    steps: [
      'Tremper puis moudre les haricots.',
      'Mélanger avec l’huile de palme, le sel et les aromates.',
      'Former les portions dans des feuilles de bananier.',
      'Cuire à la vapeur jusqu’à ce que le koki soit ferme.',
    ],
  },

  {
    id: '5',
    name: 'Achu',
    region: 'Nord-Ouest',
    time: '1 h 45',
    difficulty: 'Difficile',
    image:
      'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=80',
    ingredients: [
      'Taro',
      'Viande',
      'Huile rouge',
      'Épices',
      'Sel',
      'Eau',
    ],
    steps: [
      'Cuire le taro jusqu’à ce qu’il soit tendre.',
      'Piler le taro pour former une pâte lisse.',
      'Préparer la soupe jaune avec la viande et les épices.',
      'Ajouter l’huile rouge selon le goût.',
      'Servir l’achu avec la soupe.',
    ],
  },

  {
    id: '6',
    name: 'Poisson braisé',
    region: 'Centre',
    time: '45 min',
    difficulty: 'Facile',
    image:
      'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=900&q=80',
    ingredients: [
      'Poisson frais',
      'Ail',
      'Gingembre',
      'Oignons',
      'Piment',
      'Citron',
      'Huile',
    ],
    steps: [
      'Nettoyer et inciser le poisson.',
      'Écraser l’ail, le gingembre, le piment et les oignons.',
      'Mariner le poisson avec les épices et le citron.',
      'Braiser au feu ou au four en retournant régulièrement.',
      'Servir avec plantain, miondo ou bâtons de manioc.',
    ],
  },

  {
    id: '7',
    name: 'Mbongo Tchobi',
    region: 'Littoral',
    time: '1 h',
    difficulty: 'Moyen',
    image:
      'https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=900&q=80',
    ingredients: [
      'Poisson ou viande',
      'Épices mbongo',
      'Tomates',
      'Oignons',
      'Ail',
      'Huile',
    ],
    steps: [
      'Nettoyer le poisson ou préparer la viande.',
      'Griller légèrement les épices et les aromates.',
      'Faire revenir la préparation.',
      'Ajouter le poisson ou la viande et un peu d’eau.',
      'Cuire doucement jusqu’à obtenir une sauce noire parfumée.',
    ],
  },

  {
    id: '8',
    name: 'Plantain mûr frit',
    region: 'National',
    time: '20 min',
    difficulty: 'Facile',
    image:
      'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=80',
    ingredients: ['Plantains mûrs', 'Huile', 'Sel'],
    steps: [
      'Éplucher les plantains.',
      'Les couper en morceaux.',
      'Chauffer l’huile.',
      'Faire frire jusqu’à obtenir une belle coloration dorée.',
      'Égoutter et servir.',
    ],
  },
];

const REGIONS = [
  'Toutes',
  'Centre',
  'Littoral',
  'Ouest',
  'Nord-Ouest',
  'Sud-Ouest',
  'National',
];

const FAVORITES_KEY = 'camfood_favorites';
const SHOPPING_KEY = 'camfood_shopping';

function RecipeCard({
  recipe,
  isFavorite,
  onToggleFavorite,
  onOpen,
}) {
  return (
    <Pressable
      style={styles.card}
      onPress={() => onOpen(recipe)}
    >
      <Image
        source={{ uri: recipe.image }}
        style={styles.cardImage}
      />

      <View style={styles.cardBody}>
        <View style={styles.row}>
          <Text style={styles.cardTitle}>
            {recipe.name}
          </Text>

          <Pressable
            onPress={() => onToggleFavorite(recipe.id)}
            hitSlop={10}
            style={styles.heartButton}
          >
            <Text style={styles.heart}>
              {isFavorite ? '♥' : '♡'}
            </Text>
          </Pressable>
        </View>

        <Text style={styles.muted}>
          {recipe.region} • {recipe.time} • {recipe.difficulty}
        </Text>
      </View>
    </Pressable>
  );
}

export default function App() {
  const [tab, setTab] = useState('home');
  const [query, setQuery] = useState('');
  const [region, setRegion] = useState('Toutes');
  const [favorites, setFavorites] = useState([]);
  const [shopping, setShopping] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    loadSavedData();
  }, []);

  async function loadSavedData() {
    try {
      const savedFavorites =
        await AsyncStorage.getItem(FAVORITES_KEY);

      const savedShopping =
        await AsyncStorage.getItem(SHOPPING_KEY);

      if (savedFavorites) {
        const parsedFavorites =
          JSON.parse(savedFavorites);

        if (Array.isArray(parsedFavorites)) {
          setFavorites(parsedFavorites);
        }
      }

      if (savedShopping) {
        const parsedShopping =
          JSON.parse(savedShopping);

        if (Array.isArray(parsedShopping)) {
          setShopping(parsedShopping);
        }
      }
    } catch (error) {
      console.log('Erreur de chargement:', error);
    }
  }

  async function saveFavorites(nextFavorites) {
    try {
      setFavorites(nextFavorites);

      await AsyncStorage.setItem(
        FAVORITES_KEY,
        JSON.stringify(nextFavorites)
      );
    } catch (error) {
      Alert.alert(
        'Erreur',
        'Impossible d’enregistrer les favoris.'
      );
    }
  }

  async function toggleFavorite(id) {
    const nextFavorites = favorites.includes(id)
      ? favorites.filter((item) => item !== id)
      : [...favorites, id];

    await saveFavorites(nextFavorites);
  }

  async function addToShoppingList(item) {
    if (shopping.includes(item)) {
      return;
    }

    const nextShopping = [
      ...shopping,
      item,
    ];

    try {
      setShopping(nextShopping);

      await AsyncStorage.setItem(
        SHOPPING_KEY,
        JSON.stringify(nextShopping)
      );
    } catch (error) {
      Alert.alert(
        'Erreur',
        'Impossible d’enregistrer la liste de courses.'
      );
    }
  }

  async function removeFromShoppingList(item) {
    const nextShopping =
      shopping.filter((value) => value !== item);

    try {
      setShopping(nextShopping);

      await AsyncStorage.setItem(
        SHOPPING_KEY,
        JSON.stringify(nextShopping)
      );
    } catch (error) {
      Alert.alert(
        'Erreur',
        'Impossible de modifier la liste de courses.'
      );
    }
  }

  async function clearShoppingList() {
    try {
      setShopping([]);

      await AsyncStorage.setItem(
        SHOPPING_KEY,
        JSON.stringify([])
      );
    } catch (error) {
      Alert.alert(
        'Erreur',
        'Impossible de vider la liste de courses.'
      );
    }
  }

  function speakRecipe(recipe) {
    Speech.stop();

    const text = [
      recipe.name,
      'Ingrédients',
      ...recipe.ingredients,
      'Préparation',
      ...recipe.steps,
    ].join('. ');

    Speech.speak(text, {
      language: 'fr-FR',
      rate: 0.9,
    });
  }

  async function shareRecipe(recipe) {
    const message = [
      `Cam Food — ${recipe.name}`,
      '',
      `Ingrédients : ${recipe.ingredients.join(', ')}`,
      '',
      `Préparation : ${recipe.steps.join(' ')}`,
    ].join('\n');

    try {
      await Share.share({
        message,
        title: recipe.name,
      });
    } catch (error) {
      Alert.alert(
        'Partager',
        message
      );
    }
  }

  const filteredRecipes = useMemo(() => {
    const normalizedQuery =
      query.trim().toLowerCase();

    return RECIPES.filter((recipe) => {
      const matchesQuery =
        !normalizedQuery ||
        recipe.name
          .toLowerCase()
          .includes(normalizedQuery) ||
        recipe.ingredients.some((ingredient) =>
          ingredient
            .toLowerCase()
            .includes(normalizedQuery)
        );

      const matchesRegion =
        region === 'Toutes' ||
        recipe.region === region;

      return matchesQuery && matchesRegion;
    });
  }, [query, region]);

  function renderRecipe(recipe) {
    return (
      <RecipeCard
        recipe={recipe}
        isFavorite={favorites.includes(recipe.id)}
        onToggleFavorite={toggleFavorite}
        onOpen={setSelected}
      />
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <Text style={styles.logo}>
          CAM <Text style={styles.green}>FOOD</Text>
        </Text>

        <Text style={styles.tagline}>
          La cuisine du Cameroun dans ta main 🇨🇲
        </Text>
      </View>

      {tab === 'home' && (
        <ScrollView
          contentContainerStyle={styles.content}
        >
          <View style={styles.hero}>
            <Text style={styles.heroTitle}>
              Bienvenue sur Cam Food 👋🏾
            </Text>

            <Text style={styles.heroText}>
              Découvre les recettes camerounaises,
              leurs ingrédients et les étapes
              de préparation.
            </Text>
          </View>

          <Text style={styles.section}>
            Rechercher
          </Text>

          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Ndolé, plantain, poisson..."
            placeholderTextColor="#8A918D"
            style={styles.search}
          />

          <Text style={styles.section}>
            Régions
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.chips}
          >
            {REGIONS.map((item) => (
              <Pressable
                key={item}
                onPress={() => setRegion(item)}
                style={[
                  styles.chip,
                  region === item &&
                    styles.chipActive,
                ]}
              >
                <Text
                  style={[
                    styles.chipText,
                    region === item &&
                      styles.chipTextActive,
                  ]}
                >
                  {item}
                </Text>
              </Pressable>
            ))}
          </ScrollView>

          <Text style={styles.section}>
            Recettes populaires
          </Text>

          {filteredRecipes
            .slice(0, 5)
            .map((recipe) => (
              <View key={recipe.id}>
                {renderRecipe(recipe)}
              </View>
            ))}

          {filteredRecipes.length === 0 && (
            <Text style={styles.empty}>
              Aucune recette ne correspond à ta recherche.
            </Text>
          )}
        </ScrollView>
      )}

      {tab === 'recipes' && (
        <View style={styles.listContainer}>
          <Text style={styles.section}>
            Toutes les recettes ({filteredRecipes.length})
          </Text>

          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Rechercher une recette ou un ingrédient..."
            placeholderTextColor="#8A918D"
            style={styles.search}
          />

          <FlatList
            data={filteredRecipes}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) =>
              renderRecipe(item)
            }
            contentContainerStyle={
              styles.listContent
            }
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <Text style={styles.empty}>
                Aucune recette trouvée.
              </Text>
            }
          />
        </View>
      )}

      {tab === 'favorites' && (
        <View style={styles.listContainer}>
          <Text style={styles.section}>
            Mes favoris ❤️
          </Text>

          <FlatList
            data={RECIPES.filter((recipe) =>
              favorites.includes(recipe.id)
            )}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) =>
              renderRecipe(item)
            }
            contentContainerStyle={
              styles.listContent
            }
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <Text style={styles.empty}>
                Aucune recette favorite pour le moment.
              </Text>
            }
          />
        </View>
      )}

      {tab === 'shopping' && (
        <ScrollView
          contentContainerStyle={styles.content}
        >
          <Text style={styles.section}>
            Ma liste de courses 🛒
          </Text>

          {shopping.length === 0 ? (
            <Text style={styles.empty}>
              Ajoute des ingrédients depuis une recette.
            </Text>
          ) : (
            <>
              {shopping.map((item) => (
                <Pressable
                  key={item}
                  style={styles.shopRow}
                  onPress={() =>
                    removeFromShoppingList(item)
                  }
                >
                  <Text style={styles.shopText}>
                    ☐ {item}
                  </Text>

                  <Text style={styles.remove}>
                    Supprimer
                  </Text>
                </Pressable>
              ))}

              <Pressable
                style={styles.clear}
                onPress={clearShoppingList}
              >
                <Text style={styles.clearText}>
                  Vider la liste
                </Text>
              </Pressable>
            </>
          )}
        </ScrollView>
      )}

      <View style={styles.bottom}>
        {[
          ['home', '🏠', 'Accueil'],
          ['recipes', '🍲', 'Recettes'],
          ['favorites', '❤️', 'Favoris'],
          ['shopping', '🛒', 'Courses'],
        ].map(([key, icon, label]) => (
          <Pressable
            key={key}
            style={styles.tab}
            onPress={() => setTab(key)}
          >
            <Text style={styles.tabIcon}>
              {icon}
            </Text>

            <Text
              style={[
                styles.tabLabel,
                tab === key &&
                  styles.tabActive,
              ]}
            >
              {label}
            </Text>
          </Pressable>
        ))}
      </View>

      <Modal
        visible={!!selected}
        animationType="slide"
        onRequestClose={() =>
          setSelected(null)
        }
      >
        {selected && (
          <SafeAreaView style={styles.modal}>
            <ScrollView
              contentContainerStyle={
                styles.detail
              }
              showsVerticalScrollIndicator={false}
            >
              <Image
                source={{
                  uri: selected.image,
                }}
                style={styles.detailImage}
              />

              <Pressable
                style={styles.close}
                onPress={() =>
                  setSelected(null)
                }
                hitSlop={8}
              >
                <Text style={styles.closeText}>
                  ×
                </Text>
              </Pressable>

              <Text style={styles.detailTitle}>
                {selected.name}
              </Text>

              <Text
                style={[
                  styles.muted,
                  styles.detailMeta,
                ]}
              >
                {selected.region} •{' '}
                {selected.time} •{' '}
                {selected.difficulty}
              </Text>

              <View style={styles.actions}>
                <Pressable
                  style={styles.action}
                  onPress={() =>
                    speakRecipe(selected)
                  }
                >
                  <Text style={styles.actionText}>
                    🔊 Écouter
                  </Text>
                </Pressable>

                <Pressable
                  style={styles.action}
                  onPress={() =>
                    shareRecipe(selected)
                  }
                >
                  <Text style={styles.actionText}>
                    📤 Partager
                  </Text>
                </Pressable>
              </View>

              <Text style={styles.heading}>
                🥘 Ingrédients
              </Text>

              {selected.ingredients.map(
                (ingredient) => (
                  <Pressable
                    key={ingredient}
                    style={styles.ingredient}
                    onPress={() =>
                      addToShoppingList(
                        ingredient
                      )
                    }
                  >
                    <Text
                      style={
                        styles.ingredientText
                      }
                    >
                      ＋ {ingredient}
                    </Text>

                    <Text
                      style={styles.addText}
                    >
                      Courses
                    </Text>
                  </Pressable>
                )
              )}

              <Text style={styles.heading}>
                👨🏾‍🍳 Préparation
              </Text>

              {selected.steps.map(
                (step, index) => (
                  <View
                    key={`${selected.id}-${index}`}
                    style={styles.step}
                  >
                    <View style={styles.num}>
                      <Text
                        style={styles.numText}
                      >
                        {index + 1}
                      </Text>
                    </View>

                    <Text
                      style={styles.stepText}
                    >
                      {step}
                    </Text>
                  </View>
                )
              )}

              <Pressable
                style={styles.favButton}
                onPress={() =>
                  toggleFavorite(selected.id)
                }
              >
                <Text
                  style={styles.favButtonText}
                >
                  {favorites.includes(
                    selected.id
                  )
                    ? '♥ Retirer des favoris'
                    : '♡ Ajouter aux favoris'}
                </Text>
              </Pressable>
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
    backgroundColor: '#F7F8F5',
  },

  header: {
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 8,
    backgroundColor: '#FFFFFF',
  },

  logo: {
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 1,
    color: '#111111',
  },

  green: {
    color: '#0B6B3A',
  },

  tagline: {
    color: '#68706B',
    marginTop: 2,
    fontSize: 12,
  },

  content: {
    padding: 16,
    paddingBottom: 110,
  },

  hero: {
    backgroundColor: '#0B6B3A',
    borderRadius: 18,
    padding: 20,
    marginBottom: 18,
  },

  heroTitle: {
    color: '#FFFFFF',
    fontSize: 23,
    fontWeight: '800',
    marginBottom: 8,
  },

  heroText: {
    color: '#EAF7EF',
    lineHeight: 21,
  },

  section: {
    fontSize: 19,
    fontWeight: '800',
    marginTop: 14,
    marginBottom: 10,
    color: '#171A18',
  },

  search: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 13,
    borderWidth: 1,
    borderColor: '#E0E4E1',
    fontSize: 15,
    color: '#171A18',
  },

  chips: {
    gap: 8,
    paddingBottom: 4,
  },

  chip: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D9DEDA',
  },

  chipActive: {
    backgroundColor: '#0B6B3A',
    borderColor: '#0B6B3A',
  },

  chipText: {
    color: '#3D4741',
    fontWeight: '600',
  },

  chipTextActive: {
    color: '#FFFFFF',
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    marginBottom: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E7EAE8',
  },

  cardImage: {
    width: '100%',
    height: 180,
  },

  cardBody: {
    padding: 13,
  },

  cardTitle: {
    fontSize: 19,
    fontWeight: '800',
    flex: 1,
    marginRight: 8,
    color: '#171A18',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  heartButton: {
    padding: 2,
  },

  heart: {
    fontSize: 27,
    color: '#D33B49',
  },

  muted: {
    color: '#69716D',
    marginTop: 4,
  },

  empty: {
    color: '#737A76',
    textAlign: 'center',
    marginTop: 40,
    lineHeight: 22,
    paddingHorizontal: 20,
  },

  listContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 90,
  },

  listContent: {
    paddingTop: 14,
    paddingBottom: 100,
  },

  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 78,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E6E3',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 7,
  },

  tab: {
    alignItems: 'center',
    minWidth: 65,
  },

  tabIcon: {
    fontSize: 22,
  },

  tabLabel: {
    fontSize: 11,
    color: '#6E756F',
    marginTop: 2,
  },

  tabActive: {
    color: '#0B6B3A',
    fontWeight: '800',
  },

  modal: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  detail: {
    paddingBottom: 40,
  },

  detailImage: {
    width: '100%',
    height: 260,
  },

  close: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(0,0,0,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  closeText: {
    color: '#FFFFFF',
    fontSize: 30,
    lineHeight: 34,
  },

  detailTitle: {
    fontSize: 30,
    fontWeight: '900',
    marginTop: 18,
    paddingHorizontal: 18,
    color: '#171A18',
  },

  detailMeta: {
    paddingHorizontal: 18,
  },

  actions: {
    flexDirection: 'row',
    gap: 10,
    padding: 18,
  },

  action: {
    flex: 1,
    backgroundColor: '#EAF5EE',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },

  actionText: {
    color: '#0B6B3A',
    fontWeight: '800',
  },

  heading: {
    fontSize: 21,
    fontWeight: '900',
    marginTop: 8,
    marginBottom: 10,
    paddingHorizontal: 18,
    color: '#171A18',
  },

  ingredient: {
    marginHorizontal: 18,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEF0EE',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  ingredientText: {
    flex: 1,
    color: '#252B27',
  },

  addText: {
    color: '#0B6B3A',
    fontWeight: '700',
    fontSize: 12,
    marginLeft: 8,
  },

  step: {
    flexDirection: 'row',
    paddingHorizontal: 18,
    marginBottom: 14,
    gap: 10,
  },

  num: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#0B6B3A',
    alignItems: 'center',
    justifyContent: 'center',
  },

  numText: {
    color: '#FFFFFF',
    fontWeight: '800',
  },

  stepText: {
    flex: 1,
    lineHeight: 21,
    color: '#252B27',
  },

  favButton: {
    margin: 18,
    backgroundColor: '#0B6B3A',
    padding: 15,
    borderRadius: 14,
    alignItems: 'center',
  },

  favButtonText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 16,
  },

  shopRow: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 9,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E5E9E6',
  },

  shopText: {
    flex: 1,
    fontSize: 16,
    color: '#252B27',
  },

  remove: {
    color: '#C33',
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 10,
  },

  clear: {
    marginTop: 15,
    padding: 13,
    borderRadius: 12,
    backgroundColor: '#FDECEC',
    alignItems: 'center',
  },

  clearText: {
    color: '#B42B2B',
    fontWeight: '800',
  },
});

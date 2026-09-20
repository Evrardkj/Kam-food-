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
  { id: 1, name: 'Ndolé', imageKey: 'ndole_crevettes', region: 'Littoral', time: '60 min' },
  { id: 2, name: 'Poulet DG', imageKey: 'poulet_dg', region: 'Littoral', time: '55 min' },
  { id: 3, name: 'Eru', imageKey: 'eru', region: 'Sud-Ouest', time: '70 min' },
  { id: 4, name: 'Koki', imageKey: 'koki', region: 'Ouest', time: '90 min' },
  { id: 5, name: 'Achu sauce jaune', imageKey: 'achu', region: 'Nord-Ouest', time: '120 min' },
  { id: 6, name: 'Poisson braisé', imageKey: 'poisson_braise', region: 'Littoral', time: '40 min' },
  { id: 7, name: 'Kondré', imageKey: 'kondre', region: 'Ouest', time: '80 min' },
  { id: 8, name: 'Sanga', imageKey: 'sanga', region: 'Centre', time: '60 min' },
  { id: 9, name: 'Okok', imageKey: 'okok', region: 'Centre', time: '70 min' },
  { id: 10, name: 'Mbongo Tchobi', imageKey: 'mbongo', region: 'Littoral', time: '90 min' },
  { id: 11, name: 'Sauce arachide', imageKey: 'sauce_arachides', region: 'Centre', time: '45 min' },
  { id: 12, name: 'Sauce gombo', imageKey: 'sauce_gombo', region: 'Centre', time: '30 min' },
  { id: 13, name: 'Water Fufu & Eru', imageKey: 'water_fufu_eru', region: 'Sud-Ouest', time: '75 min' },
  { id: 14, name: 'Kati Kati', imageKey: 'kati_kati', region: 'Nord-Ouest', time: '50 min' },
  { id: 15, name: 'Poulet braisé', imageKey: 'grillade_poulet', region: 'Centre', time: '60 min' },
  { id: 16, name: 'Suya', imageKey: 'suya', region: 'Nord', time: '40 min' },
  { id: 17, name: 'Bobolo', imageKey: 'bobolo', region: 'Sud', time: '100 min' },
  { id: 18, name: 'Miondo', imageKey: 'miondo', region: 'Sud', time: '100 min' },
  { id: 19, name: 'Kwacoco', imageKey: 'kwacoco', region: 'Sud-Ouest', time: '90 min' },
  { id: 20, name: 'Fufu de maïs', imageKey: 'couscous_mais', region: 'Nord-Ouest', time: '40 min' },
  { id: 21, name: 'Ndomba porc', imageKey: 'ndomba_porc', region: 'Est', time: '80 min' },
  { id: 22, name: 'Ndomba poulet', imageKey: 'ndomba_poulet', region: 'Est', time: '80 min' },
  { id: 23, name: 'Plantains frits', imageKey: 'plantains_frit', region: 'Littoral', time: '20 min' },
  { id: 24, name: 'Nnam Ngon', imageKey: 'nnam_ngon', region: 'Centre', time: '90 min' },
  { id: 25, name: 'Mintumba', imageKey: 'mintumba', region: 'Centre', time: '110 min' },
  //
  { id: 26, name: 'Taro sauce jaune', imageKey: 'achu', region: 'Ouest', time: '120 min' },
  { id: 27, name: 'Mbanga', imageKey: 'mbongo', region: 'Littoral', time: '60 min' },
];
 
  
    
      

      
      
    
    
    
    
  

  
     
          
    
const IMAGES = {
  achu: require('./assets/recipes/achu.jpg'),
  bobolo: require('./assets/recipes/bobolo.jpg'),
  couscous_mais: require('./assets/recipes/couscous_mais.jpg'),
  eru: require('./assets/recipes/eru.jpg'),
  fufu_kati: require('./assets/recipes/fufu_kati.jpg'),
  grillade_poulet: require('./assets/recipes/grillade_poulet.jpg'),
  kati_kati: require('./assets/recipes/kati_kati.jpg'),
  koki: require('./assets/recipes/koki.jpg'),
  koki_plantain: require('./assets/recipes/koki_plantain.jpg'),
  kondre: require('./assets/recipes/kondre.jpg'),
  kwacoco: require('./assets/recipes/kwacoco.jpg'),
  macabo_haricots: require('./assets/recipes/macabo_haricots.jpg'),
  mbongo: require('./assets/recipes/mbongo.jpg'),
  mintumba: require('./assets/recipes/mintumba.jpg'),
  miondo: require('./assets/recipes/miondo.jpg'),
  ndole_crevettes: require('./assets/recipes/ndole_crevettes.jpg'),
  ndomba_porc: require('./assets/recipes/ndomba_porc.jpg'),
  ndomba_poulet: require('./assets/recipes/ndomba_poulet.jpg'),
  nnam_ngon: require('./assets/recipes/nnam_ngon.jpg'),
  okok: require('./assets/recipes/okok.jpg'),
  plantains_frit: require('./assets/recipes/plantains_frit.jpg'),
  poisson_braise: require('./assets/recipes/poisson_braise.jpg'),
  porridge_plantain: require('./assets/recipes/porridge_plantain.jpg'),
  poulet_dg: require('./assets/recipes/poulet_dg.jpg'),
  sanga: require('./assets/recipes/sanga.jpg'),
  sauce_arachides: require('./assets/recipes/sauce_arachides.jpg'),
  sauce_gombo: require('./assets/recipes/sauce_gombo.jpg'),
  sauce_tomate: require('./assets/recipes/sauce_tomate.jpg'),
  suya: require('./assets/recipes/suya.jpg'),
  water_fufu_eru: require('./assets/recipes/water_fufu_eru.jpg'),
};

const getImage = (key) => IMAGES[key] || IMAGES['grillade_poulet'];

RECIPES.forEach((recipe) => {
  recipe.image = getImage(recipe.imageKey);
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
        <Image source={ recipe.image } style={styles.cardImage} />
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
      
      
      
                    

                              


  

      

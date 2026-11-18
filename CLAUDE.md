# Règles du dépôt Carnet de domaine

Ce dépôt est PUBLIC et servi tel quel par GitHub Pages : tout fichier présent à la racine est lisible
par n'importe qui, et l'historique Git aussi. Il sert une application de tâches dont les données
restent sur l'appareil.

## Interdits
- Ne jamais ajouter au dépôt une donnée réelle : tâche, intitulé, note, plan ou photo du domaine,
  position de punaise, nom, adresse, lieu, équipement, quantité. Cela vaut pour le code, les
  commentaires, le README, les messages de commit et tout jeu d'essai (données inventées et
  génériques seulement).
- Ne jamais committer un export de l'application (`carnet-domaine-*.json`) : il contient toutes les
  tâches et le plan. Même règle pour tout `plan.*`, toute image du domaine et tout fichier de
  propositions importé. Le téléversement par l'interface web de GitHub n'a aucun garde-fou :
  vérifier le contenu du dossier avant de le glisser.
- Supprimer un fichier ne l'efface pas de l'historique : il reste lisible par tous dans le commit
  qui l'a ajouté. Un fichier réel committé par erreur impose de supprimer le dépôt entier et de le
  recréer, pas de supprimer le fichier.
- Ne jamais écrire dans un fichier, un commentaire ou un message de commit une adresse e-mail
  personnelle, un nom de lieu ou un identifiant de feuille Google. Les commits partent sous
  l'adresse « noreply » de GitHub.
- Aucune clé, aucun jeton, aucun lien de feuille ni CSV publié dans le code. L'application
  n'écrit jamais dans une feuille Google et n'en lit aucune par le réseau.

## Où vivent les données
Uniquement dans le navigateur de l'appareil, sous la clé `carnet-domaine.v1` du `localStorage` :
tâches, conditions d'exécution, dates de revue et d'export, et le plan importé (JPEG réduit à
1 800 px, encodé dans le même objet). Aucune synchronisation, aucun serveur.
Le plan n'est jamais livré avec le code (`PLAN = null`) : il est importé sur l'appareil.
La navigation privée de Safari utilise un stockage à part, effacé à la fermeture : ne jamais
ouvrir l'application ainsi.

## Sauvegarde
Réglages → Exporter un fichier produit un `.json` (tâches et plan). Restaurer remplace tout le
contenu de l'appareil. Un bandeau rappelle l'export au bout de 14 jours. Le fichier reste sur
l'appareil ou dans un espace privé de l'utilisateur, jamais dans ce dépôt.

## Après toute modification des fichiers servis
1. Incrémenter `VERSION` dans `index.html` (affichée dans Réglages).
2. Incrémenter `CACHE` dans `sw.js` : sans cela, l'ancienne version reste servie depuis le cache
   de l'appareil.
3. Tenir `SHELL` (dans `sw.js`) à jour avec les fichiers réellement présents : un fichier listé mais
   absent fait échouer l'installation du service worker, sans message.
L'icône de l'écran d'accueil n'est lue qu'à l'installation : la changer impose de supprimer puis
recréer le raccourci, après un export.

## Style du code
Un seul fichier `index.html`, JavaScript natif, sans dépendance ni étape de construction.
Syntaxe ES5 voulue, pour Safari iOS : `var` et `function`, pas de `let` ni `const`, pas de
fonctions fléchées, de `?.`, de `??` ni de gabarits à apostrophes inversées.
Interface en français. Les couleurs de l'interface passent par les variables CSS et suivent le
thème clair ou sombre ; seules les punaises du plan ont des couleurs fixes, car elles se posent
sur une photo. La seule ressource externe est la police Google, non mise en cache (repli sur la
police du système hors ligne).

## Vérification
Il n'y a pas de tests automatisés. Avant tout dépôt :
1. Extraire le contenu de la balise `<script>` de `index.html` dans un fichier et lancer
   `node --check` dessus.
2. Dans l'application : noter une tâche, la cocher (si elle est récurrente, la suivante doit se
   recréer), la dupliquer, importer un plan et y poser une punaise, exporter puis restaurer, couper
   le réseau et recharger.

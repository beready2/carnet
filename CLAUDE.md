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
Uniquement dans le navigateur de l'appareil, sous deux clés du `localStorage` :
- `carnet-domaine.v1` : tâches (avec, pour une proposition prise, sa référence et sa source),
  conditions d'exécution, dates de revue et d'export, références écartées ou terminées, et le plan
  importé (JPEG réduit à 1 800 px, encodé dans le même objet) ;
- `carnet-domaine.props.v1` : propositions en attente, importées depuis un fichier.
Aucune synchronisation, aucun serveur.
Le plan n'est jamais livré avec le code (`PLAN = null`) : il est importé sur l'appareil.
La navigation privée de Safari utilise un stockage à part, effacé à la fermeture : ne jamais
ouvrir l'application ainsi.

## Sauvegarde
Réglages → Exporter un fichier produit un `.json` (tâches, plan, références écartées ou terminées).
Restaurer remplace tout le contenu de l'appareil. Les propositions en attente ne sont pas dans
l'export : on les réimporte depuis le fichier de propositions. Un bandeau rappelle l'export au bout de 14 jours. Le fichier reste sur
l'appareil ou dans un espace privé de l'utilisateur, jamais dans ce dépôt.

## Propositions (depuis la 1.7)
L'application affiche en « propositions » des actions tirées des feuilles de la propriété. Elle ne lit
aucune feuille et n'écrit dans aucune : elle importe un fichier JSON préparé hors de l'application.
- Schéma `carnet-propositions/1`. Liste blanche de champs : `ref`, `src`, `title`, `note`, `nature`,
  `ctx`, `cost`, `due`, `months`, `important`, `owner`, `etat`, `horizon`, `recur`. Tout autre champ
  est ignoré ; une ligne invalide est rejetée ; un fichier au mauvais schéma est refusé en entier.
- Import par fusion : idempotent, ne supprime ni ne remplace rien. Une proposition prise garde sa
  référence ; une proposition écartée ou terminée ne revient pas à l'importation suivante.
- Les propositions s'affichent en tête de l'onglet Liste, repliées. Rien n'y est une tâche tant que
  l'utilisateur ne la prend pas.
- « À reporter dans les feuilles » liste les tâches faites : c'est l'utilisateur qui les signale. Ne
  jamais ajouter d'écriture vers une feuille.
- Le fichier de propositions contient des données réelles : il ne vit jamais dans ce dépôt (ni
  `carnet-propositions-*.json`, ni extrait collé dans le code, un commentaire, un test ou un message
  de commit). Le `.gitignore` aide pour git, pas pour le téléversement web.
- Depuis la 1.8, l'enregistrement des propositions est relu après écriture : l'import dit si elles sont
  enregistrées sur l'appareil, et Réglages affiche l'espace utilisé par le site, toutes applications
  confondues, et l'état de la clé au démarrage (présent, absent, illisible).
- Tout jeu d'essai du dépôt ou de la vérification est inventé et générique.

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
sur une photo. Depuis la 1.9, aucune ressource externe : police du système, icônes tracées en SVG
dans la page. Ne pas réintroduire de police ni de script tiers (requête réseau à chaque ouverture,
rendu différent hors ligne).

## Vérification
Il n'y a pas de tests automatisés. Avant tout dépôt :
1. Extraire le contenu de la balise `<script>` de `index.html` dans un fichier et lancer
   `node --check` dessus.
2. Dans l'application : noter une tâche, la cocher (si elle est récurrente, la suivante doit se
   recréer), la dupliquer, importer un plan et y poser une punaise, exporter puis restaurer, couper
   le réseau et recharger.
3. Depuis la 1.9 : la saisie de la Liste filtre aussi (tâches et propositions, sans tenir compte des
   accents) ; Entrée crée la tâche. Cocher, prendre et écarter s'annulent pendant 5 s par le bandeau
   « Annuler » (aucune confirmation). L'export ouvre la feuille de partage quand le navigateur sait
   partager un fichier, sinon il télécharge : vérifier les deux.
4. Propositions, avec un fichier inventé : importer deux fois (la seconde fois, aucun doublon),
   prendre une proposition, en écarter une, réimporter (ni l'une ni l'autre ne revient), cocher la
   tâche prise et lire la liste « à reporter », essayer un fichier au mauvais schéma.

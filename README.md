# Carnet de domaine

Gestionnaire de tâches pour le domaine, avec classement par condition d'exécution
et repérage des tâches sur la vue aérienne. Pas de serveur, pas de compte :
tout tient dans le navigateur.

## Mise en ligne sur GitHub Pages

1. Déposer les fichiers à la racine d'un dépôt (ou dans `/docs`).
2. Settings → Pages → Source : *Deploy from a branch*, branche `main`, dossier `/` (ou `/docs`).
3. Ouvrir l'URL fournie sur le téléphone, puis « Ajouter à l'écran d'accueil ».

HTTPS est obligatoire pour le mode hors ligne. GitHub Pages le fournit d'office ;
un simple `open index.html` depuis le disque désactive le service worker
(l'app reste utilisable, mais sans cache hors ligne).

## Fichiers

| Fichier | Rôle |
|---|---|
| `index.html` | Toute l'application (aucune dépendance sauf la police, facultative) |
| `plan.jpg` | Vue aérienne du domaine, 831 × 1063 px |
| `sw.js` | Cache hors ligne |
| `manifest.webmanifest` | Installation sur l'écran d'accueil |
| `icon-*.png` | Icônes |

## Après une modification

Incrémenter `CACHE` dans `sw.js` (`carnet-domaine-v1` → `v2`), sinon l'ancienne
version reste servie depuis le cache du téléphone.

## Sauvegarde

Les tâches vivent dans le `localStorage` du navigateur, sur cet appareil uniquement.
Un nettoyage de données, une réinstallation ou un changement de téléphone les efface.
Réglages → **Exporter un fichier** produit un `.json` restaurable par
**Restaurer un fichier**. À faire une fois par mois.

## Remplacer le plan

Onglet Carte → *Changer de plan*. L'image importée est réduite à 1800 px et stockée
dans le navigateur ; les punaises conservent leurs coordonnées relatives, donc un
plan qui ne couvre pas exactement la même emprise les décale. Réglages →
*Revenir au plan d'origine* restaure `plan.jpg`.

Pour un plan plus net que la source actuelle : Géoportail, couche photographies
aériennes + parcelles cadastrales, capture en plein écran sur un grand moniteur.

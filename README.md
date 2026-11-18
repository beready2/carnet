# Carnet de domaine

Gestionnaire de tâches pour le domaine, avec classement par condition d'exécution
et repérage des tâches sur une vue aérienne importée sur l'appareil. Pas de serveur,
pas de compte : tout tient dans le navigateur.

Les règles de ce dépôt public (aucune donnée réelle, jamais d'export ni de plan) sont
dans `CLAUDE.md`.

## Mise en ligne sur GitHub Pages

1. Déposer les fichiers à la racine d'un dépôt.
2. Settings → Pages → Source : *Deploy from a branch*, branche `main`, dossier `/`.
3. Ouvrir l'URL fournie sur le téléphone, puis « Ajouter à l'écran d'accueil ».

HTTPS est obligatoire pour le mode hors ligne ; GitHub Pages le fournit.

## Fichiers

| Fichier | Rôle |
|---|---|
| `index.html` | Toute l'application (aucune dépendance sauf la police, facultative) |
| `sw.js` | Cache hors ligne |
| `manifest.webmanifest` | Installation sur l'écran d'accueil |
| `icon-*.png` | Icônes |
| `CLAUDE.md` | Règles du dépôt |

## Après une modification

Incrémenter `VERSION` dans `index.html` et `CACHE` dans `sw.js`, sinon l'ancienne
version reste servie depuis le cache du téléphone.

## Données et sauvegarde

Les tâches et le plan vivent dans le `localStorage` du navigateur, sur cet appareil
uniquement. Un nettoyage de données, la navigation privée ou un changement de
téléphone les efface. Réglages → **Exporter un fichier** produit un `.json`
restaurable par **Restaurer un fichier**. Ce fichier ne doit jamais entrer dans ce dépôt.

## Plan

Le plan n'est pas livré avec le code : onglet Carte → importer une image, réduite à
1 800 px et stockée dans le navigateur. Les punaises gardent des coordonnées relatives.

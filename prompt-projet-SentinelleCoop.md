# PROMPT / SPÉCIFICATION DU PROJET — SentinelleCoop

> Document de cadrage pour l'équipe (et/ou pour un outil de génération de code).
> Objectif : décrire **le projet, ses parties, ses pages et le contenu de chaque page**.
> ⚠️ Ce document ne contient **volontairement AUCUNE charte graphique** (pas de couleurs, pas de typographie imposée). L'apparence doit **se raccorder au logiciel déjà utilisé par la caisse** (voir §5 : références UI/UX à étudier).

---

## 1. Le projet en une page

**SentinelleCoop** est une **couche logicielle de conformité LBC/FT** (lutte contre le blanchiment et le financement du terrorisme) qui se **greffe par-dessus le logiciel de gestion déjà utilisé par une caisse de microfinance** (type ADBanking, PERFECT…). Elle ne remplace rien : elle importe les données de la caisse (clients, transactions), les analyse, et aide l'**agent de conformité** à filtrer les clients, détecter les opérations suspectes et produire la déclaration réglementaire (DOS) destinée à la CENTIF.

**Principes directeurs (non négociables) :**
- **Offline-first** : tout fonctionne sans internet ; la synchronisation est optionnelle et différée.
- **Lecture seule** sur les données de la caisse : on n'écrit jamais dans le logiciel existant.
- **Léger** : tourne sur un PC de bureau modeste.
- **Simplicité d'usage** : l'agent n'est pas juriste ni informaticien → chaque action est guidée.
- **Confidentialité** : entre caisses, on n'échange que des empreintes chiffrées (hash), jamais de données personnelles en clair (conforme APDP Bénin).

**Utilisateur principal :** l'**agent de conformité / le guichetier** d'une caisse locale (CLCAM).

---

## 2. Architecture générale (les grandes parties)

Le projet se découpe en **4 blocs** :

| Bloc | Rôle | Contenu |
|---|---|---|
| **A. Import des données** | Faire entrer les données de la caisse | Import d'un fichier CSV/Excel (clients, comptes, transactions) exporté par le core banking |
| **B. Moteur de conformité** | Le cerveau (invisible à l'écran) | Rapprochement de noms (phonétique local + Levenshtein), calcul du score de risque, détection smurfing & inter-caisses |
| **C. Gestion des listes** | Les référentiels de filtrage | Import et mise à jour des listes de sanctions et de PPE |
| **D. Interface agent** | Ce que l'agent voit et utilise | Les pages décrites au §4 |

Un module secondaire **E. Synchronisation** (export/import de fichier chiffré ou clé USB) relie plusieurs caisses — traité comme fonction avancée, pas prioritaire.

---

## 3. Le flux d'utilisation (parcours de l'agent)

1. L'agent **importe** le fichier du jour (ou les données sont déjà présentes).
2. Il **enregistre / recherche un client** → le moteur filtre en temps réel.
3. Le système affiche un **verdict clair** (RAS / à vérifier / bloqué) avec le détail.
4. Sur une transaction ou un client à risque, le système **génère une alerte**.
5. L'agent ouvre l'alerte, consulte le **détail et le graphe de liens**, et suit le **guidage pas-à-pas**.
6. Si nécessaire, il **génère la DOS pré-remplie** pour la CENTIF.
7. En cas de coupure réseau, il **exporte les alertes** (fichier/clé USB) pour synchro ultérieure.

---

## 4. Les pages / écrans (agencement et contenu)

> Pour chaque page : ce qu'elle contient, comment l'organiser (zones), et ce qu'on doit y lire.
> Le style visuel n'est PAS décrit ici — il doit imiter le logiciel de la caisse (§5).

### Page 0 — Connexion
- **But** : identifier l'agent (traçabilité obligatoire pour l'audit).
- **Contenu** : champ identifiant, champ mot de passe, bouton se connecter.
- **Zones** : un bloc central unique, minimal.
- **À afficher** : nom de l'application, version, mention « mode hors-ligne actif ».

### Page 1 — Tableau de bord (accueil)
- **But** : donner l'état de conformité en un coup d'œil.
- **Zones** :
  - En haut : **indicateurs clés** (nb d'alertes ouvertes, nb de clients à vérifier, nb de DOS en attente, date de dernière mise à jour des listes).
  - Milieu : **liste des dernières alertes** (les plus récentes / les plus graves en premier).
  - Côté : **accès rapides** (nouveau filtrage, importer données, mettre à jour les listes).
- **À afficher** : un état visible « listes à jour / listes à mettre à jour » et « synchronisé / non synchronisé ».

### Page 2 — Filtrage / Recherche client
- **But** : vérifier un client (à l'ouverture de compte ou à tout moment).
- **Zones** :
  - Haut : **formulaire de saisie** (nom, prénom, date de naissance, pièce d'identité, téléphone).
  - Après validation : **zone résultat** avec le **verdict** (RAS / à vérifier / bloqué) et le **score de risque** décomposé (profil / comportement / inter-caisses).
  - Sous le verdict : **liste des correspondances trouvées** (nom sur liste, type : sanction ou PPE, degré de ressemblance).
- **À afficher clairement** : pourquoi le verdict (ex. « correspondance forte avec une PPE : Nom X »). Jamais un simple oui/non sans justification.

### Page 3 — Fiche client 360°
- **But** : tout voir sur un client.
- **Zones** :
  - Haut : **identité** du client + son **niveau de risque**.
  - Bloc : **tous ses comptes** dans la caisse + **solde consolidé**.
  - Bloc : **historique des opérations** (filtrable par date/montant).
  - Bloc : **graphe de liens** (voir Page 5) accessible depuis ici.
- **À afficher** : signaux d'alerte éventuels (ex. « dépôt inhabituel le JJ/MM », « présent dans 3 caisses »).

### Page 4 — Alertes (liste + détail)
- **But** : traiter les opérations et clients suspects.
- **Zones (liste)** : tableau des alertes avec colonnes → date, client, type d'alerte (smurfing, PPE, inter-caisses…), gravité, statut (nouvelle / en cours / traitée).
- **Zones (détail d'une alerte)** :
  - Résumé de l'alerte et **raison déclenchée**.
  - **Transactions concernées**.
  - **Guidage pas-à-pas** (voir Page 7).
  - Bouton **Générer la DOS**.
- **À afficher** : la règle qui a déclenché l'alerte, en langage simple (« 3 dépôts de 400 000 FCFA en 2 jours sur des agences différentes »).

### Page 5 — Vue en graphe (réseau de liens)
- **But** : révéler visuellement un réseau suspect.
- **Contenu** : un client au centre, relié à d'autres par des liens **étiquetés** (même téléphone, même garant, même adresse, même mandataire).
- **Zones** : la carte de liens (grande zone) + un panneau latéral qui détaille l'élément sélectionné.
- **À afficher** : le **type de chaque lien** et un bouton pour ouvrir la fiche d'une personne liée.

### Page 6 — Gestion des listes (sanctions & PPE)
- **But** : garder les référentiels à jour « sans délai » (exigence BCEAO).
- **Zones** : bouton **importer une liste** (fichier), tableau des listes chargées (nom, source, date, nombre d'entrées), indicateur « à jour / obsolète ».
- **À afficher** : la date de dernière mise à jour et un avertissement si une liste est ancienne.

### Page 7 — Assistant / Guidage conformité (Copilote)
- **But** : piloter l'agent quand une alerte « rouge » tombe, étape par étape.
- **Contenu** : une **checklist ordonnée** :
  1. Vérifier l'identité / recueillir le justificatif.
  2. Notifier l'agent de conformité.
  3. Appliquer la mesure (blocage / gel selon le cas).
  4. **Générer la DOS** (pré-remplie).
  5. Archiver le récépissé.
- **À afficher** : l'avancement (étapes cochées) et le rappel de l'obligation légale correspondante.

### Page 8 — Génération de la DOS
- **But** : produire la Déclaration d'Opération Suspecte pour la CENTIF.
- **Contenu** : un **formulaire pré-rempli** (identité du client, opérations concernées, motif du soupçon) que l'agent complète/valide, puis **exporte en PDF**.
- **À afficher** : mention de confidentialité (la DOS ne doit jamais être révélée au client).

### Page 9 — Synchronisation (avancé)
- **But** : partager les empreintes (hash) entre caisses hors-ligne.
- **Contenu** : bouton **exporter** (fichier chiffré / clé USB), bouton **importer** un fichier reçu d'une autre caisse, journal des synchronisations.
- **À afficher** : « dernière synchro : … », et le fait que seules des empreintes anonymisées sont échangées.

### Page 10 — Journal d'audit (piste d'audit)
- **But** : tracer qui a fait quoi (exigence réglementaire).
- **Contenu** : tableau chronologique → utilisateur, action, date/heure, élément concerné.
- **À afficher** : possibilité de filtrer et d'exporter.

---

## 5. Références UI/UX à étudier pour s'harmoniser (À FAIRE PAR L'ÉQUIPE)

Je ne vous impose pas de charte graphique. À la place, **allez observer l'interface réelle d'un logiciel de microfinance** et **reprenez ses conventions** (disposition des menus, densité des tableaux, vocabulaire métier) pour que SentinelleCoop paraisse « du même monde » que le logiciel de la caisse.

**Sources à regarder vous-mêmes (captures d'écran à faire) :**
- **OpenCBS** — logiciel de microfinance **open source** (interface publiquement visible) : https://opencbs.com/ → C'est la meilleure référence gratuite, très proche des logiciels des caisses.
- **ADBanking (AD Finance)** — page produit + vidéos : https://www.adfinance.co/adbanking/
- **Démo core banking microfinance (YouTube)** : https://www.youtube.com/watch?v=cF8zM9sRCOE
- **Le mieux** : demandez à un contact FECECAM une **capture d'écran de leur logiciel** (menu principal + une fiche client). C'est la référence n°1.

**Conventions typiques de ces logiciels (à reprendre, sans que je fixe les couleurs) :**
- **Menu latéral gauche** listant les modules (Clients, Épargne, Crédit, Comptabilité…). Ajoutez-y « Conformité » comme s'il en faisait partie.
- **Barre supérieure** avec utilisateur connecté, recherche, et statut.
- **Tableaux denses** (beaucoup de colonnes, lignes fines) pour les listes.
- **Formulaires en colonnes** avec libellés à gauche des champs.
- **Vocabulaire métier local** : « membre », « caisse », « CLCAM », « guichet », « épargne », « crédit ».
- **Sobriété** : ces outils sont fonctionnels, pas décoratifs → privilégier la lisibilité.

**Règle d'or de raccordement** : si un agent qui utilise déjà son logiciel ouvre SentinelleCoop, il doit avoir l'impression que c'est **un module de plus du même logiciel**, pas une application étrangère.

---

## 6. Périmètre pour les 72h (ce qu'on code vraiment)

**Prioritaire (démo) :** Pages 0, 1, 2, 3, 4, 8 + moteur de rapprochement + score de risque + un jeu de données de test réaliste (dont un client PPE piégé et un cas de smurfing).
**Si le temps le permet :** Pages 5 (graphe) et 7 (copilote).
**Vision (montrée, pas forcément codée) :** Pages 9 (synchro) et 10 (audit).

---

## 7. Jeu de données de démonstration à préparer

- ~30 clients fictifs (noms locaux variés).
- 1 client dont le nom correspond à une PPE (pour déclencher un blocage).
- 1 client dont le nom est une variante orthographique d'un nom sur liste (pour montrer le phonétique).
- Une série de transactions contenant un cas de **smurfing** (plusieurs dépôts juste sous le seuil, agences différentes).
- Une petite liste de sanctions + une liste de PPE (fictives) à importer.

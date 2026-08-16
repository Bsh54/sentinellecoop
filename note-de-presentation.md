# NOTE DE PRÉSENTATION

**Hackathon National d'Innovation CIF – DigiCoop-WA+ 2026**

| | |
|---|---|
| **Thématique** | 01 — Filtrage des clients (LBC/FT/FP) |
| **Solution** | **SentinelleCoop** |
| **Slogan** | *La conformité anti-blanchiment qui marche même sans internet.* |


---

## 1. Le problème

Depuis 2025, la réglementation UEMOA (instructions BCEAO n°001, 002 et 003-03-2025 du 18 mars 2025) et le guide de conformité de l'**ANSSFD** (2026) imposent à **toutes** les institutions de microfinance du Bénin de lutter activement contre le blanchiment de capitaux et le financement du terrorisme (LBC/FT/FP) : identifier chaque client, le filtrer contre les listes de personnes sanctionnées et politiquement exposées (PPE), surveiller les transactions et déclarer les opérations suspectes à la **CENTIF**.

**Sur le terrain, c'est aujourd'hui impossible à tenir** dans une caisse locale :

- **Vérification manuelle** : un agent ne peut pas comparer chaque client à des milliers de noms sur des listes papier ou PDF.
- **Connectivité limitée** : les agences rurales n'ont souvent pas d'internet fiable — or la loi exige un contrôle **immédiat**.
- **Noms locaux mal reconnus** : les listes internationales ignorent l'orthographe de nos noms (Fon, Goun, Yoruba, Peul, Haoussa). Un fraudeur change une lettre ou inverse nom/prénom et passe entre les mailles.
- **Angle mort inter-caisses** : les **33 CLCAM du réseau FECECAM sont financièrement autonomes**. Sans dispositif partagé, un même individu peut fractionner ses dépôts dans plusieurs agences (technique du *smurfing*) avec un risque de détection réduit.

**Conséquence** : les caisses sont exposées à des sanctions réglementaires, et le système financier reste vulnérable.

## 2. Notre solution : SentinelleCoop

**SentinelleCoop est une couche de conformité LBC/FT qui se greffe par-dessus le logiciel de gestion déjà utilisé par la caisse** (de type PERFECT, ADBanking ou autre). Nous ne remplaçons rien : nous ajoutons la sécurité qui manque, sans changer les habitudes de l'agent.

Elle repose sur **4 fonctions** :

**① Filtrage intelligent des clients et des transactions**
Filtrage en temps réel contre les listes de sanctions et de PPE. Notre moteur de rapprochement de noms est enrichi d'un **dictionnaire phonétique local** (Fon, Goun, Yoruba, Peul, Haoussa) : il comprend qu'« Koffi » = « Kofi » ou qu'un nom inversé est le même. La ruse sur les noms ne fonctionne plus.

**② Fonctionnement hors-ligne garanti (offline-first)**
L'application bloque les suspects au guichet **même sans connexion**. En cas de coupure prolongée, l'agent exporte les alertes sur une **clé USB chiffrée** en un clic, pour synchronisation ultérieure. Aucun « trou noir » de sécurité.

**③ Détection des réseaux et de la fraude inter-caisses**
Le système rapproche les données entre agences pour repérer un même individu ouvrant des comptes dans plusieurs caisses. Une **vue en graphe simple** met en évidence les liens suspects (même téléphone, même garant, même adresse) : l'agent identifie un réseau d'un coup d'œil, sans lire des lignes de texte.

**④ Déclaration (DOS) pré-remplie + guidage pas-à-pas**
En cas d'alerte, le logiciel **pré-remplit automatiquement la Déclaration d'Opération Suspecte** destinée à la CENTIF, et guide l'agent étape par étape (récépissé, notification, génération de la DOS). L'agent n'a pas besoin d'être juriste : l'application le pilote.

## 3. Pour qui ?

| Utilisateur / bénéficiaire | Ce que SentinelleCoop lui apporte |
|---|---|
| **L'agent de conformité / le guichetier** | Un filtrage en quelques secondes au lieu d'une vérification manuelle ; un guide qui le rassure |
| **La caisse (CLCAM) / FECECAM** | La conformité BCEAO/ANSSFD, sans sanction ni perte de confiance |
| **La CIF** | Une solution industrialisable dans ses 5 pays (DigiCoop-WA+) |
| **Le régulateur & la population** | Un système financier plus sûr et plus inclusif |

---

## 4. Ce qui nous rend uniques

- **Le seul outil pensé pour la réalité rurale** : offline-first, léger, sur matériel modeste — là où les solutions SaaS des grands éditeurs exigent une bonne connexion.
- **L'intelligence locale des noms** : dictionnaire phonétique africain que les logiciels étrangers n'ont pas.
- **La vue transversale du réseau** : chaque caisse ne voit aujourd'hui que ses propres clients ; nous offrons une détection inter-caisses respectueuse de la vie privée.
- **La confidentialité par conception** : les caisses ne s'échangent que des **empreintes chiffrées (hash)** des identités pour repérer les doublons, jamais les données personnelles en clair — conforme à la loi béninoise sur la protection des données (**APDP**).

## 5. Approche technique & faisabilité (72h)

- **Architecture** : application locale légère + base de données locale ; se branche en **lecture seule** sur les données exportées par le core banking (fichier CSV/Excel). Aucun risque pour le système de la caisse.
- **Moteur de rapprochement** : algorithmes classiques et légers (phonétique + distance de Levenshtein), **sans IA lourde** → tourne sur un simple PC de bureau, hors-ligne.
- **Stack** : [à définir selon l'équipe — ex. web/PWA ou application desktop].
- **Synchronisation** : par fichier/clé USB chiffrée (réaliste et testable). Une synchronisation P2P entre agences proches est envisagée comme évolution future.


**Le score de risque** synthétise 3 signaux en un code couleur simple : profil (PPE/sanctions), comportement (montants inhabituels), et présence inter-caisses. Vert = RAS · Orange = à vérifier · Rouge = bloqué + DOS générée.

## 6. Impact attendu

- **Temps de vérification** : de plusieurs minutes → **moins de 5 secondes**.
- **Mise en conformité** des caisses avec la réglementation BCEAO/ANSSFD.
- **Déployable dans les 5 pays** du réseau CIF sans changer les logiciels en place.
- Indicateurs de suivi : [nb de caisses équipées · nb de clients filtrés · nb d'alertes et de DOS générées · délai moyen de traitement].

---

## 7. L'équipe

| Nom & Prénom | Profil / Spécialité | Rôle dans le projet |
|---|---|---|
| [Nom 1  | : FAROU Noufous 
| [Nom 2] | : Morel ADIKPETO 
| [Nom 3] | Gabin SOKINDJI
| [Nom 4] | Beatrice SEGNIAGBETO
| [Nom 5] | Shadrak BESSANH 

Notre force : un mélange **technique + conformité + design** adapté aux exigences du défi.

## 8. Conclusion

Pendant que les grands éditeurs vendent des logiciels coûteux exigeant une bonne connexion, **SentinelleCoop apporte une conformité de niveau bancaire directement dans les agences isolées, sans internet.** Nous ne livrons pas une simple application : nous transformons chaque petite caisse en un maillon fort de la sécurité financière de la sous-région — et posons une brique réutilisable dans les 5 pays du réseau CIF.

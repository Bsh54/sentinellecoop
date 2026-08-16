# Compréhension du terrain — Comment fonctionnent réellement les structures

> Recherche vérifiée, 10 août 2026. Base pour concevoir une solution crédible (pas naïve).

## 1. La chaîne d'acteurs (empilement)

```
Client (membre)
  └─ CLCAM = caisse locale (guichet de proximité)
       └─ FECECAM = fédération nationale (Bénin)
            └─ CIF = confédération régionale, 5 pays  ← organise le hackathon
```

Superviseurs / régulateurs :
- **BCEAO** — banque centrale UEMOA ; écrit les règles LBC/FT (3 instructions du 18 mars 2025).
- **ANSSFD** — agence béninoise qui supervise spécifiquement les SFD/microfinances ; guide de conformité 2026.
- **CENTIF-Bénin** — cellule qui reçoit les Déclarations d'Opérations Suspectes (DOS).
- **GIABA / GAFI** — niveaux régional et international.

## 2. FECECAM (le client concret au Bénin)

- **33 CLCAM** (caisses locales **financièrement autonomes**) + **133 points de service**, dans les **77 communes**.
- DG : **Taïrou Bassabi Amadou**.
- Produits : épargne, crédit, domiciliation salaires/pensions, micro-assurance, mobile money.
- **Faille réelle** : les 33 caisses sont autonomes et ne se parlent pas → un individu peut ouvrir des comptes dans plusieurs caisses sans détection croisée.

## 3. Le système d'information réel

- Les SFD UEMOA utilisent des core banking existants : surtout **PERFECT** et **ADBanking** (AD Finance, 100+ institutions, 8 pays).
- **Implication clé** : une caisse ne remplacera PAS son logiciel. Notre solution doit être un **module greffé / une surcouche** qui lit les données du core banking — pas un remplaçant.

## 4. Obligations LBC/FT concrètes (guide ANSSFD 2026 + BCEAO)

1. Nommer un **agent de conformité** (obligatoire).
2. **KYC** : identifier client + bénéficiaire effectif à l'ouverture.
3. **Filtrage** contre listes : **PPE** + sanctions nationales/internationales.
4. **Gel des avoirs** : blocage immédiat d'un compte désigné.
5. **Surveillance des transactions** vs comportement habituel.
6. **DOS** à la CENTIF, en confidentialité.
7. **Piste d'audit** + SI capable de tracer profils et flux.

## 5. Ce qu'est une opération suspecte (cas réels)

- **Smurfing / schtroumpfage** : fractionner les dépôts juste sous le seuil de déclaration → cas n°1.
- En UEMOA : 82 % des DOS concernent le blanchiment.
- Détection par **règles simples** (montants, fréquence, seuils), pas forcément IA lourde.

## 6. Contexte politique / timing

- Le Bénin a adopté une **nouvelle loi uniforme sur la microfinance**.
- L'ANSSFD **sensibilise activement** les SFD + a publié un **guide de conformité 2026**.
- → La conformité LBC/FT est LE sujet chaud du secteur béninois maintenant. Timing idéal.

## 7. Implications pour notre solution (à intégrer au design)

- **Se greffer** au core banking (PERFECT/ADBanking), ne pas le remplacer.
- **Détection inter-caisses** : résoudre la faille des 33 CLCAM autonomes = argument fort et unique.
- **Cibler le smurfing** comme cas de démo principal (réaliste, fréquent).
- **Outiller l'agent de conformité** (rôle légalement obligatoire) = notre utilisateur cible précis.
- **Offline-first** + piste d'audit + génération DOS = colle aux obligations réelles.

## Sources

- FECECAM – Qui sommes-nous : https://fececam.org/a-propos/qui-sommes-nous/
- ANSSFD – Guide conformité IMF 2026 : https://anssfd.bj/wp-content/uploads/2026/03/BEN005_ANSSFD_GuideConformiteIMF_VF20251119.pdf
- ANSSFD (site) : https://anssfd.bj/
- CENTIF CI – Lignes directrices opérations suspectes : https://www.centif.ci/wp-content/uploads/2025/03/lignesdirectrices.pdf
- Directive n°02/2015/CM/UEMOA LBC/FT : https://www.bceao.int/sites/default/files/2017-11/directive_no02_2015_cm_uemoa_lbc_ft-2.pdf
- AD Finance (ADBanking) : https://www.adfinance.co/
- BCEAO – Guide digitalisation SFD 2022 : https://www.bceao.int/sites/default/files/2022-11/Guide%20pour%20la%20digitalisation%20des%20op%C3%A9rations%20financi%C3%A8res%20des%20SFD%20dans%20l'UEMOA.pdf

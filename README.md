# Introduction à React (en français)

## Qu’est-ce que React ?
React est une bibliothèque JavaScript créée pour construire des interfaces utilisateur (UI) de manière **modulaire**, **rapide** et **maintenable**. Elle est principalement utilisée pour développer des applications web modernes basées sur des composants.

## Pourquoi utiliser React ?
- **Composants réutilisables** : vous découpez l’interface en blocs indépendants.
- **Rendu efficace** : React met à jour le DOM de façon optimisée.
- **Écosystème riche** : outils, bibliothèques, communauté très active.asahsjahs
- sajhsjkas
- sakshakjsh
- **Bonne maintenabilité** : architecture claire pour les applications qui évoluent.

## Concepts clés

### 1) Les composants
Un composant est une fonction (ou classe) qui retourne de l’interface.

- **Composant parent** : contient d’autres composants.
- **Composant enfant** : reçoit des données du parent.

### 2) JSX
JSX est une syntaxe qui ressemble à du HTML dans JavaScript.sasjkhsjka
asajsgbajhs

Exemple :
```jsx
const element = <h1>Bonjour React</h1>;
```

### 3) Props
Les **props** sont des données passées d’un composant parent vers un compossasjkashjks
asjajshaant enfant.
Elles sont en lecture seule dans le composant enfant.

### 4) State
Le **state** représente les données internes d’un composant qui peuvent changer dans le temps (interaction utilisateur, réponse API, etc.).

### 5) Flux de données unidirectionnel
En React, les données circulent principalement du parent vers l’enfant. Ce modèle rend le comportement de l’application plus prévisible.

## Hooks essentiels

### useState
Permet de gérer un état local dans un composant fonctionnel.

### useEffect
Permet d’exécuter des effets secondaires (appel API, abonnement, timers, etc.) après le rendu.

## Exemple minimal

```jsx
import { useState } from 'react';

function Compteur() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Compteur : {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Incrémenter
      </button>
    </div>
  );
}

export default Compteur;
```

## Bonnes pratiques pour débuter
- Garder les composants petits et lisibles.
- Nommer clairement les composants et les variables.
- Éviter la logique métier trop lourde dans l’UI.
- Factoriser les parties réutilisables.
- Ajouter des tests au fur et à mesure de la croissance du projet.

## Conclusion
React est une excellente porte d’entrée pour construire des interfaces modernes et robustes. En maîtrisant composants, props, state et hooks, vous pouvez développer des applications évolutives et professionnelles.

# React — Introduction (en français)

> Une bibliothèque JavaScript pour construire des interfaces utilisateur modernes, modulaires et performantes.

---

## Table des matières

- [Qu'est-ce que React ?](#quest-ce-que-react-)
- [Pourquoi utiliser React ?](#pourquoi-utiliser-react-)
- [Concepts clés](#concepts-clés)
- [Hooks essentiels](#hooks-essentiels)
- [Exemple minimal](#exemple-minimal)
- [Bonnes pratiques](#bonnes-pratiques)
- [Conclusion](#conclusion)

---

## Qu'est-ce que React ?

React est une **bibliothèque JavaScript** open-source créée par Facebook, conçue pour construire des interfaces utilisateur (UI) de manière **modulaire**, **rapide** et **maintenable**.

Elle est au cœur de nombreuses applications web modernes et repose sur un modèle de **composants réutilisables**.

---

## Pourquoi utiliser React ?

| Avantage | Description |
|---|---|
| Composants réutilisables | Découpez l'interface en blocs indépendants et réutilisables |
| Rendu efficace | React met à jour le DOM de façon optimisée via le Virtual DOM |
| Écosystème riche | Outils, bibliothèques et communauté très active |
| Maintenabilité | Architecture claire pour les applications qui évoluent |
| TypeScript friendly | Intégration TypeScript native et mature |

---

## Concepts clés

### 1. Les composants

Un composant est une **fonction** (ou classe) qui retourne du JSX (de l'interface).

```
App (composant racine)
├── Header
├── Main
│   ├── ArticleList
│   │   └── ArticleItem
│   └── Sidebar
└── Footer
```

- **Composant parent** : contient et orchestre d'autres composants.
- **Composant enfant** : reçoit des données via les `props`.

### 2. JSX

JSX est une **extension de syntaxe** qui ressemble à du HTML dans JavaScript. Il est transpilé en appels `React.createElement()`.

```jsx
// JSX
const element = <h1 className="title">Bonjour React !</h1>;

// Équivalent JS pur
const element = React.createElement('h1', { className: 'title' }, 'Bonjour React !');
```

### 3. Props

Les **props** (propriétés) sont des données passées d'un composant **parent** vers un composant **enfant**. Elles sont **en lecture seule**.

```jsx
function Salutation({ nom, age }) {
  return <p>Bonjour {nom}, vous avez {age} ans.</p>;
}

// Utilisation
<Salutation nom="Alice" age={30} />
```

### 4. State

Le **state** représente les données **internes et dynamiques** d'un composant. Il peut changer suite à une interaction utilisateur ou une réponse d'API.

```jsx
const [isOpen, setIsOpen] = useState(false);
```

### 5. Flux de données unidirectionnel

En React, les données circulent **du parent vers l'enfant**. Ce modèle rend le comportement de l'application plus **prévisible** et **facile à déboguer**.

```
Parent  →  (props)  →  Enfant
Enfant  →  (callback / événement)  →  Parent
```

---

## Hooks essentiels

| Hook | Rôle |
|---|---|
| `useState` | Gérer un état local dans un composant fonctionnel |
| `useEffect` | Exécuter des effets secondaires (API, timers, abonnements) |
| `useContext` | Accéder à un contexte global sans prop drilling |
| `useRef` | Référencer un élément DOM ou une valeur persistante |
| `useMemo` / `useCallback` | Optimiser les performances en mémorisant valeurs et fonctions |

---

## Exemple minimal

Un compteur interactif illustrant `useState` :

```jsx
import { useState } from 'react';

function Compteur() {
  const [count, setCount] = useState(0);

  return (
    <div className="compteur">
      <h2>Compteur : {count}</h2>
      <button onClick={() => setCount(count + 1)}>+ Incrémenter</button>
      <button onClick={() => setCount(count - 1)}>- Décrémenter</button>
      <button onClick={() => setCount(0)}>Réinitialiser</button>
    </div>
  );
}

export default Compteur;
```

---

## Bonnes pratiques

- **Petits composants** : chaque composant doit avoir une seule responsabilité.
- **Nommage clair** : utilisez des noms explicites pour les composants et les variables.
- **Séparation UI / logique** : évitez la logique métier dans les composants d'affichage.
- **Factorisation** : identifiez et réutilisez les parties communes.
- **Tests** : ajoutez des tests unitaires et d'intégration au fur et à mesure.
- **Accessibilité** : utilisez des attributs ARIA et des balises sémantiques HTML5.

---

## Conclusion

React est une excellente porte d'entrée pour construire des interfaces modernes et robustes. En maîtrisant **composants**, **props**, **state** et **hooks**, vous pouvez développer des applications évolutives et professionnelles.

**Ressources utiles :**
- [Documentation officielle React](https://react.dev)
- [React sur GitHub](https://github.com/facebook/react)

---

*Voir aussi : [README en español](./README.es.md)*

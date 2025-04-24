import './App.css'
import { useState } from 'react'

function Title({ title }) {
  return <h1>{title}</h1>
}

function List({ items, onItemClick }) {
  return (
    <ol>
      {items.map(({ id, text }) => (
        <li key={id}>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onItemClick(id);
            }}
          >
            {text}
          </a>
        </li>
      ))}
    </ol>
  )
}

function Content({ title, body }) {
  return (
    <div className="content">
      <h2>{title}</h2>
      <p>{body}</p>
    </div>
  )
}

function useFruitSelection(initialFruits) {
  const [selectedFruit, setSelectedFruit] = useState(initialFruits[0]);

  const handleFruitSelect = (id) => {
    const fruit = initialFruits.find(fruit => fruit.id === id);
    if (fruit) setSelectedFruit(fruit);
  };

  return { selectedFruit, handleFruitSelect };
}

function App() {
  const fruits = [
    { id: 1, text: 'Apple' },
    { id: 2, text: 'Banana' },
    { id: 3, text: 'Cherry' },
  ];

  const { selectedFruit, handleFruitSelect } = useFruitSelection(fruits);

  return (
    <div className="app-container">
      <Title title="SuperBoard" />
      <List items={fruits} onItemClick={handleFruitSelect} />
      <Content
        title={selectedFruit.text}
        body={`${selectedFruit.text} is delicious.`}
      />
    </div>
  )
}

export default App

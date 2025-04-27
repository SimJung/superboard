import './App.css'
import { useState } from 'react'

function Title({ title }) {
  return <h1>{title}</h1>
}

function List({ items, onItemClick, setContent }) {
  return (
    <ol>
      {items.map(({ id, text }) => (
        <li key={id}>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onItemClick(id);
              setContent(text);
            }}
          >
            {text}
          </a>
        </li>
      ))}
    </ol>
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
  const initialFruits = [
    { id: 1, text: 'Apple' },
    { id: 2, text: 'Banana' },
    { id: 3, text: 'Cherry' },
  ];

  const [fruits, setFruits] = useState(initialFruits);
  const [nextId, setNextId] = useState(4);
  const { selectedFruit, handleFruitSelect } = useFruitSelection(fruits);
  const [content, setContent] = useState(selectedFruit.text);
  
  const handleCreate = ({text}) => {
    const newFruit = {
      id: nextId,
      text,
    }
    setNextId(nextId + 1);
    setFruits([...fruits, newFruit]);
    setContent(newFruit.text);
  }

  const showCreateForm = () => {
    setContent(
      <form onSubmit={(e) => {
        e.preventDefault();
        handleCreate({text: e.target.text.value});
      }}>
        <input type="text" name="text" placeholder='내용을 입력하세요' />
        <button type="submit">CREATE</button>
      </form>
    )
  }

  return (
    <div className="app-container">
      <Title title="SuperBoard" />
      <List items={fruits} onItemClick={handleFruitSelect} setContent={setContent} />
      {content}
      <ul>
        <button onClick={showCreateForm}>CREATE</button>
        <button onClick={handleDelete}>DELETE</button>
      </ul>
    </div>
  )
}

export default App

import { useEffect, useState } from 'react';
import './App.css';
import Board from './components/Board/Board';
import Editable from './components/Editable/Editable';
import './index.css';

const App = () => {
  const [boards, setBoards] = useState([
    {
      id: Date.now() + Math.random() * 2,
      title: 'To Do',
      cards: [
        {
          id: Date.now() + Math.random(),
          title: 'FrontEnd:wroking in ui',
          tasks: [],

          desc: 'Hello Kanboard',
          date: '',
        },
        {
          id: Date.now() + Math.random(),
          title: 'Devops:working in ci/cd',
          tasks: [],

          desc: 'Hello Kanboard',
          date: '',
        },
      ],
    },

    {
      id: Date.now() + Math.random() * 2,
      title: 'Progress',
      cards: [
        {
          id: Date.now() + Math.random(),
          title: 'Backend:Working in Api',
          tasks: [],

          desc: 'Hello Kanboard',
          date: '',
        },
        {
          id: Date.now() + Math.random(),

          tasks: [],
          title: 'Backend:Working in Api',
          desc: 'Hello Kanboard',
          date: '',
        },
      ],
    },
    {
      id: Date.now() + Math.random() * 2,
      title: 'Completed',
      cards: [
        {
          id: Date.now() + Math.random(),
          title: 'Ui/Ux:Working in design',
          tasks: [],

          desc: 'Hello Kanboard',
          date: '',
        },
        {
          id: Date.now() + Math.random(),
          title: 'Backend:Working in Api',
          tasks: [],

          desc: 'Hello Kanboard',
          date: '',
        },
      ],
    },
  ]);

  const [target, setTarget] = useState({
    cid: '',
    bid: '',
  });

  //store the data in localStorage
  useEffect(() => {
    const boardsString = JSON.stringify(boards);

    localStorage.setItem('boardsData', boardsString);
  }, [boards]);

  const addCard = (title: string, bid: number) => {
    const card = {
      id: Date.now() + Math.random(),
      title,
      labels: [],
      tasks: [],
      date: '',
      desc: '',
    };

    const index = boards.findIndex((item) => item.id === bid);
    if (index < 0) return;

    const tempsBoards = [...boards];
    tempsBoards[index].cards.push(card);
    setBoards(tempsBoards);
  };

  const removeCard = (cid: number, bid: number) => {
    const bIndex = boards.findIndex((item) => item.id === bid);
    if (bIndex < 0) return;
    const cIndex = boards[bIndex].cards.findIndex((item) => item.id === cid);
    if (cIndex < 0) return;
    const tempBoards = [...boards];
    tempBoards[bIndex].cards.splice(cIndex, 1);
    setBoards(tempBoards);
  };

  const addBoard = (title: string) => {
    setBoards([
      ...boards,
      {
        id: Date.now() + Math.random(),
        title,
        cards: [],
      },
    ]);
  };

  const removeBoard = (bid: number) => {
    const tempBoards = boards.filter((item) => item.id !== bid);
    setBoards(tempBoards);
  };

  const handleDragEnter = (cid: any, bid: any) => {
    setTarget({
      cid,
      bid,
    });
  };
  const handleDragEnd = (cid: any, bid: any) => {
    let s_boardIndex, s_cardIndex, t_boardIndex, t_cardIndex;
    s_boardIndex = boards.findIndex((item) => item.id === bid);
    if (s_boardIndex < 0) return;

    s_cardIndex = boards[s_boardIndex]?.cards?.findIndex(
      (item) => item.id === cid
    );
    if (s_cardIndex < 0) return;

    t_boardIndex = boards.findIndex((item: any) => item.id === target.bid);
    if (t_boardIndex < 0) return;

    t_cardIndex = boards[t_boardIndex]?.cards?.findIndex(
      (item: any) => item.id === target.cid
    );
    if (t_cardIndex < 0) return;

    const tempBoards = [...boards];
    const sourceCard = tempBoards[s_boardIndex].cards[s_cardIndex];
    tempBoards[s_boardIndex].cards.splice(s_cardIndex, 1);
    tempBoards[t_boardIndex].cards.splice(t_cardIndex, 0, sourceCard);
    setBoards(tempBoards);

    setTarget({
      bid: '',
      cid: '',
    });
  };

  return (
    <div>
      <div className='app'>
        <div className='app_navbar'>
          <h1>Welcome to Kanban Project Management Tools</h1>
        </div>
        <div className='app_outer'>
          <div className='app_boards'>
            {boards.map((item) => (
              <>
                <Board
                  key={item.id}
                  board={item}
                  removeBoard={removeBoard}
                  addCard={addCard}
                  removeCard={removeCard}
                  handleDragEnd={handleDragEnd}
                  handleDragEnter={handleDragEnter}
                />
              </>
            ))}
            <div className='app_boards_board'>
              <Editable
                text='Add Board Title'
                onSubmit={(value) => addBoard(value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

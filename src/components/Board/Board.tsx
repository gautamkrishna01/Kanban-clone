import { useState } from 'react';
import { DropDown } from '../Dropdown/DropDown';
import Editable from '../Editable/Editable';
import Card from '../card/Card';
import './Board.css';
import { FiMoreHorizontal } from 'react-icons/fi';

const Board = (props: any) => {
  const [showDropDown, setShowDropDown] = useState(false);
  return (
    <div className='board'>
      <div className='board_top'>
        <p className='board_top_title'>
          {props?.board.title}
          <span>{` ${props.board?.cards?.length}`}</span>
        </p>
        <div className='board_top_more' onClick={() => setShowDropDown(true)}>
          <FiMoreHorizontal />
          {showDropDown && (
            <DropDown onClose={() => setShowDropDown(false)}>
              <div className='board_dropdown'>
                <p onClick={() => props.removeBoard(props.board?.id)}>
                  Delete Board
                </p>
              </div>
            </DropDown>
          )}
        </div>
      </div>
      <div className='board_cards custom-scroll'>
        {props.board?.cards?.map((item: any) => (
          <Card
            key={item.id}
            card={item}
            removeCard={props.removeCard}
            boardId={props.board.id}
            handleDragEnd={props.handleDragEnd}
            handleDragEnter={props.handleDragEnter}
          />
        ))}

        <Editable
          // displayClass='boards_card_add'
          text='Add Card'
          // placeholder='Enter Card Title || "Enter Items'
          onSubmit={(value) => props.addCard(value, props.board?.id)}
        />
      </div>
    </div>
  );
};

export default Board;

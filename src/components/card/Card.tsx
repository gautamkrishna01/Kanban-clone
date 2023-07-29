import { FiMoreHorizontal } from 'react-icons/fi';
import { AiOutlineClockCircle, AiOutlineCheckCircle } from 'react-icons/ai';
import './card.css';
import Chip from '../chip/Chip';
import { useState } from 'react';
import { DropDown } from '../Dropdown/DropDown';

const Card = (props: any) => {
  const [showDropDown, setShowDropDown] = useState(false);
  return (
    <>
      <div
        className='card'
        draggable
        onDragEnd={() => props.handleDragEnd(props.card?.id, props.boardId)}
        onDragEnter={() => props.handleDragEnter(props.card?.id, props.boardId)}
      >
        <div className='card_top'>
          <div className='card_top_labels'>
            {props.card?.labels?.map((item: any, index: any) => (
              <Chip key={index} text={item.text} color={item.color} />
            ))}
          </div>
          <div className='card_top_more' onClick={() => setShowDropDown(true)}>
            <FiMoreHorizontal />

            {showDropDown && (
              <DropDown onClose={() => setShowDropDown(false)}>
                <div className='card_dropdown'>
                  <p
                    onClick={() =>
                      props.removeCard(props.card.id, props.boardId)
                    }
                  >
                    Delete card
                  </p>
                </div>
              </DropDown>
            )}
          </div>
        </div>
        <div className='card_title'>{props.card?.title}</div>
        <div className='card_footer'>
          {props.card?.date && (
            <p>
              <AiOutlineClockCircle /> {props.card?.date}
            </p>
          )}

          <p>
            <AiOutlineCheckCircle /> {props.card?.date} 1/4
          </p>
        </div>
      </div>
    </>
  );
};

export default Card;

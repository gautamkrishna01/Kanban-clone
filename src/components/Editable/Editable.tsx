import { useState } from 'react';
import './Editable.css';
import { RxCross2 } from 'react-icons/rx';

const Editable = (props: any) => {
  const [showEdit, setShowEdit] = useState(false);
  const [inputValue, setInputValue] = useState('');

  return (
    <>
      <div className='editable'>
        {showEdit ? (
          <form
            className='editable_edit'
            onSubmit={(event) => {
              event.preventDefault();
              if (props.onSubmit) props.onSubmit(inputValue);
              setShowEdit(false);
              setInputValue('');
            }}
          >
            <input
              autoFocus
              type='text'
              placeholder='Enter Task'
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              //   placeholder={props.placeholder}
              //   defaultValue={props.text}
            />
            <div className='editable_edit_footer'>
              <button type='submit'>Add</button>
              <button onClick={() => setShowEdit(false)}>
                <RxCross2 />
              </button>
            </div>
          </form>
        ) : (
          <p className='editable_display' onClick={() => setShowEdit(true)}>
            {props.text}
          </p>
        )}
      </div>
    </>
  );
};

export default Editable;

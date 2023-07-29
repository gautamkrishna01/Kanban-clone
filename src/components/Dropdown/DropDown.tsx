import { useEffect } from 'react';
import './DropDown.css';

export const DropDown = (props: any) => {
  // const dropdownRef = useRef();

  const handleClick = () => {
    // if (dropdownRef && !dropdownRef.current.contains(event.target))
    props.onClose ? props.onClose : '';
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  });

  return (
    <div
      // ref={dropdownRef}
      className='dropdown'
      style={{
        position: 'absolute',
        top: '100%',
        right: '0%',
      }}
    >
      {props.children}
    </div>
  );
};

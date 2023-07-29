import './chip.css';
import { MdOutlineCancel } from 'react-icons/md';
interface chipsProps {
  text: string;
}
const Chip = (props: chipsProps) => {
  return (
    <div className='chip' style={{ background: props.color }}>
      {props.text}
      {props.close && <MdOutlineCancel />}
    </div>
  );
};

export default Chip;

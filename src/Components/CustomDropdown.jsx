import {useRef, useState} from 'react';
import '../css/Dropdown.css';

export default function Dropdown({
                                     listItems,
                                     selectedValue,
                                     onClick
                                 }) {
    const exceptionRef = useRef();
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(prev => !prev);
    };

    const handleValueClickEvent = (value) => {
        setIsOpen(false);
        onClick(value);
    };

    const handleOpenStyle = !isOpen ?
        {
            header: {
                borderRadius: '3px',
                border: '1px solid rgb(225, 225, 225)'
            }
        } :
        {
            header: {
                fontWeight: '700',
                borderRadius: '3px 3px 0 0',
                borderTop: '1px solid #545454',
                borderLeft: '1px solid #545454',
                borderRight: '1px solid #545454',
                borderBottom: '1px solid #f0f8ff'
            },
            ul: {
                borderRadius: '0 0 3px 3px',
                borderBottom: '1px solid #545454',
                borderLeft: '1px solid #545454',
                borderRight: '1px solid #545454'
            },
            li: {
                borderBottom: '1px solid #f0f8ff'
            }
        }

    const variants = {
        open: {opacity: 1, height: "auto"},
        closed: {opacity: 0, height: 0}
    };

    return (
        <div className='custom-dropdown-container'>
            <div
                tabIndex={-1}
                className='custom-dropdown-header'
                style={handleOpenStyle.header}
                onClick={toggleDropdown}
                ref={exceptionRef}
            >
                <div className='selected-value'>
                    {selectedValue}
                </div>
            </div>
            {
                isOpen && (
                    <div
                        className={'dropdown-list-container'}
                        // onClick={() => setIsOpen(false)}
                        // exceptionRef={exceptionRef}
                    >
                        <ul
                            className='dropdown-list'
                            tabIndex={-1}
                            style={handleOpenStyle.ul}
                        >
                            {
                                listItems.map((item, index) => (
                                    <li
                                        className='dropdown-list-item'
                                        style={handleOpenStyle.li}
                                        key={`dropdown-list-${index}`}
                                        onClick={() => handleValueClickEvent(item)}
                                        value={item.name}
                                    >
                                        {item.name}
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                )
            }
        </div>
    );
};
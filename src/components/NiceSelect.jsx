import React, { useState, useEffect, useRef } from 'react';


const NiceSelect = ({ options, disabled, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options.find(option => option.selected) || options[0]);
  const ref = useRef(null);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onChange(option.value);
    setIsOpen(false);
  };

  return (
    <div className={`nice-select ${disabled ? 'disabled' : ''} ${isOpen ? 'open' : ''}`} ref={ref} tabIndex={disabled ? null : 0} onClick={() => !disabled && setIsOpen(!isOpen)}>
      <span className="current">{selectedOption.display || selectedOption.label}</span>
      <ul className="list">
        {options.map(option => (
          <li key={option.value} className={`option ${option.value === selectedOption.value ? 'selected' : ''} ${option.disabled ? 'disabled' : ''}`} onClick={() => !option.disabled && handleOptionClick(option)}>
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NiceSelect;

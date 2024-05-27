import React, { useState } from 'react';
import Button from '../Button/Button'; 
import style from './dropdown.module.css'; 

const DropdownMenu = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeButton, setActiveButton] = useState('');

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleSetNormal = () => {
    setActiveButton('P1 VS P2');
    setDropdownOpen(false); 
  };

  const handleSetComputer = () => {
    setActiveButton('P1 VS AI');
    setDropdownOpen(false); 
  };

  const handleSetScoreBoard = () => {
    setActiveButton('Score board');
    setDropdownOpen(false); 
  };

  return (
    <div className={style.dropdown}>
      <Button onClick={toggleDropdown} className={style.dropdownToggle}>
        MENU
      </Button>
      {dropdownOpen && (
        <ul className={style.dropdownMenu}>
          <li>
            <Button 
              className={`${style.gameModeBtn} ${activeButton === 'P1 VS P2' ? style.active : ''}`} 
              onClick={handleSetNormal}
            >
              1 v 1
            </Button>
          </li>
          <li>
            <Button 
              className={`${style.gameModeBtn} ${activeButton === 'P1 VS AI' ? style.active : ''}`} 
              onClick={handleSetComputer}
            >
              P1 vs AI
            </Button>
          </li>
          <li>
            <Button 
              className={`${style.gameModeBtn} ${activeButton === 'Score board' ? style.active : ''}`} 
              onClick={handleSetScoreBoard}
            >
              Score board
            </Button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default DropdownMenu;

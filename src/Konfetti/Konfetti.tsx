import { useState } from 'react';
import ConfettiExplosion from 'react-confetti-explosion';

function Konfetti() {
    const [isExploding, setIsExploding] = useState<boolean>(false);
    return <>{isExploding && <ConfettiExplosion />}</>;
  }

  export default Konfetti
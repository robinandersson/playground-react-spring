import React, { useRef } from 'react';
import { useSpring, useChain, animated } from 'react-spring';

function App() {
  const backgroundColorChange = useSpring({
    from: { backgroundColor: 'white' },
    to: { backgroundColor: '#9AE6B4' },
  });

  const fromTopRef = useRef();
  const fromTop = useSpring({
    from: { top: '-1000px' },
    to: { top: '0px' },
    config: { mass: 3, friction: 20, tension: 100 },
    ref: fromTopRef,
  });

  const fromLeftRef = useRef();
  const fromLeft = useSpring({
    from: { left: '-2000px' },
    to: { left: '0px' },
    config: { mass: 3, friction: 20, tension: 100 },
    ref: fromLeftRef,
  });

  useChain([fromTopRef, fromLeftRef], [0, 0.2]);

  return (
    <animated.main className="min-h-screen relative" style={backgroundColorChange}>
      <animated.div className="relative pt-16 pb-8 px-16" style={fromTop}>
        <h1 className="text-6xl text-white">Hello world</h1>
        <animated.hr
          className="relative w-24 mr-auto ml-0 border-4 border-white"
          style={fromLeft}
        />
      </animated.div>
    </animated.main>
  );
}

export default App;

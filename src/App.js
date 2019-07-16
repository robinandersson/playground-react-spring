import React, { useRef, useState, useEffect } from 'react';
import { useSpring, useChain, useTransition, animated } from 'react-spring';

const timedSetSentence = (sentence, duration, set) => {
  return setTimeout(
    () =>
      set(
        sentence
          .split(' ')
          .join('§ §')
          .split('§')
          .map((word, i) => ({ word, key: i }))
      ),
    duration
  );
};

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

  const [bodyText, setBodyText] = useState([]);

  const textTransitions = useTransition(bodyText, item => item.key, {
    from: { transform: 'translate3d(0,40px,0)', opacity: 0 },
    enter: { transform: 'translate3d(0,0px,0)', opacity: 1 },
    leave: { transform: 'translate3d(0,40px,0)', opacity: 0 },
  });

  const timeoutRefs = useRef([]);

  useEffect(() => {
    timeoutRefs.current = [];
    timeoutRefs.current.push(
      timedSetSentence('This is a sentence,', 1000, setBodyText)
    );
    timeoutRefs.current.push(
      timedSetSentence(
        'This is a sentence, a few more thingys here.',
        2500,
        setBodyText
      )
    );
    timeoutRefs.current.push(
      timedSetSentence(
        'This is a sentence, a few more thingys here. And there',
        4000,
        setBodyText
      )
    );
    return () => timeoutRefs.current.map(clearTimeout);
  }, []);

  return (
    <animated.main
      className="min-h-screen relative"
      style={backgroundColorChange}
    >
      <animated.div className="relative pt-16 pb-8 px-16" style={fromTop}>
        <h1 className="text-6xl text-white">Hello world</h1>
        <animated.hr
          className="relative w-24 mr-auto ml-0 border-4 border-white"
          style={fromLeft}
        />
      </animated.div>
      <div className="px-16">
        <p>
          {textTransitions.map(({ item, props, key }) => (
            <animated.span
              key={key}
              className="inline-block ml-1 text-white text-xl"
              style={props}
            >
              {item.word}
            </animated.span>
          ))}
        </p>
      </div>
    </animated.main>
  );
}

export default App;

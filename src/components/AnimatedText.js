import React, { useRef, useEffect, useReducer } from 'react';
import { useTransition, animated } from 'react-spring';

const AnimatedText = () => {
  const timerRefs = useRef([]);
  const bodyTextItemsRef = useRef([
    { text: 'This is a sentence,', timer: 2000 },
    { text: 'This is a sentence, a few more thingys here.', timer: 3500 },
    {
      text: 'This is a sentence, a few more thingys here. And there',
      timer: 5000,
    },
  ]);

  const [bodyText, dispatch] = useReducer((state, action) => {
    return action.text
      .split(' ')
      .join('§ §')
      .split('§')
      .map((word, i) => ({ word, key: i }));
  }, []);

  useEffect(() => {
    timerRefs.current = bodyTextItemsRef.current.map(({ text, timer }) =>
      setTimeout(() => {
        dispatch({ text });
      }, timer)
    );

    return () => timerRefs.current.map(clearTimeout);
  }, [bodyTextItemsRef, dispatch]);

  const textTransitions = useTransition(bodyText, item => item.key, {
    from: { transform: 'translate3d(0,40px,0)', opacity: 0 },
    enter: { transform: 'translate3d(0,0px,0)', opacity: 1 },
    leave: { transform: 'translate3d(0,40px,0)', opacity: 0 },
  });

  return (
    <>
      {textTransitions.map(({ item, props: style, key }) => (
        <animated.span
          key={key}
          className="inline-block ml-1 text-white text-xl"
          style={style}
        >
          {item.word}
        </animated.span>
      ))}
    </>
  );
};

export default AnimatedText;

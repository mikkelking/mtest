import React, { useState } from "react";
import { TransitionMotion, spring, presets } from "react-motion";
import * as Ui from "./toast-style";

const Demo = props => {
  const [todos, setTodos] = useState([
    // key is creation date
    { key: "t1", data: { text: "Board the plane", isDone: false } },
    { key: "t2", data: { text: "Sleep", isDone: true } },
    {
      key: "t3",
      data: { text: "Try to finish conference slides", isDone: false }
    },
    {
      key: "t4",
      data: { text: "Eat cheese and drink wine", isDone: false }
    },
    { key: "t5", data: { text: "Go around in Uber", isDone: false } },
    { key: "t7", data: { text: "Show Demo 1", isDone: false } },
    { key: "t8", data: { text: "Show Demo 2", isDone: false } }
  ]);

  const handleDone = doneKey => {
    setTodos(
      todos.map(todo => {
        const {
          key,
          data: { text, isDone }
        } = todo;
        return key === doneKey
          ? { key: key, data: { text: text, isDone: !isDone } }
          : todo;
      })
    );
  };

  const handleDestroy = date => {
    setTodos(todos.filter(({ key }) => key !== date));
  };

  // actual animation-related logic
  const getDefaultStyles = () => {
    return todos.map(todo => ({
      ...todo,
      style: { height: 0, opacity: 1 }
    }));
  };

  const getStyles = () => {
    return todos.map((todo, i) => {
      return {
        ...todo,
        style: {
          height: spring(76, presets.gentle),
          opacity: spring(1, presets.gentle)
        }
      };
    });
  };

  const willEnter = () => {
    return {
      height: 0,
      opacity: 1
    };
  };

  const willLeave = () => {
    return {
      height: spring(0),
      opacity: spring(0)
    };
  };

  const itemsLeft = todos.filter(({ data: { isDone } }) => !isDone).length;
  return (
    <TransitionMotion
      defaultStyles={getDefaultStyles()}
      styles={getStyles()}
      willLeave={willLeave}
      willEnter={willEnter}
    >
      {styles => (
        <Ui.ToastBox>
          {styles.map(({ key, style, data: { isDone, text } }) => (
            <Ui.Toast key={key} style={style}>
              <Ui.ToastLabel completed={isDone} onClick={() => handleDone(key)}>
                {text}
              </Ui.ToastLabel>
              <Ui.Destroy hideX onClick={() => handleDestroy(key)} />
            </Ui.Toast>
          ))}
        </Ui.ToastBox>
      )}
    </TransitionMotion>
  );
};

export default Demo;

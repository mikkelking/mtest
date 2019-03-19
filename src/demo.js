import React, { useState } from 'react'
import { TransitionMotion, spring, presets } from 'react-motion'

const Demo = props => {
  const [todos, setTodos] = useState([
    // key is creation date
    { key: 't1', data: { text: 'Board the plane', isDone: false } },
    { key: 't2', data: { text: 'Sleep', isDone: false } },
    {
      key: 't3',
      data: { text: 'Try to finish conference slides', isDone: false }
    },
    {
      key: 't4',
      data: { text: 'Eat cheese and drink wine', isDone: false }
    },
    { key: 't5', data: { text: 'Go around in Uber', isDone: false } },
    {
      key: 't6',
      data: { text: 'Talk with conf attendees', isDone: false }
    },
    { key: 't7', data: { text: 'Show Demo 1', isDone: false } },
    { key: 't8', data: { text: 'Show Demo 2', isDone: false } },
    {
      key: 't9',
      data: { text: 'Lament about the state of animation', isDone: false }
    },
    { key: 't10', data: { text: 'Show Secret Demo', isDone: false } },
    { key: 't11', data: { text: 'Go home', isDone: false } }
  ])
  const [value, setValue] = useState('')
  const [selected, setSelected] = useState('all')

  // logic from todo, unrelated to animation
  const handleChange = ({ target: { value } }) => {
    setValue(value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    const newItem = {
      key: 't' + Date.now(),
      data: { text: value, isDone: false }
    }
    // append at head
    setTodos([newItem].concat(todos))
  }

  const handleDone = doneKey => {
    setTodos(
      todos.map(todo => {
        const {
          key,
          data: { text, isDone }
        } = todo
        return key === doneKey
          ? { key: key, data: { text: text, isDone: !isDone } }
          : todo
      })
    )
  }

  const handleToggleAll = () => {
    const allNotDone = todos.every(({ data }) => data.isDone)
    setTodos(
      todos.map(({ key, data: { text, isDone } }) => ({
        key: key,
        data: { text: text, isDone: !allNotDone }
      }))
    )
  }

  const handleSelect = selected => {
    setSelected(selected)
  }

  const handleClearCompleted = () => {
    setTodos(todos.filter(({ data }) => !data.isDone))
  }

  const handleDestroy = date => {
    setTodos(todos.filter(({ key }) => key !== date))
  }

  // actual animation-related logic
  const getDefaultStyles = () => {
    return todos.map(todo => ({
      ...todo,
      style: { height: 0, opacity: 1 }
    }))
  }

  const getStyles = () => {
    return todos
      .filter(({ data: { isDone, text } }) => {
        return (
          text.toUpperCase().indexOf(value.toUpperCase()) >= 0 &&
          ((selected === 'completed' && isDone) ||
            (selected === 'active' && !isDone) ||
            selected === 'all')
        )
      })
      .map((todo, i) => {
        return {
          ...todo,
          style: {
            height: spring(60, presets.gentle),
            opacity: spring(1, presets.gentle)
          }
        }
      })
  }

  const willEnter = () => {
    return {
      height: 0,
      opacity: 1
    }
  }

  const willLeave = () => {
    return {
      height: spring(0),
      opacity: spring(0)
    }
  }

  const itemsLeft = todos.filter(({ data: { isDone } }) => !isDone).length
  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={handleSubmit}>
          <input
            autoFocus={true}
            className="new-todo"
            placeholder="What needs to be done?"
            value={value}
            onChange={handleChange}
          />
        </form>
      </header>
      <section className="main">
        <input
          className="toggle-all"
          type="checkbox"
          checked={itemsLeft === 0}
          style={{ display: todos.length === 0 ? 'none' : 'inline' }}
          onChange={handleToggleAll}
        />
        <TransitionMotion
          defaultStyles={getDefaultStyles()}
          styles={getStyles()}
          willLeave={willLeave}
          willEnter={willEnter}>
          {styles => (
            <ul className="todo-list">
              {styles.map(({ key, style, data: { isDone, text } }) => (
                <li
                  key={key}
                  style={style}
                  className={isDone ? 'completed' : ''}>
                  <div className="view">
                    <input
                      className="toggle"
                      type="checkbox"
                      onChange={handleDone.bind(null, key)}
                      checked={isDone}
                    />
                    <label>{text}</label>
                    <button
                      className="destroy"
                      onClick={handleDestroy.bind(null, key)}
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </TransitionMotion>
      </section>
    </section>
  )
}

export default Demo

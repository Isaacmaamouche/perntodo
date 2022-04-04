import { useState, useEffect } from 'react';
export default function InputTodo() {
  const [description, setDescription] = useState('');

  async function onSubmitForm(e: any): Promise<void> {
    e.preventDefault();
    try {
      const body = { description };
      await fetch('/todos', {
        method: 'post',
        headers: { 'Content-Type': 'Application/JSON' },
        body: JSON.stringify(body),
      });
      window.location.href = '/';
    } catch (error) {
      console.error({ error });
    }
  }

  async function resetDemoData() {
    try {
      await fetch('/todos/reset');
    } catch (error) {
      console.error({ error });
    }
  }

  function loadDemoData() {
    resetDemoData();
    window.location.href = '/';
  }

  const CalcTimeRemaining = () => {
    const countdown = new Date().getTime();
    let until10 = 10 - (new Date().getMinutes() % 10) + new Date().getMinutes();
    if (until10 >= 60) until10 = 0;
    const target = new Date(`Jan 1, 2135 00:${until10}:00`).getTime();
    const timeUntil = target - countdown;
    const minutesRemaining = new Date(timeUntil).getMinutes();
    const secondsRemaining = String(new Date(timeUntil).getSeconds());
    const s =
      secondsRemaining.length === 1 ? '0' + secondsRemaining : secondsRemaining;
    return minutesRemaining + ':' + s;
  };

  const [timeRemaining, setTimeRemaining] = useState(CalcTimeRemaining());
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeRemaining(CalcTimeRemaining());
    }, 1000);
    if (CalcTimeRemaining() === '0:00') {
      window.location.href = '/';
    }
    return () => clearTimeout(timer);
  });

  return (
    <>
      <div className="text-center">
        <h1 className="text-center mt-5">PERN Stack Todo list</h1>
        <h2>Postgres, Express, React, and Node.js</h2>
        <div className="alert alert-primary fs-6" role="alert">
          The database is reset every 10 min with demo records.
          <br />
          <span>{timeRemaining} before reset</span>
        </div>
      </div>
      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
        <input
          type="text"
          className="form-control me-2"
          placeholder="My new todo"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="btn btn-primary">Add</button>
      </form>
      <div className="d-flex flex-row-reverse my-3">
        <button
          className="btn btn-warning"
          type="submit"
          onClick={loadDemoData}
        >
          Load demo data
        </button>
      </div>
    </>
  );
}

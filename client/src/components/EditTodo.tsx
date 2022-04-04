import { useEffect, useState } from 'react';
interface EditProps {
  todo: TodoProps;
}

interface TodoProps {
  description: string;
  todo_id: number;
}

interface updatedDescription {
  description: string;
}

export default function EditTodo({ todo }: EditProps) {
  const { description, todo_id } = todo;
  const [newDescription, setNewDescription] = useState('');

  function resetDescription() {
    setNewDescription(description);
  }

  useEffect(() => {
    resetDescription();
  }, []);

  async function updateTodo() {
    try {
      const body: updatedDescription = { description: newDescription };
      await fetch(`/todos/${todo_id}`, {
        method: 'put',
        headers: { 'Content-Type': 'Application/JSON' },
        body: JSON.stringify(body)
      }).then(() => (window.location.href = '/'));
    } catch (error) {
      console.error({ error });
    }
  }

  return (
    <>
      <button
        type="button"
        className="btn btn-warning px-5"
        data-bs-toggle="modal"
        data-bs-target={`#editTodo${todo_id}Modal`}
      >
        Edit todo
      </button>

      <div
        className="modal fade"
        id={`editTodo${todo_id}Modal`}
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Todo {todo_id}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body text-dark">
              <p>{description}</p>
              <form className="d-flex mt-5">
                <input
                  type="text"
                  className="form-control me-2"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                />
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-warning me-2"
                onClick={updateTodo}
              >
                Update
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={resetDescription}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

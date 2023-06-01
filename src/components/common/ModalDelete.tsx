import { FC, useRef } from "react";
import { Modal } from "bootstrap";

interface Props {
  id: number;
  text: string;
  deleteFunc: (id: number) => void;
}

const ModalDelete: FC<Props> = ({ id, text, deleteFunc }) => {
  const modalRef = useRef(null);

  const showModal = () => {
    const modal = modalRef.current;
    if (modal !== null) {
      const bsModal = new Modal(modal, {});
      bsModal.show();
    }
  };

  return (
    <>
      <button className="btn" onClick={showModal}>
        delete
      </button>
      <div className="modal fade" ref={modalRef} tabIndex={-1}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Modal title</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>Modal body text goes here.</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalDelete;

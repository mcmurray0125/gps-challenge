import { Modal, Button, Image } from "react-bootstrap"

export default function ProductModal({ show, product, onHide }) {

  return (
    <Modal
    show={show}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    >
      <div className="modal-image w-100 d-flex justify-content-center">
        <Image src={product.image} style={{maxWidth: "300px"}} className="shadow"/>
      </div>
      <section className="modal-info">
        <Modal.Header className='border-0 flex-grow-1 d-flex flex-column'>
            <Modal.Title id="contained-modal-title-vcenter" className='fs-2' style={{fontWeight: "600"}}>{product.name}</Modal.Title>
            <p className='m-0 modal-description text-center'>{product.description}</p>
        </Modal.Header>
        <Modal.Body className='d-flex align-items-center'>
            <p className='m-0 fs-5'><span className="text-decoration-underline">Additional info:</span> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti at impedit voluptate deleniti beatae neque. Porro, praesentium animi illo aut tempore sint exercitationem, suscipit impedit placeat asperiores maiores quia molestias?</p>
        </Modal.Body>
        <Modal.Footer className='flex-grow-1'>
            <Button onClick={onHide}>Close</Button>
        </Modal.Footer>
      </section>
    </Modal>
  )
}
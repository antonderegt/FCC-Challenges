import React from 'react'
import { Button, Modal, FormGroup, FormControl, HelpBlock } from 'react-bootstrap'

const ModalViewer = (props) => (
  <div>
  <Modal show={props.showModal} onHide={() => props.close()}>
    <Modal.Header closeButton>
      <Modal.Title>Edit Recipe</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <h4>Recipe Title</h4>
      <form>
        <FormGroup
          controlId="formBasicText"
          >
          <FormControl
            type="text"
            value={props.titleVal}
            placeholder="Enter recipe title"
            onChange={e => props.handleChange(e, 'title')}
            />
          <FormControl.Feedback />
        </FormGroup>
      </form>
      <hr />

      <h4>Ingredients</h4>
        <form>
          <FormGroup
            controlId="formBasicText"
            validationState={props.getValidationState()}
            >
            <FormControl
              type="text"
              value={props.ingredientsVal}
              placeholder="Enter ingredients"
              onChange={e => props.handleChangeI(e, 'ingredients')}
              />
            <FormControl.Feedback />
            <HelpBlock>Seperate ingredients with a comma</HelpBlock>
          </FormGroup>
        </form>
    </Modal.Body>
    <Modal.Footer>
      <Button bsStyle="danger" onClick={() => props.close()}>Close</Button>
      <Button bsStyle="success" onClick={() => props.save()}>Save</Button>
    </Modal.Footer>
  </Modal>
  </div>
)

export default ModalViewer

import { Button, Col, Form, Modal, Row, Stack } from "react-bootstrap";
import { Tag } from "../App";

type EditTagsModalProps = {
    show: boolean,
    onHide: () => void,
    tags: Tag[],
    deleteTag: (id: string) => void,
    updateTag: (id: string, value: string) => void
}

export function EditTagsModal({ show, onHide, tags, deleteTag, updateTag }: EditTagsModalProps) {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Tags</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Stack gap={2}>
                        {tags.map(tag => {
                            return (
                                <Row key={tag.id}>
                                    <Col>
                                        <Form.Control type="text" value={tag.label} onChange={e => updateTag(tag.id, e.target.value)} />
                                    </Col>
                                    <Col xs='auto'>
                                        <Button onClick={() => deleteTag(tag.id)} variant="outline-danger">Delete</Button>
                                    </Col>
                                </Row>
                            )
                        })}
                    </Stack>
                </Form>
            </Modal.Body>
        </Modal>
    )
}
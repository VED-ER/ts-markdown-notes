import { Button, Col, Container, Form, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import Select from 'react-select'
import { Note, Tag } from "../App";
import { NoteList } from "../components/NoteList";
import { useMemo, useState } from "react";
import { EditTagsModal } from "../components/EditTagsModal";

type HomeProps = {
    notes: Note[],
    availableTags: Tag[],
    deleteTag: (id: string) => void,
    updateTag: (id: string, value: string) => void
}

export function Home({ notes, availableTags, deleteTag, updateTag }: HomeProps) {
    const [showEditTagsModal, setShowEditTagsModal] = useState(false)
    const [title, setTitle] = useState('')
    const [selectedTags, setSelectedTags] = useState<Tag[]>([])

    const filteredNotes = useMemo(() => {
        return notes.filter(note => {
            return (title === '' || note.title.toLowerCase().includes(title.toLowerCase())) && (
                selectedTags.length === 0 || selectedTags.every(tag => note.tags.some(noteTag => noteTag.id === tag.id))
            )
        })
    }, [title, selectedTags, notes])

    const onModalHide = () => {
        setShowEditTagsModal(false)
    }

    return (
        <>
            <Container className="mt-3">
                <Stack direction="horizontal" className="justify-content-between">
                    <h1>Notes</h1>
                    <Stack direction="horizontal" gap={3}>
                        <Link to={'/create'}>
                            <Button>Create</Button>
                        </Link>
                        <Button onClick={() => setShowEditTagsModal(true)} variant="outline-secondary">Edit Tags</Button>
                    </Stack>
                </Stack>
                <Form>
                    <Row>
                        <Col>
                            <Form.Group controlId="title">
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" onChange={(e) => setTitle(e.target.value)} />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="tags">
                                <Form.Label>Tags</Form.Label>
                                <Select
                                    value={selectedTags.map(tag => {
                                        return {
                                            label: tag.label, value: tag.id
                                        }
                                    })}
                                    options={availableTags.map(tag => ({ label: tag.label, value: tag.id }))}
                                    isMulti
                                    onChange={tags => {
                                        setSelectedTags(tags.map(tag => ({ label: tag.label, id: tag.value })))
                                    }}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
                <NoteList notes={filteredNotes} />
            </Container>
            <EditTagsModal show={showEditTagsModal} onHide={onModalHide} tags={availableTags} deleteTag={deleteTag} updateTag={updateTag} />
        </>
    )
}


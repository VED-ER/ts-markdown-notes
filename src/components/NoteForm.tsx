import { FormEvent, useRef, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import Creatable from 'react-select/creatable';
import { NoteData, Tag } from "../App";
import { v4 as uuidv4 } from 'uuid'
import { Link, useNavigate } from "react-router-dom";

type NoteFormProps = {
    availableTags: Tag[],
    onAddTag: (tag: Tag) => void,
    onSubmit: (note: NoteData) => void
} & Partial<NoteData>

export function NoteForm({ availableTags, onAddTag, onSubmit, title = "", tags = [], body = "" }: NoteFormProps) {
    const [selectedTags, setSelectedTags] = useState<Tag[]>(tags)
    const titleRef = useRef<HTMLInputElement>(null)
    const bodyRef = useRef<HTMLTextAreaElement>(null)

    const navigate = useNavigate()

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()

        const newNote = {
            title: titleRef.current!.value,
            body: bodyRef.current!.value,
            tags: selectedTags
        }

        onSubmit(newNote)
        navigate('..')
    }

    return (
        <Form className="mt-4" onSubmit={handleSubmit}>
            <Row>
                <Col>
                    <Form.Group controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control required type="text" ref={titleRef} defaultValue={title} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="tags">
                        <Form.Label>Tags</Form.Label>
                        <Creatable
                            onCreateOption={(value) => {
                                const newTag = { id: uuidv4(), label: value }
                                onAddTag(newTag)
                                setSelectedTags(prevTags => ([...prevTags, newTag]))
                            }}
                            value={selectedTags.map(tag => ({ label: tag.label, value: tag.id }))}
                            options={availableTags.map(tag => ({ label: tag.label, value: tag.id }))}
                            isMulti
                            onChange={tags => setSelectedTags(tags.map(tag => ({ label: tag.label, id: tag.value })))}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row className="mt-3">
                <Form.Group controlId="body">
                    <Form.Label>Body</Form.Label>
                    <Form.Control required as="textarea" rows={15} ref={bodyRef} defaultValue={body} />
                </Form.Group>
            </Row>
            <Stack direction="horizontal" gap={3} className="mt-3 mb-3">
                <Button type="submit" className="ms-auto">Save</Button>
                <Link to={'..'}>
                    <Button variant="outline-primary">Cancel</Button>
                </Link>
            </Stack>
        </Form>
    )
}
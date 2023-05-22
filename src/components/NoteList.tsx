import { Col, Row } from "react-bootstrap"
import { Note } from "../App"
import { NoteCard } from "./NoteCard"

type NoteListProps = {
    notes: Note[]
}

export function NoteList({ notes }: NoteListProps) {
    return (
        <Row xs={1} sm={2} lg={3} xl={4} className="g-3 mt-3">
            {notes.map(note => (
                <Col key={note.id}>
                    <NoteCard id={note.id} title={note.title} tags={note.tags} />
                </Col>
            ))}
        </Row>
    )
}
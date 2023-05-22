import { Container } from "react-bootstrap";
import { NoteForm } from "../components/NoteForm";
import { NoteData, Tag } from "../App";

type CreateNoteProps = {
    availableTags: Tag[],
    onAddTag: (tag: Tag) => void,
    onSubmit: (note: NoteData) => void
}

export function CreateNote({ availableTags, onAddTag, onSubmit }: CreateNoteProps) {
    return (
        <Container className="mt-3">
            <h1>Create Note</h1>
            <NoteForm availableTags={availableTags} onAddTag={onAddTag} onSubmit={onSubmit} />
        </Container>
    )
}
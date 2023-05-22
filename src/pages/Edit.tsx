import { Container } from "react-bootstrap";
import { NoteForm } from "../components/NoteForm";
import { NoteData, Tag } from "../App";
import { useNote } from "../components/NoteLayoutWrapper";

type EditNoteProps = {
    availableTags: Tag[],
    onAddTag: (tag: Tag) => void,
    onSubmit: (id: string, data: NoteData) => void
}

export function Edit({ availableTags, onAddTag, onSubmit }: EditNoteProps) {

    const note = useNote()

    return (
        <Container className="mt-3">
            <h1>Edit Note</h1>
            <NoteForm
                onSubmit={(data) => onSubmit(note.id, data)}
                availableTags={availableTags}
                onAddTag={onAddTag}
                title={note.title}
                tags={note.tags}
                body={note.body}
            />
        </Container>
    )
}
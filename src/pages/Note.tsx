import { Badge, Button, Container, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useNote } from "../components/NoteLayoutWrapper";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

type NoteProps = {
    onDelete: (id: string) => void
}

export function Note({ onDelete }: NoteProps) {
    const note = useNote()
    const navigate = useNavigate()

    const deleteClickHandler = () => {
        onDelete(note.id)
        navigate('/')
    }

    return (
        <Container className="mt-3">
            <Stack direction="horizontal" className="justify-content-between mb-5">
                <Stack>
                    <h1>{note.title}</h1>
                    <Stack direction="horizontal" gap={2}>
                        {note.tags.map(tag => <Badge key={tag.id} className="text-truncate">{tag.label}</Badge>)}
                    </Stack>
                </Stack>
                <Stack direction="horizontal" gap={2}>
                    <Link to={`/${note.id}/edit`}>
                        <Button>Edit</Button>
                    </Link>
                    <Button onClick={deleteClickHandler} variant="outline-danger">Delete</Button>
                    <Button onClick={() => navigate('/')} variant="outline-secondary">Back</Button>
                </Stack>
            </Stack>
            <ReactMarkdown>
                {note.body}
            </ReactMarkdown>
        </Container>
    )
}
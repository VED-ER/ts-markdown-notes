import { Badge, Card, Stack } from "react-bootstrap"
import { Tag } from "../App"
import { Link } from "react-router-dom"
import styles from "./NoteCard.module.css"

type SimplifiedNote = {
    id: string,
    title: string,
    tags: Tag[]
}

export function NoteCard({ id, title, tags }: SimplifiedNote) {
    return (
        <Card as={Link} to={`${id}`} className={`h-100 text-reset text-decoration-none ${styles.card}`}>
            <Card.Body>
                <Stack gap={2} className="justify-content-center align-items-center">
                    <span>{title}</span>
                    {tags.length > 0 &&
                        <Stack direction="horizontal" gap={1} className="justify-content-center flex-wrap">
                            {tags.map(tag => (
                                <Badge key={tag.id} className="text-truncate">{tag.label}</Badge>
                            ))}
                        </Stack>
                    }
                </Stack>
            </Card.Body>
        </Card>
    )
}
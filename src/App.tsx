import { Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home"
import { useLocalStorage } from "./hooks/useLocalStorage"
import { CreateNote } from "./pages/CreateNote"
import { v4 as uuidv4 } from 'uuid'
import { useMemo } from "react"
import { Note } from "./pages/Note"
import { NoteLayoutWrapper } from "./components/NoteLayoutWrapper"
import { Edit } from "./pages/Edit"

export type Tag = {
  id: string,
  label: string
}

export type RawNote = {
  id: string
} & RawNoteData

export type RawNoteData = {
  title: string,
  body: string,
  tagIds: string[]
}

export type Note = {
  id: string
} & NoteData

export type NoteData = {
  title: string,
  body: string,
  tags: Tag[]
}

function App() {
  const [rawNotes, setRawNotes] = useLocalStorage<RawNote[]>([], "RAW_NOTES")
  const [tags, setTags] = useLocalStorage<Tag[]>([], "NOTES_TAGS")

  const addTag = (tag: Tag) => {
    setTags(prevTags => ([...prevTags, tag]))
  }

  const deleteTag = (id: string) => {
    setTags(prevTags => prevTags.filter(tag => tag.id !== id))
  }

  const updateTag = (id: string, value: string) => {
    setTags(prevTags => {
      return prevTags.map(tag => {
        if (tag.id === id) {
          return { ...tag, label: value }
        } else {
          return tag
        }
      })
    })
  }

  const addNote = ({ tags, title, body }: NoteData) => {
    setRawNotes(prevRawNotes => ([...prevRawNotes, { id: uuidv4(), title, body, tagIds: tags.map(tag => tag.id) }]))
  }

  const updateNote = (id: string, { tags, title, body }: NoteData) => {
    setRawNotes(prevRawNotes => {
      return prevRawNotes.map(note => {
        if (note.id === id) {
          return { ...note, tagIds: tags.map(tag => tag.id), title, body }
        } else {
          return note
        }
      })
    })
  }

  const deleteNote = (id: string) => {
    setRawNotes(prevNotes => prevNotes.filter(note => note.id !== id))
  }

  const notes = useMemo(() => {
    return rawNotes.map(({ tagIds, title, id, body }) => ({ title, id, body, tags: tags.filter(tag => tagIds.includes(tag.id)) }))
  }, [rawNotes, tags])

  return (
    <Routes>
      <Route path="/" element={<Home notes={notes} availableTags={tags} deleteTag={deleteTag} updateTag={updateTag} />} />
      <Route path="/create" element={<CreateNote availableTags={tags} onAddTag={addTag} onSubmit={addNote} />} />
      <Route path="/:id" element={<NoteLayoutWrapper notes={notes} />}>
        <Route index element={<Note onDelete={deleteNote} />} />
        <Route path="edit" element={<Edit onSubmit={updateNote} onAddTag={addTag} availableTags={tags} />} />
      </Route>
    </Routes>
  )
}

export default App

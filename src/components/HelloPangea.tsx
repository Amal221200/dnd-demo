import { DragDropContext, Draggable, Droppable, DropResult } from '@hello-pangea/dnd';
import { useState } from 'react';
import { usersData } from './DNDKit';
import { arrayMove } from '@dnd-kit/sortable';

const HelloPangea = () => {
    const [users, setUsers] = useState(usersData);

    const handleDragEnd = (e: DropResult<string>) => {
        const { destination, source } = e;
        if (!destination) {
            return
        }
        if (source.index !== destination.index) {
            setUsers((prev) => {
                return arrayMove(prev, source.index, destination.index)
            })
        }
    }

    return (
        <>
            <div className='h-dvh grid place-content-center'>
                <div>
                    <DragDropContext onDragEnd={handleDragEnd} enableDefaultSensors>
                        <Droppable droppableId='users' direction='vertical'>
                            {
                                (provided) => (
                                    <div {...provided.droppableProps} ref={provided.innerRef} className='grid gap-y-2'>
                                        {users.map((user, index) => (
                                            <User key={user.id} user={user} index={index} />
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )
                            }
                        </Droppable>
                    </DragDropContext>
                </div>
            </div>
            <div className="h-dvh bg-black"></div>
        </>
    )
}

const User = ({ user, index }: { user: { id: string, name: string }, index: number }) => {

    return (
        <>
            <Draggable draggableId={user.id} index={index}>
                {
                    (provided) => (
                        <div {...provided.draggableProps} ref={provided.innerRef}  {...provided.dragHandleProps} className='border px-4 py-2 rounded bg-blue-400'>
                            <h1>{user.name}</h1>
                        </div>
                    )
                }
            </Draggable>
        </>
    )
}

export default HelloPangea
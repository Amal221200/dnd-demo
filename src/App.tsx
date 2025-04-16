import { DndContext, DragEndEvent, PointerSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core"
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";

const usersData = [
  { id: '1', name: 'John Doe' },
  { id: '2', name: 'Jane Smith' },
  { id: '3', name: 'Alice Johnson' },
  { id: '4', name: 'Bob Brown' },
  { id: '5', name: 'Charlie Davis' },
]

const App = () => {
  const [users, setUsers] = useState(usersData);
  const sensors = useSensors(useSensor(PointerSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 5,
    }
  }), useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 5,
    }
  }));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = users.findIndex(user => user.id === active.id);
      const newIndex = users.findIndex(user => user.id === over.id);
      const updatedUsers = arrayMove(users, oldIndex, newIndex);
      setUsers(updatedUsers);
    }
  }
  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <SortableContext items={users} strategy={verticalListSortingStrategy}>
        <div className="h-dvh grid place-content-center gap-y-2">
          {users.map(user => (
            <User key={user.id} user={user} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  )
}

const User = ({ user }: { user: { id: string, name: string } }) => {
  const { attributes, listeners, setNodeRef, transform, transition, active } = useSortable({ id: user.id });

  return (
    <div style={{ transform: CSS.Transform.toString(transform), transition, touchAction: 'none', scale: active?.id === user.id ? 1.3 : 1 }} className="border px-4 py-2 rounded bg-blue-400" ref={setNodeRef} {...attributes} {...listeners}>
      <h1>{user.name}</h1>
    </div>
  )
}

export default App
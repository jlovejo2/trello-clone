import { useRef } from "react";
import { useDrop } from "react-dnd";
import { AddNewItem } from "./AddNewItem"
import { Card } from "./Card"
import { useAppState } from "./state/AppStateContext"
import { addTask, moveList, moveTask, setDraggedItem } from "./state/actions"
import { ColumnContainer, ColumnTitle } from "./styles"
import { useItemDrag } from "./utils/useItemDrag";
import { throttle } from "./utils/throttle";
import { isHidden } from "./utils/isHidden";

type ColumnProps = {
    text: string
    id: string
    isPreview?: boolean
}

export const Column = ({ text, id, isPreview }: ColumnProps) => {
    const { draggedItem, getTasksByListId, dispatch } = useAppState();
    const tasks = getTasksByListId(id);
    const ref = useRef<HTMLDivElement>(null);
    
    const [, drop] = useDrop({ accept: ["COLUMN", "CARD"], hover: throttle(200, () => {
        if (!draggedItem) return;
        if (draggedItem.type === "COLUMN") {
            if (draggedItem.id === id) return;

            dispatch(moveList(draggedItem.id, id))
        } else if (draggedItem.type === "CARD") {
            if (draggedItem.columnId === id) return

            if (tasks.length) return

            dispatch(moveTask(draggedItem.id, null, draggedItem.columnId, id))
            dispatch(setDraggedItem({...draggedItem, columnId: id}))
        }
    })})

    const { drag } = useItemDrag({type: "COLUMN", id, text});
    
    drag(drop(ref));

    console.log(id, tasks)

    return (
        <ColumnContainer ref={ref} isHidden={isHidden(draggedItem, "COLUMN", id, isPreview)} >
            <ColumnTitle> { text } </ColumnTitle>
            {tasks.map((task): any => {
                return <Card text={task.text} key={task.id} id={task.id} columnId={id} />
            })}
            <AddNewItem 
                toggleButtonText="+ Add another card"
                onAdd={(text) => dispatch(addTask(text, id))}
                dark
            />
        </ColumnContainer>
    )
}
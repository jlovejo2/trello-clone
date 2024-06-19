import { useRef } from "react";
import { useDrop } from "react-dnd";
import { AddNewItem } from "./AddNewItem"
import { Card } from "./Card"
import { useAppState } from "./state/AppStateContext"
import { addTask, moveList } from "./state/actions"
import { ColumnContainer, ColumnTitle } from "./styles"
import { useItemDrag } from "./utils/useItemDrag";
import { throttle } from "./utils/throttle";

type ColumnProps = {
    text: string
    id: string
}


export const Column = ({ text, id }: ColumnProps) => {
    const { draggedItem, getTasksByListId, dispatch } = useAppState();
    const ref = useRef<HTMLDivElement>(null);
    
    const [, drop] = useDrop({ accept: "COLUMN", hover: throttle(200, () => {
        if (!draggedItem) return;
        if (draggedItem.type === "COLUMN") {
            if (draggedItem.id === id) return;
        }

        dispatch(moveList(draggedItem.id, id))
    })})

    const { drag } = useItemDrag({type: "COLUMN", id, text});

    const tasks = getTasksByListId(id);
    
    drag(drop(ref));

    return (
        <ColumnContainer ref={ref}>
            <ColumnTitle> { text } </ColumnTitle>
            {tasks.map((task): any => {
                return <Card text={task.text} key={task.id} id={task.id} />
            })}
            <AddNewItem 
                toggleButtonText="+ Add another card"
                onAdd={(text) => dispatch(addTask(text, id))}
                dark
            />
        </ColumnContainer>
    )
}
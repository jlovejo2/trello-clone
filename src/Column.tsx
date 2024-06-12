import { AddNewItem } from "./AddNewItem"
import { Card } from "./Card"
import { useAppState } from "./state/AppStateContext"
import { ColumnContainer, ColumnTitle } from "./styles"

type ColumnProps = {
    text: string
    id: string
}

export const Column = ({ text, id }: ColumnProps) => {
    const { getTasksByListId } = useAppState();

    const tasks = getTasksByListId(id);

    return (
        <ColumnContainer>
            <ColumnTitle> { text } </ColumnTitle>
            {tasks.map((task): any => {
                return <Card text={task.text} key={task.id} id={task.id} />
            })}
            <AddNewItem 
                toggleButtonText="+ Add another card"
                onAdd={console.log}
                dark
            />
        </ColumnContainer>
    )
}
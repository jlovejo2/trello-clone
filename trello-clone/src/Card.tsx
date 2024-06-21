import { useRef } from "react"
import { useAppState } from "./state/AppStateContext"
import { CardContainer } from "./styles"
import { isHidden } from "./utils/isHidden"
import { useItemDrag } from "./utils/useItemDrag"
import { useDrop } from "react-dnd"
import { throttle } from "./utils/throttle"
import { moveTask, setDraggedItem } from "./state/actions"

type CardProps = {
    text: string
    id: string
    columnId: string
    isPreview?: boolean
}

export const Card = ({text, columnId, id, isPreview}: CardProps) => {
    const { draggedItem, dispatch } = useAppState()
    const ref = useRef<HTMLDivElement>(null)
    const { drag } = useItemDrag({ type: "CARD", id, text, columnId})
    const [, drop] = useDrop({
        accept: "CARD",
        hover: throttle(200, () => {
            if (!draggedItem) return;
            if (draggedItem.type !== "CARD") return;
            if (draggedItem.id === id) return;

            console.log('card dispacth: ', draggedItem.id, id)
            // lets update the item with move task
            dispatch(moveTask(draggedItem.id, id, draggedItem.columnId, columnId))
            // might have dragged into another column so need to set that here
            dispatch(setDraggedItem({...draggedItem, columnId}))
        })
    })

    drag(drop(ref));

    return (
        <CardContainer
            isHidden={isHidden(draggedItem, "CARD", id, isPreview)}
            isPreview={isPreview}
            ref={ref}
        >
            {text}
        </CardContainer>
    )
}
import { useDrag } from "react-dnd";
import { useAppState } from "../state/AppStateContext";
import { DragItem } from "../DragItem";
import { setDraggedItem } from "../state/actions";

export const useItemDrag = (item: DragItem) => {
    const { dispatch } = useAppState();
    // the hanging comma is not a typo and is intentional because we are skipping the collected object in useDrag hook.
    const [, drag ] = useDrag({
        type: item.type,
        item: () => {
            dispatch(setDraggedItem(item))
            return item
        },
        end: () => dispatch(setDraggedItem(null))
    })
    return { drag }
}
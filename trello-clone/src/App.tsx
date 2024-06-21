import { AddNewItem } from "./AddNewItem"
import { Column } from "./Column"
import { CustomDragLayer } from "./CustomDragLayer"
import { useAppState } from "./state/AppStateContext"
import { addList } from "./state/actions"
import { Appcontainer } from "./styles"

export const App = () => {
  const { lists, dispatch } = useAppState();

  return (
    <Appcontainer>
      <CustomDragLayer />
      {lists.map((list): any => {
        return <Column text={list.text} key={list.id} id={list.id} />
      })}
      <AddNewItem toggleButtonText="+ Add another list" onAdd={(text) => dispatch(addList(text))} />
    </Appcontainer>
  )
}
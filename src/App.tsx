import { AddNewItem } from "./AddNewItem"
import { Column } from "./Column"
import { useAppState } from "./state/AppStateContext"
import { Appcontainer } from "./styles"

export const App = () => {
  const { lists } = useAppState();

  return (
    <Appcontainer>
      {lists.map((list): any => {
        return <Column text={list.text} key={list.id} id={list.id} />
      })}
      <AddNewItem toggleButtonText="+ Add another list" onAdd={console.log} />
    </Appcontainer>
  )
}
import { AddNewItem } from "./AddNewItem"
import { Column } from "./Column"
import { Appcontainer } from "./styles"

export const App = () => {
  return (
    <Appcontainer>
      <Column text='Todo' />
      <AddNewItem toggleButtonText="+ Add another list" onAdd={console.log} />
    </Appcontainer>
  )
}
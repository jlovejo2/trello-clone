import { Appcontainer, CardContainer, ColumnContainer, ColumnTitle } from "./styles"

export const App = () => {
  return (
    <Appcontainer>
      <ColumnContainer>
        <ColumnTitle> Todo: </ColumnTitle>
        <CardContainer> First Item: </CardContainer>
        <CardContainer> Second Item: </CardContainer>
        <CardContainer> Thid Item: </CardContainer>
      </ColumnContainer>
    </Appcontainer>
  )
}
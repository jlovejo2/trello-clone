import { Card } from "./Card"
import { ColumnContainer, ColumnTitle, CardContainer } from "./styles"

type ColumnProps = {
    text: string
}

export const Column = ({ text }: ColumnProps) => {
    return (
        <ColumnContainer>
            <ColumnTitle> { text } </ColumnTitle>
            <Card text='Generate App Scafold'/>
            <Card text='Learn Typescript' />
            <Card text='Begin to use static typing' />
        </ColumnContainer>
    )
}
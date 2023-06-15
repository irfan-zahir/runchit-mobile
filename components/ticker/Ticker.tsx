import { Div } from "react-native-magnus"


interface ITickerProps {
    pages: number,
    currentPage: number,
    size?: number
}

export const Ticker: React.FC<ITickerProps> = ({ pages, currentPage, size = 10 }) => {
    const selectedSize = size + 3
    return (
        <Div flexDir='row' justifyContent='center' alignItems='center'>
            {

                Array(pages).fill(0).map((_, i) => (
                    <Div
                        mx={4}
                        key={i}
                        h={currentPage === i ? selectedSize : size}
                        w={currentPage === i ? selectedSize : size}
                        bg={currentPage === i ? "indigo600" : "gray200"}
                        rounded="circle" />
                ))
            }
        </Div>
    )
}
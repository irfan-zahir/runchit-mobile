import * as React from "react"
import Svg, { Path, Rect } from "react-native-svg"

const QrIcon = () => (
    <Svg
        width={34}
        height={34}
        fill="none"
    >
        <Path
            d="M4 25v3a2 2 0 0 0 2 2h3M4 9V6a2 2 0 0 1 2-2h3M25 4h3a2 2 0 0 1 2 2v3M30 25v3a2 2 0 0 1-2 2h-3"
            stroke="#fff"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="M9 18h3v5.5a1.5 1.5 0 0 1-3 0V18ZM18 18h3v5.5a1.5 1.5 0 0 1-3 0V18ZM14 18h2v2a1 1 0 1 1-2 0v-2ZM23 18h2v2a1 1 0 1 1-2 0v-2ZM9 11.5a1.5 1.5 0 0 1 3 0V14H9v-2.5ZM18 11.5a1.5 1.5 0 0 1 3 0V14h-3v-2.5ZM14 11a1 1 0 1 1 2 0v3h-2v-3ZM23 11a1 1 0 1 1 2 0v3h-2v-3Z"
            fill="#fff"
        />
        <Rect x={5} y={14} width={24} height={2} rx={1} fill="#fff" />
    </Svg>
)

export default QrIcon

type IBaseColor<T> = `${T}100` | `${T}200` | `${T}300` | `${T}400` | `${T}500` | `${T}500` | `${T}600` | `${T}700` | `${T}800` | `${T}900`

type IBaseSystemColors = IBaseColor<"grey"> | IBaseColor<"red"> | IBaseColor<"orange"> | IBaseColor<"yellow">
    | IBaseColor<"green"> | IBaseColor<"teal"> | IBaseColor<"blue"> | IBaseColor<"indigo"> | IBaseColor<"purple"> | IBaseColor<"pink">


export type IBackgroundColors = IBaseSystemColors | "primary" | "secondary" | "tertiery" | "success" | "warning" | "danger" | "white" | "black" | "transparent"

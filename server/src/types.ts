export type UserDetails = {
    name: string;
    connId: string;
    connnectedOn: Date;
    disconnectedOn?: Date;
}

export type UserMessage = {
    id: string;
    name?: string;
    text: string;
    time: Date;
}

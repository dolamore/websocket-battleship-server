interface WsMessage {
    type: string;
    data: RegData;
    id: number;
}

interface RegData {
    name: string;
    password: string;
}
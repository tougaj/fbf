export interface IFriend {
    fbID: string;
    title: string;
    face: string;
    smID?: number;
    relationType?: number;
}
export declare class Fbf {
    static WITH_FACES_MAX_COUNT: number;
    static arFriends: IFriend[];
    static nSMID: number;
    static nRelationType: number;
    static setDataTypeValues(ASMID: number, ARelationType: number): number;
    changeRelationType(nNewRelationType: number): void;
    static defineDataType(sHTML: string): number;
    getFriends(fNeedDefineType?: boolean): void;
    fillFriendTable(sElementHTML: string): void;
    static drawUsers(): void;
    loadFriends(): boolean;
    onChangeRelationType(): void;
}
export declare let fbf: Fbf;

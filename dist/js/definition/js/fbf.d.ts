/// <reference path="d.ts/jquery.d.ts" />
/// <reference path="d.ts/lodash.d.ts" />
export interface IFriend {
    fbID: string;
    title: string;
    face: string;
    smID?: number;
    relationType?: number;
}
export interface ISocialMedia {
    site: string;
    idPrefix: string;
}
export declare class Fbf {
    static WITH_FACES_MAX_COUNT: number;
    static arFriends: IFriend[];
    static arSM: {
        [i: number]: ISocialMedia;
    };
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

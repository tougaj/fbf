/// <reference path="d.ts/jquery.d.ts" />
/// <reference path="d.ts/lodash.d.ts" />
interface IFriend {
    fbID: string;
    title: string;
    face: string;
    smID?: number;
    relationType?: number;
}
interface ISocialMedia {
    site: string;
    idPrefix: string;
}
declare class Fbf {
    static WITH_FACES_MAX_COUNT: number;
    static arFriends: IFriend[];
    static arSM: {
        [i: number]: ISocialMedia;
    };
    static nSMID: number;
    static nRelationType: number;
    static setDataTypeValues(ASMID: number, ARelationType: number): number;
    static defineDataType(sHTML: string): number;
    getFriends(): void;
    static drawUsers(): void;
    loadFriends(): boolean;
}
declare let fbf: Fbf;

/// <reference types="react" />
import { IFriend } from '../fbf';
interface IFriendListProps {
    friends: IFriend[];
    SMID: number;
    relationType: number;
}
export declare const FriendList: ({ friends, SMID, relationType }: IFriendListProps) => JSX.Element;
export {};

/// <reference types="react" />
import { IFriend } from '../fbf';
export interface IFriendListProps {
    friends: IFriend[];
    SMID: number;
    relationType: number;
}
export declare const FriendList: (props: IFriendListProps) => JSX.Element;

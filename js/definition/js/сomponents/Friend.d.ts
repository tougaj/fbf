/// <reference types="react" />
import { IFriend } from '../fbf';
export interface IFriendProps {
    friend: IFriend;
    SMID: number;
    icon: string;
    link: string;
}
export declare const Friend: (props: IFriendProps) => JSX.Element;

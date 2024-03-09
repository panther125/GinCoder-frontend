/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ReplyResp } from './ReplyResp';

export type CommentResp = {
    commentContent?: string;
    createTime?: string;
    fromNickname?: string;
    fromUid?: number;
    id?: number;
    replyCount?: number;
    replyVOList?: Array<ReplyResp>;
    userAvatar?: string;
};

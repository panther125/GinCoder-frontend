/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CheckReq } from '../models/CheckReq';
import type { CommentReq } from '../models/CommentReq';
import type { Result_List_RecentCommentResp_ } from '../models/Result_List_RecentCommentResp_';
import type { Result_List_ReplyResp_ } from '../models/Result_List_ReplyResp_';
import type { Result_object_ } from '../models/Result_object_';
import type { Result_PageResult_CommentBackResp_ } from '../models/Result_PageResult_CommentBackResp_';
import type { Result_PageResult_CommentResp_ } from '../models/Result_PageResult_CommentResp_';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class CommentControllerService {

    /**
     * deleteComment
     * @param commentIdList commentIdList
     * @returns Result_object_ OK
     * @throws ApiError
     */
    public static deleteCommentUsingDelete(
commentIdList: Array<number>,
): CancelablePromise<Result_object_> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/admin/comment/delete',
            body: commentIdList,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * listCommentBackVO
     * @param current 
     * @param isCheck 
     * @param keyword 
     * @param pageSize 
     * @param questionId 
     * @param size 
     * @param sortField 
     * @param sortOrder 
     * @returns Result_PageResult_CommentBackResp_ OK
     * @throws ApiError
     */
    public static listCommentBackVoUsingGet(
current?: number,
isCheck?: number,
keyword?: string,
pageSize?: number,
questionId?: number,
size?: number,
sortField?: string,
sortOrder?: string,
): CancelablePromise<Result_PageResult_CommentBackResp_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/admin/comment/list',
            query: {
                'current': current,
                'isCheck': isCheck,
                'keyword': keyword,
                'pageSize': pageSize,
                'questionId': questionId,
                'size': size,
                'sortField': sortField,
                'sortOrder': sortOrder,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * updateCommentCheck
     * @param check check
     * @returns Result_object_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateCommentCheckUsingPut(
check: CheckReq,
): CancelablePromise<Result_object_ | any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/admin/comment/pass',
            body: check,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * addComment
     * @param comment comment
     * @returns Result_object_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static addCommentUsingPost(
comment: CommentReq,
): CancelablePromise<Result_object_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/comment/add',
            body: comment,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * listCommentVO
     * @param current 
     * @param isCheck 
     * @param keyword 
     * @param pageSize 
     * @param questionId 
     * @param size 
     * @param sortField 
     * @param sortOrder 
     * @returns Result_PageResult_CommentResp_ OK
     * @throws ApiError
     */
    public static listCommentVoUsingGet(
current?: number,
isCheck?: number,
keyword?: string,
pageSize?: number,
questionId?: number,
size?: number,
sortField?: string,
sortOrder?: string,
): CancelablePromise<Result_PageResult_CommentResp_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/comment/list',
            query: {
                'current': current,
                'isCheck': isCheck,
                'keyword': keyword,
                'pageSize': pageSize,
                'questionId': questionId,
                'size': size,
                'sortField': sortField,
                'sortOrder': sortOrder,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * listReply
     * @param commentId commentId
     * @param current current
     * @param size size
     * @returns Result_List_ReplyResp_ OK
     * @throws ApiError
     */
    public static listReplyUsingGet(
commentId: number,
current?: number,
size?: number,
): CancelablePromise<Result_List_ReplyResp_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/comment/{commentId}/reply',
            path: {
                'commentId': commentId,
            },
            query: {
                'current': current,
                'size': size,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * listRecentCommentVO
     * @returns Result_List_RecentCommentResp_ OK
     * @throws ApiError
     */
    public static listRecentCommentVoUsingGet(): CancelablePromise<Result_List_RecentCommentResp_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/recent/comment',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}

/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_LoginUserVO_ } from '../models/BaseResponse_LoginUserVO_';
import type { CodeReq } from '../models/CodeReq';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class LoginControllerService {

    /**
     * giteeLogin
     * @param data data
     * @returns BaseResponse_LoginUserVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static giteeLoginUsingPost(
data: CodeReq,
): CancelablePromise<BaseResponse_LoginUserVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/oauth/gitee',
            body: data,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * githubLogin
     * @param data data
     * @returns BaseResponse_LoginUserVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static githubLoginUsingPost(
data: CodeReq,
): CancelablePromise<BaseResponse_LoginUserVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/oauth/github',
            body: data,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * qqLogin
     * @param data data
     * @returns BaseResponse_LoginUserVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static qqLoginUsingPost(
data: CodeReq,
): CancelablePromise<BaseResponse_LoginUserVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/oauth/qq',
            body: data,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}

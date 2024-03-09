/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_string_ } from '../models/BaseResponse_string_';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class FileControllerService {

    /**
     * uploadFile
     * @returns any OK
     * @throws ApiError
     */
    public static uploadFileUsingGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/file/rankTable',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * uploadFile
     * @param file 
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static uploadFileUsingPost(
file?: Blob,
): CancelablePromise<string | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/file/upload',
            formData: {
                'file': file,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * uploadFileExip
     * @param biz 
     * @param file 
     * @returns BaseResponse_string_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static uploadFileExipUsingPost(
biz?: string,
file?: Blob,
): CancelablePromise<BaseResponse_string_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/file/upload2',
            query: {
                'biz': biz,
            },
            formData: {
                'file': file,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}

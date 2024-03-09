/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ModelAndView } from '../models/ModelAndView';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class BasicErrorControllerService {

    /**
     * errorHtml
     * @returns ModelAndView OK
     * @throws ApiError
     */
    public static errorHtmlUsingGet(): CancelablePromise<ModelAndView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/error',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * errorHtml
     * @returns ModelAndView OK
     * @throws ApiError
     */
    public static errorHtmlUsingHead(): CancelablePromise<ModelAndView> {
        return __request(OpenAPI, {
            method: 'HEAD',
            url: '/api/error',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * errorHtml
     * @returns ModelAndView OK
     * @returns any Created
     * @throws ApiError
     */
    public static errorHtmlUsingPost(): CancelablePromise<ModelAndView | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/error',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * errorHtml
     * @returns ModelAndView OK
     * @returns any Created
     * @throws ApiError
     */
    public static errorHtmlUsingPut(): CancelablePromise<ModelAndView | any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/error',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * errorHtml
     * @returns ModelAndView OK
     * @throws ApiError
     */
    public static errorHtmlUsingDelete(): CancelablePromise<ModelAndView> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/error',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * errorHtml
     * @returns ModelAndView OK
     * @throws ApiError
     */
    public static errorHtmlUsingOptions(): CancelablePromise<ModelAndView> {
        return __request(OpenAPI, {
            method: 'OPTIONS',
            url: '/api/error',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * errorHtml
     * @returns ModelAndView OK
     * @throws ApiError
     */
    public static errorHtmlUsingPatch(): CancelablePromise<ModelAndView> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/error',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

}

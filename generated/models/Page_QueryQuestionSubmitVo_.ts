/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { OrderItem } from './OrderItem';
import type { QueryQuestionSubmitVo } from './QueryQuestionSubmitVo';

export type Page_QueryQuestionSubmitVo_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: Array<OrderItem>;
    pages?: number;
    records?: Array<QueryQuestionSubmitVo>;
    searchCount?: boolean;
    size?: number;
    total?: number;
};

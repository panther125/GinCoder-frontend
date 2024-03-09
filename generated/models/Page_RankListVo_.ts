/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { OrderItem } from './OrderItem';
import type { RankListVo } from './RankListVo';

export type Page_RankListVo_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: Array<OrderItem>;
    pages?: number;
    records?: Array<RankListVo>;
    searchCount?: boolean;
    size?: number;
    total?: number;
};

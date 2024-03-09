/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { JudgeConfig } from './JudgeConfig';
import type { UserVO } from './UserVO';

export type QuestionVO = {
    acceptedNum?: number;
    answer?: string;
    content?: string;
    createTime?: string;
    favourNum?: number;
    id?: number;
    judgeConfig?: JudgeConfig;
    passRate?: string;
    statue?: number;
    submitNum?: number;
    tags?: Array<string>;
    template?: string;
    thumbNum?: number;
    title?: string;
    updateTime?: string;
    userId?: number;
    userVO?: UserVO;
};

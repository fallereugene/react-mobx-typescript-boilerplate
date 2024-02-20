/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export type TasksResponse = Task[];

export interface TaskCreate {
    /**
     * Название задачи
     * @example "laboriosam mollitia et enim quasi adipisci quia provident illum"
     */
    title: string;
}

export interface Task {
    /**
     * Идентификатор задачи
     * @example "634dcdd51d809e708e660053"
     */
    id: string;
    /**
     * Название задачи
     * @example "laboriosam mollitia et enim quasi adipisci quia provident illum"
     */
    title: string;
    /**
     * Признак завершенности задачи.
     * @example false
     */
    completed: boolean;
}

/** Модель ответа на основе RFC 7807 */
export interface ErrorResponseModel {
    /**
     * HTTP-код сгенерированный исходным сервером для конкретно этого типа проблемы.
     * @format int32
     * @min 100
     * @max 600
     * @example 503
     */
    status?: number;
    /**
     * Человекочитаемое объяснение, характерное для конкретно этого случая.
     * @example "Таймут подключения к базе данных"
     */
    message?: string;
    /**
     * Короткое описание проблемы на английском языке для чтения инженерами (обычно не локализированное).
     * @example "Service Unavailable"
     */
    details?: string;
}

import { AlertProps } from '@components/alert';

export type Notification = {
    /**
     * Идентификатор (uuidv4)
     * Может использоваться для внутренних нужд
     */
    id: string;
    /**
     * основной текст, отображаемый в попапе или всплывашке
     */
    text: string;
    /**
     * тип нотификации, например, попап
     */
    type: 'toast' | 'popup';
    /**
     * стиль отображаемого элемента (для всплывашек)
     */
    severity?: AlertProps['severity'];
    /**
     * заголовок
     */
    header?: string;
    /**
     * возможные действия
     */
    action?: AlertProps['action'];
};

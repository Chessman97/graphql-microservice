import EventEmitter from 'events';

export interface ITraceService {
  /**
   * @summary Выдает TraceId для текущего scope запроса пользователя
   * @returns {string}
   */
  getTraceId(): string;

  /**
   * @summary Вешает отслеживание окончания запроса пользователя. Используется обычно для req, res
   * @param {EventEmitter} obj
   * @returns {void}
   */
  bindEmitter(obj: EventEmitter): void;

  /**
   * @summary Вешает отслеживание окончания запроса пользователя. Используется обычно для ctx: Context
   * @param {Function} callback
   * @param {any} context
   * @returns {void}
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  bind(callback: Function, context: any): void;

  /**
   * @summary Устанавливает новый TraceId для scope запроса пользователя
   * @returns {void}
   */
  setTraceId(): void;

  /**
   * @summary Запускает процесс следежия для scope запроса пользователя
   * @param func
   * @returns {void}
   */
  run(func): void;
}

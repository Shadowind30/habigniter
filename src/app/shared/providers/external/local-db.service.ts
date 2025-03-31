/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { IActivityItem } from '@models';
import { DBKeysEnum } from '@shared/enums/db-keys.enum';
import { ConsoleService } from '../utilities/console.service';

type Values = IActivityItem[] | number;

@Injectable({
  providedIn: 'root'
})
export class LocalDBService {
  private _activities: IActivityItem[] = [];
  private _savedDay: number;
  private readonly DB = 'habigniter_DB/';
  private storage = localStorage;

  constructor(private consoleService: ConsoleService) {}

  public getActivities(): IActivityItem[] {
    return this._activities;
  }

  public get SavedDay(): number {
    return this._savedDay;
  }

  private set updateActivities(data: IActivityItem[]) {
    this._activities = data;
  }

  private set updateSavedDay(data: number) {
    this._savedDay = data;
  }

  public async init(): Promise<void> {
    try {
      await this.initFromDB();
      this.consoleService.log('[LOCAL] init');
    } catch (error) {
      this.consoleService.error('[LOCAL] Error durng initialization', error);
    }
  }

  /**
   * @param tokenKey
   * @description Actualizar un key determinado en el local storage
   * @example
   * // Mas informacion sobre Posibles valores en el enum TokenKeysEnum en la carpeta de enums
   */
  public async saveData(tokenKey: DBKeysEnum, data: Values): Promise<void> {
    const willUpdate = data !== null;
    const key = this.DB + tokenKey;

    if (willUpdate) {
      this.storage.setItem(key, JSON.stringify(data));
    } else {
      this.storage.removeItem(key);
    }

    switch (tokenKey) {
      case DBKeysEnum.ACTIVITIES:
        this.updateActivities = data as IActivityItem[];
        break;
      case DBKeysEnum.SAVED_DAY:
        this.updateSavedDay = data as number;
        break;
      default:
        this.consoleService.error(`
        [LOCAL]
        RAZON: El tokenKey -> ${tokenKey}' <- no existe, revise el enum TokenKeys para ver posibles valores
        y agregue el tokenKey de ser necesario.
        PARAMETROS: ${JSON.stringify(arguments)}
        `);
        break;
    }

    if (!willUpdate) {
      this.consoleService.log(`[LOCAL-DB] TokenKey ${tokenKey} eliminado`);
    }
  }

  // public async clearAll(): Promise<void> {
  //   await this.storage.clear();
  // }

  private async initFromDB(): Promise<void> {
    const DB = this.DB;
    const ACTIVITIES: string = this.storage.getItem(DB + DBKeysEnum.ACTIVITIES) || null;
    const SAVED_DAY: string = this.storage.getItem(DB + DBKeysEnum.SAVED_DAY) || null;

    if (!!ACTIVITIES) {
      this.updateActivities = JSON.parse(ACTIVITIES) as IActivityItem[];
    } else {
      this.consoleService.warn('[LOCAL] No hay habitos guardadas');
    }

    if (!!SAVED_DAY) {
      this.updateSavedDay = JSON.parse(SAVED_DAY) as number;
    } else {
      this.consoleService.warn('[LOCAL] No hay dia guardado');
    }
  }
}
export { DBKeysEnum };

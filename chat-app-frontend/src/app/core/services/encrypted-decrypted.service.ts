import { Injectable } from '@angular/core';
import { AppConstants } from '@app/core/constants/app.constant';
import * as CryptoJS from 'crypto-js';
import { LocalStorageService } from './local-storage.service';

@Injectable({
	providedIn: 'root'
})

export class EncryptDecryptService {

	secretKey = AppConstants.secretKey;
	sessionInitial = AppConstants.sessionInitial;

	/**
	 *Creates an instance of EncryptDecryptService.
	 */
	constructor(
		private localStorageService: LocalStorageService,
	) { }

	/**
	 * Encrypts the data in Crypto AES format for security purpose
	 * @returns Encrypted string
	* @param {*} data
	 */
	encryptData(data: any): string {
		return CryptoJS.AES.encrypt(JSON.stringify(data), this.secretKey.trim()).toString();
	}

	/**
	 * Decrypts the data from Crypto AES format to human understandable parsed format in
	 * @returns Decrypted parsed data
	 * @param {*} data
	 */
	decryptData(data: any): any {
		try {
			const encrypted = CryptoJS.AES.decrypt(data, this.secretKey.trim()).toString(CryptoJS.enc.Utf8);
			return JSON.parse(encrypted);
		} catch (e) {
			return null;
		}
	}

	/**
	 * Sets encrypted secured localStorage data
	 * @param key LocalStorage Key
	 * @param data Data to be stored
	 */
	setEncryptedLocalStorage(key: string, data: any): void {
		const encryptedString = this.encryptData(data);
		const keyName = this.sessionInitial + '-' + key.trim();
		this.localStorageService.set(keyName, encryptedString);
	}

	/**
	 * Gets secured localStorage data after decryption
	 * @param key LocalStorage Key
	 * @returns Parsed localStorage data
	 */
	getDecryptedLocalStorage(key: string): any {
		const keyName = this.sessionInitial + '-' + key.trim();
		const localStorageData = this.localStorageService.get(keyName);
		if (localStorageData) {
			return this.decryptData(localStorageData);
		}
	}

	/**
	 * Removes encrypted localStorage data
	 * @param key LocalStorage Key
	 */
	removeEncryptedLocalStorage(key: string): void {
		const keyName = this.sessionInitial + '-' + key.trim();
		this.localStorageService.remove(keyName);
	}
}

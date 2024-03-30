import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_ROUTES, AppConstants } from "@app/core/constants/app.constant";
import { BehaviorSubject, Observable, map } from "rxjs";
import { UserDetailsModel } from "@app/core/interface/user.interface";
import { environment } from "src/environments/environment";
import { EncryptDecryptService } from "./encrypted-decrypted.service";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public userSubject: BehaviorSubject<UserDetailsModel | any> = new BehaviorSubject<UserDetailsModel | any>(null);

    constructor(private http: HttpClient,
        private encryptDecryptStorage: EncryptDecryptService) { }

    loginUser(userName: string): Observable<UserDetailsModel> {
        return this.http.post<UserDetailsModel>(API_ROUTES.loginUserApi, { name: userName });
    }

    logoutUser(): void {
        this.encryptDecryptStorage.removeEncryptedLocalStorage(AppConstants.userInfo);
    }
}
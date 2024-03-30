import { Injectable } from '@angular/core';
import {
    MatSnackBar,
    MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition
} from '@angular/material/snack-bar';
import { TOAST_TIMER_DURATION } from '@app/core/constants/app.constant';


@Injectable({
    providedIn: 'root',
})
export class ToasterService {

    horizontalPosition: MatSnackBarHorizontalPosition = 'right';
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    duration = TOAST_TIMER_DURATION;

    constructor(
        private matToaster: MatSnackBar,
    ) {
    }

    /**
     * Common snackbar to display toastr messages
     * @param message Message to display
     * @param type Type of toastr
     */
    displaySnackBar(
        message: string,
        type?: 'info' | 'error' | 'warning' | 'success',
    ): void {
        message && this.matToaster.open(message, 'X', {
            duration: this.duration,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            panelClass: [type + '-alert']
        });
    }

    notifySnackbarMsg(
        mainObject: string,
        message: string,
        type: 'info' | 'error' | 'warning' | 'success',
    ): void {
        let msg = message;
        this.displaySnackBar(msg, type);
    }

    success(message: string): void {
        this.matToaster.open(message, 'X', {
            horizontalPosition: 'right',
            verticalPosition: 'top',
            duration: this.duration,
            panelClass: ['success-alert']
        });
    }

    error(message: string): void {
        this.matToaster.open(message, 'X', {
            horizontalPosition: 'right',
            verticalPosition: 'top',
            duration: this.duration,
            panelClass: ['error-alert']
        });
    }
}

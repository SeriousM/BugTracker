import { Component, OnDestroy, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from "angular2/core";
import { Router } from "angular2/router";
import { AppStore } from "../../../store/appStore";

import { CurrentUserStoreActions } from "../../currentUser/store/currentUserStoreActions";
import { AuthService } from "../../../services/authService"

@Component({
    selector: "user-avatar",
    changeDetection: ChangeDetectionStrategy.Detached,
    template: `
        <div>
            <p>Welcome {{appStore.getState().currentUser.user.name}}! <Button (click)="logout()">Logout</Button></p>
        </div>
    `
})

export class UserAvatar implements OnInit, OnDestroy {
    private appStoreUnsubscribe: Function;
    constructor(private appStore: AppStore, private changeDetectorRef: ChangeDetectorRef, private router: Router, private authService: AuthService) {
    }
    onAppStoreUpdate() {
        this.changeDetectorRef.markForCheck();
    }
    ngOnInit() {
        this.appStoreUnsubscribe = this.appStore.subscribe(this.onAppStoreUpdate.bind(this));
        this.onAppStoreUpdate();
    }
    ngOnDestroy() {
        this.appStoreUnsubscribe();
    }
    logout() {
        this.authService.removeUserFromLocalStorage();
        this.appStore.dispatch(CurrentUserStoreActions.RemoveCurrentUser());
        this.router.navigate(['Login']);
    }
}
import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from "angular2/core";
import { ROUTER_DIRECTIVES } from "angular2/router";
import { AppStore } from "../../../store/appStore";
import { CurrentUserState } from "../../../models/models";
import { UserAvatar } from "../../currentUser/view/userAvatarComponent";

@Component({
    selector: "app-header",
    changeDetection: ChangeDetectionStrategy.Detached,
    directives: [UserAvatar, ROUTER_DIRECTIVES],
    template: `
        <div>
            <user-avatar *ngIf="currentUser.user != null"></user-avatar>
            <hr>
            <nav>
                <a [routerLink]="['Login']" *ngIf="currentUser.user == null">Login</a>
                <a [routerLink]="['Issues']" *ngIf="currentUser.user != null">Issues</a>
            </nav>
            <hr>
        </div>
    `
})

export class AppHeaderComponent implements OnInit, OnDestroy {
    private appStoreUnsubscribe: Function;
    public currentUser: CurrentUserState;
    constructor(private appStore: AppStore, private changeDetectorRef: ChangeDetectorRef) {
    }
    onAppStoreUpdate() {
        this.appStoreUpdate();
        this.changeDetectorRef.markForCheck();
    }
    ngOnInit() {
        this.appStoreUnsubscribe = this.appStore.subscribe(this.onAppStoreUpdate.bind(this));
        this.onAppStoreUpdate();
    }
    ngOnDestroy() {
        this.appStoreUnsubscribe();
    }
    private appStoreUpdate() {
        this.currentUser = this.appStore.getState().currentUser;
    }
}
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SharedService } from '@service';

@Injectable()
export class VendorGuard implements CanActivate {

    constructor(private router: Router, private sharedService: SharedService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.sharedService.user && this.sharedService.user.role?.level === 2 && this.sharedService.user.shop) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['../']);
        return false;
    }
}

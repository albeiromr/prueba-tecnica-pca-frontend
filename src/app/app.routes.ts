import { Routes } from '@angular/router';
import { CreateFlightComponent } from './components/create-flight/create-flight.component';
import { MakeReservationComponent } from './components/make-reservation/make-reservation.component';
import { StatisticsComponent } from './components/statistics/statistics.component';

export const routes: Routes = [
    {
        path: "",
        pathMatch: "full",
        redirectTo: "create-flight"
    },
    {
        path: "create-flight",
        pathMatch: "full",
        component: CreateFlightComponent
    },
    {
        path: "make-reservation",
        pathMatch: "full",
        component: MakeReservationComponent
    },
    {
        path: "statistics",
        pathMatch: "full",
        component: StatisticsComponent
    }
];

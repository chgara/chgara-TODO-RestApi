import { Router, IRouter, NextFunction } from 'express';

//Creating class that will manage routes
class IndexRoutes {
    private route: string;
    private router: IRouter;

    constructor(route: string) {
        this.route = route;
        this.router = Router();
        this.routes();
    }

    //A function where we manage the routes
    private routes(): void {
        this.router.route(`/`).get((req, res, nex) => {
            res.send(
                'This is the chgara TODO-List Rest-Api, go to https://github.com/chgara to know more',
            );
        });
    }

    //Making a function to export the router of the class
    public getRouter(): IRouter {
        return this.router;
    }
}
const indexRoutes: IndexRoutes = new IndexRoutes('api/');
export default indexRoutes.getRouter();

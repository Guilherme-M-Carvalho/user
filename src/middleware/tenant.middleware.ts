import { Injectable, InternalServerErrorException, NestMiddleware } from "@nestjs/common";
import { TenantProvider } from "../tenant/tenant.provider";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class TenantMiddleware implements NestMiddleware {

    constructor(
        private readonly tenantProvider: TenantProvider
    ){}

    async use(req: Request, res: Response, next: NextFunction) {
        const tenantId = req.headers['x-tenant-id'];

        if(!tenantId){
            throw new InternalServerErrorException("Tenant não identificado")
        }

        await this.tenantProvider.connect(tenantId as string);

        next()
    }

}
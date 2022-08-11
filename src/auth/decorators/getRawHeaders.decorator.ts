import { createParamDecorator, ExecutionContext, InternalServerErrorException } from "@nestjs/common";


export const GetRawHeaders = createParamDecorator(
    ( data:string,ctx:ExecutionContext ) => {

         const request = ctx.switchToHttp().getRequest();
         const rawHeaders = request.rawHeaders;
         if(!rawHeaders)
         throw new InternalServerErrorException('User not found-(request)');

        return rawHeaders;

    }
);

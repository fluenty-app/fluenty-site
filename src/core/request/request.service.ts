import { Injectable } from "@nestjs/common";
import { getIp } from "./ip.decorator";
import { ClsService } from "nestjs-cls";
import { Request } from "express";
import { User } from '../../components/users/schemas/user.schema';

@Injectable()
export class RequestService {
  constructor(
    private readonly cls: ClsService,
  ) {
    //
  }

  request() {
    return this.cls.get<Request>('request');
  }

  ip() {
    return getIp(this.request());
  }

  user() {
    return <User>this.request().user;
  }

  header(name, defaultValue = null) {
    return this.request().header(name) || defaultValue;
  }
}


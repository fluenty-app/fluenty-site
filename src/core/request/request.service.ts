import { Injectable } from "@nestjs/common";
import { getIp } from "./ip.decorator";
import { User } from "../../components/users/entities/user.entity";
import { ClsService } from "nestjs-cls";
import { Request } from "express";

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


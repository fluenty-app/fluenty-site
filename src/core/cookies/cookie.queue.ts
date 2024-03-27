import { Injectable, Scope } from "@nestjs/common";

@Injectable({
  scope: Scope.REQUEST,
  durable: true,
})

export class CookieQueue {
  protected items = [];

  constructor() {
    this.items = []
  }

  push(name, content, expires?, domain?, path?, httpOnly?, sameSite?, secure?) {
    this.items.push({
      name,
      content,
      expires,
      domain,
      path,
      httpOnly,
      sameSite,
      secure,
    });
  }

  get() {
    return this.items;
  }
}

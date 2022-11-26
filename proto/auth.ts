/* eslint-disable */
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "auth";

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface RegisterResponse {
  status: number;
  error: string[];
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: number;
  error: string[];
  token: string;
}

export interface ValidateRequest {
  token: string;
}

export interface ValidateResponse {
  status: number;
  error: string[];
  userId: number;
}

function createBaseRegisterRequest(): RegisterRequest {
  return { email: "", password: "" };
}

export const RegisterRequest = {
  encode(message: RegisterRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.email !== "") {
      writer.uint32(10).string(message.email);
    }
    if (message.password !== "") {
      writer.uint32(18).string(message.password);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RegisterRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRegisterRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.email = reader.string();
          break;
        case 2:
          message.password = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RegisterRequest {
    return {
      email: isSet(object.email) ? String(object.email) : "",
      password: isSet(object.password) ? String(object.password) : "",
    };
  },

  toJSON(message: RegisterRequest): unknown {
    const obj: any = {};
    message.email !== undefined && (obj.email = message.email);
    message.password !== undefined && (obj.password = message.password);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RegisterRequest>, I>>(object: I): RegisterRequest {
    const message = createBaseRegisterRequest();
    message.email = object.email ?? "";
    message.password = object.password ?? "";
    return message;
  },
};

function createBaseRegisterResponse(): RegisterResponse {
  return { status: 0, error: [] };
}

export const RegisterResponse = {
  encode(message: RegisterResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.status !== 0) {
      writer.uint32(8).int32(message.status);
    }
    for (const v of message.error) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RegisterResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRegisterResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.status = reader.int32();
          break;
        case 2:
          message.error.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RegisterResponse {
    return {
      status: isSet(object.status) ? Number(object.status) : 0,
      error: Array.isArray(object?.error) ? object.error.map((e: any) => String(e)) : [],
    };
  },

  toJSON(message: RegisterResponse): unknown {
    const obj: any = {};
    message.status !== undefined && (obj.status = Math.round(message.status));
    if (message.error) {
      obj.error = message.error.map((e) => e);
    } else {
      obj.error = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RegisterResponse>, I>>(object: I): RegisterResponse {
    const message = createBaseRegisterResponse();
    message.status = object.status ?? 0;
    message.error = object.error?.map((e) => e) || [];
    return message;
  },
};

function createBaseLoginRequest(): LoginRequest {
  return { email: "", password: "" };
}

export const LoginRequest = {
  encode(message: LoginRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.email !== "") {
      writer.uint32(10).string(message.email);
    }
    if (message.password !== "") {
      writer.uint32(18).string(message.password);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LoginRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLoginRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.email = reader.string();
          break;
        case 2:
          message.password = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): LoginRequest {
    return {
      email: isSet(object.email) ? String(object.email) : "",
      password: isSet(object.password) ? String(object.password) : "",
    };
  },

  toJSON(message: LoginRequest): unknown {
    const obj: any = {};
    message.email !== undefined && (obj.email = message.email);
    message.password !== undefined && (obj.password = message.password);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<LoginRequest>, I>>(object: I): LoginRequest {
    const message = createBaseLoginRequest();
    message.email = object.email ?? "";
    message.password = object.password ?? "";
    return message;
  },
};

function createBaseLoginResponse(): LoginResponse {
  return { status: 0, error: [], token: "" };
}

export const LoginResponse = {
  encode(message: LoginResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.status !== 0) {
      writer.uint32(8).int32(message.status);
    }
    for (const v of message.error) {
      writer.uint32(18).string(v!);
    }
    if (message.token !== "") {
      writer.uint32(26).string(message.token);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LoginResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLoginResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.status = reader.int32();
          break;
        case 2:
          message.error.push(reader.string());
          break;
        case 3:
          message.token = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): LoginResponse {
    return {
      status: isSet(object.status) ? Number(object.status) : 0,
      error: Array.isArray(object?.error) ? object.error.map((e: any) => String(e)) : [],
      token: isSet(object.token) ? String(object.token) : "",
    };
  },

  toJSON(message: LoginResponse): unknown {
    const obj: any = {};
    message.status !== undefined && (obj.status = Math.round(message.status));
    if (message.error) {
      obj.error = message.error.map((e) => e);
    } else {
      obj.error = [];
    }
    message.token !== undefined && (obj.token = message.token);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<LoginResponse>, I>>(object: I): LoginResponse {
    const message = createBaseLoginResponse();
    message.status = object.status ?? 0;
    message.error = object.error?.map((e) => e) || [];
    message.token = object.token ?? "";
    return message;
  },
};

function createBaseValidateRequest(): ValidateRequest {
  return { token: "" };
}

export const ValidateRequest = {
  encode(message: ValidateRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.token !== "") {
      writer.uint32(10).string(message.token);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ValidateRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValidateRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.token = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ValidateRequest {
    return { token: isSet(object.token) ? String(object.token) : "" };
  },

  toJSON(message: ValidateRequest): unknown {
    const obj: any = {};
    message.token !== undefined && (obj.token = message.token);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ValidateRequest>, I>>(object: I): ValidateRequest {
    const message = createBaseValidateRequest();
    message.token = object.token ?? "";
    return message;
  },
};

function createBaseValidateResponse(): ValidateResponse {
  return { status: 0, error: [], userId: 0 };
}

export const ValidateResponse = {
  encode(message: ValidateResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.status !== 0) {
      writer.uint32(8).int32(message.status);
    }
    for (const v of message.error) {
      writer.uint32(18).string(v!);
    }
    if (message.userId !== 0) {
      writer.uint32(24).int32(message.userId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ValidateResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValidateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.status = reader.int32();
          break;
        case 2:
          message.error.push(reader.string());
          break;
        case 3:
          message.userId = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ValidateResponse {
    return {
      status: isSet(object.status) ? Number(object.status) : 0,
      error: Array.isArray(object?.error) ? object.error.map((e: any) => String(e)) : [],
      userId: isSet(object.userId) ? Number(object.userId) : 0,
    };
  },

  toJSON(message: ValidateResponse): unknown {
    const obj: any = {};
    message.status !== undefined && (obj.status = Math.round(message.status));
    if (message.error) {
      obj.error = message.error.map((e) => e);
    } else {
      obj.error = [];
    }
    message.userId !== undefined && (obj.userId = Math.round(message.userId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ValidateResponse>, I>>(object: I): ValidateResponse {
    const message = createBaseValidateResponse();
    message.status = object.status ?? 0;
    message.error = object.error?.map((e) => e) || [];
    message.userId = object.userId ?? 0;
    return message;
  },
};

export interface AuthService {
  Register(request: RegisterRequest): Promise<RegisterResponse>;
  Login(request: LoginRequest): Promise<LoginResponse>;
  Validate(request: ValidateRequest): Promise<ValidateResponse>;
}

export class AuthServiceClientImpl implements AuthService {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || "auth.AuthService";
    this.rpc = rpc;
    this.Register = this.Register.bind(this);
    this.Login = this.Login.bind(this);
    this.Validate = this.Validate.bind(this);
  }
  Register(request: RegisterRequest): Promise<RegisterResponse> {
    const data = RegisterRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Register", data);
    return promise.then((data) => RegisterResponse.decode(new _m0.Reader(data)));
  }

  Login(request: LoginRequest): Promise<LoginResponse> {
    const data = LoginRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Login", data);
    return promise.then((data) => LoginResponse.decode(new _m0.Reader(data)));
  }

  Validate(request: ValidateRequest): Promise<ValidateResponse> {
    const data = ValidateRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Validate", data);
    return promise.then((data) => ValidateResponse.decode(new _m0.Reader(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

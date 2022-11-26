/* eslint-disable */
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "todo";

export interface CreateTodoRequest {
  message: string;
  userId: number;
}

export interface CreateTodoResponse {
  status: number;
  error: string[];
  id: number;
  message: string;
}

function createBaseCreateTodoRequest(): CreateTodoRequest {
  return { message: "", userId: 0 };
}

export const CreateTodoRequest = {
  encode(message: CreateTodoRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.message !== "") {
      writer.uint32(10).string(message.message);
    }
    if (message.userId !== 0) {
      writer.uint32(16).int32(message.userId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateTodoRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateTodoRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.message = reader.string();
          break;
        case 2:
          message.userId = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateTodoRequest {
    return {
      message: isSet(object.message) ? String(object.message) : "",
      userId: isSet(object.userId) ? Number(object.userId) : 0,
    };
  },

  toJSON(message: CreateTodoRequest): unknown {
    const obj: any = {};
    message.message !== undefined && (obj.message = message.message);
    message.userId !== undefined && (obj.userId = Math.round(message.userId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CreateTodoRequest>, I>>(object: I): CreateTodoRequest {
    const message = createBaseCreateTodoRequest();
    message.message = object.message ?? "";
    message.userId = object.userId ?? 0;
    return message;
  },
};

function createBaseCreateTodoResponse(): CreateTodoResponse {
  return { status: 0, error: [], id: 0, message: "" };
}

export const CreateTodoResponse = {
  encode(message: CreateTodoResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.status !== 0) {
      writer.uint32(8).int32(message.status);
    }
    for (const v of message.error) {
      writer.uint32(18).string(v!);
    }
    if (message.id !== 0) {
      writer.uint32(24).int32(message.id);
    }
    if (message.message !== "") {
      writer.uint32(34).string(message.message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateTodoResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateTodoResponse();
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
          message.id = reader.int32();
          break;
        case 4:
          message.message = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateTodoResponse {
    return {
      status: isSet(object.status) ? Number(object.status) : 0,
      error: Array.isArray(object?.error) ? object.error.map((e: any) => String(e)) : [],
      id: isSet(object.id) ? Number(object.id) : 0,
      message: isSet(object.message) ? String(object.message) : "",
    };
  },

  toJSON(message: CreateTodoResponse): unknown {
    const obj: any = {};
    message.status !== undefined && (obj.status = Math.round(message.status));
    if (message.error) {
      obj.error = message.error.map((e) => e);
    } else {
      obj.error = [];
    }
    message.id !== undefined && (obj.id = Math.round(message.id));
    message.message !== undefined && (obj.message = message.message);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CreateTodoResponse>, I>>(object: I): CreateTodoResponse {
    const message = createBaseCreateTodoResponse();
    message.status = object.status ?? 0;
    message.error = object.error?.map((e) => e) || [];
    message.id = object.id ?? 0;
    message.message = object.message ?? "";
    return message;
  },
};

export interface TodoGrpcService {
  CreateTodo(request: CreateTodoRequest): Promise<CreateTodoResponse>;
}

export class TodoGrpcServiceClientImpl implements TodoGrpcService {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || "todo.TodoGrpcService";
    this.rpc = rpc;
    this.CreateTodo = this.CreateTodo.bind(this);
  }
  CreateTodo(request: CreateTodoRequest): Promise<CreateTodoResponse> {
    const data = CreateTodoRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "CreateTodo", data);
    return promise.then((data) => CreateTodoResponse.decode(new _m0.Reader(data)));
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

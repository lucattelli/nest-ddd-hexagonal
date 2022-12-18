import { v4 as generateUuidV4 } from 'uuid';

export enum MessageType {
  COMMAND = 'COMMAND',
  EVENT = 'EVENT',
}

export enum MessageStatus {
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS',
}

export interface MessageHeader {
  uuid: string;
  type: MessageType;
}

export interface Message<MessageBody> {
  header: MessageHeader;
  body: MessageBody;
}

export interface MessageError {
  errorCode: string;
  errorMessage: string;
  errorDetails: string;
}

export interface MessageResponse<MessageResponseBody, MessageErrorBody> {
  uuid: string;
  status: MessageStatus;
  body: MessageResponseBody | MessageErrorBody;
}

export abstract class BaseMessage<MessageBody> implements Message<MessageBody> {
  public readonly header: MessageHeader;
  public readonly body: MessageBody;

  public constructor(type: MessageType, uuid?: string) {
    this.header = { type: type, uuid: uuid ?? generateUuidV4() };
  }
}

export const CommandStatus = MessageStatus;

export type CommandError = MessageError;

export abstract class BaseCommand<
  CommandBody,
> extends BaseMessage<CommandBody> {
  public constructor(uuid?: string) {
    super(MessageType.COMMAND, uuid);
  }
}

export type CommandResponse<CommandResponseBody> = MessageResponse<
  CommandResponseBody,
  CommandError
>;

export const EventStatus = MessageStatus;

export type EventError = MessageError;

export abstract class BaseEvent<EventBody> extends BaseMessage<EventBody> {
  public constructor(uuid?: string) {
    super(MessageType.EVENT, uuid);
  }
}

export type EventResponse<EventResponseBody> = MessageResponse<
  EventResponseBody,
  EventError
>;

export interface BaseCommandHandler<BaseCommand, CommandResponseData> {
  execute(command: BaseCommand): Promise<CommandResponse<CommandResponseData>>;
}

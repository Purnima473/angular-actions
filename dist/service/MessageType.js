/**
 * Use to indicate the type for the [ServiceMessage].
 */
/**
 * Use to indicate the type for the [ServiceMessage].
 */
export var MessageType;
/**
 * Use to indicate the type for the [ServiceMessage].
 */
(function (MessageType) {
    /**
     * Use to indicate the message type is informational.
     */
    MessageType[MessageType["Information"] = 1] = "Information";
    /**
     * Use to indicate the message type is warning.
     */
    MessageType[MessageType["Warning"] = 2] = "Warning";
    /**
     * Use to indicate the message type is error.
     */
    MessageType[MessageType["Error"] = 3] = "Error";
})(MessageType || (MessageType = {}));
//# sourceMappingURL=MessageType.js.map
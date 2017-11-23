/**
 * Use this class to create a message for the current [ServiceContext].
 */
var /**
 * Use this class to create a message for the current [ServiceContext].
 */
ServiceMessage = (function () {
    function ServiceMessage(name, message, messageType, source, displayToUser) {
        this.Name = name;
        this.Message = message;
        if (messageType) {
            this.MessageType = messageType;
        }
        if (source) {
            this.Source = source;
        }
        this.DisplayToUser = displayToUser;
    }
    /**
     * Use this extension method to add the name of the message.
     * @param name: The name of the service message.
     */
    /**
         * Use this extension method to add the name of the message.
         * @param name: The name of the service message.
         */
    ServiceMessage.prototype.WithName = /**
         * Use this extension method to add the name of the message.
         * @param name: The name of the service message.
         */
    function (name) {
        this.Name = name;
        return this;
    };
    /**
     * Use this extension method to add the message text to the ServiceMessage item.
     * @param message: The display text of the service message.
     */
    /**
         * Use this extension method to add the message text to the ServiceMessage item.
         * @param message: The display text of the service message.
         */
    ServiceMessage.prototype.WithMessage = /**
         * Use this extension method to add the message text to the ServiceMessage item.
         * @param message: The display text of the service message.
         */
    function (message) {
        this.Message = message;
        return this;
    };
    /**
     * Use this extension method to set the [MessageType] of the ServiceMessage item.
     * @param messageType: Use to indicate the message type.
     */
    /**
         * Use this extension method to set the [MessageType] of the ServiceMessage item.
         * @param messageType: Use to indicate the message type.
         */
    ServiceMessage.prototype.WithMessageType = /**
         * Use this extension method to set the [MessageType] of the ServiceMessage item.
         * @param messageType: Use to indicate the message type.
         */
    function (messageType) {
        this.MessageType = messageType;
        return this;
    };
    /**
     * Use this extension method to set the [Source] of the ServiceMessage item.
     * @param source: Use to indicate the source of the message.
     */
    /**
         * Use this extension method to set the [Source] of the ServiceMessage item.
         * @param source: Use to indicate the source of the message.
         */
    ServiceMessage.prototype.WithSource = /**
         * Use this extension method to set the [Source] of the ServiceMessage item.
         * @param source: Use to indicate the source of the message.
         */
    function (source) {
        this.Source = source;
        return this;
    };
    /**
     * Use this extension method to set the [DisplayToUser] indicator of the ServiceMessage.
     * @param displayToUser: A boolean value to indicate if the message can be displayed to the user.
     */
    /**
         * Use this extension method to set the [DisplayToUser] indicator of the ServiceMessage.
         * @param displayToUser: A boolean value to indicate if the message can be displayed to the user.
         */
    ServiceMessage.prototype.WithDisplayToUser = /**
         * Use this extension method to set the [DisplayToUser] indicator of the ServiceMessage.
         * @param displayToUser: A boolean value to indicate if the message can be displayed to the user.
         */
    function (displayToUser) {
        this.DisplayToUser = displayToUser;
        return this;
    };
    /**
     * Use this method return a string representing the ServiceMessage.
     */
    /**
         * Use this method return a string representing the ServiceMessage.
         */
    ServiceMessage.prototype.toString = /**
         * Use this method return a string representing the ServiceMessage.
         */
    function () {
        return "Name: " + this.Name + "; Message: " + this.Message + "; MessageType: " + this.MessageType.toString() + "; Source: " + this.Source + "; DisplayToUser: " + this.DisplayToUser;
    };
    return ServiceMessage;
}());
/**
 * Use this class to create a message for the current [ServiceContext].
 */
export { ServiceMessage };
//# sourceMappingURL=ServiceMessage.js.map
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('angular-rules-engine')) :
	typeof define === 'function' && define.amd ? define(['exports', 'angular-rules-engine'], factory) :
	(factory((global.angularActions = {}),global['angular-rules-engine']));
}(this, (function (exports,angularRulesEngine) { 'use strict';

/**
 * Use to indicate the result of the action (i.e., Sucess, Fail, or Unknown).
 */
/**
 * Use to indicate the result of the action (i.e., Sucess, Fail, or Unknown).
 */

/**
 * Use to indicate the result of the action (i.e., Sucess, Fail, or Unknown).
 */
(function (ActionResult) {
    /**
     * Use to indicate that the action's result is success.
     */
    ActionResult[ActionResult["Success"] = 1] = "Success";
    /**
     * Use to indicate that the action's result is failure.
     */
    ActionResult[ActionResult["Fail"] = 2] = "Fail";
    /**
     * Use to indicate that the action's result is unknown.
     */
    ActionResult[ActionResult["Unknown"] = 3] = "Unknown";
})(exports.ActionResult || (exports.ActionResult = {}));

/**
 * This is the framework Action class that provides the pipeline of pre/post
 * execution methods. This class implements the [Template Method] pattern.
 *
 * The pre-execute functions that can be implemented are:
 *		1. start();
 *		2. audit();
 *		3. preValidateAction();
 *		4. evaluateRules();
 *		5. postValidateAction();
 *		6. preExecuteAction();
 *
 *If the status of action is good, the business logic will be executed using the:
 *		1. processAction();
 *
 * The post-execution functions that can be implemented are:
 *		1. postExecuteAction();
 *		2. validateActionResult();
 *		3. finish();
 */
var Action = (function () {
    function Action() {
        this.allowExecution = true;
        this._validationContext = new angularRulesEngine.ValidationContext();
        this.actionResult = exports.ActionResult.Unknown;
    }
    Object.defineProperty(Action.prototype, "validationContext", {
        get: function () {
            return this._validationContext;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Use this method to execute a concrete action. A concrete action must implement
     * the [processAction] and the [validateActionResult] functions to be a valid
     * action.
     */
    /**
         * Use this method to execute a concrete action. A concrete action must implement
         * the [processAction] and the [validateActionResult] functions to be a valid
         * action.
         */
    Action.prototype.execute = /**
         * Use this method to execute a concrete action. A concrete action must implement
         * the [processAction] and the [validateActionResult] functions to be a valid
         * action.
         */
    function () {
        console.log('Preparing to execute action.');
        this.processActionPipeline();
    };
    Action.prototype.processActionPipeline = function () {
        this.startAction();
        if (this.allowExecution) {
            this.processAction();
        }
        this.finishAction();
    };
    
    Action.prototype.startAction = function () {
        console.log('Starting action.');
        this.start();
        this.audit();
        this.preValidateAction();
        this.evaluateRules();
        this.postValidateAction();
        this.preExecuteAction();
    };
    Action.prototype.finishAction = function () {
        console.log('Finishing action.');
        this.postExecuteAction();
        this.validateActionResult();
        this.finish();
    };
    Action.prototype.processAction = function () {
        console.log('Processing action.');
        this.performAction();
    };
    /**
     * All action must implement this function. This is where your
     * [business logic] should be implemented. This function is called if
     * there are no validation rule exceptions.
     */
    /**
         * All action must implement this function. This is where your
         * [business logic] should be implemented. This function is called if
         * there are no validation rule exceptions.
         */
    Action.prototype.performAction = /**
         * All action must implement this function. This is where your
         * [business logic] should be implemented. This function is called if
         * there are no validation rule exceptions.
         */
    function () {
        throw new Error('Not implemented. Requires implementation in concrete action.');
    };
    /**
     * Override/Implement this function to perform an early operation in the action pipeline.
     * This function belongs to the pre-execute functions of the action pipeline.
     */
    /**
         * Override/Implement this function to perform an early operation in the action pipeline.
         * This function belongs to the pre-execute functions of the action pipeline.
         */
    Action.prototype.start = /**
         * Override/Implement this function to perform an early operation in the action pipeline.
         * This function belongs to the pre-execute functions of the action pipeline.
         */
    function () {
        console.log('Starting action.');
    };
    /**
     * Implement this function to perform any auditing features during the pre-exectuion of the
     * business logic.
     */
    /**
         * Implement this function to perform any auditing features during the pre-exectuion of the
         * business logic.
         */
    Action.prototype.audit = /**
         * Implement this function to perform any auditing features during the pre-exectuion of the
         * business logic.
         */
    function () {
        console.log('Auditing action.');
    };
    /**
     * Use this function to setup any validation rules before the validation happens. This
     * function is called before [evaluateRules].
     */
    /**
         * Use this function to setup any validation rules before the validation happens. This
         * function is called before [evaluateRules].
         */
    Action.prototype.preValidateAction = /**
         * Use this function to setup any validation rules before the validation happens. This
         * function is called before [evaluateRules].
         */
    function () {
        console.log('Pre-validating action.');
    };
    /**
     * Use this function to implement the execution of the validation and business rules. This
     * function is called after [preValidateAction].
     */
    /**
         * Use this function to implement the execution of the validation and business rules. This
         * function is called after [preValidateAction].
         */
    Action.prototype.evaluateRules = /**
         * Use this function to implement the execution of the validation and business rules. This
         * function is called after [preValidateAction].
         */
    function () {
        console.log('Evaluating action rules.');
        var context = this.validateAction();
        if (context.isValid) {
            this.allowExecution = true;
            this.validationContext.state = angularRulesEngine.ValidationContextState.Success;
        }
        else {
            this.allowExecution = false;
            this.validationContext.state = angularRulesEngine.ValidationContextState.Failure;
        }
    };
    /**
     * Use to determine or handle the results of the rule evalation. This
     * function is called after the [evaluateRules].
     */
    /**
         * Use to determine or handle the results of the rule evalation. This
         * function is called after the [evaluateRules].
         */
    Action.prototype.postValidateAction = /**
         * Use to determine or handle the results of the rule evalation. This
         * function is called after the [evaluateRules].
         */
    function () {
        console.log('Post-Validation of action.');
    };
    /**
     * Use this function to perform any setup before the action is executed.
     */
    /**
         * Use this function to perform any setup before the action is executed.
         */
    Action.prototype.preExecuteAction = /**
         * Use this function to perform any setup before the action is executed.
         */
    function () {
        console.log('Pre-execution of action.');
    };
    /**
     * Use this funciton to evaluate the action after the the business logic within
     * the [performAction] has executed.
     */
    /**
         * Use this funciton to evaluate the action after the the business logic within
         * the [performAction] has executed.
         */
    Action.prototype.postExecuteAction = /**
         * Use this funciton to evaluate the action after the the business logic within
         * the [performAction] has executed.
         */
    function () {
        console.log('Post-execution of action');
    };
    /**
     * This function requires implementation to determin the state and result of the action.
     * Use this opportunity to validate the results.
     */
    /**
         * This function requires implementation to determin the state and result of the action.
         * Use this opportunity to validate the results.
         */
    Action.prototype.validateActionResult = /**
         * This function requires implementation to determin the state and result of the action.
         * Use this opportunity to validate the results.
         */
    function () {
        throw new Error('Concrete actions required to implement this method.');
    };
    /**
     * Use this function to perform any cleanup, logging, or disposing of resources used
     * by the action. This is the last function called during the pipeline.
     */
    /**
         * Use this function to perform any cleanup, logging, or disposing of resources used
         * by the action. This is the last function called during the pipeline.
         */
    Action.prototype.finish = /**
         * Use this function to perform any cleanup, logging, or disposing of resources used
         * by the action. This is the last function called during the pipeline.
         */
    function () {
        console.log('Finish action.');
    };
    /**
     * Implement this function to perform validation of business rules and data.
     */
    /**
         * Implement this function to perform validation of business rules and data.
         */
    Action.prototype.validateAction = /**
         * Implement this function to perform validation of business rules and data.
         */
    function () {
        console.log('Validating the action.');
        return this.validationContext;
    };
    return Action;
}());

/**
 * Use to indicate the type for the [ServiceMessage].
 */
/**
 * Use to indicate the type for the [ServiceMessage].
 */

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
})(exports.MessageType || (exports.MessageType = {}));

/**
 * Use this class to manage the context of a single service call. This
 * class will contain a list of any service messages added during the processing
 * of a service request.
 */
var ServiceContext = (function () {
    function ServiceContext() {
        /**
             * A list of service messages added by the application during the processing of the
             * specified service request.
             */
        this.Messages = new Array();
        this.ErrorMessages = new Array();
    }
    /**
     * Use this method to add a new message to the [ServiceContext].
     */
    /**
         * Use this method to add a new message to the [ServiceContext].
         */
    ServiceContext.prototype.addMessage = /**
         * Use this method to add a new message to the [ServiceContext].
         */
    function (message) {
        this.Messages.push(message);
    };
    /**
     * Use to determine if the current [ServiceContext] contains any messages with type of [Error].
     */
    /**
         * Use to determine if the current [ServiceContext] contains any messages with type of [Error].
         */
    ServiceContext.prototype.hasErrors = /**
         * Use to determine if the current [ServiceContext] contains any messages with type of [Error].
         */
    function () {
        if (this.Messages && this.Messages.length > 0) {
            this.ErrorMessages = this.Messages.filter(function (f) { return f.MessageType === exports.MessageType.Error; });
            if (this.ErrorMessages.length > 0) {
                return true;
            }
        }
        return false;
    };
    /**
     * Use to determine if the current [ServiceContext] does not contain any errors.
     */
    /**
         * Use to determine if the current [ServiceContext] does not contain any errors.
         */
    ServiceContext.prototype.isGood = /**
         * Use to determine if the current [ServiceContext] does not contain any errors.
         */
    function () {
        if (this.Messages && this.Messages.length > 0) {
            this.ErrorMessages = this.Messages.filter(function (f) { return f.MessageType === exports.MessageType.Error; });
            if (this.ErrorMessages.length > 0) {
                return false;
            }
        }
        return true;
    };
    return ServiceContext;
}());

/**
 * Use this class to create a message for the current [ServiceContext].
 */
var ServiceMessage = (function () {
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

exports.Action = Action;
exports.ServiceContext = ServiceContext;
exports.ServiceMessage = ServiceMessage;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=angular-actions.umd.js.map

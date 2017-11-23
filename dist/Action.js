import { ValidationContext } from 'angular-rules-engine';
import { ValidationContextState } from 'angular-rules-engine';
import { ActionResult } from './ActionResult';
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
var /**
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
Action = (function () {
    function Action() {
        this.allowExecution = true;
        this._validationContext = new ValidationContext();
        this.actionResult = ActionResult.Unknown;
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
    ;
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
            this.validationContext.state = ValidationContextState.Success;
        }
        else {
            this.allowExecution = false;
            this.validationContext.state = ValidationContextState.Failure;
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
export { Action };
//# sourceMappingURL=Action.js.map
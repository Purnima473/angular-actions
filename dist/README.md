# angular-actions
Angular-Actions is a framework to build amazing business logic. It is built using Typescript and compliments the [Angular-Rules-Engine](https://www.npmjs.com/package/angular-rules-engine) on [npmjs.com](https://www.npmjs.com/package/angular-rules-engine.
) or [GitHub](https://github.com/buildmotion/angular-rules-engine).

## Why Use Angular-Actions?
Business logic is the heart of your application. It deserves as much attention if not more than the visible parts of the application. Many times, the architecture or design of the business layer will determine the success of the application. For most business or enterprise applications you will want to strive for the following: 

+ Testability: 
+ Extensibility: 
+ Maintainability:
+ Performance: 

There are many concerns for an application beyond just the business logic. Many Angular developers will also need to consider how to implement and integrate the following into their new Angular application. Most tutorials give you the "Hello World" and "Tour of Heroes" as examples of the technology. However, you still need to apply well-established principles and patterns to create an application that has the following: 

+ Logging
+ Exception Handling
+ Data Validation
+ Business Rules
+ Authorization (Permission-based)
+ Interaction with Angular Services
    + Custom Services
    + Core Angular Services (i.e., Http, Route)

` angular-actions ` is an NPM package that provides a framework for implementing business logic for Typescript applications. The action framework is an object-oriented set of classes that provide a mechanism to create testable, extensible, and maintainable business logic code. ` Business Actions ` developed using this framework provides a consistency in the implementation of business logic that allows developers to be more productive - as well as enabling developers to become familiar with the code base faster. 

The framework implements a [` Template Method Design Pattern `](http://www.dofactory.com/net/template-method-design-pattern) - which when combined with the [` Angular-Rules-Engine `](https://www.npmjs.com/package/angular-rules-engine) provides a productive and intuitive development environment to create complex business logic.

*NOTE*: The ` angular-actions ` framework is a port from the ` BuildMotion Framework ` - which is 
a Microsoft .NET framework for building .NET Web APIs and Domain Services with a rich business 
logic layer. It uses ` actions ` and a ` rule engine ` to build extensible and maintainable 
business logic and rules. Available on Nuget at: [https://www.nuget.org/packages/BuildMotion/](https://www.nuget.org/packages/BuildMotion/) with thousands of downloads combined ([Vergosity](https://www.nuget.org/packages/Vergosity.Framework/)/BuildMotion).

NPM: [https://www.npmjs.com/package/angular-actions](https://www.npmjs.com/package/angular-actions)

#### IAction
All actions implement the following ` interface `. The ` execute() ` method is used as the entry point to start the processing pipeline of an action.

```js
export interface IAction {
	execute();
}
```

The pipeline is a set of methods that execute in a predefined sequence. The framework requires the implementation of only (2) methods: processAction and validateActionResult.

1. start
2. audit
3. preValidateAction
4. evaluateRules
5. postValidateAction
6. preExecuteAction
7. processAction
8. postExecuteAction
9. validateActionResult
10. finish

As you can see from the code below, that the ` processAction ` will be performed if there are no rule violations. The ` evaluateRules() ` method will set the action's ` allowExecution ` boolean property to false if there are any failed rule evaluations. You can add additional logic in your application to set this property to indicate if the actual business logic contained in the ` processAction() ` method should be executed. 

```js
import {ValidationContext} from 'angular-rules-engine/validation/index';
import {ValidationContextState} from 'angular-rules-engine/validation/index';
import {IAction} from './IAction';
import { ActionResult } from './index';

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
export class Action implements IAction {
    allowExecution = true;
    _validationContext: ValidationContext = new ValidationContext();
    actionResult: ActionResult = ActionResult.Unknown;

    constructor() {}

    get validationContext(): ValidationContext {
        return this._validationContext;
    }

	/**
	 * Use this method to execute a concrete action. A concrete action must implement
	 * the [processAction] and the [validateActionResult] functions to be a valid
	 * action. 
	 */
    execute() {
        console.log('Preparing to execute action.');
        this.processActionPipeline();
    }

    private processActionPipeline() {
        this.startAction();
        if (this.allowExecution) {
            this.processAction();
        }
        this.finishAction();
    };

    private startAction() {
        console.log('Starting action.');
        this.start();
        this.audit();
        this.preValidateAction();
        this.evaluateRules();
        this.postValidateAction();
        this.preExecuteAction();
    }

    private finishAction() {
        console.log('Finishing action.');
        this.postExecuteAction();
        this.validateActionResult();
        this.finish();
    }

	
    private processAction() {
        console.log('Processing action.');
        this.performAction();
    }

	/**
	 * All action must implement this function. This is where your
	 * [business logic] should be implemented. This function is called if
	 * there are no validation rule exceptions.
	 */
    performAction() {
        throw new Error('Not implemented. Requires implementation in concrete action.');
    }

	/**
	 * Override/Implement this function to perform an early operation in the action pipeline.
	 * This function belongs to the pre-execute functions of the action pipeline.
	 */
    start() {
        console.log('Starting action.');
    }

	/**
	 * Implement this function to perform any auditing features during the pre-exectuion of the
	 * business logic.
	 */
    audit() {
        console.log('Auditing action.');
    }

	/**
	 * Use this function to setup any validation rules before the validation happens. This
	 * function is called before [evaluateRules].
	 */
    preValidateAction() {
        console.log('Pre-validating action.');
    }

	/**
	 * Use this function to implement the execution of the validation and business rules. This
	 * function is called after [preValidateAction].
	 */
    evaluateRules(){
        console.log('Evaluating action rules.');
        let context = this.validateAction();
        if (context.isValid) {
            this.allowExecution = true;
            this.validationContext.state = ValidationContextState.Success;
        } else {
            this.allowExecution = false;
            this.validationContext.state = ValidationContextState.Failure;
        }
    }

	/**
	 * Use to determine or handle the results of the rule evalation. This
	 * function is called after the [evaluateRules].
	 */
    postValidateAction() {
        console.log('Post-Validation of action.');
    }

	/**
	 * Use this function to perform any setup before the action is executed. 
	 */
    preExecuteAction() {
        console.log('Pre-execution of action.');
    }

	/**
	 * Use this funciton to evaluate the action after the the business logic within
	 * the [performAction] has executed.
	 */
    postExecuteAction() {
        console.log('Post-execution of action');
    }

	/**
	 * This function requires implementation to determin the state and result of the action.
	 * Use this opportunity to validate the results. 
	 */
    validateActionResult(): ActionResult {
        throw new Error('Concrete actions required to implement this method.');
    }

	/**
	 * Use this function to perform any cleanup, logging, or disposing of resources used
	 * by the action. This is the last function called during the pipeline.
	 */
    finish() {
        console.log('Finish action.');
    }

	/**
	 * Implement this function to perform validation of business rules and data.
	 */
    validateAction() {
        console.log('Validating the action.');
        return this.validationContext;
    }
}
```

A typical implementation of an ` action ` would be a concrete business action that ` extends ` from a base action class. The base action class extends from the framework's ` action ` class. This structure allows for the concrete actions to focus on the specific business logic (using Single-Responsibility principle) while having common or shared implementation of the pipeline methods in the base class. 

As you can see from the code snippet below - the responsibility of the action is to get a ` TimeSpan ` between two different data objects. This ` GetTimeSpanAction ` action extends the base class ` ActionBase `. The code in this action is clean. Basically, we are elevating business logic from implementations in ` methods ` of a class to its own class. Implementing business logic with actions allow you to use all of the goodness of object-oriented programming, such as: inheritance, abstraction, encapsulation, and polymorphism. OOP allows for the use of common design patterns that simplify many programming efforts.

Note the implementation of the business rules in the ` preValidateAction ` method. This allows the rules to be setup and ready for evaluation when the ` evaluateRules() ` method is called using the framework's action pipeline. The solution now has a consistent mechanism to implement rules, evaluate rules, and retrieve rule results. Consistency improves quality and the ability to isolate issues using unit and specification tests. 

```js
export class GetTimeSpanAction extends ActionBase {

    response: TimeSpan;

    /**
     * Constructor for the action. 
     * @param startDate Required.
     * @param endDate Required.
     */
    constructor(
        private startDate: DateTime,
        private endDate: DateTime) {
        super(new LoggingService());
        this.actionName = 'GetTimeSpanAction';
    }

    /**
     * Use this action pipeline method to add validation or business rules to the ValidationContext before the 
     * [evaluateRules] action pipeline method is called. 
     */
    preValidateAction() {
        // both dates need to be valid and not null/undefined;
        this.validationContext.addRule(new rules.IsNotNullOrUndefined('StartDateIsNotNull', 'The start date is not valid. Cannot be null or undefined.', this.startDate, true));
        this.validationContext.addRule(new rules.IsNotNullOrUndefined('EndDateIsNotNull', 'The end date is not valid. Cannot be null or undefined.', this.endDate, true));
    }

    performAction() {
        const span = DateTime.between(this.startDate, this.endDate);
        console.log(`the timespan between ${this.startDate.toUniversalTime.toJsDate()} and ${this.endDate.toUniversalTime.toJsDate()} is ${span.minutes} minutes.`);
        this.response = span;
    }

    /**
     * Use this action pipeline method to validate the result of the action - based on rule violations.
     */
    validateActionResult(): ActionResult {
        this.loggingService.log(this.actionName, LoggingSeverity.Information, `Running [validateActionResult] for ${this.actionName}.`);
        if (this._validationContext.hasRuleViolations()) {
            this.businessProvider.loggingService.log(this.actionName, LoggingSeverity.Error, `The ${this.actionName} contains rule violations.`);
            this.actionResult = ActionResult.Fail;
        }
        this.actionResult = this.serviceContext.isGood() ? ActionResult.Success : ActionResult.Fail;
        return this.actionResult;
    }
}
```
The base class ` ActionBase ` provides the opportunity to implement shared/common functionality of all actions that extend from this class. It allows access to ` infrastructure ` concerns but doesn't dirty the concrete implementations of concrete actions. 

You can implement any of the ` angular-actions ` pipeline methods, like:

* validateAction()
* postValidateAction()
* postExecuteAction()

You can also implement shared helper functions/methods that each of the actions will have access to:

* compareLogItemEventDateTime()
* setRegulation()

The implementation of the ` Do() ` method is a nice extension-like method that allows for the injection of infrastructure services to all actions that extend from this base action class. It also has the added benefit of simplifying the signatures of the concrete actions to contain only the members that the action is concerned with. We all hate method signatures that contain useful but non-relevant information to the concern of the business logic. Things like:

* logging services
* data access
* connection strings
* user information
* ...

```js
export class ActionBase extends Action {
    loggingService: LoggingService;
    serviceContext: ServiceContext;
    businessProvider: BusinessProvider;
    actionName: string;

    // Use the following property(s) to provide contextual rule/regulation information in validation responses. 
    RuleSet: string = '';
    Regulation: Regulation = new Regulation();
    HasRegulation: boolean = false;//default for action implementation; set to true if a regulation is setup

    constructor(loggingService: LoggingService) {
        super();
        this.loggingService = loggingService;
    }

    /**
    * Use the [Do] method to perform the action.
    */
    Do(businessProvider: BusinessProvider) {
        this.businessProvider = businessProvider;
        this.serviceContext = businessProvider.serviceContext;
        this.loggingService = businessProvider.loggingService;

        this.execute(); //entry point into the pipeline of methods (template method pattern)
    }

    /**
     * A helper method to setup regulation information for actions that are processing federal regulartory rules.
     * @param regulationId: A unique identifier for the regulation.
     * @param regulationText: A description of the regulation.
     * @param url Use to indicate the regulation source online.
     */
    setRegulation(regulationId: string, regulationText: string, url: string = '') {
        if (regulationId && regulationText) {
            this.HasRegulation = true;
            this.Regulation.RegulationId = regulationId;
            this.Regulation.Regulation = regulationText;
            this.Regulation.Url = url;
        }
        else {
            this.loggingService.log(this.actionName, LoggingSeverity.Error, `Cannot setup regulation information without a valid identifier and regulation text.`);
        }
    }

    /**
    * This is a required implementation if you want to render/execute the rules tha{t j
    * are associated to the specified action.
    */
    validateAction(): ValidationContext {
        return this.validationContext.renderRules();
    }

    postValidateAction() {
        this.loggingService.log(this.actionName, 
            LoggingSeverity.Information, 
            `Preparing to determine if the action contains validation errors in ${this.actionName}`);

        if (this.validationContext.hasRuleViolations()) {
            this.loggingService.log(this.actionName, LoggingSeverity.Information, `The target contains validation errors in ${this.actionName}`);

            // Load the error/rule violations into the ServiceContext so that the information bubbles up to the caller of the service;
            this.validationContext.results.forEach((e) => {
                if (!e.isValid && e.rulePolicy.isDisplayable) {
                    let serviceMessage = new Message(e.rulePolicy.name, e.rulePolicy.message, MessageType.Error);
                    serviceMessage.DisplayToUser = true;
                    serviceMessage.Source = this.actionName;
                    serviceMessage.RuleSet = this.RuleSet;
                    if (this.HasRegulation) {
                        serviceMessage.Regulation = this.Regulation;
                    }
                    this.serviceContext.Messages.push(serviceMessage);
                }
            });
        }
    }

    postExecuteAction() {
        if (this.actionResult === ActionResult.Fail) {
            this.serviceContext.Messages.forEach((e) => {
                if (e.MessageType === MessageType.Error) {
                    this.loggingService.log(this.actionName, LoggingSeverity.Error, e.toString());
                }
            });
        }
    }

    /**
     * Use this method to sort a LogItem by the [EventDateTime] property.
     * @param a
     * @param b 
     */
    protected compareLogItemEventDateTime(a: LogItem, b: LogItem) {
        if (a.EventDateTime < b.EventDateTime) {
            return -1;
        }
        if (a.EventDateTime > b.EventDateTime) {
            return 1;
        }
        return 0;
    }
}
```

Using the action shown above is easy. You instantiate the action, pass in the required parameters. Call the ` Do(this) ` method of the action and return the response. Notice how clean and consistent the code is for calling business actions implemented using the ` angular-actions ` NPM package. 

```js
getTimeSpan(startDate: DateTime, endDate: DateTime): TimeSpan {
    let action = new actions.GetTimeSpanAction(startDate, endDate);
    action.Do(this);
    return action.response;
}
```


## Testable

## Extensible

## Maintainable

## Performant

&copy; 2016-2017 Build Motion, LLC [www.buildmotion.com](http://www.buildmotion.com)
[Matt Vaughn on LinkedIn](https://www.linkedin.com/in/matt-vaughn-857a982?trk=profile-badge)

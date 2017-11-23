/**
 * Use to indicate the result of the action (i.e., Sucess, Fail, or Unknown).
 */
/**
 * Use to indicate the result of the action (i.e., Sucess, Fail, or Unknown).
 */
export var ActionResult;
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
})(ActionResult || (ActionResult = {}));
//# sourceMappingURL=ActionResult.js.map
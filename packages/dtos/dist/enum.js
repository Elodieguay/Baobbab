"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Status = exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "ADMIN";
    UserRole["USER"] = "USER";
    UserRole["SUPERADMIN"] = "SUPERADMIN";
})(UserRole || (exports.UserRole = UserRole = {}));
var Status;
(function (Status) {
    Status["PENDING"] = "PENDING";
    Status["APPROVED"] = "APPROVED";
    Status["REJECTED"] = "REJECTED";
    Status["ARCHIVED"] = "ARCHIVED";
    Status["DRAFT"] = "DRAFT";
    Status["CANCELLED"] = "CANCELLED";
})(Status || (exports.Status = Status = {}));
//# sourceMappingURL=enum.js.map
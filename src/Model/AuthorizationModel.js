/**
 * Handel CRUD  on Authorization table.
 */
"use strict";

const baseModel = require("./BaseModelAdvanced");

const table = "authorization";

const tableColumns = {
    id: "id",
    name: "name",
    email: "email",
    authString: "authentication_string",
    role: "role",
    status: "status",
    createdAt: "created_at",
    updatedAt: "updated_at"
};

const roles = [
    "ADMIN",
    "HR",
    "PROJECT_COORDINATOR_TEAM",
    "ACCOUNTS",
    "TEAM_LEADER",
];

async function readAuthenticationString(email, databaseConnection) {
    const whereClause = {};
    whereClause[tableColumns.email] = email;
    whereClause[tableColumns.status] = 'ACTIVE';

    return await baseModel.readRecord(
        databaseConnection,
        table,
        [tableColumns.authString],
        whereClause,
        1
    );
}

async function createAuthorization(name, email, authString, role, databaseConnection) {
    const data = {};
    data[tableColumns.name] = name;
    data[tableColumns.email] = email;
    data[tableColumns.authString] = authString;
    data[tableColumns.role] = role;
    return await baseModel.createRecord(databaseConnection, table, data);
}

async function updateAuthorizationString(newAuthString, email, databaseConnection) {
    const whereClause = {};
    whereClause[tableColumns.email] = email;
    const updatedData = {};
    updatedData[tableColumns.authString] = newAuthString;
    return await baseModel.updateRecord(databaseConnection, table, updatedData, whereClause, 1);
}

async function updateUserDetails(email, name, role, status, databaseConnection) {
    const updatedData = {};
    if (name)
        updatedData[tableColumns.name] = name;
    if (role)
        updatedData[tableColumns.role] = role;
    if (status) {
        if (!["ACTIVE", "INACTIVE"].includes(status))
            throw new Error("Invalid status");
        updatedData[tableColumns.status] = status;
    }
    const whereClause = {};
    whereClause[tableColumns.email] = email;
    return await baseModel.updateRecord(databaseConnection, table, updatedData, whereClause, 1);
}

async function deleteAuthorization(email, databaseConnection, changeStatusOnly = false) {
    const whereClause = {};
    whereClause[tableColumns.email] = email;
    return await baseModel.deleteRecord(databaseConnection, table, whereClause, 1, changeStatusOnly);
}

async function inActiveAuthorization(email, databaseConnection) {
    const whereClause = {};
    whereClause[tableColumns.email] = email;
    const updatedData = {};
    updatedData[tableColumns.status] = 'INACTIVE';
    return await baseModel.updateRecord(databaseConnection, table, updatedData, whereClause, 1);
}

async function activeAuthorization(email, databaseConnection) {
    const whereClause = {};
    whereClause[tableColumns.email] = email;
    const updatedData = {};
    updatedData[tableColumns.status] = 'ACTIVE';
    return await baseModel.updateRecord(databaseConnection, table, updatedData, whereClause, 1);
}

async function readAuthorizationStatus(email, databaseConnection) {
    const whereClause = {};
    whereClause[tableColumns.email] = email;
    const data = await baseModel.readRecord(
        databaseConnection,
        table,
        [tableColumns.status],
        whereClause,
        1
    );
    return data;
}

async function isUserExists(email, databaseConnection) {
    const whereClause = {};
    whereClause[tableColumns.email] = email;
    const data = await baseModel.readRecord(databaseConnection, table, ['count(*)'], whereClause, 1);
    return data;
}

async function getAllRegisteredUsers(searchTerms, status, databaseConnection) {
    let query = '', whereClause = '';
    if (searchTerms) {
        whereClause += `WHERE ( LOWER(${tableColumns.email}) LIKE '%${searchTerms.toLowerCase()}%' OR LOWER(${tableColumns.role}) LIKE '%${searchTerms.toLowerCase()}%' OR LOWER(${tableColumns.name}) LIKE '%${searchTerms.toLowerCase()}%' )`;
    }
    if (status && status.toUpperCase() !== 'ALL') {
        if (whereClause.length <= 0)
            whereClause += `WHERE ( UPPER(${tableColumns.status}) LIKE '%${status.toUpperCase()}%' )`;
        else
            whereClause += `AND ( UPPER(${tableColumns.status}) LIKE '%${status.toUpperCase()}%' )`;
    }
    query = `SELECT ${[tableColumns.email, tableColumns.role, tableColumns.name, tableColumns.status].toString()} FROM ${table} ${whereClause};`;
    console.log(query);
    return await baseModel.executeQuery(databaseConnection, query);
}

async function getUserFullNameAndRole(email, databaseConnection) {
    const whereClause = {};
    whereClause[tableColumns.email] = email
    return await baseModel.readRecord(databaseConnection, table, [tableColumns.name, tableColumns.role], whereClause);
}

async function getTotalUserCount(databaseConnection) {
    return await baseModel.readRecord(databaseConnection, table, ['count(*)']);
}

module.exports = {
    tableColumns,
    roles,
    createAuthorization,
    updateUserDetails,
    updateAuthorizationString,
    readAuthenticationString,
    deleteAuthorization,
    inActiveAuthorization,
    activeAuthorization,
    readAuthorizationStatus,
    isUserExists,
    getAllRegisteredUsers,
    getUserFullNameAndRole,
    getTotalUserCount
};
